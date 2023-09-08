import React, { useEffect, useState } from "react";
import { removeNulls } from "../../../../lib/utilities";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import { useContract } from "../../../../hooks/useContract";
import { useGetTerritoriesByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import TerritoryInhabitants from "../../../../components/Territory/TerritoryInhabitants/TerritoryInhabitants";
import TerritoryEPCIAndCitiesImport from "../../../../components/Territory/TerritoryEPCIAndCitiesImport/TerritoryEPCIAndCitiesImport";
import TerritoryClientCities from "../../../../components/Territory/TerritoryClientCities/TerritoryClientCities";
import "./territoire.scss";

export interface ITerritory {
  id: string;
  numberOfInhabitants: string;
}

export function TerritoryPage() {
  /* Static Data */
  const title = "Territoire";

  /* Local Data */
  const { contractId } = useContract();
  const [territory, setTerritory] = useState<ITerritory>();
  const {
    data: territoriesData,
    loading: territoriesLoading,
    error: territoriesError,
  } = useGetTerritoriesByContractIdQuery({
    variables: {
      contractId,
    },
  });

  useEffect(() => {
    if (territoriesData) {
      setTerritory(
        territoriesData.territories?.data
          .map((territory) => {
            return {
              id: territory.id ?? "0",
              numberOfInhabitants: territory.attributes?.numberOfInhabitants,
            };
          })
          .filter(removeNulls)[0],
      );
    }
  }, [territoriesData]);

  return (
    <div className="c-TerritoryPage">
      <PageTitle title={title} />
      <CommonLoader isLoading={territoriesLoading} errors={[territoriesError]}>
        {territory && (
          <div className="c-TerritoryPage__Container">
            <TerritoryInhabitants
              contractId={contractId}
              id={territory.id}
              inhabitants={territory.numberOfInhabitants}
            />
            <TerritoryEPCIAndCitiesImport contractId={contractId} />
            <TerritoryClientCities territoryId={territory.id} />
          </div>
        )}
      </CommonLoader>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <TerritoryPage />
    </ContractLayout>
  );
}
