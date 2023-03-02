import React from "react";
import Select from "react-select";
import FormLabel from "../FormLabel/FormLabel";
import "./form-single-multiselect.scss";
import { Controller, useFormContext } from "react-hook-form";

export type ICommonSelectOption = {
  value: string; // Suez component library only supports a value which is a string
  label: string;
};

interface ICommonSelectProps {
  label: string;
  name: string;
  placeholder: string;
  options: Array<ICommonSelectOption>;
  isMulti: boolean;
  maxMultiSelection?: number;
  isRequired?: boolean;
  isDisabled?: boolean;
}

export default function FormMultiselect({
  label,
  name,
  options,
  isMulti,
  maxMultiSelection,
}: ICommonSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const isMaxOptionsSelected =
          isMulti && maxMultiSelection && value?.length > maxMultiSelection - 1
            ? true
            : false;

        return (
          <FormLabel label={label}>
            <div className="c-CommonSelect">
              <Select
                options={options}
                value={value}
                placeholder=""
                name="tags"
                isMulti
                onChange={onChange}
                defaultValue={value}
                filterOption={() => (isMaxOptionsSelected ? false : true)}
                noOptionsMessage={() =>
                  isMaxOptionsSelected
                    ? `${maxMultiSelection} options maximum`
                    : "Pas d'options"
                }
                classNamePrefix="form-single-multiselect"
              />
            </div>
          </FormLabel>
        );
      }}
    />
  );
}
