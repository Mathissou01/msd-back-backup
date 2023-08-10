import React from "react";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TWeekDayName, weekDays } from "../../../lib/time";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import TimeDatePicker from "./TimeDatePicker/TimeDatePicker";
import "./form-opening-hours.scss";

registerLocale("fr", fr);

const defaultOpeningHours: Array<IOpeningHourBlock> = weekDays.map((day) => ({
  __typename: "ComponentBlocksOpeningDay",
  weekDay: day.name,
  morningStart: null,
  morningEnd: null,
  afternoonStart: null,
  afternoonEnd: null,
}));

type TOpeningHoursDateFields =
  | "morningStart"
  | "morningEnd"
  | "afternoonStart"
  | "afternoonEnd";

export interface IOpeningHourBlock {
  __typename: "ComponentBlocksOpeningDay";
  weekDay: TWeekDayName;
  morningStart: string | null;
  morningEnd: string | null;
  morningSlots?: number;
  afternoonStart: string | null;
  afternoonEnd: string | null;
  afternoonSlots?: number;
}

interface IFormOpeningHoursProps {
  name: string;
  defaultValue?: Array<IOpeningHourBlock>;
  titleLabel?: string;
}

export default function FormOpeningHours({
  name,
  defaultValue = defaultOpeningHours,
  titleLabel,
}: IFormOpeningHoursProps) {
  /* Static Data */
  const title = titleLabel ?? "Horaires d’ouverture";
  const descriptions = {
    format: `Format attendu : 00h00`,
    example: `Exemple : 08h00 - 12h00   14h00 - 17h00`,
    instructions: `Laisser vides les jours fermés. S’il n’y a pas de pause méridienne, veuillez remplir uniquement les deux premières cases.`,
  };
  const minMorning = new Date();
  minMorning.setHours(0, 0);
  const maxMorning = new Date();
  maxMorning.setHours(12, 0);
  const minAfternoon = new Date();
  minAfternoon.setHours(12, 0);
  const maxAfternoon = new Date();
  maxAfternoon.setHours(23, 59);

  /* Methods */
  const timeStrToDate = (timeStr: string | null): Date | null => {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(":");
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    return date;
  };

  const dateToTimeStr = (date: Date | null): string | null => {
    if (!date) return null;
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  const validateWeeklyHours = (value: IOpeningHourBlock[]) => {
    for (let i = 0; i < value.length; i++) {
      const block = value[i];

      if (block.morningStart && !block.morningEnd) {
        return `Dans la matinée du ${block.weekDay}, l'heure de fin est manquante.`;
      }
      if (!block.morningStart && block.morningEnd) {
        return `Dans la matinée du ${block.weekDay}, l'heure de début est manquante.`;
      }
      if (block.afternoonStart && !block.afternoonEnd) {
        return `Dans l'après-midi du ${block.weekDay}, l'heure de fin est manquante.`;
      }
      if (!block.afternoonStart && block.afternoonEnd) {
        return `Dans l'après-midi du ${block.weekDay}, l'heure de début est manquante.`;
      }

      const morningStart = timeStrToDate(block.morningStart);
      const morningEnd = timeStrToDate(block.morningEnd);
      if (
        block.morningStart &&
        block.morningEnd &&
        morningStart &&
        morningEnd &&
        morningStart >= morningEnd
      ) {
        return `Dans la matinée du ${block.weekDay}, l'heure de fin doit être après l'heure de début.`;
      }
      const afternoonStart = timeStrToDate(block.afternoonStart);
      const afternoonEnd = timeStrToDate(block.afternoonEnd);
      if (
        block.afternoonStart &&
        block.afternoonEnd &&
        afternoonStart &&
        afternoonEnd &&
        afternoonStart >= afternoonEnd
      ) {
        return `Dans l'après-midi du ${block.weekDay}, l'heure de fin doit être après l'heure de début.`;
      }
      if (
        block.morningEnd &&
        block.afternoonStart &&
        morningEnd &&
        afternoonStart &&
        morningEnd > afternoonStart
      ) {
        return `Dans le ${block.weekDay}, l'heure de début de l'après-midi doit être après la fin de la matinée.`;
      }
    }
    return true;
  };

  function getBlock(value: FieldValues, weekday: TWeekDayName) {
    const blockIndex = value.findIndex(
      (block: IOpeningHourBlock) => block.weekDay === weekday,
    );
    let block: IOpeningHourBlock;
    if (blockIndex >= 0) {
      block = value[blockIndex];
    } else {
      block = {
        __typename: "ComponentBlocksOpeningDay",
        weekDay: weekday,
        morningStart: null,
        morningEnd: null,
        afternoonStart: null,
        afternoonEnd: null,
      };
      value.push(block);
    }
    return { blockIndex, block };
  }

  function updateBlockDate(
    index: number,
    fieldName: TOpeningHoursDateFields,
    newValue: Date | null,
  ): Array<IOpeningHourBlock> {
    const updatedBlocks: Array<IOpeningHourBlock> = [...getValues(name)];
    updatedBlocks[index][fieldName] = dateToTimeStr(newValue);
    return updatedBlocks;
  }

  /* Local Data */
  const {
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  return (
    <div className="c-FormOpeningHours">
      <div className="c-FormOpeningHours__Infos">
        <div className="c-FormOpeningHours__Title">{title}</div>
        <p className="c-FormOpeningHours__Description">
          <span>{descriptions.format}</span>
          <span>{descriptions.example}</span>
          <span>{descriptions.instructions}</span>
        </p>
      </div>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: validateWeeklyHours,
        }}
        defaultValue={defaultValue}
        render={({ field: { value, onChange } }) => (
          <div className="c-FormOpeningHours__Hours">
            {weekDays.map((weekday, i) => {
              const { blockIndex, block } = getBlock(value, weekday.name);
              return (
                <div className="c-FormOpeningHours__Line" key={i}>
                  <label
                    className="c-FormOpeningHours__LineLabel"
                    htmlFor={`${weekday}-0`}
                  >
                    {weekday.name}
                  </label>
                  <div className="c-FormOpeningHours__TimeBlock">
                    <div className="c-FormOpeningHours__TimeSection">
                      <div className="c-FormOpeningHours__DatepickerWrapper">
                        <TimeDatePicker
                          id={`${weekday}-morningStart`}
                          selected={timeStrToDate(block.morningStart)}
                          onChange={(date) => {
                            onChange(
                              updateBlockDate(blockIndex, "morningStart", date),
                            );
                          }}
                          minTime={minMorning}
                          maxTime={maxMorning}
                        />
                        <div className="c-FormOpeningHours__Dash" />
                        <TimeDatePicker
                          id={`${weekday}-morningEnd`}
                          selected={timeStrToDate(block.morningEnd)}
                          onChange={(date) => {
                            onChange(
                              updateBlockDate(blockIndex, "morningEnd", date),
                            );
                          }}
                          minTime={minMorning}
                          maxTime={maxMorning}
                        />
                      </div>
                    </div>
                    <div className="c-FormOpeningHours__TimeSection">
                      <div className="c-FormOpeningHours__DatepickerWrapper">
                        <TimeDatePicker
                          id={`${weekday}-afternoonStart`}
                          selected={timeStrToDate(block.afternoonStart)}
                          onChange={(date) => {
                            onChange(
                              updateBlockDate(
                                blockIndex,
                                "afternoonStart",
                                date,
                              ),
                            );
                          }}
                          minTime={minAfternoon}
                          maxTime={maxAfternoon}
                        />
                        <div className="c-FormOpeningHours__Dash" />
                        <TimeDatePicker
                          id={`${weekday}-afternoonEnd`}
                          selected={timeStrToDate(block.afternoonEnd)}
                          onChange={(date) => {
                            onChange(
                              updateBlockDate(blockIndex, "afternoonEnd", date),
                            );
                          }}
                          minTime={minAfternoon}
                          maxTime={maxAfternoon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }: { message: string }) => (
          <CommonFormErrorText message={message} errorId={`${name}_error`} />
        )}
      />
    </div>
  );
}
