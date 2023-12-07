import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../../../../../hooks/useUser";
import { useContract } from "../../../../../hooks/useContract";
import { getRightsByLabel } from "../../../../../lib/user";
import "./yeswescan-service-statistic-tab.scss";

export default function YesWeScanServiceStatisticTab() {
  /* Static Data */
  const labels = {
    title: "Statistiques par point de signalement (Total)",
    exportButton: "Exporter au format CSV",
  };

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Request", userRights);
  const router = useRouter();
  const { contractId } = useContract();
  const statisticsUrl = `${process.env.NEXT_PUBLIC_API_URL}/export/${contractId}/ywsStatistics`;

  if (!userPermissions.read) router.push(`/${contractId}`);

  return (
    <div className="c-YesWeScanServiceStatisticTab">
      <h2 className="c-YesWeScanServiceStatisticTab__Title">{labels.title}</h2>
      <Link
        href={statisticsUrl}
        className="c-YesWeScanServiceStatisticTab__Link"
        target="_blank"
      >
        <span className="c-YesWeScanServiceStatisticTab__Link_downloadPicto" />
        <span className="c-YesWeScanServiceStatisticTab__Link_downloadText">
          {labels.exportButton}
        </span>
      </Link>
    </div>
  );
}
