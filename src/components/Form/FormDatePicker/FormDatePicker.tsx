import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./form-date-picker.scss";
import { fr } from "date-fns/locale";
import classNames from "classnames";
import { useState } from "react";
import FormLabel from "../FormLabel/FormLabel";
import { ErrorMessage } from "@hookform/error-message";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";

interface IDatePickerProps {
  name: string;
  minDate: Date;
  maxDate?: Date;
  endDate?: Date;
  label: string;
  isRequired?: boolean;
}

export default function FormDatePicker({
  name,
  maxDate,
  minDate,
  label,
  isRequired = false,
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
          render={({ field: { onChange, value } }) => {
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
                  selected={value && new Date(value)}
                  onChange={onChange}
                  minDate={minDate}
                  maxDate={maxDate}
                  dateFormat="dd-MM-yyyy"
                  locale={fr}
                  onCalendarOpen={toggleCalendar}
                  onCalendarClose={toggleCalendar}
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
          <CommonErrorText message={message} errorId={`${name}_error`} />
        )}
      />
    </>
  );
}
