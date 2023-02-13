import { FieldValues } from "react-hook-form";
import { useRef } from "react";
import {
  GetFolderAndChildrenByIdDocument,
  RequestFolders,
  useUpdateUploadFolderMutation,
} from "../../../graphql/codegen/generated-types";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import FormInput from "../../Form/FormInput/FormInput";
import FormModal from "../../Form/FormModal/FormModal";
import FormSelect from "../../Form/FormSelect/FormSelect";
import { mapOptionsInWrappers } from "../../Form/FormMultiselect/FormMultiselect";
import "./media-update-folder-button.scss";

interface IMediaUpdateFolderButtonProps {
  id: string;
  name: string;
  path: string;
  folderHierarchy: Array<RequestFolders>;
  localFolderPathId: `${number}`;
}

export default function MediaUpdateFolderButton({
  id,
  name,
  path,
  folderHierarchy,
  localFolderPathId,
}: IMediaUpdateFolderButtonProps) {
  /* Static Data */
  const formLabels = {
    modalTitle: "Modifier le dossier",
    titleFolderContent: "Nom du dossier",
    locationFolder: "Emplacement",
  };
  // const imagesPicto = "/images/pictos/edit.svg";
  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    if (submitData["folderLocation"]?.["pathId"]) {
      const variables = {
        updateUploadFolderId: id,
        data: {
          name: submitData["folderTitle"],
          parent: submitData["folderLocation"]["pathId"],
          path: path,
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

  /* External Data */
  const [updateUploadFolder, { loading: mutationLoading }] =
    useUpdateUploadFolderMutation();

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);

  return (
    <>
      <div data-testid="media-update-folder-button">
        <button
          type="button"
          className="c-MediaUpdateFolderButton__Button"
          onClick={() => modalRef.current?.toggleModal(true)}
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
                options={sortFolderHierarchy(folderHierarchy)}
                optionKey={"id"}
                isRequired={true}
                defaultValue={
                  folderHierarchy.find(
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
