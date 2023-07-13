import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import classNames from "classnames";
import { IDefaultTableRow } from "../../../../../../lib/common-data-table";
import { useRoutingQueryId } from "../../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../../layouts/ContractLayout/ContractLayout";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";
import { IDataTableAction } from "../../../../../../components/Common/CommonDataTable/DataTableActions/DataTableActions";
import CommonDataTable from "../../../../../../components/Common/CommonDataTable/CommonDataTable";
import InformationMessageFormReturnButton from "../../../../../../components/InformationMessage/InformationMessageFormReturnButton/InformationMessageFormReturnButton";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import CommonAccordion from "../../../../../../components/Common/CommonAccordion/CommonAccordion";
import { appointmentManagementMockedGraphQLData } from "./mockedGraphQLData";
import "./gestion-rendez-vous.scss";

interface IAppointments {
  sectorNames: string;
  timeSlotsWithUsers: Array<IAppointment>;
}

interface IAppointment {
  date: string;
  slot: string;
  reservationsAndAvailabilities: string;
  users?: Array<IAppointmentReservationDetailTableRow>;
}

interface IAppointmentReservationDetailTableRow extends IDefaultTableRow {
  id: string;
  surname: string;
  name: string;
  phone: string;
  email: string;
}

interface IAppointmentManagementPageProps {
  requestId: string;
}

export function AppointmentManagementPage({
  requestId,
}: IAppointmentManagementPageProps) {
  /* Static Data */
  const labels = {
    back: "Retour",
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
  function AppointmentManagementRowContent({
    date,
    reservationsAndAvailabilities,
    slot,
  }: IAppointment) {
    return (
      <div className="c-AppointmentManagementPage__Appointment_accordionContent">
        <span>{date}</span>
        <span>{slot}</span>
        <span
          className={classNames({
            ["c-AppointmentManagementPage__Appointment_accordionContent_reservationNotAvailable"]:
              reservationsAndAvailabilities.indexOf(
                `0 ${labels.availability}`,
              ) > 0,
          })}
        >
          {reservationsAndAvailabilities}
        </span>
      </div>
    );
  }

  function AppointmentManagementRowExpandedContent({
    users,
  }: Partial<IAppointment>) {
    if (!users) {
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
        selector: (row) => row.surname,
        grow: 1.1,
      },
      {
        id: "name",
        name: labels.expandedContentLabel.name,
        selector: (row) => row.name,
        grow: 1.1,
      },
      {
        id: "phone",
        name: labels.expandedContentLabel.phone,
        selector: (row) => row.phone,
        grow: 1.3,
      },
      {
        id: "email",
        name: labels.expandedContentLabel.email,
        selector: (row) => row.email,
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
          onConfirm: () => {
            // TODO : Replace with GraphQL remove call when it will be available
            console.log(`Reservation ${row.id} removed`);
          },
          confirmStyle: "warning",
        },
      },
    ];

    return (
      <div className="c-AppointmentManagementPage__Appointment_accordionExpandedContent">
        <CommonDataTable<IAppointmentReservationDetailTableRow>
          columns={tableColumns}
          actionColumn={actionColumn}
          data={users}
          isLoading={isLoading}
          defaultSortFieldId="id"
        />
      </div>
    );
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
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [nbTimeSlotsDisplayed, setNbTimeSlotsDisplayed] = useState<
    Array<number>
  >([]);
  const [nbAppointmentsDisplayed, setNbAppointmentsDisplayed] =
    useState<number>(6);
  // TODO : Replace with GraphQL call when it will be available
  const graphQLData = appointmentManagementMockedGraphQLData;
  // TODO : Set title Title and Map graphQLData in useEffect when GraphQL call will be available
  const requestFormTitle = graphQLData.title;
  const appointmentsData: Array<IAppointments> = graphQLData.appointments.map(
    (appointment) => {
      return {
        sectorNames: appointment.sectorNames.join(", "),
        timeSlotsWithUsers: appointment.timeSlotsWithUsers.map(
          (timeSlotWithUsers) => {
            const slotHoursStart = timeSlotWithUsers.slot.slice(0, 2);
            const slotMinutesStart = timeSlotWithUsers.slot.slice(2, 4);
            const slotHoursEnd = timeSlotWithUsers.slot.slice(5, 7);
            const slotMinutesEnd = timeSlotWithUsers.slot.slice(7, 9);
            const reservations =
              timeSlotWithUsers.fixed - timeSlotWithUsers.dynamic;
            return {
              date: new Date(timeSlotWithUsers.date).toLocaleDateString(
                undefined,
                {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                },
              ),
              slot: `${slotHoursStart}h${slotMinutesStart} - ${slotHoursEnd}h${slotMinutesEnd}`,
              reservationsAndAvailabilities: `${reservations} ${
                labels.reservation
              }${reservations < 2 ? "" : "s"} - ${timeSlotWithUsers.dynamic} ${
                labels.availability
              }${timeSlotWithUsers.dynamic < 2 ? "" : "s"}`,
              users: timeSlotWithUsers.users.map((user) => {
                return {
                  id: user.id,
                  editState: false,
                  surname: user.surname,
                  name: user.name,
                  phone: user.phone,
                  email: user.email,
                };
              }),
            };
          },
        ),
      };
    },
  );
  // TODO : Replace with graphQL isLoading and errors values
  const isLoading = false;
  const errors: [] = [];

  const appointments = appointmentsData.map(
    (appointmentData, appointmentDataIndex) => {
      const appointmentRows = appointmentData.timeSlotsWithUsers.map(
        (timeSlotWithUser, timeSlotWithUserIndex) => {
          const noReservation =
            !timeSlotWithUser.users || timeSlotWithUser.users.length === 0;
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
                    users={timeSlotWithUser.users ?? []}
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
          {appointmentRows.slice(0, nbTimeSlotsDisplayed[appointmentDataIndex])}
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
    },
  );

  useEffect(() => {
    if (!isInitialized && appointmentsData) {
      for (const i of appointmentsData.keys()) {
        const newSliceNb = nbTimeSlotsDisplayed;
        newSliceNb[i] = 5;
        setNbTimeSlotsDisplayed(newSliceNb);
      }
      setIsInitialized(true);
    }
  }, [isInitialized, appointmentsData, nbTimeSlotsDisplayed]);

  return (
    <div className="c-AppointmentManagementPage">
      {requestId && (
        <>
          <InformationMessageFormReturnButton
            path="/services/demandes"
            query={{ tab: "appointmentManagement" }}
          />
          <PageTitle title={labels.title} />
          <CommonLoader isLoading={isLoading} errors={errors}>
            <PageTitle title={requestFormTitle} />
            {appointments.slice(0, nbAppointmentsDisplayed)}
            {appointments.length > nbAppointmentsDisplayed && (
              <span
                className="c-AppointmentManagementPage__Appointment_loadMoreAppointments"
                onClick={() => loadMoreAppointments()}
              >
                {labels.loadMoreAppointments}
              </span>
            )}
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
