import { useFormContext } from "react-hook-form";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import "./edito-buttons.scss";

export default function EditoButtons() {
  /* Static Data */
  const buttonLabels = {
    buttonSaveDraft: "Enregistrer en tant que brouillon",
    buttonPublish: "Publier",
  };

  /* Local Data */
  const { formState } = useFormContext();

  return (
    <div className="c-EditoButtons">
      <CommonButton
        type="submit"
        label={buttonLabels.buttonPublish}
        picto="windowUpload"
        isDisabled={!formState.isDirty}
      />
      <CommonButton
        type="submit"
        label={buttonLabels.buttonSaveDraft}
        style="primary"
        picto="check"
        isDisabled={!formState.isDirty}
      />
    </div>
  );
}
