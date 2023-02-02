import { useEffect, useState } from "react";
import {
  useGetAllFoldersHierarchyQuery,
  useGetFolderAndChildrenByIdQuery,
} from "../../../graphql/codegen/generated-types";
import PageTitle from "../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../components/Common/CommonLoader/CommonLoader";
import MediaCreateFolderButton from "../../../components/Media/MediaCreateFolderButton/MediaCreateFolderButton";
import MediaFolderCard from "../../../components/Media/MediaFolderCard/MediaFolderCard";
import "./edito-bibliotheque-de-medias.scss";
import { useContract } from "../../../hooks/useContract";

export interface IFolder {
  id: string | null;
  name: string | null;
  path: string | null;
  pathId: number;
  childrenAmount?: number | null;
  filesAmount?: number | null;
}

export default function EditoBibliothequeDeMedia() {
  /* Static Data */
  const formLabels = {
    title: "Ajouter des médias",
    description: "",
    defaultValueName: "Bibliothèque de Médias",
    FolderSectionTitle: "Dossiers",
  };

  /* Local Data */
  const { contractPathId } = useContract();
  const defaultPath = `/1/${contractPathId}`;
  const [activePathId, setActivePathId] = useState<number>(contractPathId);
  const [activePath] = useState<string>(defaultPath);
  const [folders, setFolders] = useState<Array<IFolder>>([]);

  /* External Data */
  const {
    data,
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
  const loading = foldersLoading || hierarchyLoading;
  const errors = [foldersError, hierarchyError];

  useEffect(() => {
    if (data) {
      const mappedFolders: Array<IFolder> =
        data.uploadFolders?.data[0]?.attributes?.children?.data?.map(
          (folder) => ({
            id: folder.id ?? null,
            name: folder.attributes?.name ?? null,
            path: folder.attributes?.path ?? null,
            pathId: folder.attributes?.pathId ?? contractPathId,
            childrenAmount: folder.attributes?.children?.data.length ?? 0,
            filesAmount: folder.attributes?.files?.data.length ?? 0,
          }),
        ) ?? [];
      setFolders(mappedFolders);
    }
  }, [data, activePathId, contractPathId]);

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
                folderHierarchy={folderHierarchy?.getAllFoldersHierarchy ?? []}
                localFolderPathId={`${activePathId}`}
              />
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
                  name={folder.name}
                  childrenAmount={folder.childrenAmount ?? 0}
                  filesAmount={folder.filesAmount ?? 0}
                  picto="folder"
                  onClick={() => setActivePathId(folder.pathId)}
                />
              ))}
          </div>
        </div>
        <div className="c-EditoBibliothequeDeMedia__MediaList"></div>
      </CommonLoader>
    </>
  );
}
