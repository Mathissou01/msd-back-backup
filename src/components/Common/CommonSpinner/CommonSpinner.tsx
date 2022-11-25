import React from "react";
import "./common-spinner.scss";

interface ICommonSpinnerProps {
  isCover?: boolean;
}

export default function CommonSpinner({
  isCover = false,
}: ICommonSpinnerProps) {
  return (
    <div
      className={`c-CommonSpinner__Wrapper ${
        isCover ? "c-CommonSpinner__Wrapper_cover" : ""
      }`}
    >
      <div className="c-CommonSpinner" data-testid="common-spinner">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
