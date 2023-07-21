import React from "react";
import DatePicker from "react-datepicker";
import { TimeInput } from "../TimeInput/TimeInput";

interface ITimeDatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  minTime: Date;
  maxTime: Date;
}

export const TimeDatePicker = ({
  selected,
  onChange,
}: ITimeDatePickerProps) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={1}
      timeFormat="HH:mm"
      locale="fr"
      dateFormat="HH:mm"
      isClearable={true}
      customInput={<TimeInput />}
    />
  );
};
