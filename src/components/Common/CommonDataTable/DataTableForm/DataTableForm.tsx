import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React from "react";
import CommonButton from "../../CommonButton/CommonButton";
import "./data-table-form.scss";

export interface ICommonDataTableValidation {
  isValid: boolean;
  errorMessage: string;
}

interface ICommonDataTableProps {
  children: React.ReactNode;
  title?: string;
  submitButtonLabel?: string;
  validationFunction?: (data: FieldValues) => ICommonDataTableValidation;
  onFormSubmit?: (data: FieldValues) => void;
}

export default function DataTableForm({
  children,
  title,
  submitButtonLabel = "Ajouter",
  validationFunction,
  onFormSubmit,
}: ICommonDataTableProps) {
  /* Static Data */
  async function onSubmit(submitData: FieldValues) {
    const validation = validationFunction?.(submitData);
    if (typeof validation === "undefined" || validation?.isValid) {
      form.reset();
      onFormSubmit?.(submitData);
    } else {
      // TODO: show error message, where ?
      console.log(validation.errorMessage);
    }
  }

  /* Local Data */
  const form = useForm({
    mode: "onChange",
  });
  const { handleSubmit, formState, watch } = form;
  const { isDirty, isSubmitting } = formState;
  const values = watch();

  return (
    <FormProvider {...form}>
      <form className="c-DataTableForm" onSubmit={handleSubmit(onSubmit)}>
        {title && <div className="c-DataTableForm__Title">{title}</div>}
        <div className="c-DataTableForm__Content">
          <div className="c-DataTableForm__Inputs">{children}</div>
          <CommonButton
            type="submit"
            label={submitButtonLabel}
            style="primary"
            isDisabled={
              isSubmitting ||
              !isDirty ||
              !Object.values(values)?.every((value) => value?.length > 0)
            }
          />
        </div>
      </form>
    </FormProvider>
  );
}
