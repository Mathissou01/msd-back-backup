import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  useGetYwsServicesByContractIdLazyQuery,
  YesWeScanServiceEntity,
} from "../../../../graphql/codegen/generated-types";
import { getRightsByLabel } from "../../../../lib/user";
import { removeNulls } from "../../../../lib/utilities";
import { useNavigation } from "../../../../hooks/useNavigation";
import { useUser } from "../../../../hooks/useUser";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonButton from "../../../../components/Common/CommonButton/CommonButton";
import "./yeswescan-page.scss";

function YesWeScanPage() {
  /* Static data */
  const labels = {
    title: "YesWeScan",
    handleService: "Gérer le service :",
    info: "Pour ajouter un nouveau service YesWeScan, rapprochez-vous de votre référent Suez",
    noServices: "Aucun service YesWeScan",
  };

  const { contractId } = useContract();
  const [pageData, setPageData] = useState<Array<YesWeScanServiceEntity>>([]);
  const [getYesWeScanServices, { data }] =
    useGetYwsServicesByContractIdLazyQuery({
      fetchPolicy: "network-only",
    });

  /* Methods */
  function onServiceClick(serviceId: string) {
    router.push(`${currentRoot}/services/yeswescan/${serviceId}`);
  }

  /* Local data */
  const router = useRouter();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Yws", userRights);
  const { currentRoot } = useNavigation();
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      if (!userPermissions.read) router.push(`/${contractId}`);
      void getYesWeScanServices({
        variables: {
          contractId: contractId,
          today: new Date(),
        },
      });
      isInitialized.current = true;
    }
  }, [
    contractId,
    getYesWeScanServices,
    isInitialized,
    router,
    userPermissions.read,
  ]);

  useEffect(() => {
    if (data && data.yesWeScanServices && data.yesWeScanServices.data)
      setPageData(data.yesWeScanServices.data.filter(removeNulls) ?? []);
  }, [data]);

  return (
    <div className="c-YesWeScanPage">
      <PageTitle title={labels.title} />
      <h3>{labels.handleService}</h3>
      <div className="c-YesWeScanPage__Services">
        {pageData && pageData.length > 0 ? (
          pageData.map((service, index) => {
            if (
              service &&
              service.id &&
              service.attributes &&
              service.attributes.serviceName
            ) {
              return (
                <CommonButton
                  key={index}
                  label={service.attributes.serviceName}
                  onClick={() => onServiceClick(service.id ?? "")}
                />
              );
            }
          })
        ) : (
          <span>{labels.noServices}</span>
        )}
      </div>
      <span>{labels.info}</span>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <YesWeScanPage />
    </ContractLayout>
  );
}
