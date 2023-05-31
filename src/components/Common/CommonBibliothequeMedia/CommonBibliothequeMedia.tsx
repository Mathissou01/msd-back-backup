import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import classNames from "classnames";
import {
  GetFilesPaginationByPathIdDocument,
  GetFilesPaginationByPathIdQueryVariables,
  useGetAllFoldersHierarchyQuery,
  useGetFilesPaginationByPathIdQuery,
  useGetFolderAndChildrenByIdQuery,
  useGetFolderBreadcrumbQuery,
  useUpdateUploadFileMutation,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";
import { IFolder, ILocalFile } from "../../../lib/media";
import { removeQuotesInString } from "../../../lib/utilities";
import MediaBreadcrumb, {
  IMediaBreadcrumb,
} from "../../Media/MediaBreadcrumb/MediaBreadcrumb";
import MediaCard from "../../Media/MediaCard/MediaCard";
import MediaFolderCard from "../../Media/MediaFolderCard/MediaFolderCard";
import MediaImportButton from "../../Media/MediaImportButton/MediaImportButton";
import CommonPagination from "../CommonPagination/CommonPagination";
import { CommonModalWrapperRef } from "../CommonModalWrapper/CommonModalWrapper";
import CommonLoader from "../CommonLoader/CommonLoader";
import EditModal from "../../Media/MediaImportButton/Modals/EditModal/EditModal";
import FormModal from "../../Form/FormModal/FormModal";
import MediaCreateFolderButton from "../../Media/MediaCreateFolderButton/MediaCreateFolderButton";
import "./common-bibliotheque-media.scss";

interface ICommonBibliothequeMediaProps {
  mimeFilterContains?: string;
  mimeFilterNotContains?: string;
  name?: string;
  canSelectMultipleFiles?: boolean;
  onSelectedFiles?: (files?: Array<ILocalFile>) => void;
  onPathChange?: (pathId: number, path: string) => void;
  defaultSelectedFiles?: Array<string>;
  defaultActivePath?: { pathId: number; path: string };
  style?: "modal";
  hasActionButton?: boolean;
}

export default function CommonBibliothequeMedia({
  mimeFilterContains,
  mimeFilterNotContains,
  onSelectedFiles,
  canSelectMultipleFiles = false,
  onPathChange,
  defaultSelectedFiles = [],
  defaultActivePath,
  style,
  hasActionButton = false,
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
            variables: defaultQueryVariables,
          },
        ],
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
        // TODO: if we need multiple selected files, need to add/remove specific ID from array instead of replacing it with an empty array
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

  /* Local Data */
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
  const modalRef = useRef<CommonModalWrapperRef>(null);

  const defaultRowsPerPage = 10;
  const defaultPage = 1;
  const defaultQueryVariables: GetFilesPaginationByPathIdQueryVariables = {
    filters: {
      folder: {
        pathId: {
          eq: activePathId,
        },
      },
      mime: {
        // TODO: works?
        contains: mimeFilterContains,
        notContains: mimeFilterNotContains,
      },
    },
    sort: "mime:desc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  const [currentPagination, setCurrentPagination] = useState({
    page: defaultPage,
    rowsPerPage: defaultRowsPerPage,
  });

  const {
    data: foldersData,
    loading: foldersDataLoading,
    error: foldersDataError,
  } = useGetFolderAndChildrenByIdQuery({
    variables: { filters: { pathId: { eq: activePathId } } },
    fetchPolicy: "network-only",
  });
  const {
    data: filesData,
    loading: filesDataLoading,
    error: filesDataError,
  } = useGetFilesPaginationByPathIdQuery({
    variables: defaultQueryVariables,
    fetchPolicy: "network-only",
  });
  const {
    data: foldersBreadcrumb,
    loading: foldersBreadcrumbLoading,
    error: foldersBreadcrumbError,
  } = useGetFolderBreadcrumbQuery({
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
  const [
    UpdateUploadFileDocument,
    { loading: updateLoading, error: updateError },
  ] = useUpdateUploadFileMutation({
    refetchQueries: ["getFolderAndChildrenById", "getFilesPaginationByPathId"],
    awaitRefetchQueries: true,
  });

  const loading =
    filesDataLoading ||
    foldersDataLoading ||
    folderHierarchyLoading ||
    foldersBreadcrumbLoading ||
    updateLoading;
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
  /*eslint-enable */

  return (
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
          <div className="c-CommonBibliothequeMedia__Folders">
            {folders.length > 0 && <h2>{formLabels.FolderSectionTitle}</h2>}
            <div className="c-CommonBibliothequeMedia__FolderCards">
              {folders &&
                folders.map((folder, index) => (
                  <MediaFolderCard
                    key={index}
                    folder={folder}
                    picto="folder"
                    activePath={activePath}
                    activePathId={activePathId}
                    onClick={() => setUpdatePath(folder.pathId, folder.path)}
                  />
                ))}
            </div>
          </div>
          {files.length > 0 && (
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
                  isChecked={!!file.id && checkedFiles.includes(file.id)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* TODO: setup lazy loading once media cards are displayed, see CommonDataTable implementation */}
        <CommonPagination
          currentPage={currentPagination.page}
          rowCount={0}
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
          rowsPerPage={10}
        />
      </div>
      <FormModal
        modalRef={modalRef}
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
    </CommonLoader>
  );
}
