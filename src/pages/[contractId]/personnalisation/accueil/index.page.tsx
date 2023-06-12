import React, { useEffect, useState } from "react";
import { useGetServicesActiveQuery } from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import { TEditorialContentTypes } from "../../../../lib/editorial";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../components/Common/CommonLoader/CommonLoader";
import TabBlock, { ITab } from "../../../../components/TabBlock/TabBlock";
import WelcomeAndSearchEngineTab from "../../../../components/TabBlock/Tabs/Homepage/WelcomeAndSearchEngineTab/WelcomeAndSearchEngineTab";
import RecyclingGuideTab from "../../../../components/TabBlock/Tabs/Homepage/RecyclingGuideTab/RecyclingGuideTab";
import ServiceTab from "../../../../components/TabBlock/Tabs/Homepage/ServicesTab/ServicesTab";
import TopContentTab from "../../../../components/TabBlock/Tabs/Homepage/TopContentTab/TopContentTab";
import QuizAndTipsTab from "../../../../components/TabBlock/Tabs/Homepage/QuizAndTipsTab/QuizAndTipsTab";
import EditoTab from "../../../../components/TabBlock/Tabs/Homepage/EditoTab/EditoTab";

export interface IServiceParameters {
  isServiceRecyclingGuideActivated: boolean;
  isQuizActivated: boolean;
  isTipsActivated: boolean;
  isEventsActivated: boolean;
  isNewsActivated: boolean;
  hasFreeContentsActivated: boolean;
}

export function PersonnalisationAccueilPage() {
  /* Static Data */
  const title = "Page d'accueil";
  const description =
    "Choisissez les blocs que vous souhaitez faire figurer sur la page d’accueil. Vous pouvez choisir de renommer les blocs sélectionnés et de paramétrer certains de leur contenus.";

  /* External Data */
  const { contractId } = useContract();
  const { loading, error, data } = useGetServicesActiveQuery({
    variables: { contractId },
  });

  /* Local Data */
  const [serviceParameters, setServiceParameters] =
    useState<IServiceParameters>();
  const [tabs, setTabs] = useState<Array<ITab>>([]);

  useEffect(() => {
    if (data) {
      setServiceParameters({
        isServiceRecyclingGuideActivated:
          !!data.recyclingGuideServices?.data[0]?.attributes?.isActivated,
        isQuizActivated:
          !!data.editorialServices?.data[0]?.attributes?.quizSubService?.data
            ?.attributes?.isActivated,
        isTipsActivated:
          !!data.editorialServices?.data[0]?.attributes?.tipSubService?.data
            ?.attributes?.isActivated,
        isEventsActivated:
          !!data.editorialServices?.data[0]?.attributes?.eventSubService?.data
            ?.attributes?.isActivated,
        isNewsActivated:
          !!data.editorialServices?.data[0]?.attributes?.newsSubService?.data
            ?.attributes?.isActivated,
        hasFreeContentsActivated:
          !!data.editorialServices?.data[0]?.attributes?.freeContentSubServices?.data.some(
            (freeContentSubService) =>
              freeContentSubService.attributes?.isActivated,
          ),
      });
    }
  }, [data]);

  useEffect(() => {
    if (serviceParameters) {
      const tabs = [
        {
          name: "welcomeAndSearchEngine",
          title: "Message et moteur de recherche",
          content: <WelcomeAndSearchEngineTab />,
          isEnabled: true,
        },
        {
          name: "recyclingGuide",
          title: "Guide du Tri",
          content: <RecyclingGuideTab />,
          isEnabled: serviceParameters.isServiceRecyclingGuideActivated,
        },
        {
          name: "services",
          title: "Services",
          content: <ServiceTab />,
          isEnabled: true,
        },
        {
          name: "keyMetrics",
          title: "Chiffres clés",
          content: <div />,
          isEnabled: false,
        },
        {
          name: "topContent",
          title: "À la une",
          content: <TopContentTab />,
          isEnabled:
            serviceParameters.isEventsActivated &&
            serviceParameters.isNewsActivated,
        },
        {
          name: "quizAndTips",
          title: "Quiz & Astuces",
          content: <QuizAndTipsTab />,
          isEnabled:
            serviceParameters.isQuizActivated &&
            serviceParameters.isTipsActivated,
        },
        {
          name: "edito",
          title: "Bloc Édito",
          content: (
            <EditoTab
              activatedTypes={[
                serviceParameters.isQuizActivated
                  ? ("quiz" as TEditorialContentTypes)
                  : null,
                serviceParameters.isTipsActivated
                  ? ("tip" as TEditorialContentTypes)
                  : null,
                serviceParameters.isEventsActivated
                  ? ("event" as TEditorialContentTypes)
                  : null,
                serviceParameters.isNewsActivated
                  ? ("new" as TEditorialContentTypes)
                  : null,
                serviceParameters.hasFreeContentsActivated
                  ? ("free-content" as TEditorialContentTypes)
                  : null,
              ].filter(removeNulls)}
            />
          ),
          isEnabled:
            serviceParameters.isQuizActivated ||
            serviceParameters.isTipsActivated ||
            serviceParameters.isEventsActivated ||
            serviceParameters.isNewsActivated ||
            serviceParameters.hasFreeContentsActivated,
        },
      ];
      setTabs(tabs);
    }
  }, [serviceParameters]);

  return (
    <>
      <PageTitle title={title} description={description} />
      <CommonLoader
        isLoading={loading && tabs.length > 0}
        hasDelay={false}
        errors={[error]}
        isFlexGrow={false}
      >
        <TabBlock tabs={tabs} initialTabName={"welcomeAndSearchEngine"} />
      </CommonLoader>
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <PersonnalisationAccueilPage />
    </ContractLayout>
  );
}
