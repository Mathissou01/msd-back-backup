import { v4 as uuidv4 } from "uuid";
import { Enum_Componentblockscommentary_Commentarystatus } from "../graphql/codegen/generated-types";
import { TBlockPictoStyles } from "./pictos";
import { IUploadFileEntity } from "./media";
import { removeNulls } from "./utilities";

export type TBlocksDynamicZone =
  | "ComponentBlocksFile"
  | "ComponentBlocksHorizontalRule"
  | "ComponentBlocksImage"
  | "ComponentBlocksSubHeading"
  | "ComponentBlocksVideo"
  | "ComponentBlocksWysiwyg"
  | "Error"
  // DropOffMap Blocks
  | "ComponentBlocksDownloadBlock"
  // Request Blocks
  | "ComponentBlocksAttachments"
  | "ComponentBlocksCommentary"
  | "ComponentBlocksCumbersome"
  | "ComponentBlocksQuestions"
  | "ComponentBlocksQcm"
  | "ComponentBlocksDateChoice"
  | "ComponentBlocksCheckbox"
  | "ComponentBlocksProofOfReceipt"
  | "ComponentBlocksRequestType";

export type TDynamicFieldOption = Exclude<TBlocksDynamicZone, "Error">;

export interface IDynamicFieldProps {
  minBlocks?: number;
  maxBlocks?: number;
}

export type TDynamicFieldConfiguration = {
  option: TDynamicFieldOption;
  props?: IDynamicFieldProps;
};

interface IBlockDisplayMap extends IDynamicFieldProps {
  label: string;
  picto: TBlockPictoStyles;
  isEmpty?: boolean;
}

export const blockDisplayMap: Record<TDynamicFieldOption, IBlockDisplayMap> = {
  ComponentBlocksFile: {
    label: "Fichier",
    picto: "attachment",
  },
  ComponentBlocksHorizontalRule: {
    label: "Séparateur",
    picto: "expandVertical",
    isEmpty: true,
  },
  ComponentBlocksImage: {
    label: "Image",
    picto: "picture",
  },
  ComponentBlocksSubHeading: {
    label: "Titre",
    picto: "text",
  },
  ComponentBlocksVideo: {
    label: "Vidéo",
    picto: "video",
  },
  ComponentBlocksWysiwyg: {
    label: "Texte",
    picto: "textCase",
  },
  // DropOffMap Blocks
  ComponentBlocksDownloadBlock: {
    label: "Fichier téléchargeable",
    picto: "attachment",
  },
  // Request Blocks
  ComponentBlocksAttachments: {
    label: "Pièces jointes",
    picto: "attachment",
  },
  ComponentBlocksCommentary: {
    label: "Commentaire",
    picto: "chatBubble",
  },
  ComponentBlocksCumbersome: {
    label: "TO_REPLACE_Cumbersome",
    picto: "paragraphJustified",
  },
  ComponentBlocksQuestions: {
    label: "Question texte",
    picto: "paragraphJustified",
  },
  ComponentBlocksQcm: {
    label: "Question à choix multiple",
    picto: "arrowRectangle",
  },
  ComponentBlocksDateChoice: {
    label: "Choix d'une date",
    picto: "calendar",
  },
  ComponentBlocksCheckbox: {
    label: "Case à cocher",
    picto: "checkboxIcon",
  },
  ComponentBlocksProofOfReceipt: {
    label: "TO_REPLACE_ProofOfReceipt",
    picto: "paragraphJustified",
  },
  ComponentBlocksRequestType: {
    label: "Type de demande",
    picto: "text",
  },
};

interface IPartialBlockDynamicZone {
  __typename: TBlocksDynamicZone;
  id: string;
}

interface IPartialBlock {
  __typename: TDynamicFieldOption;
  id: string;
}

export type IFormBlock =
  | IPartialBlock
  | IBlocksFile
  | IBlocksHorizontalRule
  | IBlocksImage
  | IBlocksSubHeading
  | IBlocksVideo
  | IBlocksWysiwyg
  | IBlocksAttachments
  | IBlocksDateChoice
  | IBlocksQCM
  | IBlocksQuestions
  | IBlocksCommentary
  | IBlocksCheckbox
  | IBlocksDownloadableFiles
  | IBlocksRequestType;

export interface IBlocksFile extends IPartialBlock {
  __typename: "ComponentBlocksFile";
  id: string;
  document: IUploadFileEntity;
}

export interface IBlocksHorizontalRule extends IPartialBlock {
  __typename: "ComponentBlocksHorizontalRule";
  hr: string;
}

export interface IBlocksImage extends IPartialBlock {
  __typename: "ComponentBlocksImage";
  altText: string;
  isDecorative: boolean;
  picture: IUploadFileEntity;
}

export interface IBlocksSubHeading extends IPartialBlock {
  __typename: "ComponentBlocksSubHeading";
  subHeadingTag?: string;
  subHeadingText?: string;
}

export interface IBlocksVideo extends IPartialBlock {
  __typename: "ComponentBlocksVideo";
  videoLink?: string;
  transcriptText?: string;
}

export interface IBlocksWysiwyg extends IPartialBlock {
  __typename: "ComponentBlocksWysiwyg";
  textEditor: string;
}

export interface IBlocksDownloadableFiles extends IPartialBlock {
  __typename: "ComponentBlocksDownloadBlock";
  linkText: string;
  file: IUploadFileEntity;
}

export interface IBlocksAttachments extends IPartialBlock {
  __typename: "ComponentBlocksAttachments";
  attachmentLabel: string;
  renderField: boolean;
  multipleAttachments: boolean;
}

