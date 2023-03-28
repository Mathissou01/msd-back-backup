import { RefObject } from "react";
import { GetAllFoldersHierarchyQuery } from "../../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../../lib/utilities";
import TabBlock, { Tab } from "../../../../TabBlock/TabBlock";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../../../Common/CommonButton/CommonButton";
import MediaCreateFolderButton from "../../../MediaCreateFolderButton/MediaCreateFolderButton";
import MediaImportButton from "../../../MediaImportButton/MediaImportButton";

interface ISelectingModalProps {
  modalRef: RefObject<CommonModalWrapperRef>;
  activePathId: number;
  tabs: Tab[];
  folderHierarchy: GetAllFoldersHierarchyQuery | undefined;
  isButtonDirty: boolean;
  handleChoosedFile: () => void;
}

export default function SelectingModal({
  modalRef,
  activePathId,
  tabs,
  folderHierarchy,
  isButtonDirty,
  handleChoosedFile,
}: ISelectingModalProps) {
  return (
    <>
      <div className="c-MediaBlock__Options">
        <div className="c-MediaBlock__Actions">
          <div className="c-MediaBlock__Navigation"></div>
          <div className="c-MediaBlock__ActionButtons">
            <MediaCreateFolderButton
              folderHierarchy={
                folderHierarchy?.getAllFoldersHierarchy?.filter(removeNulls) ??
                []
              }
              activePathId={activePathId}
            />
            <MediaImportButton
              folderHierarchy={
                folderHierarchy?.getAllFoldersHierarchy?.filter(removeNulls) ??
                []
              }
              activePathId={activePathId}
            />
          </div>
        </div>
        <div className="c-MediaBlock__Filters"></div>
      </div>
      <TabBlock
        tabs={tabs}
        initialTabName={"FromComputer"}
        isAlignLeftMediaLibrary={true}
      />
      <div className="c-MediaBlock__Button">
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
          onClick={() => handleChoosedFile()}
        />
      </div>
    </>
  );
}
