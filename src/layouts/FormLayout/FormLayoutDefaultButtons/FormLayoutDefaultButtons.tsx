import { useFormContext } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { EStatus } from "../../../lib/status";
import CommonButton from "../../../components/Common/CommonButton/CommonButton";
import "./form-layout-default-buttons.scss";

export interface IFormLayoutDefaultButtonsLabels {
  preview: string;
  publish: string;
  depublish: string;
  save: string;
}

export interface IFormLayoutDefaultButtonsProps {
  onPublish?: () => void;
  onDepublish?: () => void;
  onPreview?: () => void;
  labels?: IFormLayoutDefaultButtonsLabels;
}

export default function FormLayoutDefaultButtons<Fields extends FieldValues>({
  onPublish,
  onDepublish,
  onPreview,
  labels,
}: IFormLayoutDefaultButtonsProps) {
  /* Static Data */
  const buttonLabels: IFormLayoutDefaultButtonsLabels = labels ?? {
    preview: "Prévisualiser",
    publish: "Publier",
    depublish: "Dépublier",
    save: "Enregistrer en tant que brouillon",
  };

  /* Local Data */
  const {
    formState: { defaultValues, isDirty, isValid },
  } = useFormContext<Fields>();

  return (
    <div className="c-FormLayoutButtons">
      <CommonButton
        label={buttonLabels.preview}
        picto="eye"
        onClick={onPreview}
      />
      {defaultValues?.status === EStatus.Draft ||
      defaultValues?.status === EStatus.Archived ? (
        <CommonButton
          label={buttonLabels.publish}
          picto="windowUpload"
          isDisabled={isDirty}
          onClick={onPublish}
        />
      ) : (
        <CommonButton
          label={buttonLabels.depublish}
          picto="windowCancel"
          isDisabled={isDirty || !isValid}
          onClick={onDepublish}
        />
      )}
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
