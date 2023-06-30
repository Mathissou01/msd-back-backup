import React from "react";
import fr from "date-fns/locale/fr";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import { CustomTimeDatePicker } from "./TimeDatePicker/TimeDatePicker";
import "./form-opening-hours.scss";

registerLocale("fr", fr);

interface IOpeningHourBlock {
  __typename: "ComponentBlocksOpeningDay";
  weekDay: string;
  morningStart: string | null;
  morningEnd: string | null;
  afterNoonStart: string | null;
  afterNoonEnd: string | null;
}

export const FormOpeningHours: React.FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  /* Static Data */
  const title = "Horaires d’ouverture";
  const shortDescription = `Format attendu : 00h00
Exemple : 08h00 - 12h00
14h00 - 17h00 Laisser vides les jours fermés. S’il n’y a pas de pause méridienne, veuillez remplir uniquement les deux premières cases.`;

  const weekdays = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

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

  const validateOpeningHours = (value: IOpeningHourBlock[]) => {
    for (let i = 0; i < value.length; i++) {
      const block = value[i];

      if (block.morningStart && !block.morningEnd) {
        return `Dans la matinée du ${block.weekDay}, l'heure de fin est manquante.`;
      }

      if (!block.morningStart && block.morningEnd) {
        return `Dans la matinée du ${block.weekDay}, l'heure de début est manquante.`;
      }

      if (block.afterNoonStart && !block.afterNoonEnd) {
        return `Dans l'après-midi du ${block.weekDay}, l'heure de fin est manquante.`;
      }

      if (!block.afterNoonStart && block.afterNoonEnd) {
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

      const afternoonStart = timeStrToDate(block.afterNoonStart);
      const afternoonEnd = timeStrToDate(block.afterNoonEnd);
      if (
        block.afterNoonStart &&
        block.afterNoonEnd &&
        afternoonStart &&
        afternoonEnd &&
        afternoonStart >= afternoonEnd
      ) {
        return `Dans l'après-midi du ${block.weekDay}, l'heure de fin doit être après l'heure de début.`;
      }
    }
    return true;
  };

  const defaultOpeningHours = weekdays.map((day) => ({
    __typename: "ComponentBlocksOpeningDay",
    weekDay: day,
    morningStart: null,
    morningEnd: null,
    afterNoonStart: null,
    afterNoonEnd: null,
  }));

  const dayStart = new Date();
  dayStart.setHours(0, 0);
  const morningEnd = new Date();
  morningEnd.setHours(12, 0);
  const afternoonStart = new Date();
  afternoonStart.setHours(12, 0);
  const dayEnd = new Date();
  dayEnd.setHours(23, 59);

  return (
    <div className="c-FormOpeningHours">
      <h3 className="c-FormOpeningHours__Title">{title}</h3>
      <span className="c-FormOpeningHours__Description">
        {shortDescription}
      </span>
      <Controller
        name="openingHoursBlocks"
        control={control}
        rules={{
          validate: validateOpeningHours,
        }}
        defaultValue={defaultOpeningHours}
        render={({ field: { value, onChange } }) => (
          <div>
            {weekdays.map((weekday, i) => {
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
                  afterNoonStart: null,
                  afterNoonEnd: null,
                };
                value.push(block);
              }

              return (
                <div className="c-FormOpeningHours__Container" key={i}>
                  <label
                    className="c-FormOpeningHours__Label"
                    htmlFor="appt-time"
                  >
                    {weekday}
                  </label>
                  <div className="c-FormOpeningHours__TimeBlock">
                    <div className="c-FormOpeningHours__TimeSection">
                      <div className="c-FormOpeningHours__DatepickerWrapper">
                        <CustomTimeDatePicker
                          selected={timeStrToDate(block.morningStart)}
                          onChange={(date) => {
                            const updatedBlocks = [...value];
                            updatedBlocks[blockIndex].morningStart =
                              dateToTimeStr(date);
                            onChange(updatedBlocks);
                          }}
                          minTime={dayStart}
                          maxTime={morningEnd}
                        />
                        <div className="c-FormOpeningHours__Dash"></div>

                        <CustomTimeDatePicker
                          selected={timeStrToDate(block.morningEnd)}
                          onChange={(date) => {
                            const updatedBlocks = [...value];
                            updatedBlocks[blockIndex].morningEnd =
                              dateToTimeStr(date);
                            onChange(updatedBlocks);
                          }}
                          minTime={dayStart}
                          maxTime={morningEnd}
                        />
                      </div>
                    </div>
                    <div className="c-FormOpeningHours__DatepickerWrapper">
                      <CustomTimeDatePicker
                        selected={timeStrToDate(block.afterNoonStart)}
                        onChange={(date) => {
                          const updatedBlocks = [...value];
                          updatedBlocks[blockIndex].afterNoonStart =
                            dateToTimeStr(date);
                          onChange(updatedBlocks);
                        }}
                        minTime={afternoonStart}
                        maxTime={dayEnd}
                      />
                      <div className="c-FormOpeningHours__Dash"></div>

                      <CustomTimeDatePicker
                        selected={timeStrToDate(block.afterNoonEnd)}
                        onChange={(date) => {
                          const updatedBlocks = [...value];
                          updatedBlocks[blockIndex].afterNoonEnd =
                            dateToTimeStr(date);
                          onChange(updatedBlocks);
                        }}
                        minTime={afternoonStart}
                        maxTime={dayEnd}
                      />
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
        name="openingHoursBlocks"
        render={({ message }: { message: string }) => (
          <CommonFormErrorText
            message={message}
            errorId={`openingHoursBlocks_error`}
          />
        )}
      />
    </div>
  );
};

export default FormOpeningHours;
