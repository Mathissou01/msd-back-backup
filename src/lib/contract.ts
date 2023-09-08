export enum EContractClientTypeLabels {
  city = "Commune",
  epci = "EPCI",
  union = "Syndicat",
}

export interface IServices {
  [name: string]: {
    url?: string;
    isActivated?: boolean;
  };
}

interface IServiceActivation {
  isActivated?: boolean | null;
  startDate?: Date;
  endDate?: Date;
}

export function isServiceActive(
  service: IServiceActivation,
  withoutIsActivatedProperty?: boolean,
): boolean {
  if (service.startDate && service.endDate) {
    const currentStartDayTimestamp = new Date(
      new Date().setHours(0, 0, 0, 0),
    ).getTime();
    const currentEndDayTimestamp = new Date(
      new Date().setHours(23, 59, 59, 59),
    ).getTime();
    const startDateTimeStamp = new Date(service.startDate).getTime();
    const endDateTimeStamp = new Date(service.endDate).getTime();

    if ("isActivated" in service && service.isActivated) {
      return (
        service?.isActivated &&
        startDateTimeStamp <= currentEndDayTimestamp &&
        endDateTimeStamp >= currentStartDayTimestamp
      );
    } else if (withoutIsActivatedProperty) {
      return (
        startDateTimeStamp <= currentEndDayTimestamp &&
        endDateTimeStamp >= currentStartDayTimestamp
      );
    }
    return false;
  }
  return false;
}
