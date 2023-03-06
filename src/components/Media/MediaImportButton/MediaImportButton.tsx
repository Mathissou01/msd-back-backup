import React, { useEffect, useRef, useState } from "react";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../Common/CommonModalWrapper/CommonModalWrapper";
import { Tab } from "../../TabBlock/TabBlock";
import CommonDragDropFile from "../../Common/CommonDragDropFile/CommonDragDropFile";
import CommonButton from "../../Common/CommonButton/CommonButton";
import MainModal from "./Modals/MainModal/MainModal";
import UploadModal from "./Modals/UploadModal/UploadModal";
import EditModal from "./Modals/EditModal/EditModal";
import "./media-import-button.scss";
import { RequestFolders } from "../../../graphql/codegen/generated-types";
import FormModal from "../../Form/FormModal/FormModal";
import { FieldValues } from "react-hook-form";

export enum ModalStatus {
  MAIN_MODAL = "MAIN_MODAL",
  UPLOAD_MODAL = "UPLOAD_MODAL",
  EDIT_IMG_MODAL = "EDIT_IMG_MODAL",
}

export interface IFileToEdit {
  name: string;
  alternativeText: string;
  width: number;
  height: number;
  ext: string;
  mime: string;
  size: string;
  url: string;
  date?: string;
  file?: File;
  path?: string;
  pathId?: string;
}

interface IMediaImportButton {
  folderHierarchy: Array<RequestFolders>;
  activePathId: number;
}

