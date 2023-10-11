import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { TableColumn } from "react-data-table-component";
import { IDefaultTableRow } from "../../../lib/common-data-table";
import { removeNulls } from "../../../lib/utilities";
import { getRightsByLabel } from "../../../lib/user";
import { useUser } from "../../../hooks/useUser";
import { useNavigation } from "../../../hooks/useNavigation";
import { useContract } from "../../../hooks/useContract";
import { useGetEnrichRequestsByRequestServiceIdLazyQuery } from "../../../graphql/codegen/generated-types";
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
    title: "Liste des formulaires avec prise de rendez-vous",
    columns: {
      name: "Formulaire",
      remainingSlotsNumber: "Nb de créneaux restants",
    },
    loadMore: "Afficher plus",
  };

  /* Methods */
  function loadMoreRequests() {
    setNbRequestsDisplayed(nbRequestsDisplayed + 30);
  }

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Request", userRights);
  const router = useRouter();
  const { currentRoot } = useNavigation();
  const { contractId } = useContract();
  const isInitialized = useRef<boolean>(false);
  const [tableData, setTableData] = useState<
    Array<IAppointmentManagementTableRow>
  >([]);
  const [nbRequestsDisplayed, setNbRequestsDisplayed] = useState<number>(30);
  const [getEnrichRequests, { data, loading, error }] =
    useGetEnrichRequestsByRequestServiceIdLazyQuery({
      variables: {
        requestServiceId: contractId,
      },
      fetchPolicy: "network-only",
    });
  const isLoading = loading;
  const errors = [error];

  const tableColumns: Array<TableColumn<IAppointmentManagementTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: labels.columns.name,
      selector: (row) => row.name,
      cell: userPermissions.read
        ? (row) => (
            <Link
              href={`${currentRoot}/services/demandes/${row.id}`}
              className="o-TablePage__Link"
            >
              {row.name}
            </Link>
          )
        : undefined,
      sortable: true,
      grow: 3,
    },
    {
      id: "remainingSlotsNumber",
      name: labels.columns.remainingSlotsNumber,
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
      isDisabled: !userPermissions.read,
      alt: "Voir",
      href: `${currentRoot}/services/demandes/gestion-rendez-vous/${row.id}`,
    },
  ];

  useEffect(() => {
    if (data) {
      setTableData(
        data.getEnrichRequests
          ?.map((request) => {
            if (!request?.requestId) {
              return null;
            }
            return {
              id: request.requestId,
              editState: false,
              name: request.requestName ?? "",
              remainingSlotsNumber: request.dynamicAppointments ?? 0,
            };
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [data]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (userPermissions.read) void getEnrichRequests();
      else {
        router.push(`/${contractId}`);
      }
    }
  }, [
    contractId,
    getEnrichRequests,
    isInitialized,
    router,
    userPermissions.read,
  ]);

  return (
    <div className="c-AppointmentManagement">
      <h2 className="c-AppointmentManagement__Title">{labels.title}</h2>
      <div className="c-AppointmentManagement__Table">
        <CommonLoader isLoading={isLoading} errors={errors}>
          <CommonDataTable<IAppointmentManagementTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData.slice(0, nbRequestsDisplayed)}
            isLoading={isLoading}
            defaultSortFieldId="id"
          />
          {tableData.length > nbRequestsDisplayed && (
            <span
              className="c-AppointmentManagement__LoadMore"
              onClick={() => loadMoreRequests()}
            >
              {labels.loadMore}
            </span>
          )}
        </CommonLoader>
      </div>
    </div>
  );
}
