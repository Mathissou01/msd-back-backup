import {
  FieldValues,
  FormProvider,
  Mode,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Validate } from "react-hook-form/dist/types/validator";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { ErrorMessage } from "@hookform/error-message";
import React, { ReactNode, useRef } from "react";
import { isTruthyObjectOrArray } from "../../../lib/utilities";
import CommonButton from "../../Common/CommonButton/CommonButton";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";
import FormLabel from "../FormLabel/FormLabel";
import "./form-modal-select.scss";

interface IFormModalInputProps<T> {
  name: string;
  label: string;
  secondaryLabel?: string;
  displayTransform: (...args: Array<Partial<T>>) => ReactNode;
  buttonLabel: string;
  modalTitle: string;
  modalSubtitle?: string;
  isRequired?: boolean;
  hasRequiredChildren?: "some" | "all" | null;
  isDisabled?: boolean;
  onValidate?: Validate<T>;
  onSubmit: (data: { [key: string]: Partial<T> }) => void;
  onInvalid?: (errors: Partial<FieldErrors>) => void;
  children: ReactNode;
  formValidationMode: Mode;
}

export default function FormModalInput<T extends FieldValues>({
  name,
  label,
  secondaryLabel,
  displayTransform,
  buttonLabel,
  modalTitle,
  modalSubtitle,
  isRequired = false,
  hasRequiredChildren = null,
  isDisabled = false,
  onValidate,
  onSubmit,
  onInvalid,
  children,
  formValidationMode,
}: IFormModalInputProps<T>) {
  const childRef = useRef<CommonModalWrapperRef>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  /* Static Data */
  const childrenRequiredAllLabel = "Tous les champs sont obligatoires";
  const childrenRequiredSomeLabel = "* Champs obligatoires";
  const submitButtonLabel = "Enregistrer";
  const cancelButtonLabel = "Annuler";
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };

  /* Local Data */
  const {
    register,
    watch,
    formState: { isSubmitting, errors },
  } = useFormContext();
  const form = useForm<T>({ mode: formValidationMode });
  const { handleSubmit, reset } = form;
  const currentParentValues = watch(name);

  function handleClose() {
    reset();
    buttonRef.current?.focus();
  }

  function onLocalSubmitValid(data: { [name: string]: Partial<T> }) {
    childRef.current?.toggleModal(false);
    onSubmit(data);
  }

  function onLocalSubmitInvalid(errors: Partial<FieldErrors>) {
    if (onInvalid) onInvalid(errors);
  }

  return (
    <>
      <div className="c-FormModalInput" data-testid="form-modal-input">
        <FormLabel
          forId={`${name}_button`}
          label={label}
          isRequired={isRequired}
          secondaryLabel={secondaryLabel}
        />
        <input
          className="c-FormModalInput__Input"
          {...register(name, {
            required: { value: isRequired, message: errorMessages.required },
            validate: onValidate,
          })}
          type="hidden"
          disabled={true}
        />
        {isTruthyObjectOrArray(currentParentValues)
          ? displayTransform(currentParentValues)
          : ""}
        <div aria-invalid={!!errors[name]} aria-errormessage={`${name}_error`}>
          <CommonButton
            label={buttonLabel}
            onClick={() => childRef.current?.toggleModal(true)}
            isDisabled={isSubmitting || isDisabled}
            formLabelId={`${name}_button`}
            buttonRef={buttonRef}
          />
        </div>
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => (
            <CommonErrorText message={message} errorId={`${name}_error`} />
          )}
        />
      </div>
      <CommonModalWrapper ref={childRef} onClose={handleClose}>
        <FormProvider {...form}>
          <form
            onSubmit={(event) => {
              event.stopPropagation();
              handleSubmit(onLocalSubmitValid, onLocalSubmitInvalid)(event);
            }}
            className="c-FormModalInput__ModalForm"
          >
            <hgroup>
              <div className="c-FormModalInput__ModalTitle">{modalTitle}</div>
              {modalSubtitle && (
                <div className="c-FormModalInput__ModalSubtitle">
                  {modalSubtitle}
                </div>
              )}
              {hasRequiredChildren !== null && (
                <div className="c-FormModalInput__ModalRequired">
                  {hasRequiredChildren === "some"
                    ? childrenRequiredSomeLabel
                    : hasRequiredChildren === "all"
                    ? childrenRequiredAllLabel
                    : ""}
                </div>
              )}
            </hgroup>
            {children}
            <div className="c-FormModalInput__ModalButtons">
              <CommonButton
                type="submit"
                label={submitButtonLabel}
                style="primary"
              />
              <CommonButton
                type="button"
                label={cancelButtonLabel}
                onClick={() => childRef.current?.toggleModal(false)}
              />
            </div>
          </form>
        </FormProvider>
      </CommonModalWrapper>
    </>
  );
}
