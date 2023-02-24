import React, { useEffect, useRef, useState } from "react";
import {
  useGetAllFoldersHierarchyQuery,
  useGetFolderAndChildrenByIdQuery,
  useGetFilesPaginationByFolderIdLazyQuery,
  GetFilesPaginationByFolderIdQueryVariables,
  useGetFolderBreadcrumbQuery,
} from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import { removeNulls } from "../../../../lib/utilities";
import ContractLayout from "../../contract-layout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonPagination from "../../../../components/Common/CommonPagination/CommonPagination";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import MediaCreateFolderButton from "../../../../components/Media/MediaCreateFolderButton/MediaCreateFolderButton";
import MediaFolderCard from "../../../../components/Media/MediaFolderCard/MediaFolderCard";
import MediaImportButton, {
  IFileToEdit,
} from "../../../../components/Media/MediaImportButton/MediaImportButton";
import MediaBreadcrumb, {
  IMediaBreadcrumb,
} from "../../../../components/Media/MediaBreadcrumb/MediaBreadcrumb";
import "./edito-bibliotheque-de-medias.scss";
import MediaCard, {
  MediaCardParentOptions,
} from "../../../../components/Media/MediaCard/MediaCard";

export interface IFolder {
  id: string;
  name: string;
  path: string;
  pathId: number;
  childrenAmount?: number;
  filesAmount?: number;
}

export function EditoBibliothequeDeMedias() {
  /* Static Data */
  const formLabels = {
    title: "Ajouter des médias",
    description: "",
    defaultValueName: "Bibliothèque de Médias",
    MediaSectionTitle: "Médias",
    FolderSectionTitle: "Dossiers",
  };

  /* Method */
  function setUpdatePath(pathId: number, path: string) {
    setActivePathId(pathId);
    setActivePath(path);
  }

  /* Local Data */
  const { contract } = useContract();
  const contractFolderId = contract.attributes?.folderId;
  const defaultPath = `/1/${contractFolderId}/`;
  const [activePathId, setActivePathId] = useState<number>(contractFolderId);
  const [activePath, setActivePath] = useState<string>(defaultPath);
  const {
    data: foldersData,
    loading: foldersLoading,
    error: foldersError,
  } = useGetFolderAndChildrenByIdQuery({
    variables: { filters: { pathId: { eq: activePathId } } },
  });
  const {
    data: folderHierarchy,
    loading: hierarchyLoading,
    error: hierarchyError,
  } = useGetAllFoldersHierarchyQuery({
    variables: { path: activePath, contractFolderId },
  });
  const defaultRowsPerPage = 10;
  const defaultPage = 1;
  const defaultQueryVariables: GetFilesPaginationByFolderIdQueryVariables = {
    filters: {
      folder: {
        id: {
          eq: `${activePathId}`,
        },
      },
    },
    sort: "mime:desc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  const [
    getFilesPaginationByFolderId,
    { data: filesData, loading: paginationLoading, error: paginationError },
  ] = useGetFilesPaginationByFolderIdLazyQuery({
    variables: defaultQueryVariables,
  });
  const {
    data: foldersBreadcrumb,
    loading: breadcrumbLoading,
    error: breadcrumbError,
  } = useGetFolderBreadcrumbQuery({
    variables: { path: activePath },
  });

  const isInitialized = useRef(false);
  const [folders, setFolders] = useState<Array<IFolder>>([]);
  const [files, setFiles] = useState<Array<IFileToEdit>>([]);
  const [currentPagination, setCurrentPagination] = useState({
    page: defaultPage,
    rowsPerPage: defaultRowsPerPage,
  });
  const [breadcrumbs, setBreadcrumbs] = useState<Array<IMediaBreadcrumb>>([]);
  const loading =
    foldersLoading ||
    hierarchyLoading ||
    paginationLoading ||
    breadcrumbLoading;
  const errors = [
    foldersError,
    hierarchyError,
    paginationError,
    breadcrumbError,
  ];

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
      const mappedFiles: Array<IFileToEdit> =
        filesData.uploadFiles?.data
          .map((file) => {
            if (
              file?.attributes?.name &&
              file?.attributes?.width !== null &&
              file?.attributes?.height !== null &&
              file?.attributes?.ext &&
              file?.attributes?.mime &&
              file?.attributes?.size &&
              file?.attributes?.url
            ) {
              return {
                name: file?.attributes?.name,
                alternativeText: file?.attributes?.alternativeText ?? "",
                width: file?.attributes?.width ?? 0,
                height: file?.attributes?.height ?? 0,
                ext: file?.attributes?.ext,
                mime: file?.attributes?.mime,
                size: file?.attributes?.size.toString(),
                url: file?.attributes?.url,
              };
            }
          })
          .filter(removeNulls) ?? [];
      setFiles(mappedFiles);
    }
  }, [foldersData, filesData, activePathId, contractFolderId]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      getFilesPaginationByFolderId();
    }
  }, [getFilesPaginationByFolderId, isInitialized]);

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
  }, [foldersBreadcrumb, activePath, contractFolderId]);

  return (
    <>
      <PageTitle
        title={formLabels.title}
        description={formLabels.description}
      />
      <CommonLoader
        isLoading={loading}
        isShowingContent={loading}
        errors={errors}
      >
        <div className="c-EditoBibliothequeDeMedia__Options">
          <div className="c-EditoBibliothequeDeMedia__Actions">
            <div className="c-EditoBibliothequeDeMedia__Navigation"></div>
            <div className="c-EditoBibliothequeDeMedia__ActionButtons">
              <MediaCreateFolderButton
                folderHierarchy={
                  folderHierarchy?.getAllFoldersHierarchy?.filter(
                    removeNulls,
                  ) ?? []
                }
                localFolderPathId={`${activePathId}`}
              />
              <MediaImportButton
                folderHierarchy={
                  folderHierarchy?.getAllFoldersHierarchy?.filter(
                    removeNulls,
                  ) ?? []
                }
                localFolderPathId={`${activePathId}`}
              />
            </div>
          </div>
          <div className="c-EditoBibliothequeDeMedia__Filters"></div>
          <MediaBreadcrumb foldersBreadcrumb={breadcrumbs} />
        </div>
        <div className="c-EditoBibliothequeDeMedia__Folders">
          <h2>{formLabels.FolderSectionTitle}</h2>
          <div className="c-EditoBibliothequeDeMedia__FolderCards">
            {folders &&
              folders.map((folder, index) => (
                <MediaFolderCard
                  key={index}
                  id={folder.id}
                  name={folder.name}
                  childrenAmount={folder.childrenAmount}
                  filesAmount={folder.filesAmount}
                  picto="folder"
                  folderHierarchy={
                    folderHierarchy?.getAllFoldersHierarchy?.filter(
                      removeNulls,
                    ) ?? []
                  }
                  localFolderPathId={`${activePathId}`}
                  onClick={() => setUpdatePath(folder.pathId, folder.path)}
                />
              ))}
          </div>
        </div>
        <div className="c-EditoBibliothequeDeMedia__MediaList">
          <h2>{formLabels.MediaSectionTitle}</h2>
          <div className="c-EditoBibliothequeDeMedia__MediaCards">
            <br />
            {files.map((file, index) => (
              <MediaCard
                key={index}
                file={{ file }}
                parent={MediaCardParentOptions.HOME}
                handleEditFile={() => console.log("handleEditItem")}
                handleRemoveFile={() => console.log("handleRemoveItem")}
              />
            ))}
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
      </CommonLoader>
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <EditoBibliothequeDeMedias />
    </ContractLayout>
  );
}
