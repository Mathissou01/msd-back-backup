import Image from "next/image";
import { RequestFolders } from "../../../../../graphql/codegen/generated-types";
import FormInput from "../../../../Form/FormInput/FormInput";
import FormSelect from "../../../../Form/FormSelect/FormSelect";
import { mapOptionsInWrappers } from "../../../../Form/FormMultiselect/FormMultiselect";
import { IFileToEdit } from "../../MediaImportButton";

interface IEditModal {
  fileToEdit: IFileToEdit | undefined;
  folderHierarchy: Array<RequestFolders>;
  localFolderPathId: `${number}`;
  handleRaplceSpecialChars: (arg: string) => string;
}

export default function EditModal({
  fileToEdit,
  folderHierarchy,
  localFolderPathId,
  handleRaplceSpecialChars,
}: IEditModal) {
  /* Static Data */
  const labels = {
    detailsModalTitle: "Détails",
    replaceMediaBtn: "Remplacer le média",

    formNameLabel: "Nom Du fichier",
    formDescLabel: "Description de l'image",
    formDescHint: `  
    Si l'image contient du texte, écrivez le texte de l'image,
    Soyez concis et pertinent, n'écrivez pas "Image/Photo
    de...". 80 caractères maximum.
    `,
    formSelectLabel: "Emplacement",
    SaveInfoBtn: "Enregistrer les informations",
    cancelBtn: "Annuler",
  };

  /* Methods */
  const folderHierarchyDisplayTransformFunction = (
    folder: RequestFolders,
  ): string => {
    const folderLevel = folder.path?.match(/[/]/g)?.splice(2).length ?? 0;
    return "\xa0\xa0\xa0\xa0".repeat(folderLevel) + folder?.name;
  };

  const sortFolderHierarchy = (
    folderHierarchy: Array<RequestFolders | null>,
  ) => {
    const folderHierarchyCopy = [...folderHierarchy];
    const sortedFolderHierarchy = folderHierarchyCopy.sort(
      (firstFolder, secondFolder) => {
        const firstFolderPath = firstFolder?.path ?? "";
        const secondFolderPath = secondFolder?.path ?? "";
        return firstFolderPath.localeCompare(secondFolderPath);
      },
    );

    return mapOptionsInWrappers(sortedFolderHierarchy);
  };

  return (
    <>
      <div className="c-MediaImportButton__Body">
        <div className="c-MediaImportButton__Block">
          <div className="c-MediaImportButton__FormControl">
            <FormInput
              type="text"
              name={handleRaplceSpecialChars(labels.formNameLabel)}
              label={labels.formNameLabel}
              isRequired={true}
              defaultValue={fileToEdit?.name}
            />
          </div>
          <div className="c-MediaImportButton__FormControl">
            <FormInput
              type="text"
              name={handleRaplceSpecialChars(labels.formDescLabel)}
              label={labels.formDescLabel}
              secondaryLabel={labels.formDescHint}
              isRequired={true}
              defaultValue={fileToEdit?.alternativeText ?? fileToEdit?.name}
              maxLengthValidation={80}
            />
          </div>
          <div className="c-MediaImportButton__FormControl">
            <FormSelect<RequestFolders>
              name={handleRaplceSpecialChars(labels.formSelectLabel)}
              label={labels.formSelectLabel}
              displayTransform={folderHierarchyDisplayTransformFunction}
              options={sortFolderHierarchy(folderHierarchy)}
              optionKey={"id"}
              isRequired={true}
              defaultValue={
                folderHierarchy.find(
                  (folder) => folder?.pathId === localFolderPathId.toString(),
                ) ?? undefined
              }
            />
          </div>
          <div className="c-MediaImportButton__Table">
            <table>
              <tbody>
                <tr>
                  <th>Taille</th>
                  <td>{fileToEdit?.size}</td>
                </tr>
                <tr>
                  <th>Dimensions</th>
                  <td>{`${fileToEdit?.width}x${fileToEdit?.height}`}</td>
                </tr>
                <tr>
                  <th>Date</th>
                  <td>{fileToEdit?.date}</td>
                </tr>
                <tr>
                  <th>Extension</th>
                  <td>{fileToEdit?.ext}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="c-MediaImportButton__Block">
          <div className="c-MediaImportButton__EditImg">
            <div className="c-MediaImportButton__ToolsIcon">
              <button
                type="button"
                className="c-MediaImportButton_crop"
                onClick={() => console.log("clicked")}
              />
              <button
                type="button"
                className="c-MediaImportButton_trash"
                onClick={() => console.log("clicked")}
              />
            </div>
            {fileToEdit?.url && (
              <Image
                src={fileToEdit?.url}
                width={245}
                height={158}
                alt={fileToEdit?.name}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
