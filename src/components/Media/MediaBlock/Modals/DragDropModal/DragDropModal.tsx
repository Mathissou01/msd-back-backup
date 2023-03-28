import { RefObject, useState } from "react";
import { uploadFile } from "../../../../../lib/uploadFile";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import MediaCard from "../../../MediaCard/MediaCard";
import { IFileToEdit } from "../../../MediaImportButton/MediaImportButton";

interface IDragDropModalProps {
  modalRef: RefObject<CommonModalWrapperRef>;
  activePathId: number;
  file: IFileToEdit;
  setHasFileToUpload: (arg: IFileToEdit | undefined) => void;
  selectedFile: (file: { id: string; file: IFileToEdit }) => void;
}

export default function DragDropModal({
  modalRef,
  activePathId,
  file,
  selectedFile,
  setHasFileToUpload,
}: IDragDropModalProps) {
  /* Static Data */
  const labels = {
    homeModalTitle: "Ajouter des médias",
    detailsModalTitle: "Détails",
    amountItemSelectedTitle: `1 média prêt à être importé.`,
    description:
      "Editez ses attributs avant de l'ajouter à la bibliothèque de médias.",
    importBtn: "Importer des médias",
    addMediaBtn: "Ajouter 1 média dans la librairie",
    cancelBtn: "Annuler",
  };

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  async function handleUploadFile(activePathId: number, file: IFileToEdit) {
    setUploadLoading(true);
    const files: Array<IFileToEdit> = [];
    files.push(file);
    const result = await uploadFile(activePathId, files);
    if (result !== undefined || result !== null) {
      setUploadLoading(false);
      selectedFile({ id: result?.result.id, file: file });
      setHasFileToUpload(undefined);
      modalRef.current?.toggleModal(false);
    }
  }

  return (
    <>
      <hgroup>
        <div className="c-MediaBlock__Title">Ajouter le média</div>
      </hgroup>
      <div className="c-MediaBlock__Header">
        <strong>
          {labels.amountItemSelectedTitle}
          <br />
          {labels.description}
        </strong>
        <CommonButton
          label={labels.importBtn}
          style="primary"
          onClick={() => setHasFileToUpload(undefined)}
        />
      </div>
      <div className="c-MediaBlock__Body">
        <MediaCard file={{ file }} loading={uploadLoading} />
      </div>
      <div className="c-MediaBlock__Footer">
        <CommonButton
          type="submit"
          label={labels.addMediaBtn}
          style="primary"
          onClick={() => handleUploadFile(activePathId, file)}
        />
        <CommonButton
          type="button"
          label={labels.cancelBtn}
          onClick={() => modalRef.current?.toggleModal(false)}
        />
      </div>
    </>
  );
}
