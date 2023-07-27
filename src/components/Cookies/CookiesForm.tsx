import React from "react";
import { FieldValues } from "react-hook-form";
import { IFormCommonFields } from "../../lib/form";
import { EStatus } from "../../lib/status";
import FormLayout, {
  IFormlayoutOptions,
} from "../../layouts/FormLayout/FormLayout";
import CookiesFormButtons, {
  ICookiesFormButtonsLabels,
} from "./CookiesFormButtons/CookiesFormButtons";
import { ICookiesStaticFieldsLabels } from "./CookiesStaticFields/CookiesStaticFields";
import CookiesSideBar from "./CookiesSideBar/CookiesSideBar";
import CookiesStaticFields from "./CookiesStaticFields/CookiesStaticFields";
import "./cookies-form.scss";

export interface ICookiesStaticFields extends IFormCommonFields {
  status?: EStatus;
  title: string;
  isActivated: boolean;
}
interface ICookiesFormProps {
  data?: ICookiesStaticFields;
  onPreview?: () => void;
  onCancel: () => void;
  onSubmit: (data: FieldValues, type?: string) => void;
  onChangeActivated: () => void;
  labels: ICookiesStaticFieldsLabels;
  buttonLabels?: ICookiesFormButtonsLabels;
}

export default function CookiesForm({
  data,
  onPreview,
  onCancel,
  onSubmit,
  onChangeActivated,
  labels,
  buttonLabels,
}: ICookiesFormProps) {
  const contentButton = (
    <CookiesFormButtons<ICookiesFormButtonsLabels>
      onPreview={onPreview}
      onCancel={onCancel}
      labels={buttonLabels}
      isActivated={data ? data.isActivated : false}
      onSubmit={onSubmit}
      onChangeActivated={onChangeActivated}
    />
  );
  const fieldContent = (
    <>
      <CookiesStaticFields labels={labels} />
    </>
  );
  const sidebarContent = <CookiesSideBar />;
  const formOptions: IFormlayoutOptions<ICookiesStaticFields> = {
    onSubmitValid: onSubmit,
    defaultValues: data,
  };

  return (
    <FormLayout<ICookiesStaticFields>
      buttonContent={contentButton}
      formContent={fieldContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
    />
  );
}
