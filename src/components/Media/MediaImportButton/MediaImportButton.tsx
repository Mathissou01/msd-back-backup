import React, { useEffect, useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import { RequestFolders } from "../../../graphql/codegen/generated-types";
import { ILocalFile, isMimeType } from "../../../lib/media";
import { removeQuotesInString } from "../../../lib/utilities";
import { ITab } from "../../TabBlock/TabBlock";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonDragDropFile from "../../Common/CommonDragDropFile/CommonDragDropFile";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormModal from "../../Form/FormModal/FormModal";
import MediaImportUrl from "../MediaImportUrl/MediaImportUrl";
import MainModal from "./Modals/MainModal/MainModal";
import UploadModal from "./Modals/UploadModal/UploadModal";
import EditModal from "./Modals/EditModal/EditModal";
import "./media-import-button.scss";
import { useUser } from "../../../hooks/useUser";
import { getRightsByLabel } from "../../../lib/user";

export enum ModalStatus {
  MAIN_MODAL = "MAIN_MODAL",
  UPLOAD_MODAL = "UPLOAD_MODAL",
  EDIT_IMG_MODAL = "EDIT_IMG_MODAL",
}

interface IMediaImportButtonProps {
  folderHierarchy: Array<RequestFolders>;
  activePathId: number;
}

export default function MediaImportButton({
  folderHierarchy,
  activePathId,
}: IMediaImportButtonProps) {
  /** Static Data */
  const labels = {
    importBtn: "Importer des médias",
    detailsModalTitle: "Détails",
    formNameLabel: "Nom Du fichier",
    formDescLabel: "Description de l'image",
    formSelectLabel: "Emplacement",
    cancelBtn: "Annuler",
  };

  /* Methods */
  const handleCloseModal = () => {
    switch (activeModal) {
      case ModalStatus.MAIN_MODAL:
        setActiveModal(ModalStatus.MAIN_MODAL);
        break;
      case ModalStatus.UPLOAD_MODAL:
        setActiveModal(ModalStatus.UPLOAD_MODAL);
        break;
      case ModalStatus.EDIT_IMG_MODAL:
        fileToEdit
          ? setActiveModal(ModalStatus.UPLOAD_MODAL)
          : setActiveModal(ModalStatus.MAIN_MODAL);
        break;
      default:
        setActiveModal(ModalStatus.MAIN_MODAL);
    }
  };

  const handleDragOver = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  async function handleSaveNewFileInfo(submitData: FieldValues) {
    const selectedFilesInstance: ILocalFile[] = [...selectedFiles];
    const file: ILocalFile[] = selectedFilesInstance.filter(
      (file) => file.name === fileToEdit?.name,
    );

    if (
      (file &&
        fileToEdit &&
        fileToEdit?.name !== submitData[labels.formNameLabel]) ||
      fileToEdit?.alternativeText !== ""
    ) {
      const index = selectedFilesInstance.indexOf(file[0]);
      selectedFilesInstance[index] = {
        name: submitData[removeQuotesInString(labels.formNameLabel)],
        alternativeText: submitData[removeQuotesInString(labels.formDescLabel)],
        width: fileToEdit?.width,
        height: fileToEdit?.height,
        ext: fileToEdit?.ext ?? "",
        mime: fileToEdit?.mime ?? "",
        size: fileToEdit?.size ?? 0,
        url: fileToEdit?.url ?? "",
        createdAt: fileToEdit?.createdAt,
        file: fileToEdit?.file ?? selectedFilesInstance[index].file,
        folder: submitData["Emplacement"]["id"],
      };

      setSelectedFiles(selectedFilesInstance);
      setActiveModal(ModalStatus.UPLOAD_MODAL);
    }
  }

  const handleCloseEditModal = () => {
    setActiveModal(ModalStatus.UPLOAD_MODAL);
    modalRef.current?.toggleModal(true);
  };

  const handleStartModal = () => {
    setActiveModal(ModalStatus.MAIN_MODAL);

    if (selectedFiles.length > 0) setActiveModal(ModalStatus.UPLOAD_MODAL);

    modalRef.current?.toggleModal(true);
  };

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Medias", userRights);
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const EditModalRef = useRef<CommonModalWrapperRef>(null);
  const [selectedFiles, setSelectedFiles] = useState<ILocalFile[]>([]);
  const [activeModal, setActiveModal] = useState<ModalStatus>(
    ModalStatus.MAIN_MODAL,
  );
  const [fileToEdit, setFileToEdit] = useState<ILocalFile>();
  const [tabs, setTabs] = useState<Array<ITab>>([]);
  const [croppedImg, setCroppedImg] = useState<boolean>(false);

  useEffect(() => {
    const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
      event.preventDefault();
      const draggedFilesInstance: ILocalFile[] = [...selectedFiles];
      const dataTransfer: DataTransfer | null = event.dataTransfer;
      const length = dataTransfer?.files.length ?? 0;

      if (dataTransfer !== null) {
        for (let i = 0; i < length; i++) {
          const isThereFileSelected: ILocalFile[] = draggedFilesInstance.filter(
            (file) => file.name === dataTransfer.files[i].name,
          );

          const file = dataTransfer.files[i];

          savingFileToState(draggedFilesInstance, isThereFileSelected, file);
        }
      }
    };

    const handleFileChange = (event: { target: HTMLInputElement }) => {
      const selectedFilesInstance: ILocalFile[] = [...selectedFiles];
      const target: HTMLInputElement | null = event.target;
      const length = target.files?.length ?? 0;

      if (target.files !== null) {
        for (let i = 0; i < length; i++) {
          const isThereFileSelected: ILocalFile[] =
            selectedFilesInstance.filter(
              (file) => file.name === target.files?.[i].name,
            );

          const file = target.files[i];

          savingFileToState(selectedFilesInstance, isThereFileSelected, file);
        }
      }
    };

    function savingFileToState(
      selectedFilesInstance: ILocalFile[],
      isThereFileSelected: ILocalFile[],
      file: File,
    ) {
      if (isMimeType(file.type)) {
        if (file.type.split("/")[0] === "image") {
          const fr = new FileReader();

          fr.onload = function () {
            const img = new Image();

            img.onload = function () {
              if (isThereFileSelected.length === 0 && img.width && img.height) {
                selectedFilesInstance.push({
                  name: file.name,
                  alternativeText: file.name,
                  width: img.width,
                  height: img.height,
                  ext: `.${file.name.split(".")[1]}`,
                  mime: file.type,
                  size: file.size,
                  url: URL.createObjectURL(file),
                  createdAt: new Date(file.lastModified).toLocaleDateString(),
                  file: file,
                });
                setSelectedFiles(selectedFilesInstance);
                setActiveModal(ModalStatus.UPLOAD_MODAL);
              }
            };

            img.src = fr.result?.toString() ?? "";
          };

          fr.readAsDataURL(file);
        } else {
          if (isThereFileSelected.length === 0) {
            selectedFilesInstance.push({
              name: file.name,
              alternativeText: file.name,
              ext: `.${file.name.split(".")[1]}`,
              mime: file.type,
              size: file.size,
              url: URL.createObjectURL(file),
              createdAt: new Date(file.lastModified).toLocaleDateString(),
              file: file,
            });
            setSelectedFiles(selectedFilesInstance);
            setActiveModal(ModalStatus.UPLOAD_MODAL);
          }
        }
      }
    }

    const tabs = [
      {
        name: "FromComputer",
        title: "Depuis l'ordinateur",
        content: (
          <>
            <CommonDragDropFile
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleFileChange={handleFileChange}
            />
            <div className="c-MediaImportButton__Button">
              <CommonButton
                type="button"
                label={labels.cancelBtn}
                onClick={() => modalRef?.current?.toggleModal(false)}
              />
            </div>
          </>
        ),
        isEnabled: true,
      },
      {
        name: "FromURL",
        title: "Depuis une url",
        content: (
          <MediaImportUrl
            modalRef={modalRef}
            selectedFiles={selectedFiles}
            setSelectedFiles={setSelectedFiles}
            setActiveModal={setActiveModal}
          />
        ),
        isEnabled: true,
      },
    ];
    setTabs(tabs);

    switch (activeModal) {
      case ModalStatus.EDIT_IMG_MODAL:
        EditModalRef.current?.toggleModal(true);
        break;
    }
  }, [selectedFiles, activeModal, labels.cancelBtn]);

  return (
    <div className="c-MediaImportButton">
      <CommonButton
        label={labels.importBtn}
        style="primary"
        picto="import"
        isDisabled={!userPermissions.create}
        onClick={() => handleStartModal()}
      />
      <CommonModalWrapper ref={modalRef} onClose={handleCloseModal}>
        {activeModal === ModalStatus.MAIN_MODAL && <MainModal tabs={tabs} />}
        {activeModal === ModalStatus.UPLOAD_MODAL &&
          selectedFiles.length > 0 && (
            <UploadModal
              modalRef={modalRef}
              activePathId={activePathId}
              selectedFiles={selectedFiles}
              setActiveModal={setActiveModal}
              setSelectedFiles={setSelectedFiles}
              setFileToEdit={setFileToEdit}
            />
          )}
      </CommonModalWrapper>
      {activeModal === ModalStatus.EDIT_IMG_MODAL &&
        fileToEdit !== undefined && (
          <FormModal
            modalRef={EditModalRef}
            modalTitle={labels.detailsModalTitle}
            hasRequiredChildren="all"
            onSubmit={handleSaveNewFileInfo}
            formValidationMode="onChange"
            onClose={() => handleCloseEditModal()}
            submitButtonIsDisabled={croppedImg}
          >
            <EditModal
              folderHierarchy={folderHierarchy}
              activePathId={activePathId}
              onFileEdited={(file: ILocalFile) => setFileToEdit(file)}
              fileToEdit={fileToEdit}
              setCroppedImg={setCroppedImg}
            />
          </FormModal>
        )}
    </div>
  );
}
