import React from "react";
import "./common-button.scss";

interface ICommonButtonProps {
  label: string;
  style?: "primary" | "secondary" | "tertiary" | null;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
  onClick?: () => void;
  formLabelId?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

export default function CommonButton({
  label,
  style = "secondary",
  type = "button",
  isDisabled = false,
  onClick,
  formLabelId,
  buttonRef,
}: ICommonButtonProps) {
  return (
    <button
      className={`c-CommonButton ${style ? "c-CommonButton_" + style : ""}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      id={formLabelId}
      ref={buttonRef}
    >
      {label}
    </button>
  );
}
