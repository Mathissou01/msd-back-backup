import PreviewButtonsFormat from "../PreviewButtonsFormat/PreviewButtonsFormat";
import PseudoImageFallback from "../../Accessibility/PseudoImageFallback/PseudoImageFallback";
import "./preview-banner.scss";

interface IEditoPreviewProps {
  onFormatting: (device: string) => void;
}

export default function PreviewBanner({ onFormatting }: IEditoPreviewProps) {
  /* Static Data */
  const altTexts = {
    close: "Fermer",
  };

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
      <PreviewButtonsFormat onFormatting={onFormatting} />
      {/*TODO: add printer button */}
      {/* <CommonButton label={buttonLabels.buttonPreview} picto="printer" /> */}
      <div className="c-PreviewBanner__Right">
        <button
          className="c-PreviewBanner__Button"
          type="button"
          onClick={handleCloseClick}
          title={altTexts.close}
        >
          <PseudoImageFallback alt={altTexts.close} />
        </button>
      </div>
    </div>
  );
}
