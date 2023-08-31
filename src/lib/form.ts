import { EStatus } from "./status";

export interface IFormCommonFields {
  id: string;
}

export interface IFormVersioningFields extends IFormCommonFields {
  __typename?: string;
  customId?: string;
  status: EStatus;
  createdAt?: string;
  updatedAt?: string;
  publishedDate?: Date;
  unpublishedDate?: Date;
}
