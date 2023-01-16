import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IServiceLink } from "../../../../lib/service-links";
import "./form-service-links-row.scss";

interface IFormServiceLinksRowProps {
  serviceLink: IServiceLink;
  onEdit: () => void;
  onToggleDisplay: () => void;
  onReorder: (shift: number) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  isDisabled?: boolean;
  isEditDisabled?: boolean;
  isToggleDisplayDisabled?: boolean;
  isUpDisabled?: boolean;
  isDownDisabled?: boolean;
}

export default function FormServiceLinksRow({
  serviceLink,
  onEdit,
  onToggleDisplay,
  onReorder,
  buttonRef,
  isDisabled,
  isEditDisabled,
  isToggleDisplayDisabled,
  isUpDisabled,
  isDownDisabled,
}: IFormServiceLinksRowProps) {
  return (
    <>
      <div className="c-FormServiceLinksRow__Info">
        <Image
          className={classNames("c-FormServiceLinksRow__Picto", {
            "c-FormServiceLinksRow__Picto_disabled": isDisabled,
          })}
          src={
            serviceLink.picto?.data?.attributes?.url ??
            "/images/pictos/default.svg"
          }
          alt={""}
          width={24}
          height={24}
        />
        <span>{serviceLink.name}</span>
      </div>
      <div className="c-FormServiceLinksRow__Actions">
        <button
          className={classNames("c-FormServiceLinksRow__Action", {
            "c-FormServiceLinksRow__Action_darkened": isDisabled,
            "c-FormServiceLinksRow__Action_disabled": isEditDisabled,
          })}
          type="button"
          onClick={onEdit}
          ref={buttonRef}
        >
          <Image
            src={"/images/pictos/edit.svg"}
            alt={""}
            width={16}
            height={16}
          />
        </button>
        <button
          className={classNames("c-FormServiceLinksRow__Action", {
            "c-FormServiceLinksRow__Action_darkened": isDisabled,
            "c-FormServiceLinksRow__Action_disabled": isToggleDisplayDisabled,
          })}
          type="button"
          disabled={isToggleDisplayDisabled}
          onClick={onToggleDisplay}
        >
          <Image
            src={
              isToggleDisplayDisabled
                ? "/images/pictos/view-off.svg"
                : "/images/pictos/view.svg"
            }
            alt={""}
            width={16}
            height={16}
          />
        </button>
        <button
          className={classNames("c-FormServiceLinksRow__Action", {
            "c-FormServiceLinksRow__Action_darkened": isDisabled,
            "c-FormServiceLinksRow__Action_disabled": isUpDisabled,
          })}
          type="button"
          disabled={isUpDisabled}
          onClick={() => onReorder(-1)}
        >
          <Image
            style={{ transform: "rotate(180deg)" }}
            src={"/images/pictos/arrow.svg"}
            alt={""}
            width={16}
            height={16}
          />
        </button>
        <button
          className={classNames("c-FormServiceLinksRow__Action", {
            "c-FormServiceLinksRow__Action_darkened": isDisabled,
            "c-FormServiceLinksRow__Action_disabled": isDownDisabled,
          })}
          type="button"
          disabled={isDownDisabled}
          onClick={() => onReorder(1)}
        >
          <Image
            src={"/images/pictos/arrow.svg"}
            alt={""}
            width={16}
            height={16}
          />
        </button>
      </div>
    </>
  );
}
