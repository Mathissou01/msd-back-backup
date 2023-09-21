import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContract } from "../../../../../../hooks/useContract";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import client from "../../../../../../graphql/client";
import { parseJSON } from "date-fns";
import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  Enum_Wasteform_Status,
  useGetContractByIdQuery,
  useUpdateWasteFormByIdMutation,
  useGetWasteFormByIdQuery,
  GetWasteFormByIdDocument,
  GetWasteFormsDraftByCustomIdQuery,
  GetWasteFormsDraftByCustomIdDocument,
  AudienceEntity,
} from "../../../../../../graphql/codegen/generated-types";
import { EStatus, valueToEStatus } from "../../../../../../lib/status";
import { formatDate, removeNulls } from "../../../../../../lib/utilities";
import { IWasteFormFields } from "../../../../../../lib/recycling-guide";
import {
  IFormBlock,
  remapFormBlocksDynamicZone,
  TDynamicFieldConfiguration,
} from "../../../../../../lib/dynamic-blocks";
import { useRoutingQueryId } from "../../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";
import { IFormSingleMultiselectOption } from "../../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import WasteFormForm from "../../../../../../components/RecyclingGuide/WasteForm/WasteFormForm";

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

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const variables = {
      updateWasteFormId: wasteFormId,
      data: {
        status: submitData.status,
        name: submitData.name,
        picto: submitData.picto.id,
        tags: submitData.tags.map(
          (option: IFormSingleMultiselectOption) => option.value,
        ),
        flow: submitData.flow,
        recyclingGestureText: submitData.recyclingGestureText,
        wasteFamily: submitData.wasteFamily?.id ?? null,
        contentBlock: submitData.contentBlock
          ?.map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ id, ...rest }: IFormBlock) => {
              if (Object.hasOwn(rest, "__typename")) {
                return rest;
              }
            },
          )
          .filter(removeNulls),
        unpublishedDate: submitData.unpublishedDate,
        audiences: submitData.audiences.map(
          (user: IFormSingleMultiselectOption) => user.value.toString(),
        ),
        toBeUpdated: true,
      },
    };
    return updateWasteForm({
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
      onCompleted: (result) => {
        if (
          variables.data.status !== EStatus.Draft &&
          result.versioningHandler?.data?.__typename === "WasteFormEntity" &&
          result.versioningHandler.data.attributes?.customId
        ) {
          client
            .query<GetWasteFormsDraftByCustomIdQuery>({
              query: GetWasteFormsDraftByCustomIdDocument,
              variables: {
                customId: result.versioningHandler.data.attributes.customId,
              },
              fetchPolicy: "no-cache",
            })
            .then((drafts) => {
              if (drafts.data.wasteForms?.data[0]) {
                router.push(
                  `${currentRoot}/services/guide-tri/fiche-dechet/${drafts.data.wasteForms.data[0].id}`,
                );
              }
            });
        }
      },
    });
  }

  async function onPublish() {
    const variables = {
      updateWasteFormId: wasteFormId,
      data: {
        status: Enum_Wasteform_Status.Published,
        toBeUpdated: false,
      },
    };
    return updateWasteForm({
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

  async function onPreview(freeContentId: string) {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams({
        id: freeContentId,
        type: "wasteForm",
      });

      window.open(
        `${currentRoot}/preview?${queryParams.toString()}`,
        "_blank",
        "noreferrer",
      );
    } else {
      return router.push("/404");
    }
  }

  async function onDepublish() {
    const variables = {
      updateWasteFormId: wasteFormId,
      data: {
        status: Enum_Wasteform_Status.Archived,
        unpublishedDate: new Date(),
        toBeUpdated: false,
      },
    };
    return updateWasteForm({
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
    updateWasteForm,
    { loading: updateWasteFormLoading, error: updateWasteFormError },
  ] = useUpdateWasteFormByIdMutation();

  /* Local data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const isLoading = loading || updateWasteFormLoading || getContractLoading;
  const errors = [error, updateWasteFormError, getContractError];
  const [mappedData, setMappedData] = useState<IWasteFormFields>();
  const dynamicFieldConfigurations: Array<TDynamicFieldConfiguration> = [
    { option: "ComponentBlocksWysiwyg" },
    { option: "ComponentBlocksSubHeading" },
    { option: "ComponentBlocksHorizontalRule" },
    { option: "ComponentBlocksVideo" },
    { option: "ComponentBlocksFile" },
    { option: "ComponentBlocksImage" },
    { option: "ComponentBlocksServices" },
  ];

  useEffect(() => {
    if (data?.wasteForm?.data) {
      const wasteFormData = data.wasteForm.data;

      if (
        wasteFormData.id &&
        wasteFormData.attributes &&
        wasteFormData.attributes.customId
      ) {
        const mappedData: IWasteFormFields = {
          id: wasteFormData.id,
          customId: wasteFormData.attributes.customId,
          status: valueToEStatus(wasteFormData.attributes.status),
          name: wasteFormData.attributes.name ?? "",
          picto: wasteFormData.attributes.picto?.data ?? null,
          tags:
            wasteFormData.attributes.tags?.data.map((tag) => ({
              value: tag.id ?? "",
              label: tag.attributes?.name ?? "",
            })) ?? [],
          flow: wasteFormData.attributes.flow?.data?.id ?? "0",
          recyclingGestureText:
            wasteFormData.attributes.recyclingGestureText ?? "",
          wasteFamily: wasteFormData.attributes.wasteFamily?.data ?? null,
          contentBlock: remapFormBlocksDynamicZone(
            wasteFormData.attributes.contentBlock,
          ),
          publishedDate: wasteFormData.attributes.publishedDate,
          unpublishedDate: wasteFormData.attributes.unpublishedDate,
          createdAt: formatDate(
            parseJSON(wasteFormData.attributes.createdAt),
            "dd/MM/yyyy HH:mm",
          ),
          updatedAt: formatDate(
            parseJSON(wasteFormData.attributes.updatedAt),
            "dd/MM/yyyy HH:mm",
          ),
          audiences: wasteFormData.attributes.audiences?.data.map(
            (user: AudienceEntity) => {
              return {
                label: user.attributes?.type ?? "",
                value: user.id ?? "",
              };
            },
          ),
        };
        setMappedData(mappedData);
      }
    } else if (data?.wasteForm && data.wasteForm.data === null) {
      void router.push(`${currentRoot}/services/guide-tri`);
    }
  }, [data, router, currentRoot]);

  return (
    <div className="o-FormEditPage">
      {mappedData && (
        <>
          <PageTitle title={mappedData.name} />
          <CommonLoader isLoading={isLoading} errors={errors}>
            <WasteFormForm
              data={mappedData}
              dynamicFieldConfigurations={dynamicFieldConfigurations}
              onSubmitValid={onSubmit}
              onPublish={onPublish}
              onDepublish={onDepublish}
              onPreview={() => onPreview(wasteFormId)}
              labels={formLabels}
            />
          </CommonLoader>
        </>
      )}
    </div>
  );
}

export default function IndexPage() {
  const wasteFormId = useRoutingQueryId("wasteFormId");

  return (
    <ContractLayout>
      {wasteFormId && <ServiceGuideDuTriEditPage wasteFormId={wasteFormId} />}
    </ContractLayout>
  );
}
