import classNames from "classnames";
import {
  DeepPartial,
  FormProvider,
  Mode,
  Path,
  PathValue,
  useForm,
} from "react-hook-form";
import { SetValueConfig } from "react-hook-form/dist/types/form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { ReactNode, useImperativeHandle } from "react";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./form-modal.scss";

export type FormModalRef<T> = {
  getModalValue: () => T;
  setModalValue: (
    name: Path<T>,
    value: PathValue<T, Path<T>>,
    options?: SetValueConfig,
  ) => void;
};

export type TFormModalButtonsStyle = "default" | "flex";

interface IFormModalProps<T> {
  parentRef?: React.ForwardedRef<unknown>;
  modalRef: React.RefObject<CommonModalWrapperRef>;
  modalTitle?: string;
  modalSubtitle?: string;
  isRequired?: boolean;
  hasRequiredChildren?: "some" | "all" | null;
  onClose?: () => void;
  onSubmit: (data: T) => void;
  onInvalid?: (errors: Partial<FieldErrors>) => void;
  children: ReactNode;
  formValidationMode?: Mode;
  defaultValues?: DeepPartial<T>;
  submitButtonIsDisabled?: boolean;
  buttonsStyle?: TFormModalButtonsStyle;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
}

export default function FormModal<T extends FieldValues>({
  parentRef,
  modalRef,
  modalTitle,
  modalSubtitle,
  hasRequiredChildren = null,
  onClose,
  onSubmit,
  onInvalid,
  children,
  formValidationMode = "onChange",
  defaultValues,
  submitButtonIsDisabled,
  buttonsStyle = "default",
  submitButtonLabel = "Enregistrer",
  cancelButtonLabel = "Annuler",
}: IFormModalProps<T>) {
  /* Static Data */
  const childrenRequiredAllLabel = "* Tous les champs sont obligatoires";
  const childrenRequiredSomeLabel = "* Champs obligatoires";

  /* Methods */
  function handleClose() {
    reset();
    if (onClose) onClose();
  }

  function onLocalSubmitValid(data: T) {
    modalRef.current?.toggleModal(false);
    onSubmit(data);
  }

  function onLocalSubmitInvalid(errors: Partial<FieldErrors>) {
    if (onInvalid) onInvalid(errors);
  }

  /* Local Data */
  const form = useForm<T>({
    mode: formValidationMode,
    defaultValues,
  });
  const { handleSubmit, reset, formState, getValues, setValue } = form;
  const { isDirty } = formState;

  useImperativeHandle(
    parentRef,
    () => ({
      getModalValue(): T {
        return getValues();
      },
      setModalValue(
        name: Path<T>,
        value: PathValue<T, Path<T>>,
        options?: SetValueConfig,
      ) {
        setValue(name, value, options);
      },
    }),
    [getValues, setValue],
  );

  const buttonsClasses = classNames("c-FormModal__Buttons", {
    [`c-FormModal__Buttons_${buttonsStyle}`]: buttonsStyle,
  });

  return (
    <CommonModalWrapper ref={modalRef} onClose={handleClose}>
      <FormProvider {...form}>
        <form
          onSubmit={(event) => {
            event.stopPropagation();
            handleSubmit(onLocalSubmitValid, onLocalSubmitInvalid)(event);
          }}
          className="c-FormModal"
        >
          {(modalTitle || modalSubtitle || hasRequiredChildren) && (
            <hgroup>
              {modalTitle && (
                <div className="c-FormModal__Title">{modalTitle}</div>
              )}
              {modalSubtitle && (
                <div className="c-FormModal__Subtitle">{modalSubtitle}</div>
              )}
              {hasRequiredChildren !== null && (
                <div className="c-FormModal__Required">
                  {hasRequiredChildren === "some"
                    ? childrenRequiredSomeLabel
                    : hasRequiredChildren === "all"
                    ? childrenRequiredAllLabel
                    : ""}
                </div>
              )}
            </hgroup>
          )}
          {children}
          <div className={buttonsClasses}>
            <CommonButton
              type="submit"
              label={submitButtonLabel}
              style="primary"
              isDisabled={!isDirty && !submitButtonIsDisabled}
            />
            <CommonButton
              type="button"
              label={cancelButtonLabel}
              onClick={() => modalRef.current?.toggleModal(false)}
            />
          </div>
        </form>
      </FormProvider>
    </CommonModalWrapper>
  );
}
