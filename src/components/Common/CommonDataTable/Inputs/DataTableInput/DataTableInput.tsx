import React, { ForwardedRef, forwardRef } from "react";
import "./data-table-input.scss";

interface IDataTableInputProps {
  isEditState: boolean;
  data: string | number;
  maxLengthValidation?: number;
}

export default forwardRef(function DataTableInput(
  { isEditState, data, maxLengthValidation }: IDataTableInputProps,
  parentRef: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="c-DataTableInput">
      {isEditState ? (
        <input
          ref={parentRef}
          className="c-DataTableInput__Input"
          maxLength={maxLengthValidation}
          defaultValue={data}
        ></input>
      ) : (
        <span>{data}</span>
      )}
    </div>
  );
});
