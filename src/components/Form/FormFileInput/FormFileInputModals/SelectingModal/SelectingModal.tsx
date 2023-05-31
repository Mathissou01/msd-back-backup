import React, { RefObject, useEffect, useState } from "react";
import { useGetAllFoldersHierarchyQuery } from "../../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../../lib/utilities";
import { ILocalFile } from "../../../../../lib/media";
import { useContract } from "../../../../../hooks/useContract";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import CommonBibliothequeMedia from "../../../../Common/CommonBibliothequeMedia/CommonBibliothequeMedia";
import TabHeader, {
  ITabHeader,
} from "../../../../TabBlock/TabHeader/TabHeader";
import MediaCard from "../../../../Media/MediaCard/MediaCard";
import MediaCreateFolderButton from "../../../../Media/MediaCreateFolderButton/MediaCreateFolderButton";
import MediaImportButton from "../../../../Media/MediaImportButton/MediaImportButton";

interface ISelectingModalProps {
  modalRef: RefObject<CommonModalWrapperRef>;
  name: string;
  isButtonDirty: boolean;
  mimeFilterContains?: string;
  mimeFilterNotContains?: string;
  onFinish: (file?: ILocalFile) => void;
  onPathChange: (pathId: number, path: string) => void;
}

export default function SelectingModal({
  modalRef,
  name,
  isButtonDirty,
  mimeFilterContains,
  mimeFilterNotContains,
  onFinish,
  onPathChange,
}: ISelectingModalProps) {
  /* Static Data */
  const labels = {
    modalTitle: "Ajouter des médias",
    emptyMessage:
      "Aucun élément prêt à être téléchargé à la bibliothèque de Média",
  };

  /* Methods */
  function handlePathChange(pathId: number, path: string) {
    setActivePathId(pathId);
    setActivePath(path);
    onPathChange(pathId, path);
  }

  /* Local Data */
  const { contract } = useContract();
  const contractFolderId = contract.attributes?.pathId;
  const defaultPath = `/1/${contractFolderId}`;
  const [activePathId, setActivePathId] = useState<number>(contractFolderId);
  const [activePath, setActivePath] = useState<string>(defaultPath);
  const [tabs, setTabs] = useState<Array<ITabHeader>>([]);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<ILocalFile | null>();

  const { data: folderHierarchy } = useGetAllFoldersHierarchyQuery({
    variables: { path: activePath },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    setTabs([
      {
        name: "fromBibliothequeMedia",
        title: "Parcourir",
        isEnabled: true,
      },
      {
        name: "selectedFile",
        title: `Fichiers sélectionnés (${selectedFile ? "1" : "0"})`,
        isEnabled: true,
      },
    ]);
  }, [selectedFile]);

  return (
    <>
      <div className="c-FormFileInputModals">
        <div className="c-FormFileInputModals__Title">{labels.modalTitle}</div>
        <div className="c-FormFileInputModals__ModalButtons">
          <MediaCreateFolderButton
            folderHierarchy={
              folderHierarchy?.getAllFoldersHierarchy?.filter(removeNulls) ?? []
            }
            activePathId={activePathId}
            activePath={activePath}
          />
          <MediaImportButton
            folderHierarchy={
              folderHierarchy?.getAllFoldersHierarchy?.filter(removeNulls) ?? []
            }
            activePathId={activePathId}
          />
        </div>
        <TabHeader
          tabs={tabs}
          selectedTab={activeTab}
          onClick={(index) => setActiveTab(index)}
          isAlignStart
        />
        <div className="c-FormFileInputModals__Content">
          {activeTab === 0 && (
            <CommonBibliothequeMedia
              mimeFilterContains={mimeFilterContains}
              mimeFilterNotContains={mimeFilterNotContains}
              name={name}
              onSelectedFiles={(files) => files && setSelectedFile(files[0])}
              onPathChange={(pathId, path) => handlePathChange(pathId, path)}
              defaultSelectedFiles={selectedFile?.id ? [selectedFile.id] : []}
              defaultActivePath={{ pathId: activePathId, path: activePath }}
              style="modal"
              hasActionButton
            />
          )}
          {activeTab === 1 && (
            <>
              {selectedFile ? (
                <MediaCard
                  file={selectedFile}
                  isChecked
                  onSelectedFile={() => setSelectedFile(null)}
                />
              ) : (
                <p>
                  <strong>{labels.emptyMessage}</strong>
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className="c-FormFileInputModals__Button">
        <CommonButton
          type="button"
          label="Cancel"
          onClick={() => modalRef.current?.toggleModal(false)}
        />
        <CommonButton
          type="button"
          label="Finish"
          style="primary"
          isDisabled={isButtonDirty}
          onClick={() => selectedFile && onFinish(selectedFile)}
        />
      </div>
    </>
  );
}
