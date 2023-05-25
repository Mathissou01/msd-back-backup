import React, { useEffect, useState } from "react";
import {
  GetRecyclingGuideServiceByContractIdDocument,
  useGetRecyclingGuideServiceByIdQuery,
  useUpdateRecyclingGuideServiceMutation,
} from "../../../../graphql/codegen/generated-types";
import ContractLayout from "../../contract-layout";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import WasteFamilyTab from "../../../../components/TabBlock/WasteFamilyTab/WasteFamilyTab";
import WasteFormTab from "../../../../components/TabBlock/WasteFormTab/WasteFormTab";
import { useContract } from "../../../../hooks/useContract";
import "./guide-tri-page.scss";

export function GuideTriPage() {
  /* Static Data */
  const label = {
    title: "Guide du tri",
    orderExtension: "Extension de la consigne de tri",
  };

  /* External Data */
  const { contractId, contract } = useContract();
  const { data: getRecyclingGuideServiceData } =
    useGetRecyclingGuideServiceByIdQuery({
      variables: {
        recyclingGuideServiceId:
          contract.attributes?.recyclingGuideService?.data?.id ?? "1",
      },
    });
  const [updateRecyclingGuideServiceMutation, { loading, error }] =
    useUpdateRecyclingGuideServiceMutation();

  /* Local Data */
  const [tabs, setTabs] = useState<Array<ITab>>([]);
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const tabs = [
      {
        name: "fichesDechets",
        title: "Fiches déchets",
        content: <WasteFormTab />,
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

  useEffect(() => {
    if (
      getRecyclingGuideServiceData &&
      getRecyclingGuideServiceData.recyclingGuideService?.data?.attributes
        ?.orderExtension
    ) {
      setChecked(
        getRecyclingGuideServiceData.recyclingGuideService.data.attributes
          .orderExtension,
      );
    }
  }, [getRecyclingGuideServiceData]);

  async function handleChange() {
    setChecked(!checked);
    if (getRecyclingGuideServiceData?.recyclingGuideService?.data?.id) {
      const variables = {
        updateRecyclingGuideServiceId:
          getRecyclingGuideServiceData?.recyclingGuideService.data.id,
        data: {
          orderExtension: !checked,
        },
        refetchQueries: [
          {
            query: GetRecyclingGuideServiceByContractIdDocument,
            variables: { contractId },
          },
        ],
      };
      await updateRecyclingGuideServiceMutation({ variables });
    }
  }

  return (
    <div className="c-GuideTriPage">
      <PageTitle title={label.title} />
      <CommonLoader isLoading={loading} errors={[error]}>
        <form className="c-GuideTriPage__Form">
          <input
            type="checkbox"
            name="sortingExtension"
            onChange={handleChange}
            checked={checked}
            className="c-GuideTriPage__Input"
          />
          <label htmlFor="sortingExtension" className="c-GuideTriPage__Label">
            {label.orderExtension}
          </label>
        </form>
        <TabBlock tabs={tabs} initialTabName={"fichesDechets"} />
      </CommonLoader>
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <GuideTriPage />
    </ContractLayout>
  );
}
