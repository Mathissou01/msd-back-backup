import { GeoJSONFeature } from "ol/format/GeoJSON";
import { IDefaultTableRow } from "./common-data-table";

export type GeoJSON = {
  type: string;
  features: GeoJSONFeature[];
};

export interface ISectorPolygon {
  polygon: GeoJSON;
  handlePolygon: (polygon: GeoJSON | string) => void;
  communes: number;
}

type Commune = {
  value: number;
  label: string;
};

export interface ISectorsTableRow extends IDefaultTableRow {
  name: string;
  description: string;
  communes?: Commune[];
}
