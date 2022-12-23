import _ from "lodash";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useState } from "react";
import FormLabel from "../FormLabel/FormLabel";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";
import "./form-select.scss";

interface IFormSelectProps<T> {
  name: string;
  label: string;
  secondaryLabel?: string;
  displayTransform: (...args: Array<T>) => string;
  isRequired?: boolean;
  isDisabled?: boolean;
  options: Array<T | null>;
  optionKey: keyof T & string;
  defaultValue?: T;
  noneSelectedLabel?: string;
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

  useEffect(() => {
    if (watchValue !== undefined) {
      const matchIndex = options.findIndex(
        (option) => option && option[optionKey] === watchValue[optionKey],
      );
      setValue(name, matchIndex);
      setSelectedIndex(matchIndex);
    } else if (defaultValue) {
      const matchIndex = options.findIndex(
        (option) => option && option[optionKey] === defaultValue[optionKey],
      );
      setValue(name, matchIndex);
      setSelectedIndex(matchIndex);
    }
  }, [defaultValue, name, optionKey, options, setValue, watchValue]);

  return (
    <div className="c-FormSelect">
      <FormLabel
        forId={name}
        label={label}
        isRequired={isRequired}
        secondaryLabel={secondaryLabel}
      />
      <div className="o-SelectWrapper">
        <select
          className={classNames("o-SelectWrapper__Select", {
            "o-SelectWrapper__Select_placeholder": selectedIndex < 0,
            "o-SelectWrapper__Select_invalid": _.get(errors, name),
          })}
          {...register(name, {
            setValueAs: (v) => {
              return options[v];
            },
            required: { value: isRequired, message: errorMessages.required },
            min: { value: 0, message: errorMessages.required },
          })}
          id={name}
          value={selectedIndex}
          onChange={(event) => {
            setSelectedIndex(Number.parseInt(event.target.value));
            setValue(name, Number.parseInt(event.target.value), {
              shouldValidate: true,
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
          {options?.map(
            (option, index) =>
              option && (
                <option
                  className="o-SelectWrapper__Option"
                  key={name + index}
                  value={index}
                >
                  {displayTransform(option)}
                </option>
              ),
          )}
        </select>
      </div>
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
