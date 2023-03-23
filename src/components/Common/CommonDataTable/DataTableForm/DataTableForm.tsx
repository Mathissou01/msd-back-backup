import classNames from "classnames";
import { FormProvider, useForm } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React from "react";
import { ICommonDataTableValidation } from "../CommonDataTable";
import CommonButton from "../../CommonButton/CommonButton";
import "./data-table-form.scss";

interface ICommonDataFormProps {
  children: React.ReactNode;
  title?: string;
  submitButtonLabel?: string;
  validationFunction?: (data: FieldValues) => ICommonDataTableValidation;
  onFormSubmit?: (data: FieldValues) => void;
  invalidStyle?: "rowInput";
}

export default function DataTableForm({
  children,
  title,
  submitButtonLabel = "Ajouter",
  validationFunction,
  onFormSubmit,
  invalidStyle = "rowInput",
}: ICommonDataFormProps) {
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
  const { isDirty, isSubmitting, errors } = formState;
  const values = watch();

  const formClasses = classNames("c-DataTableForm", {
    "c-DataTableForm_invalid":
      invalidStyle === "rowInput" && Object.keys(errors).length > 0,
  });

  return (
    <FormProvider {...form}>
      <form className={formClasses} onSubmit={handleSubmit(onSubmit)}>
        {title && <div className="c-DataTableForm__Title">{title}</div>}
        <div className="c-DataTableForm__Content">
          <div className="c-DataTableForm__Inputs">{children}</div>
          <div className="c-DataTableForm__Button">
            <CommonButton
              type="submit"
              label={submitButtonLabel}
              style="primary"
              isDisabled={
                isSubmitting ||
                !isDirty ||
                Object.keys(errors).length > 0 ||
                !Object.values(values)?.some((value) => value?.length > 0)
              }
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
