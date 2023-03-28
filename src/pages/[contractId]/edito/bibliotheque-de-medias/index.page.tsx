import React, { ChangeEvent, useState } from "react";
import { useGetAllFoldersHierarchyQuery } from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import { removeNulls } from "../../../../lib/utilities";
import ContractLayout from "../../contract-layout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import CommonBibliothequeMedia from "../../../../components/Common/CommonBibliothequeMedia/CommonBibliothequeMedia";
import MediaCreateFolderButton from "../../../../components/Media/MediaCreateFolderButton/MediaCreateFolderButton";
import MediaImportButton from "../../../../components/Media/MediaImportButton/MediaImportButton";
import "./edito-bibliotheque-de-medias.scss";

export interface IFolder {
  id: string;
  name: string;
  path: string;
  pathId: number;
  children?: Array<string>;
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

  /* Local Data */
  const { contract } = useContract();
  const contractPathId = contract.attributes?.pathId;
  const [activePathId] = useState<number>(contractPathId);
  const defaultPath = `/1/${contractPathId}`;
  const [activePath] = useState<string>(defaultPath);
  const {
    data: folderHierarchy,
    loading: hierarchyLoading,
    error: hierarchyError,
  } = useGetAllFoldersHierarchyQuery({
    variables: { path: activePath },
  });

  /** Method */
  // TODO: to move/delete a file or image
  function handleSelectedFile(
    e: ChangeEvent<HTMLInputElement>,
    url: string,
    index: number,
  ): void {
    throw new Error(
      `Function not implemented. EventListener: ${e}, Url: ${url}, Index: ${index}`,
    );
  }

  return (
    <>
      <PageTitle
        title={formLabels.title}
        description={formLabels.description}
      />
      <CommonLoader
        isLoading={hierarchyLoading}
        isShowingContent={hierarchyLoading}
        errors={[hierarchyError]}
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
                activePathId={activePathId}
              />
              <MediaImportButton
                folderHierarchy={
                  folderHierarchy?.getAllFoldersHierarchy?.filter(
                    removeNulls,
                  ) ?? []
                }
                activePathId={activePathId}
              />
            </div>
          </div>
          <div className="c-EditoBibliothequeDeMedia__Filters"></div>
        </div>
        <CommonBibliothequeMedia
          fileTypeContain=""
          fileTypeNotContain={null}
          handleSelectedFile={handleSelectedFile}
          checkedFile={[]}
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
