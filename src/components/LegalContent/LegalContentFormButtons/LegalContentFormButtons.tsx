import { useFormContext } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { ILegalContentFormButtonsLabels } from "../../../lib/legal-content";
import { getRightsByLabel } from "../../../lib/user";
import CommonButton from "../../Common/CommonButton/CommonButton";
import { useUser } from "../../../hooks/useUser";
import "./legal-content-form-buttons.scss";

interface ILegalContentFormButtonsProps {
  onPreview?: () => void;
  onCancel: () => void;
  labels?: ILegalContentFormButtonsLabels;
  isActivated?: boolean;
  onChangeActivated: () => void;
  onSubmit: (data: FieldValues, type?: string) => void;
}

export default function LegalContentFormButtons<Fields extends FieldValues>({
  onCancel,
  onPreview,
  labels,
  isActivated = false,
  onChangeActivated,
}: ILegalContentFormButtonsProps) {
  /* Static Data */
  const buttonLabels: ILegalContentFormButtonsLabels = labels ?? {
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
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("ContactUs", userRights);

  return (
    <div className="c-LegalContentFormButtons">
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
        isDisabled={!userPermissions.update}
      />
      <CommonButton
        type="button"
        label={isActivated ? buttonLabels.deactivate : buttonLabels.activate}
        style={isActivated ? "secondary" : "primary"}
        picto={isActivated ? "eyeClosed" : "eye"}
        onClick={onChangeActivated}
        isDisabled={!userPermissions.update}
      />
      <CommonButton
        type="submit"
        label={buttonLabels.save}
        style="primary"
        picto="check"
        isDisabled={!isDirty || !userPermissions.update}
      />
    </div>
  );
}
