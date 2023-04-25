import React from "react";
import Switch from "react-switch";

interface ICommonToggleProps {
  onChange: (checked: boolean) => void;
  checked: boolean;
  disabled: boolean;
}
export default function CommonToggle({
  onChange,
  checked,
  disabled,
}: ICommonToggleProps) {
  return (
    <div className="c-CommonToggle">
      <Switch
        onChange={onChange}
        checked={checked}
        checkedIcon={false}
        uncheckedIcon={false}
        disabled={disabled}
        onColor="#3cc13b"
        offColor="#030F40"
        height={20}
        width={40}
      />
    </div>
  );
}
