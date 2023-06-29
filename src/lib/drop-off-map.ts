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
}
