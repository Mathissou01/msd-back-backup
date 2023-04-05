import { parseJSON } from "date-fns";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetTipByIdQuery,
  useUpdateTipMutation,
  GetTipByIdDocument,
  Enum_Tip_Status,
} from "../../../../../graphql/codegen/generated-types";
import {
  IEditoBlock,
  IEditoFields,
  remapEditoBlocksDynamicZone,
  TDynamicFieldOption,
} from "../../../../../lib/edito";
import { valueToEStatus } from "../../../../../lib/status";
import { formatDate } from "../../../../../lib/utilities";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { ICommonSelectOption } from "../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import ContractLayout from "../../../contract-layout";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import EditoForm from "../../../../../components/Edito/EditoForm/EditoForm";

interface IEditoTipsEditPageProps {
  tipId: string;
}

export function EditoTipsEditPage({ tipId }: IEditoTipsEditPageProps) {
  /* Static Data */
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
      updateTipId: tipId,
      data: {
        title: tipsInputData.title,
        tags: tipsInputData.tags.map(
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

    return updateTip({
      variables,
      refetchQueries: [
        {
          query: GetTipByIdDocument,
          variables: { tipId },
        },
      ],
    });
  }

  async function onPreview() {
    if (typeof window !== "undefined") {
      window.open(
        `${currentRoot}/edito/astuces/preview?id=${tipId}`,
        "_blank",
        "noreferrer",
      );
    } else {
      router.push("/404");
    }
  }

  async function onPublish() {
    const variables = {
      updateTipId: tipId,
      data: {
        status: Enum_Tip_Status.Published,
      },
    };
    return updateTip({
      variables,
      refetchQueries: [
        {
          query: GetTipByIdDocument,
          variables: { tipId },
        },
      ],
    });
  }

  async function onDepublish() {
    const variables = {
      updateTipId: tipId,
      data: {
        status: Enum_Tip_Status.Archived,
        unpublishedDate: new Date(),
      },
    };
    return updateTip({
      variables,
      refetchQueries: [
        {
          query: GetTipByIdDocument,
          variables: { tipId },
        },
      ],
    });
  }

  /* External Data */
  const { data, loading, error } = useGetTipByIdQuery({
    variables: { tipId },
  });
  const [
    updateTip,
    { loading: updateMutationLoading, error: updateMutationError },
  ] = useUpdateTipMutation();
  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const isLoading = loading || updateMutationLoading;
  const errors = [error, updateMutationError];
  const [mappedData, setMappedData] = useState<IEditoFields>();
  const dynamicFieldOptions: Array<TDynamicFieldOption> = [
    "ComponentBlocksWysiwyg",
    "ComponentBlocksSubHeading",
    "ComponentBlocksHorizontalRule",
    "ComponentBlocksVideo",
    "ComponentBlocksFile",
  ];

  useEffect(() => {
    if (data?.tip?.data) {
      const tipData = data.tip.data;
      if (tipData?.id && tipData.attributes) {
        const mappedData: IEditoFields = {
          id: tipData.id,
          status: valueToEStatus(tipData.attributes.status),
          title: tipData.attributes.title,
          image: tipData.attributes.image.data ?? null,
          tags:
            tipData.attributes.tags?.data.map((tag) => ({
              value: tag.id ?? "",
              label: tag.attributes?.name ?? "",
            })) ?? [],
          shortDescription: tipData.attributes.shortDescription,
          blocks: remapEditoBlocksDynamicZone(tipData.attributes.blocks),
          unpublishedDate: tipData.attributes.unpublishedDate,

          createdAt: formatDate(
            parseJSON(tipData.attributes.createdAt),
            "dd/MM/yyyy HH:mm",
          ),
          updatedAt: formatDate(
            parseJSON(tipData.attributes.updatedAt),
            "dd/MM/yyyy HH:mm",
          ),
        };
        setMappedData(mappedData);
      }
    } else if (data?.tip && data.tip.data === null) {
      void router.push(`${currentRoot}/edito/astuces`);
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
              onPreview={onPreview}
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
  const [tipId, setTipId] = useState<string>();

  useEffect(() => {
    const query = router.query.tipId;
    let localTipId: string | null | false = null;
    if (query?.toString()) {
      if (Number.parseInt(query.toString())) {
        localTipId = query.toString();
      } else if (query.toString() === "create") {
        localTipId = "0";
      } else {
        localTipId = false;
      }
    }
    if (localTipId) {
      setTipId(localTipId);
    } else if (localTipId === false) {
      void router.push("/404");
    }
  }, [router, setTipId]);

  return (
    <ContractLayout>
      {tipId && <EditoTipsEditPage tipId={tipId} />}
    </ContractLayout>
  );
}
