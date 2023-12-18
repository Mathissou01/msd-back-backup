import { TableColumn } from "react-data-table-component";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { add, addMinutes, format, parseISO } from "date-fns";
import {
  ICurrentPagination,
  IDefaultTableRow,
} from "../../../../lib/common-data-table";
import { removeNulls } from "../../../../lib/utilities";
import {
  GetAlertNotificationsByContractIdQuery,
  GetAlertNotificationsByContractIdQueryVariables,
  useDeleteAlertNotificationByIdMutation,
  useGetAlertNotificationsByContractIdLazyQuery,
} from "../../../../graphql/codegen/generated-types";
import { getRightsByLabel } from "../../../../lib/user";
import { useContract } from "../../../../hooks/useContract";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useUser } from "../../../../hooks/useUser";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import CommonDataTable from "../../../../components/Common/CommonDataTable/CommonDataTable";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import { IDataTableAction } from "../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonButtonGroup, {
  ICommonButtonGroupSingle,
} from "../../../../components/Common/CommonButtonGroup/CommonButtonGroup";
import "./alertes-page.scss";

export interface IAlertsTableRow extends IDefaultTableRow {
  alertDescription: string;
  canal: string;
  scheduledAt: Date;
  scheduledAtTime: string;
}

interface IFilters extends Record<string, unknown> {
  scheduledAt?: string;
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

  const currentDate = useMemo(() => new Date(), []);
  const currentDateString = useMemo(
    () => format(currentDate, "yyyy-MM-dd"),
    [currentDate],
  );

  const currentTimeString = useMemo(
    () => format(addMinutes(currentDate, 1), "HH:mm"),
    [currentDate],
  );

  /* Methods */
  async function handleLazyLoad(params: ICurrentPagination) {
    return getAlertNotifications({
      variables: {
        ...defaultQueryVariables,
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
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("AlertNotification", userRights);
  const isInitialized = useRef(false);
  const [tableData, setTableData] = useState<Array<IAlertsTableRow>>([]);
  const [filters, setFilters] = useState<IFilters>({});
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const defaultRowsPerPage = 30;
  const defaultPage = 1;
  const contractFilter = {
    alertNotifService: {
      contract: {
        id: {
          eq: contractId,
        },
      },
    },
  };
  const pastAlertsFilter = {
    or: [
      {
        and: [
          { scheduledAt: { eq: currentDateString } },
          { scheduledAtTime: { lte: currentTimeString } },
        ],
      },
      { scheduledAt: { lt: currentDateString } },
    ],
  };
  const futureAlertsFilter = {
    or: [
      { and: [{ scheduledAt: { gt: currentDateString } }] },
      {
        and: [
          { scheduledAt: { eq: currentDateString } },
          { scheduledAtTime: { gt: currentTimeString } },
        ],
      },
    ],
  };
  const defaultQueryVariables: GetAlertNotificationsByContractIdQueryVariables =
    {
      contractId: contractId,
      nowDate: currentDateString,
      nowTime: currentTimeString,
      sort: "scheduledAt:asc",
      filters:
        filters?.scheduledAt === "past"
          ? {
              ...contractFilter,
              ...pastAlertsFilter,
            }
          : {
              ...contractFilter,
              ...futureAlertsFilter,
            },
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
  ] = useDeleteAlertNotificationByIdMutation({
    refetchQueries: ["getAlertNotificationsByContractId"],
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
      cell: userPermissions.update
        ? (row) => (
            <Link
              href={`${currentRoot}/services/alertes/${row.id}`}
              className="o-TablePage__Link"
            >
              {row.alertDescription}
            </Link>
          )
        : undefined,
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
      selector: (row) =>
        `${format(row.scheduledAt, "dd-MM-yyyy")} ${row.scheduledAtTime}`,
      sortable: true,
      grow: 3,
    },
  ];

  const actionColumn = (row: IAlertsTableRow): Array<IDataTableAction> => {
    const customizedCurrentDate = add(currentDate, { hours: 5 });
    const scheduledDate = row.scheduledAt;
    const scheduledTime = add(scheduledDate, {
      hours: +row.scheduledAtTime.split(":")[0],
      minutes: +row.scheduledAtTime.split(":")[1],
    });
    const isAlertSent =
      scheduledDate.getDate() < currentDate.getDate() ||
      +scheduledTime < +customizedCurrentDate;
    const actions: Array<IDataTableAction> = [];

    if (isAlertSent) {
      actions.push({
        id: "delete",
        picto: "trash",
        isDisabled: !userPermissions.delete,
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
        isDisabled: !userPermissions.update,
        href: `${currentRoot}/services/alertes/${row.id}`,
      });
    }

    return actions;
  };

  const [filterButtonGroup, setFilterButtonGroup] =
    useState<Array<ICommonButtonGroupSingle>>();

  const filtersNode = (
    <CommonButtonGroup
      buttons={filterButtonGroup ?? []}
      onChange={(button) =>
        setFilters({ ...filters, scheduledAt: button.value })
      }
    />
  );

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
                  alertNotification.attributes.alertDescription ?? "",
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
                  : currentDate,
                scheduledAtTime:
                  alertNotification.attributes.scheduledAtTime ?? "",
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
      setFilterButtonGroup([
        {
          label: `A venir (${pageData?.notSentCount?.meta.pagination.total})`,
          value: "future",
        },
        {
          label: `Passées (${pageData?.sentCount?.meta.pagination.total})`,
          value: "past",
        },
      ]);
    }
  }, [currentDate, data, pageData]);

  useEffect(() => {
    setIsUpdatingData(false);
  }, [tableData]);

  useEffect(() => {
    setPageData(data);
  }, [data]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      if (!userPermissions.read) router.push(`/${contractId}`);
      else {
        void getAlertNotifications();
      }
    }
  }, [
    contractId,
    getAlertNotifications,
    isInitialized,
    router,
    userPermissions.read,
  ]);

  return (
    <div className="c-AlertsPage">
      <PageTitle title={labels.title} />
      <div>
        <CommonButton
          label={labels.addButton}
          style="primary"
          picto="add"
          onClick={() => router.push(`${currentRoot}/services/alertes/create`)}
          isDisabled={!userPermissions.create}
        />
      </div>
      <h2 className="c-AlertsPage__Title">{tableLabels.title}</h2>
      <div className="c-AlertsPage__Table ">
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
            filters={filters}
            filtersNode={filtersNode}
            defaultSortFieldId={"id"}
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
  return (
    <ContractLayout>
      <AlertsPage />
    </ContractLayout>
  );
}
