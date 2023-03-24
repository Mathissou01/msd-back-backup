import "./preview-buttons-format.scss";
import Desktop from "../../../../public/images/pictos/desktop.svg";
import Tablet from "../../../../public/images/pictos/tablet.svg";
import Mobile from "../../../../public/images/pictos/mobile.svg";
import Image from "next/image";

export default function PreviewButtonsFormat() {
  return (
    <div className="c-PreviewButtonsFormat">
      <button
        className="c-PreviewButtonsFormat__Button"
        type="button"
        // TODO: handle the desktop button
        // onClick={handleDeleteClick}
      >
        <Image src={Desktop} alt="" width={25} height={25} />
      </button>
      <button
        className="c-PreviewButtonsFormat__Button"
        type="button"
        // TODO: handle the tab button
        // onClick={handleDeleteClick}
      >
        <Image className="test" src={Tablet} alt="" width={25} height={25} />
      </button>
      <button
        className="c-PreviewButtonsFormat__Button"
        type="button"
        // TODO: handle the mobile button
        // onClick={handleDeleteClick}
      >
        <Image src={Mobile} alt="" width={25} height={25} />
      </button>
    </div>
  );
}
