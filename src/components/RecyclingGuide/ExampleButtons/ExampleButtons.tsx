import { useFormContext } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";
import { EStatus } from "../../../lib/status";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./example-buttons.scss";

export interface IExampleButtonsLabels {
  preview: string;
  publish: string;
  depublish: string;
  save: string;
}

export interface IExampleButtonsProps {
  onPublish?: () => void;
  onDepublish?: () => void;
  onPreview?: () => void;
  labels?: IExampleButtonsLabels;
}

// TODO: Souleymane, renomme et modifie cette copie de FormLayoutDefaultButtons avec les boutons et labels spécifique à WasteForm
//  n'oublie pas bien associer les bonnes interface (ou en faire de nouvelles), renommer tout,
//  et déplacer de component au bon endroit avec tes autres component de Form (ta version de SideBar, ta version de StaticFields, etc)
export default function ExampleButtons<Fields extends FieldValues>({
  onPublish,
  onDepublish,
  onPreview,
  labels,
}: IExampleButtonsProps) {
  /* Static Data */
  const buttonLabels: IExampleButtonsLabels = labels ?? {
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
    <div className="c-ExampleButtons">
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
