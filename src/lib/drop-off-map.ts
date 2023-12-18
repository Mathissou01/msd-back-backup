import { IFormSingleMultiselectOption } from "../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import {
  ComponentBlocksOpeningDay,
  Enum_Dropoffmap_Wasteformsstatus,
} from "../graphql/codegen/generated-types";
import { IFormBlock } from "./dynamic-blocks";

export interface ICollectType {
  entityTypeName: "CollectDropOffEntity" | "CollectVoluntaryEntity";
  uniqueId: string;
  originalId: string;
  name: string;
}

export interface IDropOffMapStaticFields {
  name: string;
  dropOffMapCollectType: ICollectType;
  address?: string | null;
  longitude: number;
  latitude: number;
  phoneNumber?: string | null;
  mustKnow?: string | null;
  downloadableFiles: Array<IFormBlock>;
  openingHoursBlocks: ComponentBlocksOpeningDay[];
  audiences?: Array<IFormSingleMultiselectOption>;
  hasCustomAddress?: boolean | null;
  customAddress?: string | null;
  wasteFormsStatus: Enum_Dropoffmap_Wasteformsstatus | null | undefined;
  wasteFormsList: Array<IFormSingleMultiselectOption>;
}
