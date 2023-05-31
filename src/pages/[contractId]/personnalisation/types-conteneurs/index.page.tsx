import React from "react";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";

export function PersonnalisationTypesConteneursPage() {
  /* Static Data */
  const title = "Type de conteneurs";
  const description = "WIP";

  return <PageTitle title={title} description={description} />;
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <PersonnalisationTypesConteneursPage />
    </ContractLayout>
  );
}
