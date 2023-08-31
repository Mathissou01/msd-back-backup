import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Enum_New_Status,
  GetNewsByContractIdQueryVariables,
  useCreateNewMutation,
  useDeleteNewByIdMutation,
  useGetNewByIdLazyQuery,
  useGetNewsByContractIdLazyQuery,
  GetNewsByContractIdQuery,
} from "../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../lib/utilities";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../lib/common-data-table";
import { EStatusLabel } from "../../../../lib/status";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import CommonButtonGroup, {
  ICommonButtonGroupSingle,
} from "../../../../components/Common/CommonButtonGroup/CommonButtonGroup";

interface INewsTableRow extends IDefaultTableRow {
  title: string;
  status: EStatusLabel;
  publishedDate: string;
  unpublishedDate: string;
}

interface IFilters extends Record<string, unknown> {
  status?: string;
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
      fetchPolicy: "network-only",
    });
  const [
    getNewByIdQuery,
    { loading: getNewByIdLoading, error: getNewByIdError },
  ] = useGetNewByIdLazyQuery();
  const [
    createNewMutation,
    { loading: createNewMutationLoading, error: createNewMutationError },
  ] = useCreateNewMutation({
    refetchQueries: ["getNewsByContractId"],
    awaitRefetchQueries: true,
  });
  const [deleteNew, { loading: deleteNewLoading, error: deleteNewError }] =
    useDeleteNewByIdMutation({
      refetchQueries: ["getNewsByContractId"],
      awaitRefetchQueries: true,
    });

  /* Local Data */
  const router = useRouter();
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetNewsByContractIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<INewsTableRow>>([]);
  const [filters, setFilters] = useState<IFilters>({});
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation =
    isUpdatingData ||
    getNewByIdLoading ||
    createNewMutationLoading ||
    deleteNewLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [
    error,
    getNewByIdError,
    createNewMutationError,
    deleteNewError,
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
          className="o-TablePage__Link"
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
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      href: `${currentRoot}/edito/actualites/${row.id}`,
    },
    {
      id: "duplicate",
      picto: "fileDouble",
      alt: "Dupliquer",
      onClick: () => onDuplicate(row),
    },
    {
      id: "delete",
      picto: "trash",
      alt: "Supprimer",
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

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination,
    filters?: IFilters,
  ) {
    return getNewsQuery({
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

  function onDuplicate(row: INewsTableRow) {
    getNewByIdQuery({ variables: { newId: row.id } }).then((data) => {
      const originalNew = data.data?.new?.data?.attributes;
      if (originalNew) {
        void createNewMutation({
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
        });
      }
    });
  }

  async function onDelete(row: INewsTableRow) {
    setIsUpdatingData(true);
    return deleteNew({
      variables: { deleteNewId: row.id },
    });
  }

  useEffect(() => {
    if (data) {
      setTableData(
        data?.news?.data
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
    }
    if (pageData) {
      setFilterButtonGroup([
        {
          label: `Tous (${pageData.newsCount?.meta.pagination.total})`,
        },
        {
          label: `Publiés (${pageData.newsCountPublished?.meta.pagination.total})`,
          value: Enum_New_Status.Published,
        },
        {
          label: `Brouillons (${pageData.newsCountDraft?.meta.pagination.total})`,
          value: Enum_New_Status.Draft,
        },
        {
          label: `Archivés (${pageData.newsCountArchived?.meta.pagination.total})`,
          value: Enum_New_Status.Archived,
        },
      ]);
    }
  }, [data, pageData]);

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
    <div className="o-TablePage">
      <PageTitle title={title} />
      <div>
        <CommonButton
          label={addButton}
          style="primary"
          picto="add"
          onClick={() => router.push(`${currentRoot}/edito/actualites/create`)}
        />
      </div>
      <h2 className="o-TablePage__Title">{tableLabels.title}</h2>
      <div className="o-TablePage__Table">
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
