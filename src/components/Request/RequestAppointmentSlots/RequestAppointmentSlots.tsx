import { useFormContext } from "react-hook-form";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import "./request-appointment-slots.scss";

export interface IRequestAppointmentSlotsLabels {
  staticHasAppointmentSlotsLabel: string;
  staticHasAppointmentSlotsTrueOption: string;
  staticHasAppointmentSlotsFalseOption: string;
}

export default function RequestAppointmentSlots() {
  /* Static Data */
  const labels: IRequestAppointmentSlotsLabels = {
    staticHasAppointmentSlotsLabel: "Afficher des créneaux de rendez-vous",
    staticHasAppointmentSlotsTrueOption: "Oui",
    staticHasAppointmentSlotsFalseOption: "Non",
  };

  /* Local data */
  const { getValues } = useFormContext();

  return (
    <div className="c-RequestAppointmentSlots">
      <div className="c-RequestAppointmentSlots__HasAppointmentSlots">
        <FormRadioInput
          name="hasAppointmentSlots"
          displayName={labels.staticHasAppointmentSlotsLabel}
          options={[
            {
              value: "1",
              label: labels.staticHasAppointmentSlotsTrueOption,
            },
            {
              value: "0",
              label: labels.staticHasAppointmentSlotsFalseOption,
            },
          ]}
        />
      </div>
      {getValues("hasAppointmentSlots") === "1" && <></>}
    </div>
  );
}
