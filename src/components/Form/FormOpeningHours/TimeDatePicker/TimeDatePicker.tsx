import React from "react";
import DatePicker from "react-datepicker";
import TimeInput from "./TimeInput/TimeInput";

interface ITimeDatePickerProps {
  id?: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  timeInterval?: number;
  minTime?: Date;
  maxTime?: Date;
  isDisabled?: boolean;
}

export default function TimeDatePicker({
  id,
  selected,
  onChange,
  timeInterval = 1,
  minTime,
  maxTime,
  isDisabled = false,
}: ITimeDatePickerProps) {
  return (
    <DatePicker
      id={id}
      selected={selected}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={timeInterval}
      timeFormat="HH:mm"
      dateFormat="HH:mm"
      minTime={minTime}
      maxTime={maxTime}
      locale="fr"
      customInput={<TimeInput id={id} isDisabled={isDisabled} />}
      isClearable={!isDisabled}
      disabled={isDisabled}
    />
  );
}
