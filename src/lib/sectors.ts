import { IDefaultTableRow } from "./common-data-table";

type Commune = {
  value: number;
  label: string;
};

export interface ISectorsTableRow extends IDefaultTableRow {
  name: string;
  description: string;
  communes?: Commune[];
  polygonData: string;
}
