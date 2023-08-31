import {
  GetEditoBlockTabByContractIdAndAudienceIdQuery,
  GetFooterByContractIdQuery,
  GetContractMenuByContractIdQuery,
  GetQuizAndTipsBlockTabByContractIdAndAudienceIdQuery,
  GetRecyclingGuideBlockByContractIdQuery,
  GetWelcomeMessageAndSearchEngineBlocksByContractIdQuery,
  GetServicesBlocksByContractIdAndAudienceIdQuery,
  GetTopContentBlockTabByContractIdAndAudienceIdQuery,
  QuizAndTipsBlockEntity,
  QuizEntity,
  RecyclingGuideBlockEntity,
  SearchEngineBlockEntity,
  TipEntity,
  WelcomeMessageBlockEntity,
} from "../graphql/codegen/generated-types";
import {
  IServiceLink,
  remapServicesLinkDynamicZonePicto,
} from "./service-links";

/* Menu */
export function extractMenu(data: GetContractMenuByContractIdQuery) {
  return data.contract?.data?.attributes?.contractMenu?.data ?? null;
}

/* Homepage */
export function extractWelcomeMessageBlock(
  data: GetWelcomeMessageAndSearchEngineBlocksByContractIdQuery,
) {
  const welcomeMessageBlock: WelcomeMessageBlockEntity | null =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.welcomeMessageBlock?.data ?? null;

  return { welcomeMessageBlock };
}

export function extractSearchEngineBlock(
  data: GetWelcomeMessageAndSearchEngineBlocksByContractIdQuery,
) {
  const searchEngineBlock: SearchEngineBlockEntity | null =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.searchEngineBlock?.data ?? null;

  return { searchEngineBlock };
}

export function extractRecyclingGuideBlock(
  data: GetRecyclingGuideBlockByContractIdQuery,
) {
  const recyclingGuideBlock: RecyclingGuideBlockEntity | null =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.recyclingGuideBlock?.data ?? null;

  return { recyclingGuideBlock };
}

export function extractServicesBlock(
  data: GetServicesBlocksByContractIdAndAudienceIdQuery,
) {
  const serviceBlock =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.servicesBlocks?.data[0] ?? null;
  const serviceLinks: Array<IServiceLink> | null =
    remapServicesLinkDynamicZonePicto(
      serviceBlock?.attributes?.serviceLinks ?? null,
    );

  return {
    id: serviceBlock?.id ?? null,
    titleContent: serviceBlock?.attributes?.titleContent ?? null,
    serviceLinks,
  };
}

export function extractTopContentBlock(
  data: GetTopContentBlockTabByContractIdAndAudienceIdQuery,
) {
  const topContentBlock = data.getTopContentBlockDTO ?? null;
  const topContents = data.getTopContentDTOs ?? null;

  return { topContentBlock, topContents };
}

export function extractQuizAndTipsBlock(
  data: GetQuizAndTipsBlockTabByContractIdAndAudienceIdQuery,
) {
  const quizAndTipsBlock: QuizAndTipsBlockEntity | null =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.quizAndTipsBlocks?.data[0] ?? null;
  const quizzes: Array<QuizEntity> | null =
    data.quizSubServices?.data[0]?.attributes?.quizzes?.data ?? null;
  const tips: Array<TipEntity> | null =
    data.tipSubServices?.data[0]?.attributes?.tips?.data ?? null;

  return { quizAndTipsBlock, quizzes, tips };
}

export function extractEditoBlock(
  data: GetEditoBlockTabByContractIdAndAudienceIdQuery,
) {
  const editoBlock = data.getEditoBlockDTO ?? null;
  const editoContents = data.getEditoContentDTOs ?? null;

  return { editoBlock, editoContents };
}

/* Footer */
export function extractFooter(data: GetFooterByContractIdQuery) {
  const footer =
    data.contractCustomizations?.data[0]?.attributes?.footer?.data ?? null;
  return { footer };
}
