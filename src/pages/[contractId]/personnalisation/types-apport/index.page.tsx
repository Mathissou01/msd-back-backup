import React from "react";
import ContractLayout from "../../contract-layout";
import PageTitle from "../../../../components/PageTitle/PageTitle";

export function PersonnalisationTypesApportPage() {
  /* Static Data */
  const title = "Types de lieux d'apport";
  const description = "WIP";

  return <PageTitle title={title} description={description} />;
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <PersonnalisationTypesApportPage />
    </ContractLayout>
  );
}
