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
  useDeleteFreeContentByIdMutation,
  useGetFreeContentsBySubServiceIdLazyQuery,
  GetFreeContentsBySubServiceIdQueryVariables,
  useGetFreeContentByIdLazyQuery,
  useGetFreeContentSubServiceByIdQuery,
} from "../../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../../lib/utilities";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../lib/common-data-table";
import { getRightsByLabel } from "../../../../../lib/user";
import { EStatusLabel } from "../../../../../lib/status";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useContract } from "../../../../../hooks/useContract";
import { useUser } from "../../../../../hooks/useUser";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import CommonDataTable from "../../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import CommonButton from "../../../../../components/Common/CommonButton/CommonButton";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import { useRerenderOnUpdate } from "../../../../../hooks/useRerenderOnUpdate";
import CommonButtonGroup, {
  ICommonButtonGroupSingle,
} from "../../../../../components/Common/CommonButtonGroup/CommonButtonGroup";

interface IFreeContentTableRow extends IDefaultTableRow {
  title: string;
  status: EStatusLabel;
  publishedDate: string;
  unpublishedDate: string;
}

interface IEditoFreeContentSubServicePage {
  freeContentSubServiceId: string;
}

interface IFilters extends Record<string, unknown> {
  status?: string;
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
    params: ICurrentPagination,
    filters?: IFilters,
  ) {
    return getFreeContents({
      variables: {
        ...defaultQueryVariables,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(filters?.status && {
          statusFilter: { eq: filters?.status },
        }),
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  function onDuplicate(row: IFreeContentTableRow) {
    getFreeContent({ variables: { freeContentId: row.id } }).then((data) => {
      const originalFreeContent = data.data?.freeContent?.data?.attributes;
      if (originalFreeContent) {
        createFreeContent({
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
    });
  }

  async function onDelete(row: IFreeContentTableRow) {
    setIsUpdatingData(true);
    const variables = {
      deleteFreeContentId: row.id,
    };
    return deleteFreeContent({
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
  const [getFreeContents, { data, loading, error }] =
    useGetFreeContentsBySubServiceIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "no-cache",
    });
  const [
    getFreeContent,
    { loading: getFreeContentLoading, error: getFreeContentError },
  ] = useGetFreeContentByIdLazyQuery();
  const [
    createFreeContent,
    { loading: createFreeContentLoading, error: createFreeContentError },
  ] = useCreateFreeContentMutation();
  const [
    deleteFreeContent,
    { loading: deleteFreeContentLoading, error: deleteFreeContentError },
  ] = useDeleteFreeContentByIdMutation();

  /* Local Data */
  const router = useRouter();
  const { contractId } = useContract();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("FreeContent", userRights);
  const { currentRoot } = useNavigation();
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetFreeContentsBySubServiceIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<IFreeContentTableRow>>([]);
  const [filters, setFilters] = useState<IFilters>({});
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData ||
    getFreeContentLoading ||
    createFreeContentLoading ||
    deleteFreeContentLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [
    freeContentSubServiceError,
    error,
    getFreeContentError,
    createFreeContentError,
    deleteFreeContentError,
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
      cell: userPermissions.update
        ? (row) => (
            <>
              <Link
                href={`${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${row.id}`}
                className="o-TablePage__Link"
              >
                {row.title}
              </Link>
            </>
          )
        : undefined,
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
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      isDisabled: !userPermissions.update,
      href: `${currentRoot}/edito/contenu-libre/${freeContentSubServiceId}/${row.id}`,
    },
    {
      id: "duplicate",
      picto: "fileDouble",
      alt: "Dupliquer",
      isDisabled: !userPermissions.create,
      onClick: () => onDuplicate(row),
    },
    {
      id: "delete",
      picto: "trash",
      alt: "Supprimer",
      isDisabled: !userPermissions.delete,
      confirmStateOptions: {
        onConfirm: () => onDelete(row),
        confirmStyle: "warning",
      },
    },
  ];

  const [filterButtonGroup, setFilterButtonGroup] =
    useState<Array<ICommonButtonGroupSingle>>();

  const filtersNode = (
    <>
      <CommonButtonGroup
        buttons={filterButtonGroup ?? []}
        onChange={(button) => setFilters({ ...filters, status: button.value })}
      />
    </>
  );

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
      setFilterButtonGroup([
        {
          label: `Tous (${pageData.freeContentsCount?.meta.pagination.total})`,
        },
        {
          label: `Publiés (${pageData.freeContentsCountPublished?.meta.pagination.total})`,
          value: Enum_Freecontent_Status.Published,
        },
        {
          label: `Brouillons (${pageData.freeContentsCountDraft?.meta.pagination.total})`,
          value: Enum_Freecontent_Status.Draft,
        },
        {
          label: `Archivés (${pageData.freeContentsCountArchived?.meta.pagination.total})`,
          value: Enum_Freecontent_Status.Archived,
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
      if (userPermissions.read) void getFreeContents();
      else {
        router.push(`/${contractId}`);
      }
    }
  }, [
    contractId,
    getFreeContents,
    isInitialized,
    router,
    userPermissions.read,
  ]);

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
            isDisabled={!userPermissions.create}
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
            filters={filters}
            filtersNode={filtersNode}
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
