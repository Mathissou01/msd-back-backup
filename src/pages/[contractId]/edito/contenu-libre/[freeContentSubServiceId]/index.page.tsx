import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Enum_Freecontent_Status,
  GetFreeContentsBySubServiceIdQuery,
  GetFreeContentsBySubServiceIdDocument,
  useCreateFreeContentMutation,
  useDeleteFreeContentMutation,
  useGetFreeContentsBySubServiceIdLazyQuery,
  GetFreeContentsBySubServiceIdQueryVariables,
  useGetFreeContentByIdLazyQuery,
  useGetFreeContentSubServiceByIdQuery,
} from "../../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../../lib/utilities";
import { EStatusLabel } from "../../../../../lib/status";
import { useNavigation } from "../../../../../hooks/useNavigation";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import CommonDataTable, {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableFilter } from "../../../../../components/Common/CommonDataTable/DataTableFilters/DataTableFilters";
import { IDataTableAction } from "../../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import CommonButton from "../../../../../components/Common/CommonButton/CommonButton";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import { useRerenderOnUpdate } from "../../../../../hooks/useRerenderOnUpdate";

interface IFreeContentTableRow extends IDefaultTableRow {
  title: string;
  status: EStatusLabel;
  publishedDate: string;
  unpublishedDate: string;
}

interface IEditoFreeContentSubServicePage {
  freeContentSubServiceId: string;
}

