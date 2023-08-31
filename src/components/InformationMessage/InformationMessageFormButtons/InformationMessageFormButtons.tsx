import { useFormContext } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./information-message-form-buttons.scss";

export interface IInformationMessageFormButtonsLabels {
  cancel: string;
  save: string;
  saveAndCreate: string;
  back: string;
}

export interface IInformationMessageFormButtonsProps {
  onCancel: () => void;
  labels?: IInformationMessageFormButtonsLabels;
  onSubmit: (data: FieldValues, type?: string) => void;
}

export default function InformationMessageFormButtons<
  Fields extends FieldValues,
>({ onCancel, labels, onSubmit }: IInformationMessageFormButtonsProps) {
  /* Static Data */
  const buttonLabels: IInformationMessageFormButtonsLabels = labels ?? {
    cancel: "Annuler",
    save: "Enregistrer",
    saveAndCreate: "Enregistrer et créer un autre message",
    back: "Retour",
  };

  /* Local Data */
  const {
    formState: { isDirty },
  } = useFormContext<Fields>();

  const methods = useFormContext<Fields>();

  return (
    <div className="c-InformationMessageFormButtons">
      <CommonButton
        type="button"
        label={buttonLabels.cancel}
        picto="cross"
        isDisabled={!isDirty}
        onClick={onCancel}
      />

      <CommonButton
        label={buttonLabels.save}
        style="primary"
        picto="check"
        isDisabled={!isDirty}
        onClick={() => onSubmit(methods.getValues(), "submit")}
      />

      <CommonButton
        label={buttonLabels.saveAndCreate}
        style="primary"
        picto="add"
        isDisabled={!isDirty}
        onClick={() => onSubmit(methods.getValues(), "submitAndRefresh")}
      />
    </div>
  );
}
