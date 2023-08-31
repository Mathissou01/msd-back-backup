import React, { forwardRef, ForwardedRef } from "react";
import "./time-input.scss";
import classNames from "classnames";

interface ITimeInputProps {
  id?: string;
  value?: string | null;
  onClick?: () => void;
  isDisabled?: boolean;
}

export default forwardRef<HTMLInputElement, ITimeInputProps>(function TimeInput(
  { id, value, onClick, isDisabled = false }: ITimeInputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  let displayValue = "";
  if (value) {
    const [hours, minutes] = value.split(":");
    displayValue = `${hours}:${minutes}`;
  }
  const classes = classNames("c-TimeInput", {
    "c-TimeInput_disabled": isDisabled,
  });

  return (
    <input
      ref={ref}
      id={id}
      data-testid={id}
      className={classes}
      onClick={onClick}
      value={displayValue}
      readOnly
      disabled={isDisabled}
    />
  );
});
