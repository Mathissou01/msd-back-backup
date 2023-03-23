import {
  useCreateContentTypeMutation,
  useUpdateContentTypeAccessibilityMutation,
  useUpdateContentTypeCguMutation,
  useUpdateContentTypeConfidentialityMutation,
  useUpdateContentTypeContactUsMutation,
  useUpdateContentTypeCookiesMutation,
  useUpdateContentTypeEventMutation,
  useUpdateContentTypeFreeContentMutation,
  useUpdateContentTypeNewsMutation,
  useUpdateContentTypeQuizMutation,
  useUpdateContentTypeTipMutation,
} from "../graphql/codegen/generated-types";

export const useContentTypeMutations = () => {
  // UPDATE
  const [
    updateCookies,
    {
      loading: updateCookiesMutationLoading,
      error: updateCookiesMutationError,
    },
  ] = useUpdateContentTypeCookiesMutation();
  const [
    updateAccessibility,
    {
      loading: updateAccessibilityMutationLoading,
      error: updateAccessibilityMutationError,
    },
  ] = useUpdateContentTypeAccessibilityMutation();
  const [
    updateContactUs,
    {
      loading: updateContactUsMutationLoading,
      error: updateContactUsMutationError,
    },
  ] = useUpdateContentTypeContactUsMutation();
  const [
    updateCgu,
    { loading: updateCguMutationLoading, error: updateCguMutationError },
  ] = useUpdateContentTypeCguMutation();
  const [
    updateConfidentiality,
    {
      loading: updateConfidentialityMutationLoading,
      error: updateConfidentialityMutationError,
    },
  ] = useUpdateContentTypeConfidentialityMutation();
  const [
    updateNews,
    { loading: updateNewsMutationLoading, error: updateNewsMutationError },
  ] = useUpdateContentTypeNewsMutation();
  const [
    updateTip,
    { loading: updateTipMutationLoading, error: updateTipMutationError },
  ] = useUpdateContentTypeTipMutation();
  const [
    updateQuiz,
    { loading: updateQuizMutationLoading, error: updateQuizMutationError },
  ] = useUpdateContentTypeQuizMutation();
  const [
    updateEvent,
    { loading: updateEventMutationLoading, error: updateEventMutationError },
  ] = useUpdateContentTypeEventMutation();
  const [
    updateFreeContent,
    {
      loading: updateFreeContentMutationLoading,
      error: updateFreeContentMutationError,
    },
  ] = useUpdateContentTypeFreeContentMutation();

  // CREATE
  const [
    createContentTypeMutation,
    {
      loading: createContentTypeMutationLoading,
      error: createContentTypeMutationError,
    },
  ] = useCreateContentTypeMutation();

  const loading =
    updateCookiesMutationLoading ||
    updateAccessibilityMutationLoading ||
    updateContactUsMutationLoading ||
    updateCguMutationLoading ||
    updateConfidentialityMutationLoading ||
    updateNewsMutationLoading ||
    updateTipMutationLoading ||
    updateQuizMutationLoading ||
    updateEventMutationLoading ||
    updateFreeContentMutationLoading ||
    createContentTypeMutationLoading;
  const errors = [
    updateCookiesMutationError,
    updateAccessibilityMutationError,
    updateContactUsMutationError,
    updateCguMutationError,
    updateConfidentialityMutationError,
    updateNewsMutationError,
    updateTipMutationError,
    updateQuizMutationError,
    updateEventMutationError,
    updateFreeContentMutationError,
    createContentTypeMutationError,
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
      createContentTypeMutation,
    },
    loading,
    errors,
  };
};
