import router from "next/router";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { format } from "date-fns";
import { useCreateAlertNotificationMutation } from "../../../../../graphql/codegen/generated-types";
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

interface IAlertFormPageProps {
  alertId: string;
  isCreateMode: boolean;
}

export function ServicesAlertFormPage({ isCreateMode }: IAlertFormPageProps) {
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
  const [
    createAlertNotificationMutation,
    { loading: createAlertLoading, error: errorAlert },
  ] = useCreateAlertNotificationMutation();

  /* Local data */
  const form = useForm<FieldValues>({
    mode: "onChange",
  });
  const {
    handleSubmit,
    formState: { isValid },
    watch,
  } = form;
  const isLoading = createAlertLoading;
  const errors = [errorAlert];

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    return isCreateMode
      ? createAlertNotificationMutation({
          variables: {
            data: {
              alertNotifService: contractId,
              alertDescription: submitData.alertDescription,
              scheduledAt: format(
                submitData.sendNow ? new Date() : submitData.scheduledAt,
                "yyyy-MM-dd",
              ),
              sectorizations: ["1"],
              scheduledAtTime: submitData.sendNow
                ? format(new Date(), "HH:mm")
                : submitData.scheduledAtTime,
            },
          },
          onCompleted: (result) => {
            if (result.createAlertNotification?.data?.id) {
              router.push(`${currentRoot}/services/alertes`);
            }
          },
        })
      : // it's gonna be updated in the updating US
        "";
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
        {/** it's gonna be updated in the updating US */}
        <PageTitle title={isCreateMode ? labels.createTitle : ""}></PageTitle>
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
                    minDate={new Date()}
                    label={formLabels.scheduledDate}
                    isDisabled={watch("sendNow")}
                  />
                  <FormInput
                    name="scheduledAtTime"
                    label={formLabels.scheduledHour}
                    type="time"
                    isDisabled={watch("sendNow")}
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
  const alertId = useRoutingQueryId("alertId", "create");

  return (
    alertId && (
      <ContractLayout>
        <ServicesAlertFormPage
          alertId={alertId}
          isCreateMode={alertId === "-1"}
        />
      </ContractLayout>
    )
  );
}
