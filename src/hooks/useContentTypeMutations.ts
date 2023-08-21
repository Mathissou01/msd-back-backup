import {
  useCreateContentTypeForContractIdMutation,
  useUpdateAccessibilitySubServiceByIdMutation,
  useUpdateCguSubServiceByIdMutation,
  useUpdateConfidentialitySubServiceByIdMutation,
  useUpdateContactUsSubServiceByIdMutation,
  useUpdateCookiesSubServiceByIdMutation,
  useUpdateEventSubServiceByIdMutation,
  useUpdateFreeContentSubServiceByIdMutation,
  useUpdateNewsSubServiceByIdMutation,
  useUpdateQuizSubServiceByIdMutation,
  useUpdateTipSubServiceByIdMutation,
} from "../graphql/codegen/generated-types";

export const useContentTypeMutations = () => {
  // UPDATE
  const [
    updateCookies,
    { loading: updateCookiesLoading, error: updateCookiesError },
  ] = useUpdateCookiesSubServiceByIdMutation();
  const [
    updateAccessibility,
    { loading: updateAccessibilityLoading, error: updateAccessibilityError },
  ] = useUpdateAccessibilitySubServiceByIdMutation();
  const [
    updateContactUs,
    { loading: updateContactUsLoading, error: updateContactUsError },
  ] = useUpdateContactUsSubServiceByIdMutation();
  const [updateCgu, { loading: updateCguLoading, error: updateCguError }] =
    useUpdateCguSubServiceByIdMutation();
  const [
    updateConfidentiality,
    {
      loading: updateConfidentialityLoading,
      error: updateConfidentialityError,
    },
  ] = useUpdateConfidentialitySubServiceByIdMutation();
  const [updateNews, { loading: updateNewsLoading, error: updateNewsError }] =
    useUpdateNewsSubServiceByIdMutation();
  const [updateTip, { loading: updateTipLoading, error: updateTipError }] =
    useUpdateTipSubServiceByIdMutation();
  const [updateQuiz, { loading: updateQuizLoading, error: updateQuizError }] =
    useUpdateQuizSubServiceByIdMutation();
  const [
    updateEvent,
    { loading: updateEventLoading, error: updateEventError },
  ] = useUpdateEventSubServiceByIdMutation();
  const [
    updateFreeContent,
    { loading: updateFreeContentLoading, error: updateFreeContentError },
  ] = useUpdateFreeContentSubServiceByIdMutation();

  // CREATE
  const [
    createContentType,
    { loading: createContentTypeLoading, error: createContentTypeError },
  ] = useCreateContentTypeForContractIdMutation();

  const loading =
    updateCookiesLoading ||
    updateAccessibilityLoading ||
    updateContactUsLoading ||
    updateCguLoading ||
    updateConfidentialityLoading ||
    updateNewsLoading ||
    updateTipLoading ||
    updateQuizLoading ||
    updateEventLoading ||
    updateFreeContentLoading ||
    createContentTypeLoading;
  const errors = [
    updateCookiesError,
    updateAccessibilityError,
    updateContactUsError,
    updateCguError,
    updateConfidentialityError,
    updateNewsError,
    updateTipError,
    updateQuizError,
    updateEventError,
    updateFreeContentError,
    createContentTypeError,
  ];
  return {
    mutations: {
      updateCookies,
      updateAccessibility,
      updateContactUs,
      updateCgu,
      updateConfidentiality,
      updateNews,
      updateTip,
      updateQuiz,
      updateEvent,
      updateFreeContent,
      createContentType,
    },
    loading,
    errors,
  };
};
