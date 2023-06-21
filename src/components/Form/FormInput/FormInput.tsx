import _ from "lodash";
import classNames from "classnames";
import { ErrorMessage } from "@hookform/error-message";
import { ValidationRule } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import React from "react";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";
import FormLabel, { LabelStyle, ValidationStyle } from "../FormLabel/FormLabel";
import "./form-input.scss";

interface IFormInputProps {
  type?: "number" | "text" | "email" | "password" | "time" | "hidden";
  name: string;
  label?: string;
  secondaryLabel?: string;
  validationLabel?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  minLengthValidation?: number;
  maxLengthValidation?: number;
  patternValidation?: ValidationRule<RegExp>;
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
  isRequired = false,
  isDisabled = false,
  minLengthValidation,
  maxLengthValidation,
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
  });

  return (
    <div className={inputClassNames}>
      <FormLabel
        forId={name}
        label={label}
        isRequired={isRequired}
        secondaryLabel={secondaryLabel}
        validationLabel={validationLabel}
        flexStyle={flexStyle}
        labelStyle={labelStyle}
        validationStyle={validationStyle}
      >
        <Tag
          className={classNames("c-FormInput__Input", {
            "c-FormInput__Input_invalid": _.get(errors, name),
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
            pattern: patternValidation ? patternValidation : undefined,
          })}
          type={type}
          id={name}
          defaultValue={defaultValue}
          minLength={lengthHardValidation ? minLengthValidation : undefined}
          maxLength={lengthHardValidation ? maxLengthValidation : undefined}
          placeholder={placeholder}
          disabled={isSubmitting || isDisabled}
          aria-invalid={!!_.get(errors, name)}
          aria-errormessage={`${name}_error`}
          data-testid="form-input"
        />
      </FormLabel>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }: { message: string }) => (
          <CommonErrorText message={message} errorId={`${name}_error`} />
        )}
      />
    </div>
  );
}
