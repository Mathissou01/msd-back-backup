import { FieldValues } from "react-hook-form/dist/types/fields";
import { TDynamicFieldOption } from "../../../lib/dynamic-blocks";
import { IWasteFormFields } from "../../../lib/recycling-guide";
import FormLayout, {
  IFormlayoutOptions,
} from "../../../layouts/FormLayout/FormLayout";
import FormLayoutDefaultButtons, {
  IFormLayoutDefaultButtonsLabels,
} from "../../../layouts/FormLayout/FormLayoutDefaultButtons/FormLayoutDefaultButtons";
import WasteFormStaticFields, {
  IWasteFormStaticFieldsLabels,
  TWasteFormStaticFields,
} from "./WasteFormStaticFields/WasteFormStaticFields";
import WasteFormSideBar from "./WasteFormSideBar/WasteFormSideBar";
import FormDynamicBlocks from "../../Form/FormDynamicBlocks/FormDynamicBlocks";

interface IWasteFormFormProps {
  data?: IWasteFormFields;
  staticFieldsOverride?: Array<TWasteFormStaticFields>;
  dynamicFieldsOptions: Array<TDynamicFieldOption>;
  onSubmitValid: (data: FieldValues) => void;
  onPublish?: () => void;
  onDepublish?: () => void;
  onPreview?: () => void;
  labels: IWasteFormStaticFieldsLabels;
  buttonLabels?: IFormLayoutDefaultButtonsLabels;
}

export default function WasteFormForm({
  data,
  staticFieldsOverride,
  dynamicFieldsOptions,
  onSubmitValid,
  onPublish,
  onDepublish,
  onPreview,
  labels,
  buttonLabels,
}: IWasteFormFormProps) {
  const buttonContent = (
    <FormLayoutDefaultButtons<IWasteFormFields>
      onPublish={onPublish}
      onDepublish={onDepublish}
      onPreview={onPreview}
      labels={buttonLabels}
    />
  );
  const fieldContent = (
    <>
      <WasteFormStaticFields
        labels={labels}
        enabledFieldsOverride={staticFieldsOverride}
      />
      <FormDynamicBlocks
        name={"contentBlock"}
        blockOptions={dynamicFieldsOptions}
      />
    </>
  );
  const sidebarContent = <WasteFormSideBar />;
  const formOptions: IFormlayoutOptions<IWasteFormFields> = {
    onSubmitValid,
    defaultValues: data,
    nestedFieldsToFocus: ["contentBlock"],
  };

  return (
    <FormLayout<IWasteFormFields>
      buttonContent={buttonContent}
      formContent={fieldContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
    />
  );
}
