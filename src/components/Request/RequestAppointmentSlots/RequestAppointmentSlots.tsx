import { useFormContext } from "react-hook-form";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormInput from "../../Form/FormInput/FormInput";
import "./request-appointment-slots.scss";

export default function RequestAppointmentSlotsFieldsGroup() {
  /* Static Data */
  const labels = {
    staticHasAppointmentSlotsLabel: "Afficher des créneaux de rendez-vous",
    staticHasAppointmentSlotsTrueOption: "Oui",
    staticHasAppointmentSlotsFalseOption: "Non",
    staticNumberOfRequiredSlots: "Nombre de créneaux requis",
    staticHoursBeforeReservation:
      "Les usagers ne peuvent pas réserver moins de",
    staticHoursBeforeReservationErrorMessage:
      "Ce champ n'accepte que des nombres entiers",
    staticHoursBeforeReservationSuffix: "heure(s) avant le début du créneau",
    staticSlotsReservationRulesTitle: "Règles de réservation des créneaux",
    staticSlotsReservationRulesFielLabel:
      ", l'usager peut réserver à partir de",
  };

  /* Methods */
  function unregisterAppointmentSlotsFields() {
    unregister("numberOfRequiredSlots");
    unregister("hoursBeforeReservationIsActivated");
    unregister("slotsReservationRules");
  }

  /* Local data */
  const { getValues, unregister, resetField } = useFormContext();
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
      <div className="c-RequestAppointmentSlotsFieldsGroup">
        <div className="c-RequestAppointmentSlotsFieldsGroup__HasAppointmentSlots">
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
                : resetField("numberOfRequiredSlots", { defaultValue: 1 });
            }}
          />
        </div>
      </div>
      {getValues("hasAppointmentSlots") === "1" && (
        <div className="c-RequestAppointmentSlotsFieldsGroup">
          <div className="c-RequestAppointmentSlotsFieldsGroup__NumberAndRules_numberOfRequiredSlots">
            <FormSelect<number>
              label={labels.staticNumberOfRequiredSlots}
              name="numberOfRequiredSlots"
              options={numberOfRequiredSlotsOptions}
              isRequired
            />
          </div>
          <div className="c-RequestAppointmentSlotsFieldsGroup__NumberAndRules_hoursBeforeReservationIsActivated">
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
            <span className="c-RequestAppointmentSlotsFieldsGroup__NumberAndRules_slotsReservationRulesTitle">
              {labels.staticSlotsReservationRulesTitle}
            </span>
            <div className="c-RequestAppointmentSlotsFieldsGroup__NumberAndRules_slotsReservationRulesLine">
              {days.map((day) => {
                return (
                  <FormSelect<string>
                    key={day.index}
                    label={`${day.name}${labels.staticSlotsReservationRulesFielLabel}`}
                    name={`slotsReservationRules.${day.index}`}
                    options={slotsReservationRulesOptions}
                    isRequired
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
