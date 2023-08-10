import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TSlotString, TTimeSlot, TWeeklySlots } from "../../../lib/requests";
import { IDay, weekDays } from "../../../lib/time";
import { removeNulls } from "../../../lib/utilities";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import TimeSlotDay, {
  ITimeSlotDayError,
  ITimeSlotDayFields,
} from "./TimeSlotDay/TimeSlotDay";
import "./form-weekly-slots.scss";

interface IFormWeeklySlotsProps {
  name: string;
  defaultValue?: TWeeklySlots;
  titleLabel?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export default function FormWeeklySlots({
  name,
  defaultValue,
  titleLabel,
  isRequired = false,
  isDisabled = false,
}: IFormWeeklySlotsProps) {
  /* Static Data */
  const title = titleLabel ?? "Plages horaires";
  const descriptions = {
    format: `Format attendu : 00h00`,
    example: `Exemple : 08h00 - 12h00   14h00 - 17h00`,
    instructions: `Laisser vides les jours fermés. S’il n’y a pas de pause méridienne, veuillez remplir uniquement les deux premières cases.`,
  };
  const errorMessages = {
    required: "Ce champ est obligatoire",
    validate: "Les plages horaires sont invalides",
  };

  /* Methods */
  function parseTimeSlotIntoDisplayValue(
    value?: TTimeSlot,
  ): ITimeSlotDayFields {
    const slots = value ? Object.keys(value) : [];
    let morningStart;
    let morningEnd;
    let morningSlots;
    let afternoonStart;
    let afternoonEnd;
    let afternoonSlots;
    if (value && slots.length >= 1 && slots.length <= 2) {
      const morning = slots[0] as TSlotString | undefined;
      const afternoon = slots[1] as TSlotString | undefined;
      morningStart = morning?.split("-")[0];
      morningEnd = morning?.split("-")[1];
      morningSlots = morning ? value[morning]?.fixed : undefined;
      afternoonStart = afternoon?.split("-")[0];
      afternoonEnd = afternoon?.split("-")[1];
      afternoonSlots = afternoon ? value[afternoon]?.fixed : undefined;
    }
    return {
      morningStart,
      morningEnd,
      morningSlots,
      afternoonStart,
      afternoonEnd,
      afternoonSlots,
    };
  }

  function parseTimeSlotIntoErrors(
    value?: TTimeSlot,
  ): Array<ITimeSlotDayError> {
    if (!value) return [];
    const {
      morningStart,
      morningEnd,
      morningSlots,
      afternoonStart,
      afternoonEnd,
      afternoonSlots,
    } = parseTimeSlotIntoDisplayValue(value);
    const fieldErrors: Array<ITimeSlotDayError> = [
      {
        fieldNames: ["morningStart"],
        isInvalid: (!!morningEnd || !!morningSlots) && !morningStart,
        message: "L'horaire du matin est incomplet",
      },
      {
        fieldNames: ["morningEnd"],
        isInvalid: (!!morningStart || !!morningSlots) && !morningEnd,
        message: "L'horaire du matin est incomplet",
      },
      {
        fieldNames: ["morningSlots"],
        isInvalid: (!!morningStart || !!morningEnd) && !morningSlots,
        message: "L'horaire du matin nécessite un nombre de créneaux",
      },
      {
        fieldNames: ["afternoonStart", "afternoonEnd", "afternoonSlots"],
        isInvalid:
          !morningStart &&
          !morningEnd &&
          !morningSlots &&
          (!!afternoonStart || !!afternoonStart || !!afternoonSlots),
        message:
          "Si il n'y a pas de pause méridienne, veuillez remplir uniquement l'horaire du matin",
      },
      {
        fieldNames: ["afternoonStart"],
        isInvalid: (!!afternoonEnd || !!afternoonSlots) && !afternoonStart,
        message: "L'horaire d'après-midi est incomplet",
      },
      {
        fieldNames: ["afternoonEnd"],
        isInvalid: (!!afternoonStart || !!afternoonSlots) && !afternoonEnd,
        message: "L'horaire d'après-midi est incomplet",
      },
      {
        fieldNames: ["afternoonSlots"],
        isInvalid: (!!afternoonStart || !!afternoonEnd) && !afternoonSlots,
        message: "L'horaire d'après-midi nécessite un nombre de créneaux",
      },
    ];
    return fieldErrors.filter((error) => error.isInvalid);
  }

  function validateTimeSlotDay(value: TWeeklySlots): boolean | string {
    const errors = weekDays
      .map((day) => parseTimeSlotIntoErrors(value[day.index]))
      .filter(removeNulls);
    const isInvalid = errors.length > 0;
    return !isInvalid || errorMessages.validate;
  }

  function handleChange(
    value: TWeeklySlots,
    timeSlot: TTimeSlot,
    day: IDay,
  ): TWeeklySlots {
    const newSlots = { ...value };
    newSlots[day.index] = timeSlot;
    return newSlots;
  }

  /* Local Data */
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="c-FormWeeklySlots">
      <div className="c-FormWeeklySlots__Infos">
        <label className="c-FormWeeklySlots__Title" htmlFor={name}>
          {title}
          {isRequired && " *"}
        </label>
        <p className="c-FormWeeklySlots__Description">
          <span>{descriptions.format}</span>
          <span>{descriptions.example}</span>
          <span>{descriptions.instructions}</span>
        </p>
      </div>
      <div className="c-FormWeeklySlots__Content">
        <div
          className="c-FormWeeklySlots__Days"
          id={name}
          data-testid="form-weekly-slots"
        >
          <Controller
            control={control}
            name={name}
            rules={{
              required: { value: isRequired, message: errorMessages.required },
              validate: validateTimeSlotDay,
            }}
            defaultValue={defaultValue}
            render={({ field: { onChange, value } }) => {
              return (
                <>
                  {weekDays.map((day, i) => (
                    <TimeSlotDay
                      key={i}
                      idPrefix={name}
                      day={day}
                      value={value?.[day.index]}
                      parseValueIntoFields={parseTimeSlotIntoDisplayValue}
                      onChange={(timeSlot) => {
                        onChange(handleChange(value, timeSlot, day));
                      }}
                      errors={parseTimeSlotIntoErrors(value?.[day.index])}
                      isDisabled={isDisabled}
                    />
                  ))}
                </>
              );
            }}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }: { message: string }) => (
            <CommonFormErrorText message={message} errorId={`${name}_error`} />
          )}
        />
      </div>
    </div>
  );
}
