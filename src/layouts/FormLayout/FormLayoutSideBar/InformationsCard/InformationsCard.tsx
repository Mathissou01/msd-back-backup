import "./informations-card.scss";

interface IInformationsCardProps {
  creationDate: string;
  updateDate: string;
}

export default function InformationsCard({
  creationDate,
  updateDate,
}: IInformationsCardProps) {
  /* Static Values */
  const labels = {
    creationDateLabel: "Création",
    updatedDateLabel: "Dernière modification",
  };
  return (
    <>
      <div className="c-InformationsCard">
        <div className="c-InformationsCard__CreationDate">
          <div className="c-InformationsCard__CreationDateLabel">
            {labels.creationDateLabel}
          </div>
          <div className="c-InformationsCard__CreationDateAndTime">
            <div>{creationDate}</div>
            {/*{TODO: structure is done (commented), add creationAuthor feature later}</div>*/}
            {/*{creationAuthor}</div>*/}
          </div>
        </div>
        <div className="c-InformationsCard__UpdateDate">
          <div className="c-InformationsCard__UpdateDateLabel">
            {labels.updatedDateLabel}
          </div>
          <div className="c-InformationsCard__UpdateDateDateAndTime">
            {updateDate}
          </div>
        </div>
      </div>
    </>
  );
}
