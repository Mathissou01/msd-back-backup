import _ from "lodash";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import { removeNulls } from "../../lib/utilities";
import "./form-layout.scss";

export interface IFormlayoutOptions<Fields> {
  onSubmitValid: (data: FieldValues) => void;
  defaultValues?: Fields;
  nestedFieldsToFocus?: Array<string>;
}

interface IFormLayoutProps<Fields> {
  buttonContent: ReactNode;
  formContent: ReactNode;
  sidebarContent: ReactNode;
  formOptions: IFormlayoutOptions<Fields>;
}

export default function FormLayout<Fields extends FieldValues>({
  buttonContent,
  formContent,
  sidebarContent,
  formOptions,
}: IFormLayoutProps<Fields>) {
  /* Local Data */
  const form = useForm<Fields>({
    mode: "onChange",
    // TODO: strange typing error where <Fields> seems unassignable to <DeepPartial<Fields>> ?
    defaultValues: formOptions.defaultValues as DefaultValues<Fields>,
    shouldFocusError: false,
  });
  const [canFocus, setCanFocus] = useState(false);
  const { handleSubmit, reset } = form;

  function onError() {
    setCanFocus(true);
  }

  useEffect(() => {
    reset(formOptions.defaultValues);
  }, [formOptions, reset]);

  useEffect(() => {
    if (formOptions.nestedFieldsToFocus && form.formState.errors && canFocus) {
      const errors = form.formState.errors;
      const elements = Object.keys(errors)
        .map((name) => {
          if (formOptions.nestedFieldsToFocus?.includes(name) && errors[name]) {
            const blocksErrors = { ...errors[name] };
            return Object.keys(blocksErrors)
              .map((block) => {
                const blockErrors = _.get(blocksErrors, block);
                return Object.keys(blockErrors).map((field) =>
                  document.getElementById(`${name}.${block}.${field}`),
                );
              })
              .flat();
          }
          return document.getElementById(name);
        })
        .flat()
        .filter(removeNulls);
      elements.sort(
        (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
      );
      if (elements.length > 0) {
        const errorElement = elements[0];
        setTimeout(() => {
          errorElement.focus({ preventScroll: true });
          errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
        setCanFocus(false);
      }
    }
  }, [form, canFocus, formOptions.nestedFieldsToFocus]);

  return (
    <>
      <FormProvider {...form}>
        <form
          className="c-FormLayout"
          onSubmit={handleSubmit(formOptions.onSubmitValid, onError)}
        >
          <div className="c-FormLayout__Buttons">{buttonContent}</div>
          <div className="c-FormLayout__Form">
            <div className="c-FormLayout__Content">{formContent}</div>
            <div className="c-FormLayout__SideBar">{sidebarContent}</div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
