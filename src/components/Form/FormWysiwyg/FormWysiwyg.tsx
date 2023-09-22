import _ from "lodash";
import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import { Controller, useFormContext } from "react-hook-form";
import { Editor as TinyMceEditor } from "tinymce";
import React, { useRef } from "react";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import FormLabel from "../FormLabel/FormLabel";
import WysiwygEditor, {
  IWysiwygEditorOptions,
} from "./WysiwygEditor/WysiwygEditor";
import "./form-wysiwyg.scss";

interface IFormInputProps {
  name: string;
  label: string;
  labelDescription?: string;
  isVisible?: boolean;
  validationLabel?: string;
  secondaryLabel?: string;
  editorOptions?: IWysiwygEditorOptions;
  isRequired?: boolean;
  isDisabled?: boolean;
  maxCharacterLength?: number;
  defaultValue?: string;
}

export default function FormWysiwyg({
  name,
  label,
  labelDescription,
  isVisible = true,
  validationLabel,
  secondaryLabel,
  editorOptions,
  isRequired = false,
  isDisabled = false,
  maxCharacterLength,
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
    watch,
  } = useFormContext();
  const editorRef = useRef<TinyMceEditor | null>(null);
  const idBlockPosition = parseInt(name.match(/\d+/)?.[0] || "0", 10);
  const blockIndex = watch("blocks")?.[idBlockPosition]?.id ?? "";

  return (
    <div className="c-FormWysiwyg">
      <FormLabel
        forId={name}
        label={label}
        labelDescription={labelDescription}
        isRequired={isRequired}
        validationLabel={validationLabel}
        secondaryLabel={secondaryLabel}
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
                  "c-FormWysiwyg__Input_disabled": isDisabled,
                })}
                ref={ref}
                id={name}
                data-testid="form-wysiwyg"
              >
                {isVisible && (
                  <WysiwygEditor
                    id={name + blockIndex}
                    forwardedRef={editorRef}
                    onEditorChange={(a: string) => {
                      // This condition fixes an issue on Firefox (we couldn't add spaces after special characters)
                      if (a.slice(a.length - 5, a.length) === " </p>") {
                        a = `${a.slice(0, a.length - 5)}&nbsp;</p>`;
                        onChange(a);
                      } else {
                        onChange(a);
                      }
                    }}
                    editorOptions={editorOptions}
                    value={value}
                    isDisabled={isSubmitting || isDisabled}
                    maxCharacterLength={maxCharacterLength}
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
        render={({ message }: { message: string }) => (
          <CommonFormErrorText message={message} errorId={`${name}_error`} />
        )}
      />
    </div>
  );
}
