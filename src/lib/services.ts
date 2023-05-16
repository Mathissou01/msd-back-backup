import {
  UploadFileEntityResponse,
  WasteFamilyEntity,
} from "./../graphql/codegen/generated-types";
import { ICommonSelectOption } from "../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import { TDynamicFieldOption } from "./edito";
import { EStatus } from "./status";

export interface IServiceGuideDuTriStaticFields {
  id: string;
  status: EStatus;
  name: string;
  tags: Array<ICommonSelectOption>;
  wasteFamily: WasteFamilyEntity | null;
  picto: UploadFileEntityResponse | null;
  flow: string;
  recyclingGestureText: string;
  publishedDate?: Date;
  unpublishedDate?: Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface IServiceGuideDuTri extends IServiceGuideDuTriStaticFields {
  blocks: Array<IServicesBlock>;
}

interface IPartialBlock {
  __typename: TDynamicFieldOption;
  id: string;
}

export type IServicesBlock =
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
  document: UploadFileEntityResponse;
}

export interface IBlocksHorizontalRule extends IPartialBlock {
  __typename: "ComponentBlocksHorizontalRule";
  hr: string;
}

export interface IBlocksImage extends IPartialBlock {
  __typename: "ComponentBlocksImage";
  altText: string;
  isDecorative: boolean;
  picture: UploadFileEntityResponse;
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
