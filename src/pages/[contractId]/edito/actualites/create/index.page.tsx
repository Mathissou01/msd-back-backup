import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCreateNewMutation } from "../../../../../graphql/codegen/generated-types";
import { IEditoBlock, TDynamicFieldOption } from "../../../../../lib/edito";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useContract } from "../../../../../hooks/useContract";
import { ICommonSelectOption } from "../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import ContractLayout from "../../../contract-layout";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import EditoForm from "../../../../../components/Edito/EditoForm/EditoForm";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import "../[newId]/edito-actualites-edit-page.scss";

export function EditoActualitesCreatePage() {
  /* Static Data */
  const title = "Créer une actualité";
  const formLabels = {
    staticTitle: "Titre de l'actualité",
    staticTags: "Thématique (tags)",
    staticShortDescription: "Description courte",
    staticShortDescriptionMaxCharacters:
      "caractères maximum, affichés dans l'aperçu de l'actualité",
  };

  /* Methods */
  async function onSubmit(newsInputData: FieldValues) {
    const variables = {
      data: {
        newsSubService:
          contract.attributes?.editorialService?.data?.attributes
            ?.newsSubService?.data?.id,
        title: newsInputData.title,
        tags: newsInputData.tags?.map(
          (option: ICommonSelectOption) => option.value,
        ),
        shortDescription: newsInputData.shortDescription,
        blocks: newsInputData.blocks?.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, ...rest }: IEditoBlock) => rest,
        ),
        unpublishedDate: newsInputData.unpublishedDate,
      },
    };
    setIsReloading(true);
    return createNewsMutation({
      variables,
      onCompleted: (result) => {
        if (result.createNew?.data?.id) {
          router.push(
            `${currentRoot}/edito/actualites/${result.createNew?.data?.id}`,
          );
        }
      },
    });
  }

  /* External Data */
  const [
    createNewsMutation,
    { loading: createMutationLoading, error: createMutationError },
  ] = useCreateNewMutation();

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const { contract } = useContract();
  const [isReloading, setIsReloading] = useState(false);
  const isLoading = createMutationLoading;
  const errors = [createMutationError];
  const dynamicFieldOptions: Array<TDynamicFieldOption> = [
    "ComponentBlocksSubHeading",
    "ComponentBlocksHorizontalRule",
    "ComponentBlocksVideo",
  ];

  return (
    <div className="c-EditoActualitesEditPage">
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
      <EditoActualitesCreatePage />
    </ContractLayout>
  );
}
