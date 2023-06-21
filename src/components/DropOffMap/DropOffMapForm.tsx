import React from "react";
import { FieldValues } from "react-hook-form";
import FormLayout, {
  IFormlayoutOptions,
} from "../../layouts/FormLayout/FormLayout";
import { CollectEntity } from "../../graphql/codegen/generated-types";
import { IDropOffMapStaticFields } from "../../lib/drop-off-map";
import DropOffMapStaticFields, {
  IDropOffMapStaticFieldsLabels,
} from "./DropOffMapStaticFields/DropOffMapStaticFields";
import DropOffMapSideBar from "./DropOffMapSideBar/DropOffMapSideBar";
import DropOffMapFormButtons, {
  IDropOffMapFormButtonsLabels,
} from "./DropOffMapFormButtons/DropOffMapFormButtons";
import "./drop-off-map-form.scss";

interface IDropOffMapFormProps {
  data?: IDropOffMapStaticFields;
  onSubmitValid: (data: FieldValues, type?: string) => void;
  onCancel: () => void;
  labels: IDropOffMapStaticFieldsLabels;
  buttonsLabels?: IDropOffMapFormButtonsLabels;
  collectTypes: Array<CollectEntity>;
}

export default function DropOffMapForm({
  data,
  onSubmitValid,
  onCancel,
  labels,
  buttonsLabels,
  collectTypes,
}: IDropOffMapFormProps) {
  const contentButton = (
    <DropOffMapFormButtons<IDropOffMapStaticFields>
      onCancel={onCancel}
      labels={buttonsLabels}
      onSubmit={onSubmitValid}
    />
  );
  const fieldContent = (
    <>
      <DropOffMapStaticFields labels={labels} collectTypes={collectTypes} />
    </>
  );
  const sidebarContent = <DropOffMapSideBar />;
  const formOptions: IFormlayoutOptions<IDropOffMapStaticFields> = {
    onSubmitValid,
    defaultValues: data,
  };

  return (
    <FormLayout<IDropOffMapStaticFields>
      buttonContent={contentButton}
      formContent={fieldContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
    />
  );
}
