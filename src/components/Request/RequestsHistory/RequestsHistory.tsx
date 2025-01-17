import Link from "next/link";
import { useRouter } from "next/router";
import { useContract } from "../../../hooks/useContract";
import { useUser } from "../../../hooks/useUser";
import { getRightsByLabel } from "../../../lib/user";
import "./requests-history.scss";

export default function RequestsHistory() {
  /* Static Data */
  const labels = {
    title: "Historique des demandes",
    exportButton: "Exporter au format CSV",
  };

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Request", userRights);
  const router = useRouter();
  const { contractId } = useContract();
  const historicUrl = `${process.env.NEXT_PUBLIC_API_URL}/export/${contractId}/requestHistoric`;

  if (!userPermissions.read) router.push(`/${contractId}`);

  return (
    <div className="c-RequestsHistory">
      <h2 className="c-RequestsHistory__Title">{labels.title}</h2>
      <Link
        href={historicUrl}
        className="c-RequestsHistory__Link"
        target="_blank"
      >
        <span className="c-RequestsHistory__Link_downloadPicto" />
        <span className="c-RequestsHistory__Link_downloadText">
          {labels.exportButton}
        </span>
      </Link>
    </div>
  );
}
