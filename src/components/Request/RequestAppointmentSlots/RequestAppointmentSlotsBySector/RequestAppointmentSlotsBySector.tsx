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
  return (
    <>
      <div className="c-RequestAppointmentSlotsBySector__Title">
        {labels.staticTitle}
      </div>
      <FormDynamicBlocks
        name={"requestSlots"}
        blockConfigurations={[{ option: "RequestSlot" }]}
        isSingleBlockDisplay={true}
        labels={labels.dynamicSectors}
        canReorder={false}
        canDuplicate={false}
      />
    </>
  );
}
