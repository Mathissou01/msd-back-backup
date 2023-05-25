import { TPictoStyles } from "./pictos";
import { removeNulls } from "./utilities";
import { EStatus } from "./status";
import { ILocalFile, IUploadFileEntity } from "./media";
import { ICommonSelectOption } from "../components/Form/FormSingleMultiselect/FormSingleMultiselect";

export type TEditoContentTypes =
  | "quiz"
  | "tip"
  | "event"
  | "news"
  | "freeContent";

export interface IEditoStaticFields {
  id: string;
  status: EStatus;
  customId?: string;
  title: string;
  // image?: IUploadFileEntity | null;
  image?: ILocalFile | null;
  tags?: Array<ICommonSelectOption>;
  shortDescription?: string | null;
  publishedDate?: Date;
  unpublishedDate?: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEditoFields extends IEditoStaticFields {
  blocks: Array<IEditoBlock>;
}

/* Blocks */
export type TBlocksDynamicZone =
  | "ComponentBlocksFile"
  | "ComponentBlocksHorizontalRule"
  | "ComponentBlocksImage"
  | "ComponentBlocksSubHeading"
  | "ComponentBlocksVideo"
  | "ComponentBlocksWysiwyg"
  | "Error";
export type TDynamicFieldOption = Exclude<TBlocksDynamicZone, "Error">;

interface IBlockDisplayMap {
  label: string;
  picto: TPictoStyles;
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
};

interface IPartialBlockDynamicZone {
  __typename: TBlocksDynamicZone;
  id: string;
}

interface IPartialBlock {
  __typename: TDynamicFieldOption;
  id: string;
}

export type IEditoBlock =
  | IPartialBlock
  | IBlocksFile
  | IBlocksHorizontalRule
  | IBlocksImage
  | IBlocksSubHeading
  | IBlocksVideo
  | IBlocksWysiwyg;

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

/* Methods */
export function isEditoBlock(
  block: Partial<IPartialBlockDynamicZone>,
): block is IEditoBlock {
  return "__typename" in block && "id" in block;
}

export function remapEditoBlocksDynamicZone(
  blocks?: Array<Partial<IPartialBlockDynamicZone> | null> | null,
): Array<IEditoBlock> {
  return (
    blocks
      ?.map((block) => {
        if (block) {
          const type = block.__typename;
          if (type && type !== "Error" && isEditoBlock(block)) {
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

export function createEmptyBlock(
  __typename: TDynamicFieldOption,
  id: string,
): IEditoBlock {
  switch (__typename) {
    case "ComponentBlocksHorizontalRule": {
      return {
        __typename,
        id,
        hr: "<hr>",
      };
    }
    case "ComponentBlocksSubHeading": {
      return {
        __typename,
        id,
        subHeadingText: undefined,
        subHeadingTag: undefined,
      };
    }
    case "ComponentBlocksVideo": {
      return {
        __typename,
        id,
        videoLink: undefined,
        transcriptText: undefined,
      };
    }
    case "ComponentBlocksFile": {
      return {
        __typename,
        id,
        document: undefined,
      };
    }
    case "ComponentBlocksImage": {
      return {
        __typename,
        id,
        isDecorative: undefined,
        altText: undefined,
        picture: undefined,
      };
    }
    default: {
      return { __typename, id };
    }
  }
}
