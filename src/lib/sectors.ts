import { GeoJSONFeature } from "ol/format/GeoJSON";

export type GeoJSON = {
  type: string;
  features: GeoJSONFeature[];
};

export interface ISectorPolygon {
  polygon: GeoJSON;
  handlePolygon: (polygon: GeoJSON | string) => void;
  communes: number;
}
