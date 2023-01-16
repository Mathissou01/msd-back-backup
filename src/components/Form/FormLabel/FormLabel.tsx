import React from "react";
import "./form-label.scss";
import classNames from "classnames";

export type LabelStyle = "default" | "table";

export type ValidationStyle = "inline" | "multiline";

interface IFormLabelProps {
  children?: React.ReactNode;
  label: string;
  secondaryLabel?: string;
  validationLabel?: string;
  forId?: string;
  tagType?: "label" | "legend";
  isRequired?: boolean;
  flexStyle?: "column" | "row";
  labelStyle?: LabelStyle;
  validationStyle?: ValidationStyle;
}

export default function FormLabel({
  children,
  label,
  secondaryLabel,
  validationLabel,
  forId,
  tagType = "label",
  isRequired = false,
  flexStyle = "column",
  labelStyle = "default",
  validationStyle = "inline",
}: IFormLabelProps) {
  const Tag = tagType;
  const labelClassNames = classNames("c-FormLabel", {
    "c-FormLabel_row": flexStyle === "row",
    "c-FormLabel_styleTable": labelStyle === "table",
  });

  return (
    <Tag className={labelClassNames} htmlFor={forId}>
      <div className="c-FormLabel__Label">
        <span>{`${label}${isRequired ? " *" : ""}`}</span>
        {validationStyle === "inline" &&
          flexStyle === "column" &&
          validationLabel && (
            <span className="c-FormLabel__Validation">{validationLabel}</span>
          )}
      </div>
      {validationStyle === "multiline" &&
        flexStyle === "column" &&
        validationLabel && (
          <span className="c-FormLabel__Validation c-FormLabel__Validation_left">
            {validationLabel}
          </span>
        )}
      {secondaryLabel && (
        <div className="c-FormLabel__Label">
          <span className="c-FormLabel__Secondary">{secondaryLabel}</span>
        </div>
      )}
      {children && <div className="c-FormLabel__Content">{children}</div>}
      {flexStyle === "row" && (
        <div className="c-FormLabel__Label">
          {validationLabel && (
            <span className="c-FormLabel__Validation">{validationLabel}</span>
          )}
        </div>
      )}
    </Tag>
  );
}
