import { useRouter } from "next/router";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import RequestsList from "../../../../components/Request/RequestsList/RequestsList";

export function RequestsPage() {
  /* Static Data */
  const labels = {
    title: "Demandes",
    tabs: {
      requestsList: "Formulaires de demande",
      appointmentManagement: "Gestion des rendez-vous",
    },
  };

  /* Local Data */
  const router = useRouter();
  const tabs: ITab[] = [
    {
      name: "requestList",
      content: <RequestsList />,
      isEnabled: true,
      title: labels.tabs.requestsList,
    },
    // TODO : Uncomment when Back End will be available for this tab component
    /*{
      name: "appointmentManagement",
      content: <AppointmentManagement />,
      isEnabled: true,
      title: labels.tabs.appointmentManagement,
    },*/
  ];

  return (
    <div className="c-RequestsPage">
      <PageTitle title={labels.title} />
      <TabBlock
        initialTabName={
          router.query.tab ? router.query.tab.toString() : "requestList"
        }
        tabs={tabs}
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
