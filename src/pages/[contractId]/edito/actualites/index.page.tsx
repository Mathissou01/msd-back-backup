import { TableColumn } from "react-data-table-component";
import { format, parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Enum_New_Status,
  GetNewsByContractIdDocument,
  GetNewsByContractIdQueryVariables,
  useDeleteNewMutation,
  useGetNewsByContractIdLazyQuery,
} from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
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
import "./edito-actualites-page.scss";

enum EStatusLabel {
  draft = "Brouillon",
  published = "Publié",
  archived = "Archivé",
}

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
    // TODO: duplicate feature, requires custom resolver (too difficult otherwise since query result doesn't match variables for create mutation)
    console.log(row);
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
        "getNewsByContractId",
      ],
    });
  }

  /* External Data */
  const { currentRoot, currentPage } = useNavigation();
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
    });
  const [
    deleteNewMutation,
    { loading: deleteNewMutationLoading, error: deleteNewMutationError },
  ] = useDeleteNewMutation();

  /* Local Data */
  const router = useRouter();
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<INewsTableRow>>([]);
  const [filterData, setFilterData] = useState<
    Array<IDataTableFilter<INewsTableRow>>
  >([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData || deleteNewMutationLoading;
  const isLoading = loading || isLoadingMutation;
  const errors = [error, deleteNewMutationError];

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
          href={`${currentRoot}${currentPage}/${row.id}`}
          className="c-EditoActualitesPage__Link"
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
      picto: "/images/pictos/edit.svg",
      href: `${currentRoot}${currentPage}/${row.id}`,
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
                  ? format(
                      parseISO(news.attributes.publishedDate),
                      "dd/MM/yyyy",
                    )
                  : "-",
                unpublishedDate: news.attributes.unpublishedDate
                  ? format(
                      parseISO(news.attributes.unpublishedDate),
                      "dd/MM/yyyy",
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
          count: data?.newsCount?.meta.pagination.total,
        },
        {
          label: "Publiés",
          count: data?.newsCountPublished?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_New_Status.Published,
          },
        },
        {
          label: "Brouillons",
          count: data?.newsCountDraft?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_New_Status.Draft,
          },
        },
        {
          label: "Archivés",
          count: data?.newsCountArchived?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_New_Status.Archived,
          },
        },
      ]);
    }
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
    <div className="c-EditoActualitesPage">
      <PageTitle title={title} />
      <CommonButton
        label={addButton}
        style="primary"
        picto="add"
        onClick={() => router.push(`${currentRoot}/edito/actualites/create`)}
      />
      <h2 className="c-EditoActualitesPage__Title">{tableLabels.title}</h2>
      <div className="c-EditoActualitesPage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<INewsTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: data?.news?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            filters={filterData}
            defaultSortFieldId={"title"}
            paginationOptions={{
              hasPagination: true,
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
