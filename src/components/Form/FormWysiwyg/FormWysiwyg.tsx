import _ from "lodash";
import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import { Controller, useFormContext } from "react-hook-form";
import { Editor as TinyMceEditor } from "tinymce";
import React, { useRef } from "react";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";
import FormLabel from "../FormLabel/FormLabel";
import WysiwygEditor, {
  IWysiwygEditorOptions,
} from "./WysiwygEditor/WysiwygEditor";
import "./form-wysiwyg.scss";

interface IFormInputProps {
  name: string;
  label: string;
  isVisible: boolean;
  validationLabel?: string;
  editorOptions?: IWysiwygEditorOptions;
  isRequired?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
}

export default function FormWysiwyg({
  name,
  label,
  isVisible,
  validationLabel,
  editorOptions,
  isRequired = false,
  isDisabled = false,
  defaultValue,
}: IFormInputProps) {
  /* Static Data */
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  /* Local Data */
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const editorRef = useRef<TinyMceEditor | null>(null);

  return (
    <div className="c-FormWysiwyg">
      <FormLabel
        forId={name}
        label={label}
        isRequired={isRequired}
        validationLabel={validationLabel}
      >
        <Controller
          control={control}
          name={name}
          rules={{
            required: { value: isRequired, message: errorMessages.required },
          }}
          defaultValue={defaultValue}
          render={({ field: { onChange, value, ref } }) => {
            return (
              <div
                className={classNames("c-FormWysiwyg__Input", {
                  "c-FormWysiwyg__Input_invalid": _.get(errors, name),
                })}
                ref={ref}
                id={name}
                data-testid="form-wysiwyg"
              >
                {isVisible && (
                  <WysiwygEditor
                    id={name}
                    forwardedRef={editorRef}
                    onEditorChange={onChange}
                    editorOptions={editorOptions}
                    value={value}
                    isDisabled={isSubmitting || isDisabled}
                  />
                )}
              </div>
            );
          }}
        />
      </FormLabel>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <CommonErrorText message={message} errorId={`${name}_error`} />
        )}
      />
    </div>
  );
}
