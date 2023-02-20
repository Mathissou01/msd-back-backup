import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { isString, removeNulls } from "../../../lib/utilities";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";
import FormLabel from "../FormLabel/FormLabel";
import "./form-multiselect.scss";

export interface IOptionWrapper<T> {
  group?: string;
  label?: string;
  option: T | null;
}

export function mapOptionsInWrappers<T extends { [index: string]: unknown }>(
  options: Array<T | null>,
  fieldToGroup?: string,
): Array<IOptionWrapper<T>> {
  const mappedOptions: Array<IOptionWrapper<T> | null> = options.map(
    (option) => {
      const group = option && fieldToGroup ? option[fieldToGroup] : null;
      return option
        ? {
            option: option,
            group: isString(group) ? group : undefined,
          }
        : null;
    },
  );
  return mappedOptions.filter(removeNulls);
}

interface IFormMultiselectProps<T> {
  name: string;
  label: string;
  secondaryLabel?: string;
  displayTransform: (...args: Array<T>) => string;
  isRequired?: boolean;
  isDisabled?: boolean;
  selectAmount: number;
  options: Array<IOptionWrapper<T>>;
  optionKey: keyof T & string;
  defaultValues?: Array<T>;
  noneSelectedLabel?: string;
}

export default function FormMultiselect<T>({
  name,
  label,
  secondaryLabel,
  displayTransform,
  isRequired = false,
  isDisabled = false,
  options,
  selectAmount,
  optionKey,
  defaultValues,
  noneSelectedLabel,
}: IFormMultiselectProps<T>) {
  /* Static Data */
  noneSelectedLabel = noneSelectedLabel ?? "- Sélectionnez un élément -";
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  /* Local Data */
  const [selectedIndexes, setSelectedIndexes] = useState<Array<number>>(
    Array(selectAmount).fill(-1),
  );
  const indexesRef = useRef(selectedIndexes);
  const {
    register,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useFormContext();
  for (let i = 0; i < selectAmount; i++) {
    register(`${name}_${i}`, {
      required: {
        value: isRequired,
        message: errorMessages.required,
      },
      value: defaultValues?.[i] ?? null,
    });
  }
  const watchValues: Array<Record<string, unknown>> = useMemo(() => {
    const values = [];
    for (let i = 0; i < selectAmount; i++) {
      values[i] = watch(`${name}_${i}`);
    }
    return values;
  }, [name, selectAmount, watch]);

  useEffect(() => {
    indexesRef.current = selectedIndexes;
  }, [selectedIndexes]);

  useEffect(() => {
    const updatedArray = [...indexesRef.current];
    for (let i = 0; i < selectAmount; i++) {
      updatedArray[i] = options.findIndex(
        (wrapper) =>
          wrapper?.option &&
          wrapper.option?.[optionKey] === watchValues[i]?.[optionKey],
      );
    }
    setSelectedIndexes(updatedArray);
  }, [selectAmount, options, optionKey, watchValues]);

  const renderGroups = (i: number) => {
    let persistentIndex = 0;
    return [...new Map(options.map((item) => [item["group"], item]))].map(
      (group, index) => {
        const initialIndex = persistentIndex;
        const groupOptions = options.filter(
          (option) => option.group === group[0],
        );
        persistentIndex = persistentIndex + groupOptions.length;
        return (
          groupOptions.length > 0 && (
            <optgroup
              className="o-SelectWrapper__OptGroup"
              key={`${name}_${i}_${index}_${group[0]}`}
              label={group[0]}
            >
              {renderOptions(i, initialIndex, groupOptions)}
            </optgroup>
          )
        );
      },
    );
  };

  const renderOptions = (
    i: number,
    initialIndex: number,
    options: Array<IOptionWrapper<T>>,
  ) => {
    return options.map((wrapper, index) => {
      const totalIndex = initialIndex + index;
      return (
        wrapper &&
        (totalIndex === selectedIndexes[i] ||
          !selectedIndexes.includes(totalIndex)) && (
          <option
            className="o-SelectWrapper__Option"
            key={`${name}_${i}_${totalIndex}`}
            value={totalIndex}
          >
            {wrapper.option && !wrapper.label
              ? displayTransform(wrapper.option)
              : wrapper.label}
          </option>
        )
      );
    });
  };

  return (
    <div className="c-FormMultiselect">
      {Array.from(Array(selectAmount), (_, i) => (
        <div key={`${name}_${i}`}>
          <FormLabel
            forId={`${name}_${i}`}
            label={`${label} n°${i + 1}`}
            isRequired={isRequired}
            secondaryLabel={secondaryLabel}
          />
          <div className="o-SelectWrapper">
            <select
              className={`o-SelectWrapper__Select ${
                selectedIndexes[i] < 0
                  ? "o-SelectWrapper__Select_placeholder"
                  : ""
              } ${
                errors[`${name}_${i}`] ? "o-SelectWrapper__Select_invalid" : ""
              }`}
              id={`${name}_${i}`}
              value={selectedIndexes[i]}
              onChange={(event) => {
                const index = Number.parseInt(event.target.value);
                const updatedArray = [...selectedIndexes];
                updatedArray[i] = index;
                setSelectedIndexes(updatedArray);
                setValue(`${name}_${i}`, options[index]?.option ?? null, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              disabled={isSubmitting || isDisabled}
              aria-invalid={!!errors[`${name}_${i}`]}
              aria-errormessage={`${name}_${i}_error`}
              data-testid={`form-multiselect_${i}`}
            >
              <option disabled={isRequired} hidden={isRequired} value={-1}>
                {noneSelectedLabel}
              </option>
              {options.every((wrapper) => wrapper.group)
                ? renderGroups(i)
                : renderOptions(i, 0, options)}
            </select>
          </div>
          <ErrorMessage
            errors={errors}
            name={`${name}_${i}`}
            render={({ message }) => (
              <CommonErrorText
                message={message}
                errorId={`${name}_${i}_error`}
              />
            )}
          />
        </div>
      ))}
    </div>
  );
}
