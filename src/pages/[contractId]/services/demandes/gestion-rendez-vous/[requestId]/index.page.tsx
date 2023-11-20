import { useEffect, useRef, useState } from "react";
import { TableColumn } from "react-data-table-component";
import classNames from "classnames";
import { IDefaultTableRow } from "../../../../../../lib/common-data-table";
import { removeNulls } from "../../../../../../lib/utilities";
import { useRoutingQueryId } from "../../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../../layouts/ContractLayout/ContractLayout";
import {
  useDeleteRequestTakedByIdMutation,
  useGetAppointmentsDetailsByRequestIdLazyQuery,
} from "../../../../../../graphql/codegen/generated-types";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";
import { IDataTableAction } from "../../../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonDataTable from "../../../../../../components/Common/CommonDataTable/CommonDataTable";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import CommonReturnButton from "../../../../../../components/Common/CommonReturnButton/CommonReturnButton";
import CommonAccordion from "../../../../../../components/Common/CommonAccordion/CommonAccordion";
import "./gestion-rendez-vous.scss";

interface IAppointments {
  sectorNames: string;
  timeSlotsWithUsers: Array<IAppointment | null>;
}

interface IAppointment {
  dateFromQuery: string;
  date: string;
  slotFromQuery: string;
  slot: string;
  reservationsAndAvailabilities: string;
  requestTakeds?: Array<IAppointmentReservationDetailTableRow>;
}

interface IAppointmentReservationDetailTableRow extends IDefaultTableRow {
  user: {
    surname: string;
    name: string;
    phone: string;
    email: string;
  };
}

interface IAppointmentManagementPageProps {
  requestId: string;
}

interface IAppointmentManagementListProps {
  appointments: Array<IAppointments>;
}

