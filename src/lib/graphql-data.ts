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
} from "../graphql/codegen/generated-types";
import { IServiceLink, isServiceLink } from "./service-links";
import { removeNulls } from "./utilities";

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

export interface IRemappedServiceBlock {
  id: string | null;
  titleContent: string | null;
  serviceLinks: Array<IServiceLink> | null;
}

export function remapServiceLinksDynamicZone(
  data: GetServicesBlockTabQuery,
): IRemappedServiceBlock {
  const serviceBlock =
    data.contractCustomizations?.data[0].attributes?.homepage?.data?.attributes
      ?.servicesBlock?.data ?? null;
  return {
    id: serviceBlock?.id ?? null,
    titleContent: serviceBlock?.attributes?.titleContent ?? null,
    serviceLinks:
      serviceBlock?.attributes?.serviceLinks
        ?.map((link, index) => {
          if (link) {
            const type = link.__typename;
            if (type && isServiceLink(link)) {
              return {
                type,
                localId: index,
                name: link?.name,
                externalLink: link?.externalLink,
                isDisplayed: link?.isDisplayed,
                picto: link?.picto,
              };
            }
          }
        })
        .filter(removeNulls) ?? null,
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
    data.quizSubServices?.data[0].attributes?.quizzes?.data ?? null;
  const tips: Array<TipEntity> | null =
    data.tipSubServices?.data[0].attributes?.tips?.data ?? null;

  return { quizAndTipsBlock, quizzes, tips };
}

export function extractEditoBlock(data: GetEditoBlockTabQuery) {
  const editoBlock = data.getEditoBlockDTO ?? null;
  const editoContents = data.getEditoContentDTOs ?? null;

  return { editoBlock, editoContents };
}

/* Footer */
export function extractFooter(data: GetFooterPageQuery) {
  const footer =
    data.contractCustomizations?.data[0]?.attributes?.footer?.data ?? null;
  return { footer };
}
