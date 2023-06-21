import React from "react";
import "./common-form-error-text.scss";

interface ICommonFormErrorTextProps {
  message: string;
  errorId: string;
}

export default function CommonFormErrorText({
  message,
  errorId,
}: ICommonFormErrorTextProps) {
  return (
    <em className="c-CommonFormErrorText" role="alert" id={errorId}>
      {message}
    </em>
  );
}
