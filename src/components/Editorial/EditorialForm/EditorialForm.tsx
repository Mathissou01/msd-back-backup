import { FieldValues } from "react-hook-form/dist/types/fields";
import { TDynamicFieldConfiguration } from "../../../lib/dynamic-blocks";
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
  dynamicFieldConfigurations: Array<TDynamicFieldConfiguration>;
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
  dynamicFieldConfigurations,
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
      <FormDynamicBlocks
        name={"blocks"}
        blockConfigurations={dynamicFieldConfigurations}
      />
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
