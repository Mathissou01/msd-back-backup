import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { IServiceLink } from "../../../../lib/service-links";
import "./form-service-links-row.scss";
import PseudoImageFallback from "../../../Accessibility/PseudoImageFallback/PseudoImageFallback";

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
  /* Static Data */
  const altTexts = {
    picto: "Picto",
    edit: "Modifier",
    show: "Afficher",
    hide: "Cacher",
    up: "Monter",
    down: "Baisser",
  };

  return (
    <>
      <div className="c-FormServiceLinksRow__Info">
        <Image
          className={classNames("c-FormServiceLinksRow__Picto", {
            "c-FormServiceLinksRow__Picto_disabled": isDisabled,
          })}
          src={serviceLink.picto?.url ?? "/images/pictos/default.svg"}
          alt={serviceLink.picto?.alternativeText ?? altTexts.picto}
          width={24}
          height={24}
        />
        <span>{serviceLink.name}</span>
      </div>
      <div className="c-FormServiceLinksRow__Actions">
        <button
          className={classNames(
            "c-FormServiceLinksRow__Action c-FormServiceLinksRow__Action_edit",
            {
              "c-FormServiceLinksRow__Action_darkened": isDisabled,
              "c-FormServiceLinksRow__Action_disabled": isEditDisabled,
            },
          )}
          type="button"
          onClick={onEdit}
          ref={buttonRef}
          title={altTexts.edit}
        >
          <PseudoImageFallback alt={altTexts.edit} />
        </button>
        <button
          className={classNames("c-FormServiceLinksRow__Action", {
            "c-FormServiceLinksRow__Action_eyeClosed": isDisabled,
            "c-FormServiceLinksRow__Action_eye": !isDisabled,
            "c-FormServiceLinksRow__Action_darkened": isDisabled,
            "c-FormServiceLinksRow__Action_disabled": isToggleDisplayDisabled,
          })}
          type="button"
          disabled={isToggleDisplayDisabled}
          onClick={onToggleDisplay}
          title={isDisabled ? altTexts.show : altTexts.hide}
        >
          <PseudoImageFallback
            alt={isDisabled ? altTexts.show : altTexts.hide}
          />
        </button>
        <button
          className={classNames(
            "c-FormServiceLinksRow__Action c-FormServiceLinksRow__Action_arrowUp",
            {
              "c-FormServiceLinksRow__Action_darkened": isDisabled,
              "c-FormServiceLinksRow__Action_disabled": isUpDisabled,
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
            "c-FormServiceLinksRow__Action c-FormServiceLinksRow__Action_arrowDown",
            {
              "c-FormServiceLinksRow__Action_darkened": isDisabled,
              "c-FormServiceLinksRow__Action_disabled": isDownDisabled,
            },
          )}
          type="button"
          disabled={isDownDisabled}
          onClick={() => onReorder(1)}
          title={altTexts.down}
        >
          <PseudoImageFallback alt={altTexts.down} />
        </button>
      </div>
    </>
  );
}
