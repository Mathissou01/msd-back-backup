import { SzDatePicker } from "@suezenv/react-theme-components";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePickerProps {
  name: string;
  startMinDate: Date;
  maxDate?: Date;
}

export default function CommonDatePicker({
  name,
  startMinDate,
  maxDate,
}: IDatePickerProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <SzDatePicker
            startDate={value && new Date(value)}
            onChangeStartDate={onChange}
            startMinDate={startMinDate}
            maxDate={maxDate}
          ></SzDatePicker>
        );
      }}
    />
  );
}
