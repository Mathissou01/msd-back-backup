import React, { useEffect, useState } from "react";
import chroma from "chroma-js";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  GetContractCustomizationByIdDocument,
  UploadFileEntityResponse,
  useGetContractCustomizationByIdQuery,
  useUpdateContractCustomizationByIdMutation,
  useUpdateContractCustomizationMutation,
} from "../../../../graphql/codegen/generated-types";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import FormFileInput from "../../../../components/Form/FormFileInput/FormFileInput";
import FormColorPalette from "../../../../components/Form/FormColorPalette/FormColorPalette";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import { useContract } from "../../../../hooks/useContract";
import { useFocusFirstElement } from "../../../../hooks/useFocusFirstElement";
import {
  TAcceptedMimeTypes,
  fileSizeLimitation_200kb,
} from "../../../../lib/media";
import ContractLayout from "../../contract-layout";
import "./personnalisation-couleurs-page.scss";

interface IColorPalette {
  contrastText?: string;
  primaryColor?: string;
  primaryColorDark?: string;
  primaryColorLight?: string;
  secondaryColor?: string;
  secondaryColorDark?: string;
  secondaryColorLight?: string;
}

interface IPersonnalisationCouleursPage {
  colorMode: string;
  id: string;
  logo: UploadFileEntityResponse;
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
  const [defaultColorPalette, setDefaultColorPalette] =
    useState<IColorPalette>();
  const form = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: contractCustomizationsData,
  });
  const {
    handleSubmit,
    formState: { isDirty, isSubmitting, isValid },
  } = form;

  /* External Data */
  const { contractId } = useContract();
  const { data, loading, error } = useGetContractCustomizationByIdQuery({
    variables: { contractId },
  });
  const [
    updateContract,
    { loading: mutationLoadingById, error: mutationErrorById },
  ] = useUpdateContractCustomizationByIdMutation();
  const [
    updateContractCustomizationMutation,
    { loading: mutationLoading, error: mutationError },
  ] = useUpdateContractCustomizationMutation();

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (
      contractCustomizationsData?.contractCustomizationId &&
      !primaryErrorMsg
    ) {
      const variables = {
        updateContractCustomizationId:
          contractCustomizationsData?.contractCustomizationId,
        data: {
          primaryColor: colorMode
            ? defaultColorPalette?.primaryColor
            : colorPalette?.primaryColor
            ? chroma(colorPalette?.primaryColor).hex()
            : defaultColorPalette?.primaryColor,
          secondaryColor:
            colorMode || colorPalette?.secondaryColor === ""
              ? defaultColorPalette?.secondaryColor
              : colorPalette?.secondaryColor
              ? chroma(colorPalette?.secondaryColor).hex()
              : defaultColorPalette?.secondaryColor,
          textContrast: colorMode
            ? defaultColorPalette?.contrastText
            : colorPalette?.contrastText
            ? colorPalette?.contrastText
            : defaultColorPalette?.contrastText,
        },
      };
      return updateContractCustomizationMutation({
        variables,
        refetchQueries: [
          {
            query: GetContractCustomizationByIdDocument,
            variables: { contractId },
          },
        ],
      });
    }

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

  function makeDarkerColor(color: string): string {
    return chroma(color).darken().hex();
  }

  function makeLighterColor(color: string): string {
    return chroma(color).alpha(0.1).hex();
  }

  useEffect(() => {
    const contrastText = process.env.NEXT_PUBLIC_CONTRAST_TEXT || "#030f40";
    const primaryColor =
      process.env.NEXT_PUBLIC_COLOR_BRAND_PRIMARY || "#9bcd41";
    const primaryColorDark = makeDarkerColor(primaryColor);
    const primaryColorLight = makeLighterColor(primaryColor);
    const secondaryColor =
      process.env.NEXT_PUBLIC_COLOR_BRAND_SECONDARY ||
      process.env.NEXT_PUBLIC_COLOR_BRAND_PRIMARY ||
      "#ffc229";
    const secondaryColorDark = makeDarkerColor(secondaryColor);
    const secondaryColorLight = makeLighterColor(secondaryColor);

    const defaultColorPalette: IColorPalette = {
      contrastText,
      primaryColor,
      primaryColorDark,
      primaryColorLight,
      secondaryColor,
      secondaryColorDark,
      secondaryColorLight,
    };

    setDefaultColorPalette(defaultColorPalette);

    if (data) {
      const contract = data.contract?.data;
      if (contract?.id && contract.attributes?.logo) {
        const mappedData: IPersonnalisationCouleursPage = {
          colorMode: "0",
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
      <div className="c-PersonnalisationCouleursPage__SvgTogRightAngle" />
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
            <div className="c-PersonnalisationCouleursPage__Content">
              <div className="c-PersonnalisationCouleursPage__Group">
                <h2 className="c-PersonnalisationCouleursPage__Title">
                  {labels.title}
                </h2>
                <span className="c-PersonnalisationCouleursPage__RequiredLabel">
                  {mandatoryFields}
                </span>
                <div className="c-PersonnalisationCouleursPage__SubGroup">
                  <FormFileInput
                    name="logo"
                    label={labels.logoImage}
                    fileSizeLimitation={fileSizeLimitation_200kb}
                    isRequired={true}
                    hasEcoConceptionMessage
                    validationLabel={labels.logoImageValidation}
                    acceptedMimeTypes={acceptedTypes}
                    placeholder={labels.logoImagePlaceholder}
                    mimeFilterContains="image"
                  />
                </div>
              </div>
            </div>
            <div className="c-PersonnalisationCouleursPage__Content">
              <div className="c-PersonnalisationCouleursPage__Group">
                <h2 className="c-PersonnalisationCouleursPage__Title">
                  {labels.colorInputLabel}
                </h2>
                <div className="c-PersonnalisationCouleursPage__SubGroup">
                  <FormColorPalette
                    colorPalette={colorPalette}
                    defaultColorPalette={defaultColorPalette}
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
                style="secondary"
                picto="check"
                isDisabled={!isDirty || primaryErrorMsg || !isValid}
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
