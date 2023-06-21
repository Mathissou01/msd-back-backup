import { CollectEntity } from "../graphql/codegen/generated-types";

export interface IDropOffMapStaticFields {
  name: string;
  phoneNumber?: string | null;
  mustKnow?: string | null;
  dropOffMapCollectTypeSelect: CollectEntity | null;
  longitude: number;
  latitude: number;
}
