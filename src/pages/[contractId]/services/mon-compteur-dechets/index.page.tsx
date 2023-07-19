import React, { useEffect, useState } from "react";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import Flow from "../../../../components/MonCompteurDechets/MCDFlow/MCDFlow";
import { TDynamicFieldConfiguration } from "../../../../lib/dynamic-blocks";
import ContactMwc from "../../../../components/MonCompteurDechets/ContactMwc/ContactMwc";
import UserManagement from "../../../../components/MonCompteurDechets/UserManagement/UserManagement";
import BarometerManagement from "../../../../components/MonCompteurDechets/BarometerManagement/BarometerManagement";

export function MonCompteurDechets() {
  /* Static Data */
  const label = {
    title: "Compteur dechets",
  };

  const [tabs, setTabs] = useState<Array<ITab>>([]);
  useEffect(() => {
    const dynamicFieldConfigurations: Array<TDynamicFieldConfiguration> = [
      { option: "ComponentBlocksImage" },
      { option: "ComponentBlocksVideo" },
      { option: "ComponentBlocksWysiwyg" },
      { option: "ComponentBlocksSubHeading" },
    ];

    const tabs = [
      {
        name: "fichesDechets",
        title: "Flow",
        content: (
          <Flow dynamicFieldConfigurations={dynamicFieldConfigurations} />
        ),
        isEnabled: true,
      },
      {
        name: "barometer",
        title: "Baromètre",
        content: <BarometerManagement />,
        isEnabled: true,
      },
      {
        name: "contactMwc",
        title: "Contact dédié",
        content: <ContactMwc />,
        isEnabled: true,
      },
      {
        name: "userManagement",
        title: "Gestion usagers",
        content: <UserManagement />,
        isEnabled: true,
      },
    ];
    setTabs(tabs);
  }, []);

  return (
    <div className="c-MonCompteurDechets">
      <PageTitle title={label.title} />
      <TabBlock tabs={tabs} initialTabName={"fichesDechets"} />
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <MonCompteurDechets />
    </ContractLayout>
  );
}
