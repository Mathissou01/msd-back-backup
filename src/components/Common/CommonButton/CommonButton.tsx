import classNames from "classnames";
import React from "react";
import { TAllPictoStyles } from "../../../lib/pictos";
import "./common-button.scss";

interface ICommonButtonProps {
  label?: string;
  type?: "button" | "submit" | "reset" | undefined;
  picto?: TAllPictoStyles;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  formLabelId?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  style?: "primary" | "secondary" | null;
  fontStyle?: "fontSmall" | "fontLarge";
  paddingStyle?: "paddingSmall" | "paddingLarge" | "paddingMedium";
}

export default function CommonButton({
  label,
  picto,
  type = "button",
  isDisabled = false,
  onClick,
  formLabelId,
  buttonRef,
  style = "secondary",
  fontStyle = "fontSmall",
  paddingStyle,
}: ICommonButtonProps) {
  const buttonClassNames = classNames("c-CommonButton", {
    "c-CommonButton_disabled": isDisabled,
    [`c-CommonButton_${style}`]: style,
    [`c-CommonButton_${fontStyle}`]: fontStyle,
    [`c-CommonButton_${paddingStyle}`]: paddingStyle,
  });
  const pictoClassNames = classNames("c-CommonButton__Picto", {
    [`c-CommonButton__Picto_${picto}`]: picto,
  });

  return (
    <button
      className={buttonClassNames}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      id={formLabelId}
      ref={buttonRef}
    >
      {picto && <div className={pictoClassNames} />}
      {label}
    </button>
  );
}
