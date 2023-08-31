import React from "react";
import { IBlocksDownloadableFiles } from "../../../../../../lib/dynamic-blocks";
import { TAcceptedMimeTypes } from "../../../../../../lib/media";
import FormFileInput from "../../../../FormFileInput/FormFileInput";
import FormInput from "../../../../FormInput/FormInput";
import "./downloadable-files-block.scss";

interface IDownloadableFilesBlockProps {
  blockName: string;
}

export default function DownloadableFilesBlock({
  blockName,
}: IDownloadableFilesBlockProps) {
  /* Static Data */
  const labels = {
    staticImage: "Fichier",
    staticImagePlaceholder:
      "Cliquer pour ajouter un fichier depuis la bibliothèque de média ou glissez-déposez un fichier dans cette zone.",
    staticImageValidation: "10 Mo maximum",
    labelDescription: "Ajouter un bloc",
    staticName: "Texte du lien",
    staticValidation: "Ex. : `Télécharger le plan`. 80 caractères maximum",
  };
  const maxLengthValidation = 80;
  const acceptedTypes: Array<TAcceptedMimeTypes> = [
    "text/csv",
    "application/pdf",
    "application/zip",
    "application/json",
    "image/png",
    "image/jpeg",
    "application/xhtml+xml",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const fieldNames: { [name: string]: keyof IBlocksDownloadableFiles } = {
    linkText: "linkText",
    file: "file",
  };
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";
  return (
    <div className="c-FormFiles">
      <span className="c-DropOffMapStaticFields__RequiredLabel">
        {mandatoryFields}
      </span>
      <FormInput
        type="text"
        name={`${blockName}.${fieldNames.linkText}`}
        label={labels.staticName}
        validationLabel={labels.staticValidation}
        maxLengthValidation={maxLengthValidation}
        isRequired
      />
      <FormFileInput
        name={`${blockName}.${fieldNames.file}`}
        label={labels.staticImage}
        isRequired={false}
        validationLabel={labels.staticImageValidation}
        placeholder={labels.staticImagePlaceholder}
        acceptedMimeTypes={acceptedTypes}
      />
    </div>
  );
}
