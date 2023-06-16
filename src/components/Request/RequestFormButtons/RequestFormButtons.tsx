import { useFormContext } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./request-form-buttons.scss";

export interface IRequestFormButtonsLabels {
  cancel: string;
  activate: string;
  deactivate: string;
  save: string;
}

interface IRequestFormButtonsProps {
  isCreatedMode: boolean;
  onCancel: () => void;
  labels?: IRequestFormButtonsLabels;
  isActivated: boolean;
  onChangeActivated: () => void;
  onSubmit: (data: FieldValues, type?: string) => void;
}

export default function RequestFormButtons<Fields extends FieldValues>({
  isCreatedMode,
  onCancel,
  labels,
  isActivated = false,
  onChangeActivated,
}: IRequestFormButtonsProps) {
  /* Static Data */
  const buttonLabels: IRequestFormButtonsLabels = labels ?? {
    cancel: "Annuler",
    activate: "Activer",
    deactivate: "Désactiver",
    save: "Enregistrer",
  };

  /* Local Data */
  const {
    formState: { isDirty },
  } = useFormContext<Fields>();

  return (
    <div className="c-RequestFormButtons">
      <CommonButton
        type="button"
        label={buttonLabels.cancel}
        picto="cross"
        onClick={onCancel}
      />

      <CommonButton
        type="button"
        label={isActivated ? buttonLabels.deactivate : buttonLabels.activate}
        style={isActivated ? "secondary" : "primary"}
        picto={isActivated ? "eyeClosed" : "eye"}
        onClick={onChangeActivated}
        isDisabled={isCreatedMode}
      />

      <CommonButton
        type="submit"
        label={buttonLabels.save}
        style="primary"
        picto="check"
        isDisabled={!isDirty}
      />
    </div>
  );
}
