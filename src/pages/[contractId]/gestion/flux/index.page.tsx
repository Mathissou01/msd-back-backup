import React from "react";
import ContractLayout from "../../contract-layout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";

export function FluxActivationPage() {
  /* Static Data */
  const title = "Activation des flux";
  const description =
    "Vous pouvez renommer, masquer et modifier les attributs associés aux flux pour ce contrat";
  const pageLabel = "Flux à activer pour ce contrat";

  return (
    <>
      <PageTitle title={title} description={description} />
      <CommonLoader
        isLoading={false}
        hasDelay={false}
        // TODO : add errors={[error]}
        isFlexGrow={false}
      >
        <h2 className="c-FluxActivationPage__Title">{pageLabel}</h2>
      </CommonLoader>
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <FluxActivationPage />
    </ContractLayout>
  );
}
