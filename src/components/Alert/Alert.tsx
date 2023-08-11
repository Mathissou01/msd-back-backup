import { useEffect } from "react";
import router from "next/router";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { add, addMinutes, format, isAfter, parse } from "date-fns";
import { removeNulls } from "../../lib/utilities";
import { useNavigation } from "../../hooks/useNavigation";
import { useContract } from "../../hooks/useContract";
import { useFocusFirstElement } from "../../hooks/useFocusFirstElement";
import {
  AlertUserStorageEntity,
  GetAlertNotificationsByContractIdDocument,
  useCreateAlertNotificationMutation,
  useGetAlertNotificationByIdQuery,
  useProgrammedSendMutation,
  useSendEmailMutation,
  useSendSmsMutation,
  useUpdateAlertNotificationByIdMutation,
} from "../../graphql/codegen/generated-types";
import PageTitle from "../PageTitle/PageTitle";
import CommonLoader from "../Common/CommonLoader/CommonLoader";
import CommonButton from "../Common/CommonButton/CommonButton";
import { IFormSingleMultiselectOption } from "../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormInput from "../Form/FormInput/FormInput";
import FormDatePicker from "../Form/FormDatePicker/FormDatePicker";
import FormCheckbox from "../Form/FormCheckbox/FormCheckbox";
import AlertSelectingSectors from "./AlertSelectingSectors/AlertSelectingSectors";
import "./alert.scss";

interface IAlertProps {
  alertNotificationId: string;
  isCreateMode: boolean;
}

