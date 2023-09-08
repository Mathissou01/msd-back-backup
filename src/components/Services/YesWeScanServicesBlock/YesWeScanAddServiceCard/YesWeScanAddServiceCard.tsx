import "./yes-we-scan-add-service-card.scss";

interface IYesWeScanAddServiceCardProps {
  onClick: () => void;
}

export default function YesWeScanAddServiceCard({
  onClick,
}: IYesWeScanAddServiceCardProps) {
  /* Static Data */
  const addYesWeScanServiceLabel = "Ajouter un service Yes we scan";

  return (
    <div className="c-YesWeScanAddServiceCard" onClick={onClick}>
      <span className="c-YesWeScanAddServiceCard__PlusIcon" />
      <span>{addYesWeScanServiceLabel}</span>
    </div>
  );
}
