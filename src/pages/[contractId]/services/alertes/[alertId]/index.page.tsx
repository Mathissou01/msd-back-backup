import { useEffect } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import router from "next/router";
import { add, format, isAfter, parse } from "date-fns";
import {
  useCreateAlertNotificationMutation,
  useUpdateAlertNotificationByIdMutation,
  GetAlertNotificationsByContractIdDocument,
  useGetAlertNotificationByIdQuery,
} from "../../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import { useFocusFirstElement } from "../../../../../hooks/useFocusFirstElement";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../../components/Common/CommonButton/CommonButton";
import FormInput from "../../../../../components/Form/FormInput/FormInput";
import FormDatePicker from "../../../../../components/Form/FormDatePicker/FormDatePicker";
import FormCheckbox from "../../../../../components/Form/FormCheckbox/FormCheckbox";
import "./alert-page.scss";

interface IAlertNotificationFormPageProps {
  alertNotificationId: string;
  isCreateMode: boolean;
}

export interface IAlertsNotificationsMappedFields {
  alertDescription: string;
  canal: string;
  scheduledAt: Date;
  scheduledAtTime: string;
}

export function ServicesAlertFormPage({
  alertNotificationId,
  isCreateMode,
}: IAlertNotificationFormPageProps) {
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
  };
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const { data } = useGetAlertNotificationByIdQuery({
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

  /* Local data */
  const form = useForm<FieldValues>({
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { isValid },
    watch,
    reset,
    resetField,
  } = form;
  const isLoading = createAlertLoading || updateAlertNotificationLoading;
  const errors = [createAlertError, errorAlertNotificationError];

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const variables = {
      updateAlertNotificationId: alertNotificationId,
      data: {
        alertNotifService: contractId,
        alertDescription: submitData.alertDescription,
        scheduledAt: format(
          submitData.sendNow ? new Date() : submitData.scheduledAt,
          "yyyy-MM-dd",
        ),
        //TODO: mocked data for the next US
        sectorizations: ["1"],
        scheduledAtTime: submitData.sendNow
          ? format(new Date(), "HH:mm")
          : submitData.scheduledAtTime,
      },
    };

    if (isCreateMode) {
      return createAlertNotificationMutation({
        variables,
        onCompleted: (result) => {
          if (result.createAlertNotification?.data?.id) {
            router.push(`${currentRoot}/services/alertes`);
          }
        },
      });
    } else {
      return updateAlertNotification({
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
          if (result.updateAlertNotification?.data?.id) {
            router.push(`${currentRoot}/services/alertes`);
          }
        },
      });
    }
  }

  useEffect(() => {
    if (data?.alertNotification?.data) {
      const alertNotificationData = data.alertNotification.data;

      if (alertNotificationData.id && alertNotificationData.attributes) {
        reset({
          alertDescription: alertNotificationData.attributes.alertDescription,
          canal:
            alertNotificationData.attributes?.sendSMS === true &&
            alertNotificationData.attributes?.sendMail === true
              ? "SMS/Mail"
              : alertNotificationData.attributes?.sendSMS === true
              ? "SMS"
              : alertNotificationData.attributes?.sendMail === true
              ? "Mail"
              : "",
          scheduledAt: parse(
            alertNotificationData.attributes.scheduledAt,
            "yyyy-MM-dd",
            new Date(),
          ),
          scheduledAtTime: alertNotificationData.attributes.scheduledAtTime,
        });
      }
    }
  }, [data, reset]);

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

  function onCancel() {
    form.reset();
    router.push(`${currentRoot}/services/alertes`);
  }

  return (
    <div className="c-ServicesAlertFormPage">
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
        ></PageTitle>
        <FormProvider {...form}>
          <form
            className="c-ServicesAlertFormPage__Form"
            onSubmit={handleSubmit(onSubmit)}
            ref={useFocusFirstElement()}
          >
            <div className="c-ServicesAlertFormPage__Container">
              <div className="c-ServicesAlertFormPage__Columns">
                <div className="c-ServicesAlertFormPage__Wrapper">
                  {mandatoryFields}
                  <FormInput
                    type="text"
                    tagType="textarea"
                    name="alertDescription"
                    label={formLabels.description}
                    isRequired
                  />
                </div>
                <div className="c-ServicesAlertFormPage__Wrapper">
                  <div className="c-ServicesAlertFormPage__Title">
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

              <div className="c-ServicesAlertFormPage__Columns">
                <div className="c-ServicesAlertFormPage__Wrapper">
                  <div className="c-ServicesAlertFormPage__Title">
                    {labels.smsTitle}
                  </div>
                  {/** it's gonna be updated in the SMS US */}
                  <div className="c-ServicesAlertFormPage__Title">
                    {labels.emailTitle}
                  </div>
                  {/** it's gonna be updated in the Email US */}
                </div>
              </div>
            </div>
            <div className="c-ServicesAlertFormPage__Buttons">
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

export default function IndexPage() {
  const alertNotificationId = useRoutingQueryId("alertId", "create");

  return (
    alertNotificationId && (
      <ContractLayout>
        <ServicesAlertFormPage
          alertNotificationId={alertNotificationId}
          isCreateMode={alertNotificationId === "-1"}
        />
      </ContractLayout>
    )
  );
}
