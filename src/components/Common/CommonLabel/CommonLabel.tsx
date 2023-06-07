import React from "react";
import "./common-label.scss";

interface ICommonLabelProps {
  text: string | undefined;
}

export default function CommonLabel({ text }: ICommonLabelProps) {
  return <span className="c-CommonLabel">{text}</span>;
}
