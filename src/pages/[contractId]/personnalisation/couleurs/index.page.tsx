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
import FormRadioInput from "../../../../components/Form/FormRadioInput/FormRadioInput";
import FormFileInput from "../../../../components/Form/FormFileInput/FormFileInput";
import FormInput from "../../../../components/Form/FormInput/FormInput";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { useContract } from "../../../../hooks/useContract";
import { useFocusFirstElement } from "../../../../hooks/useFocusFirstElement";
import { TAcceptedMimeTypes } from "../../../../lib/media";
import ContractLayout from "../../contract-layout";
import "./personnalisation-couleurs-page.scss";

interface IPersonnalisationCouleursPage {
  pageColor: string;
  id: string;
  logo: UploadFileEntityResponse;
  contractCustomizationId: string | null | undefined;
  primaryColor: string | undefined;
  secondaryColor: string | null | undefined;
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
    colorInputLabel: "Couleurs",
    defaultColor: "Couleurs par déaut",
    personalizedColor: "Couleurs personnalisées",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
  };
  const acceptedTypes: Array<TAcceptedMimeTypes> = [
    "image/svg+xml",
    "image/png",
    "image/jpeg",
  ];

  /* Local Data */
  const [colorsView, setColorsView] = useState<boolean>(true);
  const [contractCustomizationsData, setContractCustomizationsData] =
    useState<IPersonnalisationCouleursPage>();
  const form = useForm({
    mode: "onChange",
    defaultValues: contractCustomizationsData,
  });
  const { handleSubmit, formState } = form;
  const { isDirty, isSubmitting } = formState;

  /* External Data */
  const { contractId } = useContract();
  const { data, loading, error } = useGetContractCustomizationByIdQuery({
    variables: { contractId },
  });
  const [updateContract, { loading: mutationLoading, error: mutationError }] =
    useUpdateContractCustomizationByIdMutation();

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (contractId) {
      const variables = {
        updateContractId: contractId,
        data: {
          logo: submitData.logo.id,
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

  function handleRadioInputChange(data: unknown): void {
    if (data === "0") {
      setColorsView(true);
    } else {
      setColorsView(false);
    }
  }

  useEffect(() => {
    if (data) {
      const contract = data.contract?.data;
      if (contract?.id && contract.attributes?.logo) {
        const mappedData = {
          pageColor: "0",
          id: contract.id,
          logo: contract.attributes.logo,
          contractCustomizationId:
            contract.attributes.contractCustomization?.data?.id,
          primaryColor:
            contract.attributes.contractCustomization?.data?.attributes
              ?.primaryColor,
          secondaryColor:
            contract.attributes.contractCustomization?.data?.attributes
              ?.secondaryColor,
        };
        setContractCustomizationsData(mappedData);
        form.reset(mappedData);
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
            <div className="c-PersonnalisationCouleursPage__Content">
              <div className="c-PersonnalisationCouleursPage__Group">
                <h2 className="c-PersonnalisationCouleursPage__Title">
                  {formLabels.title}
                </h2>
                <span className="c-PersonnalisationCouleursPage__RequiredLabel">
                  {mandatoryFields}
                </span>
                <div className="c-PersonnalisationCouleursPage__SubGroup">
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
            </div>

            <div className="c-PersonnalisationCouleursPage__Content">
              <div className="c-PersonnalisationCouleursPage__Group">
                <h2 className="c-PersonnalisationCouleursPage__Title">
                  {formLabels.colorInputLabel}
                </h2>
                <div className="c-PersonnalisationCouleursPage__SubGroup">
                  <FormRadioInput
                    name="pageColor"
                    displayName=""
                    options={[
                      {
                        value: 0,
                        label: formLabels.defaultColor,
                      },
                      {
                        value: 1,
                        label: formLabels.personalizedColor,
                      },
                    ]}
                    defaultValue={"0"}
                    onChange={handleRadioInputChange}
                  />
                  {colorsView ? (
                    <>
                      <div className="c-PersonnalisationCouleursPage__InputWrapper">
                        <FormInput
                          label="Couleur Principale"
                          name="primaryColor"
                          secondaryLabel="Format hexadécimal, ex: #458203"
                          secondaryLabelStyle="row"
                          isDisabled
                        />
                        <FormInput
                          label="Couleur Secondaire"
                          name="secondaryColor"
                          secondaryLabel="Format hexadécimal, ex: #458203"
                          secondaryLabelStyle="row"
                          isDisabled
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                    // TODO: PersonnalisationCouleursPage: couleurs personnalisées
                  )}
                </div>
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
