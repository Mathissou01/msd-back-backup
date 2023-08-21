import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useEffect, useState } from "react";
import {
  Enum_Footer_Accessibilitylevel,
  GetFooterByContractIdDocument,
  useGetFooterByContractIdQuery,
  useUpdateFooterPageByIdAndContactUsSubServiceIdMutation,
} from "../../../../graphql/codegen/generated-types";
import { extractFooter } from "../../../../lib/graphql-data";
import { useContract } from "../../../../hooks/useContract";
import { useFocusFirstElement } from "../../../../hooks/useFocusFirstElement";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import FormInput from "../../../../components/Form/FormInput/FormInput";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import FormRadioInput from "../../../../components/Form/FormRadioInput/FormRadioInput";
import "./personnalisation-footer-page.scss";

interface IFooterData {
  id: string;
  accessibilityLevel: Enum_Footer_Accessibilitylevel;
  cguSubService?: { id: string; link?: string };
  accessibilitySubService?: { id: string; link?: string };
  confidentialitySubService?: { id: string; link?: string };
  cookiesSubService?: { id: string; link?: string };
  contactUsSubService?: {
    id: string;
    label: string;
    link?: string;
  };
}

export function PersonnalisationFooterPage() {
  /* Static Data */
  const title = "Footer";
  const description = "Paramétrez les liens présents en bas de page.";
  const formLabels = {
    ecoConceptionTitle: "Eco-conception",
    accessibilityLevelTitle: "Accessibilité",
    accessibilityLevelLabel:
      "Niveau d’accessibilité (pourcentage des critères RGAA validés)",
    accessibilityLevelOptionNo: "Non conforme (moins de 50 %)",
    accessibilityLevelOptionHalf: "Partiellement conforme  (de 50 % à 99 %)",
    accessibilityLevelOptionYes: "Totalement conforme (100 %)",
    contactUsTitle: "Contactez-nous",
    contactUsLabel: "Texte du lien",
    contactUsLink: "Lien vers la page de contact",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
  };

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const variables = {
        updateFooterId: submitData["id"],
        updateFooterData: {
          accessibilityLevel: submitData["accessibilityLevel"],
        },
        updateContactUsSubServiceId: submitData["contactUsSubService"]["id"],
        updateContactUsSubServiceData: {
          label: submitData["contactUsSubService"]["label"],
          link: submitData["contactUsSubService"]["link"],
        },
      };
      return updateFooterPage({
        variables,
        refetchQueries: [
          {
            query: GetFooterByContractIdDocument,
            variables: { contractId },
          },
        ],
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contract } = useContract();
  const contractId = contract.id ?? "";
  const { loading, error, data } = useGetFooterByContractIdQuery({
    variables: { contractId },
  });
  const [updateFooterPage, { loading: mutationLoading, error: mutationError }] =
    useUpdateFooterPageByIdAndContactUsSubServiceIdMutation();

  /* Local Data */
  const [footerData, setFooterData] = useState<IFooterData>();
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data) {
      const { footer } = extractFooter(data);
      if (footer?.id && footer.attributes) {
        const mappedData = {
          id: footer.id,
          accessibilityLevel:
            footer.attributes.accessibilityLevel ??
            Enum_Footer_Accessibilitylevel.NotConform,
          ...(footer.attributes.contactUsSubService?.data?.id
            ? {
                contactUsSubService: {
                  id: footer.attributes.contactUsSubService.data.id,
                  label:
                    footer.attributes.contactUsSubService.data.attributes
                      ?.label ?? "",
                  link:
                    footer.attributes.contactUsSubService.data.attributes
                      ?.link ?? undefined,
                },
              }
            : {}),
        };
        setFooterData(mappedData);
        form.reset(mappedData);
      }
    }
  }, [data, form]);

  return (
    <>
      <PageTitle title={title} description={description} />
      <div className="c-PersonnalisationFooterPage">
        <CommonLoader
          isLoading={loading || isSubmitting || mutationLoading}
          isShowingContent={isSubmitting || mutationLoading}
          hasDelay={isSubmitting || mutationLoading}
          errors={[error, mutationError]}
        >
          <FormProvider {...form}>
            <form
              className="c-PersonnalisationFooterPage__Form"
              onSubmit={handleSubmit(onSubmitValid)}
              ref={useFocusFirstElement()}
            >
              {/*<div className="c-PersonnalisationFooterPage__Group">*/}
              {/*  <h2 className="c-PersonnalisationFooterPage__Title">*/}
              {/*    {formLabels.ecoConceptionTitle}*/}
              {/*  </h2>*/}
              {/*  <div className="c-PersonnalisationFooterPage__SubGroup">*/}
              {/*    <span>[...]</span>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="c-PersonnalisationFooterPage__Group">
                <h2 className="c-PersonnalisationFooterPage__Title">
                  {formLabels.accessibilityLevelTitle}
                </h2>
                <div className="c-PersonnalisationFooterPage__SubGroup">
                  <FormRadioInput
                    name="accessibilityLevel"
                    displayName={formLabels.accessibilityLevelLabel}
                    options={[
                      {
                        value: Enum_Footer_Accessibilitylevel.NotConform,
                        label: formLabels.accessibilityLevelOptionNo,
                      },
                      {
                        value: Enum_Footer_Accessibilitylevel.PartiallyConform,
                        label: formLabels.accessibilityLevelOptionHalf,
                      },
                      {
                        value: Enum_Footer_Accessibilitylevel.Conform,
                        label: formLabels.accessibilityLevelOptionYes,
                      },
                    ]}
                    defaultValue={footerData?.accessibilityLevel.toString()}
                  />
                </div>
              </div>
              {footerData?.contactUsSubService && (
                <div className="c-PersonnalisationFooterPage__Group">
                  <h2 className="c-PersonnalisationFooterPage__Title">
                    {formLabels.contactUsTitle}
                  </h2>
                  <div className="c-PersonnalisationFooterPage__SubGroup c-PersonnalisationFooterPage__SubGroup_short">
                    <FormInput
                      type="text"
                      name="contactUsSubService.label"
                      label={formLabels.contactUsLabel}
                      isRequired={true}
                      isDisabled={mutationLoading}
                      defaultValue={footerData.contactUsSubService?.label}
                    />
                    <FormInput
                      type="text"
                      name="contactUsSubService.link"
                      label={formLabels.contactUsLink}
                      isRequired={true}
                      isDisabled={mutationLoading}
                      defaultValue={footerData.contactUsSubService?.link}
                    />
                  </div>
                </div>
              )}
              <div className="c-PersonnalisationFooterPage__Buttons">
                <CommonButton
                  type="submit"
                  label={formLabels.submitButtonLabel}
                  style="primary"
                  picto="check"
                  isDisabled={!isDirty}
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
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <PersonnalisationFooterPage />
    </ContractLayout>
  );
}
