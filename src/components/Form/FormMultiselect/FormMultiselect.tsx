import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";
import FormLabel from "../FormLabel/FormLabel";
import "./form-multiselect.scss";

interface IFormMultiselectProps<T> {
  name: string;
  label: string;
  secondaryLabel?: string;
  displayTransform: (...args: Array<T>) => string;
  isRequired?: boolean;
  isDisabled?: boolean;
  selectAmount: number;
  options: Array<T | null>;
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
      if (watchValues[i] !== undefined) {
        const matchIndex = options.findIndex(
          (option) => option && option[optionKey] === watchValues[i][optionKey],
        );
        updatedArray[i] = matchIndex;
        setValue(`${name}_${i}`, matchIndex);
      } else if (defaultValues && defaultValues[i]) {
        const matchIndex = options.findIndex(
          (option) =>
            option && option[optionKey] === defaultValues[i][optionKey],
        );
        updatedArray[i] = matchIndex;
        setValue(`${name}_${i}`, matchIndex);
      }
    }
    setSelectedIndexes(updatedArray);
  }, [
    defaultValues,
    name,
    optionKey,
    options,
    selectAmount,
    setValue,
    watchValues,
  ]);

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
              {...register(`${name}_${i}`, {
                setValueAs: (v) => {
                  return options[v];
                },
                required: {
                  value: isRequired,
                  message: errorMessages.required,
                },
              })}
              id={`${name}_${i}`}
              value={selectedIndexes[i]}
              onChange={(event) => {
                const updatedArray = [...selectedIndexes];
                updatedArray[i] = Number.parseInt(event.target.value);
                setSelectedIndexes(updatedArray);
                setValue(`${name}_${i}`, Number.parseInt(event.target.value), {
                  shouldValidate: true,
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
              {options.map(
                (option, index) =>
                  option &&
                  (index === selectedIndexes[i] ||
                    !selectedIndexes.includes(index)) && (
                    <option key={`${name}_${i}_${index}`} value={index}>
                      {displayTransform(option)}
                    </option>
                  ),
              )}
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
