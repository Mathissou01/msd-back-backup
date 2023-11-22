import classNames from "classnames";
import React, { ChangeEvent, useState } from "react";
import "./common-input.scss";

export interface ICommonInputProps {
  id?: string;
  type: "text" | "number" | "search";
  value: string;
  defaultValue?: string;
  refCallBack?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
  hasAutoComplete?: "on" | "off";
  dataTestid?: string;
  onChange: (value: string) => void;
  onChangeDelayed?: (value: string) => void;
  changeDelay?: number;
}

export default function CommonInput({
  id,
  type,
  value = "",
  defaultValue,
  refCallBack,
  placeholder,
  isInvalid,
  isDisabled,
  hasAutoComplete = "off",
  dataTestid,
  onChange,
  onChangeDelayed,
  changeDelay = 0,
}: ICommonInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    if (newValue !== value) {
      onChange(newValue);
      if (onChangeDelayed) {
        clearTimeout(timer);
        const newTimer = setTimeout(() => {
          onChangeDelayed(newValue);
        }, changeDelay);
        setTimer(newTimer);
      }
    }
  }

  const [timer, setTimer] = useState<NodeJS.Timeout>();

  return (
    <input
      className={classNames("c-CommonInput", {
        "c-CommonInput_invalid": isInvalid,
      })}
      id={id}
      type={type}
      value={value}
      defaultValue={defaultValue}
      ref={refCallBack}
      placeholder={placeholder}
      disabled={isDisabled}
      autoComplete={hasAutoComplete}
      aria-invalid={isInvalid}
      aria-errormessage={`${id}_error`}
      data-testid={dataTestid}
      onChange={handleChange}
    />
  );
}
