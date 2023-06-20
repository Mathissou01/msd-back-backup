import { useFormContext } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./pick-up-days-form-buttons.scss";

export interface IPickUpDaysFormButtonsLabels {
  cancel: string;
  save: string;
  saveAndCreate: string;
}

export interface IPickUpDaysFormButtonsProps {
  onCancel: () => void;
  labels?: IPickUpDaysFormButtonsLabels;
  onSubmit: (data: FieldValues, type?: string) => void;
}

export default function PickUpDaysFormButtons<Fields extends FieldValues>({
  onCancel,
  labels,
  onSubmit,
}: IPickUpDaysFormButtonsProps) {
  /* Static Data */
  const buttonLabels: IPickUpDaysFormButtonsLabels = labels ?? {
    cancel: "Annuler",
    save: "Enregistrer un point de collecte",
    saveAndCreate: "Enregistrer et créer un autre point de collecte",
  };

  /* Local Data */
  const {
    formState: { isDirty, isValid },
  } = useFormContext<Fields>();

  const methods = useFormContext<Fields>();

  return (
    <div className="c-PickUpDaysFormButtons">
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
        isDisabled={!isDirty || !isValid}
        onClick={() => onSubmit(methods.getValues(), "submit")}
      />

      <CommonButton
        label={buttonLabels.saveAndCreate}
        style="primary"
        picto="add"
        isDisabled={!isDirty || !isValid}
        onClick={() => onSubmit(methods.getValues(), "submitAndRefresh")}
      />
    </div>
  );
}
