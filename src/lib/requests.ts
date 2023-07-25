import { removeNulls } from "./utilities";
import { IBlocksRequestSlotEntity } from "./dynamic-blocks";
import { RequestSlotEntity } from "../graphql/codegen/generated-types";

export function remapRequestSlotsToBlocks(
  data: Array<RequestSlotEntity> | undefined,
): Array<IBlocksRequestSlotEntity> {
  if (data === undefined) return [];
  return data
    .map((requestSlot) => {
      if (requestSlot && requestSlot.__typename && requestSlot.id) {
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
          slotMessage: requestSlot.attributes?.slotMessage ?? "",
          noSlotMessage: requestSlot.attributes?.noSlotMessage ?? "",
        };
      }
    })
    .filter(removeNulls);
}
