import { WasteFamilyEntity } from "../graphql/codegen/generated-types";
import { IFormBlock } from "./dynamic-blocks";
import { IUploadFileEntity } from "./media";
import { IFormVersioningFields } from "./form";
import { IFormSingleMultiselectOption } from "../components/Form/FormSingleMultiselect/FormSingleMultiselect";

export interface IWasteFormStaticFields extends IFormVersioningFields {
  name: string;
  tags: Array<IFormSingleMultiselectOption>;
  wasteFamily: WasteFamilyEntity | null;
  picto: IUploadFileEntity | null;
  flow: string;
  recyclingGestureText: string;
}

export interface IWasteFormFields extends IWasteFormStaticFields {
  contentBlock: Array<IFormBlock>;
}
