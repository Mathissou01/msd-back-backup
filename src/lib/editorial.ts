import { IUploadFileEntity } from "./media";
import { IFormBlock } from "./dynamic-blocks";
import { IFormVersioningFields } from "./form";
import { IFormSingleMultiselectOption } from "../components/Form/FormSingleMultiselect/FormSingleMultiselect";

export type TEditorialContentTypes =
  | "quiz"
  | "tip"
  | "event"
  | "new"
  | "free-content";

export interface IEditorialStaticFields extends IFormVersioningFields {
  title: string;
  image?: IUploadFileEntity | null;
  tags?: Array<IFormSingleMultiselectOption>;
  shortDescription?: string | null;
}

export interface IEditorialFields extends IEditorialStaticFields {
  blocks: Array<IFormBlock>;
}
