import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRightsByLabel } from "../../../../lib/user";
import { useUser } from "../../../../hooks/useUser";
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
import FormCheckbox from "../../../../components/Form/FormCheckbox/FormCheckbox";
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
  linkName?: string;
  linkUrl?: string;
}

export function PersonnalisationFooterPage() {
  /* Static Data */
  const title = "Footer";
  const description = "Paramétrez les liens présents en bas de page.";
  const formLabels = {
    linkToClient: {
      title: "Lien vers le site client",
      textdisplayClientLink: "Afficher ce lien",
      linkToClientPage: "Lien vers le site client",
    },
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

  const externalLinkRegex =
    //eslint-disable-next-line
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const externalLintMsgError = "le format d'url n'est pas correct";

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["id"]) {
      const variables = {
        updateFooterId: submitData["id"],
        updateFooterData: {
          accessibilityLevel: submitData["accessibilityLevel"],
          linkName: submitData["displayLink"] ? submitData["linkName"] : "",
          linkUrl: submitData["displayLink"] ? submitData["linkUrl"] : "",
          displayLink: submitData["displayLink"],
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
  const router = useRouter();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Footer", userRights);

  if (!userPermissions.read) router.push(`/${contractId}`);
  const [footerData, setFooterData] = useState<IFooterData>();
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, formState, watch } = form;
  const { isDirty, isSubmitting } = formState;
  const linkToClientWatched = watch("displayLink");

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
          linkName: footer.attributes.linkName ?? "",
          linkUrl: footer.attributes.linkUrl ?? "",
          displayLink: footer.attributes.displayLink,
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
              <div className="c-PersonnalisationFooterPage__Group">
                <h2 className="c-PersonnalisationFooterPage__Title">
                  {formLabels.linkToClient.title}
                </h2>
                <div className="c-PersonnalisationFooterPage__SubGroup">
                  <FormCheckbox
                    name="displayLink"
                    label={formLabels.linkToClient.textdisplayClientLink}
                    isDisabled={!userPermissions.update}
                  />
                  {linkToClientWatched && (
                    <>
                      {" "}
                      <div className="c-PersonnalisationFooterPage__SubGroup_short">
                        <div className="c-PersonnalisationFooterPage__SubGroupInput">
                          <FormInput
                            type="text"
                            name="linkName"
                            label={"Texte du lien"}
                            defaultValue={footerData?.linkName}
                            isRequired
                            isDisabled={!userPermissions.update}
                          />
                        </div>
                        <FormInput
                          type="url"
                          name="linkUrl"
                          label={formLabels.linkToClient.linkToClientPage}
                          defaultValue={footerData?.linkUrl}
                          placeholder="https://"
                          patternValidation={externalLinkRegex}
                          patternValidationErrorMessage={externalLintMsgError}
                          isRequired
                          isDisabled={!userPermissions.update}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
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
                    isDisabled={!userPermissions.update}
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
                      isDisabled={mutationLoading || !userPermissions.update}
                      defaultValue={footerData.contactUsSubService?.label}
                    />
                    <FormInput
                      type="text"
                      name="contactUsSubService.link"
                      label={formLabels.contactUsLink}
                      isRequired={false}
                      isDisabled={mutationLoading || !userPermissions.update}
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
                  isDisabled={!isDirty || !userPermissions.update}
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
