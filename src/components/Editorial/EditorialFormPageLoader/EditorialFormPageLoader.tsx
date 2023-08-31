import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  LazyQueryResultTuple,
  MutationTuple,
  OperationVariables,
} from "@apollo/client";
import { parseJSON } from "date-fns";
import {
  AudienceEntity,
  TagEntity,
} from "../../../graphql/codegen/generated-types";
import { IEditorialFields } from "../../../lib/editorial";
import { EStatus, valueToEStatus } from "../../../lib/status";
import { commonDateStringFormat, formatDate } from "../../../lib/utilities";
import { remapFormBlocksDynamicZone } from "../../../lib/dynamic-blocks";
import { useNavigation } from "../../../hooks/useNavigation";
import { useRoutingQueryId } from "../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../layouts/ContractLayout/ContractLayout";
import EditorialFormPage, { IEditorialFormPage } from "./EditorialFormPage";

export default function EditorialFormPageLoader({
  queryParam,
  entityName,
  getByIdLazyQuery,
  createMutation,
  updateMutation,
  pageProps,
}: {
  queryParam: string;
  entityName: string;
  // Abstract typing of query/mutation tuples is very annoying
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getByIdLazyQuery: LazyQueryResultTuple<any, OperationVariables>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createMutation: MutationTuple<any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateMutation: MutationTuple<any, any>;
  pageProps: IEditorialFormPage;
}) {
  const router = useRouter();
  const { currentRoot, currentPage } = useNavigation();
  const contentId = useRoutingQueryId(queryParam, "create");
  const [getById, { data, loading, error }] = getByIdLazyQuery;
  const [, { loading: createMutationLoading, error: createMutationError }] =
    createMutation;
  const [, { loading: updateMutationLoading, error: updateMutationError }] =
    updateMutation;
  const isLoading = loading || createMutationLoading || updateMutationLoading;
  const errors = [error, createMutationError, updateMutationError];
  const [mappedData, setMappedData] = useState<IEditorialFields>();

  useEffect(() => {
    if (contentId) {
      if (!mappedData && contentId === "-1") {
        const mappedData: IEditorialFields = {
          id: "-1",
          status: EStatus.Draft,
          title: "",
          image: null,
          blocks: [],
          audiences: undefined,
        };
        setMappedData(mappedData);
      } else if (contentId !== mappedData?.id) {
        setMappedData(undefined);
        void getById({ variables: { [queryParam]: contentId } });
      }
    }
  }, [contentId, getById, mappedData, queryParam]);

  useEffect(() => {
    if (data?.[entityName]?.data) {
      const editoData = data?.[entityName]?.data;
      if (
        editoData.id &&
        editoData.attributes &&
        editoData.attributes.customId &&
        editoData.attributes.title
      ) {
        const mappedData: IEditorialFields = {
          __typename: editoData.__typename,
          id: editoData.id,
          customId: editoData.attributes.customId,
          status: valueToEStatus(editoData.attributes.status),
          title: editoData.attributes.title,
          image: editoData.attributes.image?.data ?? null,
          tags:
            editoData.attributes.tags?.data.map((tag: TagEntity) => ({
              value: tag.id ?? "",
              label: tag.attributes?.name ?? "",
            })) ?? [],
          shortDescription: editoData.attributes.shortDescription ?? "",
          blocks: remapFormBlocksDynamicZone(editoData.attributes.blocks),
          unpublishedDate: editoData.attributes.unpublishedDate,
          createdAt: formatDate(
            parseJSON(editoData.attributes.createdAt),
            commonDateStringFormat,
          ),
          updatedAt: formatDate(
            parseJSON(editoData.attributes.updatedAt),
            commonDateStringFormat,
          ),
          audiences: editoData.attributes.audiences?.data.map(
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
    } else if (data?.[entityName] && data[entityName]?.data === null) {
      void router.push(`${currentRoot}${currentPage}`);
    }
  }, [data, router, currentRoot, currentPage, entityName]);

  return (
    <ContractLayout>
      {contentId && mappedData && (
        <EditorialFormPage
          isCreateMode={contentId === "-1"}
          contentId={contentId}
          mappedData={mappedData}
          isLoading={isLoading}
          errors={errors}
          pageProps={pageProps}
        />
      )}
    </ContractLayout>
  );
}
