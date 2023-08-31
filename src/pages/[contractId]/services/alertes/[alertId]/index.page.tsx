import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import Alert from "../../../../../components/Alert/Alert";

interface IAlertNotificationFormPageProps {
  alertNotificationId: string;
  isCreateMode: boolean;
}

export interface IAlertsNotificationsMappedFields {
  alertDescription: string;
  canal: string;
  scheduledAt: Date;
  scheduledAtTime: string;
}

export function ServicesAlertFormPage({
  alertNotificationId,
  isCreateMode,
}: IAlertNotificationFormPageProps) {
  return (
    <Alert
      alertNotificationId={alertNotificationId}
      isCreateMode={isCreateMode}
    />
  );
}

export default function IndexPage() {
  const alertNotificationId = useRoutingQueryId("alertId", "create");

  return (
    alertNotificationId && (
      <ContractLayout>
        <ServicesAlertFormPage
          alertNotificationId={alertNotificationId}
          isCreateMode={alertNotificationId === "-1"}
        />
      </ContractLayout>
    )
  );
}
