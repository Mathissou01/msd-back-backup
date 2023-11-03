import { useState } from "react";
import Image from "next/image";
import { RequestFolders } from "../../../../../graphql/codegen/generated-types";
import { formatFileSize } from "../../../../../lib/utilities";
import { ILocalFile } from "../../../../../lib/media";
import { removeQuotesInString } from "../../../../../lib/utilities";
import { getRightsByLabel } from "../../../../../lib/user";
import { useUser } from "../../../../../hooks/useUser";
import FormInput from "../../../../Form/FormInput/FormInput";
import FormSelect from "../../../../Form/FormSelect/FormSelect";
import { mapOptionsInWrappers } from "../../../../Form/FormMultiselect/FormMultiselect";
import CommonImageCropper from "../../../../Common/CommonImageCropper/CommonImageCropper";
import "react-image-crop/src/ReactCrop.scss";
import "./edit-modal.scss";

interface IEditModalProps {
  fileToEdit?: ILocalFile;
  folderHierarchy: Array<RequestFolders>;
  activePathId: number;
  onFileEdited?: (file: ILocalFile) => void;
  setCroppedImg: (croppedImg: boolean) => void;
}

export default function EditModal({
  fileToEdit,
  folderHierarchy,
  activePathId,
  onFileEdited,
  setCroppedImg,
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

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Medias", userRights);
  const [showCrop, setShowCrop] = useState(false);
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

  const isImageToUpload = () => fileToEdit?.mime.split("/")[0] === "image";

  const activateCrop = () => {
    setShowCrop(true);
  };
  const fileSize = fileToEdit?.size
    ? formatFileSize(fileToEdit.size, !!fileToEdit.file)
    : "";
  return (
    <>
      <div className="c-MediaImportButton__Body">
        <div className="c-MediaImportButton__Block">
          <div className="c-MediaImportButton__FormControl">
            <FormInput
              type="text"
              name={removeQuotesInString(labels.formNameLabel)}
              label={labels.formNameLabel}
              isRequired={true}
              defaultValue={fileToEdit?.name}
              isDisabled={!userPermissions.update}
            />
          </div>
          {isImageToUpload() && (
            <div className="c-MediaImportButton__FormControl">
              <FormInput
                type="text"
                name={removeQuotesInString(labels.formDescLabel)}
                label={labels.formDescLabel}
                secondaryLabel={labels.formDescHint}
                isRequired={true}
                defaultValue={fileToEdit?.alternativeText ?? fileToEdit?.name}
                maxLengthValidation={80}
                isDisabled={!userPermissions.update}
              />
            </div>
          )}
          <div className="c-MediaImportButton__FormControl">
            <FormSelect<RequestFolders>
              name={removeQuotesInString(labels.formSelectLabel)}
              label={labels.formSelectLabel}
              displayTransform={folderHierarchyDisplayTransformFunction}
              options={sortFolderHierarchy(folderHierarchy)}
              optionKey={"id"}
              isRequired={true}
              isDisabled={!userPermissions.update}
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
                  <td>{fileSize}</td>
                </tr>
                {isImageToUpload() && (
                  <tr>
                    <th>Dimensions</th>
                    <td>{`${fileToEdit?.width}x${fileToEdit?.height}`}</td>
                  </tr>
                )}
                <tr>
                  <th>Date</th>
                  <td>{fileToEdit?.createdAt}</td>
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
              {!showCrop && (
                <div className="c-MediaImportButton__ToolsIcon">
                  <button
                    type="button"
                    className="c-MediaImportButton_crop"
                    onClick={activateCrop}
                  />
                </div>
              )}
              {!showCrop && (
                <div className="c-EditModal__ImageWrapper">
                  {fileToEdit?.url && (
                    <Image
                      className="c-EditModal__Image"
                      src={fileToEdit?.url}
                      width={300}
                      height={300}
                      alt={fileToEdit?.name}
                    />
                  )}
                </div>
              )}
              {showCrop && fileToEdit !== undefined && (
                <CommonImageCropper
                  fileToEdit={fileToEdit}
                  activateCrop={activateCrop}
                  onCropCanceled={() => setShowCrop(false)}
                  onCropCompleted={(croppedFile) => {
                    setShowCrop(false);
                    setCroppedImg(true);
                    if (fileToEdit && onFileEdited) {
                      onFileEdited({
                        ...croppedFile,
                      });
                    }
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
