import { useFormContext } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { EStatus } from "../../../lib/status";
import CommonButton from "../../../components/Common/CommonButton/CommonButton";
import "./form-layout-buttons.scss";

export interface IFormLayoutButtonsLabels {
  preview: string;
  publish: string;
  depublish: string;
  save: string;
}

export interface IFormLayoutButtonsProps {
  onPublish?: () => void;
  onDepublish?: () => void;
  onPreview?: () => void;
  labels?: IFormLayoutButtonsLabels;
}

export default function FormLayoutButtons<Fields extends FieldValues>({
  onPublish,
  onDepublish,
  onPreview,
  labels,
}: IFormLayoutButtonsProps) {
  /* Static Data */
  const buttonLabels: IFormLayoutButtonsLabels = labels ?? {
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
