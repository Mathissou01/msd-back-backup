import classNames from "classnames";
import React, { ReactNode, useState } from "react";
import { TPictoStyles } from "../../../../lib/pictos";
import "./dynamic-block-wrapper.scss";

interface IDynamicFieldsBlockWrapper {
  children: ReactNode;
  label?: string;
  picto?: TPictoStyles;
  onReorder: (shift: number) => void;
  isUpDisabled?: boolean;
  isDownDisabled?: boolean;
  onDuplicate: () => void;
  onDelete: () => void;
  isOpen: boolean;
  onOpenToggle: () => void;
  isEmpty?: boolean;
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
  isOpen,
  onOpenToggle,
  isEmpty,
}: IDynamicFieldsBlockWrapper) {
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
            />
          )}
          <div className="c-EditoBlockWrapper__Info">
            <div
              className={classNames("c-EditoBlockWrapper__Picto", {
                [`c-EditoBlockWrapper__Picto_${picto}`]: picto,
              })}
            />
            <div className="c-EditoBlockWrapper__Title">{label}</div>
          </div>
        </div>
        <div className="c-EditoBlockWrapper__Actions">
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
          />
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
          />
          <button
            className="c-EditoBlockWrapper__Action c-EditoBlockWrapper__Action_duplicate"
            type="button"
            onClick={onDuplicate}
          />
          <button
            className="c-EditoBlockWrapper__Action c-EditoBlockWrapper__Action_delete"
            type="button"
            onClick={handleDeleteClick}
          />
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
