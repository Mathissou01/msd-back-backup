import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Enum_New_Status,
  GetAllVersionsOfNewsByCustomIdQuery,
  useGetAllVersionsOfNewsByCustomIdLazyQuery,
  GetAllVersionsOfNewsByCustomIdQueryVariables,
} from "../../../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../../../lib/utilities";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../../lib/common-data-table";
import { EStatusLabel } from "../../../../../../lib/status";
import { useContract } from "../../../../../../hooks/useContract";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import ContractLayout from "../../../../../../layouts/ContractLayout/ContractLayout";
import CommonDataTable from "../../../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import { useRoutingQueryCustomId } from "../../../../../../hooks/useRoutingQueryCustomId";
import CommonButtonGroup, {
  ICommonButtonGroupSingle,
} from "../../../../../../components/Common/CommonButtonGroup/CommonButtonGroup";

interface INewsTableRow extends IDefaultTableRow {
  versionNumber: number;
  status: EStatusLabel;
  publishedDate: string;
  updatedAt: string;
}

interface IFilters extends Record<string, unknown> {
  status?: string;
}

export function EditoActualitesVersionPage({ customId }: { customId: string }) {
  /* Static Data */
  const title = "Actualités";
  const tableLabels = {
    title: "Versions",
    columns: {
      versionNumber: "Version",
      status: "Statut",
      publishedDate: "Publication",
      updatedAt: "Modifié",
    },
  };

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();

  const defaultRowsPerPage = 30;
  const defaultPage = 1;

  // to check
  const defaultQueryVariables: GetAllVersionsOfNewsByCustomIdQueryVariables = {
    contractId,
    sort: "title:asc",
    customId: customId.toString(),
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };

  const [getNewsQuery, { data, loading, error }] =
    useGetAllVersionsOfNewsByCustomIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "no-cache",
    });

  /* Local Data */

  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetAllVersionsOfNewsByCustomIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<INewsTableRow>>([]);
  const [filters, setFilters] = useState<IFilters>({});
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData;
  const isLoading = loading || isLoadingMutation;
  const errors = [error];

  //to check
  const tableColumns: Array<TableColumn<INewsTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "Version",
      name: tableLabels.columns.versionNumber,
      selector: (row) => row.versionNumber,
      cell: (row) => (
        <Link
          href={`${currentRoot}/edito/actualites/${row.id}`}
          className="o-EditoPage__Link"
        >
          {row.versionNumber}
        </Link>
      ),
      sortable: true,
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
      id: "updatedAt",
      name: tableLabels.columns.updatedAt,
      selector: (row) => row.updatedAt,
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
    void getNewsQuery({
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

  useEffect(() => {
    setPageData(data);
  }, [data]);

  useEffect(() => {
    if (pageData) {
      setTableData(
        pageData?.news?.data
          ?.map((news) => {
            if (
              news &&
              news.id &&
              news.attributes &&
              news.attributes.versionNumber
            ) {
              return {
                id: news.id,
                editState: false,
                versionNumber: news.attributes.versionNumber,
                status: news.attributes.status
                  ? EStatusLabel[news.attributes.status]
                  : EStatusLabel.draft,
                publishedDate: news.attributes.publishedDate
                  ? formatDate(parseISO(news.attributes.publishedDate))
                  : "-",
                updatedAt: news.attributes.updatedAt
                  ? formatDate(parseISO(news.attributes.updatedAt))
                  : "-",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
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
    }
  }, [data, pageData]);

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
  const customId = useRoutingQueryCustomId("customId");
  return (
    <ContractLayout>
      {customId && <EditoActualitesVersionPage customId={customId} />}
    </ContractLayout>
  );
}
