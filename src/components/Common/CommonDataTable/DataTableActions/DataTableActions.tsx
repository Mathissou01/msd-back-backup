import classNames from "classnames";
import React from "react";
import Image from "next/image";
import "./data-table-actions.scss";

interface IDataTableActionsProps {
  hasEditAction?: boolean;
  hasDuplicateAction?: boolean;
  hasDeleteAction?: boolean;
  deleteVisibleCondition?: boolean;
  onEdit?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  isConfirmState?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export default function DataTableActions({
  hasEditAction = true,
  hasDuplicateAction = true,
  hasDeleteAction = true,
  deleteVisibleCondition,
  onEdit,
  onDuplicate,
  onDelete,
  isConfirmState = false,
  onConfirm,
  onCancel,
}: IDataTableActionsProps) {
  const dynamicClassNames = classNames("c-DataTableActions", {
    "c-DataTableActions_edit": isConfirmState,
  });

  return (
    <div className={dynamicClassNames}>
      <div className="c-DataTableActions__Actions">
        {hasEditAction && (
          <button
            className={classNames("c-DataTableActions__Button")}
            type="button"
            onClick={onEdit}
          >
            <Image
              src={"/images/pictos/edit.svg"}
              alt={""}
              width={16}
              height={16}
            />
          </button>
        )}
        {hasDuplicateAction && (
          <button
            className={classNames("c-DataTableActions__Button")}
            type="button"
            onClick={onDuplicate}
          >
            <Image
              src={"/images/pictos/duplicate.svg"}
              alt={""}
              width={16}
              height={16}
            />
          </button>
        )}
        {hasDeleteAction && (
          <button
            className={classNames("c-DataTableActions__Button", {
              "c-DataTableActions__Button_disabled": !deleteVisibleCondition,
            })}
            type="button"
            onClick={onDelete}
          >
            <Image
              src={"/images/pictos/delete.svg"}
              alt={""}
              width={16}
              height={16}
            />
          </button>
        )}
      </div>
      <div className="c-DataTableActions__EditActions">
        <button
          className={classNames("c-DataTableActions__Button")}
          type="button"
          onClick={onConfirm}
        >
          <Image
            src={"/images/pictos/yes.svg"}
            alt={""}
            width={16}
            height={16}
          />
        </button>
        <button
          className={classNames("c-DataTableActions__Button")}
          type="button"
          onClick={onCancel}
        >
          <Image
            src={"/images/pictos/no.svg"}
            alt={""}
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}
