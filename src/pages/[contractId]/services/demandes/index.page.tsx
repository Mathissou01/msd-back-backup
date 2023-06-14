import PageTitle from "../../../../components/PageTitle/PageTitle";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";

export function RequestsPage() {
  /* Static Data */
  const label = {
    title: "Demandes",
  };

  return (
    <div className="o-RequestsPage">
      <PageTitle title={label.title} />
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
