import {
  GetEditoBlockTabQuery,
  GetFooterPageQuery,
  GetMenuPageQuery,
  GetQuizAndTipsBlockTabQuery,
  GetRecyclingBlockTabQuery,
  GetSearchEngineTabQuery,
  GetServicesBlockTabQuery,
  GetTopContentTabQuery,
  QuizAndTipsBlockEntity,
  QuizEntity,
  RecyclingGuideBlockEntity,
  SearchEngineBlockEntity,
  TipEntity,
  GetAllFoldersHierarchyQuery,
} from "../graphql/codegen/generated-types";
import { IServiceLink, remapServiceLinksDynamicZone } from "./service-links";

/* Menu */
export function extractMenu(data: GetMenuPageQuery) {
  return data.contract?.data?.attributes?.contractMenu?.data ?? null;
}

/* Homepage */
export function extractSearchEngineBlock(data: GetSearchEngineTabQuery) {
  const searchEngineBlock: SearchEngineBlockEntity | null =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.searchEngineBlock?.data ?? null;

  return { searchEngineBlock };
}

export function extractRecyclingGuideBlock(data: GetRecyclingBlockTabQuery) {
  const recyclingGuideBlock: RecyclingGuideBlockEntity | null =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.recyclingGuideBlock?.data ?? null;

  return { recyclingGuideBlock };
}

export function extractServicesBlock(data: GetServicesBlockTabQuery) {
  const serviceBlock =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.servicesBlock?.data ?? null;
  const serviceLinks: Array<IServiceLink> | null = remapServiceLinksDynamicZone(
    serviceBlock?.attributes?.serviceLinks ?? null,
  );

  return {
    id: serviceBlock?.id ?? null,
    titleContent: serviceBlock?.attributes?.titleContent ?? null,
    serviceLinks,
  };
}

export function extractTopContentBlock(data: GetTopContentTabQuery) {
  const topContentBlock = data.getTopContentBlockDTO ?? null;
  const topContents = data.getTopContentDTOs ?? null;

  return { topContentBlock, topContents };
}

export function extractQuizAndTipsBlock(data: GetQuizAndTipsBlockTabQuery) {
  const quizAndTipsBlock: QuizAndTipsBlockEntity | null =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.quizAndTipsBlock?.data ?? null;
  const quizzes: Array<QuizEntity> | null =
    data.quizSubServices?.data[0]?.attributes?.quizzes?.data ?? null;
  const tips: Array<TipEntity> | null =
    data.tipSubServices?.data[0]?.attributes?.tips?.data ?? null;

  return { quizAndTipsBlock, quizzes, tips };
}

export function extractEditoBlock(data: GetEditoBlockTabQuery) {
  const editoBlock = data.getEditoBlockDTO ?? null;
  const editoContents = data.getEditoContentDTOs ?? null;

  return { editoBlock, editoContents };
}

/* Edito */
export function extractFoldersHierarchy(data: GetAllFoldersHierarchyQuery) {
  const folderHierarchy = data.getAllFoldersHierarchy ?? null;
  // const pathFolder = data.getAllFoldersHierarchy[0]?.path ?? null;
  return folderHierarchy;
}

/* Footer */
export function extractFooter(data: GetFooterPageQuery) {
  const footer =
    data.contractCustomizations?.data[0]?.attributes?.footer?.data ?? null;
  return { footer };
}
