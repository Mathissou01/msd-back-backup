import Link from "next/link";
import "./requests-history.scss";

export default function RequestsHistory() {
  /* Static Data */
  const labels = {
    title: "Historique des demandes",
    exportButton: "Exporter au format CSV",
  };

  return (
    <div className="c-RequestsHistory">
      <h2 className="c-RequestsHistory__Title">{labels.title}</h2>
      {/* TODO : Replace with Back End URL */}
      <Link href="/" className="c-RequestsHistory__Link">
        <span className="c-RequestsHistory__Link_downloadPicto" />
        <span className="c-RequestsHistory__Link_downloadText">
          {labels.exportButton}
        </span>
      </Link>
    </div>
  );
}
