import { useFormContext } from "react-hook-form";
import { Enum_New_Status } from "../../../../graphql/codegen/generated-types";
import { EStatus } from "../../../../lib/status";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import "./edito-buttons.scss";

interface IEditoButtonsProps {
  status?: EStatus;
  onPublish?: () => void;
  onDepublish?: () => void;
  onPreview?: () => void;
}

export default function EditoButtons({
  onPublish,
  onDepublish,
  onPreview,
}: IEditoButtonsProps) {
  /* Static Data */
  const buttonLabels = {
    buttonPreview: "Prévisualiser",
    buttonSaveDraft: "Enregistrer en tant que brouillon",
    buttonPublish: "Publier",
    buttonDePublish: "Dépublier",
  };

  /* Local Data */
  const { formState } = useFormContext();

  return (
    <div className="c-EditoButtons">
      <CommonButton
        label={buttonLabels.buttonPreview}
        picto="eye"
        onClick={onPreview}
      />

      {formState.defaultValues?.status === Enum_New_Status.Draft ||
      formState.defaultValues?.status === Enum_New_Status.Archived ? (
        <CommonButton
          label={buttonLabels.buttonPublish}
          picto="windowUpload"
          isDisabled={formState.isDirty}
          onClick={onPublish}
        />
      ) : (
        <CommonButton
          label={buttonLabels.buttonDePublish}
          picto="windowCancel"
          isDisabled={formState.isDirty || !formState.isValid}
          onClick={onDepublish}
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
