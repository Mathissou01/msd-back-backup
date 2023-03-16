import "./date-block.scss";

interface IDraftInformationBlockProps {
  creationDate: string;
  updateDate: string;
}

export default function DateBlock({
  creationDate,
  updateDate,
}: IDraftInformationBlockProps) {
  /* Static Values */
  // TODO: structure is done (commented), finish other draftInformationBlock feature later
  const labels = {
    creationDateLabel: "Création",
    updatedDateLabel: "Dernière modification",
  };
  return (
    <>
      <div className="c-DateBlock">
        <div className="c-DateBlock__CreationDate">
          <div className="c-DateBlock__CreationDateLabel">
            {labels.creationDateLabel}
          </div>
          <div className="c-DateBlock__CreationDateDateAndTime">
            <div>{creationDate}</div>

            {/*{creationAuthor}</div>*/}
          </div>
        </div>
        <div className="c-DateBlock__UpdateDate">
          <div className="c-DateBlock__UpdateDateLabel">
            {labels.updatedDateLabel}
          </div>
          <div className="c-DateBlock__UpdateDateDateAndTime">{updateDate}</div>
        </div>
      </div>
    </>
  );
}
