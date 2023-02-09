import React, { useEffect, useState } from "react";
import { useGetServicesActiveQuery } from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import PageTitle from "../../../components/PageTitle/PageTitle";
import TabBlock, { Tab } from "../../../components/TabBlock/TabBlock";
import WelcomeAndSearchEngineTab from "../../../components/TabBlock/WelcomeAndSearchEngineTab/WelcomeAndSearchEngineTab";
import RecyclingGuideTab from "../../../components/TabBlock/RecyclingGuideTab/RecyclingGuideTab";
import ServiceTab from "../../../components/TabBlock/ServicesTab/ServicesTab";
import TopContentTab from "../../../components/TabBlock/TopContentTab/TopContentTab";
import QuizAndTipsTab from "../../../components/TabBlock/QuizAndTipsTab/QuizAndTipsTab";
import EditoTab from "../../../components/TabBlock/EditoTab/EditoTab";
import CommonLoader from "../../../components/Common/CommonLoader/CommonLoader";

interface IServiceParameters {
  isServiceRecyclingGuideActivated: boolean;
  isQuizActivated: boolean;
  isTipsActivated: boolean;
  isEventsActivated: boolean;
  isNewsActivated: boolean;
  hasFreeContentsActivated: boolean;
}

export default function PersonnalisationAccueilPage() {
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
  const [tabs, setTabs] = useState<Array<Tab>>([]);

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
        isEnabled: !!serviceParameters?.isServiceRecyclingGuideActivated,
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
        isEnabled: true,
      },
      {
        name: "topContent",
        title: "À la une",
        content: <TopContentTab />,
        isEnabled:
          !!serviceParameters?.isEventsActivated &&
          !!serviceParameters?.isNewsActivated,
      },
      {
        name: "quizAndTips",
        title: "Quiz & Astuces",
        content: <QuizAndTipsTab />,
        isEnabled:
          !!serviceParameters?.isQuizActivated &&
          !!serviceParameters?.isTipsActivated,
      },
      {
        name: "edito",
        title: "Bloc Édito",
        content: <EditoTab />,
        isEnabled:
          !!serviceParameters?.isQuizActivated &&
          !!serviceParameters?.isTipsActivated &&
          !!serviceParameters?.isEventsActivated &&
          !!serviceParameters?.isNewsActivated &&
          !!serviceParameters?.hasFreeContentsActivated,
      },
    ];
    setTabs(tabs);
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
