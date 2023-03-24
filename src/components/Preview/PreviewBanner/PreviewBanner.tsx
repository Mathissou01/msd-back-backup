// import CommonButton from "../../Common/CommonButton/CommonButton";
// import PreviewButtonsFormat from "../PreviewButtonsFormat/PreviewButtonsFormat";
import Image from "next/image";
import Close from "../../../../public/images/pictos/close.svg";
import "./preview-banner.scss";

export default function PreviewBanner() {
  //TODO: add label for the printer button
  // const buttonLabels = {
  //   buttonPreview: "Imprimer",
  // };

  const handleCloseClick = () => {
    close();
  };

  return (
    <div className="c-PreviewBanner">
      <h3>Prévisualiser</h3>
      {/*TODO: add desktop/tab/mobile buttons */}
      {/* <PreviewButtonsFormat /> */}
      {/*TODO: add printer button */}
      {/* <CommonButton label={buttonLabels.buttonPreview} picto="printer" /> */}
      <button
        className="c-PreviewBanner__Button_close"
        type="button"
        onClick={handleCloseClick}
      >
        <Image src={Close} alt="" width={15} height={15} />
      </button>
    </div>
  );
}
