import { FieldValues } from "react-hook-form/dist/types/fields";
import { IRecyclingGuideFields } from "../../lib/recycling-guide";
import { TDynamicFieldOption } from "../../lib/dynamic-blocks";
import FormLayout, {
  IFormlayoutOptions,
} from "../../layouts/FormLayout/FormLayout";
import { IFormLayoutButtonsProps } from "../../layouts/FormLayout/FormLayoutButtons/FormLayoutButtons";
import RecyclingGuideStaticFields, {
  IRecyclingGuideStaticFieldsLabels,
  TRecyclingGuideStaticFields,
} from "./RecyclingGuideStaticFields/RecyclingGuideStaticFields";
import FormDynamicBlocks from "../Form/FormDynamicBlocks/FormDynamicBlocks";
import RecyclingGuideSideBar from "./RecyclingGuideSideBar/RecyclingGuideSideBar";

interface IRecyclingGuideFormProps {
  data?: IRecyclingGuideFields;
  staticFieldsOverride?: Array<TRecyclingGuideStaticFields>;
  dynamicFieldsOptions: Array<TDynamicFieldOption>;
  onSubmitValid: (data: FieldValues) => void;
  onPublish?: () => void;
  onDepublish?: () => void;
  onPreview?: () => void;
  labels: IRecyclingGuideStaticFieldsLabels;
}

export default function RecyclingGuideForm({
  data,
  staticFieldsOverride,
  dynamicFieldsOptions,
  onSubmitValid,
  onPublish,
  onDepublish,
  onPreview,
  labels,
}: IRecyclingGuideFormProps) {
  const fieldContent = (
    <>
      <RecyclingGuideStaticFields
        labels={labels}
        enabledFieldsOverride={staticFieldsOverride}
      />
      <FormDynamicBlocks
        name={"contentBlock"}
        blockOptions={dynamicFieldsOptions}
      />
    </>
  );
  const sidebarContent = <RecyclingGuideSideBar />;
  const formOptions: IFormlayoutOptions<IRecyclingGuideFields> = {
    onSubmitValid,
    defaultValues: data,
    nestedFieldsToFocus: ["contentBlock"],
  };
  const buttonOptions: IFormLayoutButtonsProps = {
    onPublish,
    onDepublish,
    onPreview,
  };

  return (
    <FormLayout<IRecyclingGuideFields>
      formContent={fieldContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
      buttonOptions={buttonOptions}
    />
  );
}
