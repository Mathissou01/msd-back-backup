import {
  GetActivedServicesByContractIdQuery,
  ServiceType,
} from "../graphql/codegen/generated-types";

export interface IServiceLink {
  service: string;
  serviceId: string;
  subSelection?: string;
}

export interface IServiceAvailable {
  label: string;
  value: string;
  serviceId: string;
}

export function formatFetchedServices(
  services: GetActivedServicesByContractIdQuery,
): Array<IServiceAvailable> {
  const servicesAvailable: Array<IServiceAvailable> = [];
  if (
    services.alertNotificationServices?.data &&
    services.alertNotificationServices.data[0] &&
    services.alertNotificationServices.data[0].id &&
    services.alertNotificationServices.data[0].attributes?.name
  ) {
    servicesAvailable.push({
      label: services.alertNotificationServices.data[0].attributes.name,
      value: ServiceType.Alert,
      serviceId: services.alertNotificationServices.data[0].id,
    });
  }
  if (
    services.dropOffMapServices?.data &&
    services.dropOffMapServices.data[0] &&
    services.dropOffMapServices.data[0].id &&
    services.dropOffMapServices.data[0].attributes?.name
  ) {
    servicesAvailable.push({
      label: services.dropOffMapServices.data[0].attributes.name,
      value: ServiceType.DropOffMap,
      serviceId: services.dropOffMapServices.data[0].id,
    });
  }
  if (
    services.editorialServices?.data &&
    services.editorialServices.data[0] &&
    services.editorialServices.data[0].id
  ) {
    servicesAvailable.push({
      label: "Editorial",
      value: "editorial",
      serviceId: services.editorialServices.data[0].id,
    });
  }
  if (
    services.pickUpDayServices?.data &&
    services.pickUpDayServices.data[0] &&
    services.pickUpDayServices.data[0].id &&
    services.pickUpDayServices.data[0].attributes?.name
  ) {
    servicesAvailable.push({
      label: services.pickUpDayServices.data[0].attributes.name,
      value: ServiceType.PickUpDay,
      serviceId: services.pickUpDayServices.data[0].id,
    });
  }
  if (
    services.recyclingGuideServices?.data &&
    services.recyclingGuideServices.data[0] &&
    services.recyclingGuideServices.data[0].id &&
    services.recyclingGuideServices.data[0].attributes?.name
  ) {
    servicesAvailable.push({
      label: services.recyclingGuideServices.data[0].attributes.name,
      value: ServiceType.Recycling,
      serviceId: services.recyclingGuideServices.data[0].id,
    });
  }
  if (
    services.requestServices?.data &&
    services.requestServices.data[0] &&
    services.requestServices.data[0].id &&
    services.requestServices.data[0].attributes?.name
  ) {
    servicesAvailable.push({
      label: services.requestServices.data[0].attributes.name,
      value: ServiceType.Request,
      serviceId: services.requestServices.data[0].id,
    });
  }
  return servicesAvailable;
}
