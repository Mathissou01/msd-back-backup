import React from "react";
import { IBlocksWysiwyg } from "../../../../../lib/dynamic-blocks";
import FormWysiwyg from "../../../FormWysiwyg/FormWysiwyg";

interface IWysiwygBlockProps {
  blockName: string;
  isVisible: boolean;
}

export default function WysiwygBlock({
  blockName,
  isVisible,
}: IWysiwygBlockProps) {
  /* Static Data */
  const formLabels = {
    text: "Texte",
    validation:
      "Accessibilité : utilisez les niveaux de titre de façon cohérente, sans sauter de niveau",
  };
  const fieldNames: { [name: string]: keyof IBlocksWysiwyg } = {
    text: "textEditor",
  };

  return (
    <div className="c-WysiwygBlock">
      <FormWysiwyg
        name={`${blockName}.${fieldNames.text}`}
        label={formLabels.text}
        validationLabel={formLabels.validation}
        isVisible={isVisible}
        isRequired
      />
    </div>
  );
}
