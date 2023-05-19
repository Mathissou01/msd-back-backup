import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { parseJSON } from "date-fns";
import { FieldValues } from "react-hook-form/dist/types/fields";
import ContractLayout from "../../../contract-layout";
import {
  Enum_Wasteform_Status,
  useGetContractByIdQuery,
  useUpdateWasteFormMutation,
  useGetWasteFormByIdQuery,
  GetWasteFormByIdDocument,
} from "../../../../../graphql/codegen/generated-types";
import {
  TDynamicFieldOption,
  remapEditoBlocksDynamicZone,
} from "../../../../../lib/edito";
import { valueToEStatus } from "../../../../../lib/status";
import { formatDate } from "../../../../../lib/utilities";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import {
  IServiceGuideDuTri,
  IServicesBlock,
} from "../../../../../lib/services";
import RecyclingGuideForm from "../../../../../components/RecyclingGuide/RecyclingGuideForm";
import { ICommonSelectOption } from "../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";

interface IServiceGuideDuTriEditPageProps {
  wasteFormId: string;
}

export function ServiceGuideDuTriEditPage({
  wasteFormId,
}: IServiceGuideDuTriEditPageProps) {
  /* Static Data */
  const formLabels = {
    staticTitle: "Nom du déchet",
    staticTags: "Thématiques associées",
    staticWasteFamily: "Famille de déchets",
    staticPicto: "Pictogramme du déchet",
    staticFlow: "Flux",
    staticRecyclingGestureText: "Texte geste du tri",
    staticImageValidation:
      "Format carré, format .gif, .svg, .png ou .jpg, 30 Mo maximum",
    staticImagePlaceholder:
      "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
  };

  /* External Data */
  const { contractId } = useContract();

  const {
    data: getContractData,
    loading: getContractLoading,
    error: getContractError,
  } = useGetContractByIdQuery({ variables: { contractId } });

  const { data, loading, error } = useGetWasteFormByIdQuery({
    variables: { wasteFormId },
    fetchPolicy: "network-only",
  });

  const [
    updateWasteFormMutation,
    { loading: updateWasteFormLoading, error: updateWasteFormError },
  ] = useUpdateWasteFormMutation();

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const isLoading = loading || updateWasteFormLoading || getContractLoading;
  const errors = [error, updateWasteFormError, getContractError];
  const [mappedData, setMappedData] = useState<IServiceGuideDuTri>();
  const dynamicFieldOptions: Array<TDynamicFieldOption> = [
    "ComponentBlocksWysiwyg",
    "ComponentBlocksSubHeading",
    "ComponentBlocksHorizontalRule",
    "ComponentBlocksVideo",
    "ComponentBlocksFile",
    "ComponentBlocksImage",
  ];

  useEffect(() => {
    if (data?.wasteForm?.data) {
      const ficheDechetData = data.wasteForm.data;

      if (
        ficheDechetData.id &&
        ficheDechetData.attributes &&
        ficheDechetData.attributes.wasteFamily?.data
      ) {
        const mappedData: IServiceGuideDuTri = {
          id: ficheDechetData.id,
          status: valueToEStatus(ficheDechetData.attributes.status),
          name: ficheDechetData.attributes.name ?? "",
          picto: ficheDechetData.attributes.picto ?? null,
          tags:
            ficheDechetData.attributes.tags?.data.map((tag) => ({
              value: tag.id ?? "",
              label: tag.attributes?.name ?? "",
            })) ?? [],
          flow: ficheDechetData.attributes.flow?.data?.id ?? "0",
          recyclingGestureText:
            ficheDechetData.attributes.recyclingGestureText ?? "",
          wasteFamily: ficheDechetData.attributes.wasteFamily.data,
          blocks: remapEditoBlocksDynamicZone(
            ficheDechetData.attributes.contentBlock,
          ),
          publishedDate: ficheDechetData.attributes.publishedDate,
          unpublishedDate: ficheDechetData.attributes.unpublishedDate,

          createdAt: formatDate(
            parseJSON(ficheDechetData.attributes.createdAt),
            "dd/MM/yyyy HH:mm",
          ),
          updatedAt: formatDate(
            parseJSON(ficheDechetData.attributes.updatedAt),
            "dd/MM/yyyy HH:mm",
          ),
        };
        setMappedData(mappedData);
      }
    } else if (data?.wasteForm && data.wasteForm.data === null) {
      void router.push(`${currentRoot}/edito/actualites`);
    }
  }, [data, router, currentRoot]);

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const variables = {
      updateWasteFormId: wasteFormId,
      data: {
        status: submitData.status,
        name: submitData.name,
        picto: submitData.picto.id,
        tags: submitData.tags.map(
          (option: ICommonSelectOption) => option.value,
        ),
        flow: submitData.flow,
        recyclingGestureText: submitData.recyclingGestureText,
        wasteFamily: submitData.wasteFamily.id,
        contentBlock: submitData.blocks?.map(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ({ id, ...rest }: IServicesBlock) => rest,
        ),
        unpublishedDate: submitData.unpublishedDate,
      },
    };

    return updateWasteFormMutation({
      variables,
      refetchQueries: [
        {
          query: GetWasteFormByIdDocument,
          variables: {
            recyclingGuideId:
              getContractData?.contract?.data?.attributes?.recyclingGuideService
                ?.data?.id ?? "1",
            wasteFormId,
          },
        },
      ],
    });
  }

  async function onPublish() {
    const variables = {
      updateWasteFormId: wasteFormId,
      data: {
        status: Enum_Wasteform_Status.Published,
      },
    };
    return updateWasteFormMutation({
      variables,
      refetchQueries: [
        {
          query: GetWasteFormByIdDocument,
          variables: {
            recyclingGuideId:
              getContractData?.contract?.data?.attributes?.recyclingGuideService
                ?.data?.id ?? "1",
            wasteFormId,
          },
        },
      ],
    });
  }

  async function onDepublish() {
    const variables = {
      updateWasteFormId: wasteFormId,
      data: {
        status: Enum_Wasteform_Status.Archived,
        unpublishedDate: new Date(),
      },
    };
    return updateWasteFormMutation({
      variables,
      refetchQueries: [
        {
          query: GetWasteFormByIdDocument,
          variables: {
            recyclingGuideId:
              getContractData?.contract?.data?.attributes?.recyclingGuideService
                ?.data?.id ?? "1",
            wasteFormId,
          },
        },
      ],
    });
  }

  return (
    <div className="o-FormEditPage">
      {mappedData && (
        <>
          <PageTitle title={mappedData.name} />
          <CommonLoader isLoading={isLoading} errors={errors}>
            <RecyclingGuideForm
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

  const [wasteFormId, setficheDechetId] = useState<string>();

  useEffect(() => {
    const query = router.query.wasteFormId;
    let localWasteFormId: string | null | false = null;
    if (query?.toString()) {
      if (Number.parseInt(query.toString())) {
        localWasteFormId = query.toString();
      } else {
        localWasteFormId = false;
      }
    }
    if (localWasteFormId) {
      setficheDechetId(localWasteFormId);
    } else if (localWasteFormId === false) {
      void router.push("/404");
    }
  }, [router, setficheDechetId]);

  return (
    <ContractLayout>
      {wasteFormId && <ServiceGuideDuTriEditPage wasteFormId={wasteFormId} />}
    </ContractLayout>
  );
}
