import _ from "lodash";
import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import React from "react";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import FormLabel, { LabelStyle, ValidationStyle } from "../FormLabel/FormLabel";
import "./form-input.scss";

interface IFormInputProps {
  type?: "number" | "text" | "email" | "password" | "url" | "time" | "hidden";
  name: string;
  label?: string;
  secondaryLabel?: string;
  validationLabel?: string;
  informationLabel?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isHidden?: boolean;
  minLengthValidation?: number;
  maxLengthValidation?: number;
  minNumberValidation?: number;
  maxNumberValidation?: number;
  step?: number;
  patternValidation?: RegExp;
  patternValidationErrorMessage?: string;
  lengthHardValidation?: boolean;
  defaultValue?: string;
  placeholder?: string;
  flexStyle?: "column" | "row";
  labelStyle?: LabelStyle;
  validationStyle?: ValidationStyle;
  tagType?: "input" | "textarea";
}

export default function FormInput({
  type,
  name,
  label,
  secondaryLabel,
  validationLabel,
  informationLabel,
  isRequired = false,
  isDisabled = false,
  isHidden = false,
  minLengthValidation,
  maxLengthValidation,
  minNumberValidation,
  maxNumberValidation,
  step,
  patternValidation,
  patternValidationErrorMessage = "Format incorrect",
  lengthHardValidation = true,
  defaultValue,
  placeholder,
  flexStyle = "column",
  labelStyle,
  validationStyle = "inline",
  tagType = "input",
}: IFormInputProps) {
  /* Static Data */
  const errorMessages = {
    required: "Ce champ est obligatoire",
    minLength: `${minLengthValidation} caractères minimum`,
    maxLength: `${maxLengthValidation} caractères maximum`,
    minNumber: `Valeur minimum: ${minNumberValidation}`,
    maxNumber: `Valeur maximum: ${maxNumberValidation}`,
    pattern: patternValidationErrorMessage,
  };
  const Tag = tagType;

  /* Local Data */
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const inputClassNames = classNames("c-FormInput", {
    "c-FormInput_row": flexStyle === "row",
    "c-FormInput_hidden": isHidden,
  });

  return (
    <div className={inputClassNames}>
      <FormLabel
        forId={name}
        label={label}
        isRequired={isRequired}
        secondaryLabel={secondaryLabel}
        validationLabel={validationLabel}
        informationLabel={informationLabel}
        flexStyle={flexStyle}
        labelStyle={labelStyle}
        validationStyle={validationStyle}
      >
        <Tag
          className={classNames("c-FormInput__Input", {
            "c-FormInput__Input_invalid": !!_.get(errors, name),
          })}
          {...register(name, {
            required: { value: isRequired, message: errorMessages.required },
            minLength:
              !lengthHardValidation && minLengthValidation
                ? {
                    value: minLengthValidation,
                    message: errorMessages.minLength,
                  }
                : undefined,
            maxLength:
              !lengthHardValidation && maxLengthValidation
                ? {
                    value: maxLengthValidation,
                    message: errorMessages.maxLength,
                  }
                : undefined,
            min: minNumberValidation
              ? {
                  value: minNumberValidation,
                  message: errorMessages.minNumber,
                }
              : undefined,
            max: maxNumberValidation
              ? {
                  value: maxNumberValidation,
                  message: errorMessages.maxNumber,
                }
              : undefined,
            pattern: patternValidation
              ? {
                  value: patternValidation,
                  message: errorMessages.pattern,
                }
              : undefined,
          })}
          type={type}
          id={name}
          defaultValue={defaultValue}
          minLength={lengthHardValidation ? minLengthValidation : undefined}
          maxLength={lengthHardValidation ? maxLengthValidation : undefined}
          step={step}
          placeholder={placeholder}
          disabled={isSubmitting || isDisabled}
          hidden={isHidden}
          aria-invalid={!!_.get(errors, name)}
          aria-errormessage={`${name}_error`}
          data-testid="form-input"
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
