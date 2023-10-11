import { useRouter } from "next/router";
import React from "react";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import InformationMessageTab from "../../../../components/TabBlock/Tabs/PickUpDays/InformationMessageTab/InformationMessageTab";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import CollectTab from "../../../../components/TabBlock/Tabs/PickUpDays/CollectTab/CollectTab";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import { getRightsByLabel } from "../../../../lib/user";
import { useContract } from "../../../../hooks/useContract";
import { useUser } from "../../../../hooks/useUser";

export function PickUpDaysPage() {
  /* Static Data */
  const label = {
    title: "Jour de collecte",
  };

  /* Local Data */
  const router = useRouter();
  const { contractId } = useContract();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("PickUpDay", userRights);

  if (!userPermissions.read) router.push(`/${contractId}`);

  const tabs: Array<ITab> = [
    {
      name: "collecte",
      title: "Collecte",
      content: <CollectTab />,
      isEnabled: true,
    },
    {
      name: "informationMessage",
      title: "Message d'information",
      content: <InformationMessageTab />,
      isEnabled: true,
    },
  ];

  return (
    <div className="o-PickUpDaysPage">
      <PageTitle title={label.title} />
      <CommonLoader isLoading={false}>
        <TabBlock
          tabs={tabs}
          initialTabName={
            router.query.tab === "informationMessage"
              ? "informationMessage"
              : "collecte"
          }
        />
      </CommonLoader>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <PickUpDaysPage />
    </ContractLayout>
  );
}
