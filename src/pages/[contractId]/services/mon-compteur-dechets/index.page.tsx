import React, { useEffect, useState } from "react";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import Flow from "../../../../components/MonCompteurDechets/MCDFlow/MCDFlow";
import ContactMwc from "../../../../components/MonCompteurDechets/ContactMwc/ContactMwc";
import UserManagement from "../../../../components/MonCompteurDechets/UserManagement/UserManagement";
import BarometerManagement from "../../../../components/MonCompteurDechets/BarometerManagement/BarometerManagement";
import HasTipsManagement from "../../../../components/MonCompteurDechets/HasTipsManagement/HasTipsManagement";

export function MonCompteurDechets() {
  /* Static Data */
  const label = {
    title: "Compteur dechets",
  };

  const [tabs, setTabs] = useState<Array<ITab>>([]);
  useEffect(() => {
    const tabs = [
      {
        name: "fichesDechets",
        title: "Flux",
        content: <Flow />,
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
        name: "tips",
        title: "Astuces",
        content: <HasTipsManagement />,
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
