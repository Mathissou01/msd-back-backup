import _ from "lodash";
import classNames from "classnames";
import React from "react";
import Select from "react-select";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormLabel from "../FormLabel/FormLabel";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import "./form-single-multiselect.scss";

export type ICommonSelectOption = {
  value: string | number;
  label: string;
};

interface ICommonSelectProps {
  label?: string;
  labelDescription?: string;
  validationLabel?: string;
  name: string;
  options: Array<ICommonSelectOption>;
  isMulti: boolean;
  maxMultiSelection?: number;
  isRequired?: boolean;
  isDisabled?: boolean;
  onInputChange?: (event: string) => void;
}

export default function FormMultiselect({
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
}: ICommonSelectProps) {
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
        label={label}
        labelDescription={labelDescription}
        validationLabel={validationLabel}
        isRequired={isRequired}
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
                options={options}
                value={value}
                placeholder=""
                name="tags"
                isMulti
                onInputChange={onInputChange}
                onChange={onChange}
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
