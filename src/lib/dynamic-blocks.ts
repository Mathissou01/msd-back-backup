import { TPictoStyles } from "./pictos";
import { IUploadFileEntity } from "./media";
import { removeNulls } from "./utilities";
import { v4 as uuidv4 } from "uuid";

export type TBlocksDynamicZone =
  | "ComponentBlocksFile"
  | "ComponentBlocksHorizontalRule"
  | "ComponentBlocksImage"
  | "ComponentBlocksSubHeading"
  | "ComponentBlocksVideo"
  | "ComponentBlocksWysiwyg"
  | "ComponentBlocksAttachments"
  | "ComponentBlocksCheckbox"
  | "ComponentBlocksCommentary"
  | "ComponentBlocksCumbersome"
  | "ComponentBlocksDateChoice"
  | "ComponentBlocksProofOfReceipt"
  | "ComponentBlocksQcm"
  | "ComponentBlocksQuestions"
  | "ComponentBlocksRequestType"
  | "Error";
export type TDynamicFieldOption = Exclude<TBlocksDynamicZone, "Error">;

interface IBlockDisplayMap {
  label: string;
  picto: TPictoStyles;
  isEmpty?: boolean;
  cannotDuplicate?: boolean;
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
  ComponentBlocksAttachments: {
    label: "TO_REPLACE_Request_Attachments",
    picto: "question_text",
  },
  ComponentBlocksCheckbox: {
    label: "TO_REPLACE_Checkbox",
    picto: "question_text",
  },
  ComponentBlocksCommentary: {
    label: "TO_REPLACE_Commentary",
    picto: "question_text",
  },
  ComponentBlocksCumbersome: {
    label: "TO_REPLACE_Cumbersome",
    picto: "question_text",
  },
  ComponentBlocksDateChoice: {
    label: "TO_REPLACE_Date_Choice",
    picto: "question_text",
  },
  ComponentBlocksProofOfReceipt: {
    label: "TO_REPLACE_ProofOfReceipt",
    picto: "question_text",
  },
  ComponentBlocksQcm: {
    label: "TO_REPLACE_QCM",
    picto: "question_text",
  },
  ComponentBlocksQuestions: {
    label: "Question texte",
    picto: "question_text",
    cannotDuplicate: true,
  },
  ComponentBlocksRequestType: {
    label: "TO_REPLACE_Request_Type",
    picto: "question_text",
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
  | IBlocksQuestions;

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

export interface IBlocksQuestions extends IPartialBlock {
  __typename: "ComponentBlocksQuestions";
  textStatus: string;
  questionTextLabel: string;
  questionTextPlaceholder: string;
  height: string;
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
    default: {
      return { __typename, id: temporaryId };
    }
  }
}
