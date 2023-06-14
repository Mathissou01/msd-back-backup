import {
  CollectDropOff,
  CollectVoluntary,
} from "../graphql/codegen/generated-types";

export interface IDropOffMapStaticFields {
  name: string;
  phoneNumber?: string | null;
  mustKnow?: string | null;
  collectVoluntary: CollectVoluntary;
  collectDropOff: CollectDropOff;
  longitude: number;
  latitude: number;
}
