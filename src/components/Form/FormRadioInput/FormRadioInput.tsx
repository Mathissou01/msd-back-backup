import React, { useEffect } from "react";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormLabel from "../FormLabel/FormLabel";
import "./form-radio-input.scss";

interface IOption {
  value: string | number;
  label: string;
}

interface IFormRadioInputProps {
  name: string;
  displayName: string;
  secondaryDisplayName?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  options: Array<IOption>;
  defaultValue?: string;
  displayMode?: "vertical" | "horizontal";
  onChange?: (data: unknown) => void;
}

export default function FormRadioInput({
  name,
  displayName,
  secondaryDisplayName,
  isRequired = false,
  isDisabled = false,
  options,
  defaultValue,
  displayMode = "horizontal",
  onChange,
}: IFormRadioInputProps) {
  /* Static Data */
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  /* Local Data */
  const {
    register,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const watchChecked: string | number = watch(name);

  useEffect(() => {
    if (watchChecked === undefined && defaultValue) {
      setValue(name, defaultValue);
    }
  }, [defaultValue, name, setValue, watchChecked]);

  useEffect(() => {
    if (watchChecked && onChange) {
      onChange(watchChecked);
    }
    // eslint-disable-next-line
  }, [watchChecked]);

  return (
    <div className="c-FormRadioInput">
      <fieldset>
        <FormLabel
          label={displayName}
          isRequired={isRequired}
          secondaryLabel={secondaryDisplayName}
          tagType="legend"
        />
        <div
          className={classNames("c-FormRadioInput__Options", {
            "c-FormRadioInput__Options_horizontal":
              displayMode === "horizontal",
            "c-FormRadioInput__Options_vertical": displayMode === "vertical",
          })}
        >
          {options.map((option, index) => (
            <div key={name + index} className="c-FormRadioInput__Option">
              <input
                className={`c-FormRadioInput__Input ${
                  option.value.toString() === watchChecked
                    ? "c-FormRadioInput__Input_checked"
                    : ""
                }`}
                {...register(name, {
                  required: {
                    value: isRequired,
                    message: errorMessages.required,
                  },
                })}
                type="radio"
                id={name + index}
                value={option.value}
                checked={option.value.toString() === watchChecked}
                disabled={isSubmitting || isDisabled}
                data-testid={`form-radio-input_${index}`}
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
          <p>{message ?? "Error"}</p>
        )}
      />
    </div>
  );
}
