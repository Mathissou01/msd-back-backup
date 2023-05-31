import { FieldValues } from "react-hook-form";
import { useRef } from "react";
import {
  GetAllFoldersHierarchyDocument,
  GetFolderAndChildrenByIdDocument,
  RequestFolders,
  useCreateNewFolderMutation,
} from "../../../graphql/codegen/generated-types";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import FormModal from "../../Form/FormModal/FormModal";
import FormSelect from "../../Form/FormSelect/FormSelect";
import { mapOptionsInWrappers } from "../../Form/FormMultiselect/FormMultiselect";

interface IMediaCreateFolderButtonProps {
  folderHierarchy: Array<RequestFolders>;
  activePathId: number;
  activePath: string;
}

export default function MediaCreateFolderButton({
  folderHierarchy,
  activePathId,
  activePath,
}: IMediaCreateFolderButtonProps) {
  /* Static Data */
  const rootFolderName = "Bibliothèque de média";
  const formLabels = {
    addFolderLabel: "Ajouter un dossier",
    modalTitle: "Créer un nouveau dossier",
    titleFolderContent: "Nom du dossier",
    locationFolder: "Emplacement",
  };

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    const variables = {
      name: submitData["folderTitle"],
      parentFolderPath: submitData["folderLocation"]?.["path"],
      parentFolderPathId: submitData["folderLocation"]?.["pathId"],
    };
    return createNewFolder({
      variables,
      refetchQueries: [
        {
          query: GetFolderAndChildrenByIdDocument,
          variables: { activePathId: activePathId },
        },
        {
          query: GetAllFoldersHierarchyDocument,
          variables: { path: activePath },
        },
      ],
    });
  }

  function folderHierarchyDisplayTransformFunction(
    folder: RequestFolders,
  ): string {
    const folderLevel = folder.path?.match(/[/]/g)?.splice(2).length ?? 0;
    return "\xa0\xa0\xa0\xa0".repeat(folderLevel) + folder?.name;
  }

  function sortFolderHierarchy(folderHierarchy: Array<RequestFolders | null>) {
    const folderHierarchyCopy = [...folderHierarchy];
    const sortedFolderHierarchy = folderHierarchyCopy.sort(
      (firstFolder, secondFolder) => {
        const firstFolderPath = firstFolder?.path ?? "";
        const secondFolderPath = secondFolder?.path ?? "";
        return firstFolderPath.localeCompare(secondFolderPath);
      },
    );
    // Replace root folder name with generic name
    sortedFolderHierarchy[0] = {
      ...sortedFolderHierarchy[0],
      name: rootFolderName,
    };
    return mapOptionsInWrappers(sortedFolderHierarchy);
  }

  /* External Data */
  // TODO: try to use error of mutation
  const [createNewFolder, { loading: mutationLoading }] =
    useCreateNewFolderMutation();

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);

  return (
    <>
      <div data-testid="media-create-folder-button">
        <FormModal
          modalRef={modalRef}
          modalTitle={formLabels.modalTitle}
          hasRequiredChildren="all"
          onSubmit={onSubmitValid}
          formValidationMode="onChange"
        >
          <div className="c-MediaCreateFolderButton__Block">
            <div className="c-MediaCreateFolderButton__Input">
              <FormInput
                type="text"
                name="folderTitle"
                label={formLabels.titleFolderContent}
                isRequired={true}
                isDisabled={mutationLoading}
              />
            </div>
            <div className="c-MediaCreateFolderButton__Select">
              <FormSelect<RequestFolders>
                name="folderLocation"
                label={formLabels.locationFolder}
                displayTransform={folderHierarchyDisplayTransformFunction}
                options={sortFolderHierarchy(folderHierarchy)}
                optionKey={"id"}
                isRequired={true}
                defaultValue={
                  folderHierarchy.find(
                    (folder) => folder?.pathId === `${activePathId}`,
                  ) ?? undefined
                }
              />
            </div>
          </div>
        </FormModal>
        <CommonButton
          style="secondary"
          label={formLabels.addFolderLabel}
          picto="add"
          onClick={() => modalRef.current?.toggleModal(true)}
        />
      </div>
    </>
  );
}
