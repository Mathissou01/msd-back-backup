import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AudienceEntity,
  useGetAudiencesByContractIdQuery,
  useGetServicesActiveQuery,
} from "../../../../graphql/codegen/generated-types";
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
import "./accueil.scss";

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
  const audienceError =
    "Merci d'activer au moins un usager afin de pouvoir personnaliser la page d'accueil";
  const welcomeAndSearchEngineTabName = "welcomeAndSearchEngine";

  /* Methods */
  function onAudienceSelected(index: number) {
    const newAudience = dataAudiences?.audiences?.data.find(
      (audience) => audience.id === index.toString(),
    );
    setAudience(newAudience ?? undefined);
    router.query.audience = newAudience?.attributes?.type;
    router.push({ pathname: router.pathname, query: router.query });
  }

  function onTabChanged(activeTab: string) {
    router.query.activeTab = activeTab;
    router.push({ pathname: router.pathname, query: router.query });
  }

  /* External Data */
  const { contractId } = useContract();
  const { loading, error, data } = useGetServicesActiveQuery({
    variables: { contractId },
  });
  const {
    loading: loadingAudiences,
    error: errorAudiences,
    data: dataAudiences,
  } = useGetAudiencesByContractIdQuery({
    variables: {
      filters: {
        contract: {
          id: {
            eq: contractId,
          },
        },
        isActive: {
          eq: true,
        },
      },
    },
    fetchPolicy: "network-only",
  });

  /* Local Data */
  const router = useRouter();
  const [serviceParameters, setServiceParameters] =
    useState<IServiceParameters>();
  const [tabs, setTabs] = useState<Array<ITab>>([]);
  const [defaultTab, setDefaultTab] = useState<string>(
    welcomeAndSearchEngineTabName,
  );
  const [audience, setAudience] = useState<AudienceEntity>();
  const isLoading = loading || loadingAudiences;
  const errors = [error, errorAudiences];

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
          content: <ServiceTab audience={audience} />,
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
          content: <TopContentTab audience={audience} />,
          isEnabled:
            serviceParameters.isEventsActivated &&
            serviceParameters.isNewsActivated,
        },
        {
          name: "quizAndTips",
          title: "Quiz & Astuces",
          content: <QuizAndTipsTab audience={audience} />,
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
              audience={audience}
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
  }, [serviceParameters, audience]);

  useEffect(() => {
    if (dataAudiences?.audiences?.data) {
      if (router.query.audience) {
        setAudience(
          dataAudiences.audiences.data.find(
            (audience) => audience.attributes?.type === router.query.audience,
          ),
        );
      } else {
        setAudience(dataAudiences.audiences.data[0]);
      }
    }
  }, [dataAudiences?.audiences?.data, router.query.audience]);

  useEffect(() => {
    setDefaultTab(
      (router.query.activeTab as string) ?? welcomeAndSearchEngineTabName,
    );
  }, [router.query.activeTab]);

  return (
    <>
      <PageTitle title={title} description={description} />
      {dataAudiences?.audiences?.data.length &&
      dataAudiences.audiences.data.length > 0 ? (
        <CommonLoader
          isLoading={isLoading && tabs.length > 0}
          hasDelay={false}
          errors={errors}
          isFlexGrow={false}
        >
          <div className="o-SelectWrapper c-PersonnalisationAccueilPage__AudienceWrapper">
            <select
              id={"audience"}
              className="o-SelectWrapper__Select"
              value={audience?.id ?? undefined}
              onChange={(event) => {
                const index = Number.parseInt(event.target.value);
                onAudienceSelected(index);
              }}
            >
              {dataAudiences?.audiences?.data.map((audience, index) => (
                <option key={`audience_${index}`} value={audience.id ?? 0}>
                  {audience.attributes?.type}
                </option>
              ))}
            </select>
          </div>

          <TabBlock
            tabs={tabs}
            initialTabName={defaultTab}
            onTabChanged={onTabChanged}
          />
        </CommonLoader>
      ) : (
        <span className="c-PersonnalisationAccueilPage__AudienceError">
          {audienceError}
        </span>
      )}
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
