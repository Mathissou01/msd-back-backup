import { useRouter } from "next/router";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import { useNavigation } from "../../../../hooks/useNavigation";

export function RequestsPage() {
  /* Static Data */
  const label = {
    title: "Demandes",
    createRequest: "Créer un nouveau formulaire de demande",
  };

  /* External Data */
  const router = useRouter();
  const { currentRoot } = useNavigation();

  return (
    <div className="o-RequestsPage">
      <PageTitle title={label.title} />
      <div>
        <CommonButton
          label={label.createRequest}
          style="primary"
          picto="add"
          onClick={() => router.push(`${currentRoot}/services/demandes/create`)}
        />
      </div>
      <span>Request page WIP</span>
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
