import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Enum_Tip_Status,
  GetAllVersionsOfTipByCustomIdQuery,
  GetAllVersionsOfTipByCustomIdQueryVariables,
  useGetAllVersionsOfTipByCustomIdLazyQuery,
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
import CommonButtonGroup, {
  ICommonButtonGroupSingle,
} from "../../../../../../components/Common/CommonButtonGroup/CommonButtonGroup";
import { useRoutingQueryCustomId } from "../../../../../../hooks/useRoutingQueryCustomId";

interface ITipsTableRow extends IDefaultTableRow {
  status: EStatusLabel;
  publishedDate: string;
  updatedAt: string;
  versionNumber: number;
}

interface IFilters extends Record<string, unknown> {
  status?: string;
}

export function EditoAstucesVersionPage({ customId }: { customId: string }) {
  /* Static Data */
  const title = "Astuces";
  const tableLabels = {
    title: "Versions",
    columns: {
      versionNumber: "Titre de l'astuce",
      status: "Statut",
      publishedDate: "Publication",
      updatedAt: "Modifié",
    },
  };

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination,
    filters?: IFilters,
  ) {
    return getTipByQuery({
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

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();

  const defaultRowsPerPage = 30;
  const defaultPage = 1;

  const defaultQueryVariables: GetAllVersionsOfTipByCustomIdQueryVariables = {
    contractId,
    sort: "title:asc",
    customId: customId.toString(),
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  const [getTipByQuery, { data, loading, error }] =
    useGetAllVersionsOfTipByCustomIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "network-only",
    });

  /* Local Data */
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetAllVersionsOfTipByCustomIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<ITipsTableRow>>([]);
  const [filters, setFilters] = useState<IFilters>({});
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData;
  const isLoading = loading || isLoadingMutation;
  const errors = [error];

  const tableColumns: Array<TableColumn<ITipsTableRow>> = [
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
          href={`${currentRoot}/edito/astuces/${row.id}`}
          className="o-TablePage__Link"
        >
          {row.versionNumber}
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
      id: "updatedAt",
      name: tableLabels.columns.updatedAt,
      selector: (row) => row.updatedAt,
      sortable: true,
      minWidth: "148px",
    },
  ];
  const actionColumn = (row: ITipsTableRow): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      href: `${currentRoot}/edito/astuces/${row.id}`,
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
        pageData?.tips?.data
          ?.map((tip) => {
            if (
              tip &&
              tip.id &&
              tip.attributes &&
              tip.attributes.versionNumber
            ) {
              return {
                id: tip.id,
                editState: false,
                versionNumber: tip.attributes.versionNumber,
                status: tip.attributes.status
                  ? EStatusLabel[tip.attributes.status]
                  : EStatusLabel.draft,
                publishedDate: tip.attributes.publishedDate
                  ? formatDate(parseISO(tip.attributes.publishedDate))
                  : "-",
                updatedAt: tip.attributes.updatedAt
                  ? formatDate(parseISO(tip.attributes.updatedAt))
                  : "-",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
      setFilterButtonGroup([
        {
          label: `Tous (${pageData.tipsCount?.meta.pagination.total})`,
        },
        {
          label: `Publiés (${pageData.tipsCountPublished?.meta.pagination.total})`,
          value: Enum_Tip_Status.Published,
        },
        {
          label: `Brouillons (${pageData.tipsCountDraft?.meta.pagination.total})`,
          value: Enum_Tip_Status.Draft,
        },
        {
          label: `Archivés (${pageData.tipsCountArchived?.meta.pagination.total})`,
          value: Enum_Tip_Status.Archived,
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
      void getTipByQuery();
    }
  }, [getTipByQuery, isInitialized]);

  return (
    <div className="o-TablePage">
      <PageTitle title={title} />
      <h2 className="o-TablePage__Title">{tableLabels.title}</h2>
      <div className="o-TablePage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<ITipsTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.tips?.meta.pagination.total ?? 0,
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
      {customId && <EditoAstucesVersionPage customId={customId} />}
    </ContractLayout>
  );
}
