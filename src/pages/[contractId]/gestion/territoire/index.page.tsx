import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  EpciEntity,
  useGetTerritoriesByContractIdQuery,
} from "../../../../graphql/codegen/generated-types";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import { removeNulls } from "../../../../lib/utilities";
import { getRightsByLabel } from "../../../../lib/user";
import { useUser } from "../../../../hooks/useUser";
import { useContract } from "../../../../hooks/useContract";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import TerritoryInhabitants from "../../../../components/Territory/TerritoryInhabitants/TerritoryInhabitants";
import TerritoryEPCIAndCitiesImport from "../../../../components/Territory/TerritoryEPCIAndCitiesImport/TerritoryEPCIAndCitiesImport";
import TerritoryEPCIList from "../../../../components/Territory/TerritoryEPCIList/TerritoryEPCIList";
import TerritoryClientCities from "../../../../components/Territory/TerritoryClientCities/TerritoryClientCities";
import "./territoire.scss";

export interface ITerritory {
  id: string;
  numberOfInhabitants: string;
  epci: EpciEntity[];
}

export function TerritoryPage() {
  /* Static Data */
  const title = "Territoire";

  /* Local Data */
  const { contractId } = useContract();
  const router = useRouter();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Territory", userRights);
  const [territory, setTerritory] = useState<ITerritory>();
  const {
    data: territoriesData,
    loading: territoriesLoading,
    error: territoriesError,
  } = useGetTerritoriesByContractIdQuery({
    fetchPolicy: "network-only",
    variables: {
      contractId,
    },
  });
  useEffect(() => {
    if (!userPermissions.read) router.push(`/${contractId}`);

    if (territoriesData) {
      const newTerritory = territoriesData.territories?.data
        .map((territory) => {
          if (territory.attributes?.epcis?.data)
            return {
              id: territory.id ?? "0",
              numberOfInhabitants: territory.attributes?.numberOfInhabitants,
              epci: territory.attributes.epcis.data,
            };
        })
        .filter(removeNulls)[0];

      if (newTerritory) {
        setTerritory(newTerritory);
      }
    }
  }, [contractId, router, territoriesData, userPermissions.read]);

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
            <TerritoryEPCIList
              territoryData={territory}
              contractId={contractId}
            />
            <TerritoryClientCities />
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
