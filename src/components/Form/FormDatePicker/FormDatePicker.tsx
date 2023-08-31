import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";
import classNames from "classnames";
import FormLabel from "../FormLabel/FormLabel";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import "react-datepicker/dist/react-datepicker.css";
import "./form-date-picker.scss";

interface IDatePickerProps {
  name: string;
  minDate: Date;
  maxDate?: Date;
  endDate?: Date;
  label?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  selectsRange?: boolean;
  onChange?: () => void;
}

export default function FormDatePicker({
  name,
  maxDate,
  minDate,
  label,
  onChange,
  isDisabled = false,
  isRequired = false,
  selectsRange = false,
}: IDatePickerProps) {
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <>
      <FormLabel forId={name} label={label}>
        <Controller
          control={control}
          name={name}
          rules={{
            required: {
              value: isRequired,
              message: errorMessages.required,
            },
          }}
          render={({ field: { onChange: onChangeField, value } }) => {
            return (
              <div
                className={classNames("c-CommonDatePicker", {
                  "c-CommonDatePicker react-datepicker__input-container_isOpen":
                    isCalendarOpen,
                  "c-CommonDatePicker react-datepicker__input-container":
                    !isCalendarOpen,
                })}
              >
                <DatePicker
                  selected={
                    value ? (selectsRange ? value[0] : new Date(value)) : null
                  }
                  onChange={(value) => {
                    onChangeField(value);
                    if (onChange) {
                      onChange();
                    }
                  }}
                  minDate={minDate}
                  maxDate={maxDate}
                  dateFormat="dd-MM-yyyy"
                  locale={fr}
                  onCalendarOpen={toggleCalendar}
                  onCalendarClose={toggleCalendar}
                  startDate={selectsRange ? value && value[0] : null}
                  endDate={selectsRange ? value && value[1] : null}
                  selectsRange={selectsRange}
                  disabled={isDisabled}
                />
              </div>
            );
          }}
        />
      </FormLabel>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }: { message: string }) => (
          <CommonFormErrorText message={message} errorId={`${name}_error`} />
        )}
      />
    </>
  );
}
