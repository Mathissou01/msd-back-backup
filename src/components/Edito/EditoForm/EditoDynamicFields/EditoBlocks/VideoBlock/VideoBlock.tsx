import React from "react";
import { IBlocksVideo } from "../../../../../../lib/edito";
import FormInput from "../../../../../Form/FormInput/FormInput";
import "./video-block.scss";
import FormWysiwyg from "../../../../../Form/FormWysiwyg/FormWysiwyg";
import { minimalWysiwygEditorOptions } from "../../../../../Form/FormWysiwyg/WysiwygEditor/WysiwygEditor";

// TODO Add or remove string pattern check ?
// const youtubeUrlPattern =
//   /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;
// const vimeoUrlPattern = /vimeo\.com\/(?!progressive_redirect).+/;
// const dailymotionUrlPattern =
//   /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?(?:[\w.#_-]+)?/;
// const validationPatterns = new RegExp(
//   `(${vimeoUrlPattern.source})|(${dailymotionUrlPattern.source})|(${youtubeUrlPattern.source})`,
// );
interface IVideoBlockProps {
  blockName: string;
  isVisible: boolean;
}

export default function VideoBlock({ blockName, isVisible }: IVideoBlockProps) {
  /* Static Data */
  const formLabels = {
    videoLink: "Lien de la vidéo Youtube, Dailymotion ou Vimeo",
    transcriptText: "Transcription textuelle",
    subLabelVideoLink: `Copier le lien affiché dans "Partager" sur la page de la vidéo`,
    subLabelTranscriptText:
      "Accessibilité : version écrite de la totalité de ce qui est exprimé oralement dans la vidéo, ainsi que  toutes les informations descriptives nécessaires à une bonne compréhension.",
    // errorMessage: "Youtube, Viméo ou Dailymotion sont pris en charge.",
    // validationErrorMessage: "cette url n'est pas pris en charge",
  };

  const fieldNames: { [name: string]: keyof IBlocksVideo } = {
    link: "videoLink",
    text: "transcriptText",
  };

  return (
    <div className="c-VideoBlock">
      <div className="c-VideoBlock__Group">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.link}`}
          label={formLabels.videoLink}
          validationLabel={formLabels.subLabelVideoLink}
          // patternValidation={{
          //   value: validationPatterns,
          //   message: formLabels.errorMessage,
          // }}
          // patternValidationErrorMessage={formLabels.validationErrorMessage}
        />
        <FormWysiwyg
          name={`${blockName}.${fieldNames.text}`}
          label={formLabels.transcriptText}
          validationLabel={formLabels.subLabelTranscriptText}
          editorOptions={minimalWysiwygEditorOptions}
          isVisible={isVisible}
          isRequired
        />
      </div>
    </div>
  );
}
