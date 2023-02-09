import React, { useEffect, useRef, useState } from "react";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../Common/CommonModalWrapper/CommonModalWrapper";
import TabBlock, { Tab } from "../../TabBlock/TabBlock";
import CommonDragDropFile from "../../Common/CommonDragDropFile/CommonDragDropFile";
import CommonButton from "../../Common/CommonButton/CommonButton";
import MediaCard from "../MediaCard/MediaCard";
import "./media-import-button.scss";

export default function MediaImportButton() {
  /* Local Data */
  const childRef = useRef<CommonModalWrapperRef>(null);
  const [tabs, setTabs] = useState<Array<Tab>>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const labels = {
    modalTitle: "Ajouter des médias",
    buttonLabel: "Importer des médias",
    cancelButtonLabel: "Annuler",
    addedMediaBtn: `Ajouter ${selectedFiles.length} ${
      selectedFiles.length > 1 ? "médias" : "média"
    } dans la librairie`,
    headerAmount: `${selectedFiles.length} ${
      selectedFiles.length > 1 ? "médias" : "média"
    } prêt à être
    importé.`,
    headerText:
      "Editez ses attributs avant de l'ajouter à la bibliothèque de médias.",
  };

  /* Methods */
  const handleDragOver = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  function handleClose() {
    isFileSelected ? setIsFileSelected(true) : setIsFileSelected(false);
  }

  useEffect(() => {
    const handleDrop = (event: React.DragEvent<HTMLFormElement>) => {
      event.preventDefault();
      const draggedFilesInstance: File[] = [...selectedFiles];
      const dataTransfer: DataTransfer | null = event.dataTransfer;
      const length = dataTransfer?.files.length ?? 0;

      if (dataTransfer !== null) {
        for (let i = 0; i < length; i++) {
          const isThereFileSelected: File[] = draggedFilesInstance.filter(
            (file) => file.name === dataTransfer.files[i].name,
          );

          if (isThereFileSelected.length === 0) {
            draggedFilesInstance.push(dataTransfer.files[i]);
            setSelectedFiles(draggedFilesInstance);
            setIsFileSelected(true);
          }
        }
      }
    };

    const handleFileChange = (event: { target: HTMLInputElement }) => {
      const selectedFilesInstance: File[] = [...selectedFiles];
      const target: HTMLInputElement | null = event.target;
      const length = target.files?.length ?? 0;

      if (target.files !== null) {
        for (let i = 0; i < length; i++) {
          const isThereFileSelected: File[] = selectedFilesInstance.filter(
            (file) => file.name === target.files?.[i].name,
          );

          if (isThereFileSelected.length === 0) {
            selectedFilesInstance.push(target.files[i]);
            setSelectedFiles(selectedFilesInstance);
            setIsFileSelected(true);
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
  }, [selectedFiles]);

  return (
    <div className="c-ImportMediaAddButton">
      <CommonButton
        label={labels.buttonLabel}
        style="primary"
        picto="import"
        onClick={() => childRef.current?.toggleModal(true)}
      />
      <CommonModalWrapper ref={childRef} onClose={handleClose}>
        <hgroup>
          <div className="c-ImportMediaAddButton__Title">
            {labels.modalTitle}
          </div>
        </hgroup>
        {!isFileSelected ? (
          <>
            <TabBlock
              tabs={tabs}
              initialTabName={"FromComputer"}
              isAlignLeftMediaLibrary={true}
            />
            <div className="c-ImportMediaAddButton__Button">
              <CommonButton
                type="button"
                label={labels.cancelButtonLabel}
                onClick={() => childRef.current?.toggleModal(false)}
              />
            </div>
          </>
        ) : (
          <>
            <div className="c-ImportMediaAddButton__Header">
              <strong>
                {labels.headerAmount}
                <br />
                {labels.headerText}
              </strong>
              <CommonButton
                label={labels.buttonLabel}
                style="primary"
                onClick={() => setIsFileSelected(false)}
              />
            </div>
            <div className="c-ImportMediaAddButton__Body">
              {selectedFiles &&
                selectedFiles.map((file, index) => (
                  <MediaCard key={index} file={file} />
                ))}
            </div>
            <div className="c-ImportMediaAddButton__Footer">
              <CommonButton
                type="button"
                label={labels.addedMediaBtn}
                style="primary"
                // TODO: upload
              />
              <CommonButton
                type="button"
                label={labels.cancelButtonLabel}
                onClick={() => childRef.current?.toggleModal(false)}
              />
            </div>
          </>
        )}
      </CommonModalWrapper>
    </div>
  );
}
