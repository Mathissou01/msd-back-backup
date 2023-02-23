import React from "react";
import { SzSelect } from "@suezenv/react-theme-components";
import FormLabel from "../../Form/FormLabel/FormLabel";
import "./common-select.scss";
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
}

export default function CommonSelect({
  label,
  name,
  placeholder,
  options,
  isMulti,
  maxMultiSelection,
}: ICommonSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref } }) => {
        const isMaxOptionsSelected =
          isMulti && maxMultiSelection && value?.length > maxMultiSelection - 1
            ? true
            : false;

        return (
          <FormLabel label={label}>
            <div className="c-CommonSelect">
              <SzSelect
                ref={ref}
                placeholder={placeholder}
                options={options}
                value={value}
                defaultValue={value}
                onChange={onChange}
                isSearchable={true}
                isMulti={isMulti}
                filterOption={() => (isMaxOptionsSelected ? false : true)}
                noOptionsMessage={() =>
                  isMaxOptionsSelected
                    ? "You can select a maximum of 5 options"
                    : "No options"
                }
              />
            </div>
          </FormLabel>
        );
      }}
    />
  );
}
