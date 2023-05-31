import { IUploadFileEntity } from "./media";
import { IFormBlock } from "./dynamic-blocks";
import { IFormVersioningFields } from "./form";
import { ICommonSelectOption } from "../components/Form/FormSingleMultiselect/FormSingleMultiselect";

export type TEditorialContentTypes =
  | "quiz"
  | "tip"
  | "event"
  | "news"
  | "freeContent";

export interface IEditorialStaticFields extends IFormVersioningFields {
  title: string;
  image?: IUploadFileEntity | null;
  tags?: Array<ICommonSelectOption>;
  shortDescription?: string | null;
}

export interface IEditorialFields extends IEditorialStaticFields {
  blocks: Array<IFormBlock>;
}
