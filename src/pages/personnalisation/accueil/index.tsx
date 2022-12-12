/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  ComponentMsdEditorial,
  EditorialServiceEntity,
  ServiceEntity,
  useGetServicesActiveQuery,
} from "../../../graphql/codegen/generated-types";
import {
  extractEditoSubServiceByTypename,
  extractServiceByTypename,
} from "../../../lib/graphql-data";
import CommonSpinner from "../../../components/Common/CommonSpinner/CommonSpinner";
import PageTitle from "../../../components/PageTitle/PageTitle";
import TabBlock, { Tab } from "../../../components/TabBlock/TabBlock";
import RecyclingGuideTab from "../../../components/TabBlock/RecyclingGuideTab/RecyclingGuideTab";
import QuizAndTipsTab from "../../../components/TabBlock/QuizAndTipsTab/QuizAndTipsTab";
import WelcomeAndSearchEngineTab from "../../../components/TabBlock/WelcomeAndSearchEngineTab/WelcomeAndSearchEngineTab";

interface IServiceParameters {
  isServiceRecyclingGuideActivated: boolean;
  isServiceEditorialActivated: boolean;
  isQuizActivated: boolean;
  isTipsActivated: boolean;
  isEventsActivated: boolean;
  isNewsActivated: boolean;
  isFreeContentsActivated: boolean;
}

export default function AccueilPage() {
  /* Static Data */
  const title = "Page d'accueil";
  const description =
    "Choisissez les blocs que vous souhaitez faire figurer sur la page d’accueil. Vous pouvez choisir de renommer les blocs sélectionnés et de paramétrer certains de leur contenus.";

  /* API Data */
  const contractId = "1"; // TODO: Put Contract data (ID) in STORE, maybe have hook to automatically insert ID variable in gql requests
  const { loading, error, data } = useGetServicesActiveQuery({
    variables: { contractId },
  });

  /* Local Data */
  const [serviceParameters, setServiceParameters] =
    useState<IServiceParameters>();
  const [tabs, setTabs] = useState<Array<Tab>>([]);

  useEffect(() => {
    if (data && data.services?.data) {
      const servicesData = data.services?.data as Array<ServiceEntity>;
      if (data && data.services?.data) {
        // TODO: simplify/extract all this into function, get only "isActived"s as result ?
        let recyclingGuideService: ServiceEntity | null = null;
        let editorialServiceEntity: ServiceEntity | null = null;
        let quizSubService: EditorialServiceEntity | null = null;
        let tipSubService: EditorialServiceEntity | null = null;
        let eventSubService: EditorialServiceEntity | null = null;
        let newsSubService: EditorialServiceEntity | null = null;
        let freeContentFreeService: EditorialServiceEntity | null = null;

        recyclingGuideService = extractServiceByTypename(
          servicesData,
          "ComponentMsdRecycling",
        ) as ServiceEntity | null;
        editorialServiceEntity = extractServiceByTypename(
          servicesData,
          "ComponentMsdEditorial",
        ) as ServiceEntity | null;

        const editorialServiceInstance = editorialServiceEntity?.attributes
          ?.serviceInstance?.[0] as ComponentMsdEditorial | null;

        if (
          editorialServiceInstance?.editorialServices &&
          editorialServiceInstance.editorialServices?.data.length > 0
        ) {
          quizSubService = extractEditoSubServiceByTypename(
            editorialServiceInstance.editorialServices.data,
            "ComponentEditoQuizzesSubService",
          );
          tipSubService = extractEditoSubServiceByTypename(
            editorialServiceInstance.editorialServices.data,
            "ComponentEditoTipsSubService",
          );
          eventSubService = extractEditoSubServiceByTypename(
            editorialServiceInstance.editorialServices.data,
            "ComponentEditoEventSubService",
          );
          newsSubService = extractEditoSubServiceByTypename(
            editorialServiceInstance.editorialServices.data,
            "ComponentEditoNewsSubService",
          );
          freeContentFreeService = extractEditoSubServiceByTypename(
            editorialServiceInstance.editorialServices.data,
            "ComponentEditoFreeService",
          );
        }

        setServiceParameters({
          isServiceRecyclingGuideActivated:
            !!recyclingGuideService?.attributes?.isActivated,
          isServiceEditorialActivated:
            !!editorialServiceEntity?.attributes?.isActivated,
          isQuizActivated: !!quizSubService?.attributes?.isActivated,
          isTipsActivated: !!tipSubService?.attributes?.isActivated,
          isEventsActivated: !!eventSubService?.attributes?.isActivated,
          isNewsActivated: !!newsSubService?.attributes?.isActivated,
          isFreeContentsActivated:
            !!freeContentFreeService?.attributes?.isActivated,
        });
      }
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
        content: <div />,
        isEnabled: true,
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
        content: <div />,
        isEnabled: true,
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
