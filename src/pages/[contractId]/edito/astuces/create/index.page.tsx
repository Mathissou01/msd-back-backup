import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCreateTipByTipSubServiceIdMutation } from "../../../../../graphql/codegen/generated-types";
import { IEditoBlock, TDynamicFieldOption } from "../../../../../lib/edito";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useContract } from "../../../../../hooks/useContract";
import { ICommonSelectOption } from "../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import ContractLayout from "../../../contract-layout";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import EditoForm from "../../../../../components/Edito/EditoForm/EditoForm";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";

export function EditoTipsCreatePage() {
  /* Static Data */
  const title = "Créer une astuce";
  const formLabels = {
    staticTitle: "Titre de l'astuce",
    staticTags: "Thématique",
    staticTagsDescription: "(Tags)",
    staticImage: "Vignette",
    staticImageValidation:
      "Format carré, format .gif, .svg, .png ou .jpg, 30 Mo maximum",
    staticImagePlaceholder:
      "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
    staticShortDescription: "Description courte",
    staticShortDescriptionMaxCharacters:
      "caractères maximum, affichés dans l'aperçu de l'astuce",
  };

  /* Methods */
  async function onSubmit(tipsInputData: FieldValues) {
    const variables = {
      data: {
        tipSubService:
          contract.attributes?.editorialService?.data?.attributes?.tipSubService
            ?.data?.id,
        title: tipsInputData.title,
        tags: tipsInputData.tags?.map(
          (option: ICommonSelectOption) => option.value,
        ),
        image: tipsInputData.image.id,
        shortDescription: tipsInputData.shortDescription,
        blocks: tipsInputData.blocks?.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, ...rest }: IEditoBlock) => rest,
        ),
        unpublishedDate: tipsInputData.unpublishedDate,
      },
    };
    setIsReloading(true);
    return createTipsMutation({
      variables,
      onCompleted: (result) => {
        if (result.createTip?.data?.id) {
          router.push(
            `${currentRoot}/edito/astuces/${result.createTip?.data?.id}`,
          );
        }
      },
    });
  }

  /* External Data */
  const [
    createTipsMutation,
    { loading: createMutationLoading, error: createMutationError },
  ] = useCreateTipByTipSubServiceIdMutation();

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const { contract } = useContract();
  const [isReloading, setIsReloading] = useState(false);
  const isLoading = createMutationLoading;
  const errors = [createMutationError];
  const dynamicFieldOptions: Array<TDynamicFieldOption> = [
    "ComponentBlocksWysiwyg",
    "ComponentBlocksSubHeading",
    "ComponentBlocksHorizontalRule",
    "ComponentBlocksVideo",
    "ComponentBlocksFile",
  ];

  return (
    <div className="o-EditoEditPage">
      <>
        <PageTitle title={title} />
        <CommonLoader isLoading={isLoading || isReloading} errors={errors}>
          <EditoForm
            dynamicFieldsOptions={dynamicFieldOptions}
            onSubmitValid={onSubmit}
            labels={formLabels}
          />
        </CommonLoader>
      </>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <EditoTipsCreatePage />
    </ContractLayout>
  );
}
