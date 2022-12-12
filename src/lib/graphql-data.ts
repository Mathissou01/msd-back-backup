import {
  QuizAndTipsBlockEntity,
  QuizEntity,
  TipEntity,
  ComponentMsdEditorial,
  ServiceEntity,
  ComponentEditoQuizzesSubService,
  ComponentEditoTipsSubService,
  EditorialServiceEntity,
  RecyclingGuideBlockEntity,
  EditoBlockEntity,
  EventEntity,
  ComponentEditoEventSubService,
  ComponentEditoNewsSubService,
  NewEntity,
  FreeContentEntity,
  ComponentEditoFreeService,
  GetQuizAndTipsBlockTabQuery,
  GetRecyclingBlockTabQuery,
  GetEditoBlockTabQuery,
  EditoContentEntity,
  GetTopContentTabQuery,
  TopContentBlockEntity,
  GetSearchEngineTabQuery,
  SearchEngineBlockEntity,
} from "../graphql/codegen/generated-types";

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

export function extractTopContentBlock(data: GetTopContentTabQuery) {
  const topContentBlock: TopContentBlockEntity | null =
    (data.contractCustomizations?.data[0]?.attributes?.homepage?.data
      ?.attributes?.topContentBlock?.data as TopContentBlockEntity) ?? null;
  const news: Array<NewEntity> | null =
    extractNews(data.services?.data as ServiceEntity[]) ?? null;
  const events: Array<EventEntity> | null =
    extractEvents(data.services?.data as ServiceEntity[]) ?? null;

  return { topContentBlock, news, events };
}

export function extractQuizAndTipsBlock(data: GetQuizAndTipsBlockTabQuery) {
  const quizAndTipsBlock: QuizAndTipsBlockEntity | null =
    data.contractCustomizations?.data[0]?.attributes?.homepage?.data?.attributes
      ?.quizAndTipsBlock?.data ?? null;
  const quizzes: Array<QuizEntity> | null =
    extractQuizzes(data.services?.data as ServiceEntity[]) ?? null;
  const tips: Array<TipEntity> | null =
    extractTips(data.services?.data as ServiceEntity[]) ?? null;

  return { quizAndTipsBlock, quizzes, tips };
}

/** Services **/
export function extractEditoBlockData(data: GetEditoBlockTabQuery) {
  const editoBlock: EditoBlockEntity | null =
    (data.contractCustomizations?.data[0]?.attributes?.homepage?.data
      ?.attributes?.editoBlock?.data as EditoBlockEntity) ?? null;
  const { events, news, quizzes, tips, freeContents } = extractEditoContents(
    data.services?.data as ServiceEntity[],
  );
  return { editoBlock, events, news, quizzes, tips, freeContents };
}

/** Services **/

/* Editorial Service */
export function extractServiceByTypename(
  services: Array<ServiceEntity>,
  typename: "ComponentMsdEditorial" | "ComponentMsdRecycling",
): ServiceEntity | null {
  const service = services?.find(
    (service) =>
      service.attributes?.serviceInstance?.[0]?.__typename === typename ??
      false,
  );
  return service ?? null;
}

export function extractEditoSubServiceByTypename(
  editorialService: Array<EditorialServiceEntity>,
  typename:
    | "ComponentEditoQuizzesSubService"
    | "ComponentEditoTipsSubService"
    | "ComponentEditoEventSubService"
    | "ComponentEditoNewsSubService"
    | "ComponentEditoFreeService",
): EditorialServiceEntity | null {
  const editoSubservice = editorialService?.find((editorialService) => {
    return (
      editorialService.attributes?.subServiceInstance?.[0]?.__typename ===
        typename ||
      editorialService.attributes?.subServiceFreeInstance?.[0]?.__typename ===
        typename
    );
  });

  return editoSubservice ?? null;
}

//Events
export function extractEvents(
  services: Array<ServiceEntity> | undefined,
): Array<EventEntity> | null {
  if (!services) return null;
  const service = extractServiceByTypename(services, "ComponentMsdEditorial")
    ?.attributes?.serviceInstance?.[0] as ComponentMsdEditorial;

  const eventEditorialService = service?.editorialServices?.data.find(
    (editorialService) => {
      return (
        editorialService.attributes?.subServiceInstance?.[0]?.__typename ===
        "ComponentEditoEventSubService"
      );
    },
  );

  const events: Array<EventEntity> | undefined = (
    eventEditorialService?.attributes
      ?.subServiceInstance?.[0] as ComponentEditoEventSubService
  )?.events?.data;

  return events ?? null;
}

