import { DeepPartial, FormProvider, Mode, useForm } from "react-hook-form";
import { FieldErrors } from "react-hook-form/dist/types/errors";
import { FieldValues } from "react-hook-form/dist/types/fields";
import React, { ReactNode } from "react";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./form-modal.scss";

interface IFormModalProps<T> {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  modalTitle: string;
  modalSubtitle?: string;
  isRequired?: boolean;
  hasRequiredChildren?: "some" | "all" | null;
  onClose?: () => void;
  onSubmit: (data: { [key: string]: Partial<T> }) => void;
  onInvalid?: (errors: Partial<FieldErrors>) => void;
  children: ReactNode;
  formValidationMode?: Mode;
  defaultValues?: DeepPartial<T>;
}

export default function FormModal<T extends FieldValues>({
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
}: IFormModalProps<T>) {
  /* Static Data */
  const childrenRequiredAllLabel = "* Tous les champs sont obligatoires";
  const childrenRequiredSomeLabel = "* Champs obligatoires";
  const submitButtonLabel = "Enregistrer";
  const cancelButtonLabel = "Annuler";

  /* Local Data */
  const form = useForm<T>({
    mode: formValidationMode,
    defaultValues,
  });
  const { handleSubmit, reset } = form;

  function handleClose() {
    reset();
    if (onClose) onClose();
  }

  function onLocalSubmitValid(data: { [name: string]: Partial<T> }) {
    modalRef.current?.toggleModal(false);
    onSubmit(data);
  }

  function onLocalSubmitInvalid(errors: Partial<FieldErrors>) {
    if (onInvalid) onInvalid(errors);
  }

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
          <hgroup>
            <div className="c-FormModal__Title">{modalTitle}</div>
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
          {children}
          <div className="c-FormModal__Buttons">
            <CommonButton
              type="submit"
              label={submitButtonLabel}
              style="primary"
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
