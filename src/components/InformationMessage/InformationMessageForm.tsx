import React from "react";
import { FieldValues } from "react-hook-form";
import FormLayout, {
  IFormlayoutOptions,
} from "../../layouts/FormLayout/FormLayout";
import InformationMessageFormButtons, {
  IInformationMessageFormButtonsLabels,
} from "./InformationMessageFormButtons/InformationMessageFormButtons";
import InformationMessageFormReturnButton from "./InformationMessageFormReturnButton/InformationMessageFormReturnButton";
import InformationMessageFormStaticFields, {
  IInformationMessageFormStaticFieldsLabels,
} from "./InformationMessageFormStaticFields/InformationMessageFormStaticFields";

interface IInformationMessageStaticFields {
  infoMessage: string;
  date: [Date, Date];
  pickUpDays: Array<{ value: string; label: string }>;
}

interface IInformationMessageFormProps {
  data?: IInformationMessageStaticFields;
  onSubmitValid: (data: FieldValues, type?: string) => void;
  onCancel: () => void;
  labels: IInformationMessageFormStaticFieldsLabels;
  buttonsLabels?: IInformationMessageFormButtonsLabels;
}

export default function InformationMessageForm({
  data,
  onSubmitValid,
  onCancel,
  labels,
  buttonsLabels,
}: IInformationMessageFormProps) {
  const returnButton = <InformationMessageFormReturnButton />;
  const contentButton = (
    <InformationMessageFormButtons
      onCancel={onCancel}
      labels={buttonsLabels}
      onSubmit={onSubmitValid}
    />
  );
  const fieldContent = <InformationMessageFormStaticFields labels={labels} />;
  const formOptions: IFormlayoutOptions<IInformationMessageStaticFields> = {
    onSubmitValid,
    defaultValues: data,
  };

  return (
    <FormLayout
      returnButton={returnButton}
      buttonContent={contentButton}
      formContent={fieldContent}
      formOptions={formOptions}
    />
  );
}