//News
export function extractNews(
  services: Array<ServiceEntity> | undefined,
): Array<NewEntity> | null {
  if (!services) return null;
  const service = extractServiceByTypename(services, "ComponentMsdEditorial")
    ?.attributes?.serviceInstance?.[0] as ComponentMsdEditorial;

  const newsEditorialService = service?.editorialServices?.data.find(
    (editorialService) => {
      return (
        editorialService.attributes?.subServiceInstance?.[0]?.__typename ===
        "ComponentEditoNewsSubService"
      );
    },
  );

  const news: Array<NewEntity> | undefined = (
    newsEditorialService?.attributes
      ?.subServiceInstance?.[0] as ComponentEditoNewsSubService
  )?.news?.data;

  return news ?? null;
}

export function extractQuizzes(
  services: Array<ServiceEntity> | undefined,
): Array<QuizEntity> | null {
  if (!services) return null;
  const service = extractServiceByTypename(services, "ComponentMsdEditorial")
    ?.attributes?.serviceInstance?.[0] as ComponentMsdEditorial;

  const quizzEditorialService = service?.editorialServices?.data.find(
    (editorialService) => {
      return (
        editorialService.attributes?.subServiceInstance?.[0]?.__typename ===
        "ComponentEditoQuizzesSubService"
      );
    },
  );

  const quizzes: Array<QuizEntity> | undefined = (
    quizzEditorialService?.attributes
      ?.subServiceInstance?.[0] as ComponentEditoQuizzesSubService
  )?.quizzes?.data;

  return quizzes ?? null;
}

export function extractTips(
  services: Array<ServiceEntity> | undefined,
): Array<TipEntity> | null {
  if (!services) return null;
  const service = extractServiceByTypename(services, "ComponentMsdEditorial")
    ?.attributes?.serviceInstance?.[0] as ComponentMsdEditorial;

  const tipsEditorialService = service?.editorialServices?.data.find(
    (editorialService) => {
      return (
        editorialService.attributes?.subServiceInstance?.[0]?.__typename ===
        "ComponentEditoTipsSubService"
      );
    },
  );

  const tips: Array<TipEntity> | undefined = (
    tipsEditorialService?.attributes
      ?.subServiceInstance?.[0] as ComponentEditoTipsSubService
  )?.tips?.data;

  return tips ?? null;
}

export function extractFreeContents(
  services: Array<ServiceEntity> | undefined,
): Array<FreeContentEntity> | null {
  if (!services) return null;
  const service = extractServiceByTypename(services, "ComponentMsdEditorial")
    ?.attributes?.serviceInstance?.[0] as ComponentMsdEditorial;

  const freeContentsEditorialService = service?.editorialServices?.data.find(
    (editorialService) => {
      return (
        editorialService.attributes?.subServiceFreeInstance?.[0]?.__typename ===
        "ComponentEditoFreeService"
      );
    },
  );

  const freeContents: Array<FreeContentEntity> | undefined = (
    freeContentsEditorialService?.attributes
      ?.subServiceFreeInstance?.[0] as ComponentEditoFreeService
  )?.freeContents?.data;

  return freeContents ?? null;
}

export function extractEditoContents(services: Array<ServiceEntity>): {
  events: Array<EditoContentEntity> | null;
  news: Array<EditoContentEntity> | null;
  quizzes: Array<EditoContentEntity> | null;
  tips: Array<EditoContentEntity> | null;
  freeContents: Array<EditoContentEntity> | null;
} {
  const service = extractServiceByTypename(services, "ComponentMsdEditorial")
    ?.attributes?.serviceInstance?.[0] as ComponentMsdEditorial;
  if (!service)
    return {
      events: null,
      news: null,
      quizzes: null,
      tips: null,
      freeContents: null,
    };

  const events: Array<EditoContentEntity> = service.editoContents?.data.filter(
    (editoContent) => {
      return !!editoContent.attributes?.event?.data?.id;
    },
  ) as Array<EditoContentEntity>;
  const news: Array<EditoContentEntity> = service.editoContents?.data.filter(
    (editoContent) => {
      return !!editoContent.attributes?.news?.data?.id;
    },
  ) as Array<EditoContentEntity>;
  const quizzes: Array<EditoContentEntity> = service.editoContents?.data.filter(
    (editoContent) => {
      return !!editoContent.attributes?.quiz?.data?.id;
    },
  ) as Array<EditoContentEntity>;
  const tips: Array<EditoContentEntity> = service.editoContents?.data.filter(
    (editoContent) => {
      return !!editoContent.attributes?.tip?.data?.id;
    },
  ) as Array<EditoContentEntity>;
  const freeContents: Array<EditoContentEntity> =
    service.editoContents?.data.filter((editoContent) => {
      return !!editoContent.attributes?.freeContent?.data?.id;
    }) as Array<EditoContentEntity>;

  return { events, news, quizzes, tips, freeContents };
}
