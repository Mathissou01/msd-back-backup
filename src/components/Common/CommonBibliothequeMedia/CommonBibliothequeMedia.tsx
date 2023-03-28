import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FieldValues } from "react-hook-form";
import {
  GetFilesPaginationByPathIdDocument,
  GetFilesPaginationByPathIdQueryVariables,
  useGetAllFoldersHierarchyQuery,
  useGetFilesPaginationByPathIdLazyQuery,
  useGetFolderAndChildrenByIdQuery,
  useGetFolderBreadcrumbQuery,
  useUpdateUploadFileMutation,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";
import { IcheckedFile, IFolder } from "../../../lib/uploadFile";
import MediaBreadcrumb, {
  IMediaBreadcrumb,
} from "../../Media/MediaBreadcrumb/MediaBreadcrumb";
import MediaCard from "../../Media/MediaCard/MediaCard";
import MediaFolderCard from "../../Media/MediaFolderCard/MediaFolderCard";
import { IFileToEdit } from "../../Media/MediaImportButton/MediaImportButton";
import CommonPagination from "../CommonPagination/CommonPagination";
import { CommonModalWrapperRef } from "../CommonModalWrapper/CommonModalWrapper";
import EditModal from "../../Media/MediaImportButton/Modals/EditModal/EditModal";
import FormModal from "../../Form/FormModal/FormModal";
import "./common-bibliotheque-media.scss";

interface ICommonBibliothequeMediaProps {
  fileTypeContain: string;
  fileTypeNotContain: string | null;
  checkedFile: IcheckedFile[];
  handleSelectedFile: (
    e: ChangeEvent<HTMLInputElement>,
    url: string,
    index: number,
  ) => void;
}

export default function CommonBibliothequeMedia({
  fileTypeContain,
  fileTypeNotContain,
  checkedFile,
  handleSelectedFile,
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

  /**Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const { contract } = useContract();
  const contractFolderId = contract.attributes?.pathId;
  const defaultPath = `/1/${contractFolderId}`;
  const [activePathId, setActivePathId] = useState<number>(contractFolderId);
  const [activePath, setActivePath] = useState<string>(defaultPath);
  const [fileToEdit, setFileToEdit] = useState<IFileToEdit>();
  const { data: foldersData } = useGetFolderAndChildrenByIdQuery({
    variables: { filters: { pathId: { eq: activePathId } } },
  });

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
        contains: fileTypeContain,
        notContains: fileTypeNotContain,
      },
    },
    sort: "mime:desc",
    pagination: { page: defaultPage, pageSize: defaultRowsPerPage },
  };
  const [getFilesPaginationByPathId, { data: filesData }] =
    useGetFilesPaginationByPathIdLazyQuery({
      variables: defaultQueryVariables,
    });

  const { data: foldersBreadcrumb } = useGetFolderBreadcrumbQuery({
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
  const { data: folderHierarchy } = useGetAllFoldersHierarchyQuery({
    variables: { path: activePath },
  });
  const [UpdateUploadFileDocument] = useUpdateUploadFileMutation();

  /** Methods */
  function setUpdatePath(pathId: number, path: string) {
    setActivePathId(pathId);
    setActivePath(path);
  }

  const handleEditFile = (file: IFileToEdit) => {
    modalRef.current?.toggleModal(true);
    setFileToEdit(file);
  };

  async function handleSaveNewFileInfo(submitData: FieldValues) {
    const file: IFileToEdit | undefined = fileToEdit;

    if (file?.id !== undefined) {
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
            variables: defaultQueryVariables,
          },
        ],
      });
    }
  }

  const handleReplaceSpecialChars = (arg: string) =>
    arg.replace(/['"]/g, "") ?? arg;

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
      const mappedFiles: Array<IFileToEdit> =
        filesData.uploadFiles?.data
          .map((file) => {
            if (
              file.id &&
              file?.attributes?.name &&
              file?.attributes?.ext &&
              file?.attributes?.mime &&
              file?.attributes?.size &&
              file?.attributes?.url
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
              };
            }
          })
          .filter(removeNulls) ?? [];
      setFiles(mappedFiles);
    }
  }, [foldersData, filesData, activePathId]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      getFilesPaginationByPathId();
    }
  }, [getFilesPaginationByPathId, isInitialized]);
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
  }, [foldersBreadcrumb]);

  return (
    <>
      <MediaBreadcrumb foldersBreadcrumb={breadcrumbs} />
      <div className="c-CommonBibliotequeMedia__Folders">
        {folders.length > 0 && <h2>{formLabels.FolderSectionTitle}</h2>}
        <div className="c-CommonBibliotequeMedia__FolderCards">
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
      <div className="c-CommonBibliotequeMedia__MediaList">
        {files.length > 0 && <h2>{formLabels.MediaSectionTitle}</h2>}
        <div className="c-CommonBibliotequeMedia__MediaCards">
          <br />
          {files.map((file, index) => (
            <MediaCard
              key={index}
              file={{ file }}
              handleEditFile={() => handleEditFile(file)}
              handleSelectedFile={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleSelectedFile(e, file.url, index)
              }
              checked={checkedFile[index]}
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
          handleReplaceSpecialChars={handleReplaceSpecialChars}
        />
      </FormModal>
    </>
  );
}
