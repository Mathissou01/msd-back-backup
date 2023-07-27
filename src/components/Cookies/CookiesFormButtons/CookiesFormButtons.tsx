import { useFormContext } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./cookies-form-buttons.scss";

export interface ICookiesFormButtonsLabels {
  preview: string;
  cancel: string;
  activate: string;
  deactivate: string;
  save: string;
}

interface ICookiesFormButtonsProps {
  onPreview?: () => void;
  onCancel: () => void;
  labels?: ICookiesFormButtonsLabels;
  isActivated?: boolean;
  onChangeActivated: () => void;
  onSubmit: (data: FieldValues, type?: string) => void;
}

export default function CookiesFormButtons<Fields extends FieldValues>({
  onCancel,
  onPreview,
  labels,
  isActivated = false,
  onChangeActivated,
}: ICookiesFormButtonsProps) {
  /* Static Data */
  const buttonLabels: ICookiesFormButtonsLabels = labels ?? {
    preview: "Prévisualiser",
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
    <div className="c-CookiesFormButtons">
      <CommonButton
        label={buttonLabels.preview}
        picto="eye"
        onClick={onPreview}
      />
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
