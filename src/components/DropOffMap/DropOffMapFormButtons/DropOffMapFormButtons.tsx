import { useFormContext } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./drop-off-map-form-buttons.scss";

export interface IDropOffMapFormButtonsLabels {
  cancel: string;
  save: string;
  saveAndCreate: string;
}

export interface IDropOffMapFormButtonsProps {
  onCancel: () => void;
  labels?: IDropOffMapFormButtonsLabels;
  onSubmit: (data: FieldValues, type?: string) => void;
}

export default function DropOffMapFormButtons<Fields extends FieldValues>({
  onCancel,
  labels,
  onSubmit,
}: IDropOffMapFormButtonsProps) {
  /* Static Data */
  const buttonLabels: IDropOffMapFormButtonsLabels = labels ?? {
    cancel: "Annuler",
    save: "Enregistrer ce point d’intérêt",
    saveAndCreate: "Enregistrer et créer un autre point d'intérêt",
  };

  /* Methods */
  function handleValidation(data: FieldValues, type?: string) {
    trigger();
    if (isValid) {
      onSubmit(data, type);
    }
  }

  /* Local Data */
  const {
    formState: { isDirty, isValid },
    trigger,
  } = useFormContext<Fields>();

  const methods = useFormContext<Fields>();

  return (
    <div className="c-DropOffMapFormButtons">
      <CommonButton
        type="button"
        label={buttonLabels.cancel}
        picto="cross"
        onClick={onCancel}
      />
      <CommonButton
        label={buttonLabels.save}
        style="primary"
        picto="check"
        isDisabled={!isDirty}
        onClick={() => handleValidation(methods.getValues(), "submit")}
      />
      <CommonButton
        label={buttonLabels.saveAndCreate}
        style="primary"
        picto="check"
        isDisabled={!isDirty}
        onClick={() =>
          handleValidation(methods.getValues(), "submitAndRefresh")
        }
      />
    </div>
  );
}
