import React, { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  GetContractCustomizationByIdDocument,
  UploadFileEntityResponse,
  useGetContractCustomizationByIdQuery,
  useUpdateContractCustomizationByIdMutation,
} from "../../../../graphql/codegen/generated-types";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import FormFileInput from "../../../../components/Form/FormFileInput/FormFileInput";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { useContract } from "../../../../hooks/useContract";
import { useFocusFirstElement } from "../../../../hooks/useFocusFirstElement";
import { TAcceptedMimeTypes } from "../../../../lib/media";
import ContractLayout from "../../contract-layout";
import "./couleurs.scss";

interface IPersonnalisationCouleursPage {
  id: string;
  logo: UploadFileEntityResponse;
}
export function PersonnalisationCouleursPage() {
  /* Static Data */
  const title = "Couleurs, logo, lien";
  const description = "Personnalisez le site à vos couleurs.";
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";
  const formLabels = {
    title: "Collectivité",
    logoImage: "Logo de la collectivé",
    logoImageValidation: "Format .svg, .png ou .jpg, 200 ko maximum",
    logoImagePlaceholder:
      "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
  };
  const acceptedTypes: Array<TAcceptedMimeTypes> = [
    "image/svg+xml",
    "image/png",
    "image/jpeg",
  ];

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (contractId) {
      const variables = {
        updateContractId: contractId,
        data: {
          logo: submitData["logo"].id,
        },
      };
      return updateContract({
        variables,
        refetchQueries: [
          {
            query: GetContractCustomizationByIdDocument,
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
  const { contractId } = useContract();
  const { loading, error, data } = useGetContractCustomizationByIdQuery({
    variables: { contractId },
  });
  const [updateContract, { loading: mutationLoading, error: mutationError }] =
    useUpdateContractCustomizationByIdMutation();
  /* Local Data */
  const [, setContractCustomizationsData] =
    useState<IPersonnalisationCouleursPage>();
  const formValidationMode = "onChange";
  const form = useForm({
    mode: formValidationMode,
  });
  const { handleSubmit, formState } = form;
  const { isDirty, isSubmitting } = formState;

  useEffect(() => {
    if (data) {
      const contract = data.contract?.data;
      if (contract?.id && contract.attributes?.logo) {
        const mappedData = {
          id: contract.id,
          logo: contract.attributes.logo,
        };
        setContractCustomizationsData(mappedData);
        form.setValue("logo", contract.attributes.logo);
      }
    }
  }, [form, data]);

  return (
    <div className="c-PersonnalisationCouleursPage">
      <div className="c-PersonnalisationCouleursPage__SvgTogRightAngle" />
      <PageTitle title={title} description={description} />
      <CommonLoader
        isLoading={loading || isSubmitting || mutationLoading}
        isShowingContent={isSubmitting || mutationLoading}
        hasDelay={isSubmitting || mutationLoading}
        errors={[error, mutationError]}
      >
        <FormProvider {...form}>
          <form
            className="c-PersonnalisationCouleursPage__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="c-PersonnalisationCouleursPage__Community">
              <div className="c-PersonnalisationCouleursPage__Logo">
                <h2 className="c-PersonnalisationCouleursPage">
                  {formLabels.title}
                </h2>
                <span className="c-PersonnalisationCouleursPage__RequiredLabel">
                  {mandatoryFields}
                </span>
                <FormFileInput
                  name="logo"
                  label={formLabels.logoImage}
                  isRequired={true}
                  hasEcoConceptionMessage
                  validationLabel={formLabels.logoImageValidation}
                  acceptedMimeTypes={acceptedTypes}
                  placeholder={formLabels.logoImagePlaceholder}
                  mimeFilterContains="image"
                />
              </div>
            </div>
            <div className="c-PersonnalisationCouleursPage__Buttons">
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
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <PersonnalisationCouleursPage />
    </ContractLayout>
  );
}
