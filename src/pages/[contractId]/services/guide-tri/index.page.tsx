import React, { useEffect, useState } from "react";
import {
  GetRecyclingGuideServicesByContractIdDocument,
  useGetRecyclingGuideServiceByIdQuery,
  useUpdateRecyclingGuideServiceByIdMutation,
} from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import WasteFormTab from "../../../../components/TabBlock/Tabs/RecyclingGuide/WasteFormTab/WasteFormTab";
import WasteFamilyTab from "../../../../components/TabBlock/Tabs/RecyclingGuide/WasteFamilyTab/WasteFamilyTab";
import MemoTriTab from "../../../../components/TabBlock/MemoTriTab/MemoTriTab";
import "./guide-tri-page.scss";

export function GuideTriPage() {
  /* Static Data */
  const label = {
    title: "Guide du tri",
    orderExtension: "Extension de la consigne de tri",
  };

  /* External Data */
  const { contractId, contract } = useContract();
  const {
    data: recyclingGuideData,
    loading: recyclingGuideLoading,
    error: recyclingGuideError,
  } = useGetRecyclingGuideServiceByIdQuery({
    variables: {
      recyclingGuideServiceId:
        contract.attributes?.recyclingGuideService?.data?.id,
    },
    fetchPolicy: "network-only",
  });
  const [updateRecyclingGuideService, { loading, error }] =
    useUpdateRecyclingGuideServiceByIdMutation({
      refetchQueries: ["getRecyclingGuideServiceById"],
    });

  /* Local Data */
  const [tabs, setTabs] = useState<Array<ITab>>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const isLoading = recyclingGuideLoading || loading;
  const errors = [recyclingGuideError, error];

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
        name: "memotri",
        title: "Mémotri",
        content: <MemoTriTab />,
        isEnabled: true,
      },
    ];
    setTabs(tabs);
  }, []);

  useEffect(() => {
    if (
      recyclingGuideData &&
      recyclingGuideData.recyclingGuideService?.data?.attributes?.orderExtension
    ) {
      setChecked(
        recyclingGuideData.recyclingGuideService.data.attributes.orderExtension,
      );
    }
  }, [recyclingGuideData]);

  async function handleChange() {
    setChecked(!checked);
    if (recyclingGuideData?.recyclingGuideService?.data?.id) {
      const variables = {
        updateRecyclingGuideServiceId:
          recyclingGuideData?.recyclingGuideService.data.id,
        data: {
          orderExtension: !checked,
        },
        refetchQueries: [
          {
            query: GetRecyclingGuideServicesByContractIdDocument,
            variables: { contractId },
          },
        ],
      };
      await updateRecyclingGuideService({ variables });
    }
  }

  return (
    <div className="c-GuideTriPage">
      <PageTitle title={label.title} />
      <CommonLoader isLoading={isLoading} errors={errors}>
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
