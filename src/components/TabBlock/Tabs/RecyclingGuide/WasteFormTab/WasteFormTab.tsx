import { parseISO } from "date-fns";
import { ConditionalStyles, TableColumn } from "react-data-table-component";
import React, { useEffect, useRef, useState } from "react";
import {
  Enum_Wasteform_Status,
  GetWasteFormsByContractIdQuery,
  useGetActiveFlowsByContractIdLazyQuery,
  useGetWasteFormsByContractIdLazyQuery,
  useUpdateWasteFormByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { EStatusLabel } from "../../../../../lib/status";
import { formatDate, removeNulls } from "../../../../../lib/utilities";
import {
  IDefaultTableRow,
  ICurrentPagination,
} from "../../../../../lib/common-data-table";
import CommonDataTable from "../../../../Common/CommonDataTable/CommonDataTable";
import CommonLoader from "../../../../Common/CommonLoader/CommonLoader";
import { IDataTableAction } from "../../../../Common/CommonDataTable/DataTableActions/DataTableActions";
import "./waste-form-tab.scss";
import Link from "next/link";
import CommonButtonGroup, {
  ICommonButtonGroupSingle,
} from "../../../../Common/CommonButtonGroup/CommonButtonGroup";

export interface IWastesTableRow extends IDefaultTableRow {
  name: string;
  status: EStatusLabel;
  updatedAt: string;
  isHidden: boolean;
}

interface IFilters extends Record<string, unknown> {
  status?: string;
  flowId?: string;
}

export default function WasteFormTab() {
  /* Static Data */
  const tableLabels = {
    title: "Liste des fiches déchets",
    columns: {
      name: "Nom du déchet",
      status: "Statut",
      updatedAt: "Modification",
    },
  };

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const defaultPage = 1;
  const defaultRowsPerPage = 30;
  const [getWasteFormsQuery, { data, loading, error }] =
    useGetWasteFormsByContractIdLazyQuery({
      variables: {
        contractId: contractId,
        sort: "publishedDate:asc",
        pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
      },
      fetchPolicy: "network-only",
    });

  const [
    getFilterFlows,
    { data: dataFlows, loading: loadingFlows, error: errorFlows },
  ] = useGetActiveFlowsByContractIdLazyQuery({
    variables: {
      contractId,
    },
  });

  const [updateWasteForm, { loading: loadingUpdate, error: errorUpdate }] =
    useUpdateWasteFormByIdMutation({
      refetchQueries: ["getWasteFormsByContractId"],
      awaitRefetchQueries: true,
    });

  /* Local Data */
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<IWastesTableRow>>([]);
  const [pageData, setPageData] = useState<
    GetWasteFormsByContractIdQuery | undefined
  >(data);
  const isLoading = loading || loadingUpdate || loadingFlows;
  const errors = [error, errorUpdate, errorFlows];
  const [filters, setFilters] = useState<IFilters>({});

  const tableColumns: Array<TableColumn<IWastesTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: tableLabels.columns.name,
      selector: (row) => row.name,
      cell: (row) => (
        <Link
          href={`${currentRoot}/services/guide-tri/fiche-dechet/${row.id}`}
          className="o-TablePage__Link"
        >
          {row.name}
        </Link>
      ),
      sortable: true,
      grow: 2,
    },

    {
      id: "status",
      name: tableLabels.columns.status,
      selector: (row) => row.status,
      sortable: true,
    },
    {
      id: "updatedAt",
      name: tableLabels.columns.updatedAt,
      selector: (row) => row.updatedAt,
      sortable: true,
    },
  ];

  const actionColumn = (row: IWastesTableRow): Array<IDataTableAction> => [
    {
      id: "edit",
      picto: "edit",
      alt: "Modifier",
      href: `${currentRoot}/services/guide-tri/fiche-dechet/${row.id}`,
    },
    {
      id: "hide",
      picto: row.isHidden ? "eyeClosed" : "eye",
      alt: row.isHidden ? "Afficher" : "Cacher",
      onClick: () => onHideRow(row),
    },
  ];

  const conditionalRowStyles: Array<ConditionalStyles<IWastesTableRow>> = [
    {
      when: (row) => row.isHidden,
      classNames: ["rdt_TableRow_gray"],
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
      <div className="o-SelectWrapper">
        <select
          className="o-SelectWrapper__Select"
          value={filters.flowId}
          onChange={(e) => setFilters({ ...filters, flowId: e.target.value })}
        >
          <option value={""}>{"- Selectionner un flux -"}</option>
          {dataFlows?.flows?.data
            .map((flow, index) => {
              if (flow && flow.id && flow.attributes) {
                return (
                  <option key={index} value={flow.id}>
                    {flow.attributes.name}
                  </option>
                );
              }
            })
            .filter(removeNulls) ?? []}
        </select>
      </div>
    </>
  );

  /* Methods */
  async function handleLazyLoad(
    params: ICurrentPagination,
    filters?: IFilters,
  ) {
    return getWasteFormsQuery({
      variables: {
        contractId: contractId,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(filters?.status && {
          statusFilter: filters?.status,
        }),
        ...(filters?.flowId &&
          filters.flowId && {
            flowId: filters?.flowId,
          }),
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  function onHideRow(row: IWastesTableRow) {
    updateWasteForm({
      variables: {
        updateWasteFormId: row.id,
        data: {
          isHidden: !row.isHidden,
        },
      },
    });
  }

  useEffect(() => {
    if (data) {
      setTableData(
        data?.wasteForms?.data
          .map((wasteForm) => {
            if (wasteForm && wasteForm.id && wasteForm.attributes) {
              return {
                id: wasteForm.id,
                editState: false,
                name: wasteForm.attributes.name ?? "",
                status: wasteForm.attributes.status
                  ? EStatusLabel[wasteForm.attributes.status]
                  : EStatusLabel.draft ?? "",
                updatedAt: wasteForm.attributes.updatedAt
                  ? formatDate(parseISO(wasteForm.attributes.updatedAt))
                  : "-",
                isHidden: wasteForm.attributes.isHidden ?? false,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
      if (pageData) {
        setFilterButtonGroup([
          {
            label: `Tous (${pageData.wasteFormsCount?.meta.pagination.total})`,
          },
          {
            label: `Publiés (${pageData.wasteFormsPublishedCount?.meta.pagination.total})`,
            value: Enum_Wasteform_Status.Published,
          },
          {
            label: `Brouillons (${pageData.wasteFormsDraftCount?.meta.pagination.total})`,
            value: Enum_Wasteform_Status.Draft,
          },
          {
            label: `Archivés (${pageData.wasteFormsArchivedCount?.meta.pagination.total})`,
            value: Enum_Wasteform_Status.Archived,
          },
        ]);
      }
    }
  }, [data, pageData]);

  useEffect(() => {
    setPageData(data);
  }, [data, filters]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getWasteFormsQuery();
      void getFilterFlows();
    }
  }, [getWasteFormsQuery, isInitialized, getFilterFlows]);

  return (
    <div className="o-TablePage">
      <h2 className="o-TablePage__Title c-WasteFormTab__Title">
        {tableLabels.title}
      </h2>
      <div className="o-TablePage__Table">
        <CommonLoader isLoading={false} errors={errors}>
          <CommonDataTable<IWastesTableRow>
            columns={tableColumns}
            data={tableData}
            actionColumn={actionColumn}
            conditionalRowStyles={conditionalRowStyles}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: data?.wasteForms?.meta.pagination.total ?? 0,
            }}
            onLazyLoad={handleLazyLoad}
            isLoading={isLoading}
            filtersNode={filtersNode}
            filters={filters}
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
          ></CommonDataTable>
        </CommonLoader>
      </div>
    </div>
  );
}