export function AppointmentManagementPage({
  requestId,
}: IAppointmentManagementPageProps) {
  /* Static Data */
  const labels = {
    title: "Créneaux",
    reservation: "réservation",
    availability: "disponibilité",
    expanderLabel: "Afficher les réservations",
    expandedContentLabel: {
      surname: "Nom",
      name: "Prénom",
      phone: "Téléphone",
      email: "Email",
    },
    loadMoreTimeSlots: "Afficher plus de créneaux",
    loadMoreAppointments: "Afficher plus de secteurs",
  };

  /* Methods */
  function AppointmentManagementList({
    appointments,
  }: IAppointmentManagementListProps) {
    return (
      <>
        {appointments
          .slice(0, nbAppointmentsDisplayed)
          .map((appointmentData, appointmentDataIndex) => {
            const appointmentRows = appointmentData.timeSlotsWithUsers.map(
              (timeSlotWithUser, timeSlotWithUserIndex) => {
                if (!timeSlotWithUser) {
                  return;
                }
                const noReservation =
                  !timeSlotWithUser.requestTakeds ||
                  timeSlotWithUser.requestTakeds.length === 0;
                return (
                  <CommonAccordion
                    key={timeSlotWithUserIndex}
                    content={
                      <AppointmentManagementRowContent
                        date={timeSlotWithUser.date}
                        reservationsAndAvailabilities={
                          timeSlotWithUser.reservationsAndAvailabilities
                        }
                        slot={timeSlotWithUser.slot}
                      />
                    }
                    expanderLabel={labels.expanderLabel}
                    expandedContent={
                      noReservation ? (
                        <></>
                      ) : (
                        <AppointmentManagementRowExpandedContent
                          requestTakeds={timeSlotWithUser.requestTakeds ?? []}
                        />
                      )
                    }
                    expanderNotAvailable={noReservation}
                  />
                );
              },
            );

            return (
              <div
                key={appointmentDataIndex}
                className="c-AppointmentManagementPage__Appointment"
              >
                <span className="c-AppointmentManagementPage__Appointment_sectors">
                  {appointmentData.sectorNames}
                </span>
                {appointmentRows.slice(
                  0,
                  nbTimeSlotsDisplayed[appointmentDataIndex],
                )}
                {appointmentRows.length >
                  nbTimeSlotsDisplayed[appointmentDataIndex] && (
                  <span
                    className="c-AppointmentManagementPage__Appointment_loadMoreTimeSlots"
                    onClick={() => loadMoreTimeSlots(appointmentDataIndex)}
                  >
                    {labels.loadMoreTimeSlots}
                  </span>
                )}
              </div>
            );
          })}
        {appointments.length > nbAppointmentsDisplayed && (
          <span
            className="c-AppointmentManagementPage__Appointment_loadMoreAppointments"
            onClick={() => loadMoreAppointments()}
          >
            {labels.loadMoreAppointments}
          </span>
        )}
      </>
    );
  }

  function AppointmentManagementRowContent({
    date,
    reservationsAndAvailabilities,
    slot,
  }: Partial<IAppointment>) {
    if (!reservationsAndAvailabilities) {
      return <></>;
    }

    return (
      <div className="c-AppointmentManagementPage__Appointment_accordionContent">
        <span>{date}</span>
        <span>{slot}</span>
        <span
          className={classNames({
            ["c-AppointmentManagementPage__Appointment_accordionContent_reservationNotAvailable"]:
              reservationsAndAvailabilities.indexOf(
                `- 0 ${labels.availability}`,
              ) > 0,
          })}
        >
          {reservationsAndAvailabilities}
        </span>
      </div>
    );
  }

  function AppointmentManagementRowExpandedContent({
    requestTakeds,
  }: Partial<IAppointment>) {
    if (!requestTakeds) {
      return <></>;
    }

    const tableColumns: Array<
      TableColumn<IAppointmentReservationDetailTableRow>
    > = [
      {
        id: "id",
        selector: (row) => row.id,
        omit: true,
      },
      {
        id: "surname",
        name: labels.expandedContentLabel.surname,
        selector: (row) => row.user.surname,
        grow: 1.1,
        sortable: true,
      },
      {
        id: "name",
        name: labels.expandedContentLabel.name,
        selector: (row) => row.user.name,
        grow: 1.1,
        sortable: true,
      },
      {
        id: "phone",
        name: labels.expandedContentLabel.phone,
        selector: (row) => row.user.phone,
        grow: 1.3,
      },
      {
        id: "email",
        name: labels.expandedContentLabel.email,
        selector: (row) => row.user.email,
        sortable: true,
      },
    ];

    const actionColumn = (
      row: IAppointmentReservationDetailTableRow,
    ): Array<IDataTableAction> => [
      {
        id: "delete",
        picto: "trash",
        alt: "Supprimer",
        confirmStateOptions: {
          onConfirm: () => onDelete(row),
          confirmStyle: "warning",
        },
      },
    ];

    return (
      <div className="c-AppointmentManagementPage__Appointment_accordionExpandedContent">
        <CommonDataTable<IAppointmentReservationDetailTableRow>
          columns={tableColumns}
          actionColumn={actionColumn}
          data={requestTakeds}
          isLoading={isLoading}
          defaultSortFieldId="id"
        />
      </div>
    );
  }

  async function onDelete(row: IAppointmentReservationDetailTableRow) {
    return deleteRequestTaked({
      variables: { deleteRequestTakedId: row.id },
    });
  }

  function loadMoreTimeSlots(appointmentId: number) {
    const oldSliceNb = nbTimeSlotsDisplayed[appointmentId];
    const newSliceNb = [...nbTimeSlotsDisplayed];
    newSliceNb[appointmentId] = oldSliceNb + 5;
    setNbTimeSlotsDisplayed(newSliceNb);
  }

  function loadMoreAppointments() {
    setNbAppointmentsDisplayed(nbAppointmentsDisplayed + 6);
  }

  /* Local Data */
  const isInitialized = useRef<boolean>(false);
  const [requestFormTitle, setRequestFormTitle] = useState<string>("");
  const [appointmentsData, setAppointmentsData] = useState<
    Array<IAppointments>
  >([]);
  const [nbTimeSlotsDisplayed, setNbTimeSlotsDisplayed] = useState<
    Array<number>
  >([]);
  const [nbAppointmentsDisplayed, setNbAppointmentsDisplayed] =
    useState<number>(6);
  const [getAppointmentsDetails, { data, loading, error }] =
    useGetAppointmentsDetailsByRequestIdLazyQuery({
      variables: {
        requestId,
      },
      fetchPolicy: "network-only",
    });
  const [
    deleteRequestTaked,
    {
      loading: deleteRequestTakedLoading,
      error: deleteRequestTakedRequestError,
    },
  ] = useDeleteRequestTakedByIdMutation({
    refetchQueries: ["getAppointmentsDetailsByRequestId"],
    awaitRefetchQueries: true,
  });
  const isLoading = loading || deleteRequestTakedLoading;
  const errors = [error, deleteRequestTakedRequestError];

  useEffect(() => {
    if (data) {
      setRequestFormTitle(data.getAppointmentsDetails?.title ?? "");
      const nbAppointments =
        data.getAppointmentsDetails?.appointments?.length ?? 0;
      for (let i = 0; i < nbAppointments; i++) {
        const newSliceNb = nbTimeSlotsDisplayed;
        newSliceNb[i] = 5;
        setNbTimeSlotsDisplayed(newSliceNb);
      }
      setAppointmentsData(
        data.getAppointmentsDetails?.appointments
          ?.map((appointment) => {
            if (!appointment?.sectorNames || !appointment.timeSlotsWithUsers) {
              return;
            }
            return {
              sectorNames: appointment.sectorNames.join(", "),
              timeSlotsWithUsers: appointment.timeSlotsWithUsers.map(
                (timeSlotWithUsers) => {
                  if (
                    !timeSlotWithUsers?.slot ||
                    !timeSlotWithUsers.fixed ||
                    !timeSlotWithUsers.dynamic ||
                    !timeSlotWithUsers.date
                  ) {
                    return null;
                  }
                  const slotHoursStart = timeSlotWithUsers.slot.slice(0, 2);
                  const slotMinutesStart = timeSlotWithUsers.slot.slice(2, 4);
                  const slotHoursEnd = timeSlotWithUsers.slot.slice(5, 7);
                  const slotMinutesEnd = timeSlotWithUsers.slot.slice(7, 9);
                  const reservations =
                    +timeSlotWithUsers.fixed - +timeSlotWithUsers.dynamic;
                  return {
                    dateFromQuery: timeSlotWithUsers.date,
                    date: new Date(timeSlotWithUsers.date).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      },
                    ),
                    slotFromQuery: timeSlotWithUsers.slot,
                    slot: `${slotHoursStart}h${slotMinutesStart} - ${slotHoursEnd}h${slotMinutesEnd}`,
                    reservationsAndAvailabilities: `${reservations} ${
                      labels.reservation
                    }${
                      reservations < 2 ? "" : "s"
                    } - ${+timeSlotWithUsers.dynamic} ${labels.availability}${
                      +timeSlotWithUsers.dynamic < 2 ? "" : "s"
                    }`,
                    requestTakeds:
                      timeSlotWithUsers.requestTakeds
                        ?.map((requestTaked) => {
                          if (!requestTaked?.id) {
                            return null;
                          }
                          const user = requestTaked.user;
                          return {
                            id: requestTaked.id,
                            editState: false,
                            user: {
                              surname: user?.surname ?? "",
                              name: user?.name ?? "",
                              phone: user?.phone ?? "",
                              email: user?.email ?? "",
                            },
                          };
                        })
                        .filter(removeNulls) ?? [],
                  };
                },
              ),
            };
          })
          .filter(removeNulls) ?? [],
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      void getAppointmentsDetails();
    }
  }, [getAppointmentsDetails, isInitialized]);

  return (
    <div className="c-AppointmentManagementPage">
      {requestId && (
        <>
          <CommonReturnButton
            path="/services/demandes"
            query={{ tab: "appointmentManagement" }}
          />
          <PageTitle title={labels.title} />
          <CommonLoader isLoading={!isInitialized.current} errors={errors}>
            <PageTitle title={requestFormTitle} />
            <AppointmentManagementList appointments={appointmentsData} />
          </CommonLoader>
        </>
      )}
    </div>
  );
}

export default function IndexPage() {
  const requestId = useRoutingQueryId("requestId");

  return (
    requestId && (
      <ContractLayout>
        <AppointmentManagementPage requestId={requestId} />
      </ContractLayout>
    )
  );
}
