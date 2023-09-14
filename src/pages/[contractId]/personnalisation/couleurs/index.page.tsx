import React, { useEffect, useState } from "react";
import chroma from "chroma-js";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  GetContractCustomizationByIdDocument,
  useGetContractCustomizationByIdQuery,
  useUpdateContractCustomizationByContractIdMutation,
  useUpdateContractCustomizationByIdMutation,
} from "../../../../graphql/codegen/generated-types";
import {
  TAcceptedMimeTypes,
  IUploadFileEntity,
  fileSizeLimitationOptions,
} from "../../../../lib/media";
import {
  defaultColorPalette,
  IColorPalette,
  makeDarkerColor,
  makeLighterColor,
} from "../../../../lib/color";
import { useContract } from "../../../../hooks/useContract";
import { useFocusFirstElement } from "../../../../hooks/useFocusFirstElement";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import FormInput from "../../../../components/Form/FormInput/FormInput";
import FormFileInput from "../../../../components/Form/FormFileInput/FormFileInput";
import FormColorPalette from "../../../../components/Form/FormColorPalette/FormColorPalette";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import "./personnalisation-couleurs-page.scss";

interface IPersonnalisationCouleursPage {
  colorMode: string;
  id: string;
  logo: IUploadFileEntity | null;
  communityUrl: string | null;
  contractCustomizationId: string | null | undefined;
  primaryColor: string | undefined;
  secondaryColor: string | null | undefined;
  contrastText: string | undefined;
}

