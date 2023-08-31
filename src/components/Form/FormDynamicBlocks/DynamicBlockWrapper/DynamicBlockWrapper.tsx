import classNames from "classnames";
import React, { ReactNode, useState } from "react";
import { TAllPictoStyles } from "../../../../lib/pictos";
import PseudoImageFallback from "../../../Accessibility/PseudoImageFallback/PseudoImageFallback";
import "./dynamic-block-wrapper.scss";

interface IDynamicFieldsBlockWrapper {
  children: ReactNode;
  label?: string;
  picto?: TAllPictoStyles;
  onReorder: (shift: number) => void;
  isUpDisabled?: boolean;
  isDownDisabled?: boolean;
  onDuplicate: () => void;
  onDelete: () => void;
  isOpen: boolean;
  onOpenToggle: () => void;
  isEmpty?: boolean;
  canReorder?: boolean;
  canDuplicate?: boolean;
  canDelete?: boolean;
}

export default function DynamicBlockWrapper({
  children,
  label,
  picto,
  onReorder,
  isUpDisabled,
  isDownDisabled,
  onDuplicate,
  onDelete,
  isOpen = true,
  onOpenToggle,
  isEmpty,
  canReorder = true,
  canDuplicate = true,
  canDelete = true,
}: IDynamicFieldsBlockWrapper) {
  /* Static Data */
  const altTexts = {
    open: "Ouvrir",
    close: "Fermer",
    up: "Monter",
    down: "Descendre",
    duplicate: "Dupliquer",
    delete: "Supprimer",
  };

  /* Local Data */
  const [isDisabled, setIsDisabled] = useState(false);

  function handleDeleteClick() {
    setIsDisabled(true);
    setTimeout(() => {
      onDelete();
      setIsDisabled(false);
    }, 200);
  }

  return (
    <div
      className={classNames("c-EditoBlockWrapper", {
        "c-EditoBlockWrapper_disabled": isDisabled,
      })}
    >
      <div className="c-EditoBlockWrapper__Header">
        <div className="c-EditoBlockWrapper__LeftGroup">
          {!isEmpty && (
            <button
              className={classNames("c-EditoBlockWrapper__Action", {
                "c-EditoBlockWrapper__Action_chevronUp": isOpen,
                "c-EditoBlockWrapper__Action_chevronDown": !isOpen,
              })}
              type="button"
              onClick={onOpenToggle}
              title={isOpen ? altTexts.close : altTexts.open}
            >
              <PseudoImageFallback
                alt={isOpen ? altTexts.close : altTexts.open}
              />
            </button>
          )}
          <div className="c-EditoBlockWrapper__Info">
            {picto && (
              <div
                className={classNames("c-EditoBlockWrapper__Picto", {
                  [`c-EditoBlockWrapper__Picto_${picto}`]: picto,
                })}
              />
            )}
            <div className="c-EditoBlockWrapper__Title">{label}</div>
          </div>
        </div>
        <div className="c-EditoBlockWrapper__Actions">
          {canReorder && (
            <>
              <button
                className={classNames(
                  "c-EditoBlockWrapper__Action c-EditoBlockWrapper__Action_arrowUp",
                  {
                    "c-EditoBlockWrapper__Action_disabled": isUpDisabled,
                  },
                )}
                type="button"
                disabled={isUpDisabled}
                onClick={() => onReorder(-1)}
                title={altTexts.up}
              >
                <PseudoImageFallback alt={altTexts.up} />
              </button>
              <button
                className={classNames(
                  "c-EditoBlockWrapper__Action c-EditoBlockWrapper__Action_arrowDown",
                  {
                    "c-EditoBlockWrapper__Action_disabled": isDownDisabled,
                  },
                )}
                type="button"
                disabled={isDownDisabled}
                onClick={() => onReorder(1)}
                title={altTexts.down}
              >
                <PseudoImageFallback alt={altTexts.down} />
              </button>
            </>
          )}
          {canDuplicate && (
            <button
              className="c-EditoBlockWrapper__Action c-EditoBlockWrapper__Action_duplicate"
              type="button"
              onClick={onDuplicate}
              title={altTexts.duplicate}
            >
              <PseudoImageFallback alt={altTexts.duplicate} />
            </button>
          )}
          {canDelete && (
            <button
              className="c-EditoBlockWrapper__Action c-EditoBlockWrapper__Action_delete"
              type="button"
              onClick={handleDeleteClick}
              title={altTexts.delete}
            >
              <PseudoImageFallback alt={altTexts.delete} />
            </button>
          )}
        </div>
      </div>
      <div
        className={classNames("c-EditoBlockWrapper__Content", {
          "c-EditoBlockWrapper__Content_open": isOpen,
          "c-EditoBlockWrapper__Content_empty": isEmpty,
        })}
      >
        {children}
      </div>
    </div>
  );
}
