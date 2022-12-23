import React from "react";
import "./form-label.scss";

interface IFormLabelProps {
  label: string;
  secondaryLabel?: string;
  validationLabel?: string;
  forId?: string;
  tagType?: "label" | "legend";
  isRequired?: boolean;
}

export default function FormLabel({
  label,
  secondaryLabel,
  validationLabel,
  forId,
  tagType = "label",
  isRequired = false,
}: IFormLabelProps) {
  const Tag = tagType;

  return (
    <Tag className="c-FormLabel" htmlFor={forId}>
      <div className="c-FormLabel__Label">
        <span>{`${label}${isRequired ? " *" : ""}`}</span>
        {validationLabel && (
          <span className="c-FormLabel__Validation">{validationLabel}</span>
        )}
      </div>
      {secondaryLabel && (
        <div className="c-FormLabel__Label">
          <span className="c-FormLabel__Secondary">{secondaryLabel}</span>
        </div>
      )}
    </Tag>
  );
}