export function PersonnalisationCouleursPage() {
  /* Static Data */
  const title = "Couleurs, logo, lien";
  const description = "Personnalisez le site à vos couleurs.";
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";
  const labels = {
    title: "Collectivité",
    logoImage: "Logo de la collectivé",
    logoImageValidation: "Format .svg, .png ou .jpg, 200 ko maximum",
    logoImagePlaceholder:
      "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
    communityUrl: "URL de la collectivité",
    communityUrlValidation: "L'url doit commencer par http: ou https:",
    colorInputLabel: "Couleurs",
    submitButtonLabel: "Enregistrer les modifications",
    cancelButtonLabel: "Annuler les modifications",
  };
  const acceptedTypes: Array<TAcceptedMimeTypes> = [
    "image/svg+xml",
    "image/png",
    "image/jpeg",
  ];

  /* Local Data */
  const [contractCustomizationsData, setContractCustomizationsData] =
    useState<IPersonnalisationCouleursPage>();
  const [colorMode, setColorMode] = useState<boolean>(true);
  const [primaryErrorMsg, setPrimaryErrorMsg] = useState<boolean>(false);
  const [colorPalette, setColorPalette] = useState<IColorPalette>();
  const form = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: contractCustomizationsData,
  });
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = form;

  /* External Data */
  const { contractId } = useContract();
  const { data, loading, error } = useGetContractCustomizationByIdQuery({
    variables: { contractId },
  });

  const [
    updateContract,
    { loading: mutationLoadingById, error: mutationErrorById },
  ] = useUpdateContractCustomizationByContractIdMutation();
  const [
    updateContractCustomization,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateContractCustomizationByIdMutation();

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (contractId) {
      const variables = {
        updateContractId: contractId,
        data: {
          logo: submitData.logo.id,
          communityUrl: submitData.communityUrl,
        },
      };
      updateContract({
        variables,
        refetchQueries: [
          {
            query: GetContractCustomizationByIdDocument,
            variables: { contractId },
          },
        ],
      });
    }
    if (
      contractCustomizationsData?.contractCustomizationId &&
      !primaryErrorMsg
    ) {
      const variables = {
        updateContractCustomizationId:
          contractCustomizationsData?.contractCustomizationId,
        data: {
          primaryColor: colorMode
            ? defaultColorPalette.primaryColor
            : colorPalette?.primaryColor
            ? chroma(colorPalette?.primaryColor).hex()
            : defaultColorPalette.primaryColor,
          secondaryColor:
            colorMode || colorPalette?.secondaryColor === ""
              ? defaultColorPalette.secondaryColor
              : colorPalette?.secondaryColor
              ? chroma(colorPalette?.secondaryColor).hex()
              : defaultColorPalette.secondaryColor,
          textContrast: colorMode
            ? defaultColorPalette.contrastText
            : colorPalette?.contrastText
            ? colorPalette?.contrastText
            : defaultColorPalette.contrastText,
        },
      };
      return updateContractCustomization({
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

  useEffect(() => {
    if (data) {
      const contract = data.contract?.data;
      if (contract?.id && contract.attributes?.logo) {
        const mappedData: IPersonnalisationCouleursPage = {
          colorMode: "0",
          id: contract.id,
          logo: contract.attributes.logo.data ?? null,
          communityUrl: contract.attributes.communityUrl ?? null,
          contractCustomizationId:
            contract.attributes.contractCustomization?.data?.id,
          primaryColor:
            contract.attributes.contractCustomization?.data?.attributes
              ?.primaryColor,
          secondaryColor:
            contract.attributes.contractCustomization?.data?.attributes
              ?.secondaryColor,
          contrastText:
            contract.attributes.contractCustomization?.data?.attributes
              ?.textContrast,
        };
        if (
          mappedData.primaryColor === defaultColorPalette.primaryColor &&
          mappedData.secondaryColor === defaultColorPalette.secondaryColor
        ) {
          mappedData.colorMode = "0";

          setColorMode(true);
        } else if (
          mappedData.primaryColor !== undefined &&
          mappedData.secondaryColor !== undefined &&
          mappedData.secondaryColor !== null
        ) {
          mappedData.colorMode = "1";

          setColorMode(false);

          const primaryColor = mappedData.primaryColor;
          const primaryColorDark = makeDarkerColor(mappedData.primaryColor);
          const primaryColorLight = makeLighterColor(mappedData.primaryColor);
          const secondaryColor = mappedData.secondaryColor;
          const secondaryColorDark = makeDarkerColor(mappedData.secondaryColor);
          const secondaryColorLight = makeLighterColor(
            mappedData.secondaryColor,
          );
          const contrastText = mappedData.contrastText;

          const colorPalette: IColorPalette = {
            contrastText,
            primaryColor,
            primaryColorDark,
            primaryColorLight,
            secondaryColor,
            secondaryColorDark,
            secondaryColorLight,
          };
          setColorPalette(colorPalette);
        }
        setContractCustomizationsData(mappedData);
        form.reset(mappedData);
      }
    }
  }, [form, data]);

  return (
    <div className="c-PersonnalisationCouleursPage">
      <PageTitle title={title} description={description} />
      <CommonLoader
        isLoading={
          loading || isSubmitting || mutationLoading || mutationLoadingById
        }
        isShowingContent={
          isSubmitting || mutationLoading || mutationLoadingById
        }
        hasDelay={isSubmitting || mutationLoading || mutationLoadingById}
        errors={[error, mutationError, mutationErrorById]}
      >
        <FormProvider {...form}>
          <form
            className="c-PersonnalisationCouleursPage__Form"
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <div className="o-Form__Group">
              <div className="c-PersonnalisationCouleursPage__Group">
                <h2 className="c-PersonnalisationCouleursPage__Title">
                  {labels.title}
                </h2>
                <span className="o-Form__RequiredLabel">{mandatoryFields}</span>
                <div className="c-PersonnalisationCouleursPage__SubGroup">
                  <FormFileInput
                    name="logo"
                    label={labels.logoImage}
                    fileSizeLimitation={fileSizeLimitationOptions._200kb}
                    isRequired={true}
                    hasEcoConceptionMessage
                    validationLabel={labels.logoImageValidation}
                    acceptedMimeTypes={acceptedTypes}
                    placeholder={labels.logoImagePlaceholder}
                  />
                </div>
                <div className="c-PersonnalisationCouleursPage__CommunityUrlInput">
                  <FormInput
                    type="text"
                    name="communityUrl"
                    label={labels.communityUrl}
                    patternValidation={/^(http:|https:)/}
                    patternValidationErrorMessage={
                      labels.communityUrlValidation
                    }
                  />
                </div>
              </div>
            </div>
            <div className="o-Form__Group">
              <div className="c-PersonnalisationCouleursPage__Group">
                <h2 className="c-PersonnalisationCouleursPage__Title">
                  {labels.colorInputLabel}
                </h2>
                <div className="c-PersonnalisationCouleursPage__SubGroup">
                  <FormColorPalette
                    colorPalette={colorPalette}
                    colorMode={colorMode}
                    primaryErrorMsg={primaryErrorMsg}
                    setColorPalette={setColorPalette}
                    setColorMode={setColorMode}
                    setPrimaryErrorMsg={setPrimaryErrorMsg}
                  />
                </div>
              </div>
            </div>
            <div className="c-PersonnalisationCouleursPage__Buttons">
              <CommonButton
                type="submit"
                label={labels.submitButtonLabel}
                style="primary"
                picto="check"
                isDisabled={!isDirty || primaryErrorMsg}
              />
              <CommonButton
                type="button"
                label={labels.cancelButtonLabel}
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
