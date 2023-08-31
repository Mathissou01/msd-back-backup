import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import FormLabel from "../FormLabel/FormLabel";
import "./form-checkbox.scss";

interface IFormCheckboxProps {
  name: string;
  label: string;
  secondaryLabel?: string;
  defaultChecked?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

export default function FormCheckbox({
  name,
  label,
  secondaryLabel,
  defaultChecked,
  isDisabled,
  onClick,
}: IFormCheckboxProps) {
  /* Local Data */
  const {
    register,
    formState: { isSubmitting, errors },
    watch,
  } = useFormContext();

  const watchChecked = watch(name, defaultChecked);

  return (
    <div className="c-FormCheckbox">
      <input
        className={`c-FormCheckbox__Input ${
          watchChecked ? "c-FormCheckbox__Input_checked" : ""
        }`}
        type="checkbox"
        {...register(name)}
        id={name}
        defaultChecked={defaultChecked}
        disabled={isSubmitting || isDisabled}
        data-testid="form-checkbox"
        onClick={onClick}
      />
      <FormLabel forId={name} label={label} secondaryLabel={secondaryLabel} />
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
