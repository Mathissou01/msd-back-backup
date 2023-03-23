import React, { ForwardedRef, forwardRef } from "react";
import "./data-table-text-area.scss";

interface IDataTableTextAreaProps {
  isEditState: boolean;
  data: string | number;
  maxLengthValidation?: number;
}

export default forwardRef(function DataTableTextArea(
  { isEditState, data, maxLengthValidation }: IDataTableTextAreaProps,
  parentRef: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <div className="c-DataTableTextArea">
      {isEditState ? (
        <textarea
          ref={parentRef}
          className="c-DataTableTextArea__Input"
          maxLength={maxLengthValidation}
          defaultValue={data}
        ></textarea>
      ) : (
        <span>{data}</span>
      )}
    </div>
  );
});
