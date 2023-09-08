import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import ServicesBlock from "../../../../components/Services/ServicesBlock";

export function ServicesActivationPage() {
  /* Static Data */
  const title = "Activation des Services";

  return (
    <>
      <PageTitle title={title} />
      <ServicesBlock />
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <ServicesActivationPage />
    </ContractLayout>
  );
}
