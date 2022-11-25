import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ComponentEditoQuizzesSubService,
  ComponentEditoTipsSubService,
  ComponentMsdEditorial,
  ServiceEntity,
  useGetServicesQuery,
} from "../../../graphql/codegen/generated-types";
import {
  extractEditoSubServiceByTypename,
  extractServiceByTypename,
} from "../../../lib/graphql-data";
import PageTitle from "../../../components/PageTitle/PageTitle";
import TabBlock, { Tab } from "../../../components/TabBlock/TabBlock";
import QuizTipsTab from "../../../components/TabBlock/QuizTipsTab/QuizTipsTab";
import CommonSpinner from "../../../components/Common/CommonSpinner/CommonSpinner";

interface IEditorialServiceParameters {
  isServiceActivated: boolean;
  isQuizActivated: boolean;
  isTipsActivated: boolean;
}

export default function AccueilPage() {
  /* Static Data */
  const title = "Page d'accueil";
  const description =
    "Choisissez les blocs que vous souhaitez faire figurer sur la page d’accueil. Vous pouvez choisir de renommer les blocs sélectionnés et de paramétrer certains de leur contenus.";

  /* API Data */
  const contractId = "1"; // TODO: Put Contract data (ID) in STORE, maybe have hook to automatically insert ID variable in gql requests
  const { loading, error, data } = useGetServicesQuery({
    variables: { contractId },
  });

  /* Local Data */
  const [servicesData, setServicesData] = useState<Array<ServiceEntity>>([]);
  const [editorialServiceParameters, setEditorialServiceParameters] =
    useState<IEditorialServiceParameters>();
  const [tabs, setTabs] = useState<Array<Tab>>([]);

  useEffect(() => {
    if (data && data.services?.data) {
      setServicesData(data.services?.data as Array<ServiceEntity>);
    }
  }, [data]);

  useEffect(() => {
    if (servicesData.length > 0) {
      const service = extractServiceByTypename(
        servicesData,
        "ComponentMsdEditorial",
      ) as ServiceEntity | null;
      const editorialService = service?.attributes
        ?.serviceInstance[0] as ComponentMsdEditorial | null;
      if (
        editorialService?.editorialServices &&
        editorialService.editorialServices?.data.length > 0
      ) {
        const quizSubService = extractEditoSubServiceByTypename(
          editorialService.editorialServices.data,
          "ComponentEditoQuizzesSubService",
        )?.attributes
          ?.subServiceInstance?.[0] as ComponentEditoQuizzesSubService | null;
        const tipSubService = extractEditoSubServiceByTypename(
          editorialService.editorialServices.data,
          "ComponentEditoTipsSubService",
        )?.attributes
          ?.subServiceInstance?.[0] as ComponentEditoTipsSubService | null;

        setEditorialServiceParameters({
          isServiceActivated: !!service?.attributes?.isActivated,
          isQuizActivated: !!quizSubService?.isActivated,
          isTipsActivated: !!tipSubService?.isActivated,
        });
      }
    }
  }, [servicesData]);

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
        content: <div />,
        isEnabled: true,
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
        title: "Quiz et Astuces",
        content: <QuizTipsTab />,
        isEnabled:
          !!editorialServiceParameters?.isServiceActivated &&
          !!editorialServiceParameters?.isQuizActivated &&
          !!editorialServiceParameters?.isTipsActivated,
      },
      {
        name: "editoBlock",
        title: "Bloc Édito",
        content: <div />,
        isEnabled: true,
      },
    ];
    setTabs(tabs);
  }, [editorialServiceParameters]);

  if (error) return <span>{`Error ! ${error?.message}`}</span>;

  return (
    <>
      {
        // TODO: Move breadcrumbs to separate component
      }
      <nav className="o-Breadcrumbs" data-testid="breadcrumbs">
        <ol>
          <li>
            <Link href={"/"}>{"Accueil"}</Link>
          </li>
          <li>
            <Link href={"/"}>{"Personnalisation"}</Link>
          </li>
          <li>
            <Link href={"/"}>{"Page d'accueil"}</Link>
          </li>
        </ol>
      </nav>
      <PageTitle title={title} description={description} />
      {loading && <CommonSpinner />}
      {!loading && tabs.length > 0 && (
        <TabBlock tabs={tabs} initialTabName={"quizAndTips"} />
      )}
    </>
  );
}
