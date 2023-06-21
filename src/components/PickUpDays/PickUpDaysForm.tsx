import React from "react";
import { FieldValues } from "react-hook-form";
import FormLayout, {
  IFormlayoutOptions,
} from "../../layouts/FormLayout/FormLayout";

import PickUpDaysFormButtons, {
  IPickUpDaysFormButtonsLabels,
} from "./PickUpDaysFormButtons/PickUpDaysFormButtons";
import PickUpDaysFormStaticFields, {
  IPickUpDaysFormStaticFieldsLabels,
} from "./PickUpDaysFormStaticFields/PickUpDaysFormStaticFields";
import PickUpDaysSideBar from "./PickUpDaysSideBar/PickUpDaysSideBar";
import { IPickUpDayStaticMappedFields } from "../../lib/pickup-days";

interface IPickUpDaysFormProps {
  data?: IPickUpDayStaticMappedFields;
  onSubmitValid: (data: FieldValues, type?: string) => void;
  onCancel: () => void;
  labels: IPickUpDaysFormStaticFieldsLabels;
  buttonsLabels?: IPickUpDaysFormButtonsLabels;
}

export default function PickUpDaysForm({
  data,
  onSubmitValid,
  onCancel,
  labels,
  buttonsLabels,
}: IPickUpDaysFormProps) {
  const contentButton = (
    <PickUpDaysFormButtons
      onCancel={onCancel}
      labels={buttonsLabels}
      onSubmit={onSubmitValid}
    />
  );
  const fieldContent = <PickUpDaysFormStaticFields labels={labels} />;
  const sidebarContent = <PickUpDaysSideBar />;
  const formOptions: IFormlayoutOptions<IPickUpDayStaticMappedFields> = {
    onSubmitValid,
    defaultValues: data,
  };

  return (
    <FormLayout
      buttonContent={contentButton}
      formContent={fieldContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
    />
  );
}
