import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Enum_New_Status,
  GetNewsByContractIdDocument,
  GetNewsByContractIdQueryVariables,
  useCreateNewMutation,
  useDeleteNewMutation,
  useGetNewByIdLazyQuery,
  useGetNewsByContractIdLazyQuery,
  GetNewsByContractIdQuery,
} from "../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../lib/utilities";
import { EStatusLabel } from "../../../../lib/status";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import ContractLayout from "../../contract-layout";
import CommonDataTable, {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableFilter } from "../../../../components/Common/CommonDataTable/DataTableFilters/DataTableFilters";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";

interface INewsTableRow extends IDefaultTableRow {
  title: string;
  status: EStatusLabel;
  publishedDate: string;
  unpublishedDate: string;
}

export function EditoActualitesPage() {
  /* Static Data */
  const addButton = "Créer une actualité";
  const title = "Actualités";
  const tableLabels = {
    title: "Liste des actualités",
    columns: {
      title: "Titre de l'actualité",
      status: "Statut",
      publishedDate: "Publication",
      depublishedDate: "Dépublication",
    },
  };

  /* Methods */
  async function handleLazyLoad(params: ICurrentPagination<INewsTableRow>) {
    return getNewsQuery({
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

  function onDuplicate(row: INewsTableRow) {
    getNewByIdQuery({ variables: { newId: row.id } }).then((data) => {
      const originalNew = data.data?.new?.data?.attributes;
      if (originalNew) {
        createNewMutation({
          variables: {
            data: {
              title: `${originalNew.title} Ajout`,
              shortDescription: originalNew.shortDescription,
              newsSubService: originalNew.newsSubService?.data?.id,
              image: originalNew.image?.data?.id,
              blocks: originalNew.blocks?.map((block) => {
                return {
                  ...block,
                  id: undefined,
                };
              }),
            },
          },
          refetchQueries: [
            {
              query: GetNewsByContractIdDocument,
              variables: { contractId },
            },
          ],
          onQueryUpdated: (observableQuery) => {
            observableQuery
              .result()
              .then((result) => {
                if (!result.loading) {
                  setPageData(
                    result?.data as GetNewsByContractIdQuery | undefined,
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

  async function onDelete(row: INewsTableRow) {
    setIsUpdatingData(true);
    const variables = {
      deleteNewId: row.id,
    };
    return deleteNewMutation({
      variables,
      refetchQueries: [
        {
          query: GetNewsByContractIdDocument,
          variables: { contractId },
        },
      ],
      onQueryUpdated: (observableQuery) => {
        observableQuery
          .result()
          .then((result) => {
            if (!result.loading) {
              setPageData(result?.data as GetNewsByContractIdQuery | undefined);
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
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();

  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const defaultQueryVariables: GetNewsByContractIdQueryVariables = {
    contractId,
    sort: "title:asc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  const [getNewsQuery, { data, loading, error }] =
    useGetNewsByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "no-cache",
    });
  const [
    getNewByIdQuery,
    { loading: prepareDuplicateLoading, error: prepareDuplicateError },
  ] = useGetNewByIdLazyQuery();
  const [
    createNewMutation,
    { loading: createNewMutationLoading, error: createNewMutationError },
  ] = useCreateNewMutation();
  const [
    deleteNewMutation,
    { loading: deleteNewMutationLoading, error: deleteNewMutationError },
  ] = useDeleteNewMutation();

  /* Local Data */
  const router = useRouter();
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetNewsByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<INewsTableRow>>([]);
  const [filterData, setFilterData] = useState<
    Array<IDataTableFilter<INewsTableRow>>
  >([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData ||
    prepareDuplicateLoading ||
    createNewMutationLoading ||
    deleteNewMutationLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [
    error,
    prepareDuplicateError,
    createNewMutationError,
    deleteNewMutationError,
  ];

  const tableColumns: Array<TableColumn<INewsTableRow>> = [
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
        <Link
          href={`${currentRoot}/edito/actualites/${row.id}`}
          className="o-EditoPage__Link"
        >
          {row.title}
        </Link>
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
  const actionColumn = (row: INewsTableRow): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      href: `${currentRoot}/edito/actualites/${row.id}`,
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
        pageData?.news?.data
          ?.map((news) => {
            if (news && news.id && news.attributes) {
              return {
                id: news.id,
                editState: false,
                title: news.attributes.title,
                status: news.attributes.status
                  ? EStatusLabel[news.attributes.status]
                  : EStatusLabel.draft,
                publishedDate: news.attributes.publishedDate
                  ? formatDate(parseISO(news.attributes.publishedDate))
                  : "-",
                unpublishedDate: news.attributes.unpublishedDate
                  ? formatDate(parseISO(news.attributes.unpublishedDate))
                  : "-",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
      setFilterData([
        {
          label: "Tous",
          count: pageData?.newsCount?.meta.pagination.total,
        },
        {
          label: "Publiés",
          count: pageData?.newsCountPublished?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_New_Status.Published,
          },
        },
        {
          label: "Brouillons",
          count: pageData?.newsCountDraft?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_New_Status.Draft,
          },
        },
        {
          label: "Archivés",
          count: pageData?.newsCountArchived?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_New_Status.Archived,
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
      void getNewsQuery();
    }
  }, [getNewsQuery, isInitialized]);

  return (
    <div className="o-EditoPage">
      <PageTitle title={title} />
      <div>
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
          onClick={() => router.push(`${currentRoot}/edito/actualites/create`)}
        />
      </div>
      <h2 className="o-EditoPage__Title">{tableLabels.title}</h2>
      <div className="o-EditoPage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<INewsTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.news?.meta.pagination.total ?? 0,
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
        </CommonLoader>
      </div>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <EditoActualitesPage />
    </ContractLayout>
  );
}
