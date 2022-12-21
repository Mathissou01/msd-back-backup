import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Enum_Footer_Accessibilitylevel,
  GetFooterPageDocument,
  useGetFooterPageQuery,
  useUpdateFooterPageMutation,
} from "../../../graphql/codegen/generated-types";
import { extractFooter } from "../../../lib/graphql-data";
import { useContract } from "../../../hooks/useContract";
import { FocusFirstElement } from "../../../lib/utilities";
import PageTitle from "../../../components/PageTitle/PageTitle";
import CommonSpinner from "../../../components/Common/CommonSpinner/CommonSpinner";
import FormInput from "../../../components/Form/FormInput/FormInput";
import CommonButton from "../../../components/Common/CommonButton/CommonButton";
import FormRadioInput from "../../../components/Form/FormRadioInput/FormRadioInput";
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

export default function PersonnalisationFooterPage() {
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
    legalContentTitle: "Contenus légaux",
    accessibilityLinkLabel: "Lien vers la page Accessibilité",
    CGULinkLabel: "Lien vers la page des Conditions générales",
    cookiesPolicyLabel: "Lien vers la page de Politique de cookie",
    confidentialityLabel: "Lien vers la page de Confidentialité",
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
        updateCguSubServiceId: submitData["accessibilitySubService"]["id"],
        updateCguSubServiceData: {
          link: submitData["accessibilitySubService"]["link"],
        },
        updateAccessibilitySubServiceId:
          submitData["accessibilitySubService"]["id"],
        updateAccessibilitySubServiceData: {
          link: submitData["accessibilitySubService"]["link"],
        },
        updateConfidentialitySubServiceId:
          submitData["confidentialitySubService"]["id"],
        updateConfidentialitySubServiceData: {
          link: submitData["confidentialitySubService"]["link"],
        },
        updateCookiesSubServiceId: submitData["cookiesSubService"]["id"],
        updateCookiesSubServiceData: {
          link: submitData["cookiesSubService"]["link"],
        },
        updateContactUsSubServiceId: submitData["contactUsSubService"]["id"],
        updateContactUsSubServiceData: {
          label: submitData["contactUsSubService"]["label"],
          link: submitData["contactUsSubService"]["link"],
        },
      };
      updateFooterPage({
        variables,
        refetchQueries: [
          {
            query: GetFooterPageDocument,
            variables: { contractId },
          },
          "getFooterPage",
        ],
      });
      return new Promise<void>((resolve) => {
        setTimeout(() => resolve(), 1000);
      });
    }
  }

  function onCancel() {
    form.reset();
  }

  /* External Data */
  const { contractId } = useContract();
  const { loading, error, data } = useGetFooterPageQuery({
    variables: { contractId },
  });
  const [updateFooterPage, { loading: mutationLoading, error: mutationError }] =
    useUpdateFooterPageMutation();

  /* Local Data */
  const [isShowingSpinner, setIsShowingSpinner] = useState(false);
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
          ...(footer.attributes.cguSubService?.data?.id
            ? {
                cguSubService: {
                  id: footer.attributes.cguSubService.data.id,
                  link:
                    footer.attributes.cguSubService.data.attributes?.link ??
                    undefined,
                },
              }
            : {}),
          ...(footer.attributes.accessibilitySubService?.data?.id
            ? {
                accessibilitySubService: {
                  id: footer.attributes.accessibilitySubService.data.id,
                  link:
                    footer.attributes.accessibilitySubService.data.attributes
                      ?.link ?? undefined,
                },
              }
            : {}),
          ...(footer.attributes.confidentialitySubService?.data?.id
            ? {
                confidentialitySubService: {
                  id: footer.attributes.confidentialitySubService.data.id,
                  link:
                    footer.attributes.confidentialitySubService.data.attributes
                      ?.link ?? undefined,
                },
              }
            : {}),
          ...(footer.attributes.cookiesSubService?.data?.id
            ? {
                cookiesSubService: {
                  id: footer.attributes.cookiesSubService.data.id,
                  link:
                    footer.attributes.cookiesSubService.data.attributes?.link ??
                    undefined,
                },
              }
            : {}),
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

  const spinnerTimerRef = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (isSubmitting) {
      if (!isShowingSpinner) {
        spinnerTimerRef.current = setTimeout(() => {
          setIsShowingSpinner(true);
        }, 200);
      }
    } else {
      clearTimeout(spinnerTimerRef.current);
      setIsShowingSpinner(false);
    }
  }, [isShowingSpinner, isSubmitting]);

  const focusRef = useCallback((node: HTMLFormElement) => {
    FocusFirstElement(node);
  }, []);

  {
    // TODO: layout shift, handle error redirect,
  }
  if (loading) return <CommonSpinner />;
  if (error) return <span>{error?.message}</span>;
  if (mutationError) return <span>{mutationError?.message}</span>;

  return (
    <>
      <PageTitle title={title} description={description} />
      <div className="c-PersonnalisationFooterPage">
        {isShowingSpinner && <CommonSpinner isCover={true} />}
        <FormProvider {...form}>
          <form
            className="c-PersonnalisationFooterPage__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={focusRef}
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
            <div className="c-PersonnalisationFooterPage__Group">
              <h2 className="c-PersonnalisationFooterPage__Title">
                {formLabels.legalContentTitle}
              </h2>
              <div className="c-PersonnalisationFooterPage__SubGroup c-PersonnalisationFooterPage__SubGroup_short">
                <FormInput
                  type="text"
                  name="accessibilitySubService.link"
                  label={formLabels.accessibilityLinkLabel}
                  isRequired={true}
                  isDisabled={mutationLoading}
                  defaultValue={footerData?.accessibilitySubService?.link}
                />
                <FormInput
                  type="text"
                  name="cguSubService.link"
                  label={formLabels.CGULinkLabel}
                  isRequired={true}
                  isDisabled={mutationLoading}
                  defaultValue={footerData?.cguSubService?.link}
                />
                <FormInput
                  type="text"
                  name="cookiesSubService.link"
                  label={formLabels.cookiesPolicyLabel}
                  isRequired={true}
                  isDisabled={mutationLoading}
                  defaultValue={footerData?.cookiesSubService?.link}
                />
                <FormInput
                  type="text"
                  name="confidentialitySubService.link"
                  label={formLabels.confidentialityLabel}
                  isRequired={true}
                  isDisabled={mutationLoading}
                  defaultValue={footerData?.confidentialitySubService?.link}
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
                isDisabled={!isDirty}
              />
              <CommonButton
                type="button"
                label={formLabels.cancelButtonLabel}
                onClick={onCancel}
                isDisabled={!isDirty}
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
