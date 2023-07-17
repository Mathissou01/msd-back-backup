import { useFormContext } from "react-hook-form";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import RequestAppointmentSlotsBySector, {
  IRequestAppointmentSlotsBySectorLabels,
} from "./RequestAppointmentSlotsBySector/RequestAppointmentSlotsBySector";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import FormInput from "../../Form/FormInput/FormInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import "./request-appointment-slots.scss";

export interface IRequestAppointmentSlotsLabels {
  staticHasAppointmentSlotsLabel: string;
  staticHasAppointmentSlotsTrueOption: string;
  staticHasAppointmentSlotsFalseOption: string;
  staticNumberOfRequiredSlots: string;
  staticHoursBeforeReservation: string;
  staticHoursBeforeReservationSuffix: string;
  staticHoursBeforeReservationErrorMessage: string;
  staticSlotsReservationRulesTitle: string;
  staticSlotsReservationRulesFieldLabel: string;
  appointmentSlotsBySector: IRequestAppointmentSlotsBySectorLabels;
}

interface IRequestAppointmentSlotsProps {
  labels: IRequestAppointmentSlotsLabels;
}

export default function RequestAppointmentSlots({
  labels,
}: IRequestAppointmentSlotsProps) {
  /* Methods */
  function registerAppointmentSlotsFields() {
    register("numberOfRequiredSlots", { value: null });
    register("hoursBeforeReservationIsActivated", { value: null });
    register("slotsReservationRules", { value: null });
  }

  function unregisterAppointmentSlotsFields() {
    unregister("numberOfRequiredSlots");
    unregister("hoursBeforeReservationIsActivated");
    unregister("slotsReservationRules");
  }

  /* Local data */
  const { getValues, register, unregister } = useFormContext();
  const hasAppointmentSlots = getValues("hasAppointmentSlots") === "1";
  const numberOfRequiredSlotsOptions: Array<IOptionWrapper<number>> = [];
  for (let i = 1; i < 11; i++) {
    numberOfRequiredSlotsOptions.push({ label: i.toString(), option: i });
  }
  const days = [
    { name: "Lundi", index: 1 },
    { name: "Mardi", index: 2 },
    { name: "Mercredi", index: 3 },
    { name: "Jeudi", index: 4 },
    { name: "Vendredi", index: 5 },
    { name: "Samedi", index: 6 },
    { name: "Dimanche", index: 0 },
  ];
  const slotsReservationRulesOptions: Array<IOptionWrapper<string>> = days.map(
    (day) => {
      return {
        label: day.name,
        option: day.index.toString(),
      };
    },
  );

  return (
    <>
      <div className="o-Form__Group">
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
          onChange={(value) => {
            value === "0"
              ? unregisterAppointmentSlotsFields()
              : registerAppointmentSlotsFields();
          }}
        />
      </div>
      {hasAppointmentSlots && (
        <>
          <div className="o-Form__Group">
            <div className="c-RequestAppointmentSlots__RequiredSlots">
              <FormSelect<number>
                label={labels.staticNumberOfRequiredSlots}
                name="numberOfRequiredSlots"
                options={numberOfRequiredSlotsOptions}
                defaultValue={1}
                isRequired
              />
            </div>
            <div className="c-RequestAppointmentSlots__Hours">
              <FormInput
                type="text"
                name="hoursBeforeReservationIsActivated"
                label={labels.staticHoursBeforeReservation}
                patternValidation={/^\d+$/}
                patternValidationErrorMessage={
                  labels.staticHoursBeforeReservationErrorMessage
                }
                suffixLabel={labels.staticHoursBeforeReservationSuffix}
              />
            </div>
            <div>
              <span className="c-RequestAppointmentSlots__SlotsTitle">
                {labels.staticSlotsReservationRulesTitle}
              </span>
              <div className="c-RequestAppointmentSlots__SlotsLine">
                {days.map((day) => {
                  return (
                    <FormSelect<string>
                      key={day.index}
                      label={`${day.name}${labels.staticSlotsReservationRulesFieldLabel}`}
                      name={`slotsReservationRules.${day.index}`}
                      options={slotsReservationRulesOptions}
                      isRequired
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className="o-Form__Group">
            <RequestAppointmentSlotsBySector
              labels={labels.appointmentSlotsBySector}
            />
          </div>
        </>
      )}
    </>
  );
}
