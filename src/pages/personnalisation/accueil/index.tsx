import React, { useEffect, useState } from "react";
import { useGetServicesActiveQuery } from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import CommonSpinner from "../../../components/Common/CommonSpinner/CommonSpinner";
import PageTitle from "../../../components/PageTitle/PageTitle";
import TabBlock, { Tab } from "../../../components/TabBlock/TabBlock";
import WelcomeAndSearchEngineTab from "../../../components/TabBlock/WelcomeAndSearchEngineTab/WelcomeAndSearchEngineTab";
import RecyclingGuideTab from "../../../components/TabBlock/RecyclingGuideTab/RecyclingGuideTab";
import QuizAndTipsTab from "../../../components/TabBlock/QuizAndTipsTab/QuizAndTipsTab";
import TopContentTab from "../../../components/TabBlock/TopContentTab/TopContentTab";
import EditoTab from "../../../components/TabBlock/EditoTab/EditoTab";

interface IServiceParameters {
  isServiceRecyclingGuideActivated: boolean;
  isServiceEditorialActivated: boolean;
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
        isServiceEditorialActivated:
          !!data.editorialServices?.data[0]?.attributes?.isActivated,
        isQuizActivated:
          !!data.editorialServices?.data[0].attributes?.quizSubService?.data
            ?.attributes?.isActivated,
        isTipsActivated:
          !!data.editorialServices?.data[0].attributes?.tipSubService?.data
            ?.attributes?.isActivated,
        isEventsActivated:
          !!data.editorialServices?.data[0].attributes?.eventSubService?.data
            ?.attributes?.isActivated,
        isNewsActivated:
          !!data.editorialServices?.data[0].attributes?.newsSubService?.data
            ?.attributes?.isActivated,
        hasFreeContentsActivated:
          !!data.editorialServices?.data[0].attributes?.freeContentSubServices?.data.some(
            (freeContentSubService) =>
              freeContentSubService.attributes?.isActivated,
          ),
      });
    }
  }, [data]);

  useEffect(() => {
    const tabs = [
      {
        name: "messageAndSearchEngine",
        title: "Message et moteur de recherche",
        content: <WelcomeAndSearchEngineTab />,
        isEnabled: true,
      },
      {
        name: "RecyclingGuide",
        title: "Guide du Tri",
        content: <RecyclingGuideTab />,
        isEnabled: !!serviceParameters?.isServiceRecyclingGuideActivated,
      },
      {
        name: "services",
        title: "Services",
        content: <div />,
        isEnabled: true,
      },
      {
        name: "keyFigures",
        title: "Chiffres clés",
        content: <div />,
        isEnabled: true,
      },
      {
        name: "headlines",
        title: "A la une",
        content: <TopContentTab />,
        isEnabled:
          !!serviceParameters?.isServiceEditorialActivated &&
          !!serviceParameters?.isEventsActivated &&
          !!serviceParameters?.isNewsActivated,
      },
      {
        name: "quizAndTips",
        title: "Quiz & Astuces",
        content: <QuizAndTipsTab />,
        isEnabled:
          !!serviceParameters?.isServiceEditorialActivated &&
          !!serviceParameters?.isQuizActivated &&
          !!serviceParameters?.isTipsActivated,
      },
      {
        name: "editoBlock",
        title: "Bloc Édito",
        content: <EditoTab />,
        isEnabled:
          !!serviceParameters?.isServiceEditorialActivated &&
          !!serviceParameters?.isQuizActivated &&
          !!serviceParameters?.isTipsActivated &&
          !!serviceParameters?.isEventsActivated &&
          !!serviceParameters?.isNewsActivated &&
          !!serviceParameters?.hasFreeContentsActivated,
      },
    ];
    setTabs(tabs);
  }, [serviceParameters]);

  if (error) return <span>{`Error ! ${error?.message}`}</span>;

  return (
    <>
      <PageTitle title={title} description={description} />
      {loading && <CommonSpinner />}
      {!loading && tabs.length > 0 && (
        <TabBlock tabs={tabs} initialTabName={"messageAndSearchEngine"} />
      )}
    </>
  );
}
