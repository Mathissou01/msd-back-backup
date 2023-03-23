import React from "react";
import "./common-error-text.scss";

interface ICommonErrorTextProps {
  message: string;
  errorId: string;
}

export default function CommonErrorText({
  message,
  errorId,
}: ICommonErrorTextProps) {
  return (
    <em className="c-CommonErrorMessage" role="alert" id={errorId}>
      {message}
    </em>
  );
}
