import React, { useEffect } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormLabel from "../FormLabel/FormLabel";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import "./form-multicheckbox.scss";

interface IOption {
  label: string;
  value: string;
  defaultChecked?: boolean;
}

interface IFormMultiCheckboxProps {
  name: string;
  label: string;
  secondaryDisplayName?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  options: Array<IOption>;
  defaultValue?: string;
  displayMode?: "vertical" | "horizontal";
  onChange?: (data: unknown) => void;
}

export default function FormMultiCheckbox({
  name,
  label,
  secondaryDisplayName,
  isRequired = false,
  isDisabled = false,
  options,
  defaultValue,
  displayMode = "horizontal",
  onChange,
}: IFormMultiCheckboxProps) {
  /* Static Data */
  const errorMessages = {
    required: "Ce champ est obligatoire ",
  };

  /* Local Data */
  const {
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useFormContext();

  const watchChecked: Array<string> = watch(name, []);

  useEffect(() => {
    if (
      Array.isArray(watchChecked) &&
      watchChecked.length === 0 &&
      defaultValue
    ) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue, watchChecked]);

  useEffect(() => {
    if (watchChecked && onChange) {
      onChange(watchChecked);
    }
  }, [watchChecked, onChange]);

  return (
    <div className="c-FormMultiCheckbox">
      <fieldset>
        <FormLabel
          label={label}
          isRequired={isRequired}
          secondaryLabel={secondaryDisplayName}
          tagType="legend"
        />
        <div
          className={classNames("c-FormMultiCheckbox__Options", {
            "c-FormMultiCheckbox__Options_horizontal":
              displayMode === "horizontal",
            "c-FormMultiCheckbox__Options_vertical": displayMode === "vertical",
          })}
        >
          {options.map((option, index) => (
            <div key={index} className="c-FormMultiCheckbox__Option">
              <input
                className={`c-FormMultiCheckbox__Input ${
                  Array.isArray(watchChecked) &&
                  watchChecked.find((item) => item === option.value)
                    ? "c-FormMultiCheckbox__Input_checked"
                    : ""
                }`}
                type="checkbox"
                {...register(name, {
                  required: {
                    value: isRequired,
                    message: errorMessages.required,
                  },
                })}
                id={name + index}
                value={option.value}
                defaultChecked={option.defaultChecked}
                disabled={isSubmitting || isDisabled}
                data-testid={`form-multi-checkbox_${index}`}
              />
              <FormLabel forId={name + index} label={option.label} />
            </div>
          ))}
        </div>
      </fieldset>
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
