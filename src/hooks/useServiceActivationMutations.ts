import {
  useUpdateContactUsServiceByIdMutation,
  useUpdateAlertNotificationServiceByIdMutation,
  useUpdateDropOffMapServiceByIdMutation,
  useUpdateEventServiceByIdMutation,
  useUpdateFreeContentServiceByIdMutation,
  useUpdateNewsServiceByIdMutation,
  useUpdatePickUpDayServiceByIdMutation,
  useUpdateQuizServiceByIdMutation,
  useUpdateRecyclingGuideServiceByIdMutation,
  useUpdateRequestServiceByIdMutation,
  useUpdateTipServiceByIdMutation,
} from "../graphql/codegen/generated-types";

export const useServiceActivationMutations = () => {
  // UPDATE
  const [
    updateRecyclingService,
    {
      loading: updateRecyclingServiceLoading,
      error: updateRecyclingServiceError,
    },
  ] = useUpdateRecyclingGuideServiceByIdMutation();
  const [
    updateAlertNotificationService,
    {
      loading: updateAlertNotificationServiceLoading,
      error: updateAlertNotificationServiceError,
    },
  ] = useUpdateAlertNotificationServiceByIdMutation();
  const [
    updateRequestService,
    { loading: updateRequestServiceLoading, error: updateRequestServiceError },
  ] = useUpdateRequestServiceByIdMutation();
  const [
    updateDropOffMapService,
    {
      loading: updateDropOffMapServiceLoading,
      error: updateDropOffMapServiceError,
    },
  ] = useUpdateDropOffMapServiceByIdMutation();
  const [
    updatePickUpDayService,
    {
      loading: updatePickUpDayServiceLoading,
      error: updatePickUpDayServiceError,
    },
  ] = useUpdatePickUpDayServiceByIdMutation();

  const [
    updateNewsService,
    { loading: updateNewsServiceLoading, error: updateNewsServiceError },
  ] = useUpdateNewsServiceByIdMutation();

  const [
    updateEventService,
    { loading: updateEventServiceLoading, error: updateEventServiceError },
  ] = useUpdateEventServiceByIdMutation();

  const [
    updateTipService,
    { loading: updateTipServiceLoading, error: updateTipServiceError },
  ] = useUpdateTipServiceByIdMutation();

  const [
    updateQuizService,
    { loading: updateQuizServiceLoading, error: updateQuizServiceError },
  ] = useUpdateQuizServiceByIdMutation();

  const [
    updateFreeContentService,
    {
      loading: updateFreeContentServiceLoading,
      error: updateFreeContentServiceError,
    },
  ] = useUpdateFreeContentServiceByIdMutation();

  const [
    updateContactUsService,
    {
      loading: updateContactUsServiceLoading,
      error: updateContactUsServiceError,
    },
  ] = useUpdateContactUsServiceByIdMutation();

  const loading =
    updateRecyclingServiceLoading ||
    updateAlertNotificationServiceLoading ||
    updateRequestServiceLoading ||
    updateDropOffMapServiceLoading ||
    updatePickUpDayServiceLoading ||
    updateNewsServiceLoading ||
    updateEventServiceLoading ||
    updateTipServiceLoading ||
    updateQuizServiceLoading ||
    updateFreeContentServiceLoading ||
    updateContactUsServiceLoading;
  const errors = [
    updateRecyclingServiceError,
    updateAlertNotificationServiceError,
    updateRequestServiceError,
    updateDropOffMapServiceError,
    updatePickUpDayServiceError,
    updateNewsServiceError,
    updateEventServiceError,
    updateTipServiceError,
    updateQuizServiceError,
    updateFreeContentServiceError,
    updateContactUsServiceError,
  ];
  return {
    mutations: {
      updateRecyclingService,
      updateAlertNotificationService,
      updateRequestService,
      updateDropOffMapService,
      updatePickUpDayService,
      updateNewsService,
      updateEventService,
      updateTipService,
      updateQuizService,
      updateFreeContentService,
      updateContactUsService,
    },
    loading,
    errors,
  };
};
