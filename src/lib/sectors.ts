import { IDefaultTableRow } from "./common-data-table";

export type Commune = {
  value: string;
  label: string;
};

export interface ISectorsTableRow extends IDefaultTableRow {
  name: string;
  description: string;
  communes?: Commune[];
  polygonData: string;
}
