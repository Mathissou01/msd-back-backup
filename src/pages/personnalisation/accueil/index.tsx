/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import {
  ComponentMsdEditorial,
  EditorialServiceEntity,
  ServiceEntity,
  useGetServicesByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import {
  extractEditoSubServiceByTypename,
  extractServiceByTypename,
} from "../../../lib/graphql-data";
import PageTitle from "../../../components/PageTitle/PageTitle";
import TabBlock, { Tab } from "../../../components/TabBlock/TabBlock";
import QuizTipsTab from "../../../components/TabBlock/QuizTipsTab/QuizTipsTab";
import RecyclingGuideTab from "../../../components/TabBlock/RecyclingGuideTab/RecyclingGuideTab";
import CommonSpinner from "../../../components/Common/CommonSpinner/CommonSpinner";

interface IServiceParameters {
  isServiceEditorialActivated: boolean;
  isQuizActivated: boolean;
  isTipsActivated: boolean;
  isServiceRecyclingGuideActivated: boolean;
}

export default function AccueilPage() {
  /* Static Data */
  const title = "Page d'accueil";
  const description =
    "Choisissez les blocs que vous souhaitez faire figurer sur la page d’accueil. Vous pouvez choisir de renommer les blocs sélectionnés et de paramétrer certains de leur contenus.";

  /* API Data */
  const contractId = "1"; // TODO: Put Contract data (ID) in STORE, maybe have hook to automatically insert ID variable in gql requests
  const { loading, error, data } = useGetServicesByContractIdQuery({
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
        }

        setServiceParameters({
          isServiceEditorialActivated:
            !!editorialServiceEntity?.attributes?.isActivated,
          isQuizActivated: !!quizSubService?.attributes?.isActivated,
          isTipsActivated: !!tipSubService?.attributes?.isActivated,
          isServiceRecyclingGuideActivated:
            !!recyclingGuideService?.attributes?.isActivated,
        });
      }
    }
  }, [data]);

  useEffect(() => {
    const tabs = [
      {
        name: "messageAndSearchEngine",
        title: "Message et moteur de recherche",
        content: <div />,
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
        content: <QuizTipsTab />,
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
        <TabBlock tabs={tabs} initialTabName={"RecyclingGuide"} />
      )}
    </>
  );
}
