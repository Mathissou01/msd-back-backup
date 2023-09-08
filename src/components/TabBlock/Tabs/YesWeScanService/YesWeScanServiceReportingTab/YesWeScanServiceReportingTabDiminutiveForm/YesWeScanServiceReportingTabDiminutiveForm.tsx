import React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  useGetYesWeScanQrCodesByServiceIdQuery,
  useUpdateYesWeScanServiceByIdMutation,
} from "../../../../../../graphql/codegen/generated-types";
import { useFocusFirstElement } from "../../../../../../hooks/useFocusFirstElement";
import CommonLoader from "../../../../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../../Common/CommonButton/CommonButton";
import FormInput from "../../../../../Form/FormInput/FormInput";
import "./yeswescan-service-reporting-tab-diminutive-form.scss";

interface IYesWeScanServiceReportingTabDiminutiveFormProps {
  ywsShortName: string;
  ywsServiceId: string;
}

export default function YesWeScanServiceReportingTabDiminutiveForm({
  ywsShortName,
  ywsServiceId,
}: IYesWeScanServiceReportingTabDiminutiveFormProps) {
  /* Static Data */
  const labels = {
    information:
      "Le diminutif est affiché sous le QR Code, visible par les usagers. Il n'est pas modifiable après qu'il ait été défini.",
    input: "Diminutif du service",
    maxCharacters: "caractères maximum",
    submitButton: "Enregistrer le diminutif",
  };
  const diminutiveMaxLength = 10;

  const { data: qrCodesAssociated } = useGetYesWeScanQrCodesByServiceIdQuery({
    variables: {
      ywsServiceId: ywsServiceId,
    },
    fetchPolicy: "network-only",
  });

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData.shortName) {
      await updateShortName({
        variables: {
          updateYesWeScanServiceId: ywsServiceId,
          data: {
            shortName: submitData.shortName,
          },
        },
      });
    }
  }

  /* Local Data */
  const form = useForm({
    mode: "onChange",
  });
  const { formState, handleSubmit } = form;
  const { isDirty, isSubmitting } = formState;
  const [
    updateShortName,
    { loading: updateShortNameLoading, error: updateShortNameError },
  ] = useUpdateYesWeScanServiceByIdMutation({
    refetchQueries: ["getYesWeScanServiceById", "getYesWeScanAssociatedQRCode"],
  });
  const isLoading = isSubmitting || updateShortNameLoading;

  return (
    <CommonLoader
      isLoading={isLoading}
      isShowingContent={isLoading}
      hasDelay={isLoading}
      errors={[updateShortNameError]}
    >
      <div className="c-YesWeScanServiceReportingTabDiminutiveForm">
        <FormProvider {...form}>
          <form
            className="c-YesWeScanServiceReportingTabDiminutiveForm__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <span className="c-YesWeScanServiceReportingTabDiminutiveForm__DiminutiveInformation">
              {labels.information}
            </span>
            <div className="c-YesWeScanServiceReportingTabDiminutiveForm__Diminutive">
              <FormInput
                type="text"
                name="shortName"
                label={labels.input}
                isRequired
                defaultValue={ywsShortName}
                maxLengthValidation={diminutiveMaxLength}
                validationLabel={`${diminutiveMaxLength} ${labels.maxCharacters}`}
                isDisabled={
                  (qrCodesAssociated &&
                    qrCodesAssociated.yesWeScanQrCodes &&
                    qrCodesAssociated.yesWeScanQrCodes.data &&
                    qrCodesAssociated.yesWeScanQrCodes.data.length >= 1) ??
                  false
                }
              />
            </div>
            <div className="c-YesWeScanServiceReportingTabDiminutiveForm__Buttons">
              <CommonButton
                type="submit"
                label={labels.submitButton}
                style="primary"
                picto="check"
                isDisabled={!isDirty}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </CommonLoader>
  );
}
