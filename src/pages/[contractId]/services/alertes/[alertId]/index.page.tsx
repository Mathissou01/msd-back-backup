import router from "next/router";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
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
  };
  const formLabels = {
    description: "Description de l'alert",
    submitButtonLabel: "Enregistrer l'alert",
    cancelButtonLabel: "Annuler",
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
    formState: { isDirty, isValid },
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
              // The Mock data, it's gonna be updated in the next US
              scheduledAt: "2023-07-04",
              sectorizations: ["1"],
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
                isDisabled={!isDirty}
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
