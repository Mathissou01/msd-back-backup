import { IBlocksFile } from "../../../../../../lib/edito";
import { TAcceptedMimeTypes } from "../../../../../../lib/media";
import FormFileInput from "../../../../../Form/FormFileInput/FormFileInput";

interface IFileBlockProps {
  blockName: string;
}

export default function FileBlock({ blockName }: IFileBlockProps) {
  /* Static Data */
  const labels = {
    staticImage: "Fichier",
    staticImageValidation: "30 Mo maximum",
    staticImagePlaceholder:
      "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
  };
  const acceptedTypes: Array<TAcceptedMimeTypes> = [
    "text/csv",
    "application/pdf",
    "application/zip",
    "application/json",
    "application/xhtml+xml",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const fieldNames: { [name: string]: keyof IBlocksFile } = {
    document: "document",
  };

  return (
    <FormFileInput
      name={`${blockName}.${fieldNames.document}`}
      label={labels.staticImage}
      isRequired={false}
      validationLabel={labels.staticImageValidation}
      placeholder={labels.staticImagePlaceholder}
      mimeFilterNotContains="image"
      acceptedMimeTypes={acceptedTypes}
    />
  );
}
