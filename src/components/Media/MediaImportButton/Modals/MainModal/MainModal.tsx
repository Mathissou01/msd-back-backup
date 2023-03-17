import CommonButton from "../../../../Common/CommonButton/CommonButton";
import { CommonModalWrapperRef } from "../../../../Common/CommonModalWrapper/CommonModalWrapper";
import TabBlock, { Tab } from "../../../../TabBlock/TabBlock";

interface IMainModalProps {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  tabs: Tab[];
}

export default function MainModal({ modalRef, tabs }: IMainModalProps) {
  /** Local Data */
  const labels = {
    homeModalTitle: "Ajouter des médias",
    cancelBtn: "Annuler",
  };

  return (
    <>
      <hgroup>
        <div className="c-MediaImportButton__Title">
          {labels.homeModalTitle}
        </div>
      </hgroup>
      <TabBlock
        tabs={tabs}
        initialTabName={"FromComputer"}
        isAlignLeftMediaLibrary={true}
      />
      <div className="c-MediaImportButton__Button">
        <CommonButton
          type="button"
          label={labels.cancelBtn}
          onClick={() => modalRef.current?.toggleModal(false)}
        />
      </div>
    </>
  );
}
