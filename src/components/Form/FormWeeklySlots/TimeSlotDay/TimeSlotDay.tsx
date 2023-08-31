import React, { useState } from "react";
import { registerLocale } from "react-datepicker";
import classNames from "classnames";
import { setHours, setMinutes } from "date-fns";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import { dateToSlotString, IDay, timeStringToDate } from "../../../../lib/time";
import { TTimeSlot } from "../../../../lib/requests";
import TimeDatePicker from "../../FormOpeningHours/TimeDatePicker/TimeDatePicker";
import "./time-slot-day.scss";

registerLocale("fr", fr);

export interface ITimeSlotDayError {
  fieldNames: Array<string>;
  isInvalid: boolean;
  message: string;
}

export interface ITimeSlotDayFields {
  morningStart: string | undefined;
  morningEnd: string | undefined;
  morningSlots: number | undefined;
  afternoonStart: string | undefined;
  afternoonEnd: string | undefined;
  afternoonSlots: number | undefined;
}

interface ITimeSlotUpdate {
  updatedMorningStart?: string;
  updatedMorningEnd?: string;
  updateMorningSlots?: number | null;
  updatedAfternoonStart?: string;
  updatedAfternoonEnd?: string;
  updatedAfternoonSlots?: number | null;
}

interface ITimeSlotDayProps {
  idPrefix: string;
  day: IDay;
  value?: TTimeSlot;
  parseValueIntoFields: (value?: TTimeSlot) => ITimeSlotDayFields;
  onChange: (value: TTimeSlot) => void;
  errors?: Array<ITimeSlotDayError>;
  isDisabled?: boolean;
  morningMin?: Date;
  morningMax?: Date;
  afternoonMin?: Date;
  afternoonMax?: Date;
}

