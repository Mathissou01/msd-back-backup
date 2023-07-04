import _ from "lodash";
import classNames from "classnames";
import { FieldValues, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import React, { useEffect, useRef, useState } from "react";
import NextImage from "next/image";
import {
  GetFilesPaginationByPathIdDocument,
  useGetAllFoldersHierarchyQuery,
  useUpdateUploadFileMutation,
} from "../../../graphql/codegen/generated-types";
import {
  isTypename,
  removeNulls,
  removeQuotesInString,
} from "../../../lib/utilities";
import {
  fileSizeLimitationOptions,
  ILocalFile,
  isLocalFile,
  isMimeType,
  IUploadFileEntity,
  IUploadFileEntityResponse,
  remapUploadFileEntityToLocalFile,
  TAcceptedMimeTypes,
  updateUploadedFile,
} from "../../../lib/media";
import { useContract } from "../../../hooks/useContract";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import FormLabel from "../FormLabel/FormLabel";
import FormModal from "../FormModal/FormModal";
import EditModal from "../../Media/MediaImportButton/Modals/EditModal/EditModal";
import FormFileInputModals from "./FormFileInputModals/FormFileInputModals";
import "./form-file-input.scss";

interface IFormFileInputProps {
  name: string;
  label?: string;
  fileSizeLimitation?: number;
  validationLabel?: string;
  hasEcoConceptionMessage?: boolean;
  placeholder?: string;
  isRequired?: boolean;
  acceptedMimeTypes?: Array<TAcceptedMimeTypes>;
  mimeFilterContains?: string;
  mimeFilterNotContains?: string;
  isPriority?: boolean;
}

export default function FormFileInput({
  name,
  label,
  fileSizeLimitation = fileSizeLimitationOptions._30mb,
  validationLabel,
  hasEcoConceptionMessage = false,
  placeholder,
  isRequired = false,
  acceptedMimeTypes,
  mimeFilterContains,
  mimeFilterNotContains,
  isPriority = false,
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

  /* Methods */
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
        submitData[removeQuotesInString(labels.formDescLabel)];
      file.name = submitData[removeQuotesInString(labels.formNameLabel)];
      handleSetFile(file);
      setUploadLoading(true);
      const response = await updateUploadedFile(
        Number(submitData["Emplacement"]["id"]),
        file,
      );

      if (response === 200) {
        void UpdateUploadFileDocument({
          variables: {
            updateUploadFileId: file?.id,
            data: {
              name: submitData[removeQuotesInString(labels.formNameLabel)],
              folder: submitData["Emplacement"]["id"],
              alternativeText:
                submitData[removeQuotesInString(labels.formDescLabel)] ??
                submitData[removeQuotesInString(labels.formNameLabel)],
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
        setUploadLoading(false);
      }
    }
  }

  function handleDeleteFile() {
    setValue(name, null, { shouldDirty: true, shouldValidate: true });
    if (!hasDefaultValue.current) {
      resetField(name, { defaultValue: null });
    }
  }

  function handleEditFile(file: ILocalFile) {
    editModalRef.current?.toggleModal(true);
    setFileToEdit(file);
  }

  function handleSetFile(file: ILocalFile) {
    if (file !== undefined) {
      setValue(name, file, { shouldDirty: true, shouldValidate: true });
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

  function isNotRemapped(
    file: ILocalFile | IUploadFileEntityResponse | IUploadFileEntity,
  ): file is IUploadFileEntityResponse | IUploadFileEntity {
    return (
      isTypename<IUploadFileEntityResponse>(file, "UploadFileEntityResponse") ||
      isTypename<IUploadFileEntity>(file, "UploadFileEntity")
    );
  }

  /* Local Data */
  const { contract } = useContract();
  const contractFolderId = contract.attributes?.pathId;
  const defaultPath = `/1/${contractFolderId}`;
  const [activePathId, setActivePathId] = useState<number>(contractFolderId);
  const [activePath, setActivePath] = useState<string>(defaultPath);
  const [draggedFile, setDraggedFile] = useState<ILocalFile>();
  const [fileToEdit, setFileToEdit] = useState<ILocalFile>();
  const [croppedImg, setCroppedImg] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const editModalRef = useRef<CommonModalWrapperRef>(null);
  const hasDefaultValue = useRef<boolean>();
  const {
    watch,
    setValue,
    resetField,
    register,
    formState: { errors },
  } = useFormContext();
  const selectedFile:
    | ILocalFile
    | IUploadFileEntity
    | IUploadFileEntityResponse = watch(name);

  const { data: folderHierarchy } = useGetAllFoldersHierarchyQuery({
    variables: { path: activePath },
    fetchPolicy: "network-only",
  });
  // TODO: try to use loading and error of mutation
  const [UpdateUploadFileDocument] = useUpdateUploadFileMutation({
    refetchQueries: ["getAllFoldersHierarchy"],
  });

  const inputClassNames = classNames("c-FormFileInput", {
    "c-FormFileInput_error": errors.image,
  });

  useEffect(() => {
    // Check if field value is UploadFileEntityResponse or UploadFileEntity and automatically remap to ILocalFile
    if (isNotRemapped(selectedFile)) {
      if (selectedFile.__typename === "UploadFileEntityResponse") {
        resetField(name, {
          defaultValue: remapUploadFileEntityToLocalFile(selectedFile.data),
        });
      } else if (selectedFile.__typename === "UploadFileEntity") {
        resetField(name, {
          defaultValue: remapUploadFileEntityToLocalFile(selectedFile),
        });
      }
    }
  }, [selectedFile, name, resetField]);

  useEffect(() => {
    if (selectedFile === null || isLocalFile(selectedFile)) {
      if (hasDefaultValue.current === undefined) {
        hasDefaultValue.current = !!selectedFile;
      }
    }
  }, [selectedFile]);

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
              setValueAs: (v) => {
                if (typeof v === "string") {
                  return null;
                } else {
                  return v;
                }
              },
            })}
            type="hidden"
            aria-invalid={!!_.get(errors, name)}
          />
          {!selectedFile && !isNotRemapped(selectedFile) ? (
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
            isLocalFile(selectedFile) && (
              <div className="c-FormFileInput__Thumbnail">
                {selectedFile.mime?.split("/")[0] === "image" ? (
                  <div className="c-FormFileInput__Image">
                    {/** TODO: image css must be checked after solving the image preview issue  */}
                    <CommonLoader isLoading={uploadLoading}>
                      <NextImage
                        src={selectedFile.url}
                        width={245}
                        height={158}
                        alt={selectedFile.alternativeText ?? ""}
                        priority={isPriority}
                      />
                    </CommonLoader>
                  </div>
                ) : selectedFile.mime?.split("/")[1] === "pdf" ? (
                  <div className="c-FormFileInput__Picto c-FormFileInput__Picto_pdf" />
                ) : (
                  <div className="c-FormFileInput__Picto c-FormFileInput__Picto_doc" />
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
            )
          )}
        </FormLabel>
        {!selectedFile && !isNotRemapped(selectedFile) && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: { message: string }) => (
              <CommonFormErrorText
                message={message}
                errorId={`${name}_error`}
              />
            )}
          />
        )}
      </div>
      <FormModal
        modalRef={editModalRef}
        modalTitle={labels.detailsModalTitle}
        hasRequiredChildren="all"
        onSubmit={handleSaveNewFileInfo}
        submitButtonIsDisabled={croppedImg}
        formValidationMode="onChange"
      >
        <EditModal
          folderHierarchy={
            folderHierarchy?.getAllFoldersHierarchy?.filter(removeNulls) ?? []
          }
          activePathId={activePathId}
          onFileEdited={(file: ILocalFile) => setFileToEdit(file)}
          fileToEdit={fileToEdit}
          setCroppedImg={setCroppedImg}
        />
      </FormModal>
    </>
  );
}
