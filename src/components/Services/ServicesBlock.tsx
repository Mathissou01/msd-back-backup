import { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  ChannelTypeEntity,
  GetChannelTypeByIdDocument,
  GetContractByIdDocument,
  useCreateYwsServiceMutation,
  useDeleteYwsServiceByIdMutation,
  useGetChannelTypeByIdQuery,
  useUpdateChannelTypeByIdMutation,
  useUpdateServicesActivationMutation,
  useUpdateYwsServiceByIdMutation,
  useYwsActivationMutation,
  useYwsDeactivationMutation,
} from "../../graphql/codegen/generated-types";
import {
  IServiceFields,
  IYesWeScanServiceFields,
  ServiceType,
  parseDate,
  IServicesBlockFormValues,
} from "../../lib/services";
import { removeNulls } from "../../lib/utilities";
import { useFocusFirstElement } from "../../hooks/useFocusFirstElement";
import { useContract } from "../../hooks/useContract";
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
        serviceActivationfunction({
          variables: {
            contractId: contractId,
            serviceId: service.id,
            serviceName: service.type,
            isActivated: service.isActivated,
            startDate: format(service.startDate, "yyyy-MM-dd"),
            endDate: format(service.startDate, "yyyy-MM-dd"),
          },
          refetchQueries: [
            {
              query: GetContractByIdDocument,
              variables: { contractId },
            },
          ],
        });

      for (const service of submitData.editorialServices) {
        serviceActivationfunction({
          variables: {
            contractId: contractId,
            serviceId: service.id,
            serviceName: service.type,
            isActivated: service.isActivated,
            startDate: format(service.startDate, "yyyy-MM-dd"),
            endDate: format(service.startDate, "yyyy-MM-dd"),
          },
          refetchQueries: [
            {
              query: GetContractByIdDocument,
              variables: { contractId },
            },
          ],
        });
      }
    } else {
      for (const [index, service] of submitData.transversalServices.entries()) {
        if (
          service.id &&
          dirtyFields &&
          dirtyFields.transversalServices &&
          dirtyFields.transversalServices[index] !== undefined
        ) {
          serviceActivationfunction({
            variables: {
              contractId: contractId,
              serviceId: service.id,
              serviceName: service.type,
              isActivated: service.isActivated,
              startDate: format(service.startDate, "yyyy-MM-dd"),
              endDate: format(service.startDate, "yyyy-MM-dd"),
            },
            refetchQueries: [
              {
                query: GetContractByIdDocument,
                variables: { contractId },
              },
            ],
          });
        }
      }
      for (const [index, service] of submitData.editorialServices.entries()) {
        if (
          service.id &&
          dirtyFields &&
          dirtyFields.editorialServices &&
          dirtyFields.editorialServices[index] !== undefined
        ) {
          serviceActivationfunction({
            variables: {
              contractId: contractId,
              serviceId: service.id,
              serviceName: service.type,
              isActivated: service.isActivated,
              startDate: format(service.startDate, "yyyy-MM-dd"),
              endDate: format(service.startDate, "yyyy-MM-dd"),
            },
            refetchQueries: [
              {
                query: GetContractByIdDocument,
                variables: { contractId },
              },
            ],
          });
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
    serviceActivationfunction,
    { loading: loadingServiceActivation, error: errorServiceActivation },
  ] = useUpdateServicesActivationMutation();
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
  const [
    createYwsService,
    { loading: createYwsServiceLoading, error: createYwsServiceError },
  ] = useCreateYwsServiceMutation();
  const [
    updateYwsService,
    { loading: updateYwsServiceLoading, error: updateYwsServiceError },
  ] = useUpdateYwsServiceByIdMutation();
  const [
    deleteYwsService,
    { loading: deleteYwsServiceLoading, error: deleteYwsServiceError },
  ] = useDeleteYwsServiceByIdMutation();

  const isLoading =
    channelTypeLoading ||
    updateChannelTypeLoading ||
    ywsActivationLoading ||
    ywsDeactivationLoading ||
    createYwsServiceLoading ||
    updateYwsServiceLoading ||
    deleteYwsServiceLoading ||
    loadingServiceActivation;
  const errors = [
    channelTypeError,
    updateChannelTypeError,
    ywsActivationError,
    ywsDeactivationError,
    createYwsServiceError,
    updateYwsServiceError,
    deleteYwsServiceError,
    errorServiceActivation,
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
