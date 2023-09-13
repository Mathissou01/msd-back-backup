import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  ChannelTypeEntity,
  GetChannelTypeByIdDocument,
  GetContractByIdDocument,
  useCreateYwsServiceMutation,
  useDeleteYesWeScanServiceByIdMutation,
  useGetChannelTypeByIdQuery,
  useUpdateChannelTypeByIdMutation,
  useUpdateYesWeScanServiceByIdMutation,
  useYwsActivationMutation,
  useYwsDeactivationMutation,
} from "../../graphql/codegen/generated-types";
import {
  IServiceFields,
  IYesWeScanServiceFields,
  IServiceVariables,
  ServiceType,
  handleDisablingServices,
  handleUpdatingServices,
  parseDate,
  IServicesBlockFormValues,
} from "../../lib/services";
import { removeNulls } from "../../lib/utilities";
import { useFocusFirstElement } from "../../hooks/useFocusFirstElement";
import { useContract } from "../../hooks/useContract";
import { useServiceActivationMutations } from "../../hooks/useServiceActivationMutations";
import CommonLoader from "../Common/CommonLoader/CommonLoader";
import CommonButton from "../Common/CommonButton/CommonButton";
import ServiceCard from "./ServiceCard/ServiceCard";
import { YesWeScanServicesBlock } from "./YesWeScanServicesBlock/YesWeScanServicesBlock";
import "./services-block.scss";

