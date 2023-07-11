import { useState } from "react";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";
import { IDefaultTableRow } from "../../../lib/common-data-table";
import { useNavigation } from "../../../hooks/useNavigation";
import { IDataTableAction } from "../../Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import CommonDataTable from "../../Common/CommonDataTable/CommonDataTable";
import "./appointment-management.scss";

export interface IAppointmentManagementTableRow extends IDefaultTableRow {
  name: string;
  remainingSlotsNumber: number;
}

export default function AppointmentManagement() {
  /* Static Data */
  const labels = {
    tableLabels: {
      title: "Liste des formulaires avec prise de rendez-vous",
      columns: {
        name: "Formulaire",
        remainingSlotsNumber: "Nb de créneaux réservés",
      },
    },
  };
  const tableDataMocked = [
    {
      id: "1",
      editState: false,
      name: "Formulaire de demande 1",
      remainingSlotsNumber: 120,
    },
    {
      id: "2",
      editState: false,
      name: "Formulaire de demande 2",
      remainingSlotsNumber: 87,
    },
    {
      id: "3",
      editState: false,
      name: "Formulaire de demande 3",
      remainingSlotsNumber: 150,
    },
  ];
  const pageData = {
    requests: {
      meta: {
        pagination: {
          total: 3,
        },
      },
    },
  };

  /* Local Data */
  // TODO : Replace with data from GraphQL query
  const [tableData] =
    useState<Array<IAppointmentManagementTableRow>>(tableDataMocked);
  const { currentRoot } = useNavigation();
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  // TODO : Replace with loading and errors from GraphQL query
  const isLoading = false;
  const errors: [] = [];

  const tableColumns: Array<TableColumn<IAppointmentManagementTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: labels.tableLabels.columns.name,
      selector: (row) => row.name,
      cell: (row) => (
        <Link
          href={`${currentRoot}/services/demandes/${row.id}`}
          className="o-TablePage__Link"
        >
          {row.name}
        </Link>
      ),
      sortable: true,
      grow: 3,
    },
    {
      id: "remainingSlotsNumber",
      name: labels.tableLabels.columns.remainingSlotsNumber,
      selector: (row) => row.remainingSlotsNumber,
      sortable: true,
      grow: 2,
    },
  ];

  const actionColumn = (
    row: IAppointmentManagementTableRow,
  ): Array<IDataTableAction> => [
    {
      id: "see",
      picto: "eye",
      alt: "Voir",
      href: `${currentRoot}/services/demandes/gestion-rendez-vous/${row.id}`,
    },
  ];

  return (
    <div className="c-AppointmentManagement">
      <h2 className="c-AppointmentManagement__Title">
        {labels.tableLabels.title}
      </h2>
      <div className="c-AppointmentManagement__Table">
        <CommonLoader isLoading={isLoading} errors={errors}>
          <CommonDataTable<IAppointmentManagementTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows: pageData?.requests?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            defaultSortFieldId="id"
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
          />
        </CommonLoader>
      </div>
    </div>
  );
}
