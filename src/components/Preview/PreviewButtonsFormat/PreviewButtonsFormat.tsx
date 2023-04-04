import { useState } from "react";
import Desktop from "../../../../public/images/pictos/desktop.svg";
import Tablet from "../../../../public/images/pictos/tablet.svg";
import Mobile from "../../../../public/images/pictos/mobile.svg";
import classNames from "classnames";
import Image from "next/image";
import "./preview-buttons-format.scss";

interface IEditoPreviewProps {
  onFormatting: (device: string) => void;
}
export default function PreviewButtonsFormat({
  onFormatting,
}: IEditoPreviewProps) {
  type DeviceType = "desktop" | "tablet" | "mobile";

  const [isActive, setActive] = useState("desktop");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const device = e.currentTarget.id as DeviceType;
    setActive(device);
    onFormatting(device);
  };

  return (
    <div className="c-PreviewButtonsFormat">
      <button
        className={classNames("c-PreviewButtonsFormat__Button", {
          "c-PreviewButtonsFormat__Button_active": isActive === "desktop",
        })}
        id="desktop"
        type="button"
        onClick={(e) => handleClick(e)}
      >
        <Image
          className="c-PreviewButtonsFormat__Button_icon"
          src={Desktop}
          alt=""
          width={25}
          height={25}
        />
      </button>
      <button
        className={classNames("c-PreviewButtonsFormat__Button", {
          "c-PreviewButtonsFormat__Button_active": isActive === "tablet",
        })}
        id="tablet"
        type="button"
        onClick={(e) => handleClick(e)}
      >
        <Image
          className="c-PreviewButtonsFormat__Button_icon"
          src={Tablet}
          alt=""
          width={25}
          height={25}
        />
      </button>
      <button
        className={classNames("c-PreviewButtonsFormat__Button", {
          "c-PreviewButtonsFormat__Button_active": isActive === "mobile",
        })}
        id="mobile"
        type="button"
        onClick={(e) => handleClick(e)}
      >
        <Image
          className="c-PreviewButtonsFormat__Button_icon"
          src={Mobile}
          alt=""
          width={25}
          height={25}
        />
      </button>
    </div>
  );
}