export default function MediaImportButton({
  folderHierarchy,
  activePathId,
}: IMediaImportButton) {
  /** Static Data */
  const labels = {
    importBtn: "Importer des médias",
    detailsModalTitle: "Détails",
    formNameLabel: "Nom Du fichier",
    formDescLabel: "Description de l'image",
    formSelectLabel: "Emplacement",
  };

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const EditModalRef = useRef<CommonModalWrapperRef>(null);
  const [selectedFiles, setSelectedFiles] = useState<IFileToEdit[]>([]);
  const [activeModal, setActiveModal] = useState<ModalStatus>(
    ModalStatus.MAIN_MODAL,
  );
  const [fileToEdit, setFileToEdit] = useState<IFileToEdit>();
  const [tabs, setTabs] = useState<Array<Tab>>([]);

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

  const handleCalculateFileSize = (size: number): string => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) +
      " " +
      ["B", "KB", "MB", "GB", "TB"][i]
    );
  };

  const handleReplaceSpecialChars = (arg: string) =>
    arg.replace(/['"]/g, "") ?? arg;

  async function handleSaveNewFileInfo(submitData: FieldValues) {
    const selectedFilesInstance: IFileToEdit[] = [...selectedFiles];
    const file: IFileToEdit[] = selectedFilesInstance.filter(
      (file) => file.name === fileToEdit?.name,
    );

    if (
      (file &&
        fileToEdit &&
        fileToEdit?.name !== submitData[labels.formNameLabel]) ||
      fileToEdit?.alternativeText !== ""
    ) {
      const newFile = new File(
        [file[0].name],
        submitData[labels.formNameLabel],
        {
          type: file[0].mime,
          lastModified: new Date().getTime(),
        },
      );
      const index = selectedFilesInstance.indexOf(file[0]);
      selectedFilesInstance[index] = {
        name: submitData[handleReplaceSpecialChars(labels.formNameLabel)],
        alternativeText:
          submitData[handleReplaceSpecialChars(labels.formDescLabel)],
        width: fileToEdit?.width ?? 0,
        height: fileToEdit?.height ?? 0,
        ext: fileToEdit?.ext ?? "",
        mime: fileToEdit?.mime ?? "",
        size: fileToEdit?.size ?? "",
        url: fileToEdit?.url ?? "",
        date: fileToEdit?.date ?? "",
        file: newFile,
        path: submitData["Emplacement"]["path"],
        pathId: submitData["Emplacement"]["pathId"],
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

  useEffect(() => {
    const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
      event.preventDefault();
      const draggedFilesInstance: IFileToEdit[] = [...selectedFiles];
      const dataTransfer: DataTransfer | null = event.dataTransfer;
      const length = dataTransfer?.files.length ?? 0;

      if (dataTransfer !== null) {
        for (let i = 0; i < length; i++) {
          const isThereFileSelected: IFileToEdit[] =
            draggedFilesInstance.filter(
              (file) => file.name === dataTransfer.files[i].name,
            );

          const file = dataTransfer.files[i];
          if (isThereFileSelected.length === 0) {
            draggedFilesInstance.push({
              name: file.name,
              alternativeText: file.name,
              width: 0,
              height: 0,
              ext: file.name.split(".")[1],
              mime: file.type.split("/")[0],
              size: handleCalculateFileSize(file.size),
              url: URL.createObjectURL(file),
              date: new Date(file.lastModified).toLocaleDateString(),
              file: file,
            });
            setSelectedFiles(draggedFilesInstance);
            setActiveModal(ModalStatus.UPLOAD_MODAL);
          }
        }
      }
    };

    const handleFileChange = (event: { target: HTMLInputElement }) => {
      const selectedFilesInstance: IFileToEdit[] = [...selectedFiles];
      const target: HTMLInputElement | null = event.target;
      const length = target.files?.length ?? 0;

      if (target.files !== null) {
        for (let i = 0; i < length; i++) {
          const isThereFileSelected: IFileToEdit[] =
            selectedFilesInstance.filter(
              (file) => file.name === target.files?.[i].name,
            );

          const file = target.files[i];
          if (isThereFileSelected.length === 0) {
            selectedFilesInstance.push({
              name: file.name,
              alternativeText: file.name,
              width: 0,
              height: 0,
              ext: file.name.split(".")[1],
              mime: file.type,
              size: handleCalculateFileSize(file.size),
              url: URL.createObjectURL(file),
              date: new Date(file.lastModified).toLocaleDateString(),
              file: file,
            });
            setSelectedFiles(selectedFilesInstance);
            setActiveModal(ModalStatus.UPLOAD_MODAL);
          }
        }
      }
    };

    const tabs = [
      {
        name: "FromComputer",
        title: "Depuis l'ordinateur",
        content: (
          <CommonDragDropFile
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleFileChange={handleFileChange}
          />
        ),
        isEnabled: true,
      },
      /** TODO: add tab later */
      // {
      //   name: "FromURL",
      //   title: "Depuis une url",
      //   content: <div />,
      //   isEnabled: true,
      // },
    ];
    setTabs(tabs);

    switch (activeModal) {
      case ModalStatus.EDIT_IMG_MODAL:
        EditModalRef.current?.toggleModal(true);
        break;
    }
  }, [selectedFiles, activeModal]);

  return (
    <div className="c-MediaImportButton">
      <>
        <CommonButton
          label={labels.importBtn}
          style="primary"
          picto="import"
          onClick={() => handleStartModal()}
        />
        <CommonModalWrapper ref={modalRef} onClose={handleCloseModal}>
          {activeModal === ModalStatus.MAIN_MODAL && (
            <MainModal modalRef={modalRef} tabs={tabs} />
          )}
          {activeModal === ModalStatus.UPLOAD_MODAL &&
            selectedFiles.length > 0 && (
              <UploadModal
                modalRef={modalRef}
                path={
                  folderHierarchy.find(
                    (folder) => folder?.pathId === activePathId.toString(),
                  )?.path ?? "/1"
                }
                activePathId={activePathId}
                selectedFiles={selectedFiles}
                setActiveModal={setActiveModal}
                setSelectedFiles={setSelectedFiles}
                setFileToEdit={setFileToEdit}
                handleCalculateFileSize={handleCalculateFileSize}
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
            >
              <EditModal
                folderHierarchy={folderHierarchy}
                activePathId={activePathId}
                fileToEdit={fileToEdit}
                handleReplaceSpecialChars={handleReplaceSpecialChars}
              />
            </FormModal>
          )}
      </>
    </div>
  );
}
