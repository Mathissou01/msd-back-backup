import _ from "lodash";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useState } from "react";
import { IOptionWrapper } from "../FormMultiselect/FormMultiselect";
import FormLabel from "../FormLabel/FormLabel";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import "./form-select.scss";

interface IFormSelectProps<T> {
  name: string;
  label: string;
  secondaryLabel?: string;
  displayTransform?: (...args: Array<T>) => string;
  isRequired?: boolean;
  isDisabled?: boolean;
  options: Array<IOptionWrapper<T>>;
  optionKey?: keyof T & string;
  defaultValue?: T;
  noneSelectedLabel?: string;
  informationLabel?: string;
}

export default function FormSelect<T>({
  name,
  label,
  secondaryLabel,
  displayTransform,
  isRequired = false,
  isDisabled = false,
  options,
  optionKey,
  defaultValue,
  noneSelectedLabel,
  informationLabel,
}: IFormSelectProps<T>) {
  /* Static Data */
  noneSelectedLabel = noneSelectedLabel ?? "- Sélectionnez un élément -";
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  /* Local Data */
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const {
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const watchValue = watch(name);
  register(name, {
    required: { value: isRequired, message: errorMessages.required },
    value: defaultValue ?? null,
  });

  useEffect(() => {
    const matchIndex = options.findIndex(
      (wrapper) =>
        wrapper &&
        (optionKey
          ? wrapper.option?.[optionKey] === watchValue?.[optionKey]
          : wrapper.option === watchValue),
    );
    if (matchIndex !== selectedIndex) {
      setSelectedIndex(matchIndex);
    }
  }, [watchValue, options, optionKey, selectedIndex, setSelectedIndex]);

  function renderGroups() {
    return [...new Map(options.map((item) => [item["group"], item]))].map(
      (group, index) => {
        const groupOptions = options.filter(
          (option) => option.group === group[0],
        );
        return (
          groupOptions.length > 0 && (
            <optgroup
              className="o-SelectWrapper__OptGroup"
              key={`${name}_${index}_${group[0]}`}
              label={group[0]}
            >
              {renderOptions(groupOptions)}
            </optgroup>
          )
        );
      },
    );
  }

  function renderOptions(options: Array<IOptionWrapper<T>>) {
    return options.map((wrapper, index) => {
      return (
        wrapper.option && (
          <option
            className="o-SelectWrapper__Option"
            key={`${name}_${index}`}
            value={index}
          >
            {wrapper.option && !wrapper.label
              ? displayTransform
                ? displayTransform(wrapper.option)
                : optionKey
                ? wrapper.option[optionKey]?.toString()
                : wrapper.option.toString()
              : wrapper.label}
          </option>
        )
      );
    });
  }

  return (
    <div className="c-FormSelect">
      <FormLabel
        forId={name}
        label={label}
        isRequired={isRequired}
        secondaryLabel={secondaryLabel}
        informationLabel={informationLabel}
      />
      <div className="o-SelectWrapper">
        <select
          className={classNames("o-SelectWrapper__Select", {
            "o-SelectWrapper__Select_placeholder": selectedIndex < 0,
            "o-SelectWrapper__Select_invalid": _.get(errors, name),
          })}
          id={name}
          value={selectedIndex}
          onChange={(event) => {
            const index = Number.parseInt(event.target.value);
            setValue(name, options[index]?.option ?? null, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
          disabled={isSubmitting || isDisabled}
          aria-invalid={!!_.get(errors, name)}
          aria-errormessage={`${name}_error`}
          data-testid="form-select"
        >
          <option disabled={isRequired} hidden={isRequired} value={-1}>
            {noneSelectedLabel}
          </option>
          {options.every((wrapper) => wrapper.group)
            ? renderGroups()
            : renderOptions(options)}
        </select>
      </div>
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
