import React, { useEffect, useState } from "react";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import Flow from "../../../../components/MonCompteurDechets/MCDFlow/MCDFlow";
import { TDynamicFieldOption } from "../../../../lib/dynamic-blocks";

export function MonCompteurDechets() {
  /* Static Data */
  const label = {
    title: "Compteur dechets",
  };

  const [tabs, setTabs] = useState<Array<ITab>>([]);
  useEffect(() => {
    const dynamicFieldOptions: Array<TDynamicFieldOption> = [
      "ComponentBlocksImage",
      "ComponentBlocksVideo",
      "ComponentBlocksWysiwyg",
      "ComponentBlocksSubHeading",
    ];

    const tabs = [
      {
        name: "fichesDechets",
        title: "Flow",
        content: <Flow dynamicFieldsOptions={dynamicFieldOptions} />,
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
