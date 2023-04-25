import React, { useEffect, useState } from "react";
import ContractLayout from "../../contract-layout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import FlowBlock from "../../../../components/Flows/FlowBlock";
import { useGetFlowsByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import { removeNulls } from "../../../../lib/utilities";

interface IFlowCardProps {
  id: string;
  name: string;
  //isActivated: boolean;
}

export function FluxActivationPage() {
  /* Static Data */
  const title = "Activation des flux";
  const description =
    "Vous pouvez renommer, masquer et modifier les attributs associés aux flux pour ce contrat";
  const pageLabel = "Flux à activer pour ce contrat";

  /* External Data */
  const { contractId } = useContract();
  const [flows, setFlows] = useState<IFlowCardProps[]>([]);
  const { data } = useGetFlowsByContractIdQuery({
    variables: contractId,
  });

  useEffect(() => {
    if (data) {
      setFlows(
        data?.flows?.data
          ?.map((flow) => {
            if (flow && flow.id && flow.attributes) {
              return {
                id: flow.id,
                name: flow.attributes.name ?? "",
                isActivated: flow.attributes?.isActivated,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [data]);

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
        <FlowBlock data={flows} />
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
