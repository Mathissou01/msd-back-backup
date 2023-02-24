import { FieldValues } from "react-hook-form";
import { useRef } from "react";
import {
  GetFolderAndChildrenByIdDocument,
  RequestFolders,
  useGetAllFoldersHierarchyQuery,
  useUpdateUploadFolderMutation,
} from "../../../graphql/codegen/generated-types";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import FormInput from "../../Form/FormInput/FormInput";
import FormModal from "../../Form/FormModal/FormModal";
import FormSelect from "../../Form/FormSelect/FormSelect";
import { mapOptionsInWrappers } from "../../Form/FormMultiselect/FormMultiselect";
import "./media-update-folder-button.scss";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";

interface IMediaUpdateFolderButtonProps {
  id: string;
  name: string;
  path: string;
  localFolderPathId: `${number}`;
}

export default function MediaUpdateFolderButton({
  id,
  name,
  path,
  localFolderPathId,
}: IMediaUpdateFolderButtonProps) {
  /* Static Data */
  const formLabels = {
    modalTitle: "Modifier le dossier",
    titleFolderContent: "Nom du dossier",
    locationFolder: "Emplacement",
  };

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["folderLocation"]?.["pathId"]) {
      const variables = {
        updateUploadFolderId: id,
        data: {
          name: submitData["folderTitle"],
          parent: submitData["folderLocation"]["pathId"],
          path: `${submitData["folderLocation"]["path"]}/${id}`,
        },
      };
      return updateUploadFolder({
        variables,
        refetchQueries: [
          {
            query: GetFolderAndChildrenByIdDocument,
            variables: { localFolderPathId },
          },
          "getFolderAndChildrenById",
        ],
      });
    }
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
  const { contract } = useContract();
  const contractFolderId = contract.attributes?.folderId;
  const { data: folderHierarchy } = useGetAllFoldersHierarchyQuery({
    variables: { path: path, contractFolderId },
  });
  const [updateUploadFolder, { loading: mutationLoading }] =
    useUpdateUploadFolderMutation();

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const pathFolderHierchy =
    folderHierarchy?.getAllFoldersHierarchy?.filter(removeNulls) ?? [];

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
                defaultValue={name}
              />
            </div>
            <div className="c-MediaUpdateFolderButton__Select">
              <FormSelect<RequestFolders>
                name="folderLocation"
                label={formLabels.locationFolder}
                displayTransform={folderHierarchyDisplayTransformFunction}
                options={sortFolderHierarchy(pathFolderHierchy)}
                optionKey={"id"}
                isRequired={true}
                defaultValue={
                  pathFolderHierchy.find(
                    (folder) => folder?.pathId === localFolderPathId,
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
