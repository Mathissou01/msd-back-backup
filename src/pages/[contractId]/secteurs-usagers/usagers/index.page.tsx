import React, { useEffect, useState } from "react";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import UsersBlock from "../../../../components/Users/UsersBlock";
import { useContract } from "../../../../hooks/useContract";
import { removeNulls } from "../../../../lib/utilities";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import { useGetAudiencesByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import "./usagers.scss";
export interface IAudience {
  id: string;
  isActive: boolean;
  type: string;
}
export function UsagersPage() {
  /* Static Data */
  const title = "Usagers";
  const description = "Gérez vos différents profils d'usagers";
  const pageLabel = "Liste des usagers";

  /* Local Data */
  const { contractId } = useContract();
  const [audiences, setAudiences] = useState<IAudience[]>([]);
  const { data, loading, error } = useGetAudiencesByContractIdQuery({
    variables: {
      filters: {
        contract: {
          id: {
            eq: contractId,
          },
        },
      },
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setAudiences(
        data?.audiences?.data
          ?.map((audience) => {
            if (audience && audience.id && audience.attributes) {
              return {
                id: audience.id,
                isActive: audience.attributes?.isActive,
                type: audience.attributes?.type,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [data]);
  return (
    <div className="c-UsagersPage">
      <PageTitle title={title} description={description} />
      <CommonLoader isLoading={loading} isFlexGrow={false} errors={[error]}>
        <h2 className="c-UsagersPage__Title">{pageLabel}</h2>
        <div className="c-UsagersPage__Block">
          {audiences &&
            audiences?.map((audience) => (
              <UsersBlock key={audience.id} audience={audience} />
            ))}
        </div>
      </CommonLoader>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <UsagersPage />
    </ContractLayout>
  );
}
