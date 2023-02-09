import { useEffect, useState } from "react";
import {
  useGetFilesPaginationByFolderIdQuery,
  useGetAllFoldersHierarchyQuery,
  useGetFolderAndChildrenByIdQuery,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";
import PageTitle from "../../../components/PageTitle/PageTitle";
import CommonPagination from "../../../components/Common/CommonPagination/CommonPagination";
import CommonLoader from "../../../components/Common/CommonLoader/CommonLoader";
import MediaCreateFolderButton from "../../../components/Media/MediaCreateFolderButton/MediaCreateFolderButton";
import MediaFolderCard from "../../../components/Media/MediaFolderCard/MediaFolderCard";
import MediaImportButton from "../../../components/Media/MediaImportButton/MediaImportButton";
import "./edito-bibliotheque-de-medias.scss";

export interface IFolder {
  id: string;
  name: string;
  path: string;
  pathId: number;
  childrenAmount?: number;
  filesAmount?: number;
}

export default function EditoBibliothequeDeMedia() {
  /* Static Data */
  const formLabels = {
    title: "Ajouter des médias",
    description: "",
    defaultValueName: "Bibliothèque de Médias",
    MediaSectionTitle: "Médias",
    FolderSectionTitle: "Dossiers",
  };

  // TODO: pagination refactor
  const pageSizes = [10, 20, 50, 100];

  /* Local Data */
  const { contractPathId } = useContract();
  const defaultPath = `/1/${contractPathId}`;
  const [activePathId, setActivePathId] = useState<number>(contractPathId);
  const [activePath] = useState<string>(defaultPath);
  const [folders, setFolders] = useState<Array<IFolder>>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);

  /* Methods */
  function previousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (
      currentPage <
      (paginationData?.uploadFiles?.meta.pagination?.pageCount ?? 1)
    ) {
      setCurrentPage(currentPage + 1);
    }
  }

  function lastPage() {
    if (
      currentPage <
      (paginationData?.uploadFiles?.meta.pagination?.pageCount ?? 1)
    ) {
      setCurrentPage(
        paginationData?.uploadFiles?.meta.pagination?.pageCount ?? 1,
      );
    }
  }

  /* External Data */
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
    variables: { path: activePath, pathId: `${activePathId}` },
  });

  const folderId = "2"; // TODO folderId
  const {
    data: paginationData,
    loading: paginationLoading,
    error: paginationError,
  } = useGetFilesPaginationByFolderIdQuery({
    variables: {
      filters: {
        folder: {
          id: {
            eq: folderId,
          },
        },
      },
      pagination: {
        page: currentPage,
        pageSize: currentPageSize,
      },
      sort: "createdAt:desc",
    },
  });

  const loading = foldersLoading || hierarchyLoading || paginationLoading;
  const errors = [foldersError, hierarchyError, paginationError];

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
                childrenAmount: folder.attributes.children?.data.length,
                filesAmount: folder.attributes.files?.data.length,
              };
            }
          })
          .filter(removeNulls) ?? [];
      setFolders(mappedFolders);
    }
  }, [foldersData, activePathId, contractPathId]);

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
              <MediaImportButton />
            </div>
          </div>
          <div className="c-EditoBibliothequeDeMedia__Filters"></div>
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
                  path={folder.path}
                  childrenAmount={folder.childrenAmount}
                  filesAmount={folder.filesAmount}
                  picto="folder"
                  folderHierarchy={
                    folderHierarchy?.getAllFoldersHierarchy?.filter(
                      removeNulls,
                    ) ?? []
                  }
                  localFolderPathId={`${activePathId}`}
                  onClick={() => setActivePathId(folder.pathId)}
                />
              ))}
          </div>
        </div>
        <div className="c-EditoBibliothequeDeMedia__MediaList">
          <h2>{formLabels.MediaSectionTitle}</h2>
          <div className="c-EditoBibliothequeDeMedia__MediaCards">
            {/* {foldersData?.uploadFiles?.data?.map((media, index) => ( // TODO: Image/File will be replaced here 
              <MediaCard key={index} file={media} />
            ))} */}
          </div>
        </div>
        <CommonPagination
          pageSize={pageSizes}
          pageCount={paginationData?.uploadFiles?.meta.pagination?.pageCount}
          page={currentPage}
          onPreviousPage={previousPage}
          onNextPage={nextPage}
          onFirstPage={() => setCurrentPage(1)}
          onLastPage={lastPage}
          onSpecificPage={(i) => setCurrentPage(i)}
          setCurrentPagesize={setCurrentPageSize}
        />
      </CommonLoader>
    </>
  );
}
