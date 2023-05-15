import { parseISO } from "date-fns";
import { ConditionalStyles, TableColumn } from "react-data-table-component";
import React, { useEffect, useRef, useState } from "react";
import {
  Enum_Wasteform_Status,
  GetWasteFormsByRecyclingGuideQuery,
  useGetRecyclingGuideServiceByContractQuery,
  useGetWasteFormsByRecyclingGuideLazyQuery,
  useUpdateWasteFormByRecyclingGuideMutation,
} from "../../../graphql/codegen/generated-types";
import { EStatusLabel } from "../../../lib/status";
import { formatDate, removeNulls } from "../../../lib/utilities";
import { useContract } from "../../../hooks/useContract";
import CommonDataTable, {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../Common/CommonDataTable/CommonDataTable";
import { IDataTableFilter } from "../../Common/CommonDataTable/DataTableFilters/DataTableFilters";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import { IDataTableAction } from "../../Common/CommonDataTable/DataTableActions/DataTableActions";
import "./waste-form-tab.scss";

export interface IWastesTableRow extends IDefaultTableRow {
  name: string;
  status: EStatusLabel;
  updatedAt: string;
  isHidden: boolean;
}

export default function WasteFormTab() {
  /* Static Data */
  const tableLabels = {
    title: "Liste des fiches déchets",
    columns: {
      sectorTitle: "Nom du déchet",
      statut: "Statut",
      usagers: "Usagers",
      updatedAt: "Modification",
    },
  };

  /* External Data */
  const { contractId } = useContract();
  const defaultPage = 1;
  const defaultRowsPerPage = 30;

  const { data: recyclingGuide } = useGetRecyclingGuideServiceByContractQuery({
    variables: {
      contractId,
    },
  });

  const [getWasteFormsQuery, { data, loading, error }] =
    useGetWasteFormsByRecyclingGuideLazyQuery({
      variables: {
        recyclingGuideId:
          recyclingGuide?.recyclingGuideServices?.data[0].id ?? "",
        pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
      },
      fetchPolicy: "cache-and-network",
    });

  const [updateWasteFormById, { loading: loadingUpdate, error: errorUpdate }] =
    useUpdateWasteFormByRecyclingGuideMutation();

  /*Local Data*/
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<IWastesTableRow>>([]);
  const [pageData, setPageData] = useState<
    GetWasteFormsByRecyclingGuideQuery | undefined
  >(data);
  const [filterData, setFilterData] = useState<
    Array<IDataTableFilter<IWastesTableRow>>
  >([]);
  const isLoading = loading && loadingUpdate;
  const errors = [error, errorUpdate];

  const tableColumns: Array<TableColumn<IWastesTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: tableLabels.columns.sectorTitle,
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },

    {
      id: "statut",
      name: tableLabels.columns.statut,
      selector: (row) => row.status,
      sortable: true,
    },
    {
      id: "updateDate",
      name: tableLabels.columns.updatedAt,
      selector: (row) => row.updatedAt,
      sortable: true,
    },
  ];

  function setWasteFormVisibility(row: IWastesTableRow) {
    updateWasteFormById({
      variables: {
        updateWasteFormId: row.id,
        data: {
          isHidden: !row.isHidden,
        },
      },
    });
  }

  function onHideRow(row: IWastesTableRow): void {
    setWasteFormVisibility(row);
  }

  const actionColumn = (row: IWastesTableRow): Array<IDataTableAction> => [
    {
      id: "hide",
      picto: row.isHidden
        ? "/images/pictos/view-off.svg"
        : "/images/pictos/view.svg",
      onClick: () => onHideRow(row),
    },
  ];

  const conditionalRowStyles: Array<ConditionalStyles<IWastesTableRow>> = [
    {
      when: (row) => row.isHidden,
      classNames: ["rdt_TableRow_gray"],
    },
  ];

  /* Methods */
  async function handleLazyLoad(params: ICurrentPagination<IWastesTableRow>) {
    return getWasteFormsQuery({
      variables: {
        recyclingGuideId:
          recyclingGuide?.recyclingGuideServices?.data[0].id ?? "",
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
      setFilterData([
        {
          label: "Tous",
          count: pageData?.wasteForms?.meta.pagination.total,
        },
        {
          label: "Publiés",
          count: pageData?.wasteFormsPublishedtCount?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_Wasteform_Status.Published,
          },
        },
        {
          label: "Brouillons",
          count: pageData?.wasteFormsDraftCount?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_Wasteform_Status.Draft,
          },
        },
        {
          label: "Archivés",
          count: pageData?.wasteFormsArchivedCount?.meta.pagination.total,
          lazyLoadSelector: {
            value: Enum_Wasteform_Status.Archived,
          },
        },
      ]);
    }
  }, [data, pageData]);

  useEffect(() => {
    setPageData(data);
  }, [data]);
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getWasteFormsQuery();
    }
  }, [getWasteFormsQuery, isInitialized]);

  return (
    <div className="c-WasteFormTab">
      <h2 className="WasteFormTab__Title">{tableLabels.title}</h2>
      <div className="c-WasteFormTab__Table">
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
            filters={filterData}
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
