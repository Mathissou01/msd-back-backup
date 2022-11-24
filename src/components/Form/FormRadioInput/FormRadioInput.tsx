import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect } from "react";
import FormLabel from "../FormLabel/FormLabel";
import "./form-radio-input.scss";

interface IOption {
  value: string | number | readonly string[] | undefined;
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
}

export default function FormRadioInput({
  name,
  displayName,
  secondaryDisplayName,
  isRequired = false,
  isDisabled = false,
  options,
  defaultValue,
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
  const watchChecked = watch(name);

  useEffect(() => {
    if (watchChecked === undefined) {
      if (defaultValue) {
        setValue(name, defaultValue);
      } else {
        setValue(name, options[0].value);
      }
    }
  }, [defaultValue, name, options, setValue, watchChecked]);

  return (
    <div className="c-FormRadioInput">
      <fieldset>
        <FormLabel
          label={displayName}
          isRequired={isRequired}
          secondaryLabel={secondaryDisplayName}
          tagType="legend"
        />
        <div className="c-FormRadioInput__Options">
          {options.map((option, index) => (
            <div key={name + index} className="c-FormRadioInput__Option">
              <input
                className={`c-FormRadioInput__Input ${
                  option.value === watchChecked
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
                checked={option.value === watchChecked}
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
        render={({ message }) => <p>{message ?? "Error"}</p>}
      />
    </div>
  );
}
