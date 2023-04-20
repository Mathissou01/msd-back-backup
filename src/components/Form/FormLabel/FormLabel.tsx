import classNames from "classnames";
import React from "react";
import "./form-label.scss";

export type LabelStyle = "default" | "table";

export type ValidationStyle = "inline" | "multiline";

interface IFormLabelProps {
  children?: React.ReactNode;
  label?: string;
  labelDescription?: string;
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
  labelDescription,
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
    <div className={labelClassNames}>
      <Tag className="c-FormLabel__LabelWrapper" htmlFor={forId}>
        <span className="c-FormLabel__Label">
          {`${label}${isRequired ? " *" : ""}`}
          {labelDescription && (
            <span className="c-FormLabel__LabelDescription">
              {labelDescription}
            </span>
          )}
        </span>
        {validationStyle === "inline" &&
          flexStyle === "column" &&
          validationLabel && (
            <span className="c-FormLabel__Validation">{validationLabel}</span>
          )}
      </Tag>
      {validationStyle === "multiline" &&
        flexStyle === "column" &&
        validationLabel && (
          <span className="c-FormLabel__Validation c-FormLabel__Validation_left">
            {validationLabel}
          </span>
        )}
      {secondaryLabel && (
        <Tag className="c-FormLabel__LabelWrapper" htmlFor={forId}>
          <span className="c-FormLabel__Secondary">{secondaryLabel}</span>
        </Tag>
      )}
      {children && <div className="c-FormLabel__Content">{children}</div>}
      {flexStyle === "row" && (
        <Tag className="c-FormLabel__LabelWrapper" htmlFor={forId}>
          {validationLabel && (
            <span className="c-FormLabel__Validation">{validationLabel}</span>
          )}
        </Tag>
      )}
    </div>
  );
}
