import { TableColumn } from "react-data-table-component";
import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Enum_Tip_Status,
  GetAllVersionsOfWasteFormByCustomIdQuery,
  GetAllVersionsOfWasteFormByCustomIdQueryVariables,
  useGetAllVersionsOfWasteFormByCustomIdLazyQuery,
} from "../../../../../../../graphql/codegen/generated-types";
import { formatDate, removeNulls } from "../../../../../../../lib/utilities";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../../../../lib/common-data-table";
import { EStatusLabel } from "../../../../../../../lib/status";
import { useContract } from "../../../../../../../hooks/useContract";
import { useNavigation } from "../../../../../../../hooks/useNavigation";
import ContractLayout from "../../../../../../../layouts/ContractLayout/ContractLayout";
import CommonDataTable from "../../../../../../../components/Common/CommonDataTable/CommonDataTable";
import { IDataTableAction } from "../../../../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../../../components/PageTitle/PageTitle";
import CommonButtonGroup, {
  ICommonButtonGroupSingle,
} from "../../../../../../../components/Common/CommonButtonGroup/CommonButtonGroup";
import { useRoutingQueryCustomId } from "../../../../../../../hooks/useRoutingQueryCustomId";

interface IWasteFormTableRow extends IDefaultTableRow {
  status: EStatusLabel;
  publishedDate: string;
  updatedAt: string;
  versionNumber: number;
}

interface IFilters extends Record<string, unknown> {
  status?: string;
}

export function EditoFicheDechetVersionPage({
  customId,
}: {
  customId: string;
}) {
  /* Static Data */
  const title = "Fiche déchet";
  const tableLabels = {
    title: "Versions",
    columns: {
      versionNumber: "Nom de la fiche déchet",
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
    return getWasteFormByQuery({
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

  const defaultQueryVariables: GetAllVersionsOfWasteFormByCustomIdQueryVariables =
    {
      contractId,
      sort: "name:asc",
      customId: customId.toString(),
      pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
    };
  const [getWasteFormByQuery, { data, loading, error }] =
    useGetAllVersionsOfWasteFormByCustomIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "network-only",
    });

  /* Local Data */
  const isInitialized = useRef(false);
  const [pageData, setPageData] = useState<
    GetAllVersionsOfWasteFormByCustomIdQuery | undefined
  >(data);
  const [tableData, setTableData] = useState<Array<IWasteFormTableRow>>([]);
  const [filters, setFilters] = useState<IFilters>({});
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const isLoadingMutation = isUpdatingData;
  const isLoading = loading || isLoadingMutation;
  const errors = [error];

  const tableColumns: Array<TableColumn<IWasteFormTableRow>> = [
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
          href={`${currentRoot}/services/guide-tri/fiche-dechet/${row.id}`}
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
  const actionColumn = (row: IWasteFormTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      href: `${currentRoot}/services/guide-tri/fiche-dechet/${row.id}`,
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
        pageData?.wasteForms?.data
          ?.map((wasteForm) => {
            if (
              wasteForm &&
              wasteForm.id &&
              wasteForm.attributes &&
              wasteForm.attributes.versionNumber
            ) {
              return {
                id: wasteForm.id,
                editState: false,
                versionNumber: wasteForm.attributes.versionNumber,
                status: wasteForm.attributes.status
                  ? EStatusLabel[wasteForm.attributes.status]
                  : EStatusLabel.draft,
                publishedDate: wasteForm.attributes.publishedDate
                  ? formatDate(parseISO(wasteForm.attributes.publishedDate))
                  : "-",
                updatedAt: wasteForm.attributes.updatedAt
                  ? formatDate(parseISO(wasteForm.attributes.updatedAt))
                  : "-",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
      setFilterButtonGroup([
        {
          label: `Tous (${pageData.wasteFormsCount?.meta.pagination.total})`,
        },
        {
          label: `Publiés (${pageData.wasteFormsCountPublished?.meta.pagination.total})`,
          value: Enum_Tip_Status.Published,
        },
        {
          label: `Brouillons (${pageData.wasteFormsCountDraft?.meta.pagination.total})`,
          value: Enum_Tip_Status.Draft,
        },
        {
          label: `Archivés (${pageData.wasteFormsCountArchived?.meta.pagination.total})`,
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
      void getWasteFormByQuery();
    }
  }, [getWasteFormByQuery, isInitialized]);

  return (
    <div className="o-TablePage">
      <PageTitle title={title} />
      <h2 className="o-TablePage__Title">{tableLabels.title}</h2>
      <div className="o-TablePage__Table">
        <CommonLoader isLoading={!isInitialized.current} errors={errors}>
          <CommonDataTable<IWasteFormTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.wasteForms?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            filters={filters}
            filtersNode={filtersNode}
            defaultSortFieldId={"name"}
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
      {customId && <EditoFicheDechetVersionPage customId={customId} />}
    </ContractLayout>
  );
}
