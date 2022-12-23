import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IServiceLink } from "../../../../lib/service-links";
import "./form-service-links-row.scss";

interface IFormServiceLinksRowProps {
  serviceLink: IServiceLink;
  isUpDisabled?: boolean;
  isDownDisabled?: boolean;
  onEdit: () => void;
  onToggleDisplay: () => void;
  onReorder: (shift: number) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

export default function FormServiceLinksRow({
  serviceLink,
  isUpDisabled,
  isDownDisabled,
  onEdit,
  onToggleDisplay,
  onReorder,
  buttonRef,
}: IFormServiceLinksRowProps) {
  return (
    <>
      <div className="c-FormServiceLinksRow__Info">
        <Image
          className={classNames("c-FormServiceLinksRow__Picto", {
            "c-FormServiceLinksRow__Picto_disabled": !serviceLink.isDisplayed,
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
            "c-FormServiceLinksRow__Action_disabled": !serviceLink.isDisplayed,
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
            "c-FormServiceLinksRow__Action_disabled": !serviceLink.isDisplayed,
          })}
          type="button"
          onClick={onToggleDisplay}
        >
          <Image
            src={"/images/pictos/view.svg"}
            alt={""}
            width={16}
            height={16}
          />
        </button>
        <button
          className={classNames("c-FormServiceLinksRow__Action", {
            "c-FormServiceLinksRow__Action_disabled":
              !serviceLink.isDisplayed || isUpDisabled,
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
            "c-FormServiceLinksRow__Action_disabled":
              !serviceLink.isDisplayed || isDownDisabled,
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
