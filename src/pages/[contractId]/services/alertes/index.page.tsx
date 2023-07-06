import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import Link from "next/link";
import { format, isBefore, parseISO } from "date-fns";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../lib/common-data-table";
import { removeNulls } from "../../../../lib/utilities";
import { TableColumn } from "react-data-table-component";
import {
  GetAlertNotificationsByContractIdQuery,
  GetAlertNotificationsByContractIdQueryVariables,
  useDeleteAlertNotificationsByIdMutation,
  useGetAlertNotificationsByContractIdLazyQuery,
} from "../../../../graphql/codegen/generated-types";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";

export interface IAlertsTableRow extends IDefaultTableRow {
  alertDescription: string;
  canal: string;
  scheduledAt: Date;
}
export function AlertsPage() {
  /* Static Data */
  const labels = {
    title: "Alertes",
    addButton: "Créer une alerte",
  };

  const tableLabels = {
    title: "Liste des alertes",
    columns: {
      alertDescription: "Nom",
      canal: "Canal",
      ScheduledAt: "Date d'envoi",
    },
  };

  /* Methods */
  async function handleLazyLoad(params: ICurrentPagination) {
    return getAlertNotifications({
      variables: {
        contractId: contractId,
        pagination: { page: params.page, pageSize: params.rowsPerPage },
        ...(params.sort?.column && {
          sort: `${params.sort.column}:${params.sort.direction ?? "asc"}`,
        }),
      },
    });
  }

  async function onDelete(row: IAlertsTableRow) {
    setIsUpdatingData(true);
    return deleteAlertMutation({
      variables: { deleteAlertNotificationId: row.id },
    });
  }

  /* Local Data */
  const { contractId } = useContract();
  const { currentRoot } = useNavigation();
  const router = useRouter();
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<IAlertsTableRow>>([]);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const defaultQueryVariables: GetAlertNotificationsByContractIdQueryVariables =
    {
      contractId: contractId,
      sort: "scheduledAt:asc",
      pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
    };

  const [getAlertNotifications, { data, loading, error }] =
    useGetAlertNotificationsByContractIdLazyQuery({
      variables: defaultQueryVariables,
      fetchPolicy: "network-only",
    });

  const [
    deleteAlertMutation,
    { loading: deleteAlertMutationLoading, error: deleteAlertMutationError },
  ] = useDeleteAlertNotificationsByIdMutation({
    refetchQueries: ["GetAlertNotificationsByContractId"],
    awaitRefetchQueries: true,
  });

  const [pageData, setPageData] = useState<
    GetAlertNotificationsByContractIdQuery | undefined
  >(data);

  const isLoadingMutation = deleteAlertMutationLoading || isUpdatingData;
  const isLoading = loading || isLoadingMutation;
  const errors = [error, deleteAlertMutationError];

  const tableColumns: Array<TableColumn<IAlertsTableRow>> = [
    {
      id: "id",
      selector: (row) => row.id,
      omit: true,
    },
    {
      id: "alertDescription",
      name: tableLabels.columns.alertDescription,
      selector: (row) => row.alertDescription,
      cell: (row) => (
        <Link
          href={`${currentRoot}/services/alertes/${row.id}`}
          className="o-TablePage__Link"
        >
          {row.alertDescription}
        </Link>
      ),
      sortable: true,
      grow: 3,
    },
    {
      id: "canal",
      name: tableLabels.columns.canal,
      selector: (row) => row.canal,
      grow: 2,
    },
    {
      id: "scheduledAt",
      name: tableLabels.columns.ScheduledAt,
      selector: (row) => format(row.scheduledAt, "dd-MM-yyyy"),
      sortable: true,
      grow: 3,
    },
  ];

  const actionColumn = (row: IAlertsTableRow): Array<IDataTableAction> => {
    const currentDate = new Date();
    const scheduledDate = row.scheduledAt;
    const isAlertSent = isBefore(scheduledDate, currentDate);
    const actions: Array<IDataTableAction> = [];

    if (isAlertSent) {
      actions.push({
        id: "delete",
        picto: "trash",
        confirmStateOptions: {
          onConfirm: () => onDelete(row),
          confirmStyle: "warning",
        },
      });
    }
    if (!isAlertSent) {
      actions.push({
        id: "edit",
        picto: "edit",
        href: `${currentRoot}/edito/alertes/${row.id}`,
      });
    }

    return actions;
  };

  useEffect(() => {
    if (data) {
      setTableData(
        data.alertNotifications?.data
          ?.map((alertNotification) => {
            if (
              alertNotification &&
              alertNotification.id &&
              alertNotification.attributes
            ) {
              return {
                id: alertNotification.id,
                editState: false,
                alertDescription:
                  alertNotification.attributes.alertMessage ?? "",
                canal:
                  alertNotification.attributes?.sendSMS === true &&
                  alertNotification.attributes?.sendMail === true
                    ? "SMS/Mail"
                    : alertNotification.attributes?.sendSMS === true
                    ? "SMS"
                    : alertNotification.attributes?.sendMail === true
                    ? "Mail"
                    : "",

                scheduledAt: alertNotification.attributes?.scheduledAt
                  ? parseISO(alertNotification.attributes.scheduledAt)
                  : new Date(),
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [data, pageData]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  useEffect(() => {
    setPageData(data);
  }, [data]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getAlertNotifications();
    }
  }, [getAlertNotifications, isInitialized]);

  return (
    <div className="o-AlertsPage">
      <PageTitle title={labels.title} />
      <div>
        <CommonButton
          label={labels.addButton}
          style="primary"
          picto="add"
          onClick={() => router.push(`${currentRoot}/services/alertes/create`)}
        />
      </div>
      <h2 className="o-TablePage__Title">{tableLabels.title}</h2>
      <div className="o-TablePage__Table ">
        <CommonLoader
          isLoading={!isInitialized.current}
          isShowingContent={isLoadingMutation}
          errors={errors}
        >
          <CommonDataTable<IAlertsTableRow>
            columns={tableColumns}
            actionColumn={actionColumn}
            data={tableData}
            lazyLoadingOptions={{
              isRemote: true,
              totalRows:
                pageData?.alertNotifications?.meta.pagination.total ?? 0,
            }}
            isLoading={isLoading}
            defaultSortFieldId={"id"}
            paginationOptions={{
              hasPagination: true,
              hasRowsPerPageOptions: false,
              defaultRowsPerPage,
              defaultPage,
            }}
            onLazyLoad={handleLazyLoad}
          ></CommonDataTable>
        </CommonLoader>
      </div>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <AlertsPage />
    </ContractLayout>
  );
}
