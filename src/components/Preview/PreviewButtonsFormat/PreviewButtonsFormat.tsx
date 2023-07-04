import classNames from "classnames";
import { useState } from "react";
import PseudoImageFallback from "../../Accessibility/PseudoImageFallback/PseudoImageFallback";
import "./preview-buttons-format.scss";

type TDeviceType = "desktop" | "tablet" | "mobile";

interface IEditoPreviewProps {
  onFormatting: (device: string) => void;
}

export default function PreviewButtonsFormat({
  onFormatting,
}: IEditoPreviewProps) {
  /* Static Data */
  const altTexts = {
    desktop: "Taille Bureau",
    tablet: "Taille Tablette",
    phone: "Taille Mobile",
  };

  /* Methods */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const device = e.currentTarget.id as TDeviceType;
    setActive(device);
    onFormatting(device);
  };

  /* Local Data */
  const [isActive, setActive] = useState("desktop");

  return (
    <div className="c-PreviewButtonsFormat">
      <button
        className={classNames(
          "c-PreviewButtonsFormat__Button c-PreviewButtonsFormat__Button_desktop",
          {
            "c-PreviewButtonsFormat__Button_active": isActive === "desktop",
          },
        )}
        id="desktop"
        type="button"
        onClick={(e) => handleClick(e)}
        title={altTexts.desktop}
      >
        <PseudoImageFallback alt={altTexts.desktop} />
      </button>
      <button
        className={classNames(
          "c-PreviewButtonsFormat__Button c-PreviewButtonsFormat__Button_tablet",
          {
            "c-PreviewButtonsFormat__Button_active": isActive === "tablet",
          },
        )}
        id="tablet"
        type="button"
        onClick={(e) => handleClick(e)}
        title={altTexts.tablet}
      >
        <PseudoImageFallback alt={altTexts.tablet} />
      </button>
      <button
        className={classNames(
          "c-PreviewButtonsFormat__Button c-PreviewButtonsFormat__Button_phone",
          {
            "c-PreviewButtonsFormat__Button_active": isActive === "mobile",
          },
        )}
        id="mobile"
        type="button"
        onClick={(e) => handleClick(e)}
        title={altTexts.phone}
      >
        <PseudoImageFallback alt={altTexts.phone} />
      </button>
    </div>
  );
}