export interface IBlocksQCM extends IPartialBlock {
  __typename: "ComponentBlocksQcm";
  fieldStatusQCM: string;
  fieldLabelQCM: string;
  responses: string;
  multipleChoice: string;
}

export interface IBlocksQuestions extends IPartialBlock {
  __typename: "ComponentBlocksQuestions";
  textStatus: string;
  questionTextLabel: string;
  questionTextPlaceholder: string;
  height: string;
}

export interface IBlocksCommentary extends IPartialBlock {
  __typename: "ComponentBlocksCommentary";
  commentaryStatus: Enum_Componentblockscommentary_Commentarystatus;
  commentaryLabel: string;
  commentaryPlaceholder: string;
}

export interface IBlocksCheckbox extends IPartialBlock {
  __typename: "ComponentBlocksCheckbox";
  fieldStatusCheckbox: string;
  labelCheckbox: string;
}

export interface IBlocksDateChoice extends IPartialBlock {
  __typename: "ComponentBlocksDateChoice";
  fieldStatus: string;
  fieldLabelDateChoice: string;
}

export interface IBlocksRequestType extends IPartialBlock {
  __typename: "ComponentBlocksRequestType";
  title?: string;
  isEmail: boolean;
  isTSMS: boolean;
  email: string;
}

/* Methods */
export function isFormBlock(
  block: Partial<IPartialBlockDynamicZone>,
): block is IFormBlock {
  return "__typename" in block && "id" in block;
}

export function remapFormBlocksDynamicZone(
  blocks?: Array<Partial<IPartialBlockDynamicZone> | null> | null,
): Array<IFormBlock> {
  return (
    blocks
      ?.map((block) => {
        if (block) {
          const type = block.__typename;
          if (type && type !== "Error" && isFormBlock(block)) {
            return {
              ...block,
              __typename: block.__typename,
              id: block.id,
            };
          }
        }
      })
      .filter(removeNulls) ?? []
  );
}

export function createEmptyBlock(__typename: TDynamicFieldOption): IFormBlock {
  const temporaryId = uuidv4();
  switch (__typename) {
    case "ComponentBlocksHorizontalRule": {
      return {
        ...{
          __typename,
          id: temporaryId,
        },
        hr: "<hr>",
      };
    }
    case "ComponentBlocksSubHeading": {
      return {
        __typename,
        id: temporaryId,
        subHeadingText: undefined,
        subHeadingTag: undefined,
      };
    }
    case "ComponentBlocksVideo": {
      return {
        __typename,
        id: temporaryId,
        videoLink: undefined,
        transcriptText: undefined,
      };
    }
    case "ComponentBlocksFile": {
      return {
        __typename,
        id: temporaryId,
        document: undefined,
      };
    }
    case "ComponentBlocksImage": {
      return {
        __typename,
        id: temporaryId,
        isDecorative: undefined,
        altText: undefined,
        picture: undefined,
      };
    }
    case "ComponentBlocksWysiwyg": {
      return {
        __typename,
        id: temporaryId,
        textEditor: undefined,
      };
    }
    case "ComponentBlocksQcm": {
      return {
        __typename,
        id: temporaryId,
        fieldStatusQCM: "Obligatoire",
        fieldLabelQCM: "",
        responses: "",
        multipleChoice: "0",
      };
    }
    case "ComponentBlocksQuestions": {
      return {
        __typename,
        id: temporaryId,
        textStatus: "Obligatoire",
        questionTextLabel: "",
        questionTextPlaceholder: "",
        height: "0",
      };
    }
    case "ComponentBlocksAttachments": {
      return {
        __typename,
        id: temporaryId,
        attachmentLabel: "",
        renderField: false,
        multipleAttachments: false,
      };
    }
    case "ComponentBlocksCommentary": {
      return {
        __typename,
        id: temporaryId,
        commentaryStatus:
          Enum_Componentblockscommentary_Commentarystatus.Facultatif,
        commentaryLabel: undefined,
        commentaryPlaceholder: undefined,
      };
    }
    case "ComponentBlocksCheckbox": {
      return {
        __typename,
        id: temporaryId,
        fieldStatusCheckbox: "Obligatoire",
        labelCheckbox: "",
      };
    }
    case "ComponentBlocksDownloadBlock": {
      return {
        __typename,
        id: temporaryId,
        linkText: undefined,
        file: undefined,
      };
    }
    case "ComponentBlocksRequestType": {
      return {
        __typename,
        id: temporaryId,
        title: "",
        isEmail: false,
        isTSMS: false,
        email: "",
      };
    }
    case "ComponentBlocksDateChoice": {
      return {
        __typename,
        id: temporaryId,
        fieldStatus: "Obligatoire",
        fieldLabelDateChoice: "",
      };
    }
    default: {
      return { __typename, id: temporaryId };
    }
  }
}

/**
 * Function to use minBlock behavior (to generate missing blocks matching your blockConfigurations from your fields data)
 * @param blockConfigurations Array<TDynamicFieldConfiguration>
 * @param fields Array<IPartialBlock>
 * @returns Array<IFormBlock>
 */
export function generateMinimumBlocks(
  blockConfigurations: Array<TDynamicFieldConfiguration>,
  fields: Array<IPartialBlock>,
): Array<IFormBlock> {
  blockConfigurations.forEach((blockConfiguration) => {
    if (blockConfiguration.props?.minBlocks) {
      const minBlocks = blockConfiguration.props?.minBlocks;
      const fieldsOfTypename = fields.filter((field) => {
        return field.__typename === blockConfiguration.option;
      });
      if (fieldsOfTypename.length < minBlocks) {
        for (let i = fieldsOfTypename.length; i < minBlocks; i++) {
          fields.push(createEmptyBlock(blockConfiguration.option));
        }
      }
    }
  });
  return fields;
}
