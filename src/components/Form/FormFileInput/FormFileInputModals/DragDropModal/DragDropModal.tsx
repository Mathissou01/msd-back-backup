import { RefObject, useState } from "react";
import { ILocalFile, uploadFile } from "../../../../../lib/media";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import MediaCard from "../../../../Media/MediaCard/MediaCard";

interface IDragDropModalProps {
  modalRef: RefObject<CommonModalWrapperRef>;
  activePathId: number;
  draggedFile: ILocalFile;
  onSelectedFile: (file: ILocalFile) => void;
  onResetDraggedFile: () => void;
}

export default function DragDropModal({
  modalRef,
  activePathId,
  draggedFile,
  onSelectedFile,
  onResetDraggedFile,
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

  async function handleUploadFile(activePathId: number, localFile: ILocalFile) {
    setUploadLoading(true);
    const result = await uploadFile(activePathId, localFile);
    // TODO: typescript types
    const file = result?.data?.updateUploadFile?.data;
    if (file && file.id && file.attributes) {
      const selectedFile: ILocalFile = {
        id: file.id,
        name: file?.attributes?.name,
        alternativeText: file?.attributes?.alternativeText ?? "",
        width: file?.attributes?.width ?? 0,
        height: file?.attributes?.height ?? 0,
        ext: file?.attributes?.ext ?? "",
        mime: file?.attributes?.mime,
        size: file?.attributes?.size,
        url: file?.attributes?.url,
      };
      onSelectedFile(selectedFile);
    }
    setUploadLoading(false);
    modalRef.current?.toggleModal(false);
  }

  return (
    <>
      <hgroup>
        <div className="c-FormFileInputModals__Title">Ajouter le média</div>
      </hgroup>
      <div className="c-FormFileInputModals__Header">
        <strong>
          {labels.amountItemSelectedTitle}
          <br />
          {labels.description}
        </strong>
        <CommonButton
          label={labels.importBtn}
          style="primary"
          onClick={onResetDraggedFile}
        />
      </div>
      <div className="c-FormFileInputModals__Body">
        <MediaCard file={draggedFile} loading={uploadLoading} />
      </div>
      <div className="c-FormFileInputModals__Footer">
        <CommonButton
          type="submit"
          label={labels.addMediaBtn}
          style="primary"
          onClick={() => handleUploadFile(activePathId, draggedFile)}
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