export default function Alert({
  alertNotificationId,
  isCreateMode,
}: IAlertProps) {
  /* Static Data */
  const labels = {
    createTitle: "Créer une alerte",
    smsTitle: "SMS",
    emailTitle: "Email",
    sendingScheduleTitle: "Programmation de l'envoi",
  };
  const formLabels = {
    description: "Description de l'alerte",
    submitButtonLabel: "Enregistrer l'alerte",
    cancelButtonLabel: "Annuler",
    scheduledDate: "Date",
    scheduledHour: "Heure",
    sendNow: "Envoyer immédiatement",
    sendSMS: "Envoyer par SMS",
    alertTitle: "Titre de l'alerte SMS",
    sendMail: "Envoyer par Mail",
    subject: "Objet du mail d'alerte",
    alertMessage: "Message de l'alerte",
    sectorizations: "Secteur",
    cities: "Communes ou EPCI",
  };
  const messages = {
    mandatoryFields: "Tous les champs marqués d'une * sont obligatoires.",
    required: "Ce champ est obligatoire",
    maxLengthAlertTitle: 11,
    maxLengthAlertMessage: 160,
    maxChars: "11 caractères maximum",
  };

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const { data: getAlertNotifications } = useGetAlertNotificationByIdQuery({
    variables: { alertNotificationId },
    fetchPolicy: "cache-and-network",
  });
  const [
    createAlertNotificationMutation,
    { loading: createAlertLoading, error: createAlertError },
  ] = useCreateAlertNotificationMutation();
  const [
    updateAlertNotification,
    {
      loading: updateAlertNotificationLoading,
      error: errorAlertNotificationError,
    },
  ] = useUpdateAlertNotificationByIdMutation();
  const [sendSms, { loading: sendSMSLoading, error: sendSMSError }] =
    useSendSmsMutation();
  const [sendEmail, { loading: sendEmailLoading, error: sendEmailError }] =
    useSendEmailMutation();
  const [
    programmedSend,
    { loading: sendProgrammedSendLoading, error: sendProgrammedSendError },
  ] = useProgrammedSendMutation();

  /* Local data */
  const form = useForm<FieldValues>({
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
    register,
    reset,
    resetField,
  } = form;

  register("sectorizations", {
    required: { value: !watch("cities"), message: messages.required },
  });
  register("cities", {
    required: {
      value: !watch("sectorizations"),
      message: messages.required,
    },
  });

  const isLoading =
    createAlertLoading ||
    updateAlertNotificationLoading ||
    sendSMSLoading ||
    sendProgrammedSendLoading ||
    sendEmailLoading;
  const errors = [
    createAlertError,
    errorAlertNotificationError,
    sendSMSError,
    sendEmailError,
    sendProgrammedSendError,
  ];

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const variables = {
      updateAlertNotificationId: alertNotificationId,
      data: {
        alertNotifService: contractId,
        subject: submitData.subject,
        alertTitle: submitData.alertTitle,
        alertMessage: submitData.alertMessage,
        alertDescription: submitData.alertDescription,
        sendSMS: submitData.sendSMS,
        sendMail: submitData.sendMail,
        scheduledAt: format(
          submitData.sendNow ? new Date() : submitData.scheduledAt,
          "yyyy-MM-dd",
        ),
        scheduledAtTime: submitData.sendNow
          ? format(addMinutes(new Date(), 1), "HH:mm")
          : submitData.scheduledAtTime,
        sectorizations: Array.isArray(submitData.sectorizations)
          ? submitData.sectorizations.map(
              (sector: IFormSingleMultiselectOption) => sector.value.toString(),
            )
          : undefined,
        cities: Array.isArray(submitData.cities)
          ? submitData.cities.map((city: IFormSingleMultiselectOption) =>
              city.value.toString(),
            )
          : undefined,
      },
    };

    return isCreateMode
      ? createAlertNotificationMutation({
          variables,
          onCompleted: (result) => {
            const users =
              result.createAlertNotification?.data?.attributes
                ?.alertUserStorages?.data;
            if (users) handleSendingAlert(submitData, users);
            if (result.createAlertNotification?.data?.id) {
              router.push(`${currentRoot}/services/alertes`);
            }
          },
        })
      : updateAlertNotification({
          variables,
          refetchQueries: [
            {
              query: GetAlertNotificationsByContractIdDocument,
              variables: {
                alertNotificationId,
              },
            },
          ],
          onCompleted: (result) => {
            const users =
              result.updateAlertNotification?.data?.attributes
                ?.alertUserStorages?.data;
            if (users) handleSendingAlert(submitData, users);
            if (result.updateAlertNotification?.data?.id) {
              router.push(`${currentRoot}/services/alertes`);
            }
          },
        });
  }

  function handleSendingAlert(
    submitData: FieldValues,
    users: AlertUserStorageEntity[],
  ) {
    if (submitData.sendNow) {
      if (submitData.sendSMS) handleSendingSMSNow(submitData, users);
      if (submitData.sendMail) handleSendingEmailNow(submitData, users);
    } else {
      handleProgrammedSend(submitData, users);
    }
  }

  async function handleSendingSMSNow(
    submitData: FieldValues,
    users: AlertUserStorageEntity[],
  ) {
    try {
      await sendSms({
        variables: {
          content: submitData.alertMessage,
          scheduledAt: `${format(new Date(), "yyyy-MM-dd")} ${format(
            addMinutes(new Date(), 1),
            "HH:mm",
          )}`,
          sendMultiple: true,
          phoneNumber: users
            .map((user) => user.attributes?.phoneNumber)
            .filter(removeNulls),
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async function handleSendingEmailNow(
    submitData: FieldValues,
    users: AlertUserStorageEntity[],
  ) {
    try {
      sendEmail({
        variables: {
          recipientEmails: users
            .map((user) => user.attributes?.email)
            .filter(removeNulls),
          subject: submitData.subject,
          content: submitData.alertMessage,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async function handleProgrammedSend(
    submitData: FieldValues,
    users: AlertUserStorageEntity[],
  ) {
    try {
      programmedSend({
        variables: {
          isEmail: submitData.sendMail,
          isSms: submitData.sendSMS,
          mailSubject: submitData.subject,
          smsTitle: submitData.alertTitle,
          alertMessage: submitData.alertMessage,
          scheduledAt: format(new Date(), "yyyy-MM-dd"),
          time: submitData.scheduledAtTime,
          recipientEmails: users
            .map((user) => user.attributes?.email)
            .filter(removeNulls),
          recipientnumbers: users
            .map((user) => user.attributes?.phoneNumber)
            .filter(removeNulls),
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  function getMinTime(): string {
    const dateIn5Hours = add(new Date(), { hours: 5 });

    const isSelectedDateAfterDateIn5Hours = isAfter(
      watch("scheduledAt"),
      dateIn5Hours,
    );

    if (isSelectedDateAfterDateIn5Hours) {
      return "";
    }

    return format(dateIn5Hours, "HH:mm");
  }

  function handleClickCheckbox() {
    if (!watch("sendSMS")) setValue("sendSMS", true);
    if (!watch("sendMail")) setValue("sendMail", true);
  }

  function onCancel() {
    form.reset();
    router.push(`${currentRoot}/services/alertes`);
  }

  useEffect(() => {
    if (getAlertNotifications?.alertNotification?.data) {
      const alertNotificationData =
        getAlertNotifications.alertNotification.data;
      if (alertNotificationData.id && alertNotificationData.attributes) {
        reset({
          subject: alertNotificationData.attributes.subject,
          alertTitle: alertNotificationData.attributes.alertTitle,
          alertMessage: alertNotificationData.attributes.alertMessage,
          alertDescription: alertNotificationData.attributes.alertDescription,
          sendSMS: alertNotificationData.attributes.sendSMS,
          sendMail: alertNotificationData.attributes.sendMail,
          scheduledAt: parse(
            alertNotificationData.attributes.scheduledAt,
            "yyyy-MM-dd",
            new Date(),
          ),
          scheduledAtTime: alertNotificationData.attributes.scheduledAtTime,
          sectorizations:
            alertNotificationData.attributes.sectorizations?.data.map(
              (sector) => {
                return { label: sector.attributes?.name, value: sector.id };
              },
            ),
          cities: alertNotificationData.attributes.cities?.data.map((city) => {
            return { label: city.attributes?.name, value: city.id };
          }),
        });
      }
    }
  }, [getAlertNotifications, reset]);

  return (
    <div className="c-Alert">
      <CommonLoader
        isLoading={isLoading}
        isShowingContent={isLoading}
        hasDelay={isLoading}
        errors={errors}
      >
        <PageTitle
          title={
            isCreateMode ? labels.createTitle : watch("alertDescription") ?? ""
          }
        />
        <FormProvider {...form}>
          <form
            className="c-Alert__Form"
            onSubmit={handleSubmit(onSubmit)}
            ref={useFocusFirstElement()}
          >
            <div className="c-Alert__Container">
              <div className="c-Alert__Columns">
                <div className="c-Alert__Wrapper">
                  {messages.mandatoryFields}
                  <FormInput
                    type="text"
                    tagType="textarea"
                    name="alertDescription"
                    label={formLabels.description}
                    isRequired
                  />
                </div>
                <div className="c-Alert__Wrapper">
                  <AlertSelectingSectors />
                </div>
                <div className="c-Alert__Wrapper">
                  <div className="c-Alert__Title">
                    {labels.sendingScheduleTitle}
                  </div>
                  <FormDatePicker
                    name="scheduledAt"
                    minDate={add(new Date(), { hours: 5 })}
                    label={formLabels.scheduledDate}
                    isDisabled={watch("sendNow")}
                    isRequired={!watch("sendNow")}
                    onChange={() => {
                      resetField("scheduledAtTime", { defaultValue: "" });
                    }}
                  />
                  <FormInput
                    name="scheduledAtTime"
                    label={formLabels.scheduledHour}
                    type="time"
                    isDisabled={watch("sendNow")}
                    isRequired={!watch("sendNow")}
                    minStringValidation={getMinTime()}
                  />
                  <FormCheckbox name="sendNow" label={formLabels.sendNow} />
                </div>
              </div>
              <div className="c-Alert__Columns">
                <div className="c-Alert__Wrapper">
                  <div className="c-Alert__Title">{labels.smsTitle}</div>
                  <FormCheckbox
                    label={formLabels.sendSMS}
                    name="sendSMS"
                    onClick={() => {
                      watch("sendSMS") &&
                        resetField("alertTitle", { defaultValue: "" });
                      handleClickCheckbox();
                    }}
                    defaultChecked={isCreateMode}
                  />
                  <FormInput
                    name="alertTitle"
                    label={formLabels.alertTitle}
                    isDisabled={!watch("sendSMS")}
                    maxLengthValidation={messages.maxLengthAlertTitle}
                    informationLabel={messages.maxChars}
                    isRequired={watch("sendSMS")}
                  />
                  <FormInput
                    tagType="textarea"
                    name="alertMessage"
                    label={formLabels.alertMessage}
                    isDisabled={!watch("sendSMS")}
                    maxLengthValidation={messages.maxLengthAlertMessage}
                    informationLabel={messages.maxChars}
                    isRequired={watch("sendSMS")}
                    isHidden={watch("sendMail")}
                  />
                  <div className="c-Alert__Title">{labels.emailTitle}</div>
                  <FormCheckbox
                    label={formLabels.sendMail}
                    name="sendMail"
                    onClick={() => {
                      watch("sendMail") &&
                        resetField("subject", { defaultValue: "" });
                      handleClickCheckbox();
                    }}
                  />
                  <FormInput
                    name="subject"
                    label={formLabels.subject}
                    isDisabled={!watch("sendMail")}
                    maxLengthValidation={messages.maxLengthAlertTitle}
                    informationLabel={messages.maxChars}
                    isRequired={watch("sendMail")}
                  />
                  <FormInput
                    tagType="textarea"
                    name="alertMessage"
                    label={formLabels.alertMessage}
                    isDisabled={!watch("sendMail")}
                    maxLengthValidation={messages.maxLengthAlertMessage}
                    informationLabel={messages.maxChars}
                    isRequired={watch("sendMail")}
                    isHidden={!watch("sendMail") && watch("sendSMS")}
                  />
                </div>
              </div>
            </div>
            <div className="c-Alert__Buttons">
              <CommonButton
                type="submit"
                label={formLabels.submitButtonLabel}
                style="primary"
                picto="check"
                isDisabled={!isValid}
              />
              <CommonButton
                type="button"
                label={formLabels.cancelButtonLabel}
                picto="cross"
                onClick={onCancel}
              />
            </div>
          </form>
        </FormProvider>
      </CommonLoader>
    </div>
  );
}
