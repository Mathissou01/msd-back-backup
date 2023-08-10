import {
  IBlocksRequestSlotEntity,
  IFormBlock,
} from "../../../../lib/dynamic-blocks";
import FormDynamicBlocks, {
  IFormDynamicBlocksLabels,
} from "../../../Form/FormDynamicBlocks/FormDynamicBlocks";
import "./request-appointment-slots-by-sector.scss";

export interface IRequestAppointmentSlotsBySectorLabels {
  staticTitle: string;
  dynamicSectors: IFormDynamicBlocksLabels;
}

interface IRequestAppointmentSlotsBySectorProps {
  labels: IRequestAppointmentSlotsBySectorLabels;
}

export default function RequestAppointmentSlotsBySector({
  labels,
}: IRequestAppointmentSlotsBySectorProps) {
  /* Methods */
  function isBlocksRequestSlotEntity(
    block: unknown,
  ): block is IBlocksRequestSlotEntity {
    return (
      !!block &&
      typeof block === "object" &&
      "__typename" in block &&
      block.__typename === "RequestSlotEntity"
    );
  }

  function canDeleteFunction(block: IFormBlock) {
    if (isBlocksRequestSlotEntity(block)) {
      return !block.hasOneActivatedRequestTaked;
    }
    return true;
  }

  return (
    <>
      <div className="c-RequestAppointmentSlotsBySector__Title">
        {labels.staticTitle}
      </div>
      <FormDynamicBlocks
        name={"requestSlots"}
        blockConfigurations={[
          {
            option: "RequestSlotEntity",
            props: { canDeleteCondition: canDeleteFunction },
          },
        ]}
        isSingleBlockDisplay={true}
        labels={labels.dynamicSectors}
        canReorder={false}
        canDuplicate={false}
      />
    </>
  );
}
