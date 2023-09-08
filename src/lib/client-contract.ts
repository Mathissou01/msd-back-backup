import { InputMaybe, ServiceType } from "../graphql/codegen/generated-types";

export interface IClientFields {
  clientName: string;
  clientType: string;
  siretNumber?: number;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  isRvFrance: boolean;
  isNonExclusive: boolean;
  ccap?: number;
  clear?: number;
  isFreemium: boolean;
  servicesToActivate: Array<InputMaybe<ServiceType>> | InputMaybe<ServiceType>;
}
