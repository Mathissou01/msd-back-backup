import React, { forwardRef, ForwardedRef } from "react";
import "./time-input.scss";

interface TimeInputProps {
  value?: string | null;
  onClick?: () => void;
}

function TimeInputFunc(
  { value, onClick }: TimeInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  let displayValue = "";
  if (value) {
    const [hours, minutes] = value.split(":");
    displayValue = `${hours}:${minutes}`;
  }
  return (
    <input
      onClick={onClick}
      value={displayValue}
      readOnly
      ref={ref}
      className="c-TimeInput"
    />
  );
}

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  TimeInputFunc,
);

TimeInput.displayName = "TimeInput";
