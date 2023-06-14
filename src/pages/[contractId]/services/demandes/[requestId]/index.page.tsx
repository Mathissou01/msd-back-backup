import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";

interface IRequestFormPageProps {
  requestId: string;
}

export function RequestFormPage({ requestId }: IRequestFormPageProps) {
  return (
    <div className="o-RequestModifyPage">
      Modify page for request {requestId} WIP
    </div>
  );
}

export default function IndexPage() {
  const requestId = useRoutingQueryId("requestId", "create");

  return (
    requestId && (
      <ContractLayout>
        <RequestFormPage requestId={requestId} />
      </ContractLayout>
    )
  );
}
