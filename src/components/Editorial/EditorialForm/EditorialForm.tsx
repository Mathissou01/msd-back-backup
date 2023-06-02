import { FieldValues } from "react-hook-form/dist/types/fields";
import { TDynamicFieldOption } from "../../../lib/dynamic-blocks";
import { IEditorialFields } from "../../../lib/editorial";
import FormLayout from "../../../layouts/FormLayout/FormLayout";
import FormLayoutDefaultButtons, {
  IFormLayoutDefaultButtonsLabels,
} from "../../../layouts/FormLayout/FormLayoutDefaultButtons/FormLayoutDefaultButtons";
import EditorialStaticFields, {
  IEditorialStaticFieldsLabels,
  TEditorialStaticFields,
} from "./EditorialStaticFields/EditorialStaticFields";
import EditorialSideBar from "./EditorialSideBar/EditorialSideBar";
import FormDynamicBlocks from "../../Form/FormDynamicBlocks/FormDynamicBlocks";

interface IEditorialFormProps {
  data?: IEditorialFields;
  staticFieldsOverride?: Array<TEditorialStaticFields>;
  dynamicFieldsOptions: Array<TDynamicFieldOption>;
  onSubmitValid: (data: FieldValues) => void;
  onPublish?: () => void;
  onDepublish?: () => void;
  onPreview?: () => void;
  labels: IEditorialStaticFieldsLabels;
  buttonLabels?: IFormLayoutDefaultButtonsLabels;
}

export default function EditorialForm({
  data,
  staticFieldsOverride,
  dynamicFieldsOptions,
  onSubmitValid,
  onPublish,
  onDepublish,
  onPreview,
  labels,
  buttonLabels,
}: IEditorialFormProps) {
  const buttonContent = (
    <FormLayoutDefaultButtons<IEditorialFields>
      onPublish={onPublish}
      onDepublish={onDepublish}
      onPreview={onPreview}
      labels={buttonLabels}
    />
  );
  const fieldContent = (
    <>
      <EditorialStaticFields
        labels={labels}
        enabledFieldsOverride={staticFieldsOverride}
      />
      <FormDynamicBlocks name={"blocks"} blockOptions={dynamicFieldsOptions} />
    </>
  );
  const sidebarContent = <EditorialSideBar />;
  const formOptions = {
    onSubmitValid,
    defaultValues: data,
    nestedFieldsToFocus: ["blocks"],
  };

  return (
    <FormLayout<IEditorialFields>
      buttonContent={buttonContent}
      formContent={fieldContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
    />
  );
}
