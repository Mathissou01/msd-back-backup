import TabBlock, { ITab } from "../../../../TabBlock/TabBlock";

interface IMainModalProps {
  tabs: ITab[];
}

export default function MainModal({ tabs }: IMainModalProps) {
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
    </>
  );
}
