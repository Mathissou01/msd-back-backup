import { parseISO } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { TableColumn } from "react-data-table-component";
import {
  useGetRecyclingGuideServiceByContractQuery,
  useGetWasteFormsByRecyclingGuideLazyQuery,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { EStatusLabel } from "../../../lib/status";
import { formatDate, removeNulls } from "../../../lib/utilities";
import CommonDataTable, {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../Common/CommonDataTable/CommonDataTable";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import "./waste-form-tab.scss";

export interface IWastesTableRow extends IDefaultTableRow {
  name: string;
  updatedAt: string;
  status: EStatusLabel;
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

  /*Local Data*/
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<IWastesTableRow>>([]);
  const isLoading = loading;
  const errors = [error];

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
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
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
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: data?.wasteForms?.meta.pagination.total ?? 0,
            }}
            onLazyLoad={handleLazyLoad}
            isLoading={isLoading}
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
