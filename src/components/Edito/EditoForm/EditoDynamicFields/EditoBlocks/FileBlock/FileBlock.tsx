import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import {
  UploadFile,
  UploadFileEntityResponse,
} from "../../../../../../graphql/codegen/generated-types";
import { IBlocksFile } from "../../../../../../lib/edito";
import { formatFileSize } from "../../../../../../lib/formatFileSize";
import FormInput from "../../../../../Form/FormInput/FormInput";
import { CommonModalWrapperRef } from "../../../../../Common/CommonModalWrapper/CommonModalWrapper";
import { IFileToEdit } from "../../../../../Media/MediaImportButton/MediaImportButton";
import MediaBlock from "../../../../../Media/MediaBlock/MediaBlock";
import pdfIcon from "./../../../../../../../public/images/pictos/pdf.svg";
import docIcon from "./../../../../../../../public/images/pictos/doc.svg";
import "./file-block.scss";

interface IFileBlockProps {
  blockName: string;
}

export default function FileBlock({ blockName }: IFileBlockProps) {
  /* Static Data */
  const labels = {
    labelInfosDragDrop: `Clicker pour ajouter un fichier depuis la bibliotèque de média 
      ou Glissez-déposez un fichier dans cette zone.`,
  };
  const mediaImage = "/images/pictos/add-photo.svg";
  const fileSizeLimitation = 31457280;

  /** Local Data */
  const [id, setId] = useState<string>();
  const [hasFileToUpload, setHasFileToUpload] = useState<
    IFileToEdit | undefined
  >();
  const { getValues } = useFormContext();

  const fieldNames: { [name: string]: keyof IBlocksFile } = {
    document: "document",
  };

  /** Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const [document, setDocument] = useState<UploadFile | undefined>();

  /** Methods */
  const handleChoosingFile = (): void => modalRef.current?.toggleModal(true);

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const dataTransfer: DataTransfer | null = event.dataTransfer;

    if (dataTransfer !== null) {
      const file = dataTransfer.files[0];

      if (
        file.size < fileSizeLimitation &&
        file.type.split("/")[0] !== "image"
      ) {
        setHasFileToUpload({
          name: file.name,
          alternativeText: file.name,
          ext: `.${file.name.split(".")[1]}`,
          mime: file.type,
          size: file.size,
          url: URL.createObjectURL(file),
          date: new Date(file.lastModified).toLocaleDateString(),
          file: file,
        });
        modalRef.current?.toggleModal(true);
      }
    }
  }

  function handleSelectedFile(file: { id: string; file: IFileToEdit }) {
    setHasFileToUpload(undefined);
    const mappedData: UploadFile = {
      alternativeText: file.file?.alternativeText,
      ext: file.file.ext,
      height: file.file.height,
      mime: file.file.mime,
      name: file.file.name,
      size: Number(file.file.size),
      url: file.file.url,
      width: file.file.width,
      caption: "",
      createdAt: "",
      formats: "",
      hash: "",
      previewUrl: "",
      provider: "",
      provider_metadata: "",
      related: [],
      updatedAt: "",
    };

    setDocument(mappedData);
    setId(file.id);
  }

  useEffect(() => {
    const file = getValues(`${blockName}.${fieldNames.document}`);
    if (file) {
      const mappedData: UploadFileEntityResponse = file;
      if (mappedData.data?.attributes !== null) {
        setDocument(mappedData.data?.attributes);
      }
    }
  }, [blockName, setDocument, getValues, fieldNames.document]);

  return (
    <div>
      {id && (
        <FormInput
          type="hidden"
          label=""
          name={`${blockName}.${fieldNames.document}`}
          defaultValue={id}
        />
      )}
      {document === undefined || hasFileToUpload !== undefined ? (
        <div
          className="c-FileBlock"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDrop(e)}
        >
          <div
            className="c-FileBlock__LabelDragDrop "
            onClick={() => handleChoosingFile()}
          >
            <div className="c-FileBlock__Drag">
              <Image src={mediaImage} alt="" width={50} height={50} />
              <span className="c-CommonDragDropFile__LabelInfo">
                {labels.labelInfosDragDrop}
              </span>
            </div>
          </div>
          <MediaBlock
            modalRef={modalRef}
            fileTypeNotContain="image"
            file={hasFileToUpload}
            selectedFile={(selectedFile: { id: string; file: IFileToEdit }) =>
              handleSelectedFile(selectedFile)
            }
          />
        </div>
      ) : (
        <div className="c-FileBlock__FileWrapper">
          {document.url && document.mime.split("/")[1] === "pdf" ? (
            <div className="c-FileBlock__Doc">
              <Image src={pdfIcon} width={48} height={58} alt="" />
            </div>
          ) : (
            <div className="c-FileBlock__Doc">
              <Image src={docIcon} width={48} height={58} alt="" />
            </div>
          )}
          <div className="c-FileBlock__ButtonsWrapper">
            <button
              type="button"
              className="c-FileBlock__Action_add"
              // TODO : onClick={() => console.log("Add")}
            />
            <button
              type="button"
              className="c-FileBlock__Action_link"
              // TODO : onClick={() => console.log("Copy Link", document.url)}
            />
            <button
              type="button"
              className="c-FileBlock__Action_delete"
              // TODO : onClick={() => console.log("Delete")}
            />
            <button
              type="button"
              className="c-FileBlock__Action_edit"
              // TODO : onClick={() => console.log("Edit")}
            />
          </div>
          <div className="c-FileBlock__FileInfo">{`${
            document.name
          } - ${formatFileSize(document.size)}`}</div>
        </div>
      )}
    </div>
  );
}
