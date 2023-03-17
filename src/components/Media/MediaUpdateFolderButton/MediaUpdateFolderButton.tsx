import { FieldValues } from "react-hook-form";
import { useRef } from "react";
import {
  GetAllFoldersHierarchyDocument,
  GetFolderAndChildrenByIdDocument,
  GetFolderBreadcrumbDocument,
  RequestFolders,
  UploadFolderEntity,
  useGetAllFoldersHierarchyQuery,
  useUpdateUploadFolderMutation,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import FormInput from "../../Form/FormInput/FormInput";
import FormModal from "../../Form/FormModal/FormModal";
import FormSelect from "../../Form/FormSelect/FormSelect";
import { mapOptionsInWrappers } from "../../Form/FormMultiselect/FormMultiselect";
import "./media-update-folder-button.scss";
import { IFolder } from "../../../pages/[contractId]/edito/bibliotheque-de-medias/index.page";

interface IMediaUpdateFolderButtonProps {
  folder: IFolder;
  activePath: string;
  activePathId: number;
}

export default function MediaUpdateFolderButton({
  folder,
  activePath,
  activePathId,
}: IMediaUpdateFolderButtonProps) {
  /* Static Data */
  const formLabels = {
    modalTitle: "Modifier le dossier",
    titleFolderContent: "Nom du dossier",
    locationFolder: "Emplacement",
  };
  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    const folderLocation = submitData["folderLocation"];
    if (folderLocation["path"] && folderLocation["path"] !== folder.path) {
      const variables = {
        updateUploadFolderId: folder.id,
        data: {
          name: submitData["folderTitle"],
          parent: submitData["folderLocation"]["id"],
          path: `${submitData["folderLocation"]["path"]}/${folder.pathId}`,
        },
      };
      return updateUploadFolder({
        variables,
        refetchQueries: !(folder.childrenAmount && folder.childrenAmount > 0)
          ? [
              {
                query: GetFolderAndChildrenByIdDocument,
                variables: { activePathId: activePathId },
              },
              {
                query: GetAllFoldersHierarchyDocument,
                variables: { path: folder.path },
              },
              {
                query: GetFolderBreadcrumbDocument,
                variables: { path: activePath },
              },
            ]
          : [],
        onCompleted: (data) => {
          const children =
            data.updateUploadFolder?.data?.attributes?.children?.data;
          const parentPath = data.updateUploadFolder?.data?.attributes?.path;
          if (children && children.length > 0 && parentPath) {
            recursivelyUpdateChildrenPath(
              children.filter(removeNulls),
              parentPath,
            );
          }
        },
      });
    }
  }

  function recursivelyUpdateChildrenPath(
    children: Array<UploadFolderEntity>,
    parentPath: string,
  ) {
    children.map((child) => {
      if (child.id && child.attributes?.pathId) {
        const variables = {
          updateUploadFolderId: child.id,
          data: {
            path: `${parentPath}/${child.attributes.pathId}`,
          },
        };
        void updateUploadFolder({
          variables,
          refetchQueries: !(
            child.attributes.children?.data &&
            child.attributes.children?.data.length > 0
          )
            ? [
                {
                  query: GetFolderAndChildrenByIdDocument,
                  variables: { activePathId: activePathId },
                },
                {
                  query: GetAllFoldersHierarchyDocument,
                  variables: { path: folder.path },
                },
                {
                  query: GetFolderBreadcrumbDocument,
                  variables: { path: activePath },
                },
              ]
            : [],
          onCompleted: (data) => {
            const children =
              data.updateUploadFolder?.data?.attributes?.children?.data;
            const parentPath = data.updateUploadFolder?.data?.attributes?.path;
            if (children && children.length > 0 && parentPath) {
              recursivelyUpdateChildrenPath(
                children.filter(removeNulls),
                parentPath,
              );
            }
          },
        });
      }
    });
  }

  function folderHierarchyDisplayTransformFunction(
    folder: RequestFolders,
  ): string {
    const folderLevel = folder.path?.match(/[/]/g)?.splice(2).length ?? 0;
    return "\xa0\xa0\xa0\xa0".repeat(folderLevel) + folder?.name;
  }

  function sortFolderHierarchy(folderHierarchy: Array<RequestFolders>) {
    const folderHierarchyCopy = [...folderHierarchy];
    const sortedFolderHierarchy = folderHierarchyCopy.sort(
      (firstFolder, secondFolder) => {
        const firstFolderPath = firstFolder?.path ?? "";
        const secondFolderPath = secondFolder?.path ?? "";
        return firstFolderPath.localeCompare(secondFolderPath);
      },
    );
    return mapOptionsInWrappers(sortedFolderHierarchy);
  }

  function openToggleModal(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    modalRef.current?.toggleModal(true);
  }

  /* External Data */
  // TODO: optimize component, data should only be fetched when modal is opened not on page load
  const { data: folderHierarchy } = useGetAllFoldersHierarchyQuery({
    variables: { path: folder.path },
  });
  const [updateUploadFolder, { loading: mutationLoading }] =
    useUpdateUploadFolderMutation();

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const pathFolderHierarchy =
    folderHierarchy?.getAllFoldersHierarchy
      ?.map((hierarchyFolder) => {
        if (
          hierarchyFolder?.path !== `${folder?.path}` &&
          hierarchyFolder?.path?.indexOf(`${folder.path}/`) === -1
        ) {
          return hierarchyFolder;
        }
      })
      .filter(removeNulls) ?? [];

  return (
    <>
      <div data-testid="media-update-folder-button">
        <button
          type="button"
          className="c-MediaUpdateFolderButton__Button"
          onClick={openToggleModal}
        />
        <FormModal
          modalRef={modalRef}
          modalTitle={formLabels.modalTitle}
          hasRequiredChildren="all"
          onSubmit={onSubmitValid}
          formValidationMode="onChange"
        >
          <div className="c-MediaUpdateFolderButton__Block">
            <div className="c-MediaUpdateFolderButton__Input">
              <FormInput
                type="text"
                name="folderTitle"
                label={formLabels.titleFolderContent}
                isRequired={true}
                isDisabled={mutationLoading}
                defaultValue={folder.name}
              />
            </div>
            <div className="c-MediaUpdateFolderButton__Select">
              <FormSelect<RequestFolders>
                name="folderLocation"
                label={formLabels.locationFolder}
                displayTransform={folderHierarchyDisplayTransformFunction}
                options={sortFolderHierarchy(pathFolderHierarchy)}
                optionKey={"id"}
                isRequired={true}
                defaultValue={
                  pathFolderHierarchy.find(
                    (folder) => folder?.pathId === `${activePathId}`,
                  ) ?? undefined
                }
              />
            </div>
          </div>
        </FormModal>
      </div>
    </>
  );
}
