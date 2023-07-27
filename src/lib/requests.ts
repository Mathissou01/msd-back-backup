import { removeNulls } from "./utilities";
import {
  IBlocksRequestSlotEntity,
  IExceptionSlot,
  ITimeSlots,
} from "./dynamic-blocks";
import {
  Enum_Componentblocksrequestslotsexceptions_Exceptiontype,
  RequestSlotEntity,
  Scalars,
} from "../graphql/codegen/generated-types";

export const DAYS_WITH_INDEX = [
  { name: "Lundi", index: 1 },
  { name: "Mardi", index: 2 },
  { name: "Mercredi", index: 3 },
  { name: "Jeudi", index: 4 },
  { name: "Vendredi", index: 5 },
  { name: "Samedi", index: 6 },
  { name: "Dimanche", index: 0 },
];

function mapTimeSlot(timeSlot: Scalars["JSON"], index: number): ITimeSlots {
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
  const dayWithIndex = DAYS_WITH_INDEX.find((day) => day.index === index);

  return {
    day: dayWithIndex ? dayWithIndex.name : "",
    slots: formattedSlots,
  };
}

export function remapRequestSlotsToBlocks(
  data: Array<RequestSlotEntity> | undefined,
): Array<IBlocksRequestSlotEntity> {
  if (data === undefined) return [];
  return data
    .map((requestSlot) => {
      if (requestSlot && requestSlot.__typename && requestSlot.id) {
        const timeSlotsData = requestSlot.attributes?.timeSlots;
        const scalarTimeSlots: Scalars["JSON"][] = [];
        if (timeSlotsData) {
          const timeSlotsKeys = Object.keys(timeSlotsData);
          const timeSlotsValues = Object.values(timeSlotsData);
          timeSlotsKeys.forEach((exceptionTimeSlotsKey: string, index) => {
            scalarTimeSlots[+exceptionTimeSlotsKey] = timeSlotsValues[index];
          });
        }

        const timeSlots: Array<ITimeSlots> = scalarTimeSlots.map(
          (timeSlot: Scalars["JSON"], index) => {
            return mapTimeSlot(timeSlot, index);
          },
        );
        // Reorder timeSlots to have Sunday as last line and not first line
        const firstTimeSlot = timeSlots.shift();
        if (firstTimeSlot) {
          timeSlots.push(firstTimeSlot);
        }

        const slotExceptionsMapped: Array<IExceptionSlot> =
          requestSlot.attributes?.slotsExceptions?.map((slotExceptionData) => {
            const exceptionTimeSlots =
              slotExceptionData?.slotException.timeSlots;
            const scalarTimeSlots: Scalars["JSON"][] = [];
            if (exceptionTimeSlots) {
              const exceptionTimeSlotsKeys = Object.keys(exceptionTimeSlots);
              const exceptionTimeSlotsValues =
                Object.values(exceptionTimeSlots);
              exceptionTimeSlotsKeys.forEach(
                (exceptionTimeSlotsKey: string, index) => {
                  scalarTimeSlots[+exceptionTimeSlotsKey] =
                    exceptionTimeSlotsValues[index];
                },
              );
            }

            const slots: Array<ITimeSlots> = scalarTimeSlots.map(
              (timeSlot: Scalars["JSON"], index: number) => {
                return mapTimeSlot(timeSlot, index);
              },
            );

            // Reorder slots to have Sunday as last line and not first line
            const firstExceptionTimeSlot = slots.shift();
            if (firstExceptionTimeSlot) {
              slots.push(firstExceptionTimeSlot);
            }

            const exceptionStartDate =
              slotExceptionData?.slotException.startDate;
            const exceptionEndDate = slotExceptionData?.slotException.endDate;

            const data: IExceptionSlot = {
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
                endDate: new Date(exceptionEndDate).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  },
                ),
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

        return {
          __typename: requestSlot.__typename,
          id: requestSlot.id,
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
          timeSlots: timeSlots,
          slotsExceptions: slotExceptionsMapped,
          slotMessage: requestSlot.attributes?.slotMessage ?? "",
          noSlotMessage: requestSlot.attributes?.noSlotMessage ?? "",
        };
      }
    })
    .filter(removeNulls);
}
