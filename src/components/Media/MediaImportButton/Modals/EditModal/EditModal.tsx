import Image from "next/image";
import { RequestFolders } from "../../../../../graphql/codegen/generated-types";
import FormInput from "../../../../Form/FormInput/FormInput";
import FormSelect from "../../../../Form/FormSelect/FormSelect";
import { mapOptionsInWrappers } from "../../../../Form/FormMultiselect/FormMultiselect";
import { IFileToEdit } from "../../MediaImportButton";

interface IEditModalProps {
  fileToEdit: IFileToEdit | undefined;
  folderHierarchy: Array<RequestFolders>;
  activePathId: number;
  handleReplaceSpecialChars: (arg: string) => string;
}

export default function EditModal({
  fileToEdit,
  folderHierarchy,
  activePathId,
  handleReplaceSpecialChars,
}: IEditModalProps) {
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

  const handleCalculateFileSize = (size: number): string => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) +
      " " +
      ["B", "KB", "MB", "GB", "TB"][i]
    );
  };

  /* Local Data */
  const isImageToUpload = () => fileToEdit?.mime.split("/")[0] === "image";

  return (
    <>
      <div className="c-MediaImportButton__Body">
        <div className="c-MediaImportButton__Block">
          <div className="c-MediaImportButton__FormControl">
            <FormInput
              type="text"
              name={handleReplaceSpecialChars(labels.formNameLabel)}
              label={labels.formNameLabel}
              isRequired={true}
              defaultValue={fileToEdit?.name}
            />
          </div>
          {isImageToUpload() && (
            <div className="c-MediaImportButton__FormControl">
              <FormInput
                type="text"
                name={handleReplaceSpecialChars(labels.formDescLabel)}
                label={labels.formDescLabel}
                secondaryLabel={labels.formDescHint}
                isRequired={true}
                defaultValue={fileToEdit?.alternativeText ?? fileToEdit?.name}
                maxLengthValidation={80}
              />
            </div>
          )}
          <div className="c-MediaImportButton__FormControl">
            <FormSelect<RequestFolders>
              name={handleReplaceSpecialChars(labels.formSelectLabel)}
              label={labels.formSelectLabel}
              displayTransform={folderHierarchyDisplayTransformFunction}
              options={sortFolderHierarchy(folderHierarchy)}
              optionKey={"id"}
              isRequired={true}
              defaultValue={
                folderHierarchy.find(
                  (folder) => folder?.pathId === activePathId.toString(),
                ) ?? undefined
              }
            />
          </div>
          <div className="c-MediaImportButton__Table">
            <table>
              <tbody>
                <tr>
                  <th>Taille</th>
                  <td>
                    {fileToEdit?.size &&
                      handleCalculateFileSize(fileToEdit?.size)}
                  </td>
                </tr>
                {isImageToUpload() && (
                  <tr>
                    <th>Dimensions</th>
                    <td>{`${fileToEdit?.width}x${fileToEdit?.height}`}</td>
                  </tr>
                )}
                <tr>
                  <th>Date</th>
                  <td>{fileToEdit?.date}</td>
                </tr>
                <tr>
                  <th>Extension</th>
                  <td>{fileToEdit?.ext.slice(1)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {isImageToUpload() && (
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
        )}
      </div>
    </>
  );
}
