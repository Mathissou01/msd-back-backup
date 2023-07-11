import ContractLayout from "../../../../../../layouts/ContractLayout/ContractLayout";
import { useRoutingQueryId } from "../../../../../../hooks/useRoutingQueryId";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";
import InformationMessageFormReturnButton from "../../../../../../components/InformationMessage/InformationMessageFormReturnButton/InformationMessageFormReturnButton";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import "./gestion-rendez-vous.scss";

interface IAppointmentManagementPageProps {
  requestId: string;
}

export function AppointmentManagementPage({
  requestId,
}: IAppointmentManagementPageProps) {
  /* Static Data */
  const labels = {
    back: "Retour",
    title: "Créneaux",
  };

  /* Local Data */
  // TODO : Replace with GraphQL call when it will be available
  const tableData = {
    title: "Collecte des encombrants à domicile",
    appointments: [
      {
        sectorNames: ["Secteur 1", "Secteur 2", "Secteur 3"],
        timeSlotsWithUsers: {
          "2023-06-26T00:00:00.000Z": {
            "0800-1200": {
              fixed: 4,
              dynamic: 4,
            },
          },
          "2023-06-27T00:00:00.000Z": {
            "0800-1200": {
              fixed: 4,
              dynamic: 3,
              users: [
                {
                  id: "3",
                  name: "Marcel",
                  surname: "Proust",
                  phone: "+33454545454",
                  email: "la-recherche@tempsperdu.fr",
                },
              ],
            },
          },
          "2023-06-28T00:00:00.000Z": {
            "0800-1200": {
              fixed: 4,
              dynamic: 4,
            },
          },
          "2023-06-29T00:00:00.000Z": {
            "0800-1200": {
              fixed: 4,
              dynamic: 4,
            },
          },
          "2023-06-30T00:00:00.000Z": {
            "0800-1200": {
              fixed: 4,
              dynamic: 4,
            },
          },
          "2023-07-01T00:00:00.000Z": {
            "0800-1200": {
              fixed: 4,
              dynamic: 4,
            },
          },
        },
      },
    ],
  };
  const isLoading = false;
  const errors: [] = [];

  return (
    <div className="c-AppointmentManagementPage">
      {requestId && (
        <>
          <InformationMessageFormReturnButton
            path="/services/demandes"
            query={{ tab: "appointmentManagement" }}
          />
          <PageTitle title={labels.title} />
          <CommonLoader isLoading={isLoading} errors={errors}>
            <PageTitle title={tableData.title} />
          </CommonLoader>
        </>
      )}
    </div>
  );
}

export default function IndexPage() {
  const requestId = useRoutingQueryId("requestId");

  return (
    requestId && (
      <ContractLayout>
        <AppointmentManagementPage requestId={requestId} />
      </ContractLayout>
    )
  );
}
