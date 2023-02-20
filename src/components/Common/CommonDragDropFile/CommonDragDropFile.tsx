import React, { useRef } from "react";
import Image from "next/image";
import CommonButton from "../CommonButton/CommonButton";
import "./common-drag-drop-file.scss";

type TAcceptedTypes =
  | "image/png"
  | "image/jpeg"
  | "image/gif"
  | "image/svg"
  | "image/tiff"
  | "image/ico"
  | "image/dvu"
  | ".doc"
  | ".docx"
  | ".pdf"
  | ".txt"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

interface ICommonDragDropFileProps {
  handleDragOver: (event: { preventDefault: () => void }) => void;
  handleDrop: (event: React.DragEvent<HTMLFormElement>) => void;
  handleFileChange: (event: { target: HTMLInputElement }) => void;
  acceptedTypes?: Array<TAcceptedTypes>;
}

export default function CommonDragDropFile({
  handleDragOver,
  handleDrop,
  handleFileChange,
  acceptedTypes = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/svg",
    "image/tiff",
    "image/ico",
    "image/dvu",
    ".doc",
    ".docx",
    ".pdf",
    ".txt",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
}: ICommonDragDropFileProps) {
  /* Static Data */
  const labels = {
    labelInfosDragDrop: "Glissez-déposez une image dans cette zone ou",
    uploadFile: "Parcourir les fichiers",
  };
  const mediaImage = "/images/pictos/add-photo.svg";

  /* Local Data */
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        className="c-CommonDragDropFile"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e)}
        data-testid="common-drag-drop-file-form"
      >
        <input
          type="file"
          hidden
          id="input-file-upload"
          data-testid="common-drag-drop-file-input"
          accept={acceptedTypes.join(" ")}
          multiple={true}
          ref={inputRef}
          onChange={handleFileChange}
        />
        <label
          className="c-CommonDragDropFile__LabelDragDrop"
          htmlFor="input-file-upload"
        >
          <div className="c-CommonDragDropFile__Drag">
            <Image src={mediaImage} alt="" width={50} height={50} />
            <span className="c-CommonDragDropFile__LabelInfo">
              {labels.labelInfosDragDrop}
            </span>
            <CommonButton
              type="button"
              style="primary"
              label={labels.uploadFile}
              onClick={() => inputRef.current?.click()}
            />
          </div>
        </label>
      </form>
    </>
  );
}
