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
        // TODO: NO, should use declared CSS variables and not the raw hex string.
        //  Will need to extract some/all color SASS variables as CSS variables so they are available in JS,
        //  then getComputedStyle(document.documentElement).getPropertyValue("--my-variable")
        onColor="#3cc13b"
        offColor="#030F40"
        height={20}
        width={40}
      />
    </div>
  );
}
