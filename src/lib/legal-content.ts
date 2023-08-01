import { IFormBlock, TDynamicFieldConfiguration } from "./dynamic-blocks";
import { IFormCommonFields } from "./form";
import { EStatus } from "./status";

export const defaultDynamicFieldConfigurations: Array<TDynamicFieldConfiguration> =
  [
    { option: "ComponentBlocksWysiwyg" },
    { option: "ComponentBlocksSubHeading" },
    { option: "ComponentBlocksFile" },
  ];

export interface ILegalContentStaticFields extends IFormCommonFields {
  status?: EStatus;
  title: string;
  isActivated: boolean;
}

export interface ILegalContentFields extends ILegalContentStaticFields {
  blocks: Array<IFormBlock>;
}

export interface ILegalContentStaticFieldsLabels {
  staticTitle: string;
}

export interface ILegalContentFormButtonsLabels {
  preview: string;
  cancel: string;
  activate: string;
  deactivate: string;
  save: string;
}
