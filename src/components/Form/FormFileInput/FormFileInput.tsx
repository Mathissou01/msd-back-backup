import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import _ from "lodash";
import classNames from "classnames";
import { FieldValues, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { removeNulls } from "../../../lib/utilities";
import {
  GetFilesPaginationByPathIdDocument,
  UploadFileEntityResponse,
  useGetAllFoldersHierarchyQuery,
  useUpdateUploadFileMutation,
} from "../../../graphql/codegen/generated-types";
import {
  fileSizeLimitation,
  handleReplaceSpecialChars,
  ILocalFile,
  isMimeType,
  TAcceptedMimeTypes,
} from "../../../lib/media";
import { useContract } from "../../../hooks/useContract";
import CommonErrorText from "../../Common/CommonErrorText/CommonErrorText";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import FormLabel from "../FormLabel/FormLabel";
import FormModal from "../FormModal/FormModal";
import EditModal from "../../Media/MediaImportButton/Modals/EditModal/EditModal";
import FormFileInputModals from "./FormFileInputModals/FormFileInputModals";
import pdfIcon from "./../../../../public/images/pictos/pdf.svg";
import docIcon from "./../../../../public/images/pictos/doc.svg";
import "./form-file-input.scss";

interface IFormFileInputProps {
  name: string;
  label: string;
  validationLabel?: string;
  hasEcoConceptionMessage?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  acceptedMimeTypes?: Array<TAcceptedMimeTypes>;
  mimeFilterContains?: string;
  mimeFilterNotContains?: string;
}

export default function FormFileInput({
  name,
  label,
  validationLabel,
  hasEcoConceptionMessage = false,
  placeholder,
  isRequired = false,
  acceptedMimeTypes,
  mimeFilterContains,
  mimeFilterNotContains,
}: IFormFileInputProps) {
  /* Static Data */
  const ecoConceptionMessage =
    "Eco-conception: pensez à réduire la taille et le poids de vos images. Utilisez des logiciels ou des outils en ligne pour optimiser vos images (www.iloveimg.com par exemple).";
  const errorMessages = {
    required: "Ce champ est obligatoire",
  };
  const labels = {
    detailsModalTitle: "Détails",
    formNameLabel: "Nom Du fichier",
    formDescLabel: "Description de l'image",
  };
  const addImagePicto = "/images/pictos/add-photo.svg";

  /* Local Data */
  const { contract } = useContract();
  const contractFolderId = contract.attributes?.pathId;
  const defaultPath = `/1/${contractFolderId}`;
  const [activePathId, setActivePathId] = useState<number>(contractFolderId);
  const [activePath, setActivePath] = useState<string>(defaultPath);
  const { data: folderHierarchy } = useGetAllFoldersHierarchyQuery({
    variables: { path: activePath },
  });
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const [draggedFile, setDraggedFile] = useState<ILocalFile>();
  const editModalRef = useRef<CommonModalWrapperRef>(null);
  const [fileToEdit, setFileToEdit] = useState<ILocalFile>();
  const hasDefaultValue = useRef<boolean>();
  const [selectedFile, setSelectedFile] = useState<ILocalFile>();
  const {
    getValues,
    watch,
    setValue,
    resetField,
    register,
    formState: { errors },
  } = useFormContext();

  const inputClassNames = classNames("c-FormFileInput", {
    "c-FormFileInput_error": errors.image,
  });
  const currentFile: UploadFileEntityResponse = watch(name);
  const [UpdateUploadFileDocument] = useUpdateUploadFileMutation();

  /* Method */
  const onClickDragDrop = (): void => modalRef.current?.toggleModal(true);

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const dataTransfer: DataTransfer | null = event.dataTransfer;
    if (dataTransfer !== null) {
      const file = dataTransfer.files[0];
      if (
        file.size < fileSizeLimitation &&
        acceptedMimeTypes &&
        isMimeType(file.type)
      ) {
        if (file.type.split("/")[0] === "image" && mimeFilterContains) {
          const fr = new FileReader();
          fr.onload = function () {
            const img = new Image();
            img.onload = function () {
              if (img.width && img.height) {
                setDraggedFile({
                  name: file.name,
                  alternativeText: file.name,
                  ext: `.${file.name.split(".")[1]}`,
                  mime: file.type,
                  size: file.size,
                  width: img.width,
                  height: img.height,
                  url: URL.createObjectURL(file),
                  createdAt: new Date(file.lastModified).toLocaleDateString(),
                  file: file,
                });
              }
            };
            img.src = fr.result?.toString() ?? "";
          };
          fr.readAsDataURL(file);
          modalRef.current?.toggleModal(true);
        } else if (
          file.type.split("/")[0] !== "image" &&
          mimeFilterNotContains
        ) {
          setDraggedFile({
            name: file.name,
            alternativeText: file.name,
            ext: `.${file.name.split(".")[1]}`,
            mime: file.type,
            size: file.size,
            url: URL.createObjectURL(file),
            createdAt: new Date(file.lastModified).toLocaleDateString(),
            file: file,
          });
          modalRef.current?.toggleModal(true);
        }
      }
    }
  }

  async function handleSaveNewFileInfo(submitData: FieldValues) {
    const file: ILocalFile | undefined = fileToEdit;
    if (file?.id !== undefined) {
      file.alternativeText =
        submitData[handleReplaceSpecialChars(labels.formDescLabel)];
      file.name = submitData[handleReplaceSpecialChars(labels.formNameLabel)];
      handleSetFile(file);

      UpdateUploadFileDocument({
        variables: {
          updateUploadFileId: file?.id,
          data: {
            name: submitData[handleReplaceSpecialChars(labels.formNameLabel)],
            folder: submitData["Emplacement"]["id"],
            alternativeText:
              submitData[handleReplaceSpecialChars(labels.formDescLabel)] ??
              submitData[handleReplaceSpecialChars(labels.formNameLabel)],
          },
        },
        refetchQueries: [
          {
            query: GetFilesPaginationByPathIdDocument,
            variables: {
              filters: {
                folder: {
                  pathId: {
                    eq: activePathId,
                  },
                },
              },
            },
          },
        ],
      });
    }
  }

  function handleDeleteFile() {
    if (hasDefaultValue.current) {
      setValue(name, null, { shouldDirty: true, shouldValidate: true });
    } else {
      resetField(name);
    }
    setSelectedFile(undefined);
  }

  function handleEditFile(file: ILocalFile) {
    editModalRef.current?.toggleModal(true);
    setFileToEdit(file);
  }

  function handleSetFile(file: ILocalFile) {
    if (file !== undefined) {
      setSelectedFile(file);
      setValue(name, file, { shouldDirty: true });
      modalRef.current?.toggleModal(false);
    }
  }

  function onResetDraggedFile() {
    setDraggedFile(undefined);
  }

  function handlePathChange(pathId: number, path: string) {
    setActivePathId(pathId);
    setActivePath(path);
  }

  useEffect(() => {
    if (hasDefaultValue.current === undefined) {
      hasDefaultValue.current = !!currentFile;
    }
  }, [currentFile]);

  useEffect(() => {
    if (currentFile) {
      if (currentFile?.data?.id && currentFile.data?.attributes) {
        const file = currentFile.data?.attributes;
        const mappedData: ILocalFile = {
          id: currentFile.data.id,
          alternativeText: file.alternativeText ?? "",
          name: file.name,
          ext: file.ext ?? file.name.split(".")[1],
          mime: file.mime,
          size: file.size,
          url: file.url,
          width: file.width ?? 0,
          height: file.height ?? 0,
          createdAt: new Date(file.createdAt).toLocaleDateString(),
          hash: file.hash,
          provider: file.provider,
        };
        if (mappedData.id !== selectedFile?.id) {
          setSelectedFile(mappedData);
          setValue(name, mappedData, { shouldDirty: true });
        }
      } else if (name.split(".")[0] === "blocks") {
        const file: ILocalFile = getValues(name);
        if (file) {
          setSelectedFile(file);
        }
      }
    }
  }, [currentFile, selectedFile, getValues, setValue, name]);
  return (
    <>
      <div className={inputClassNames}>
        <FormLabel
          forId={name}
          label={label}
          isRequired={isRequired}
          secondaryLabel={hasEcoConceptionMessage ? ecoConceptionMessage : ""}
          validationLabel={validationLabel}
        >
          <input
            {...register(name, {
              required: { value: isRequired, message: errorMessages.required },
            })}
            type="hidden"
            aria-invalid={!!_.get(errors, name)}
          />
          {!selectedFile ? (
            <>
              <div
                className={classNames("c-FormFileInput__DragDrop", {
                  "c-FormFileInput__DragDrop_invalid": _.get(errors, name),
                })}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => handleDrop(e)}
                onClick={() => onClickDragDrop()}
                id={name}
                aria-invalid={!!_.get(errors, name)}
                aria-errormessage={`${name}_error`}
              >
                <NextImage src={addImagePicto} alt="" width={50} height={50} />
                <span className="c-FormFileInput__Placeholder">
                  {placeholder}
                </span>
              </div>
              <FormFileInputModals
                modalRef={modalRef}
                name={name}
                draggedFile={draggedFile}
                mimeFilterContains={mimeFilterContains}
                mimeFilterNotContains={mimeFilterNotContains}
                onResetDraggedFile={onResetDraggedFile}
                onSetFile={handleSetFile}
                onPathChange={handlePathChange}
              />
            </>
          ) : (
            <div className="c-FormFileInput__Thumbnail">
              {selectedFile && selectedFile.mime.split("/")[0] === "image" ? (
                <div className="c-FormFileInput__Image">
                  {/** TODO: image css must be checked after solving the image preview issue  */}
                  <NextImage
                    src={selectedFile.url}
                    width={245}
                    height={158}
                    alt={selectedFile.alternativeText ?? ""}
                  />
                </div>
              ) : selectedFile.mime.split("/")[1] === "pdf" ? (
                <div className="c-FormFileInput__Doc">
                  <NextImage src={pdfIcon} width={48} height={58} alt="" />
                </div>
              ) : (
                <div className="c-FormFileInput__Doc">
                  <NextImage src={docIcon} width={48} height={58} alt="" />
                </div>
              )}
              <div className="c-FormFileInput__ButtonsWrapper">
                <button
                  type="button"
                  className="c-FormFileInput__Delete"
                  onClick={() => handleDeleteFile()}
                />
                <button
                  type="button"
                  className="c-FormFileInput__Edit"
                  onClick={() => handleEditFile(selectedFile)}
                />
              </div>
            </div>
          )}
        </FormLabel>
        {!selectedFile && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <CommonErrorText message={message} errorId={`${name}_error`} />
            )}
          />
        )}
      </div>
      <FormModal
        modalRef={editModalRef}
        modalTitle={labels.detailsModalTitle}
        hasRequiredChildren="all"
        onSubmit={handleSaveNewFileInfo}
        formValidationMode="onChange"
      >
        <EditModal
          folderHierarchy={
            folderHierarchy?.getAllFoldersHierarchy?.filter(removeNulls) ?? []
          }
          activePathId={activePathId}
          fileToEdit={fileToEdit}
        />
      </FormModal>
    </>
  );
}
