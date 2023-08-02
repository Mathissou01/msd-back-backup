import MediaCreateFolderButton from "../../../../../Media/MediaCreateFolderButton/MediaCreateFolderButton";
import { removeNulls } from "../../../../../../lib/utilities";
import MediaImportButton from "../../../../../Media/MediaImportButton/MediaImportButton";
import TabHeader, {
  ITabHeader,
} from "../../../../../TabBlock/TabHeader/TabHeader";
import CommonBibliothequeMedia from "../../../../../Common/CommonBibliothequeMedia/CommonBibliothequeMedia";
import MediaCard from "../../../../../Media/MediaCard/MediaCard";
import React, { useEffect, useState } from "react";
import { useContract } from "../../../../../../hooks/useContract";
import { ILocalFile } from "../../../../../../lib/media";
import { useGetAllFoldersHierarchyQuery } from "../../../../../../graphql/codegen/generated-types";
import "./selecting-modal-content.scss";

interface ISelectingModalContentProps {
  mimeFilterContains?: string;
  mimeFilterNotContains?: string;
  onPathChange?: (pathId: number, path: string) => void;
  selectedFile?: ILocalFile | null;
  setSelectedFile?: React.Dispatch<
    React.SetStateAction<ILocalFile | null | undefined>
  >;
}

export default function SelectingModalContent({
  mimeFilterContains,
  mimeFilterNotContains,
  onPathChange,
  selectedFile,
  setSelectedFile,
}: ISelectingModalContentProps) {
  /* Static Data */
  const labels = {
    emptyMessage:
      "Aucun élément prêt à être téléchargé à la bibliothèque de Média",
  };

  /* Methods */
  function handlePathChange(pathId: number, path: string) {
    setActivePathId(pathId);
    setActivePath(path);
    onPathChange?.(pathId, path);
  }

  /* Local Data */
  const { contract } = useContract();
  const contractFolderId = contract.attributes?.pathId;
  const defaultPath = `/1/${contractFolderId}`;
  const [activePathId, setActivePathId] = useState<number>(contractFolderId);
  const [activePath, setActivePath] = useState<string>(defaultPath);
  const [tabs, setTabs] = useState<Array<ITabHeader>>([]);
  const [activeTab, setActiveTab] = useState<number>(0);

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
    <div className="c-SelectingModalContent">
      <div className="c-SelectingModalContent__ModalButtons">
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
      <div className="c-SelectingModalContent__Content">
        {activeTab === 0 && (
          <CommonBibliothequeMedia
            mimeFilterContains={mimeFilterContains}
            mimeFilterNotContains={mimeFilterNotContains}
            onSelectedFiles={(files) => files && setSelectedFile?.(files[0])}
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
                onSelectedFile={() => setSelectedFile?.(null)}
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
  );
}
