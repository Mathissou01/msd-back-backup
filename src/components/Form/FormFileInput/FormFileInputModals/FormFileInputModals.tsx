import { useContract } from "../../../../hooks/useContract";
import { ILocalFile } from "../../../../lib/media";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../../Common/CommonModalWrapper/CommonModalWrapper";
import DragDropModal from "./DragDropModal/DragDropModal";
import SelectingModal from "./SelectingModal/SelectingModal";

interface IMediaBlockProps {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  draggedFile?: ILocalFile;
  mimeFilterContains?: string;
  mimeFilterNotContains?: string;
  onResetDraggedFile: () => void;
  onSetFile: (file: ILocalFile) => void;
  onPathChange: (pathId: number, path: string) => void;
}

export default function FormFileInputModals({
  modalRef,
  onResetDraggedFile,
  draggedFile,
  mimeFilterContains,
  mimeFilterNotContains,
  onSetFile,
  onPathChange,
}: IMediaBlockProps) {
  /* Local Data */
  const { contract } = useContract();
  const contractFolderId = contract.attributes?.pathId;

  /* Methods */
  function handleFileSelected(selectedFile?: ILocalFile) {
    if (selectedFile) {
      onSetFile(selectedFile);
    }
  }

  return (
    <CommonModalWrapper ref={modalRef} onClose={onResetDraggedFile}>
      {draggedFile ? (
        <DragDropModal
          modalRef={modalRef}
          activePathId={contractFolderId}
          draggedFile={draggedFile}
          onSelectedFile={(file) => handleFileSelected(file)}
          onResetDraggedFile={onResetDraggedFile}
        />
      ) : (
        <SelectingModal
          modalRef={modalRef}
          isButtonDirty={false}
          mimeFilterContains={mimeFilterContains}
          mimeFilterNotContains={mimeFilterNotContains}
          onFinish={(file) => handleFileSelected(file)}
          onPathChange={onPathChange}
        />
      )}
    </CommonModalWrapper>
  );
}
