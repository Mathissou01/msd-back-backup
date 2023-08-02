import React, { RefObject, useState } from "react";
import { ILocalFile } from "../../../../../lib/media";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import SelectingModalContent from "./SelectingModalContent/SelectingModalContent";
import "./selecting-modal.scss";

interface ISelectingModalProps {
  modalRef: RefObject<CommonModalWrapperRef>;
  isButtonDirty: boolean;
  mimeFilterContains?: string;
  mimeFilterNotContains?: string;
  onFinish: (file?: ILocalFile) => void;
  onPathChange: (pathId: number, path: string) => void;
}

export default function SelectingModal({
  modalRef,
  isButtonDirty,
  mimeFilterContains,
  mimeFilterNotContains,
  onFinish,
  onPathChange,
}: ISelectingModalProps) {
  const labels = {
    modalTitle: "Ajouter des médias",
    confirm: "Terminer",
    cancel: "Annuler",
  };
  const [selectedFile, setSelectedFile] = useState<ILocalFile | null>();

  return (
    <>
      <div className="c-SelectingModal__Title">{labels.modalTitle}</div>
      <SelectingModalContent
        mimeFilterContains={mimeFilterContains}
        mimeFilterNotContains={mimeFilterNotContains}
        onPathChange={onPathChange}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />
      <div className="c-SelectingModal__Buttons">
        <CommonButton
          type="button"
          label={labels.confirm}
          style="primary"
          isDisabled={isButtonDirty}
          onClick={() => selectedFile && onFinish(selectedFile)}
        />
        <CommonButton
          type="button"
          label={labels.cancel}
          onClick={() => modalRef.current?.toggleModal(false)}
        />
      </div>
    </>
  );
}
