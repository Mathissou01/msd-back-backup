import React from "react";
import ContractLayout from "../../contract-layout";
import PageTitle from "../../../../components/PageTitle/PageTitle";

export function PersonnalisationCouleursPage() {
  /* Static Data */
  const title = "Couleurs, logo, lien";
  const description = "Personnalisez le site à vos couleurs.";

  return <PageTitle title={title} description={description} />;
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <PersonnalisationCouleursPage />
    </ContractLayout>
  );
}
