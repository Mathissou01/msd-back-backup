import {
  GetFilesPaginationByFolderIdDocument,
  UploadFileInput,
  useCreateNewFileMutation,
} from "../../../../../graphql/codegen/generated-types";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import MediaCard, {
  MediaCardParentOptions,
} from "../../../MediaCard/MediaCard";
import { IFileToEdit, ModalStatus } from "../../MediaImportButton";

interface IUploadModal {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  path: string;
  contractFolderId: string | null;
  selectedFiles: IFileToEdit[];
  setSelectedFiles: React.Dispatch<React.SetStateAction<IFileToEdit[]>>;
  setActiveModal: React.Dispatch<React.SetStateAction<ModalStatus>>;
  setFileToEdit: React.Dispatch<React.SetStateAction<IFileToEdit | undefined>>;
  handleCalculateFileSize: (arg: number) => string;
}

export default function UploadModal({
  modalRef,
  path,
  contractFolderId,
  selectedFiles,
  setActiveModal,
  setSelectedFiles,
  setFileToEdit,
  handleCalculateFileSize,
}: IUploadModal) {
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

  /** Methods */
  const handleEditFile = (file: IFileToEdit, width: number, height: number) => {
    modalRef.current?.toggleModal(false);
    setActiveModal(ModalStatus.EDIT_IMG_MODAL);

    setFileToEdit({
      name: file.name,
      alternativeText: file.alternativeText ?? file.name,
      width: width,
      height: height,
      ext: file.ext,
      mime: file.mime,
      size: handleCalculateFileSize(Number(file.size.split(" ")[0])),
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

  async function handleUploadFile() {
    const selectedFilesInstance: IFileToEdit[] = [...selectedFiles];
    const length = selectedFilesInstance.length;

    for (let i = 0; i < length; i++) {
      const variables: UploadFileInput = {
        name: selectedFilesInstance[i].name,
        ext: selectedFilesInstance[i].ext,
        mime: selectedFilesInstance[i].file?.type,
        size: Number(selectedFilesInstance[i].size.split(" ")[0]),
        url: selectedFilesInstance[i].url,
        folderPath: selectedFilesInstance[i].path ?? path,
        folder: selectedFilesInstance[i].pathId ?? contractFolderId,
        width: selectedFilesInstance[i].width,
        height: selectedFilesInstance[i].height,
        alternativeText: selectedFilesInstance[i].alternativeText,
        formats: null,
        hash: "",
        previewUrl: null,
        provider: "",
        provider_metadata: null,
      };

      createNewFile({
        variables: { createUploadFileData2: variables },
        refetchQueries: [
          {
            query: GetFilesPaginationByFolderIdDocument,
            variables: { contractFolderId },
          },
          "getFilesPaginationByFolderId",
        ],
      });
    }
    handleReInitModals();
  }

  const handleReInitModals = () => {
    const init: IFileToEdit[] = [];
    setSelectedFiles(init);
    !createNewFileLoading &&
      !createNewFileError &&
      modalRef.current?.toggleModal(false);
  };

  /** External Data */
  const [
    createNewFile,
    { loading: createNewFileLoading, error: createNewFileError },
  ] = useCreateNewFileMutation();

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
              loading={createNewFileLoading}
              parent={MediaCardParentOptions.MODAL}
              handleEditFile={(x, y, z) => handleEditFile(x, y, z)}
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
          onClick={() => handleUploadFile()}
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
