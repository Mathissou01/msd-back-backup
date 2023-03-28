import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  GetFilesPaginationByPathIdQueryVariables,
  useGetAllFoldersHierarchyQuery,
  useGetFilesPaginationByPathIdLazyQuery,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";
import { IcheckedFile } from "../../../lib/uploadFile";
import MediaCard from "../MediaCard/MediaCard";
import { IFileToEdit } from "../MediaImportButton/MediaImportButton";
import { Tab } from "../../TabBlock/TabBlock";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import DragDropModal from "./Modals/DragDropModal/DragDropModal";
import SelectingModal from "./Modals/SelectingModal/SelectingModal";
import CommonBibliothequeMedia from "../../Common/CommonBibliothequeMedia/CommonBibliothequeMedia";
import "./media-block.scss";

interface IMediaBlockProps {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  fileTypeContain?: string;
  fileTypeNotContain?: string | null;
  file: IFileToEdit | undefined;
  selectedFile: (selectedFile: { id: string; file: IFileToEdit }) => void;
}

export default function MediaBlock({
  modalRef,
  fileTypeContain = "",
  fileTypeNotContain = null,
  file,
  selectedFile,
}: IMediaBlockProps) {
  /**Local Data */
  const { contract } = useContract();
  const contractFolderId = contract.attributes?.pathId;
  const defaultPath = `/1/${contractFolderId}`;
  const [activePathId] = useState<number>(contractFolderId);
  const [activePath] = useState<string>(defaultPath);
  const [files, setFiles] = useState<Array<IFileToEdit>>([]);
  const [isButtonDirty, setIsButtonDirty] = useState<boolean>(true);

  const [tabs, setTabs] = useState<Array<Tab>>([]);
  const [hasFileToUpload, setHasFileToUpload] = useState<
    IFileToEdit | undefined
  >();
  const isInitialized = useRef(false);
  const [checkedFile, setCheckedFile] = useState<IcheckedFile[]>([]);
  const [readyToChoose, setReadyToChoose] = useState<
    | {
        id: string;
        file: IFileToEdit;
      }
    | undefined
  >();
  const {
    data: folderHierarchy,
    loading: hierarchyLoading,
    error: hierarchyError,
  } = useGetAllFoldersHierarchyQuery({
    variables: { path: activePath },
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

  /** Methods */
  const handleCloseModal = () => setHasFileToUpload(undefined);

  function handleChoosedFile(): void {
    if (readyToChoose !== undefined) {
      selectedFile(readyToChoose);
    }
    modalRef.current?.toggleModal(false);
  }

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      getFilesPaginationByPathId();
    }
  }, [getFilesPaginationByPathId, isInitialized]);

  useEffect(() => {
    if (filesData) {
      const mappedcheckedFile: IcheckedFile[] =
        filesData.uploadFiles?.data
          .map((file, index) => {
            if (file?.id && file?.attributes?.url) {
              return {
                id: file?.id,
                index: index,
                status: false,
                url: file?.attributes?.url,
              };
            }
          })
          .filter(removeNulls) ?? [];

      setCheckedFile(mappedcheckedFile);
      const mappedFiles: Array<IFileToEdit> =
        filesData.uploadFiles?.data
          .map((file) => {
            if (
              file?.attributes?.name &&
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
                size: file?.attributes?.size,
                url: file?.attributes?.url,
              };
            }
          })
          .filter(removeNulls) ?? [];
      setFiles(mappedFiles);
    }

    setHasFileToUpload(file);
  }, [file, filesData, activePathId]);

  useEffect(() => {
    const tabs = [
      {
        name: "FromBibliotequeMedia",
        title: "Browse",
        content: (
          <CommonBibliothequeMedia
            fileTypeContain={fileTypeContain}
            fileTypeNotContain={fileTypeNotContain}
            checkedFile={checkedFile}
            handleSelectedFile={handleSelectedFile}
          />
        ),
        isEnabled: true,
      },
      {
        name: "selectedFile",
        title: `Selected File ${
          checkedFile.filter((cf) => cf.status === true).length
        }`,
        content:
          readyToChoose !== undefined &&
          checkedFile.filter((cf) => cf.status === true).length !== 0 ? (
            <MediaCard
              file={{ file: readyToChoose.file }}
              checked={{
                id: readyToChoose.id,
                url: readyToChoose.file.url,
                index: 0,
                status: true,
              }}
            />
          ) : (
            <></>
          ),
        isEnabled: true,
      },
    ];
    setTabs(tabs);

    function handleSelectedFile(
      e: ChangeEvent<HTMLInputElement>,
      url: string,
      index: number,
    ) {
      const checkedFilenstance = [...checkedFile];
      const findCheckedFile = checkedFilenstance.find(
        (item) => item.url === url,
      );

      const filesInstance = [...files];
      const findFile = filesInstance.find((file) => file.url === url);

      if (findCheckedFile !== undefined && findFile) {
        for (const cf of checkedFilenstance) {
          if (cf.index === index) {
            cf.status = e.target.checked;
            if (e.target.checked === false) setReadyToChoose(undefined);
          } else {
            cf.status = false;
          }
        }

        setCheckedFile(checkedFilenstance);
        setReadyToChoose({ id: checkedFilenstance[index].id, file: findFile });

        if (e.target.checked === true) setIsButtonDirty(false);
        else setIsButtonDirty(true);
      }
    }
  }, [files, checkedFile, readyToChoose, fileTypeContain, fileTypeNotContain]);

  return (
    <CommonModalWrapper ref={modalRef} onClose={() => handleCloseModal()}>
      <CommonLoader
        isLoading={hierarchyLoading}
        isShowingContent={hierarchyLoading}
        errors={[hierarchyError]}
      >
        {hasFileToUpload !== undefined ? (
          <DragDropModal
            modalRef={modalRef}
            activePathId={activePathId}
            file={hasFileToUpload}
            setHasFileToUpload={setHasFileToUpload}
            selectedFile={selectedFile}
          />
        ) : (
          <SelectingModal
            modalRef={modalRef}
            activePathId={activePathId}
            tabs={tabs}
            folderHierarchy={folderHierarchy}
            isButtonDirty={isButtonDirty}
            handleChoosedFile={handleChoosedFile}
          />
        )}
      </CommonLoader>
    </CommonModalWrapper>
  );
}
