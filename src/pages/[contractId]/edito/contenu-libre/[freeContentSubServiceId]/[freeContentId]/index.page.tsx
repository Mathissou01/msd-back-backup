import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetFreeContentByIdQuery,
  useUpdateFreeContentMutation,
  GetFreeContentsBySubServiceIdDocument,
  Enum_Freecontent_Status,
  GetFreeContentByIdDocument,
} from "../../../../../../graphql/codegen/generated-types";
import {
  IEditoBlock,
  IEditoFields,
  remapEditoBlocksDynamicZone,
  TDynamicFieldOption,
} from "../../../../../../lib/edito";
import { valueToEStatus } from "../../../../../../lib/status";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import { ICommonSelectOption } from "../../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import ContractLayout from "../../../../contract-layout";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import EditoForm from "../../../../../../components/Edito/EditoForm/EditoForm";

interface IEditoFreeContentEditPageProps {
  freeContentId: string;
}

export function EditoFreeContentEditPage({
  freeContentId,
}: IEditoFreeContentEditPageProps) {
  /* Static Data */
  const formLabels = {
    staticTitle: "Titre de l'article",
    staticTagsLabel: "Thématique ",
    staticTagsLabelDescription: "(Tags)",
    staticShortDescription: "Description courte",
    staticShortDescriptionMaxCharacters:
      "caractères maximum, affichés dans l'aperçu de l'article",
  };

  const router = useRouter();
  // const { freeContentId } = router.query;
  /* Methods */
  async function onSubmit(freeContentsInputData: FieldValues) {
    const variables = {
      updateFreeContentId: freeContentId,
      data: {
        title: freeContentsInputData.title,
        tags: freeContentsInputData.tags.map(
          (option: ICommonSelectOption) => option.value,
        ),
        shortDescription: freeContentsInputData.shortDescription,
        blocks: freeContentsInputData.blocks?.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, ...rest }: IEditoBlock) => rest,
        ),
        unpublishedDate: freeContentsInputData.unpublishedDate,
      },
    };
    return updateFreeContent({
      variables,
      refetchQueries: [
        {
          query: GetFreeContentByIdDocument,
          variables: { freeContentId },
        },
      ],
    });
  }

  async function onPublish() {
    const variables = {
      updateFreeContentId: freeContentId,
      data: {
        status: Enum_Freecontent_Status.Published,
      },
    };
    return updateFreeContent({
      variables,
      refetchQueries: [
        {
          query: GetFreeContentsBySubServiceIdDocument,
          variables: { freeContentId },
        },
      ],
    });
  }

  async function onDepublish() {
    const variables = {
      updateFreeContentId: freeContentId,
      data: {
        status: Enum_Freecontent_Status.Archived,
      },
    };
    return updateFreeContent({
      variables,
      refetchQueries: [
        {
          query: GetFreeContentsBySubServiceIdDocument,
          variables: { freeContentId },
        },
      ],
    });
  }
  const localFreeContentId = router.query.freeContentId?.toString()
    ? Number.parseInt(router.query.freeContentId?.toString())
      ? `${router.query.freeContentId}`
      : false
    : null;

  /* External Data */
  const { data, loading, error } = useGetFreeContentByIdQuery({
    variables: { freeContentId: `${localFreeContentId}` },
  });
  const [
    updateFreeContent,
    { loading: updateMutationLoading, error: updateMutationError },
  ] = useUpdateFreeContentMutation();
  /* Local data */
  const { currentRoot } = useNavigation();
  const isLoading = loading || updateMutationLoading;
  const errors = [error, updateMutationError];
  const [mappedData, setMappedData] = useState<IEditoFields>();
  const dynamicFieldOptions: Array<TDynamicFieldOption> = [
    "ComponentBlocksSubHeading",
    "ComponentBlocksHorizontalRule",
    "ComponentBlocksVideo",
  ];

  useEffect(() => {
    if (data?.freeContent?.data) {
      const freeContentData = data.freeContent.data;
      if (freeContentData?.id && freeContentData.attributes) {
        const mappedData: IEditoFields = {
          id: freeContentData.id,
          status: valueToEStatus(freeContentData.attributes.status),
          title: freeContentData.attributes.title,
          tags:
            freeContentData.attributes.tags?.data.map((tag) => ({
              value: tag.id ?? "",
              label: tag.attributes?.name ?? "",
            })) ?? [],
          shortDescription: freeContentData.attributes.shortDescription,
          blocks: remapEditoBlocksDynamicZone(
            freeContentData.attributes.blocks,
          ),
          unpublishedDate: freeContentData.attributes.unpublishedDate,
        };

        setMappedData(mappedData);
      }
    } else if (data?.freeContent && data.freeContent.data === null) {
      void router.push(`${currentRoot}/edito/contenu-libre`);
    }
  }, [data, router, currentRoot]);

  return (
    <div className="o-EditoEditPage">
      {mappedData && (
        <>
          <PageTitle title={mappedData.title} />
          <CommonLoader isLoading={isLoading} errors={errors}>
            <EditoForm
              data={mappedData}
              dynamicFieldsOptions={dynamicFieldOptions}
              onSubmitValid={onSubmit}
              onPublish={onPublish}
              onDepublish={onDepublish}
              labels={formLabels}
            />
          </CommonLoader>
        </>
      )}
    </div>
  );
}

export default function IndexPage() {
  const router = useRouter();
  const [freeContentId, setFreeContentId] = useState<string>();

  useEffect(() => {
    const query = router.query.freeContentId;
    let localFreeContentId: string | null | false = null;
    if (query?.toString()) {
      if (Number.parseInt(query.toString())) {
        localFreeContentId = query.toString();
      } else if (query.toString() === "create") {
        localFreeContentId = "0";
      } else {
        localFreeContentId = false;
      }
    }
    if (localFreeContentId) {
      setFreeContentId(localFreeContentId);
    } else if (localFreeContentId === false) {
      void router.push("/404");
    }
  }, [router, setFreeContentId]);

  return (
    <ContractLayout>
      {freeContentId && (
        <EditoFreeContentEditPage freeContentId={freeContentId} />
      )}
    </ContractLayout>
  );
}
