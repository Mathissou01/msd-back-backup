import { removeNulls } from "./utilities";
import {
  ComponentBlocksRequestSlotsExceptions,
  Enum_Componentblocksrequestslotsexceptions_Exceptiontype,
  Enum_Requestslot_Slottype,
  RequestSlotEntity,
  Scalars,
} from "../graphql/codegen/generated-types";
import { IBlocksRequestSlotEntity } from "./dynamic-blocks";
import { TWeekDayIndexString, weekDays } from "./time";

/* Time Slots */
export type TSlotString = `${number}-${number}`;

export type TTimeSlot = {
  [Slot in TSlotString]?: {
    fixed?: number;
    dynamic?: number;
  };
};
export type TWeeklySlots = {
  [Index in TWeekDayIndexString]?: TTimeSlot;
};

export const slotTypeLabelMap: Record<
  keyof typeof Enum_Requestslot_Slottype,
  string
> = {
  Weekly: "Planning hedbomadaire",
  Personalized: "Planning personnalisé",
};

/* Display */
export interface ITimeSlotDisplay {
  slot: string;
  nbAppointments: number;
}

export interface ITimeSlotsDisplay {
  day: string;
  slots: Array<ITimeSlotDisplay>;
}

export interface IExceptionSlotDisplay {
  exceptionType: Enum_Componentblocksrequestslotsexceptions_Exceptiontype;
  slotException: {
    startDateFromQuery: string;
    startDate: string;
    endDateFromQuery: string;
    endDate: string;
    hasAppointmentSlots: boolean;
    exceptionSlots?: Array<ITimeSlotsDisplay>;
  };
}

function mapTimeSlot(
  timeSlot: Scalars["JSON"],
  index: number,
): ITimeSlotsDisplay {
  const formattedSlots = Object.entries(timeSlot).map((entry) => {
    const appointments = entry[1] as {
      fixed: number;
      dynamic: number;
    };
    const hoursStart = entry[0].substring(0, 2);
    const minutesStart = entry[0].substring(2, 4);
    const hoursEnd = entry[0].substring(5, 7);
    const minutesEnd = entry[0].substring(7, 9);
    return {
      slot: `${hoursStart}h${minutesStart} - ${hoursEnd}h${minutesEnd}`,
      nbAppointments: appointments.fixed,
    };
  });
  const dayWithIndex = weekDays.find((day) => day.index === index);

  return {
    day: dayWithIndex ? dayWithIndex.name : "",
    slots: formattedSlots,
  };
}

export function parseTimeSlots(
  timeSlots?: Scalars["JSON"],
): Array<ITimeSlotsDisplay> {
  const scalarTimeSlots: Scalars["JSON"][] = [];
  if (timeSlots) {
    const timeSlotsKeys = Object.keys(timeSlots);
    const timeSlotsValues = Object.values(timeSlots);
    timeSlotsKeys.forEach((exceptionTimeSlotsKey: string, index) => {
      scalarTimeSlots[+exceptionTimeSlotsKey] = timeSlotsValues[index];
    });
  }
  const parsedTimeSlots: Array<ITimeSlotsDisplay> = scalarTimeSlots.map(
    (parsedTimeSlots: Scalars["JSON"], index) => {
      return mapTimeSlot(parsedTimeSlots, index);
    },
  );
  // Reorder timeSlots to have Sunday as last line and not first line
  const firstTimeSlot = parsedTimeSlots.shift();
  if (firstTimeSlot) {
    parsedTimeSlots.push(firstTimeSlot);
  }
  return parsedTimeSlots;
}

export function parseSlotsExceptions(
  slotsExceptions?: Array<ComponentBlocksRequestSlotsExceptions>,
) {
  const slotExceptionsMapped: Array<IExceptionSlotDisplay> =
    slotsExceptions?.map((slotExceptionData) => {
      const exceptionTimeSlots = slotExceptionData?.slotException.timeSlots;
      const scalarTimeSlots: Scalars["JSON"][] = [];
      if (exceptionTimeSlots) {
        const exceptionTimeSlotsKeys = Object.keys(exceptionTimeSlots);
        const exceptionTimeSlotsValues = Object.values(exceptionTimeSlots);
        exceptionTimeSlotsKeys.forEach(
          (exceptionTimeSlotsKey: string, index) => {
            scalarTimeSlots[+exceptionTimeSlotsKey] =
              exceptionTimeSlotsValues[index];
          },
        );
      }
      const slots: Array<ITimeSlotsDisplay> = scalarTimeSlots.map(
        (timeSlot: Scalars["JSON"], index: number) => {
          return mapTimeSlot(timeSlot, index);
        },
      );
      // Reorder slots to have Sunday as last line and not first line
      const firstExceptionTimeSlot = slots.shift();
      if (firstExceptionTimeSlot) {
        slots.push(firstExceptionTimeSlot);
      }
      const exceptionStartDate = slotExceptionData?.slotException.startDate;
      const exceptionEndDate = slotExceptionData?.slotException.endDate;
      const data: IExceptionSlotDisplay = {
        exceptionType:
          slotExceptionData?.exceptionType ??
          Enum_Componentblocksrequestslotsexceptions_Exceptiontype.Daily,
        slotException: {
          startDateFromQuery: exceptionStartDate,
          startDate: new Date(exceptionStartDate).toLocaleDateString(
            undefined,
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            },
          ),
          endDateFromQuery: exceptionEndDate,
          endDate: new Date(exceptionEndDate).toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          hasAppointmentSlots:
            slotExceptionData?.slotException.hasAppointmentSlots,
        },
      };
      if (slots.length > 0) {
        data.slotException.exceptionSlots = slots;
      }
      return data;
    }) ?? [];
  // Reorder slotExceptionsMapped to have exceptions by startDate
  slotExceptionsMapped.sort(
    (slot1, slot2) =>
      +new Date(slot1.slotException.startDateFromQuery) -
      +new Date(slot2.slotException.endDateFromQuery),
  );
  return slotExceptionsMapped;
}

export function remapRequestSlotsToBlocks(
  data: Array<Partial<RequestSlotEntity>> | undefined,
): Array<IBlocksRequestSlotEntity> {
  if (data === undefined) return [];
  return data
    .map((requestSlot) => {
      if (requestSlot && requestSlot.__typename && requestSlot.id) {
        const mappedData: IBlocksRequestSlotEntity = {
          __typename: requestSlot.__typename,
          id: requestSlot.id,
          slotType:
            requestSlot.attributes?.slotType ??
            Enum_Requestslot_Slottype.Weekly,
          sectorizations: requestSlot.attributes?.sectorizations?.data
            .map((sector) => {
              if (sector && sector.id && sector.attributes?.name) {
                return {
                  label: sector.attributes?.name,
                  value: sector.id,
                };
              }
            })
            .filter(removeNulls),
          timeSlots: requestSlot.attributes?.timeSlots,
          slotsExceptions:
            requestSlot.attributes?.slotsExceptions?.filter(removeNulls),
          slotMessage: requestSlot.attributes?.slotMessage ?? "",
          noSlotMessage: requestSlot.attributes?.noSlotMessage ?? "",
          hasOneActivatedRequestTaked:
            requestSlot.attributes?.requestTakeds?.data &&
            requestSlot.attributes.requestTakeds.data.length > 0 &&
            requestSlot.attributes.requestTakeds.data.some(
              (requestTaked) => requestTaked.attributes?.isActivated,
            ),
        };
        return mappedData;
      }
    })
    .filter(removeNulls);
}
