import { FieldValues } from "react-hook-form/dist/types/fields";
import { TDynamicFieldOption } from "../../../lib/dynamic-blocks";
import { IEditorialFields } from "../../../lib/editorial";
import FormLayout from "../../../layouts/FormLayout/FormLayout";
import { IFormLayoutButtonsProps } from "../../../layouts/FormLayout/FormLayoutButtons/FormLayoutButtons";
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
}: IEditorialFormProps) {
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
  const buttonOptions: IFormLayoutButtonsProps = {
    onPublish,
    onDepublish,
    onPreview,
  };

  return (
    <FormLayout<IEditorialFields>
      formContent={fieldContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
      buttonOptions={buttonOptions}
    />
  );
}
