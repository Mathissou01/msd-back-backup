import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AudienceEntity,
  useGetAudiencesQuery,
  useGetActiveServicesByContractIdQuery,
} from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import { isServiceActive } from "../../../../lib/contract";
import { TEditorialContentTypes } from "../../../../lib/editorial";
import { getRightsByLabel } from "../../../../lib/user";
import { useUser } from "../../../../hooks/useUser";
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
  const { loading, error, data } = useGetActiveServicesByContractIdQuery({
    variables: { contractId },
  });
  const {
    loading: loadingAudiences,
    error: errorAudiences,
    data: dataAudiences,
  } = useGetAudiencesQuery({
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
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Homepage", userRights);

  if (!userPermissions.read) router.push(`/${contractId}`);

  const [serviceParameters, setServiceParameters] =
    useState<IServiceParameters>();
  const [defaultTab, setDefaultTab] = useState<string>(
    welcomeAndSearchEngineTabName,
  );
  const [audience, setAudience] = useState<AudienceEntity>();
  const isLoading = loading || loadingAudiences;
  const errors = [error, errorAudiences];

  const tabs: Array<ITab> = [
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
      isEnabled: serviceParameters?.isServiceRecyclingGuideActivated ?? false,
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
      isEnabled: serviceParameters?.isNewsActivated ?? false,
    },
    {
      name: "quizAndTips",
      title: "Quiz & Astuces",
      content: <QuizAndTipsTab audience={audience} />,
      isEnabled: serviceParameters?.isTipsActivated ?? false,
    },
    {
      name: "edito",
      title: "Bloc Édito",
      content: (
        <EditoTab
          activatedTypes={[
            serviceParameters?.isTipsActivated
              ? ("tip" as TEditorialContentTypes)
              : null,
            serviceParameters?.isEventsActivated
              ? ("event" as TEditorialContentTypes)
              : null,
            serviceParameters?.isNewsActivated
              ? ("new" as TEditorialContentTypes)
              : null,
            serviceParameters?.hasFreeContentsActivated
              ? ("free-content" as TEditorialContentTypes)
              : null,
          ].filter(removeNulls)}
          audience={audience}
        />
      ),
      isEnabled:
        (serviceParameters?.isQuizActivated ||
          serviceParameters?.isTipsActivated ||
          serviceParameters?.isEventsActivated ||
          serviceParameters?.isNewsActivated ||
          serviceParameters?.hasFreeContentsActivated) ??
        false,
    },
  ];

  useEffect(() => {
    if (data) {
      setServiceParameters({
        isServiceRecyclingGuideActivated:
          (data.recyclingGuideServices?.data[0]?.attributes &&
            isServiceActive(data.recyclingGuideServices.data[0].attributes)) ??
          false,
        isQuizActivated:
          (data.editorialServices?.data[0]?.attributes?.quizSubService?.data
            ?.attributes &&
            isServiceActive(
              data.editorialServices?.data[0]?.attributes?.quizSubService?.data
                ?.attributes,
            )) ??
          false,
        isTipsActivated:
          (data.editorialServices?.data[0]?.attributes?.tipSubService?.data
            ?.attributes &&
            isServiceActive(
              data.editorialServices?.data[0]?.attributes?.tipSubService?.data
                ?.attributes,
            )) ??
          false,
        isEventsActivated:
          (data.editorialServices?.data[0]?.attributes?.eventSubService?.data
            ?.attributes &&
            isServiceActive(
              data.editorialServices?.data[0]?.attributes?.eventSubService?.data
                ?.attributes,
            )) ??
          false,
        isNewsActivated:
          (data.editorialServices?.data[0]?.attributes?.newsSubService?.data
            ?.attributes &&
            isServiceActive(
              data.editorialServices?.data[0]?.attributes?.newsSubService?.data
                ?.attributes,
            )) ??
          false,
        hasFreeContentsActivated:
          !!data.editorialServices?.data[0]?.attributes?.freeContentSubServices?.data.some(
            (freeContentSubService) =>
              freeContentSubService.attributes &&
              isServiceActive(freeContentSubService.attributes),
          ),
      });
    }
  }, [data]);

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
        !isLoading && (
          <span className="c-PersonnalisationAccueilPage__AudienceError">
            {audienceError}
          </span>
        )
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