export function EditoFreeContentSubServicePage({
  freeContentSubServiceId,
}: IEditoFreeContentSubServicePage) {
  /* Static Data */
  const addButton = "Créer un article";
  const tableLabels = {
    title: "Liste des articles",
    columns: {
      title: "Titre de l'article",
      status: "Statut",
      publishedDate: "Publication",
      depublishedDate: "Dépublication",
    },
  };

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination<IFreeContentTableRow>,
  ) {
    return getFreeContentsQuery({
      variables: {
        ...defaultQueryVariables,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(typeof params.filter?.lazyLoadSelector?.["value"] === "string" && {
          statusFilter: { eq: params.filter.lazyLoadSelector["value"] },
        }),
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  function onDuplicate(row: IFreeContentTableRow) {
    GetFreeContentByIdQuery({ variables: { freeContentId: row.id } }).then(
      (data) => {
        const originalFreeContent = data.data?.freeContent?.data?.attributes;
        if (originalFreeContent) {
          CreateFreeContentByFreeContentSubServiceIdMutation({
            variables: {
              data: {
                title: `${originalFreeContent.title} Ajout`,
                shortDescription: originalFreeContent.shortDescription,
                freeContentSubService:
                  originalFreeContent.freeContentSubService?.data?.id,
                image: originalFreeContent.image?.data?.id,
                blocks: originalFreeContent.blocks?.map((block) => {
                  return {
                    ...block,
                    id: undefined,
                  };
                }),
              },
            },
            refetchQueries: [
              {
                query: GetFreeContentsBySubServiceIdDocument,
                variables: { freeContentSubServiceId },
              },
            ],
            onQueryUpdated: (observableQuery) => {
              observableQuery
                .result()
                .then((result) => {
                  // TODO: probably a better way to refetch than this
                  console.log("result here :", result);
                  if (!result.loading) {
                    setPageData(
                      result?.data as
                        | GetFreeContentsBySubServiceIdQuery
                        | undefined,
                    );
                  }
                })
                .catch((error) => {
                  // TODO : handle error, to do when all editorial pages will refactored ( to check with @QuentinLeCaignec)
                  console.log(error);
                });
            },
          });
        }
      },
    );
  }

  async function onDelete(row: IFreeContentTableRow) {
    setIsUpdatingData(true);
    const variables = {
      deleteFreeContentId: row.id,
    };
    return DeleteFreeContentMutation({
      variables,
      refetchQueries: [
        {
          query: GetFreeContentsBySubServiceIdDocument,
          variables: { freeContentSubServiceId },
        },
      ],
      onQueryUpdated: (observableQuery) => {
        observableQuery
          .result()
          .then((result) => {
            if (!result.loading) {
              setPageData(
                result?.data as GetFreeContentsBySubServiceIdQuery | undefined,
              );
            }
          })
          .catch((error) => {
            // TODO : handle error, to do when all editorial pages will refactored ( to check with @QuentinLeCaignec)
            console.log(error);
          });
      },
    });
  }

  /* External Data */
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const {
    data: freeContentSubService,
    loading: freeContentSubServiceLoading,
    error: freeContentSubServiceError,
  } = useGetFreeContentSubServiceByIdQuery({
    variables: { freeContentSubServiceId },
  });
  const defaultQueryVariables: GetFreeContentsBySubServiceIdQueryVariables = {
    freeContentSubServiceId,
    sort: "title:asc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  const [getFreeContentsQuery, { data, loading, error }] =
    useGetFreeContentsBySubServiceIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "no-cache",
    });
  const [
    GetFreeContentByIdQuery,
    { loading: prepareDuplicateLoading, error: prepareDuplicateError },
  ] = useGetFreeContentByIdLazyQuery();
  const [
    CreateFreeContentByFreeContentSubServiceIdMutation,
    {
      loading: CreateFreeContentByFreeContentSubServiceIdMutationLoading,
      error: CreateFreeContentByFreeContentSubServiceIdMutationError,
    },
  ] = useCreateFreeContentMutation();
  const [
    DeleteFreeContentMutation,
    {
      loading: DeleteFreeContentMutationLoading,
      error: DeleteFreeContentMutationError,
    },
  ] = useDeleteFreeContentMutation();

  /* Local Data */
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetFreeContentsBySubServiceIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<IFreeContentTableRow>>([]);
  const [filterData, setFilterData] = useState<
    Array<IDataTableFilter<IFreeContentTableRow>>
  >([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData ||
    prepareDuplicateLoading ||
    CreateFreeContentByFreeContentSubServiceIdMutationLoading ||
    DeleteFreeContentMutationLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [
    freeContentSubServiceError,
    error,
    prepareDuplicateError,
    CreateFreeContentByFreeContentSubServiceIdMutationError,
    DeleteFreeContentMutationError,
  ];

  const tableColumns: Array<TableColumn<IFreeContentTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "title",
      name: tableLabels.columns.title,
      selector: (row) => row.title,
      cell: (row) => (
        <>
          <Link
            href={`${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${row.id}`}
            className="o-TablePage__Link"
          >
            {row.title}
          </Link>
        </>
      ),
      sortable: true,
      grow: 4,
    },
    {
      id: "status",
      name: tableLabels.columns.status,
      selector: (row) => row.status,
      sortable: true,
    },
    {
      id: "publishedDate",
      name: tableLabels.columns.publishedDate,
      selector: (row) => row.publishedDate,
      sortable: true,
      minWidth: "130px",
    },
    {
      id: "unpublishedDate",
      name: tableLabels.columns.depublishedDate,
      selector: (row) => row.unpublishedDate,
      sortable: true,
      minWidth: "148px",
    },
  ];
  const actionColumn = (row: IFreeContentTableRow): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      href: `${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${row.id}`,
    },
    {
      id: "duplicate",
      picto: "/images/pictos/duplicate.svg",
      onClick: () => onDuplicate(row),
    },
    {
      id: "delete",
      picto: "/images/pictos/delete.svg",
      confirmStateOptions: {
        onConfirm: () => onDelete(row),
        confirmStyle: "warning",
      },
    },
  ];

  useEffect(() => {
    if (pageData) {
      setTableData(
        pageData?.freeContents?.data
          ?.map((freeContentId) => {
            if (freeContentId && freeContentId.id && freeContentId.attributes) {
              return {
                id: freeContentId.id,
                editState: false,
                title: freeContentId.attributes.title,
                status: freeContentId.attributes.status
                  ? EStatusLabel[freeContentId.attributes.status]
                  : EStatusLabel.draft,
                publishedDate: freeContentId.attributes.publishedDate
                  ? formatDate(parseISO(freeContentId.attributes.publishedDate))
                  : "-",
                unpublishedDate: freeContentId.attributes.unpublishedDate
                  ? formatDate(
                      parseISO(freeContentId.attributes.unpublishedDate),
                    )
                  : "-",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
      setFilterData([
        {
          label: "Tous",
          count: pageData?.freeContentsCount?.meta.pagination.total,
        },
        {
          label: "Publiés",
          count: pageData?.freeContentsCountPublished?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_Freecontent_Status.Published,
          },
        },
        {
          label: "Brouillons",
          count: pageData?.freeContentsCountDraft?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_Freecontent_Status.Draft,
          },
        },
        {
          label: "Archivés",
          count: pageData?.freeContentsCountArchived?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_Freecontent_Status.Archived,
          },
        },
      ]);
    }
  }, [pageData]);

  useEffect(() => {
    setPageData(data);
  }, [data]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getFreeContentsQuery();
    }
  }, [getFreeContentsQuery, isInitialized]);

  return (
    <div className="o-TablePage">
      <CommonLoader
        isLoading={freeContentSubServiceLoading || !isInitialized.current}
        errors={errors}
      >
        <PageTitle
          title={`${freeContentSubService?.freeContentSubService?.data?.attributes?.name}`}
        />
        <div>
          <CommonButton
            label={addButton}
            style="primary"
            picto="add"
            onClick={() =>
              router.push(
                `${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/create`,
              )
            }
          />
        </div>
        <h2 className="o-TablePage__Title">{tableLabels.title}</h2>
        <div className="o-TablePage__Table">
          <CommonDataTable<IFreeContentTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.freeContents?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            filters={filterData}
            defaultSortFieldId={"title"}
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
            onLazyLoad={handleLazyLoad}
          />
        </div>
      </CommonLoader>
    </div>
  );
}

export default function IndexPage() {
  const freeContentSubServiceId = useRoutingQueryId("freeContentSubServiceId");
  const { rerender } = useRerenderOnUpdate(freeContentSubServiceId);

  return (
    <ContractLayout>
      {rerender && freeContentSubServiceId && (
        <EditoFreeContentSubServicePage
          freeContentSubServiceId={freeContentSubServiceId}
        />
      )}
    </ContractLayout>
  );
}
