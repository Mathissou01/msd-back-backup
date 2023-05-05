import React, { useEffect, useState } from "react";
import ContractLayout from "../../contract-layout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import WasteFamilyTab from "../../../../components/TabBlock/WasteFamilyTab/WasteFamilyTab";

export function GuideTriPage() {
  /* Static Data */
  const title = "Guide du tri";

  /* Local Data */
  const [tabs, setTabs] = useState<Array<ITab>>([]);

  useEffect(() => {
    const tabs = [
      {
        name: "fichesDechets",
        title: "Fiches déchets",
        content: <></>,
        isEnabled: true,
      },
      {
        name: "familleDechets",
        title: "Familles de déchets",
        content: <WasteFamilyTab />,
        isEnabled: true,
      },
      {
        name: "classerDechets",
        title: "classer les déchets",
        content: <></>,
        isEnabled: false,
      },
      {
        name: "memotri",
        title: "Mémotri",
        content: <></>,
        isEnabled: false,
      },
    ];
    setTabs(tabs);
  }, []);

  return (
    <>
      <PageTitle title={title} />
      <TabBlock tabs={tabs} initialTabName={"fichesDechets"} />
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <GuideTriPage />
    </ContractLayout>
  );
}
