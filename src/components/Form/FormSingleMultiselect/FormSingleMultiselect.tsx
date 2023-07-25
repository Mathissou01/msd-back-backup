import _ from "lodash";
import classNames from "classnames";
import React from "react";
import Select, { MultiValue } from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormLabel from "../FormLabel/FormLabel";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import "./form-single-multiselect.scss";

export type IFormSingleMultiselectOption = {
  value: string | number;
  label: string;
};

interface IFormSingleMultiselectProps {
  label?: string;
  labelDescription?: string;
  validationLabel?: string;
  name: string;
  options: Array<IFormSingleMultiselectOption>;
  isMulti: boolean;
  maxMultiSelection?: number;
  isRequired?: boolean;
  isDisabled?: boolean;
  onInputChange?: (value: string) => void;
  onSelectChange?: (value: MultiValue<IFormSingleMultiselectOption>) => void;
}

export default function FormSingleMultiselect({
  label,
  labelDescription,
  validationLabel,
  name,
  options,
  isMulti,
  maxMultiSelection,
  isRequired = false,
  isDisabled = false,
  onInputChange,
  onSelectChange,
}: IFormSingleMultiselectProps) {
  /* Static Data */
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  /* Local Data */
  const {
    control,
    formState: { isSubmitting, errors },
  } = useFormContext();

  return (
    <>
      <FormLabel
        forId={name}
        label={label}
        isRequired={isRequired}
        labelDescription={labelDescription}
        validationLabel={validationLabel}
      >
        <Controller
          control={control}
          name={name}
          rules={{
            required: { value: isRequired, message: errorMessages.required },
          }}
          render={({ field: { onChange, value } }) => {
            const isMaxOptionsSelected = !!(
              isMulti &&
              maxMultiSelection &&
              value?.length > maxMultiSelection - 1
            );
            return (
              <Select
                className={classNames("c-FormSingleMultiselect__Input", {
                  "c-FormSingleMultiselect__Input_invalid": _.get(errors, name),
                })}
                id={name}
                options={options}
                value={value}
                placeholder=""
                name="tags"
                isMulti
                onInputChange={onInputChange}
                onChange={(value) => {
                  onChange(value);
                  onSelectChange?.(value);
                }}
                defaultValue={value}
                filterOption={() => !isMaxOptionsSelected}
                noOptionsMessage={() =>
                  isMaxOptionsSelected
                    ? `${maxMultiSelection} options maximum`
                    : "Pas d'options"
                }
                classNamePrefix="form-single-multiselect"
                isDisabled={isSubmitting || isDisabled}
                aria-invalid={!!_.get(errors, name)}
                aria-errormessage={`${name}_error`}
              />
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
    </>
  );
}
