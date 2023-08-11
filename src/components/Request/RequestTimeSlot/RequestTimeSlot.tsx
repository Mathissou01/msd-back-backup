import { ITimeSlotsDisplay } from "../../../lib/requests";
import "./request-time-slot.scss";

interface IRequestTimeSlotProps {
  timeSlot: ITimeSlotsDisplay;
}

export default function RequestTimeSlot({ timeSlot }: IRequestTimeSlotProps) {
  /* Static Data */
  const labels = {
    separator: ":",
    appointment: "rendez-vous",
  };

  return (
    <div className="c-RequestTimeSlot">
      <span data-testid="time-slot-day">{timeSlot.day}</span>
      <div className="c-RequestTimeSlot__Slots">
        {timeSlot.slots.map((slot, slotIndex) => {
          return (
            <div key={slotIndex}>
              <span data-testid="time-slot-text">
                {slot.slot} {labels.separator}
              </span>
              <span data-testid="time-slot-nb-appointments">
                {slot.nbAppointments} {labels.appointment}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
