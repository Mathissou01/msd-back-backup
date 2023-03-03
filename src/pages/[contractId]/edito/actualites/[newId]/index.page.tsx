import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetNewByIdQuery,
  useUpdateNewMutation,
  GetNewByIdDocument,
  Enum_New_Status,
} from "../../../../../graphql/codegen/generated-types";
import {
  IEditoBlock,
  IEditoFields,
  remapEditoBlocksDynamicZone,
  TDynamicFieldOption,
} from "../../../../../lib/edito";
import { valueToEStatus } from "../../../../../lib/status";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { ICommonSelectOption } from "../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import ContractLayout from "../../../contract-layout";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import EditoForm from "../../../../../components/Edito/EditoForm/EditoForm";
import "./edito-actualites-edit-page.scss";

interface IEditoActualitesEditPageProps {
  newId: string;
}

export function EditoActualitesEditPage({
  newId,
}: IEditoActualitesEditPageProps) {
  /* Static Data */
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
      updateNewId: newId,
      data: {
        title: newsInputData.title,
        tags: newsInputData.tags.map(
          (option: ICommonSelectOption) => option.value,
        ),
        shortDescription: newsInputData.shortDescription,
        blocks: newsInputData.blocks?.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, ...rest }: IEditoBlock) => rest,
        ),
      },
    };
    return updateNew({
      variables,
      refetchQueries: [
        {
          query: GetNewByIdDocument,
          variables: { newId },
        },
      ],
    });
  }

  async function onPublish() {
    const variables = {
      updateNewId: newId,
      data: {
        status: Enum_New_Status.Published,
      },
    };
    return updateNew({
      variables,
      refetchQueries: [
        {
          query: GetNewByIdDocument,
          variables: { newId },
        },
      ],
    });
  }

  /* External Data */
  const { data, loading, error } = useGetNewByIdQuery({
    variables: { newId },
  });
  const [
    updateNew,
    { loading: updateMutationLoading, error: updateMutationError },
  ] = useUpdateNewMutation();
  /* Local data */
  const router = useRouter();
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
    if (data?.new?.data) {
      const newData = data.new.data;
      if (newData?.id && newData.attributes) {
        const mappedData: IEditoFields = {
          id: newData.id,
          status: valueToEStatus(newData.attributes.status),
          title: newData.attributes.title,
          tags:
            newData.attributes.tags?.data.map((tag) => ({
              value: tag.id ?? "",
              label: tag.attributes?.name ?? "",
            })) ?? [],
          shortDescription: newData.attributes.shortDescription,
          blocks: remapEditoBlocksDynamicZone(newData.attributes.blocks),
        };

        setMappedData(mappedData);
      }
    } else if (data?.new && data.new.data === null) {
      void router.push(`${currentRoot}/edito/actualites`);
    }
  }, [data, router, currentRoot]);

  return (
    <div className="c-EditoActualitesEditPage">
      {mappedData && (
        <>
          <PageTitle title={mappedData.title} />
          <CommonLoader isLoading={isLoading} errors={errors}>
            <EditoForm
              data={mappedData}
              dynamicFieldsOptions={dynamicFieldOptions}
              onSubmitValid={onSubmit}
              onPublish={onPublish}
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
  const [newId, setNewId] = useState<string>();

  useEffect(() => {
    const query = router.query.newId;
    let localNewId: string | null | false = null;
    if (query?.toString()) {
      if (Number.parseInt(query.toString())) {
        localNewId = query.toString();
      } else if (query.toString() === "create") {
        localNewId = "0";
      } else {
        localNewId = false;
      }
    }
    if (localNewId) {
      setNewId(localNewId);
    } else if (localNewId === false) {
      void router.push("/404");
    }
  }, [router, setNewId]);

  return (
    <ContractLayout>
      {newId && <EditoActualitesEditPage newId={newId} />}
    </ContractLayout>
  );
}
