import React from "react";
import { TAcceptedMimeTypes } from "../../../../../../lib/media";
import { IBlocksImage } from "../../../../../../lib/dynamic-blocks";
import FormFileInput from "../../../../FormFileInput/FormFileInput";
import FormCheckbox from "../../../../FormCheckbox/FormCheckbox";

interface IImageBlock {
  blockName: string;
}

export default function ImageBlock({ blockName }: IImageBlock) {
  /* Static Data */
  const labels = {
    staticImage: "Image",
    staticImageValidation: "30 Mo maximum",
    staticImagePlaceholder:
      "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
    decorativeLabel:
      "Cette image est décorative. Elle ne contient pas de texte ou d'information qui ne soit reprise dans le texte de la page.",
  };
  const acceptedTypes: Array<TAcceptedMimeTypes> = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/svg",
    "image/svg+xml",
    "image/tiff",
    "image/ico",
    "image/dvu",
  ];

  const fieldNames: { [name: string]: keyof IBlocksImage } = {
    altText: "altText",
    isDecorative: "isDecorative",
    picture: "picture",
  };

  return (
    <>
      <FormFileInput
        name={`${blockName}.${fieldNames.picture}`}
        label={labels.staticImage}
        isRequired={false}
        validationLabel={labels.staticImageValidation}
        placeholder={labels.staticImagePlaceholder}
        acceptedMimeTypes={acceptedTypes}
      />
      <FormCheckbox
        name={`${blockName}.${fieldNames.isDecorative}`}
        label={labels.decorativeLabel}
      />
    </>
  );
}
