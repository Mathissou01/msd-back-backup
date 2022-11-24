import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import React from "react";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";
import FormLabel from "../FormLabel/FormLabel";
import "./form-input.scss";

interface IFormInputProps {
  type: "number" | "text" | "email" | "password";
  name: string;
  label: string;
  secondaryLabel?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
}

export default function FormInput({
  type,
  name,
  label,
  secondaryLabel,
  isRequired = false,
  isDisabled = false,
  defaultValue,
  placeholder,
}: IFormInputProps) {
  /* Static Data */
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  /* Local Data */
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  return (
    <div className="c-FormInput">
      <FormLabel
        forId={name}
        label={label}
        isRequired={isRequired}
        secondaryLabel={secondaryLabel}
      />
      <input
        className={`c-FormInput__Input ${
          errors[name] ? "c-FormInput__Input_invalid" : ""
        }`}
        {...register(name, {
          required: { value: isRequired, message: errorMessages.required },
        })}
        type={type}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={isSubmitting || isDisabled}
        aria-invalid={!!errors[name]}
        aria-errormessage={`${name}_error`}
        data-testid="form-input"
      />
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
