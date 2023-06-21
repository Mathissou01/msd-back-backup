import _ from "lodash";
import classNames from "classnames";
import { FieldValues, Mode, useFormContext } from "react-hook-form";
import { Validate } from "react-hook-form/dist/types/validator";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { ErrorMessage } from "@hookform/error-message";
import React, { ReactNode, useEffect, useRef } from "react";
import { isTruthyObjectOrArray } from "../../../lib/utilities";
import CommonButton from "../../Common/CommonButton/CommonButton";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import FormLabel from "../FormLabel/FormLabel";
import FormModal from "../FormModal/FormModal";
import "./form-modal-button-input.scss";

interface IFormModalButtonInputProps<T> {
  name: string;
  label: string;
  secondaryLabel?: string;
  buttonLabel: string;
  isStyleRow?: boolean;
  displayTransform: (...args: Array<Partial<T>>) => ReactNode;
  defaultValue?: Partial<T> | null;
  isRequired?: boolean;
  isDisabled?: boolean;
  onValidate?: Validate<string, FieldValues>;
  modalTitle: string;
  modalSubtitle?: string;
  modalHasRequiredChildren?: "some" | "all" | null;
  children: ReactNode;
  modalFormValidationMode?: Mode;
  onModalSubmit: (data: { [key: string]: Partial<T> }) => void;
  onModalInvalid?: (errors: Partial<FieldErrors>) => void;
}

export default function FormModalButtonInput<T extends FieldValues>({
  name,
  label,
  secondaryLabel,
  buttonLabel,
  isStyleRow = false,
  displayTransform,
  defaultValue,
  isRequired = false,
  isDisabled = false,
  onValidate,
  modalTitle,
  modalSubtitle,
  modalHasRequiredChildren = null,
  children,
  modalFormValidationMode = "onChange",
  onModalSubmit,
  onModalInvalid,
}: IFormModalButtonInputProps<T>) {
  const childRef = useRef<CommonModalWrapperRef>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Static Data */
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  function onModalClose() {
    buttonRef.current?.focus();
  }

  /* Local Data */
  const {
    register,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const currentParentValues = watch(name);
  useEffect(() => {
    if (defaultValue && currentParentValues === undefined) {
      setValue(name, defaultValue);
    }
  }, [currentParentValues, defaultValue, name, setValue]);

  return (
    <>
      <div className="c-FormModalButtonInput" data-testid="form-modal-input">
        <FormLabel
          forId={`${name}_button`}
          label={label}
          isRequired={isRequired}
          secondaryLabel={secondaryLabel}
        />
        <input
          {...register(name, {
            required: { value: isRequired, message: errorMessages.required },
            validate: onValidate,
          })}
          type="hidden"
          disabled={true}
        />
        <div
          className={classNames("c-FormModalButtonInput__Container", {
            "c-FormModalButtonInput__Container_row": isStyleRow,
          })}
        >
          {isTruthyObjectOrArray(currentParentValues)
            ? displayTransform(currentParentValues)
            : ""}
          <div
            aria-invalid={!!_.get(errors, name)}
            aria-errormessage={`${name}_error`}
          >
            <CommonButton
              label={buttonLabel}
              onClick={() => childRef.current?.toggleModal(true)}
              isDisabled={isSubmitting || isDisabled}
              formLabelId={`${name}_button`}
              buttonRef={buttonRef}
            />
          </div>
        </div>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }: { message: string }) => (
            <CommonFormErrorText message={message} errorId={`${name}_error`} />
          )}
        />
      </div>
      <FormModal<T>
        modalRef={childRef}
        modalTitle={modalTitle}
        modalSubtitle={modalSubtitle}
        isRequired={isRequired}
        hasRequiredChildren={modalHasRequiredChildren}
        onClose={onModalClose}
        onSubmit={onModalSubmit}
        onInvalid={onModalInvalid}
        formValidationMode={modalFormValidationMode}
      >
        {children}
      </FormModal>
    </>
  );
}
