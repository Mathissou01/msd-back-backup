import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import classNames from "classnames";
import {
  GetUploadFilesDocument,
  GetUploadFilesQueryVariables,
  useGetAllFoldersHierarchyQuery,
  useGetUploadFilesLazyQuery,
  useGetUploadFoldersQuery,
  useGetLibraryBreadcrumbTrailQuery,
  useUpdateUploadFileByIdMutation,
  useDeleteUnpublishedMediaByImageIdsMutation,
  GetUploadFoldersDocument,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { IFolder, ILocalFile, TAcceptedMimeTypes } from "../../../lib/media";
import { removeQuotesInString } from "../../../lib/utilities";
import { getRightsByLabel } from "../../../lib/user";
import { useUser } from "../../../hooks/useUser";
import { useContract } from "../../../hooks/useContract";
import MediaBreadcrumb, {
  IMediaBreadcrumb,
} from "../../Media/MediaBreadcrumb/MediaBreadcrumb";
import MediaCard from "../../Media/MediaCard/MediaCard";
import MediaFolderCard from "../../Media/MediaFolderCard/MediaFolderCard";
import MediaCreateFolderButton from "../../Media/MediaCreateFolderButton/MediaCreateFolderButton";
import MediaImportButton from "../../Media/MediaImportButton/MediaImportButton";
import EditModal from "../../Media/MediaImportButton/Modals/EditModal/EditModal";
import FormModal from "../../Form/FormModal/FormModal";
import CommonPagination from "../CommonPagination/CommonPagination";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../CommonModalWrapper/CommonModalWrapper";
import CommonLoader from "../CommonLoader/CommonLoader";
import CommonButton from "../CommonButton/CommonButton";
import "./common-bibliotheque-media.scss";

interface ICommonBibliothequeMediaProps {
  canSelectMultipleFiles?: boolean;
  onSelectedFiles?: (files?: Array<ILocalFile>) => void;
  onPathChange?: (pathId: number, path: string) => void;
  defaultSelectedFiles?: Array<string>;
  defaultActivePath?: { pathId: number; path: string };
  style?: "modal";
  hasActionButton?: boolean;
  acceptedMimeTypes?: Array<TAcceptedMimeTypes>;
  canDeleteFiles?: boolean;
}

export default function CommonBibliothequeMedia({
  onSelectedFiles,
  canSelectMultipleFiles = false,
  onPathChange,
  defaultSelectedFiles = [],
  defaultActivePath,
  style,
  hasActionButton = false,
  acceptedMimeTypes,
  canDeleteFiles = false,
}: ICommonBibliothequeMediaProps) {
  /* Static Data */
  const formLabels = {
    title: "Ajouter des médias",
    defaultValueName: "Bibliothèque de Médias",
    MediaSectionTitle: "Médias",
    FolderSectionTitle: "Dossiers",
  };
  const labels = {
    detailsModalTitle: "Détails",
    formNameLabel: "Nom Du fichier",
    formDescLabel: "Description de l'image",
  };
  const deleteFilesConfirmationMessage =
    "Êtes-vous sûr de vouloir supprimer ce(s) fichier(s) ?";
  const deleteFilesErrorMessageLabel =
    "Suppression impossible : un ou plusieurs de vos médias sélectionnés sont publiés";
  const buttonLabels = {
    delete: "Supprimer",
    cancel: "Annuler",
  };

  /* Methods */
  function setUpdatePath(pathId: number, path: string) {
    setActivePathId(pathId);
    setActivePath(path);
    onPathChange && onPathChange(pathId, path);
  }

  function handleEditFile(file: ILocalFile) {
    modalRef.current?.toggleModal(true);
    setFileToEdit(file);
  }

  async function handleSaveNewFileInfo(submitData: FieldValues) {
    const file: ILocalFile | undefined = fileToEdit;
    if (file?.id !== undefined) {
      setUploadLoading(true);

      void updateUploadFile({
        variables: {
          updateUploadFileId: file?.id,
          data: {
            name: submitData[removeQuotesInString(labels.formNameLabel)],
            folder: submitData["Emplacement"]["id"],
            alternativeText:
              submitData[removeQuotesInString(labels.formDescLabel)] ??
              submitData[removeQuotesInString(labels.formNameLabel)],
            width: file.width,
            height: file.height,
          },
        },
        refetchQueries: [
          {
            query: GetUploadFilesDocument,
            variables: defaultQueryVariables,
          },
          {
            query: GetUploadFoldersDocument,
            variables: { filters: { pathId: { eq: activePathId } } },
          },
        ],
      }).finally(() => {
        setUploadLoading(false);
      });
    }
  }

  function handleSelectedFile(
    e: ChangeEvent<HTMLInputElement>,
    file: ILocalFile,
  ): void {
    const filesInstance = [...files];
    const findFile = filesInstance.find((item) => item.id === file.id);
    if (findFile?.id) {
      if (canSelectMultipleFiles) {
        if (e.target.checked) {
          setCheckedFiles([...checkedFiles, findFile.id]);
        } else {
          const newCheckedFiles = [...checkedFiles];
          const index = newCheckedFiles.indexOf(findFile.id);
          if (index !== -1) {
            newCheckedFiles.splice(index, 1);
            setCheckedFiles(newCheckedFiles);
          }
        }
      } else {
        if (checkedFiles.includes(findFile.id)) {
          setCheckedFiles([]);
          onSelectedFiles && onSelectedFiles([]);
        } else {
          onSelectedFiles && onSelectedFiles([findFile]);
          setCheckedFiles([findFile.id]);
        }
      }
    }
  }

  const handleStartDeleteConfirmationModal = () => {
    deleteConfirmationModalRef.current?.toggleModal(true);
  };

  async function confirmDeleteFiles() {
    await deleteFiles({
      variables: {
        imageIds: checkedFiles,
      },
    })
      .catch(() => {
        deleteErrorModalRef.current?.toggleModal(true);
      })
      .finally(() => {
        setCheckedFiles([]);
      });
  }

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Medias", userRights);
  const { contract } = useContract();
  const [fileToEdit, setFileToEdit] = useState<ILocalFile>();
  const [folders, setFolders] = useState<Array<IFolder>>([]);
  const [files, setFiles] = useState<Array<ILocalFile>>([]);
  const [checkedFiles, setCheckedFiles] =
    useState<Array<string>>(defaultSelectedFiles);
  const [breadcrumbs, setBreadcrumbs] = useState<Array<IMediaBreadcrumb>>([]);
  const contractFolderId = contract.attributes?.pathId;
  const defaultPath = `/1/${contractFolderId}`;
  const [activePathId, setActivePathId] = useState<number>(
    defaultActivePath ? defaultActivePath.pathId : contractFolderId,
  );
  const [activePath, setActivePath] = useState<string>(
    defaultActivePath ? defaultActivePath.path : defaultPath,
  );
  const [croppedImg, setCroppedImg] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const deleteConfirmationModalRef = useRef<CommonModalWrapperRef>(null);
  const deleteErrorModalRef = useRef<CommonModalWrapperRef>(null);

  const defaultRowsPerPage = 10;
  const defaultPage = 1;
  const defaultQueryVariables: GetUploadFilesQueryVariables = {
    filters: {
      folder: {
        pathId: {
          eq: activePathId,
        },
      },
    },
    sort: "mime:desc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  if (
    defaultQueryVariables.filters &&
    acceptedMimeTypes &&
    acceptedMimeTypes.length > 0
  ) {
    defaultQueryVariables.filters.mime = {
      in: acceptedMimeTypes,
    };
  }

  const [currentPagination, setCurrentPagination] = useState({
    page: defaultPage,
    rowsPerPage: defaultRowsPerPage,
  });

  const {
    data: foldersData,
    loading: foldersDataLoading,
    error: foldersDataError,
  } = useGetUploadFoldersQuery({
    variables: { filters: { pathId: { eq: activePathId } } },
    fetchPolicy: "network-only",
  });
  const [
    getUploadFiles,
    { data: filesData, loading: filesDataLoading, error: filesDataError },
  ] = useGetUploadFilesLazyQuery({
    variables: defaultQueryVariables,
    fetchPolicy: "network-only",
  });
  const {
    data: foldersBreadcrumb,
    loading: foldersBreadcrumbLoading,
    error: foldersBreadcrumbError,
  } = useGetLibraryBreadcrumbTrailQuery({
    variables: { path: activePath },
    fetchPolicy: "network-only",
  });
  const {
    data: folderHierarchy,
    loading: folderHierarchyLoading,
    error: folderHierarchyError,
  } = useGetAllFoldersHierarchyQuery({
    variables: { path: activePath },
    fetchPolicy: "network-only",
  });
  const [updateUploadFile, { loading: updateLoading, error: updateError }] =
    useUpdateUploadFileByIdMutation({
      refetchQueries: ["getUploadFolders", "getUploadFiles"],
      awaitRefetchQueries: true,
    });
  const [deleteFiles, { loading: deleteFilesLoading }] =
    useDeleteUnpublishedMediaByImageIdsMutation({
      refetchQueries: ["getUploadFolders", "getUploadFiles"],
      awaitRefetchQueries: true,
    });

  const selectedFilesLabel =
    checkedFiles.length > 0
      ? `${checkedFiles.length} fichier(s) sélectionné(s).`
      : "";

  const loading =
    filesDataLoading ||
    foldersDataLoading ||
    folderHierarchyLoading ||
    foldersBreadcrumbLoading ||
    updateLoading ||
    deleteFilesLoading;
  const errors = [
    filesDataError,
    foldersDataError,
    folderHierarchyError,
    foldersBreadcrumbError,
    updateError,
  ];

  const mediaLibraryClasses = classNames("c-CommonBibliothequeMedia", {
    [`c-CommonBibliothequeMedia_${style}`]: style,
  });

  useEffect(() => {
    if (foldersData) {
      const mappedFolders: Array<IFolder> =
        foldersData.uploadFolders?.data[0]?.attributes?.children?.data
          ?.map((folder) => {
            if (
              folder.id &&
              folder.attributes?.name &&
              folder.attributes?.path &&
              folder.attributes?.pathId
            ) {
              return {
                id: folder.id,
                name: folder.attributes.name,
                path: folder.attributes.path,
                pathId: folder.attributes?.pathId,
                children: folder.attributes.children?.data
                  .map((child) => child.id)
                  .filter(removeNulls),
                childrenAmount: folder.attributes.children?.data.length,
                filesAmount: folder.attributes.files?.data.length,
              };
            }
          })
          .filter(removeNulls) ?? [];
      setFolders(mappedFolders);
    }

    if (filesData) {
      const mappedFiles: Array<ILocalFile> =
        filesData.uploadFiles?.data
          .map((file) => {
            if (
              file.id &&
              file?.attributes?.name &&
              file?.attributes?.ext &&
              file?.attributes?.mime &&
              file?.attributes?.size &&
              file?.attributes?.url &&
              file?.attributes?.createdAt
            ) {
              return {
                id: file.id,
                name: file?.attributes?.name,
                alternativeText: file?.attributes?.alternativeText ?? "",
                width: file?.attributes?.width ?? 0,
                height: file?.attributes?.height ?? 0,
                ext: file?.attributes?.ext,
                mime: file?.attributes?.mime,
                size: file?.attributes?.size,
                url: file?.attributes?.url,
                createdAt: new Date(
                  file.attributes.createdAt,
                ).toLocaleDateString(),
              };
            }
          })
          .filter(removeNulls) ?? [];
      setFiles(mappedFiles);
    }
  }, [foldersData, filesData, activePathId]);

  useEffect(() => {
    getUploadFiles({
      variables: {
        ...defaultQueryVariables,
        pagination: {
          page: currentPagination.page,
          pageSize: currentPagination.rowsPerPage,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPagination]);

  useEffect(() => {
    if (foldersBreadcrumb) {
      const mappedBreadcrumb: Array<IMediaBreadcrumb> =
        foldersBreadcrumb?.libraryBreadcrumbTrail
          ?.map((breadcrumb) => {
            if (breadcrumb?.name && breadcrumb.pathId && breadcrumb.path) {
              const pathId = Number.parseInt(breadcrumb.pathId);
              const path = breadcrumb.path;
              return {
                label: breadcrumb.name,
                onClick: () => setUpdatePath(pathId, path),
              };
            }
          })
          .filter(removeNulls) ?? [];
      setBreadcrumbs(mappedBreadcrumb);
    }
    /*eslint-disable */
    // TODO: optimize useEffect
  }, [foldersBreadcrumb]);

  useEffect(() => {
    void getUploadFiles({
      variables: defaultQueryVariables,
    });
  }, [activePathId]);

  /*eslint-enable */
  const rowCount = filesData?.uploadFiles?.meta.pagination.total;

  return (
    <>
      <CommonLoader
        isLoading={loading}
        isShowingContent={loading}
        errors={errors}
      >
        <div className={mediaLibraryClasses}>
          <div className="c-CommonBibliothequeMedia__Options">
            <div className="c-CommonBibliothequeMedia__Actions">
              <div className="c-CommonBibliothequeMedia__Navigation"></div>
              <div className="c-CommonBibliothequeMedia__ActionButtons">
                {!hasActionButton && (
                  <>
                    <MediaCreateFolderButton
                      folderHierarchy={
                        folderHierarchy?.getAllFoldersHierarchy?.filter(
                          removeNulls,
                        ) ?? []
                      }
                      activePathId={activePathId}
                      activePath={activePath}
                    />
                    <MediaImportButton
                      folderHierarchy={
                        folderHierarchy?.getAllFoldersHierarchy?.filter(
                          removeNulls,
                        ) ?? []
                      }
                      activePathId={activePathId}
                    />
                  </>
                )}
              </div>
            </div>
            <MediaBreadcrumb foldersBreadcrumb={breadcrumbs} />
            <div className="c-CommonBibliothequeMedia__Filters"></div>
          </div>
          <div className="c-CommonBibliothequeMedia__Content">
            {canDeleteFiles && (
              <div className="c-CommonBibliothequeMedia__DeleteFilesBlock">
                {checkedFiles?.length > 0 && (
                  <>
                    <div className="c-CommonBibliothequeMedia__DeleteFiles">
                      <p>{selectedFilesLabel}</p>
                      <CommonButton
                        label={buttonLabels.delete}
                        picto="trash"
                        fontStyle="fontSmall"
                        paddingStyle="paddingSmall"
                        onClick={handleStartDeleteConfirmationModal}
                        isDisabled={!userPermissions.delete}
                      />
                    </div>
                    <CommonModalWrapper ref={deleteConfirmationModalRef}>
                      <div className="c-CommonBibliothequeMedia__ConfirmationMessage">
                        {deleteFilesConfirmationMessage}
                      </div>
                      <div className="c-CommonBibliothequeMedia__DeleteActionButtons">
                        <CommonButton
                          label={buttonLabels.delete}
                          style="primary"
                          onClick={confirmDeleteFiles}
                          isDisabled={!userPermissions.delete}
                        />
                        <CommonButton
                          label={buttonLabels.cancel}
                          onClick={() =>
                            deleteConfirmationModalRef.current?.toggleModal(
                              false,
                            )
                          }
                        />
                      </div>
                    </CommonModalWrapper>
                  </>
                )}
              </div>
            )}
            {folders.length > 0 && (
              <div className="c-CommonBibliothequeMedia__Folders">
                <h2>{formLabels.FolderSectionTitle}</h2>
                <div className="c-CommonBibliothequeMedia__FolderCards">
                  {folders &&
                    folders.map((folder, index) => (
                      <MediaFolderCard
                        key={index}
                        folder={folder}
                        picto="folder"
                        activePath={activePath}
                        activePathId={activePathId}
                        onClick={() =>
                          setUpdatePath(folder.pathId, folder.path)
                        }
                      />
                    ))}
                </div>
              </div>
            )}
            {folders.length > 0 && files.length > 0 && (
              <hr className="c-CommonBibliothequeMedia__HrColor" />
            )}
            <div className="c-CommonBibliothequeMedia__MediaList">
              {files.length > 0 && <h2>{formLabels.MediaSectionTitle}</h2>}
              <div className="c-CommonBibliothequeMedia__MediaCards">
                <br />
                {files.map((file, index) => (
                  <MediaCard
                    key={index}
                    file={file}
                    onEditFile={() => handleEditFile(file)}
                    onSelectedFile={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSelectedFile(e, file)
                    }
                    loading={uploadLoading}
                    isChecked={!!file.id && checkedFiles.includes(file.id)}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* TODO: setup lazy loading once media cards are displayed, see CommonDataTable implementation */}
          <CommonPagination
            currentPage={currentPagination.page}
            rowCount={rowCount ?? 0}
            onChangePage={(currentPage) => {
              if (currentPage !== currentPagination.page) {
                setCurrentPagination({
                  ...currentPagination,
                  page: currentPage,
                });
              }
            }}
            onChangeRowsPerPage={(currentRowsPerPage) => {
              if (currentRowsPerPage !== currentPagination.rowsPerPage) {
                setCurrentPagination({
                  ...currentPagination,
                  rowsPerPage: currentRowsPerPage,
                });
              }
            }}
            rowsPerPage={currentPagination.rowsPerPage}
          />
        </div>
        <FormModal
          modalRef={modalRef}
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
            onFileEdited={(file: ILocalFile) => setFileToEdit(file)}
            activePathId={activePathId}
            fileToEdit={fileToEdit}
            setCroppedImg={setCroppedImg}
          />
        </FormModal>
      </CommonLoader>
      <CommonModalWrapper ref={deleteErrorModalRef}>
        <p className="c-CommonBibliothequeMedia__DeleteFilesErrorMessage">
          {deleteFilesErrorMessageLabel}
        </p>
      </CommonModalWrapper>
    </>
  );
}
