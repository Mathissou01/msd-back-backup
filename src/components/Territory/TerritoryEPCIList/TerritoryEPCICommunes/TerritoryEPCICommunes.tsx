import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { IDefaultTableRow } from "../../../../lib/common-data-table";
import { EpciEntity } from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import CommonDataTable from "../../../Common/CommonDataTable/CommonDataTable";

interface IContractCitiesTableRow extends IDefaultTableRow {
  id: string;
  cityName: string;
  cityInsee: string;
  citySiren: string;
  cityPostalCode: string;
  cityDepartment: string;
  cityRegion: string;
}

interface ITerritoryClientCitiesProps {
  EPCICommunes: EpciEntity;
}

export default function TerritoryEPCICommunes({
  EPCICommunes,
}: ITerritoryClientCitiesProps) {
  /* Static data */
  const labels = {
    clientMunicipality: "Liste des communes",
    columns: {
      cityName: "Communes",
      cityInsee: "Insee",
      citySiren: "Siren",
      cityPostalCode: "CP",
      cityDepartment: "Département",
      cityRegion: "Région",
    },
    addRow: "N°Insee, Siren, Code postal ou nom de la commune",
    addRowButton: "Ajouter une commune",
  };

  /* Local data */
  const [tableData, setTableData] = useState<Array<IContractCitiesTableRow>>(
    [],
  );
  const tableColumns: Array<TableColumn<IContractCitiesTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: labels.columns.cityName,
      selector: (row) => row.cityName,
      sortable: true,
    },
    {
      id: "insee",
      name: labels.columns.cityInsee,
      selector: (row) => row.cityInsee,
      sortable: true,
    },
    {
      id: "siren",
      name: labels.columns.citySiren,
      selector: (row) => row.citySiren,
      sortable: true,
    },
    {
      id: "postalCode",
      name: labels.columns.cityPostalCode,
      selector: (row) => row.cityPostalCode,
      sortable: true,
    },
    {
      id: "department",
      name: labels.columns.cityDepartment,
      selector: (row) => row.cityDepartment,
      sortable: true,
    },
    {
      id: "region",
      name: labels.columns.cityRegion,
      selector: (row) => row.cityRegion,
      sortable: true,
    },
  ];

  useEffect(() => {
    if (
      EPCICommunes &&
      EPCICommunes.attributes?.cities &&
      EPCICommunes.attributes?.cities.data
    ) {
      setTableData(
        EPCICommunes.attributes.cities.data
          .map((city) => {
            if (city.attributes) {
              return {
                id: city.id ?? "",
                editState: false,
                cityName: city.attributes?.name ?? "",
                cityInsee: city.attributes?.insee ?? "",
                citySiren: city.attributes?.siren ?? "",
                cityPostalCode: city.attributes?.postalCode ?? "",
                cityDepartment: city.attributes?.department ?? "",
                cityRegion: city.attributes?.region ?? "",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [EPCICommunes]);

  return (
    <div className="c-TerritoryEPCICommunes">
      <CommonDataTable<IContractCitiesTableRow>
        columns={tableColumns}
        data={tableData}
      />
    </div>
  );
}