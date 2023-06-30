import React from "react";
import DatePicker from "react-datepicker";
import { TimeInput } from "../TimeInput/TimeInput";

interface CustomTimeDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  minTime: Date;
  maxTime: Date;
}

export const CustomTimeDatePicker: React.FC<CustomTimeDatePickerProps> = ({
  selected,
  onChange,
  minTime,
  maxTime,
}) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeFormat="HH:mm"
      locale="fr"
      dateFormat="HH:mm"
      minTime={minTime}
      maxTime={maxTime}
      isClearable={true}
      customInput={<TimeInput />}
    />
  );
};
