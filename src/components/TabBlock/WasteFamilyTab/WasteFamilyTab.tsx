import React, { useEffect, useState } from "react";
import { removeNulls } from "../../../lib/utilities";
import {
  useGetContractByIdQuery,
  useGetGuideDuTriQuery,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import CommonDataTable, {
  IDefaultTableRow,
} from "../../Common/CommonDataTable/CommonDataTable";
import { TableColumn } from "react-data-table-component";
import { IDataTableAction } from "../../Common/CommonDataTable/DataTableActions/DataTableActions";
import "./waste-family-tab.scss";

interface IWasteFamilyTableRow extends IDefaultTableRow {
  id: string;
  title: string;
  count: number;
}

export default function WasteFamilyTab() {
  /* Static Data */
  const tableLabels = {
    hintText:
      "Vous pouvez renommer et classer les familles dans l'ordre souhaité",
    columns: {
      title: "Famille de déchet",
      count: "Fiche déchets associées",
    },
  };
  /* Local Data */
  const [tableData, setTableData] = useState<Array<IWasteFamilyTableRow>>([]);
  const tableColumns: Array<TableColumn<IWasteFamilyTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "title",
      name: tableLabels.columns.title,
      selector: (row) => row.title,
      cell: (row) => row.title,
      sortable: true,
      grow: 4,
    },
    {
      id: "count",
      name: tableLabels.columns.count,
      selector: (row) => row.count,
      sortable: true,
    },
  ];
  const actionColumn = (row: IWasteFamilyTableRow): Array<IDataTableAction> => [
    // TODO: try to use picto scss or DS icons instead of /public/
    {
      id: "edit",
      picto: "/images/pictos/edit.svg",
      onClick: () => onEdit(row),
    },
  ];

  /* External Data */
  const { contractId } = useContract();
  const {
    data: getContractData,
    loading: getContractLoading,
    error: getContractError,
  } = useGetContractByIdQuery({ variables: { contractId } });
  const {
    data: getGuideDuTriData,
    loading: getGuideDuTriLoading,
    error: getGuideDuTriError,
  } = useGetGuideDuTriQuery({
    variables: {
      recyclingGuideServiceId:
        getContractData?.contract?.data?.attributes?.recyclingGuideService?.data
          ?.id,
    },
  });

  /* Methods */
  function onEdit(row: IWasteFamilyTableRow): void {
    throw new Error("Function not implemented." + row);
  }

  useEffect(() => {
    if (getGuideDuTriData) {
      setTableData(
        getGuideDuTriData.recyclingGuideService?.data?.attributes?.wasteFamilies?.data
          .map((item) => {
            if (item && item.id && item.attributes) {
              return {
                id: item.id,
                editState: false,
                title: item.attributes.familyName,
                count: item.attributes.wasteForms?.data.length ?? 0,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [getGuideDuTriData]);

  return (
    <div className="c-WasteFamily">
      <CommonLoader
        isLoading={getGuideDuTriLoading || getContractLoading}
        hasDelay={false}
        errors={[getGuideDuTriError, getContractError]}
        isFlexGrow={false}
      >
        <p>{tableLabels.hintText}</p>
        <CommonDataTable<IWasteFamilyTableRow>
          columns={tableColumns}
          actionColumn={actionColumn}
          data={tableData}
          isLoading={getGuideDuTriLoading || getContractLoading}
          defaultSortFieldId={"title"}
        />
      </CommonLoader>
    </div>
  );
}