export default function TimeSlotDay({
  idPrefix,
  day,
  value,
  parseValueIntoFields,
  onChange,
  errors,
  isDisabled = false,
  morningMin,
  morningMax,
  afternoonMin,
  afternoonMax,
}: ITimeSlotDayProps) {
  /* Static Data */
  const appointmentLabel = "rendez-vous";

  /* Methods */
  function handleChange(updates: ITimeSlotUpdate) {
    // Create timeSlots JSON object from existing values + modified value, with empty fallback
    const newMorningStart = updates.updatedMorningStart ?? morningStart ?? "";
    const newMorningEnd = updates.updatedMorningEnd ?? morningEnd ?? "";
    setNewAfternoonMin(
      newMorningEnd
        ? setHours(
            setMinutes(new Date(), parseInt(newMorningEnd.slice(3, 5))),
            parseInt(newMorningEnd.slice(0, 2)),
          )
        : afternoonMin,
    );
    const newMorningSlots =
      updates.updateMorningSlots === null
        ? undefined
        : updates.updateMorningSlots ?? morningSlots;
    const newAfternoonStart =
      updates.updatedAfternoonStart ?? afternoonStart ?? "";
    const newAfternoonEnd = updates.updatedAfternoonEnd ?? afternoonEnd ?? "";
    const newAfternoonSlots =
      updates.updatedAfternoonSlots === null
        ? undefined
        : updates.updatedAfternoonSlots ?? afternoonSlots;

    const updateTimeSlot: TTimeSlot = {
      ...((!!newMorningStart || !!newMorningEnd || !!newMorningSlots) && {
        [`${newMorningStart}-${newMorningEnd}`]: {
          fixed: newMorningSlots,
          // "fixed" is always copied into "dynamic" since once this is linked to a requestTaked it cannot be modified
          dynamic: newMorningSlots,
        },
      }),
      ...((!!newAfternoonStart || !!newAfternoonEnd || !!newAfternoonSlots) && {
        [`${newAfternoonStart}-${newAfternoonEnd}`]: {
          fixed: newAfternoonSlots,
          dynamic: newAfternoonSlots,
        },
      }),
    };
    onChange(updateTimeSlot);
  }

  /* Local Data */
  const {
    morningStart,
    morningEnd,
    morningSlots,
    afternoonStart,
    afternoonEnd,
    afternoonSlots,
  } = parseValueIntoFields(value);
  const [newAfternoonMin, setNewAfternoonMin] = useState<Date>();

  // Relative min/max dates
  const defaultMin = setHours(setMinutes(new Date(), 0), 0);
  const defaultMax = setHours(setMinutes(new Date(), 59), 23);
  // Morning
  const morningStartMin = morningMin ?? defaultMin;
  const morningStartMax =
    timeStringToDate(morningEnd, -1) ?? morningMax ?? defaultMax;
  const morningEndMin =
    timeStringToDate(morningStart, 1) ?? morningMin ?? defaultMin;
  const morningEndMax = morningMax ?? defaultMax;

  // Afternoon
  const afternoonStartMin =
    timeStringToDate(morningEnd, 1) ?? afternoonMin ?? defaultMin;
  const afternoonStartMax =
    timeStringToDate(afternoonEnd, -1) ?? afternoonMax ?? defaultMax;
  const afternoonEndMin =
    timeStringToDate(afternoonStart, 1) ??
    timeStringToDate(morningEnd, 1) ??
    afternoonMin ??
    defaultMin;
  const afternoonEndMax = afternoonMax ?? defaultMax;

  // Dynamic classnames
  const localErrors = errors ?? [];
  const dayClassNames = classNames("c-TimeSlotDay", {
    "c-TimeSlotDay_invalid": localErrors.length > 0,
  });
  const morningPickerClassNames = classNames("c-TimeSlotDay__DatePickers", {
    "c-TimeSlotDay__DatePickers_invalid": localErrors.some((error) =>
      error.fieldNames.some((name) => "morningStart morningEnd".includes(name)),
    ),
  });
  const morningSlotsClassNames = classNames("c-TimeSlotDay__SlotNumber", {
    "c-TimeSlotDay__SlotNumber_invalid": localErrors.some((error) =>
      error.fieldNames.some((name) => "morningSlots".includes(name)),
    ),
    "c-TimeSlotDay__SlotNumber_disabled": isDisabled,
  });
  const afternoonPickerClassNames = classNames("c-TimeSlotDay__DatePickers", {
    "c-TimeSlotDay__DatePickers_invalid": localErrors.some((error) =>
      error.fieldNames.some((name) =>
        "afternoonStart afternoonEnd".includes(name),
      ),
    ),
  });
  const afternoonSlotsClassNames = classNames("c-TimeSlotDay__SlotNumber", {
    "c-TimeSlotDay__SlotNumber_invalid": localErrors.some((error) =>
      error.fieldNames.some((name) => "afternoonSlots".includes(name)),
    ),
    "c-TimeSlotDay__SlotNumber_disabled": isDisabled,
  });
  const inputId = `${idPrefix}-${day.index}`;

  return (
    <div className={dayClassNames}>
      <div className="c-TimeSlotDay__Container">
        <label className="c-TimeSlotDay__Label" htmlFor={inputId}>
          {day.name}
        </label>
        <div className="c-TimeSlotDay__Slots">
          <div className="c-TimeSlotDay__Slot">
            <div className={morningPickerClassNames}>
              <TimeDatePicker
                id={inputId}
                selected={timeStringToDate(morningStart)}
                onChange={(date) =>
                  handleChange({ updatedMorningStart: dateToSlotString(date) })
                }
                minTime={morningStartMin}
                maxTime={morningStartMax}
                isDisabled={isDisabled}
              />
              <div className="c-TimeSlotDay__Dash" />
              <TimeDatePicker
                selected={timeStringToDate(morningEnd)}
                onChange={(date) =>
                  handleChange({ updatedMorningEnd: dateToSlotString(date) })
                }
                minTime={morningEndMin}
                maxTime={morningEndMax}
                isDisabled={isDisabled}
              />
            </div>
            <input
              className={morningSlotsClassNames}
              type="number"
              min="1"
              value={morningSlots ?? ""}
              onChange={(e) =>
                handleChange({
                  updateMorningSlots: Number.parseInt(e.target.value) || null,
                })
              }
              onWheel={(e) => (e.target as HTMLElement).blur()}
              disabled={isDisabled}
            />
            <span>{appointmentLabel}</span>
          </div>
          <div className="c-TimeSlotDay__Slot">
            <div className={afternoonPickerClassNames}>
              <TimeDatePicker
                selected={timeStringToDate(afternoonStart)}
                onChange={(date) =>
                  handleChange({
                    updatedAfternoonStart: dateToSlotString(date),
                  })
                }
                minTime={newAfternoonMin ?? afternoonStartMin}
                maxTime={afternoonStartMax}
                isDisabled={isDisabled}
              />
              <div className="c-TimeSlotDay__Dash" />
              <TimeDatePicker
                selected={timeStringToDate(afternoonEnd)}
                onChange={(date) =>
                  handleChange({ updatedAfternoonEnd: dateToSlotString(date) })
                }
                minTime={afternoonEndMin}
                maxTime={afternoonEndMax}
                isDisabled={isDisabled}
              />
            </div>
            <input
              className={afternoonSlotsClassNames}
              type="number"
              min="1"
              value={afternoonSlots ?? ""}
              onChange={(e) =>
                handleChange({
                  updatedAfternoonSlots:
                    Number.parseInt(e.target.value) || null,
                })
              }
              onWheel={(e) => (e.target as HTMLElement).blur()}
              disabled={isDisabled}
            />
            <span>{appointmentLabel}</span>
          </div>
        </div>
      </div>
      {errors && errors.length > 0 && (
        <div className="c-TimeSlotDay__Error u-ErrorText u-ErrorText_bold">
          {errors[0].message}
        </div>
      )}
    </div>
  );
}
