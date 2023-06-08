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

  /* Local Data */
  const {
    formState: { isDirty },
  } = useFormContext<Fields>();

  const methods = useFormContext<Fields>();

  return (
    <div className="c-DropOffMapFormButtons">
      <CommonButton
        type="button"
        label={buttonLabels.cancel}
        picto="cross"
        isDisabled={!isDirty}
        onClick={onCancel}
      />

      <CommonButton
        type="submit"
        label={buttonLabels.save}
        style="primary"
        picto="check"
        isDisabled={!isDirty}
        onClick={() => onSubmit(methods.getValues(), "submit")}
      />

      <CommonButton
        type="submit"
        label={buttonLabels.saveAndCreate}
        style="primary"
        picto="check"
        isDisabled={!isDirty}
        onClick={() => onSubmit(methods.getValues(), "submitAndRefresh")}
      />
    </div>
  );
}
