import _ from "lodash";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { removeNulls } from "../../../lib/utilities";
import { IEditoFields, TDynamicFieldOption } from "../../../lib/edito";
import EditoButtons from "./EditoButtons/EditoButtons";
import EditoStaticFields from "./EditoStaticFields/EditoStaticFields";
import EditoDynamicFields from "./EditoDynamicFields/EditoDynamicFields";
import EditoSideBar from "./EditoSideBar/EditoSideBar";
import "./edito-form.scss";

interface IEditoFormProps {
  data?: IEditoFields;
  dynamicFieldsOptions: Array<TDynamicFieldOption>;
  onSubmitValid: (data: FieldValues) => void;
}

export default function EditoForm({
  data,
  dynamicFieldsOptions,
  onSubmitValid,
}: IEditoFormProps) {
  /* Static data */

  /* Local Data */
  const form = useForm({
    mode: "onChange",
    defaultValues: data,
    shouldFocusError: false,
  });
  const [formData, setFormData] = useState<IEditoFields>();
  const [canFocus, setCanFocus] = useState(false);
  const { handleSubmit } = form;

  function onError() {
    setCanFocus(true);
  }

  useEffect(() => {
    if (form.formState.errors && canFocus) {
      const errors = form.formState.errors;
      const elements = Object.keys(errors)
        .map((name) => {
          if (name === "blocks" && errors[name]) {
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
  }, [form, canFocus]);

  useEffect(() => {
    if (data) {
      const mappedData = {
        ...data,
      };
      setFormData(mappedData);
      form.reset(mappedData);
    }
  }, [data, form]);

  return (
    <>
      <FormProvider {...form}>
        <form
          className="c-EditoForm"
          onSubmit={handleSubmit(onSubmitValid, onError)}
        >
          <div className="c-EditoForm__Buttons">
            <EditoButtons />
          </div>
          <div className="c-EditoForm__Form">
            <div className="c-EditoForm__Content">
              <EditoStaticFields />
              <EditoDynamicFields
                blockOptions={dynamicFieldsOptions}
                defaultValues={data?.blocks}
              />
            </div>
            <div className="c-EditoForm__SideBar">
              <EditoSideBar status={formData?.status} />
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
