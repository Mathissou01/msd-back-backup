import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRightsByLabel } from "../../../../lib/user";
import { useContract } from "../../../../hooks/useContract";
import { useUser } from "../../../../hooks/useUser";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import RequestsList from "../../../../components/Request/RequestsList/RequestsList";
import AppointmentManagement from "../../../../components/Request/AppointmentManagement/AppointmentManagement";
import RequestsHistory from "../../../../components/Request/RequestsHistory/RequestsHistory";

export function RequestsPage() {
  /* Static Data */
  const labels = {
    title: "Demandes",
    tabs: {
      requestsList: "Formulaires de demande",
      requestsHistory: "Historique des demandes",
      appointmentManagement: "Gestion des rendez-vous",
    },
  };
  const requestListTabName = "requestList";

  /* Methods */
  function onTabChanged(activeTab: string) {
    router.query.tab = activeTab;
    router.push({ pathname: router.pathname, query: router.query });
  }

  /* Local Data */
  const router = useRouter();
  const { contractId } = useContract();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Request", userRights);

  if (!userPermissions.read) router.push(`/${contractId}`);

  const tabs: ITab[] = [
    {
      name: "requestList",
      content: <RequestsList />,
      isEnabled: true,
      title: labels.tabs.requestsList,
    },
    {
      name: "requestHistory",
      content: <RequestsHistory />,
      isEnabled: true,
      title: labels.tabs.requestsHistory,
    },
    {
      name: "appointmentManagement",
      content: <AppointmentManagement />,
      isEnabled: true,
      title: labels.tabs.appointmentManagement,
    },
  ];
  const [defaultTab, setDefaultTab] = useState<string>(requestListTabName);

  useEffect(() => {
    setDefaultTab((router.query.tab as string) ?? requestListTabName);
  }, [router.query.tab]);

  return (
    <div className="c-RequestsPage">
      <PageTitle title={labels.title} />
      <TabBlock
        initialTabName={defaultTab}
        tabs={tabs}
        onTabChanged={onTabChanged}
      />
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <RequestsPage />
    </ContractLayout>
  );
}
