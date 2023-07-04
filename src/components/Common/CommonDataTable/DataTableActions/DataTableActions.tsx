import classNames from "classnames";
import React, { useState } from "react";
import Link from "next/link";
import { ICommonDataTableValidation } from "../../../../lib/common-data-table";
import { TActionPictoStyles } from "../../../../lib/pictos";
import PseudoImageFallback from "../../../Accessibility/PseudoImageFallback/PseudoImageFallback";
import "./data-table-actions.scss";

export interface IConfirmStateOptions {
  onConfirm: () => void;
  onConfirmValidation?: () => ICommonDataTableValidation;
  onCancel?: () => void;
  onCancelValidation?: () => ICommonDataTableValidation;
  confirmStyle?: "warning";
}

export interface IDataTableAction {
  id: string;
  picto: TActionPictoStyles;
  onClick?: () => void;
  href?: string;
  alt?: string;
  isDisabled?: boolean;
  confirmStateOptions?: IConfirmStateOptions;
}

interface IDataTableActionsProps {
  actions: Array<IDataTableAction>;
}

export default function DataTableActions({ actions }: IDataTableActionsProps) {
  /* Static Data */
  const altTexts = {
    confirm: "Confirmer",
    cancel: "Annuler",
  };

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
                [`c-DataTableActions__Button_${action.picto}`]: action.picto,
              })}
              href={action.href}
              onClick={() => handleClick(action)}
              title={action.alt ?? ""}
            >
              <PseudoImageFallback alt={action.alt ?? ""} />
            </Link>
          ) : (
            <button
              key={`${action.id}_${index}`}
              className={classNames("c-DataTableActions__Button", {
                "c-DataTableActions__Button_disabled": action.isDisabled,
                [`c-DataTableActions__Button_${action.picto}`]: action.picto,
              })}
              type="button"
              onClick={() => handleClick(action)}
              title={action.alt ?? ""}
            >
              <PseudoImageFallback alt={action.alt ?? ""} />
            </button>
          ),
        )}
      </div>
      {currentAction && (
        <div className="c-DataTableActions__EditActions">
          <button
            className="c-DataTableActions__Button c-DataTableActions__Button_yes"
            type="button"
            onClick={() => handleConfirm(true)}
            title={altTexts.confirm}
          >
            <PseudoImageFallback alt={altTexts.confirm} />
          </button>
          <button
            className="c-DataTableActions__Button c-DataTableActions__Button_no"
            type="button"
            onClick={() => handleConfirm(false)}
            title={altTexts.cancel}
          >
            <PseudoImageFallback alt={altTexts.cancel} />
          </button>
        </div>
      )}
    </div>
  );
}
