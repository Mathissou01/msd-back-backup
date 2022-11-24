import React from "react";
import "./form-label.scss";

interface IFormLabelProps {
  label: string;
  secondaryLabel?: string;
  forId?: string;
  tagType?: "label" | "legend";
  isRequired?: boolean;
}

export default function FormLabel({
  label,
  secondaryLabel,
  forId,
  tagType = "label",
  isRequired = false,
}: IFormLabelProps) {
  const Tag = tagType;

  return (
    <Tag className="c-FormLabel" htmlFor={forId}>
      <span>{`${label} ${isRequired ? "*" : ""}`}</span>
      <span className="c-FormLabel__Secondary">{secondaryLabel}</span>
    </Tag>
  );
}
