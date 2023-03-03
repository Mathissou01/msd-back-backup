import { useFormContext } from "react-hook-form";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import "./edito-buttons.scss";

interface IEditoButtonsProps {
  onPublish?: () => void;
  // onDepublish: () => void;
}

export default function EditoButtons({ onPublish }: IEditoButtonsProps) {
  /* Static Data */
  const buttonLabels = {
    buttonSaveDraft: "Enregistrer en tant que brouillon",
    buttonPublish: "Publier",
  };

  /* Local Data */
  const { formState } = useFormContext();

  return (
    <div className="c-EditoButtons">
      {!!onPublish && (
        <CommonButton
          label={buttonLabels.buttonPublish}
          picto="windowUpload"
          isDisabled={formState.isDirty || !formState.isValid}
          onClick={onPublish}
        />
      )}
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
