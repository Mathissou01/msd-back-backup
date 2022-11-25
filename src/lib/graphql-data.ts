import {
  GetQuizAndTipsBlockQuery,
  QuizAndTipsBlockEntity,
  QuizEntity,
  TipEntity,
  ComponentMsdEditorial,
  ServiceEntity,
  ComponentEditoQuizzesSubService,
  ComponentEditoTipsSubService,
  EditorialServiceEntity,
} from "../graphql/codegen/generated-types";

/* Homepage */

export function extractQuizAndTipsBlock(data: GetQuizAndTipsBlockQuery) {
  const quizAndTipsBlock: QuizAndTipsBlockEntity | null =
    data.contractCustomizations?.data[0].attributes?.homepage?.data?.attributes
      ?.quizAndTipsBlock?.data ?? null;
  const quizzes: Array<QuizEntity> | null =
    extractQuizzes(data.services?.data as ServiceEntity[]) ?? null;
  const tips: Array<TipEntity> | null =
    extractTips(data.services?.data as ServiceEntity[]) ?? null;

  return { quizAndTipsBlock, quizzes, tips };
}

/** Services **/

/* Editorial Service */
export function extractServiceByTypename(
  services: Array<ServiceEntity>,
  typename: "ComponentMsdEditorial",
): ServiceEntity | null {
  const service = services?.find(
    (service) =>
      service.attributes?.serviceInstance[0]?.__typename === typename ?? false,
  );
  return service ?? null;
}

export function extractEditoSubServiceByTypename(
  editorialService: Array<EditorialServiceEntity>,
  typename: "ComponentEditoQuizzesSubService" | "ComponentEditoTipsSubService",
): EditorialServiceEntity | null {
  const editoSubservice = editorialService?.find((editorialService) => {
    return (
      editorialService.attributes?.subServiceInstance?.[0]?.__typename ===
      typename
    );
  });

  return editoSubservice ?? null;
}

export function extractQuizzes(
  services: Array<ServiceEntity> | undefined,
): Array<QuizEntity> | null {
  if (!services) return null;
  const service = extractServiceByTypename(services, "ComponentMsdEditorial")
    ?.attributes?.serviceInstance[0] as ComponentMsdEditorial;

  const quizEditorialService = service.editorialServices?.data.find(
    (editorialService) => {
      return (
        editorialService.attributes?.subServiceInstance?.[0]?.__typename ===
        "ComponentEditoQuizzesSubService"
      );
    },
  );

  const quizzes: Array<QuizEntity> | undefined = (
    quizEditorialService?.attributes
      ?.subServiceInstance?.[0] as ComponentEditoQuizzesSubService
  ).quizzes?.data;

  return quizzes ?? null;
}

export function extractTips(
  services: Array<ServiceEntity> | undefined,
): Array<TipEntity> | null {
  if (!services) return null;
  const service = extractServiceByTypename(services, "ComponentMsdEditorial")
    ?.attributes?.serviceInstance[0] as ComponentMsdEditorial;

  const tipsEditorialService = service.editorialServices?.data.find(
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
  ).tips?.data;

  return tips ?? null;
}
