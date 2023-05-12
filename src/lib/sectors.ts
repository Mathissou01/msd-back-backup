import type { FeatureCollection } from "geojson";

export type TPolygon = FeatureCollection;

export interface ISectorPolygon {
  polygon: TPolygon;
  handlePolygon: (polygon: TPolygon) => void;
}