export default function ServicesBlock() {
  /* Static Data */
  const labels = {
    channels: "Canaux",
    editorialService: "Editorial",
    website: "Site internet",
    mobileApplication: "Application mobile",
    yesWeScan: "Yes we scan",
    transversalServices: "Services transverses",
    submitButton: "Enregistrer les modifications",
    cancelButton: "Annuler les modifications",
  };
  const yesWeScanServicesName = "yesWeScanServices";

  /* Methods */
  async function onSubmitValid(submitData: FieldValues) {
    void updateChannelType({
      variables: {
        updateChannelTypeId: submitData.channelTypeId,
        data: {
          hasWebSite: submitData.hasWebSite,
          hasWebApp: submitData.hasWebApp,
        },
      },
      refetchQueries: [
        {
          query: GetChannelTypeByIdDocument,
          variables: { channelTypeId: submitData.channelTypeId },
        },
      ],
    });
    if (submitData.hasYesWeScan) {
      if (dirtyFields && dirtyFields.hasYesWeScan) {
        ywsActivation({
          variables: {
            contractId,
          },
          refetchQueries: [
            {
              query: GetChannelTypeByIdDocument,
              variables: { channelTypeId: submitData.channelTypeId },
            },
          ],
        }).then(() => {
          handleYesWeScanServicesActions(submitData);
        });
      } else {
        handleYesWeScanServicesActions(submitData);
      }
    } else if (dirtyFields && dirtyFields.hasYesWeScan) {
      void ywsDeactivation({
        variables: {
          contractId,
        },
        refetchQueries: [
          {
            query: GetChannelTypeByIdDocument,
            variables: { channelTypeId: submitData.channelTypeId },
          },
        ],
      });
      setInitialYWSServicesIds([]);
      setYesWeScanServices([]);
    }
    if (!submitData.hasWebApp && !submitData.hasWebSite) {
      for (const service of submitData.transversalServices)
        switch (service.type) {
          case ServiceType.recycling:
            await handleDisablingServices(
              updateRecyclingService,
              contractId,
              service,
            );
            break;
          case ServiceType.alert:
            await handleDisablingServices(
              updateAlertNotificationService,
              contractId,
              service,
            );
            break;
          case ServiceType.dropOffMap:
            await handleDisablingServices(
              updateDropOffMapService,
              contractId,
              service,
            );
            break;
          case ServiceType.request:
            await handleDisablingServices(
              updateRequestService,
              contractId,
              service,
            );
            break;
          case ServiceType.pickUpDay:
            await handleDisablingServices(
              updatePickUpDayService,
              contractId,
              service,
            );
            break;
        }
      for (const service of submitData.editorialServices)
        switch (service.type) {
          case ServiceType.news:
            await handleDisablingServices(
              updateNewsService,
              contractId,
              service,
            );
            break;
          case ServiceType.event:
            await handleDisablingServices(
              updateEventService,
              contractId,
              service,
            );
            break;
          case ServiceType.freeContent:
            await handleDisablingServices(
              updateFreeContentService,
              contractId,
              service,
            );
            break;
          case ServiceType.tip:
            await handleDisablingServices(
              updateTipService,
              contractId,
              service,
            );
            break;
          case ServiceType.quizz:
            await handleDisablingServices(
              updateQuizService,
              contractId,
              service,
            );
            break;
          case ServiceType.contact:
            await handleDisablingServices(
              updateContactUsService,
              contractId,
              service,
            );
            break;
        }
    } else {
      for (const [index, service] of submitData.transversalServices.entries()) {
        if (
          service.id &&
          dirtyFields &&
          dirtyFields.transversalServices &&
          dirtyFields.transversalServices[index] !== undefined
        ) {
          const variables: IServiceVariables = {
            id: service.id,
            data: {
              isActivated: service.isActivated,
              startDate:
                service.startDate && service.isActivated
                  ? format(service.startDate, "yyyy-MM-dd")
                  : null,
              endDate:
                service.endDate && service.isActivated
                  ? format(service.endDate, "yyyy-MM-dd")
                  : null,
            },
          };

          switch (service.type) {
            case ServiceType.recycling:
              await handleUpdatingServices(
                updateRecyclingService,
                contractId,
                variables,
              );
              break;
            case ServiceType.alert:
              await handleUpdatingServices(
                updateAlertNotificationService,
                contractId,
                variables,
              );
              break;
            case ServiceType.dropOffMap:
              await handleUpdatingServices(
                updateDropOffMapService,
                contractId,
                variables,
              );
              break;
            case ServiceType.request:
              await handleUpdatingServices(
                updateRequestService,
                contractId,
                variables,
              );
              break;
            case ServiceType.pickUpDay:
              await handleUpdatingServices(
                updatePickUpDayService,
                contractId,
                variables,
              );
              break;
          }
        }
      }
      for (const [index, service] of submitData.editorialServices.entries()) {
        if (
          service.id &&
          dirtyFields &&
          dirtyFields.editorialServices &&
          dirtyFields.editorialServices[index] !== undefined
        ) {
          const variables = {
            id: service.id,
            data: {
              isActivated: service.isActivated,
              startDate:
                service.startDate && service.isActivated
                  ? format(service.startDate, "yyyy-MM-dd")
                  : null,
              endDate:
                service.endDate && service.isActivated
                  ? format(service.endDate, "yyyy-MM-dd")
                  : null,
            },
          };

          switch (service.type) {
            case ServiceType.news:
              await handleUpdatingServices(
                updateNewsService,
                contractId,
                variables,
              );
              break;
            case ServiceType.event:
              await handleUpdatingServices(
                updateEventService,
                contractId,
                variables,
              );
              break;
            case ServiceType.freeContent:
              await handleUpdatingServices(
                updateFreeContentService,
                contractId,
                variables,
              );
              break;
            case ServiceType.tip:
              await handleUpdatingServices(
                updateTipService,
                contractId,
                variables,
              );
              break;
            case ServiceType.quizz:
              await handleUpdatingServices(
                updateQuizService,
                contractId,
                variables,
              );
              break;
            case ServiceType.contact:
              await handleUpdatingServices(
                updateContactUsService,
                contractId,
                variables,
              );
              break;
          }
        }
      }
    }
  }

  function onCancel() {
    reset();
    setYesWeScanServices(getValues(yesWeScanServicesName));
  }

  function onHasYesWeScanChange(toggleIsOn: boolean) {
    if (!toggleIsOn) {
      setYesWeScanServices([]);
    }
  }

  function handleYesWeScanServicesActions(submitData: FieldValues) {
    const submittedYesWeScanServices: Array<IYesWeScanServiceFields> =
      submitData["yesWeScanServices"];
    if (submittedYesWeScanServices && submittedYesWeScanServices.length > 0) {
      handleYesWeScanServicesCreation(submittedYesWeScanServices);
    }
    if (initialYWSServicesIds?.length && initialYWSServicesIds.length > 0) {
      if (submittedYesWeScanServices && submittedYesWeScanServices.length > 0) {
        handleYesWeScanServicesUpdate(submittedYesWeScanServices);
      }
      handleYesWeScanServicesDeletion(submittedYesWeScanServices);
    }
  }

  function handleYesWeScanServicesCreation(
    submittedYesWeScanServices: Array<IYesWeScanServiceFields>,
  ) {
    const newYesWeScanServices = submittedYesWeScanServices.filter(
      (submittedYesWeScanService) => {
        return !initialYWSServicesIds?.includes(submittedYesWeScanService.id);
      },
    );
    newYesWeScanServices.forEach((newYesWeScanService) => {
      if (
        newYesWeScanService.serviceName &&
        newYesWeScanService.startDate &&
        newYesWeScanService.endDate
      ) {
        void createYwsService({
          variables: {
            contractId,
            service: {
              name: newYesWeScanService.serviceName,
              startDate: format(newYesWeScanService.startDate, "yyyy-MM-dd"),
              endDate: format(newYesWeScanService.endDate, "yyyy-MM-dd"),
            },
          },
          refetchQueries: [
            {
              query: GetContractByIdDocument,
              variables: { contractId },
            },
          ],
        });
      }
    });
  }

  function handleYesWeScanServicesUpdate(
    submittedYesWeScanServices: Array<IYesWeScanServiceFields>,
  ) {
    const updatedYesWeScanServices = submittedYesWeScanServices.filter(
      (submittedYesWeScanService) => {
        return submittedYesWeScanService.id !== undefined;
      },
    );
    updatedYesWeScanServices.forEach((updatedYesWeScanService) => {
      if (
        updatedYesWeScanService.id &&
        updatedYesWeScanService.serviceName &&
        updatedYesWeScanService.startDate &&
        updatedYesWeScanService.endDate
      ) {
        void updateYwsService({
          variables: {
            updateYesWeScanServiceId: updatedYesWeScanService.id,
            data: {
              serviceName: updatedYesWeScanService.serviceName,
              startDate: updatedYesWeScanService.startDate,
              endDate: updatedYesWeScanService.endDate,
            },
          },
          refetchQueries: [
            {
              query: GetContractByIdDocument,
              variables: { contractId },
            },
          ],
        });
      }
    });
  }

  function handleYesWeScanServicesDeletion(
    submittedYesWeScanServices: Array<IYesWeScanServiceFields>,
  ) {
    initialYWSServicesIds?.forEach((initialYWSServicesId) => {
      if (
        !submittedYesWeScanServices ||
        !submittedYesWeScanServices.some((submittedYesWeScanService) => {
          return submittedYesWeScanService.id === initialYWSServicesId;
        })
      ) {
        void deleteYwsService({
          variables: {
            deleteYesWeScanServiceId: initialYWSServicesId,
          },
          refetchQueries: [
            {
              query: GetContractByIdDocument,
              variables: { contractId },
            },
          ],
        });
      }
    });
  }

  /* Local Data */
  const form = useForm<IServicesBlockFormValues>({
    mode: "onChange",
  });
  const {
    reset,
    handleSubmit,
    watch,
    getValues,
    formState: { isDirty, isValid, dirtyFields },
  } = form;

  const [channels, setChannels] = useState<ChannelTypeEntity>();
  const [transversalServices, setTransversalServices] =
    useState<Array<IServiceFields>>();
  const [editorialServices, setEditorialServices] =
    useState<Array<IServiceFields>>();
  const [visibleTransversalServices, setVisibleTransversalServices] =
    useState<boolean>(false);
  const [initialYWSServicesIds, setInitialYWSServicesIds] =
    useState<Array<string>>();
  const [yesWeScanServices, setYesWeScanServices] = useState<
    Array<IYesWeScanServiceFields>
  >([]);

  const webSiteWatch = watch("hasWebSite");
  const webAppWatch = watch("hasWebApp");

  /* External Data */
  const { contract, contractId } = useContract();
  const {
    data: channelTypeData,
    loading: channelTypeLoading,
    error: channelTypeError,
  } = useGetChannelTypeByIdQuery({
    variables: { channelTypeId: contract.attributes?.channelType?.data?.id },
  });
  const [
    updateChannelType,
    { loading: updateChannelTypeLoading, error: updateChannelTypeError },
  ] = useUpdateChannelTypeByIdMutation();
  const [
    ywsActivation,
    { loading: ywsActivationLoading, error: ywsActivationError },
  ] = useYwsActivationMutation();
  const [
    ywsDeactivation,
    { loading: ywsDeactivationLoading, error: ywsDeactivationError },
  ] = useYwsDeactivationMutation();
  const {
    mutations,
    loading: loadingMutation,
    errors: mutationErrors,
  } = useServiceActivationMutations();
  const {
    updateAlertNotificationService,
    updateDropOffMapService,
    updatePickUpDayService,
    updateRecyclingService,
    updateRequestService,
    updateEventService,
    updateFreeContentService,
    updateNewsService,
    updateQuizService,
    updateTipService,
    updateContactUsService,
  } = mutations;
  const [
    createYwsService,
    { loading: createYwsServiceLoading, error: createYwsServiceError },
  ] = useCreateYwsServiceMutation();
  const [
    updateYwsService,
    { loading: updateYwsServiceLoading, error: updateYwsServiceError },
  ] = useUpdateYesWeScanServiceByIdMutation();
  const [
    deleteYwsService,
    { loading: deleteYwsServiceLoading, error: deleteYwsServiceError },
  ] = useDeleteYesWeScanServiceByIdMutation();

  const isLoading =
    channelTypeLoading ||
    updateChannelTypeLoading ||
    loadingMutation ||
    ywsActivationLoading ||
    ywsDeactivationLoading ||
    createYwsServiceLoading ||
    updateYwsServiceLoading ||
    deleteYwsServiceLoading;
  const errors = [
    channelTypeError,
    updateChannelTypeError,
    ...mutationErrors,
    ywsActivationError,
    ywsDeactivationError,
    createYwsServiceError,
    updateYwsServiceError,
    deleteYwsServiceError,
  ];

  useEffect(() => {
    if (channelTypeData) {
      const channelType = channelTypeData.channelType?.data;
      if (channelType && channelType.id && channelType.attributes) {
        setChannels(channelType);
        if (
          channelType.attributes.hasWebSite ||
          channelType.attributes.hasWebApp
        )
          setVisibleTransversalServices(true);
      }
    }
  }, [channelTypeData]);

  useEffect(() => {
    if (contract && channels) {
      const transversalServiceList = [
        { service: "recyclingGuideService", type: ServiceType.recycling },
        { service: "dropOffMapService", type: ServiceType.dropOffMap },
        { service: "requestService", type: ServiceType.request },
        { service: "alertNotificationService", type: ServiceType.alert },
        { service: "pickUpDayService", type: ServiceType.pickUpDay },
      ];
      const editorialServiceList = [
        { service: "newsSubService", type: ServiceType.news },
        { service: "eventSubService", type: ServiceType.event },
        { service: "freeContentSubServices", type: ServiceType.freeContent },
        { service: "quizSubService", type: ServiceType.quizz },
        { service: "tipSubService", type: ServiceType.tip },
        { service: "contactUsSubService", type: ServiceType.contact },
      ];
      const newTransversalServices: Array<IServiceFields> = [];
      transversalServiceList.map((service) =>
        newTransversalServices.push({
          id: eval(`contract.attributes?.${service.service}.data.id`),
          label: eval(
            `contract.attributes?.${service.service}.data.attributes.name`,
          ),
          type: service.type,
          isActivated: eval(
            `contract.attributes?.${service.service}.data.attributes.isActivated`,
          ),
          startDate: parseDate(
            eval(
              `contract.attributes?.${service.service}.data.attributes.startDate`,
            ),
          ),
          endDate: parseDate(
            eval(
              `contract.attributes?.${service.service}.data.attributes.endDate`,
            ),
          ),
        }),
      );
      const editorialServices: Array<IServiceFields> = [];
      editorialServiceList.map((service) => {
        const editorialServicesAttributes = `contract.attributes?.editorialService?.data?.attributes`;
        const editorialData = `${editorialServicesAttributes}?.${service.service}.data`;
        if (
          eval(`${editorialServicesAttributes}.${service.service}.data`)
            .length > 1
        ) {
          const dataLength = eval(
            `${editorialServicesAttributes}.${service.service}.data`,
          ).length;
          for (let i = 0; i < dataLength; i++)
            editorialServices.push({
              id: eval(`${editorialData}[${i}].id`),
              label: eval(`${editorialData}[${i}].attributes.name`),
              type: service.type,
              isActivated: eval(
                `${editorialData}[${i}].attributes.isActivated`,
              ),
              startDate: parseDate(
                eval(`${editorialData}[${i}].attributes.startDate`),
              ),
              endDate: parseDate(
                eval(`${editorialData}[${i}].attributes.endDate`),
              ),
            });
        } else {
          editorialServices.push({
            id: eval(`${editorialData}.id`),
            label: eval(`${editorialData}.attributes.name`),
            type: service.type,
            isActivated: eval(`${editorialData}.attributes.isActivated`),
            startDate: parseDate(eval(`${editorialData}.attributes.startDate`)),
            endDate: parseDate(eval(`${editorialData}.attributes.endDate`)),
          });
        }
      });
      let activatedYesWeScanServices: Array<IYesWeScanServiceFields> = [];
      const yesWeScanServicesFromContract =
        contract.attributes?.yesWeScanServices?.data;
      if (yesWeScanServicesFromContract) {
        setInitialYWSServicesIds(
          yesWeScanServicesFromContract
            .map((yesWeScanService) => yesWeScanService.id ?? null)
            .filter(removeNulls),
        );
        activatedYesWeScanServices = yesWeScanServicesFromContract
          .map((yesWeScanService) => {
            if (yesWeScanService.id && yesWeScanService.attributes) {
              return {
                id: yesWeScanService.id,
                serviceName:
                  yesWeScanService.attributes.serviceName ?? undefined,
                startDate: yesWeScanService.attributes.startDate ?? undefined,
                endDate: yesWeScanService.attributes.endDate ?? undefined,
              };
            }
          })
          .filter(removeNulls);
        setYesWeScanServices(activatedYesWeScanServices);
      }
      reset({
        channelTypeId: channels.id,
        hasWebSite: channels.attributes?.hasWebSite,
        hasWebApp: channels.attributes?.hasWebApp,
        hasYesWeScan: channels.attributes?.hasYesWeScan,
        editorial: true,
        cgu: contract.attributes?.editorialService?.data?.attributes
          ?.cguSubService?.data?.attributes?.name,
        cookie:
          contract.attributes?.editorialService?.data?.attributes
            ?.cookiesSubService?.data?.attributes?.name,
        confidentiality:
          contract.attributes?.editorialService?.data?.attributes
            ?.confidentialitySubService?.data?.attributes?.name,
        transversalServices: newTransversalServices,
        editorialServices,
        yesWeScanServices: activatedYesWeScanServices,
      });
      setTransversalServices(newTransversalServices);
      setEditorialServices(editorialServices);
    }
  }, [contract, channels, reset]);

  useEffect(() => {
    if (webSiteWatch || webAppWatch) {
      setVisibleTransversalServices(true);
    } else if (!webSiteWatch && !webAppWatch) {
      setVisibleTransversalServices(false);
    }
  }, [webSiteWatch, webAppWatch, setVisibleTransversalServices]);

  return (
    <div className="c-ServicesBlock">
      <CommonLoader isLoading={isLoading} errors={errors} isFlexGrow={false}>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmitValid)}
            ref={useFocusFirstElement()}
          >
            <h2 className="c-ServicesBlock__Title">{labels.channels}</h2>
            <div className="c-ServicesBlock__Channels">
              {channels && (
                <>
                  <ServiceCard label={labels.website} name="hasWebSite" />
                  <ServiceCard
                    label={labels.mobileApplication}
                    name="hasWebApp"
                  />
                  <ServiceCard
                    label={labels.yesWeScan}
                    name="hasYesWeScan"
                    onChange={onHasYesWeScanChange}
                  />
                </>
              )}
            </div>
            {visibleTransversalServices && (
              <>
                {transversalServices && (
                  <>
                    <h2 className="c-ServicesBlock__Title">
                      {labels.transversalServices}
                    </h2>
                    <div className="c-ServicesBlock__Services">
                      {transversalServices.map((service, index) => (
                        <ServiceCard
                          key={index}
                          label={service.label ?? ""}
                          name={`transversalServices.${index}`}
                          hasDate
                        />
                      ))}
                      <ServiceCard
                        label={labels.editorialService}
                        name="editorial"
                        isDisabled
                      />
                    </div>
                  </>
                )}
                {editorialServices && (
                  <>
                    <h2 className="c-ServicesBlock__Title">
                      {labels.editorialService}
                    </h2>
                    <div className="c-ServicesBlock__Services">
                      {editorialServices.map((service, index) => (
                        <ServiceCard
                          key={index}
                          label={service.label ?? ""}
                          name={`editorialServices.${index}`}
                          hasDate
                        />
                      ))}
                      <ServiceCard
                        label={getValues("cgu")}
                        name="cgu"
                        isDisabled
                      />
                      <ServiceCard
                        label={getValues("cookie")}
                        name="cookie"
                        isDisabled
                      />
                      <ServiceCard
                        label={getValues("confidentiality")}
                        name="confidentiality"
                        isDisabled
                      />
                    </div>
                  </>
                )}
              </>
            )}
            <YesWeScanServicesBlock
              services={yesWeScanServices}
              setServices={setYesWeScanServices}
            />
            <div className="c-ServicesBlock__Buttons">
              <CommonButton
                type="submit"
                label={labels.submitButton}
                style="primary"
                picto="check"
                isDisabled={!isDirty || !isValid}
              />
              <CommonButton
                type="button"
                label={labels.cancelButton}
                picto="cross"
                onClick={onCancel}
                isDisabled={!isDirty}
              />
            </div>
          </form>
        </FormProvider>
      </CommonLoader>
    </div>
  );
}
