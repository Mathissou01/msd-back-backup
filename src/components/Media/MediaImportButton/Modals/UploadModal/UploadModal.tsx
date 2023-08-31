import { useState } from "react";
import { ILocalFile, uploadFile } from "../../../../../lib/media";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import MediaCard from "../../../MediaCard/MediaCard";
import { ModalStatus } from "../../MediaImportButton";

interface IUploadModalProps {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  activePathId: number;
  selectedFiles: ILocalFile[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<ILocalFile[]>>;
  setActiveModal: React.Dispatch<React.SetStateAction<ModalStatus>>;
  setFileToEdit: React.Dispatch<React.SetStateAction<ILocalFile | undefined>>;
}

export default function UploadModal({
  modalRef,
  activePathId,
  selectedFiles,
  setActiveModal,
  setSelectedFiles,
  setFileToEdit,
}: IUploadModalProps) {
  /* Static Data */
  const labels = {
    homeModalTitle: "Ajouter des médias",
    detailsModalTitle: "Détails",
    amountItemSelectedTitle: `${selectedFiles.length} ${
      selectedFiles.length > 1
        ? "médias prêts à être importés"
        : "média prêt à être importé"
    }.`,
    description: `${
      selectedFiles.length > 1
        ? "Editez leurs attributs avant de les ajouter à la bibliothèque de médias"
        : "Editez ses attributs avant de l'ajouter à la bibliothèque de médias"
    }.`,
    importBtn: "Importer des médias",
    addMediaBtn: `Ajouter ${selectedFiles.length} ${
      selectedFiles.length > 1 ? "médias" : "média"
    } dans la librairie`,
    cancelBtn: "Annuler",
  };

  /**Local Data */
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  /** Methods */
  const handleEditFile = (file: ILocalFile) => {
    modalRef.current?.toggleModal(false);
    setActiveModal(ModalStatus.EDIT_IMG_MODAL);

    setFileToEdit({
      name: file.name,
      alternativeText: file.alternativeText ?? file.name,
      width: file.width,
      height: file.height,
      ext: file.ext,
      mime: file.mime,
      size: file.size,
      url: file.url,
      createdAt: new Date(file.file?.lastModified ?? 0).toLocaleDateString(),
      file: file.file,
    });
  };

  const handleRemoveFile = (file: ILocalFile) => {
    const selectedFilesInstance: ILocalFile[] = [...selectedFiles];
    const filteredFiles = selectedFilesInstance.filter(
      (f) => f.name !== file.name,
    );

    setSelectedFiles(filteredFiles);
    filteredFiles.length === 0 && setActiveModal(ModalStatus.MAIN_MODAL);
  };

  async function handleUploadFile(
    activePathId: number,
    selectedFiles: ILocalFile[],
  ) {
    setUploadLoading(true);
    for (const file of selectedFiles) {
      await uploadFile(activePathId, file);
    }
    setUploadLoading(false);
    handleReInitModals();
  }

  const handleReInitModals = () => {
    const init: ILocalFile[] = [];
    setSelectedFiles(init);
    modalRef.current?.toggleModal(false);
  };

  return (
    <>
      <hgroup>
        <div className="c-MediaImportButton__Title">
          {labels.homeModalTitle}
        </div>
      </hgroup>
      <div className="c-MediaImportButton__Header">
        <strong>
          {labels.amountItemSelectedTitle}
          <br />
          {labels.description}
        </strong>
        <CommonButton
          label={labels.importBtn}
          style="primary"
          onClick={() => setActiveModal(ModalStatus.MAIN_MODAL)}
        />
      </div>
      <div className="c-MediaImportButton__Body">
        {selectedFiles &&
          selectedFiles.map((file, index) => (
            <MediaCard
              key={index}
              file={file}
              loading={uploadLoading}
              onEditFile={(file) => handleEditFile(file)}
              onRemoveFile={() => handleRemoveFile(file)}
            />
          ))}
      </div>
      <div className="c-MediaImportButton__Footer">
        <CommonButton
          type="submit"
          label={labels.addMediaBtn}
          style="primary"
          onClick={() => handleUploadFile(activePathId, selectedFiles)}
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
