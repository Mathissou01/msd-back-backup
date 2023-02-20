import { useFormContext } from "react-hook-form";
import CommonButton from "../../../Common/CommonButton/CommonButton";

export default function EditoButtons() {
  /* Static Data */
  const submitButtonLabel = "Enregistrer en tant que brouillon";

  /* Local Data */
  const { formState } = useFormContext();

  return (
    <>
      <CommonButton
        type="submit"
        label={submitButtonLabel}
        style="primary"
        picto="check"
        isDisabled={!formState.isDirty}
      />
    </>
  );
}
