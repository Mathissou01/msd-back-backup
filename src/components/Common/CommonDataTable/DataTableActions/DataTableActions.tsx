import classNames from "classnames";
import React, { useState } from "react";
import Image from "next/image";
import "./data-table-actions.scss";
import { ICommonDataTableValidation } from "../../../../lib/common-data-table";
import Link from "next/link";

export interface IConfirmStateOptions {
  onConfirm: () => void;
  onConfirmValidation?: () => ICommonDataTableValidation;
  onCancel?: () => void;
  onCancelValidation?: () => ICommonDataTableValidation;
  confirmStyle?: "warning";
}

export interface IDataTableAction {
  id: string;
  picto: string;
  onClick?: () => void;
  href?: string;
  isDisabled?: boolean;
  confirmStateOptions?: IConfirmStateOptions;
}

interface IDataTableActionsProps {
  actions: Array<IDataTableAction>;
}

export default function DataTableActions({ actions }: IDataTableActionsProps) {
  /* Methods */
  function handleClick(action: IDataTableAction) {
    if (action.confirmStateOptions) {
      setConfirmState(true);
      setCurrentAction(action.confirmStateOptions);
    }
    action.onClick?.();
  }

  function handleConfirm(isConfirmed: boolean) {
    const validation = isConfirmed
      ? currentAction?.onConfirmValidation?.()
      : currentAction?.onCancelValidation?.();
    if (
      typeof validation === "undefined" ||
      (typeof validation !== "undefined" && validation.isValid)
    ) {
      isConfirmed ? currentAction?.onConfirm() : currentAction?.onCancel?.();
      setCurrentAction(null);
      setConfirmState(false);
    } else {
      // TODO: what to do with validation error message ?
      console.log(validation?.errorMessage);
    }
  }

  /* Local Data */
  const [isConfirmState, setConfirmState] = useState<boolean>(false);
  const [currentAction, setCurrentAction] =
    useState<IConfirmStateOptions | null>(null);
  const dynamicClassNames = classNames("c-DataTableActions", {
    "c-DataTableActions_confirm": isConfirmState,
    [`c-DataTableActions_${currentAction?.confirmStyle}`]:
      currentAction?.confirmStyle && isConfirmState,
  });

  return (
    <div className={dynamicClassNames}>
      <div className="c-DataTableActions__Actions">
        {actions.map((action, index) =>
          action.href ? (
            <Link
              key={`${action.id}_${index}`}
              className={classNames("c-DataTableActions__Button", {
                "c-DataTableActions__Button_disabled": action.isDisabled,
              })}
              href={action.href}
              onClick={() => handleClick(action)}
            >
              <Image src={action.picto} alt={""} width={16} height={16} />
            </Link>
          ) : (
            <button
              key={`${action.id}_${index}`}
              className={classNames("c-DataTableActions__Button", {
                "c-DataTableActions__Button_disabled": action.isDisabled,
              })}
              type="button"
              onClick={() => handleClick(action)}
            >
              <Image src={action.picto} alt={""} width={16} height={16} />
            </button>
          ),
        )}
      </div>
      {currentAction && (
        <div className="c-DataTableActions__EditActions">
          <button
            className="c-DataTableActions__Button"
            type="button"
            onClick={() => handleConfirm(true)}
          >
            <Image
              src={"/images/pictos/yes.svg"}
              alt={""}
              width={16}
              height={16}
            />
          </button>
          <button
            className="c-DataTableActions__Button"
            type="button"
            onClick={() => handleConfirm(false)}
          >
            <Image
              src={"/images/pictos/no.svg"}
              alt={""}
              width={16}
              height={16}
            />
          </button>
        </div>
      )}
    </div>
  );
}
