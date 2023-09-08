import { parse } from "date-fns";
import { GetContractByIdDocument } from "../graphql/codegen/generated-types";

export interface IServiceFields {
  id?: string;
  label?: string;
  type?: ServiceType;
  isActivated?: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface IYesWeScanServiceFields {
  id?: string;
  serviceName?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface IServiceVariables {
  id: string;
  data: {
    isActivated: boolean;
    startDate: string | null;
    endDate: string | null;
  };
}

export enum ServiceType {
  "request" = "request",
  "event" = "event",
  "news" = "news",
  "tip" = "tip",
  "quizz" = "quizz",
  "freeContent" = "freeContent",
  "alert" = "alert",
  "dropOffMap" = "dropOffMap",
  "pickUpDay" = "pickUpDay",
  "mwc" = "mwc",
  "recycling" = "recycling",
  "keyMetrics" = "keyMetrics",
  "editorial" = "editorial",
  "contact" = "contact",
}

export function parseDate(date: string): Date | undefined {
  return date ? parse(date, "yyyy-MM-dd", new Date()) : undefined;
}

export async function handleDisablingServices(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any[]) => void,
  contractId: string,
  service: IServiceFields,
) {
  if (service.id && service.type)
    fn({
      variables: {
        id: service.id,
        data: {
          isActivated: false,
          startDate: null,
          endDate: null,
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

export async function handleUpdatingServices(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fn: (...args: any[]) => void,
  contractId: string,
  variables: IServiceVariables,
) {
  fn({
    variables,
    refetchQueries: [
      {
        query: GetContractByIdDocument,
        variables: { contractId },
      },
    ],
  });
}
