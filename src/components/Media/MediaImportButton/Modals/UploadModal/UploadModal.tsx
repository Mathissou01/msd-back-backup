import { useState } from "react";
import { uploadFile } from "../../../../../lib/uploadFile";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import MediaCard, {
  MediaCardParentOptions,
} from "../../../MediaCard/MediaCard";
import { IFileToEdit, ModalStatus } from "../../MediaImportButton";

interface IUploadModalProps {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  activePathId: number;
  selectedFiles: IFileToEdit[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<IFileToEdit[]>>;
  setActiveModal: React.Dispatch<React.SetStateAction<ModalStatus>>;
  setFileToEdit: React.Dispatch<React.SetStateAction<IFileToEdit | undefined>>;
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
      selectedFiles.length > 1 ? "médias" : "média"
    } prêt à être
    importé.`,
    description:
      "Editez ses attributs avant de l'ajouter à la bibliothèque de médias.",
    importBtn: "Importer des médias",
    addMediaBtn: `Ajouter ${selectedFiles.length} ${
      selectedFiles.length > 1 ? "médias" : "média"
    } dans la librairie`,
    cancelBtn: "Annuler",
  };

  /**Local Data */
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  /** Methods */
  const handleEditFile = (file: IFileToEdit) => {
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
      date: new Date(file.file?.lastModified ?? 0).toLocaleDateString(),
      file: file.file,
    });
  };

  const handleRemoveFile = (file: IFileToEdit) => {
    const selectedFilesInstance: IFileToEdit[] = [...selectedFiles];
    const filteredFiles = selectedFilesInstance.filter(
      (f) => f.name !== file.name,
    );

    setSelectedFiles(filteredFiles);
    filteredFiles.length === 0 && setActiveModal(ModalStatus.MAIN_MODAL);
  };

  async function handleUploadFile(
    activePathId: number,
    selectedFiles: IFileToEdit[],
  ) {
    setUploadLoading(true);
    const result = await uploadFile(activePathId, selectedFiles);
    if (result !== undefined || result !== null) {
      setUploadLoading(false);
      handleReInitModals();
    }
  }

  const handleReInitModals = () => {
    const init: IFileToEdit[] = [];
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
              file={{ file }}
              loading={uploadLoading}
              parent={MediaCardParentOptions.MODAL}
              handleEditFile={(file) => handleEditFile(file)}
              handleRemoveFile={() => handleRemoveFile(file)}
            />
          ))}
        ``
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
