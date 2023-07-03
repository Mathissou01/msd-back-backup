/* eslint-disable */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AccessibilityBlocksDynamicZoneInput: any;
  CguBlocksDynamicZoneInput: any;
  ConfidentialityBlocksDynamicZoneInput: any;
  ContactUsBlocksDynamicZoneInput: any;
  ContractMenuServiceLinksDynamicZoneInput: any;
  CookieBlocksDynamicZoneInput: any;
  Date: any;
  DateTime: any;
  DropOffMapOpeningHoursBlocksDynamicZoneInput: any;
  EditoBlockEditoContentsDynamicZoneInput: any;
  EventBlocksDynamicZoneInput: any;
  EventLinkToServicesDynamicZoneInput: any;
  FreeContentBlocksDynamicZoneInput: any;
  FreeContentLinkToServicesDynamicZoneInput: any;
  JSON: any;
  Long: any;
  MwcFlowBlocksDynamicZoneInput: any;
  NewBlocksDynamicZoneInput: any;
  NewLinkToServicesDynamicZoneInput: any;
  RequestAddableBlocksDynamicZoneInput: any;
  ServicesBlockServiceLinksDynamicZoneInput: any;
  Time: any;
  TipBlocksDynamicZoneInput: any;
  TipLinkToServicesDynamicZoneInput: any;
  TopContentBlockTopContentDynamicZoneInput: any;
  Upload: any;
  WasteFormContentBlockDynamicZoneInput: any;
};

export type Accessibility = {
  __typename?: "Accessibility";
  blocks?: Maybe<Array<Maybe<AccessibilityBlocksDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  status?: Maybe<Enum_Accessibility_Status>;
  title: Scalars["String"];
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type AccessibilityBlocksDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksSubHeading
  | ComponentBlocksWysiwyg
  | Error;

export type AccessibilityEntity = {
  __typename?: "AccessibilityEntity";
  attributes?: Maybe<Accessibility>;
  id?: Maybe<Scalars["ID"]>;
};

export type AccessibilityEntityResponse = {
  __typename?: "AccessibilityEntityResponse";
  data?: Maybe<AccessibilityEntity>;
};

export type AccessibilityEntityResponseCollection = {
  __typename?: "AccessibilityEntityResponseCollection";
  data: Array<AccessibilityEntity>;
  meta: ResponseCollectionMeta;
};

export type AccessibilityFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<AccessibilityFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AccessibilityFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AccessibilityFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type AccessibilityInput = {
  blocks?: InputMaybe<Array<Scalars["AccessibilityBlocksDynamicZoneInput"]>>;
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  status?: InputMaybe<Enum_Accessibility_Status>;
  title?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type AccessibilityRelationResponseCollection = {
  __typename?: "AccessibilityRelationResponseCollection";
  data: Array<AccessibilityEntity>;
};

export type AccessibilitySubService = {
  __typename?: "AccessibilitySubService";
  accessibilities?: Maybe<AccessibilityRelationResponseCollection>;
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  link?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AccessibilitySubServiceAccessibilitiesArgs = {
  filters?: InputMaybe<AccessibilityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AccessibilitySubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AccessibilitySubServiceEntity = {
  __typename?: "AccessibilitySubServiceEntity";
  attributes?: Maybe<AccessibilitySubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type AccessibilitySubServiceEntityResponse = {
  __typename?: "AccessibilitySubServiceEntityResponse";
  data?: Maybe<AccessibilitySubServiceEntity>;
};

export type AccessibilitySubServiceEntityResponseCollection = {
  __typename?: "AccessibilitySubServiceEntityResponseCollection";
  data: Array<AccessibilitySubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type AccessibilitySubServiceFiltersInput = {
  accessibilities?: InputMaybe<AccessibilityFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<AccessibilitySubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<AccessibilitySubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AccessibilitySubServiceFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AccessibilitySubServiceInput = {
  accessibilities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  link?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Activation = {
  __typename?: "Activation";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  typeActivation?: Maybe<Scalars["String"]>;
};

export type ActivationAndService = Activation | Service;

export type AlertNotification = {
  __typename?: "AlertNotification";
  alertDescription: Scalars["String"];
  alertMessage?: Maybe<Scalars["String"]>;
  alertNotifService?: Maybe<AlertNotificationServiceEntityResponse>;
  alertTitle?: Maybe<Scalars["String"]>;
  cities?: Maybe<CityRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  scheduledAt: Scalars["Date"];
  sectorizations?: Maybe<SectorizationRelationResponseCollection>;
  sendMail?: Maybe<Scalars["Boolean"]>;
  sendSMS?: Maybe<Scalars["Boolean"]>;
  subject?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AlertNotificationCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AlertNotificationSectorizationsArgs = {
  filters?: InputMaybe<SectorizationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AlertNotificationEntity = {
  __typename?: "AlertNotificationEntity";
  attributes?: Maybe<AlertNotification>;
  id?: Maybe<Scalars["ID"]>;
};

export type AlertNotificationEntityResponse = {
  __typename?: "AlertNotificationEntityResponse";
  data?: Maybe<AlertNotificationEntity>;
};

export type AlertNotificationEntityResponseCollection = {
  __typename?: "AlertNotificationEntityResponseCollection";
  data: Array<AlertNotificationEntity>;
  meta: ResponseCollectionMeta;
};

export type AlertNotificationFiltersInput = {
  alertDescription?: InputMaybe<StringFilterInput>;
  alertMessage?: InputMaybe<StringFilterInput>;
  alertNotifService?: InputMaybe<AlertNotificationServiceFiltersInput>;
  alertTitle?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<AlertNotificationFiltersInput>>>;
  cities?: InputMaybe<CityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AlertNotificationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AlertNotificationFiltersInput>>>;
  scheduledAt?: InputMaybe<DateFilterInput>;
  sectorizations?: InputMaybe<SectorizationFiltersInput>;
  sendMail?: InputMaybe<BooleanFilterInput>;
  sendSMS?: InputMaybe<BooleanFilterInput>;
  subject?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AlertNotificationInput = {
  alertDescription?: InputMaybe<Scalars["String"]>;
  alertMessage?: InputMaybe<Scalars["String"]>;
  alertNotifService?: InputMaybe<Scalars["ID"]>;
  alertTitle?: InputMaybe<Scalars["String"]>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  scheduledAt?: InputMaybe<Scalars["Date"]>;
  sectorizations?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  sendMail?: InputMaybe<Scalars["Boolean"]>;
  sendSMS?: InputMaybe<Scalars["Boolean"]>;
  subject?: InputMaybe<Scalars["String"]>;
};

export type AlertNotificationRelationResponseCollection = {
  __typename?: "AlertNotificationRelationResponseCollection";
  data: Array<AlertNotificationEntity>;
};

export type AlertNotificationService = {
  __typename?: "AlertNotificationService";
  alertNotifications?: Maybe<AlertNotificationRelationResponseCollection>;
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AlertNotificationServiceAlertNotificationsArgs = {
  filters?: InputMaybe<AlertNotificationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AlertNotificationServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AlertNotificationServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type AlertNotificationServiceEntity = {
  __typename?: "AlertNotificationServiceEntity";
  attributes?: Maybe<AlertNotificationService>;
  id?: Maybe<Scalars["ID"]>;
};

export type AlertNotificationServiceEntityResponse = {
  __typename?: "AlertNotificationServiceEntityResponse";
  data?: Maybe<AlertNotificationServiceEntity>;
};

export type AlertNotificationServiceEntityResponseCollection = {
  __typename?: "AlertNotificationServiceEntityResponseCollection";
  data: Array<AlertNotificationServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type AlertNotificationServiceFiltersInput = {
  alertNotifications?: InputMaybe<AlertNotificationFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<AlertNotificationServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<AlertNotificationServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AlertNotificationServiceFiltersInput>>>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AlertNotificationServiceInput = {
  alertNotifications?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type AudienceType = {
  __typename?: "AudienceType";
  MwCounter?: Maybe<MwCounterServiceEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  type?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AudienceTypeEntity = {
  __typename?: "AudienceTypeEntity";
  attributes?: Maybe<AudienceType>;
  id?: Maybe<Scalars["ID"]>;
};

export type AudienceTypeEntityResponse = {
  __typename?: "AudienceTypeEntityResponse";
  data?: Maybe<AudienceTypeEntity>;
};

export type AudienceTypeEntityResponseCollection = {
  __typename?: "AudienceTypeEntityResponseCollection";
  data: Array<AudienceTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type AudienceTypeFiltersInput = {
  MwCounter?: InputMaybe<MwCounterServiceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<AudienceTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AudienceTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AudienceTypeFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AudienceTypeInput = {
  MwCounter?: InputMaybe<Scalars["ID"]>;
  type?: InputMaybe<Scalars["String"]>;
};

export type AudienceTypeRelationResponseCollection = {
  __typename?: "AudienceTypeRelationResponseCollection";
  data: Array<AudienceTypeEntity>;
};

export type BooleanFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  contains?: InputMaybe<Scalars["Boolean"]>;
  containsi?: InputMaybe<Scalars["Boolean"]>;
  endsWith?: InputMaybe<Scalars["Boolean"]>;
  eq?: InputMaybe<Scalars["Boolean"]>;
  eqi?: InputMaybe<Scalars["Boolean"]>;
  gt?: InputMaybe<Scalars["Boolean"]>;
  gte?: InputMaybe<Scalars["Boolean"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  lt?: InputMaybe<Scalars["Boolean"]>;
  lte?: InputMaybe<Scalars["Boolean"]>;
  ne?: InputMaybe<Scalars["Boolean"]>;
  not?: InputMaybe<BooleanFilterInput>;
  notContains?: InputMaybe<Scalars["Boolean"]>;
  notContainsi?: InputMaybe<Scalars["Boolean"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Boolean"]>>>;
  startsWith?: InputMaybe<Scalars["Boolean"]>;
};

export type Cgu = {
  __typename?: "Cgu";
  blocks?: Maybe<Array<Maybe<CguBlocksDynamicZone>>>;
  cguSubService?: Maybe<CguSubServiceEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  status?: Maybe<Enum_Cgu_Status>;
  title: Scalars["String"];
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type CguBlocksDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksSubHeading
  | ComponentBlocksWysiwyg
  | Error;

export type CguEntity = {
  __typename?: "CguEntity";
  attributes?: Maybe<Cgu>;
  id?: Maybe<Scalars["ID"]>;
};

export type CguEntityResponse = {
  __typename?: "CguEntityResponse";
  data?: Maybe<CguEntity>;
};

export type CguEntityResponseCollection = {
  __typename?: "CguEntityResponseCollection";
  data: Array<CguEntity>;
  meta: ResponseCollectionMeta;
};

export type CguFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CguFiltersInput>>>;
  cguSubService?: InputMaybe<CguSubServiceFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CguFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CguFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type CguInput = {
  blocks?: InputMaybe<Array<Scalars["CguBlocksDynamicZoneInput"]>>;
  cguSubService?: InputMaybe<Scalars["ID"]>;
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  status?: InputMaybe<Enum_Cgu_Status>;
  title?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type CguRelationResponseCollection = {
  __typename?: "CguRelationResponseCollection";
  data: Array<CguEntity>;
};

export type CguSubService = {
  __typename?: "CguSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cgus?: Maybe<CguRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  link?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CguSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CguSubServiceCgusArgs = {
  filters?: InputMaybe<CguFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CguSubServiceEntity = {
  __typename?: "CguSubServiceEntity";
  attributes?: Maybe<CguSubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type CguSubServiceEntityResponse = {
  __typename?: "CguSubServiceEntityResponse";
  data?: Maybe<CguSubServiceEntity>;
};

export type CguSubServiceEntityResponseCollection = {
  __typename?: "CguSubServiceEntityResponseCollection";
  data: Array<CguSubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type CguSubServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CguSubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cgus?: InputMaybe<CguFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CguSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CguSubServiceFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CguSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cgus?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  link?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type ChannelType = {
  __typename?: "ChannelType";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  hasWebApp?: Maybe<Scalars["Boolean"]>;
  hasWebSite?: Maybe<Scalars["Boolean"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ChannelTypeEntity = {
  __typename?: "ChannelTypeEntity";
  attributes?: Maybe<ChannelType>;
  id?: Maybe<Scalars["ID"]>;
};

export type ChannelTypeEntityResponse = {
  __typename?: "ChannelTypeEntityResponse";
  data?: Maybe<ChannelTypeEntity>;
};

export type ChannelTypeEntityResponseCollection = {
  __typename?: "ChannelTypeEntityResponseCollection";
  data: Array<ChannelTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type ChannelTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ChannelTypeFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  hasWebApp?: InputMaybe<BooleanFilterInput>;
  hasWebSite?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ChannelTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChannelTypeFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ChannelTypeInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  hasWebApp?: InputMaybe<Scalars["Boolean"]>;
  hasWebSite?: InputMaybe<Scalars["Boolean"]>;
};

export type ChannelTypeRelationResponseCollection = {
  __typename?: "ChannelTypeRelationResponseCollection";
  data: Array<ChannelTypeEntity>;
};

export type City = {
  __typename?: "City";
  MwCounter?: Maybe<MwCounterServiceEntityResponse>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  department?: Maybe<Scalars["String"]>;
  epci?: Maybe<EpciRelationResponseCollection>;
  insee?: Maybe<Scalars["Long"]>;
  name?: Maybe<Scalars["String"]>;
  pickUpDay?: Maybe<PickUpDayEntityResponse>;
  postalCode?: Maybe<Scalars["Long"]>;
  region?: Maybe<Scalars["String"]>;
  siren?: Maybe<Scalars["Long"]>;
  territories?: Maybe<TerritoryRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CityEpciArgs = {
  filters?: InputMaybe<EpciFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CityTerritoriesArgs = {
  filters?: InputMaybe<TerritoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CityEntity = {
  __typename?: "CityEntity";
  attributes?: Maybe<City>;
  id?: Maybe<Scalars["ID"]>;
};

export type CityEntityResponse = {
  __typename?: "CityEntityResponse";
  data?: Maybe<CityEntity>;
};

export type CityEntityResponseCollection = {
  __typename?: "CityEntityResponseCollection";
  data: Array<CityEntity>;
  meta: ResponseCollectionMeta;
};

export type CityFiltersInput = {
  MwCounter?: InputMaybe<MwCounterServiceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<CityFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  department?: InputMaybe<StringFilterInput>;
  epci?: InputMaybe<EpciFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  insee?: InputMaybe<LongFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CityFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CityFiltersInput>>>;
  pickUpDay?: InputMaybe<PickUpDayFiltersInput>;
  postalCode?: InputMaybe<LongFilterInput>;
  region?: InputMaybe<StringFilterInput>;
  siren?: InputMaybe<LongFilterInput>;
  territories?: InputMaybe<TerritoryFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CityInput = {
  MwCounter?: InputMaybe<Scalars["ID"]>;
  contract?: InputMaybe<Scalars["ID"]>;
  department?: InputMaybe<Scalars["String"]>;
  epci?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  insee?: InputMaybe<Scalars["Long"]>;
  name?: InputMaybe<Scalars["String"]>;
  pickUpDay?: InputMaybe<Scalars["ID"]>;
  postalCode?: InputMaybe<Scalars["Long"]>;
  region?: InputMaybe<Scalars["String"]>;
  siren?: InputMaybe<Scalars["Long"]>;
  territories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type CityRelationResponseCollection = {
  __typename?: "CityRelationResponseCollection";
  data: Array<CityEntity>;
};

export type CityResult = {
  __typename?: "CityResult";
  id: Scalars["ID"];
  insee?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  siren?: Maybe<Scalars["String"]>;
};

export type CitySectorization = {
  __typename?: "CitySectorization";
  GeoJson?: Maybe<Scalars["String"]>;
};

export type ClientContact = {
  __typename?: "ClientContact";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  phoneNumber: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ClientContactCreateOutput = {
  __typename?: "ClientContactCreateOutput";
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
};

export type ClientContactEntity = {
  __typename?: "ClientContactEntity";
  attributes?: Maybe<ClientContact>;
  id?: Maybe<Scalars["ID"]>;
};

export type ClientContactEntityResponse = {
  __typename?: "ClientContactEntityResponse";
  data?: Maybe<ClientContactEntity>;
};

export type ClientContactEntityResponseCollection = {
  __typename?: "ClientContactEntityResponseCollection";
  data: Array<ClientContactEntity>;
  meta: ResponseCollectionMeta;
};

export type ClientContactFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ClientContactFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  firstName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lastName?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ClientContactFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ClientContactFiltersInput>>>;
  phoneNumber?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClientContactInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
};

export type CollectDoorToDoor = {
  __typename?: "CollectDoorToDoor";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  flows?: Maybe<FlowRelationResponseCollection>;
  grammaticalGender?: Maybe<Enum_Collectdoortodoor_Grammaticalgender>;
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CollectDoorToDoorFlowsArgs = {
  filters?: InputMaybe<FlowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CollectDoorToDoorEntity = {
  __typename?: "CollectDoorToDoorEntity";
  attributes?: Maybe<CollectDoorToDoor>;
  id?: Maybe<Scalars["ID"]>;
};

export type CollectDoorToDoorEntityResponse = {
  __typename?: "CollectDoorToDoorEntityResponse";
  data?: Maybe<CollectDoorToDoorEntity>;
};

export type CollectDoorToDoorEntityResponseCollection = {
  __typename?: "CollectDoorToDoorEntityResponseCollection";
  data: Array<CollectDoorToDoorEntity>;
  meta: ResponseCollectionMeta;
};

export type CollectDoorToDoorFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CollectDoorToDoorFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  flows?: InputMaybe<FlowFiltersInput>;
  grammaticalGender?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CollectDoorToDoorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CollectDoorToDoorFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CollectDoorToDoorInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  flows?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  grammaticalGender?: InputMaybe<Enum_Collectdoortodoor_Grammaticalgender>;
  name?: InputMaybe<Scalars["String"]>;
  picto?: InputMaybe<Scalars["ID"]>;
};

export type CollectDoorToDoorRelationResponseCollection = {
  __typename?: "CollectDoorToDoorRelationResponseCollection";
  data: Array<CollectDoorToDoorEntity>;
};

export type CollectDropOff = {
  __typename?: "CollectDropOff";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  flows?: Maybe<FlowRelationResponseCollection>;
  grammaticalGender?: Maybe<Enum_Collectdropoff_Grammaticalgender>;
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CollectDropOffFlowsArgs = {
  filters?: InputMaybe<FlowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CollectDropOffEntity = {
  __typename?: "CollectDropOffEntity";
  attributes?: Maybe<CollectDropOff>;
  id?: Maybe<Scalars["ID"]>;
};

export type CollectDropOffEntityResponse = {
  __typename?: "CollectDropOffEntityResponse";
  data?: Maybe<CollectDropOffEntity>;
};

export type CollectDropOffEntityResponseCollection = {
  __typename?: "CollectDropOffEntityResponseCollection";
  data: Array<CollectDropOffEntity>;
  meta: ResponseCollectionMeta;
};

export type CollectDropOffFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CollectDropOffFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  flows?: InputMaybe<FlowFiltersInput>;
  grammaticalGender?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CollectDropOffFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CollectDropOffFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CollectDropOffInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  flows?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  grammaticalGender?: InputMaybe<Enum_Collectdropoff_Grammaticalgender>;
  name?: InputMaybe<Scalars["String"]>;
  picto?: InputMaybe<Scalars["ID"]>;
};

export type CollectDropOffRelationResponseCollection = {
  __typename?: "CollectDropOffRelationResponseCollection";
  data: Array<CollectDropOffEntity>;
};

export type CollectEntity = {
  __typename?: "CollectEntity";
  entityTypeName: Scalars["String"];
  grammaticalGender: Scalars["String"];
  name: Scalars["String"];
  originalId: Scalars["ID"];
  picto: PictoDto;
  uniqueId: Scalars["String"];
};

export type CollectVoluntary = {
  __typename?: "CollectVoluntary";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  flows?: Maybe<FlowRelationResponseCollection>;
  grammaticalGender?: Maybe<Enum_Collectvoluntary_Grammaticalgender>;
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CollectVoluntaryFlowsArgs = {
  filters?: InputMaybe<FlowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CollectVoluntaryEntity = {
  __typename?: "CollectVoluntaryEntity";
  attributes?: Maybe<CollectVoluntary>;
  id?: Maybe<Scalars["ID"]>;
};

export type CollectVoluntaryEntityResponse = {
  __typename?: "CollectVoluntaryEntityResponse";
  data?: Maybe<CollectVoluntaryEntity>;
};

export type CollectVoluntaryEntityResponseCollection = {
  __typename?: "CollectVoluntaryEntityResponseCollection";
  data: Array<CollectVoluntaryEntity>;
  meta: ResponseCollectionMeta;
};

export type CollectVoluntaryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CollectVoluntaryFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  flows?: InputMaybe<FlowFiltersInput>;
  grammaticalGender?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CollectVoluntaryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CollectVoluntaryFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CollectVoluntaryInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  flows?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  grammaticalGender?: InputMaybe<Enum_Collectvoluntary_Grammaticalgender>;
  name?: InputMaybe<Scalars["String"]>;
  picto?: InputMaybe<Scalars["ID"]>;
};

export type CollectVoluntaryRelationResponseCollection = {
  __typename?: "CollectVoluntaryRelationResponseCollection";
  data: Array<CollectVoluntaryEntity>;
};

export type CommuneInput = {
  insee: Scalars["Int"];
};

export type ComponentBlocksAttachments = {
  __typename?: "ComponentBlocksAttachments";
  attachment?: Maybe<UploadFileRelationResponseCollection>;
  attachmentLabel: Scalars["String"];
  id: Scalars["ID"];
  multipleAttachments?: Maybe<Scalars["Boolean"]>;
  renderField: Scalars["Boolean"];
};

export type ComponentBlocksAttachmentsAttachmentArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentBlocksCheckbox = {
  __typename?: "ComponentBlocksCheckbox";
  fieldStatusCheckbox: Enum_Componentblockscheckbox_Fieldstatuscheckbox;
  id: Scalars["ID"];
  labelCheckbox: Scalars["String"];
};

export type ComponentBlocksCommentary = {
  __typename?: "ComponentBlocksCommentary";
  commentaryLabel: Scalars["String"];
  commentaryPlaceholder?: Maybe<Scalars["String"]>;
  commentaryStatus: Enum_Componentblockscommentary_Commentarystatus;
  id: Scalars["ID"];
};

export type ComponentBlocksCumbersome = {
  __typename?: "ComponentBlocksCumbersome";
  cumbersomeLabel: Scalars["String"];
  cumbersomeLimitMessage: Scalars["String"];
  id: Scalars["ID"];
  isNumberAndVolume: Scalars["Boolean"];
  maxNumberOfCumbersome?: Maybe<Scalars["Int"]>;
  maxVolumeOfCumbersome?: Maybe<Scalars["Float"]>;
};

export type ComponentBlocksDateChoice = {
  __typename?: "ComponentBlocksDateChoice";
  fieldLabelDateChoice: Scalars["String"];
  fieldStatus: Enum_Componentblocksdatechoice_Fieldstatus;
  id: Scalars["ID"];
};

export type ComponentBlocksDownloadBlock = {
  __typename?: "ComponentBlocksDownloadBlock";
  file: UploadFileEntityResponse;
  id: Scalars["ID"];
  linkText: Scalars["String"];
};

export type ComponentBlocksDownloadBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksDownloadBlockFiltersInput>>>;
  linkText?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksDownloadBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksDownloadBlockFiltersInput>>>;
};

export type ComponentBlocksDownloadBlockInput = {
  file?: InputMaybe<Scalars["ID"]>;
  id?: InputMaybe<Scalars["ID"]>;
  linkText?: InputMaybe<Scalars["String"]>;
};

export type ComponentBlocksFile = {
  __typename?: "ComponentBlocksFile";
  document?: Maybe<UploadFileEntityResponse>;
  id: Scalars["ID"];
};

export type ComponentBlocksHorizontalRule = {
  __typename?: "ComponentBlocksHorizontalRule";
  hr?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type ComponentBlocksImage = {
  __typename?: "ComponentBlocksImage";
  altText?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isDecorative?: Maybe<Scalars["Boolean"]>;
  picture?: Maybe<UploadFileEntityResponse>;
};

export type ComponentBlocksOpeningDay = {
  __typename?: "ComponentBlocksOpeningDay";
  afterNoonEnd?: Maybe<Scalars["Time"]>;
  afterNoonStart?: Maybe<Scalars["Time"]>;
  id: Scalars["ID"];
  morningEnd?: Maybe<Scalars["Time"]>;
  morningStart?: Maybe<Scalars["Time"]>;
  weekDay: Enum_Componentblocksopeningday_Weekday;
};

export type ComponentBlocksProofOfReceipt = {
  __typename?: "ComponentBlocksProofOfReceipt";
  id: Scalars["ID"];
  proofOfReceiptHeader: Scalars["String"];
  proofOfReceiptSubject: Scalars["String"];
  sendProofOfReceipt: Scalars["Boolean"];
};

export type ComponentBlocksQcm = {
  __typename?: "ComponentBlocksQcm";
  fieldLabelQCM: Scalars["String"];
  fieldStatusQCM: Enum_Componentblocksqcm_Fieldstatusqcm;
  id: Scalars["ID"];
  multipleChoice: Scalars["Boolean"];
  responses: Scalars["String"];
};

export type ComponentBlocksQuestions = {
  __typename?: "ComponentBlocksQuestions";
  height: Scalars["Boolean"];
  id: Scalars["ID"];
  questionTextLabel: Scalars["String"];
  questionTextPlaceholder: Scalars["String"];
  textStatus: Enum_Componentblocksquestions_Textstatus;
};

export type ComponentBlocksRequestSlotsExceptions = {
  __typename?: "ComponentBlocksRequestSlotsExceptions";
  exceptionType?: Maybe<Enum_Componentblocksrequestslotsexceptions_Exceptiontype>;
  id: Scalars["ID"];
  slotException?: Maybe<Scalars["JSON"]>;
};

export type ComponentBlocksRequestSlotsExceptionsFiltersInput = {
  and?: InputMaybe<
    Array<InputMaybe<ComponentBlocksRequestSlotsExceptionsFiltersInput>>
  >;
  exceptionType?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ComponentBlocksRequestSlotsExceptionsFiltersInput>;
  or?: InputMaybe<
    Array<InputMaybe<ComponentBlocksRequestSlotsExceptionsFiltersInput>>
  >;
  slotException?: InputMaybe<JsonFilterInput>;
};

export type ComponentBlocksRequestSlotsExceptionsInput = {
  exceptionType?: InputMaybe<Enum_Componentblocksrequestslotsexceptions_Exceptiontype>;
  id?: InputMaybe<Scalars["ID"]>;
  slotException?: InputMaybe<Scalars["JSON"]>;
};

export type ComponentBlocksRequestType = {
  __typename?: "ComponentBlocksRequestType";
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isEmail?: Maybe<Scalars["Boolean"]>;
  isTSMS?: Maybe<Scalars["Boolean"]>;
  title: Scalars["String"];
};

export type ComponentBlocksRequestTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ComponentBlocksRequestTypeFiltersInput>>>;
  email?: InputMaybe<StringFilterInput>;
  isEmail?: InputMaybe<BooleanFilterInput>;
  isTSMS?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<ComponentBlocksRequestTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ComponentBlocksRequestTypeFiltersInput>>>;
  title?: InputMaybe<StringFilterInput>;
};

export type ComponentBlocksRequestTypeInput = {
  email?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  isEmail?: InputMaybe<Scalars["Boolean"]>;
  isTSMS?: InputMaybe<Scalars["Boolean"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type ComponentBlocksSubHeading = {
  __typename?: "ComponentBlocksSubHeading";
  id: Scalars["ID"];
  subHeadingTag?: Maybe<Enum_Componentblockssubheading_Subheadingtag>;
  subHeadingText?: Maybe<Scalars["String"]>;
};

export type ComponentBlocksTest = {
  __typename?: "ComponentBlocksTest";
  id: Scalars["ID"];
};

export type ComponentBlocksVideo = {
  __typename?: "ComponentBlocksVideo";
  id: Scalars["ID"];
  transcriptText?: Maybe<Scalars["String"]>;
  videoLink?: Maybe<Scalars["String"]>;
};

export type ComponentBlocksWysiwyg = {
  __typename?: "ComponentBlocksWysiwyg";
  id: Scalars["ID"];
  textEditor?: Maybe<Scalars["String"]>;
};

export type ComponentLinksAlertNotification = {
  __typename?: "ComponentLinksAlertNotification";
  alertNotif?: Maybe<AlertNotificationServiceEntityResponse>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksContactUs = {
  __typename?: "ComponentLinksContactUs";
  contactUs?: Maybe<ContactUsSubServiceRelationResponseCollection>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksContactUsContactUsArgs = {
  filters?: InputMaybe<ContactUsSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksDropOffMap = {
  __typename?: "ComponentLinksDropOffMap";
  dropMap?: Maybe<DropOffMapServiceRelationResponseCollection>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  pointToDisplayOnTheMap?: Maybe<Enum_Componentlinksdropoffmap_Pointtodisplayonthemap>;
};

export type ComponentLinksDropOffMapDropMapArgs = {
  filters?: InputMaybe<DropOffMapServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksEditoContent = {
  __typename?: "ComponentLinksEditoContent";
  event?: Maybe<EventEntityResponse>;
  freeContent?: Maybe<FreeContentEntityResponse>;
  id: Scalars["ID"];
  new?: Maybe<NewEntityResponse>;
  quiz?: Maybe<QuizEntityResponse>;
  tip?: Maybe<TipEntityResponse>;
};

export type ComponentLinksEditorial = {
  __typename?: "ComponentLinksEditorial";
  event_sub_service?: Maybe<EventSubServiceEntityResponse>;
  id: Scalars["ID"];
  isDisplayed?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksEvents = {
  __typename?: "ComponentLinksEvents";
  events?: Maybe<EventSubServiceRelationResponseCollection>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksEventsEventsArgs = {
  filters?: InputMaybe<EventSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksExternal = {
  __typename?: "ComponentLinksExternal";
  externalLink?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksFrees = {
  __typename?: "ComponentLinksFrees";
  freeContents?: Maybe<FreeContentSubServiceRelationResponseCollection>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksFreesFreeContentsArgs = {
  filters?: InputMaybe<FreeContentSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksKeyMetrics = {
  __typename?: "ComponentLinksKeyMetrics";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  keyMetrics?: Maybe<KeyMetricsServiceRelationResponseCollection>;
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksKeyMetricsKeyMetricsArgs = {
  filters?: InputMaybe<KeyMetricsServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksMyWasteCounter = {
  __typename?: "ComponentLinksMyWasteCounter";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  myWCounter?: Maybe<MwCounterServiceRelationResponseCollection>;
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksMyWasteCounterMyWCounterArgs = {
  filters?: InputMaybe<MwCounterServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksNews = {
  __typename?: "ComponentLinksNews";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  news?: Maybe<NewsSubServiceRelationResponseCollection>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksNewsNewsArgs = {
  filters?: InputMaybe<NewsSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksPickUpDay = {
  __typename?: "ComponentLinksPickUpDay";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  pickDays?: Maybe<PickUpDayServiceRelationResponseCollection>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksPickUpDayPickDaysArgs = {
  filters?: InputMaybe<PickUpDayServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksQuizzes = {
  __typename?: "ComponentLinksQuizzes";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  quizzes?: Maybe<QuizSubServiceRelationResponseCollection>;
};

export type ComponentLinksQuizzesQuizzesArgs = {
  filters?: InputMaybe<QuizSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksRecyclingGuide = {
  __typename?: "ComponentLinksRecyclingGuide";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  recyclings?: Maybe<RecyclingGuideServiceRelationResponseCollection>;
};

export type ComponentLinksRecyclingGuideRecyclingsArgs = {
  filters?: InputMaybe<RecyclingGuideServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksRequest = {
  __typename?: "ComponentLinksRequest";
  demand?: Maybe<Enum_Componentlinksrequest_Demand>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  requests?: Maybe<RequestServiceRelationResponseCollection>;
};

export type ComponentLinksRequestRequestsArgs = {
  filters?: InputMaybe<RequestServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksTips = {
  __typename?: "ComponentLinksTips";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  tips?: Maybe<TipSubServiceRelationResponseCollection>;
};

export type ComponentLinksTipsTipsArgs = {
  filters?: InputMaybe<TipSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ComponentLinksTopContent = {
  __typename?: "ComponentLinksTopContent";
  event?: Maybe<EventEntityResponse>;
  id: Scalars["ID"];
  new?: Maybe<NewEntityResponse>;
};

export type Confidentiality = {
  __typename?: "Confidentiality";
  blocks?: Maybe<Array<Maybe<ConfidentialityBlocksDynamicZone>>>;
  confidentialitySubService?: Maybe<ConfidentialitySubServiceEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  status?: Maybe<Enum_Confidentiality_Status>;
  title: Scalars["String"];
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type ConfidentialityBlocksDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksSubHeading
  | ComponentBlocksWysiwyg
  | Error;

export type ConfidentialityEntity = {
  __typename?: "ConfidentialityEntity";
  attributes?: Maybe<Confidentiality>;
  id?: Maybe<Scalars["ID"]>;
};

export type ConfidentialityEntityResponse = {
  __typename?: "ConfidentialityEntityResponse";
  data?: Maybe<ConfidentialityEntity>;
};

export type ConfidentialityEntityResponseCollection = {
  __typename?: "ConfidentialityEntityResponseCollection";
  data: Array<ConfidentialityEntity>;
  meta: ResponseCollectionMeta;
};

export type ConfidentialityFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ConfidentialityFiltersInput>>>;
  confidentialitySubService?: InputMaybe<ConfidentialitySubServiceFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ConfidentialityFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ConfidentialityFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type ConfidentialityInput = {
  blocks?: InputMaybe<Array<Scalars["ConfidentialityBlocksDynamicZoneInput"]>>;
  confidentialitySubService?: InputMaybe<Scalars["ID"]>;
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  status?: InputMaybe<Enum_Confidentiality_Status>;
  title?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type ConfidentialityRelationResponseCollection = {
  __typename?: "ConfidentialityRelationResponseCollection";
  data: Array<ConfidentialityEntity>;
};

export type ConfidentialitySubService = {
  __typename?: "ConfidentialitySubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  confidentialities?: Maybe<ConfidentialityRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  link?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ConfidentialitySubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ConfidentialitySubServiceConfidentialitiesArgs = {
  filters?: InputMaybe<ConfidentialityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ConfidentialitySubServiceEntity = {
  __typename?: "ConfidentialitySubServiceEntity";
  attributes?: Maybe<ConfidentialitySubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type ConfidentialitySubServiceEntityResponse = {
  __typename?: "ConfidentialitySubServiceEntityResponse";
  data?: Maybe<ConfidentialitySubServiceEntity>;
};

export type ConfidentialitySubServiceEntityResponseCollection = {
  __typename?: "ConfidentialitySubServiceEntityResponseCollection";
  data: Array<ConfidentialitySubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type ConfidentialitySubServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ConfidentialitySubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  confidentialities?: InputMaybe<ConfidentialityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ConfidentialitySubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ConfidentialitySubServiceFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ConfidentialitySubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  confidentialities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  link?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type ContactResponse = {
  __typename?: "ContactResponse";
  city?: Maybe<Scalars["String"]>;
  contactEmail?: Maybe<Scalars["String"]>;
  contractId?: Maybe<Scalars["Int"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
  postalAddress?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  serviceName?: Maybe<Scalars["String"]>;
};

export type ContactUs = {
  __typename?: "ContactUs";
  blocks?: Maybe<Array<Maybe<ContactUsBlocksDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  status?: Maybe<Enum_Contactus_Status>;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars["String"];
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  unpublishedDate?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type ContactUsTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContactUsBlocksDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksImage
  | ComponentBlocksSubHeading
  | ComponentBlocksVideo
  | ComponentBlocksWysiwyg
  | Error;

export type ContactUsEntity = {
  __typename?: "ContactUsEntity";
  attributes?: Maybe<ContactUs>;
  id?: Maybe<Scalars["ID"]>;
};

export type ContactUsEntityResponse = {
  __typename?: "ContactUsEntityResponse";
  data?: Maybe<ContactUsEntity>;
};

export type ContactUsEntityResponseCollection = {
  __typename?: "ContactUsEntityResponseCollection";
  data: Array<ContactUsEntity>;
  meta: ResponseCollectionMeta;
};

export type ContactUsFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContactUsFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ContactUsFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContactUsFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  unpublishedDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type ContactUsInput = {
  blocks?: InputMaybe<Array<Scalars["ContactUsBlocksDynamicZoneInput"]>>;
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  status?: InputMaybe<Enum_Contactus_Status>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  unpublishedDate?: InputMaybe<Scalars["DateTime"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type ContactUsRelationResponseCollection = {
  __typename?: "ContactUsRelationResponseCollection";
  data: Array<ContactUsEntity>;
};

export type ContactUsSubService = {
  __typename?: "ContactUsSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  contactUses?: Maybe<ContactUsRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated?: Maybe<Scalars["Boolean"]>;
  label: Scalars["String"];
  link?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContactUsSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContactUsSubServiceContactUsesArgs = {
  filters?: InputMaybe<ContactUsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContactUsSubServiceEntity = {
  __typename?: "ContactUsSubServiceEntity";
  attributes?: Maybe<ContactUsSubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type ContactUsSubServiceEntityResponse = {
  __typename?: "ContactUsSubServiceEntityResponse";
  data?: Maybe<ContactUsSubServiceEntity>;
};

export type ContactUsSubServiceEntityResponseCollection = {
  __typename?: "ContactUsSubServiceEntityResponseCollection";
  data: Array<ContactUsSubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type ContactUsSubServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContactUsSubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  contactUses?: InputMaybe<ContactUsFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ContactUsSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContactUsSubServiceFiltersInput>>>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContactUsSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contactUses?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  label?: InputMaybe<Scalars["String"]>;
  link?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type ContactUsSubServiceRelationResponseCollection = {
  __typename?: "ContactUsSubServiceRelationResponseCollection";
  data: Array<ContactUsSubServiceEntity>;
};

export type ContentTypeDto = {
  __typename?: "ContentTypeDTO";
  description?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  subServiceId: Scalars["ID"];
  type: Scalars["String"];
};

export type Contract = {
  __typename?: "Contract";
  MwCounterService?: Maybe<MwCounterServiceEntityResponse>;
  alertNotificationService?: Maybe<AlertNotificationServiceEntityResponse>;
  ccap?: Maybe<Scalars["Long"]>;
  channelType?: Maybe<ChannelTypeEntityResponse>;
  cities?: Maybe<CityRelationResponseCollection>;
  clear?: Maybe<Scalars["Long"]>;
  clientContact?: Maybe<ClientContactEntityResponse>;
  clientName: Scalars["String"];
  clientType: Enum_Contract_Clienttype;
  collectDoorToDoors?: Maybe<CollectDoorToDoorRelationResponseCollection>;
  collectDropOffs?: Maybe<CollectDropOffRelationResponseCollection>;
  collectVoluntaries?: Maybe<CollectVoluntaryRelationResponseCollection>;
  contractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  contractMenu?: Maybe<ContractMenuEntityResponse>;
  contractStatus: Enum_Contract_Contractstatus;
  createdAt?: Maybe<Scalars["DateTime"]>;
  dropOffMapService?: Maybe<DropOffMapServiceEntityResponse>;
  dueDate?: Maybe<Scalars["DateTime"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  flows?: Maybe<FlowRelationResponseCollection>;
  hasYesWeScan?: Maybe<Scalars["Boolean"]>;
  isNonExclusive: Scalars["Boolean"];
  isRVFrance: Scalars["Boolean"];
  keyMetricsService?: Maybe<KeyMetricsServiceEntityResponse>;
  logicalDelete?: Maybe<Scalars["Boolean"]>;
  logo: UploadFileEntityResponse;
  numberOfInhabitants?: Maybe<Scalars["Long"]>;
  oldClientName?: Maybe<Scalars["String"]>;
  pathId?: Maybe<Scalars["Long"]>;
  pickUpDayService?: Maybe<PickUpDayServiceEntityResponse>;
  recyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  requestService?: Maybe<RequestServiceEntityResponse>;
  sectorizations?: Maybe<SectorizationRelationResponseCollection>;
  siret?: Maybe<Scalars["Long"]>;
  tags?: Maybe<TagRelationResponseCollection>;
  territory?: Maybe<TerritoryEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
  yes_we_scan_service?: Maybe<YesWeScanServiceRelationResponseCollection>;
};

export type ContractCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContractCollectDoorToDoorsArgs = {
  filters?: InputMaybe<CollectDoorToDoorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContractCollectDropOffsArgs = {
  filters?: InputMaybe<CollectDropOffFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContractCollectVoluntariesArgs = {
  filters?: InputMaybe<CollectVoluntaryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContractFlowsArgs = {
  filters?: InputMaybe<FlowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContractSectorizationsArgs = {
  filters?: InputMaybe<SectorizationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContractTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContractUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContractYes_We_Scan_ServiceArgs = {
  filters?: InputMaybe<YesWeScanServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContractAndClientContact =
  | ClientContactCreateOutput
  | ContractCreateOutput;

export type ContractCreateOutput = {
  __typename?: "ContractCreateOutput";
  ccap?: Maybe<Scalars["Long"]>;
  clear?: Maybe<Scalars["Long"]>;
  clientName: Scalars["String"];
  clientType?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isRVFrance: Scalars["Boolean"];
  siret?: Maybe<Scalars["Long"]>;
};

export type ContractCustomization = {
  __typename?: "ContractCustomization";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  footer?: Maybe<FooterEntityResponse>;
  homepage?: Maybe<HomepageEntityResponse>;
  primaryColor: Scalars["String"];
  secondaryColor?: Maybe<Scalars["String"]>;
  textContrast: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContractCustomizationEntity = {
  __typename?: "ContractCustomizationEntity";
  attributes?: Maybe<ContractCustomization>;
  id?: Maybe<Scalars["ID"]>;
};

export type ContractCustomizationEntityResponse = {
  __typename?: "ContractCustomizationEntityResponse";
  data?: Maybe<ContractCustomizationEntity>;
};

export type ContractCustomizationEntityResponseCollection = {
  __typename?: "ContractCustomizationEntityResponseCollection";
  data: Array<ContractCustomizationEntity>;
  meta: ResponseCollectionMeta;
};

export type ContractCustomizationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContractCustomizationFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  footer?: InputMaybe<FooterFiltersInput>;
  homepage?: InputMaybe<HomepageFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ContractCustomizationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContractCustomizationFiltersInput>>>;
  primaryColor?: InputMaybe<StringFilterInput>;
  secondaryColor?: InputMaybe<StringFilterInput>;
  textContrast?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContractCustomizationInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  footer?: InputMaybe<Scalars["ID"]>;
  homepage?: InputMaybe<Scalars["ID"]>;
  primaryColor?: InputMaybe<Scalars["String"]>;
  secondaryColor?: InputMaybe<Scalars["String"]>;
  textContrast?: InputMaybe<Scalars["String"]>;
};

export type ContractEntity = {
  __typename?: "ContractEntity";
  attributes?: Maybe<Contract>;
  id?: Maybe<Scalars["ID"]>;
};

export type ContractEntityResponse = {
  __typename?: "ContractEntityResponse";
  data?: Maybe<ContractEntity>;
};

export type ContractEntityResponseCollection = {
  __typename?: "ContractEntityResponseCollection";
  data: Array<ContractEntity>;
  meta: ResponseCollectionMeta;
};

export type ContractFiltersInput = {
  MwCounterService?: InputMaybe<MwCounterServiceFiltersInput>;
  alertNotificationService?: InputMaybe<AlertNotificationServiceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<ContractFiltersInput>>>;
  ccap?: InputMaybe<LongFilterInput>;
  channelType?: InputMaybe<ChannelTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  clear?: InputMaybe<LongFilterInput>;
  clientContact?: InputMaybe<ClientContactFiltersInput>;
  clientName?: InputMaybe<StringFilterInput>;
  clientType?: InputMaybe<StringFilterInput>;
  collectDoorToDoors?: InputMaybe<CollectDoorToDoorFiltersInput>;
  collectDropOffs?: InputMaybe<CollectDropOffFiltersInput>;
  collectVoluntaries?: InputMaybe<CollectVoluntaryFiltersInput>;
  contractCustomization?: InputMaybe<ContractCustomizationFiltersInput>;
  contractMenu?: InputMaybe<ContractMenuFiltersInput>;
  contractStatus?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dropOffMapService?: InputMaybe<DropOffMapServiceFiltersInput>;
  dueDate?: InputMaybe<DateTimeFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  flows?: InputMaybe<FlowFiltersInput>;
  hasYesWeScan?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isNonExclusive?: InputMaybe<BooleanFilterInput>;
  isRVFrance?: InputMaybe<BooleanFilterInput>;
  keyMetricsService?: InputMaybe<KeyMetricsServiceFiltersInput>;
  logicalDelete?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<ContractFiltersInput>;
  numberOfInhabitants?: InputMaybe<LongFilterInput>;
  oldClientName?: InputMaybe<StringFilterInput>;
  or?: InputMaybe<Array<InputMaybe<ContractFiltersInput>>>;
  pathId?: InputMaybe<LongFilterInput>;
  pickUpDayService?: InputMaybe<PickUpDayServiceFiltersInput>;
  recyclingGuideService?: InputMaybe<RecyclingGuideServiceFiltersInput>;
  requestService?: InputMaybe<RequestServiceFiltersInput>;
  sectorizations?: InputMaybe<SectorizationFiltersInput>;
  siret?: InputMaybe<LongFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  territory?: InputMaybe<TerritoryFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
  yes_we_scan_service?: InputMaybe<YesWeScanServiceFiltersInput>;
};

export type ContractInput = {
  MwCounterService?: InputMaybe<Scalars["ID"]>;
  alertNotificationService?: InputMaybe<Scalars["ID"]>;
  ccap?: InputMaybe<Scalars["Long"]>;
  channelType?: InputMaybe<Scalars["ID"]>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  clear?: InputMaybe<Scalars["Long"]>;
  clientContact?: InputMaybe<Scalars["ID"]>;
  clientName?: InputMaybe<Scalars["String"]>;
  clientType?: InputMaybe<Enum_Contract_Clienttype>;
  collectDoorToDoors?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  collectDropOffs?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  collectVoluntaries?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contractCustomization?: InputMaybe<Scalars["ID"]>;
  contractMenu?: InputMaybe<Scalars["ID"]>;
  contractStatus?: InputMaybe<Enum_Contract_Contractstatus>;
  dropOffMapService?: InputMaybe<Scalars["ID"]>;
  dueDate?: InputMaybe<Scalars["DateTime"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  flows?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  hasYesWeScan?: InputMaybe<Scalars["Boolean"]>;
  isNonExclusive?: InputMaybe<Scalars["Boolean"]>;
  isRVFrance?: InputMaybe<Scalars["Boolean"]>;
  keyMetricsService?: InputMaybe<Scalars["ID"]>;
  logicalDelete?: InputMaybe<Scalars["Boolean"]>;
  logo?: InputMaybe<Scalars["ID"]>;
  numberOfInhabitants?: InputMaybe<Scalars["Long"]>;
  oldClientName?: InputMaybe<Scalars["String"]>;
  pathId?: InputMaybe<Scalars["Long"]>;
  pickUpDayService?: InputMaybe<Scalars["ID"]>;
  recyclingGuideService?: InputMaybe<Scalars["ID"]>;
  requestService?: InputMaybe<Scalars["ID"]>;
  sectorizations?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  siret?: InputMaybe<Scalars["Long"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  territory?: InputMaybe<Scalars["ID"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  yes_we_scan_service?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type ContractMenu = {
  __typename?: "ContractMenu";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  serviceLinks?: Maybe<Array<Maybe<ContractMenuServiceLinksDynamicZone>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContractMenuEntity = {
  __typename?: "ContractMenuEntity";
  attributes?: Maybe<ContractMenu>;
  id?: Maybe<Scalars["ID"]>;
};

export type ContractMenuEntityResponse = {
  __typename?: "ContractMenuEntityResponse";
  data?: Maybe<ContractMenuEntity>;
};

export type ContractMenuEntityResponseCollection = {
  __typename?: "ContractMenuEntityResponseCollection";
  data: Array<ContractMenuEntity>;
  meta: ResponseCollectionMeta;
};

export type ContractMenuFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContractMenuFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ContractMenuFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContractMenuFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContractMenuInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  serviceLinks?: InputMaybe<
    Array<Scalars["ContractMenuServiceLinksDynamicZoneInput"]>
  >;
};

export type ContractMenuServiceLinksDynamicZone =
  | ComponentLinksAlertNotification
  | ComponentLinksContactUs
  | ComponentLinksDropOffMap
  | ComponentLinksEvents
  | ComponentLinksExternal
  | ComponentLinksFrees
  | ComponentLinksKeyMetrics
  | ComponentLinksMyWasteCounter
  | ComponentLinksNews
  | ComponentLinksPickUpDay
  | ComponentLinksQuizzes
  | ComponentLinksRecyclingGuide
  | ComponentLinksRequest
  | ComponentLinksTips
  | Error;

export type Cookie = {
  __typename?: "Cookie";
  blocks?: Maybe<Array<Maybe<CookieBlocksDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  status?: Maybe<Enum_Cookie_Status>;
  title: Scalars["String"];
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type CookieBlocksDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksSubHeading
  | ComponentBlocksWysiwyg
  | Error;

export type CookieEntity = {
  __typename?: "CookieEntity";
  attributes?: Maybe<Cookie>;
  id?: Maybe<Scalars["ID"]>;
};

export type CookieEntityResponse = {
  __typename?: "CookieEntityResponse";
  data?: Maybe<CookieEntity>;
};

export type CookieEntityResponseCollection = {
  __typename?: "CookieEntityResponseCollection";
  data: Array<CookieEntity>;
  meta: ResponseCollectionMeta;
};

export type CookieFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CookieFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<CookieFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CookieFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type CookieInput = {
  blocks?: InputMaybe<Array<Scalars["CookieBlocksDynamicZoneInput"]>>;
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  status?: InputMaybe<Enum_Cookie_Status>;
  title?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type CookieRelationResponseCollection = {
  __typename?: "CookieRelationResponseCollection";
  data: Array<CookieEntity>;
};

export type CookiesSubService = {
  __typename?: "CookiesSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cookies?: Maybe<CookieRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  link?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type CookiesSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CookiesSubServiceCookiesArgs = {
  filters?: InputMaybe<CookieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type CookiesSubServiceEntity = {
  __typename?: "CookiesSubServiceEntity";
  attributes?: Maybe<CookiesSubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type CookiesSubServiceEntityResponse = {
  __typename?: "CookiesSubServiceEntityResponse";
  data?: Maybe<CookiesSubServiceEntity>;
};

export type CookiesSubServiceEntityResponseCollection = {
  __typename?: "CookiesSubServiceEntityResponseCollection";
  data: Array<CookiesSubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type CookiesSubServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<CookiesSubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cookies?: InputMaybe<CookieFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CookiesSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CookiesSubServiceFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CookiesSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cookies?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  link?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type DateFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  contains?: InputMaybe<Scalars["Date"]>;
  containsi?: InputMaybe<Scalars["Date"]>;
  endsWith?: InputMaybe<Scalars["Date"]>;
  eq?: InputMaybe<Scalars["Date"]>;
  eqi?: InputMaybe<Scalars["Date"]>;
  gt?: InputMaybe<Scalars["Date"]>;
  gte?: InputMaybe<Scalars["Date"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  lt?: InputMaybe<Scalars["Date"]>;
  lte?: InputMaybe<Scalars["Date"]>;
  ne?: InputMaybe<Scalars["Date"]>;
  not?: InputMaybe<DateFilterInput>;
  notContains?: InputMaybe<Scalars["Date"]>;
  notContainsi?: InputMaybe<Scalars["Date"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Date"]>>>;
  startsWith?: InputMaybe<Scalars["Date"]>;
};

export type DateTimeFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  contains?: InputMaybe<Scalars["DateTime"]>;
  containsi?: InputMaybe<Scalars["DateTime"]>;
  endsWith?: InputMaybe<Scalars["DateTime"]>;
  eq?: InputMaybe<Scalars["DateTime"]>;
  eqi?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  ne?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<DateTimeFilterInput>;
  notContains?: InputMaybe<Scalars["DateTime"]>;
  notContainsi?: InputMaybe<Scalars["DateTime"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]>>>;
  startsWith?: InputMaybe<Scalars["DateTime"]>;
};

export type Deactivation = {
  __typename?: "Deactivation";
  contractId?: Maybe<Scalars["ID"]>;
  hasOtherActivationTypes?: Maybe<Scalars["Boolean"]>;
  typeDeactivation?: Maybe<Scalars["String"]>;
};

export type DeletedMessage = {
  __typename?: "DeletedMessage";
  id?: Maybe<Scalars["ID"]>;
  message?: Maybe<Scalars["String"]>;
};

export type DescriptionService = {
  __typename?: "DescriptionService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type DescriptionServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type DescriptionServiceEntity = {
  __typename?: "DescriptionServiceEntity";
  attributes?: Maybe<DescriptionService>;
  id?: Maybe<Scalars["ID"]>;
};

export type DescriptionServiceEntityResponse = {
  __typename?: "DescriptionServiceEntityResponse";
  data?: Maybe<DescriptionServiceEntity>;
};

export type DescriptionServiceEntityResponseCollection = {
  __typename?: "DescriptionServiceEntityResponseCollection";
  data: Array<DescriptionServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type DescriptionServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DescriptionServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DescriptionServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DescriptionServiceFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DescriptionServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Document = {
  __typename?: "Document";
  createdAt?: Maybe<Scalars["DateTime"]>;
  document: UploadFileEntityResponse;
  event?: Maybe<EventEntityResponse>;
  name: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type DocumentEntity = {
  __typename?: "DocumentEntity";
  attributes?: Maybe<Document>;
  id?: Maybe<Scalars["ID"]>;
};

export type DocumentEntityResponse = {
  __typename?: "DocumentEntityResponse";
  data?: Maybe<DocumentEntity>;
};

export type DocumentEntityResponseCollection = {
  __typename?: "DocumentEntityResponseCollection";
  data: Array<DocumentEntity>;
  meta: ResponseCollectionMeta;
};

export type DocumentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DocumentFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  event?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DocumentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DocumentFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DocumentInput = {
  document?: InputMaybe<Scalars["ID"]>;
  event?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type DocumentRelationResponseCollection = {
  __typename?: "DocumentRelationResponseCollection";
  data: Array<DocumentEntity>;
};

export type DropOffMap = {
  __typename?: "DropOffMap";
  BANFeatureProperties?: Maybe<Scalars["JSON"]>;
  address?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  collectDropOff?: Maybe<CollectDropOffEntityResponse>;
  collectVoluntary?: Maybe<CollectVoluntaryEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  downloadableFiles?: Maybe<Array<Maybe<ComponentBlocksDownloadBlock>>>;
  dropOffMapService?: Maybe<DropOffMapServiceEntityResponse>;
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  mustKnow?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  openingHoursBlocks?: Maybe<
    Array<Maybe<DropOffMapOpeningHoursBlocksDynamicZone>>
  >;
  phoneNumber?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type DropOffMapDownloadableFilesArgs = {
  filters?: InputMaybe<ComponentBlocksDownloadBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type DropOffMapDto = {
  __typename?: "DropOffMapDTO";
  BANFeatureProperties?: Maybe<Scalars["JSON"]>;
  address: Scalars["String"];
  city: Scalars["String"];
  collect?: Maybe<CollectEntity>;
  description?: Maybe<Scalars["String"]>;
  downloadableFiles?: Maybe<Array<Maybe<ComponentBlocksDownloadBlock>>>;
  id: Scalars["String"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  mustKnow?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  openingHoursBlocks?: Maybe<
    Array<Maybe<DropOffMapOpeningHoursBlocksDynamicZone>>
  >;
  phoneNumber?: Maybe<Scalars["String"]>;
};

export type DropOffMapDtoDownloadableFilesArgs = {
  filters?: InputMaybe<ComponentBlocksDownloadBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type DropOffMapEntity = {
  __typename?: "DropOffMapEntity";
  attributes?: Maybe<DropOffMap>;
  id?: Maybe<Scalars["ID"]>;
};

export type DropOffMapEntityResponse = {
  __typename?: "DropOffMapEntityResponse";
  data?: Maybe<DropOffMapEntity>;
};

export type DropOffMapEntityResponseCollection = {
  __typename?: "DropOffMapEntityResponseCollection";
  data: Array<DropOffMapEntity>;
  meta: ResponseCollectionMeta;
};

export type DropOffMapFiltersInput = {
  BANFeatureProperties?: InputMaybe<JsonFilterInput>;
  address?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<DropOffMapFiltersInput>>>;
  city?: InputMaybe<StringFilterInput>;
  collectDropOff?: InputMaybe<CollectDropOffFiltersInput>;
  collectVoluntary?: InputMaybe<CollectVoluntaryFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  downloadableFiles?: InputMaybe<ComponentBlocksDownloadBlockFiltersInput>;
  dropOffMapService?: InputMaybe<DropOffMapServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  latitude?: InputMaybe<FloatFilterInput>;
  longitude?: InputMaybe<FloatFilterInput>;
  mustKnow?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DropOffMapFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DropOffMapFiltersInput>>>;
  phoneNumber?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DropOffMapInput = {
  BANFeatureProperties?: InputMaybe<Scalars["JSON"]>;
  address?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  collectDropOff?: InputMaybe<Scalars["ID"]>;
  collectVoluntary?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  downloadableFiles?: InputMaybe<
    Array<InputMaybe<ComponentBlocksDownloadBlockInput>>
  >;
  dropOffMapService?: InputMaybe<Scalars["ID"]>;
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  mustKnow?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  openingHoursBlocks?: InputMaybe<
    Array<Scalars["DropOffMapOpeningHoursBlocksDynamicZoneInput"]>
  >;
  phoneNumber?: InputMaybe<Scalars["String"]>;
};

export type DropOffMapOpeningHoursBlocksDynamicZone =
  | ComponentBlocksOpeningDay
  | Error;

export type DropOffMapRelationResponseCollection = {
  __typename?: "DropOffMapRelationResponseCollection";
  data: Array<DropOffMapEntity>;
};

export type DropOffMapService = {
  __typename?: "DropOffMapService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  dropOffMaps?: Maybe<DropOffMapRelationResponseCollection>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type DropOffMapServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type DropOffMapServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type DropOffMapServiceDropOffMapsArgs = {
  filters?: InputMaybe<DropOffMapFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type DropOffMapServiceEntity = {
  __typename?: "DropOffMapServiceEntity";
  attributes?: Maybe<DropOffMapService>;
  id?: Maybe<Scalars["ID"]>;
};

export type DropOffMapServiceEntityResponse = {
  __typename?: "DropOffMapServiceEntityResponse";
  data?: Maybe<DropOffMapServiceEntity>;
};

export type DropOffMapServiceEntityResponseCollection = {
  __typename?: "DropOffMapServiceEntityResponseCollection";
  data: Array<DropOffMapServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type DropOffMapServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<DropOffMapServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dropOffMaps?: InputMaybe<DropOffMapFiltersInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<DropOffMapServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<DropOffMapServiceFiltersInput>>>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type DropOffMapServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  dropOffMaps?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type DropOffMapServiceRelationResponseCollection = {
  __typename?: "DropOffMapServiceRelationResponseCollection";
  data: Array<DropOffMapServiceEntity>;
};

export enum Enum_Accessibility_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Cgu_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Collectdoortodoor_Grammaticalgender {
  Feminin = "feminin",
  Masculin = "masculin",
}

export enum Enum_Collectdropoff_Grammaticalgender {
  Feminin = "feminin",
  Masculin = "masculin",
}

export enum Enum_Collectvoluntary_Grammaticalgender {
  Feminin = "feminin",
  Masculin = "masculin",
}

export enum Enum_Componentblockscheckbox_Fieldstatuscheckbox {
  Obligatoire = "Obligatoire",
  Optionnel = "Optionnel",
}

export enum Enum_Componentblockscommentary_Commentarystatus {
  Facultatif = "Facultatif",
  Obligatoire = "Obligatoire",
}

export enum Enum_Componentblocksdatechoice_Fieldstatus {
  Obligatoire = "Obligatoire",
  Optionnel = "Optionnel",
}

export enum Enum_Componentblocksopeningday_Weekday {
  Dimanche = "Dimanche",
  Jeudi = "Jeudi",
  Lundi = "Lundi",
  Mardi = "Mardi",
  Mercredi = "Mercredi",
  Samedi = "Samedi",
  Vendredi = "Vendredi",
}

export enum Enum_Componentblocksqcm_Fieldstatusqcm {
  Obligatoire = "Obligatoire",
  Optionnel = "Optionnel",
}

export enum Enum_Componentblocksquestions_Textstatus {
  Obligatoire = "Obligatoire",
  Optionnel = "Optionnel",
}

export enum Enum_Componentblocksrequestslotsexceptions_Exceptiontype {
  Daily = "daily",
  DateRange = "dateRange",
}

export enum Enum_Componentblockssubheading_Subheadingtag {
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

export enum Enum_Componentlinksdropoffmap_Pointtodisplayonthemap {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

export enum Enum_Componentlinksrequest_Demand {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
}

export enum Enum_Confidentiality_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Contactus_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Contract_Clienttype {
  City = "city",
  Epci = "epci",
  Union = "union",
}

export enum Enum_Contract_Contractstatus {
  Actif = "Actif",
  EnCours = "En_cours",
  Initialisation = "Initialisation",
}

export enum Enum_Cookie_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Editocontentdto_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Event_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Exportentity_Status {
  Finished = "Finished",
  InProgress = "In_progress",
  New = "New",
}

export enum Enum_Flow_Recyclinggesture {
  NoTrash = "no_trash",
  ToSort = "to_sort",
  ToTrash = "to_trash",
}

export enum Enum_Footer_Accessibilitylevel {
  Conform = "conform",
  NotConform = "not_conform",
  PartiallyConform = "partially_conform",
}

export enum Enum_Freecontent_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Mwcflow_Name {
  HouseholdWaste = "householdWaste",
  Packaging = "packaging",
}

export enum Enum_Mwcflow_Weighingsystem {
  Dynamic = "Dynamic",
  Outlet = "Outlet",
}

export enum Enum_New_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Pickupday_Periodicity {
  Hebdomadaire = "hebdomadaire",
  Mensuel = "mensuel",
}

export enum Enum_Quiz_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Tip_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Topcontentdto_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export enum Enum_Wasteform_Status {
  Archived = "archived",
  Draft = "draft",
  Published = "published",
}

export type EditoBlock = {
  __typename?: "EditoBlock";
  createdAt?: Maybe<Scalars["DateTime"]>;
  displayBlock: Scalars["Boolean"];
  editoContents?: Maybe<Array<Maybe<EditoBlockEditoContentsDynamicZone>>>;
  homepage?: Maybe<HomepageEntityResponse>;
  titleContent: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EditoBlockDto = {
  __typename?: "EditoBlockDTO";
  displayBlock: Scalars["Boolean"];
  editoContents?: Maybe<Array<Maybe<EditoContentDto>>>;
  id: Scalars["ID"];
  titleContent: Scalars["String"];
};

export type EditoBlockEditoContentsDynamicZone =
  | ComponentLinksEditoContent
  | Error;

export type EditoBlockEntity = {
  __typename?: "EditoBlockEntity";
  attributes?: Maybe<EditoBlock>;
  id?: Maybe<Scalars["ID"]>;
};

export type EditoBlockEntityResponse = {
  __typename?: "EditoBlockEntityResponse";
  data?: Maybe<EditoBlockEntity>;
};

export type EditoBlockEntityResponseCollection = {
  __typename?: "EditoBlockEntityResponseCollection";
  data: Array<EditoBlockEntity>;
  meta: ResponseCollectionMeta;
};

export type EditoBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EditoBlockFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  displayBlock?: InputMaybe<BooleanFilterInput>;
  homepage?: InputMaybe<HomepageFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<EditoBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EditoBlockFiltersInput>>>;
  titleContent?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EditoBlockInput = {
  displayBlock?: InputMaybe<Scalars["Boolean"]>;
  editoContents?: InputMaybe<
    Array<Scalars["EditoBlockEditoContentsDynamicZoneInput"]>
  >;
  homepage?: InputMaybe<Scalars["ID"]>;
  titleContent?: InputMaybe<Scalars["String"]>;
};

export type EditoContentDto = {
  __typename?: "EditoContentDTO";
  attributes: EditoContentDtoAttributes;
  componentId?: Maybe<Scalars["ID"]>;
  contentType: Scalars["String"];
  id: Scalars["ID"];
  typeName: Scalars["String"];
  uniqueId: Scalars["ID"];
};

export type EditoContentDtoAttributes = {
  __typename?: "EditoContentDTOAttributes";
  publishedDate?: Maybe<Scalars["DateTime"]>;
  status?: Maybe<Enum_Editocontentdto_Status>;
  title: Scalars["String"];
};

export type EditorialService = {
  __typename?: "EditorialService";
  accessibilitySubService?: Maybe<AccessibilitySubServiceEntityResponse>;
  cguSubService?: Maybe<CguSubServiceEntityResponse>;
  cities?: Maybe<CityRelationResponseCollection>;
  confidentialitySubService?: Maybe<ConfidentialitySubServiceEntityResponse>;
  contactUsSubService?: Maybe<ContactUsSubServiceEntityResponse>;
  contract?: Maybe<ContractEntityResponse>;
  cookiesSubService?: Maybe<CookiesSubServiceEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  eventSubService?: Maybe<EventSubServiceEntityResponse>;
  freeContentSubServices?: Maybe<FreeContentSubServiceRelationResponseCollection>;
  newsSubService?: Maybe<NewsSubServiceEntityResponse>;
  quizSubService?: Maybe<QuizSubServiceEntityResponse>;
  tipSubService?: Maybe<TipSubServiceEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EditorialServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EditorialServiceFreeContentSubServicesArgs = {
  filters?: InputMaybe<FreeContentSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EditorialServiceEntity = {
  __typename?: "EditorialServiceEntity";
  attributes?: Maybe<EditorialService>;
  id?: Maybe<Scalars["ID"]>;
};

export type EditorialServiceEntityResponse = {
  __typename?: "EditorialServiceEntityResponse";
  data?: Maybe<EditorialServiceEntity>;
};

export type EditorialServiceEntityResponseCollection = {
  __typename?: "EditorialServiceEntityResponseCollection";
  data: Array<EditorialServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type EditorialServiceFiltersInput = {
  accessibilitySubService?: InputMaybe<AccessibilitySubServiceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<EditorialServiceFiltersInput>>>;
  cguSubService?: InputMaybe<CguSubServiceFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  confidentialitySubService?: InputMaybe<ConfidentialitySubServiceFiltersInput>;
  contactUsSubService?: InputMaybe<ContactUsSubServiceFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  cookiesSubService?: InputMaybe<CookiesSubServiceFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  eventSubService?: InputMaybe<EventSubServiceFiltersInput>;
  freeContentSubServices?: InputMaybe<FreeContentSubServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  newsSubService?: InputMaybe<NewsSubServiceFiltersInput>;
  not?: InputMaybe<EditorialServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EditorialServiceFiltersInput>>>;
  quizSubService?: InputMaybe<QuizSubServiceFiltersInput>;
  tipSubService?: InputMaybe<TipSubServiceFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EditorialServiceInput = {
  accessibilitySubService?: InputMaybe<Scalars["ID"]>;
  cguSubService?: InputMaybe<Scalars["ID"]>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  confidentialitySubService?: InputMaybe<Scalars["ID"]>;
  contactUsSubService?: InputMaybe<Scalars["ID"]>;
  contract?: InputMaybe<Scalars["ID"]>;
  cookiesSubService?: InputMaybe<Scalars["ID"]>;
  eventSubService?: InputMaybe<Scalars["ID"]>;
  freeContentSubServices?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  newsSubService?: InputMaybe<Scalars["ID"]>;
  quizSubService?: InputMaybe<Scalars["ID"]>;
  tipSubService?: InputMaybe<Scalars["ID"]>;
};

export type Epci = {
  __typename?: "Epci";
  cities?: Maybe<CityEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  name?: Maybe<Scalars["String"]>;
  territories?: Maybe<TerritoryRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EpciTerritoriesArgs = {
  filters?: InputMaybe<TerritoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EpciEntity = {
  __typename?: "EpciEntity";
  attributes?: Maybe<Epci>;
  id?: Maybe<Scalars["ID"]>;
};

export type EpciEntityResponse = {
  __typename?: "EpciEntityResponse";
  data?: Maybe<EpciEntity>;
};

export type EpciEntityResponseCollection = {
  __typename?: "EpciEntityResponseCollection";
  data: Array<EpciEntity>;
  meta: ResponseCollectionMeta;
};

export type EpciFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EpciFiltersInput>>>;
  cities?: InputMaybe<CityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EpciFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EpciFiltersInput>>>;
  territories?: InputMaybe<TerritoryFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EpciInput = {
  cities?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  territories?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type EpciRelationResponseCollection = {
  __typename?: "EpciRelationResponseCollection";
  data: Array<EpciEntity>;
};

export type Error = {
  __typename?: "Error";
  code: Scalars["String"];
  message?: Maybe<Scalars["String"]>;
};

export type Event = {
  __typename?: "Event";
  blocks?: Maybe<Array<Maybe<EventBlocksDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  documents?: Maybe<DocumentRelationResponseCollection>;
  draftCreationId?: Maybe<Scalars["String"]>;
  eventSubService?: Maybe<EventSubServiceEntityResponse>;
  events?: Maybe<EventRelationResponseCollection>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  image: UploadFileEntityResponse;
  linkToServices?: Maybe<Array<Maybe<EventLinkToServicesDynamicZone>>>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  shortDescription?: Maybe<Scalars["String"]>;
  status?: Maybe<Enum_Event_Status>;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars["String"];
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  unpublishedDate?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type EventDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventBlocksDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksImage
  | ComponentBlocksSubHeading
  | ComponentBlocksVideo
  | ComponentBlocksWysiwyg
  | Error;

export type EventEntity = {
  __typename?: "EventEntity";
  attributes?: Maybe<Event>;
  id?: Maybe<Scalars["ID"]>;
};

export type EventEntityResponse = {
  __typename?: "EventEntityResponse";
  data?: Maybe<EventEntity>;
};

export type EventEntityResponseCollection = {
  __typename?: "EventEntityResponseCollection";
  data: Array<EventEntity>;
  meta: ResponseCollectionMeta;
};

export type EventFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  documents?: InputMaybe<DocumentFiltersInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  eventSubService?: InputMaybe<EventSubServiceFiltersInput>;
  events?: InputMaybe<EventFiltersInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<EventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  shortDescription?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  unpublishedDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type EventInput = {
  blocks?: InputMaybe<Array<Scalars["EventBlocksDynamicZoneInput"]>>;
  customId?: InputMaybe<Scalars["String"]>;
  documents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  eventSubService?: InputMaybe<Scalars["ID"]>;
  events?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  image?: InputMaybe<Scalars["ID"]>;
  linkToServices?: InputMaybe<
    Array<Scalars["EventLinkToServicesDynamicZoneInput"]>
  >;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  shortDescription?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Enum_Event_Status>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  unpublishedDate?: InputMaybe<Scalars["DateTime"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type EventLinkToServicesDynamicZone =
  | ComponentLinksAlertNotification
  | ComponentLinksDropOffMap
  | ComponentLinksEditorial
  | ComponentLinksPickUpDay
  | ComponentLinksRecyclingGuide
  | ComponentLinksRequest
  | Error;

export type EventOrNews = {
  __typename?: "EventOrNews";
  image?: Maybe<UploadFile>;
  originalId: Scalars["ID"];
  publishedDate: Scalars["DateTime"];
  shortDescription?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  title: Scalars["String"];
  type: EventsOrNewsType;
};

export type EventRelationResponseCollection = {
  __typename?: "EventRelationResponseCollection";
  data: Array<EventEntity>;
};

export type EventSubService = {
  __typename?: "EventSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  endDate?: Maybe<Scalars["Date"]>;
  events?: Maybe<EventRelationResponseCollection>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EventSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventSubServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventSubServiceEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventSubServiceEntity = {
  __typename?: "EventSubServiceEntity";
  attributes?: Maybe<EventSubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type EventSubServiceEntityResponse = {
  __typename?: "EventSubServiceEntityResponse";
  data?: Maybe<EventSubServiceEntity>;
};

export type EventSubServiceEntityResponseCollection = {
  __typename?: "EventSubServiceEntityResponseCollection";
  data: Array<EventSubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type EventSubServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EventSubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  endDate?: InputMaybe<DateFilterInput>;
  events?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EventSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventSubServiceFiltersInput>>>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  events?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type EventSubServiceRelationResponseCollection = {
  __typename?: "EventSubServiceRelationResponseCollection";
  data: Array<EventSubServiceEntity>;
};

export enum EventsOrNewsType {
  Event = "event",
  New = "new",
}

export type ExportEntity = {
  __typename?: "ExportEntity";
  createdAt?: Maybe<Scalars["DateTime"]>;
  displayName?: Maybe<Scalars["String"]>;
  filePath?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  status?: Maybe<Enum_Exportentity_Status>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ExportEntityEntity = {
  __typename?: "ExportEntityEntity";
  attributes?: Maybe<ExportEntity>;
  id?: Maybe<Scalars["ID"]>;
};

export type ExportEntityEntityResponse = {
  __typename?: "ExportEntityEntityResponse";
  data?: Maybe<ExportEntityEntity>;
};

export type ExportEntityEntityResponseCollection = {
  __typename?: "ExportEntityEntityResponseCollection";
  data: Array<ExportEntityEntity>;
  meta: ResponseCollectionMeta;
};

export type ExportEntityFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ExportEntityFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  displayName?: InputMaybe<StringFilterInput>;
  filePath?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ExportEntityFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ExportEntityFiltersInput>>>;
  status?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ExportEntityInput = {
  displayName?: InputMaybe<Scalars["String"]>;
  filePath?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Enum_Exportentity_Status>;
};

export type File = {
  __typename?: "File";
  id: Scalars["Int"];
  name: Scalars["String"];
  url: Scalars["String"];
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  folder?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Files = {
  __typename?: "Files";
  alternativeText?: Maybe<Scalars["String"]>;
  folderPath?: Maybe<Scalars["String"]>;
  formats?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  mime?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
};

export type FloatFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  contains?: InputMaybe<Scalars["Float"]>;
  containsi?: InputMaybe<Scalars["Float"]>;
  endsWith?: InputMaybe<Scalars["Float"]>;
  eq?: InputMaybe<Scalars["Float"]>;
  eqi?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  ne?: InputMaybe<Scalars["Float"]>;
  not?: InputMaybe<FloatFilterInput>;
  notContains?: InputMaybe<Scalars["Float"]>;
  notContainsi?: InputMaybe<Scalars["Float"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Float"]>>>;
  startsWith?: InputMaybe<Scalars["Float"]>;
};

export type Flow = {
  __typename?: "Flow";
  code?: Maybe<Scalars["String"]>;
  collectDoorToDoors?: Maybe<CollectDoorToDoorRelationResponseCollection>;
  collectDropOffs?: Maybe<CollectDropOffRelationResponseCollection>;
  collectVoluntaries?: Maybe<CollectVoluntaryRelationResponseCollection>;
  color?: Maybe<FlowColorEntityResponse>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  isActivated?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  pickUpDays?: Maybe<PickUpDayRelationResponseCollection>;
  recyclingGesture: Enum_Flow_Recyclinggesture;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  wasteForms?: Maybe<WasteFormRelationResponseCollection>;
};

export type FlowCollectDoorToDoorsArgs = {
  filters?: InputMaybe<CollectDoorToDoorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FlowCollectDropOffsArgs = {
  filters?: InputMaybe<CollectDropOffFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FlowCollectVoluntariesArgs = {
  filters?: InputMaybe<CollectVoluntaryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FlowPickUpDaysArgs = {
  filters?: InputMaybe<PickUpDayFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FlowWasteFormsArgs = {
  filters?: InputMaybe<WasteFormFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FlowColor = {
  __typename?: "FlowColor";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  hexaCode: Scalars["String"];
  name: Scalars["String"];
  shouldChangeHexaCode: Scalars["Boolean"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type FlowColorEntity = {
  __typename?: "FlowColorEntity";
  attributes?: Maybe<FlowColor>;
  id?: Maybe<Scalars["ID"]>;
};

export type FlowColorEntityResponse = {
  __typename?: "FlowColorEntityResponse";
  data?: Maybe<FlowColorEntity>;
};

export type FlowColorEntityResponseCollection = {
  __typename?: "FlowColorEntityResponseCollection";
  data: Array<FlowColorEntity>;
  meta: ResponseCollectionMeta;
};

export type FlowColorFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FlowColorFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  hexaCode?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<FlowColorFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FlowColorFiltersInput>>>;
  shouldChangeHexaCode?: InputMaybe<BooleanFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FlowColorInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  hexaCode?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  shouldChangeHexaCode?: InputMaybe<Scalars["Boolean"]>;
};

export type FlowEntity = {
  __typename?: "FlowEntity";
  attributes?: Maybe<Flow>;
  id?: Maybe<Scalars["ID"]>;
};

export type FlowEntityResponse = {
  __typename?: "FlowEntityResponse";
  data?: Maybe<FlowEntity>;
};

export type FlowEntityResponseCollection = {
  __typename?: "FlowEntityResponseCollection";
  data: Array<FlowEntity>;
  meta: ResponseCollectionMeta;
};

export type FlowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FlowFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  collectDoorToDoors?: InputMaybe<CollectDoorToDoorFiltersInput>;
  collectDropOffs?: InputMaybe<CollectDropOffFiltersInput>;
  collectVoluntaries?: InputMaybe<CollectVoluntaryFiltersInput>;
  color?: InputMaybe<FlowColorFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<FlowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FlowFiltersInput>>>;
  pickUpDays?: InputMaybe<PickUpDayFiltersInput>;
  recyclingGesture?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  wasteForms?: InputMaybe<WasteFormFiltersInput>;
};

export type FlowInput = {
  code?: InputMaybe<Scalars["String"]>;
  collectDoorToDoors?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  collectDropOffs?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  collectVoluntaries?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  color?: InputMaybe<Scalars["ID"]>;
  contract?: InputMaybe<Scalars["ID"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  pickUpDays?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  recyclingGesture?: InputMaybe<Enum_Flow_Recyclinggesture>;
  wasteForms?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type FlowRelationResponseCollection = {
  __typename?: "FlowRelationResponseCollection";
  data: Array<FlowEntity>;
};

export type Folders = {
  __typename?: "Folders";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  path?: Maybe<Scalars["String"]>;
  pathId?: Maybe<Scalars["String"]>;
};

export type Footer = {
  __typename?: "Footer";
  accessibilityLevel?: Maybe<Enum_Footer_Accessibilitylevel>;
  accessibilitySubService?: Maybe<AccessibilitySubServiceEntityResponse>;
  cguSubService?: Maybe<CguSubServiceEntityResponse>;
  confidentialitySubService?: Maybe<ConfidentialitySubServiceEntityResponse>;
  contactUsSubService?: Maybe<ContactUsSubServiceEntityResponse>;
  contractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  cookiesSubService?: Maybe<CookiesSubServiceEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type FooterEntity = {
  __typename?: "FooterEntity";
  attributes?: Maybe<Footer>;
  id?: Maybe<Scalars["ID"]>;
};

export type FooterEntityResponse = {
  __typename?: "FooterEntityResponse";
  data?: Maybe<FooterEntity>;
};

export type FooterEntityResponseCollection = {
  __typename?: "FooterEntityResponseCollection";
  data: Array<FooterEntity>;
  meta: ResponseCollectionMeta;
};

export type FooterFiltersInput = {
  accessibilityLevel?: InputMaybe<StringFilterInput>;
  accessibilitySubService?: InputMaybe<AccessibilitySubServiceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<FooterFiltersInput>>>;
  cguSubService?: InputMaybe<CguSubServiceFiltersInput>;
  confidentialitySubService?: InputMaybe<ConfidentialitySubServiceFiltersInput>;
  contactUsSubService?: InputMaybe<ContactUsSubServiceFiltersInput>;
  contractCustomization?: InputMaybe<ContractCustomizationFiltersInput>;
  cookiesSubService?: InputMaybe<CookiesSubServiceFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<FooterFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FooterFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FooterInput = {
  accessibilityLevel?: InputMaybe<Enum_Footer_Accessibilitylevel>;
  accessibilitySubService?: InputMaybe<Scalars["ID"]>;
  cguSubService?: InputMaybe<Scalars["ID"]>;
  confidentialitySubService?: InputMaybe<Scalars["ID"]>;
  contactUsSubService?: InputMaybe<Scalars["ID"]>;
  contractCustomization?: InputMaybe<Scalars["ID"]>;
  cookiesSubService?: InputMaybe<Scalars["ID"]>;
};

export type FreeContent = {
  __typename?: "FreeContent";
  blocks?: Maybe<Array<Maybe<FreeContentBlocksDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  freeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  image: UploadFileEntityResponse;
  linkToServices?: Maybe<Array<Maybe<FreeContentLinkToServicesDynamicZone>>>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  shortDescription?: Maybe<Scalars["String"]>;
  status?: Maybe<Enum_Freecontent_Status>;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars["String"];
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  unpublishedDate?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type FreeContentTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FreeContentBlocksDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksImage
  | ComponentBlocksSubHeading
  | ComponentBlocksVideo
  | ComponentBlocksWysiwyg
  | Error;

export type FreeContentEntity = {
  __typename?: "FreeContentEntity";
  attributes?: Maybe<FreeContent>;
  id?: Maybe<Scalars["ID"]>;
};

export type FreeContentEntityResponse = {
  __typename?: "FreeContentEntityResponse";
  data?: Maybe<FreeContentEntity>;
};

export type FreeContentEntityResponseCollection = {
  __typename?: "FreeContentEntityResponseCollection";
  data: Array<FreeContentEntity>;
  meta: ResponseCollectionMeta;
};

export type FreeContentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FreeContentFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  freeContentSubService?: InputMaybe<FreeContentSubServiceFiltersInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<FreeContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FreeContentFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  shortDescription?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  unpublishedDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type FreeContentInput = {
  blocks?: InputMaybe<Array<Scalars["FreeContentBlocksDynamicZoneInput"]>>;
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  freeContentSubService?: InputMaybe<Scalars["ID"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  image?: InputMaybe<Scalars["ID"]>;
  linkToServices?: InputMaybe<
    Array<Scalars["FreeContentLinkToServicesDynamicZoneInput"]>
  >;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  shortDescription?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Enum_Freecontent_Status>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  unpublishedDate?: InputMaybe<Scalars["DateTime"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type FreeContentLinkToServicesDynamicZone =
  | ComponentLinksAlertNotification
  | ComponentLinksDropOffMap
  | ComponentLinksEditorial
  | ComponentLinksPickUpDay
  | ComponentLinksRecyclingGuide
  | ComponentLinksRequest
  | Error;

export type FreeContentRelationResponseCollection = {
  __typename?: "FreeContentRelationResponseCollection";
  data: Array<FreeContentEntity>;
};

export type FreeContentSubService = {
  __typename?: "FreeContentSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  endDate?: Maybe<Scalars["Date"]>;
  freeContents?: Maybe<FreeContentRelationResponseCollection>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type FreeContentSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FreeContentSubServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FreeContentSubServiceFreeContentsArgs = {
  filters?: InputMaybe<FreeContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FreeContentSubServiceEntity = {
  __typename?: "FreeContentSubServiceEntity";
  attributes?: Maybe<FreeContentSubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type FreeContentSubServiceEntityResponse = {
  __typename?: "FreeContentSubServiceEntityResponse";
  data?: Maybe<FreeContentSubServiceEntity>;
};

export type FreeContentSubServiceEntityResponseCollection = {
  __typename?: "FreeContentSubServiceEntityResponseCollection";
  data: Array<FreeContentSubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type FreeContentSubServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<FreeContentSubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  endDate?: InputMaybe<DateFilterInput>;
  freeContents?: InputMaybe<FreeContentFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<FreeContentSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FreeContentSubServiceFiltersInput>>>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FreeContentSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  freeContents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type FreeContentSubServiceRelationResponseCollection = {
  __typename?: "FreeContentSubServiceRelationResponseCollection";
  data: Array<FreeContentSubServiceEntity>;
};

export type GenericMorph =
  | Accessibility
  | AccessibilitySubService
  | AlertNotification
  | AlertNotificationService
  | AudienceType
  | Cgu
  | CguSubService
  | ChannelType
  | City
  | ClientContact
  | CollectDoorToDoor
  | CollectDropOff
  | CollectVoluntary
  | ComponentBlocksAttachments
  | ComponentBlocksCheckbox
  | ComponentBlocksCommentary
  | ComponentBlocksCumbersome
  | ComponentBlocksDateChoice
  | ComponentBlocksDownloadBlock
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksImage
  | ComponentBlocksOpeningDay
  | ComponentBlocksProofOfReceipt
  | ComponentBlocksQcm
  | ComponentBlocksQuestions
  | ComponentBlocksRequestSlotsExceptions
  | ComponentBlocksRequestType
  | ComponentBlocksSubHeading
  | ComponentBlocksTest
  | ComponentBlocksVideo
  | ComponentBlocksWysiwyg
  | ComponentLinksAlertNotification
  | ComponentLinksContactUs
  | ComponentLinksDropOffMap
  | ComponentLinksEditoContent
  | ComponentLinksEditorial
  | ComponentLinksEvents
  | ComponentLinksExternal
  | ComponentLinksFrees
  | ComponentLinksKeyMetrics
  | ComponentLinksMyWasteCounter
  | ComponentLinksNews
  | ComponentLinksPickUpDay
  | ComponentLinksQuizzes
  | ComponentLinksRecyclingGuide
  | ComponentLinksRequest
  | ComponentLinksTips
  | ComponentLinksTopContent
  | Confidentiality
  | ConfidentialitySubService
  | ContactUs
  | ContactUsSubService
  | Contract
  | ContractCustomization
  | ContractMenu
  | Cookie
  | CookiesSubService
  | DescriptionService
  | Document
  | DropOffMap
  | DropOffMapService
  | EditoBlock
  | EditorialService
  | Epci
  | Event
  | EventSubService
  | ExportEntity
  | Flow
  | FlowColor
  | Footer
  | FreeContent
  | FreeContentSubService
  | Global
  | Homepage
  | I18NLocale
  | InformationMessage
  | KeyMetric
  | KeyMetricsService
  | MwCounterService
  | MwcContact
  | MwcFlow
  | MyWasteCounter
  | New
  | NewsSubService
  | PickUpDay
  | PickUpDayService
  | Quiz
  | QuizAndTipsBlock
  | QuizSubService
  | RecyclingGuideBlock
  | RecyclingGuideService
  | Request
  | RequestAggregate
  | RequestService
  | RequestSlot
  | RequestTaked
  | SearchEngineBlock
  | Sectorization
  | ServicesBlock
  | Tag
  | Territory
  | TerritoryType
  | Tip
  | TipSubService
  | TopContentBlock
  | UploadFile
  | UploadFolder
  | UserDataStorage
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser
  | WasteFamily
  | WasteForm
  | YesWeScanService;

export type Global = {
  __typename?: "Global";
  createdAt?: Maybe<Scalars["DateTime"]>;
  favicon?: Maybe<UploadFileEntityResponse>;
  siteDescription: Scalars["String"];
  siteName: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type GlobalEntity = {
  __typename?: "GlobalEntity";
  attributes?: Maybe<Global>;
  id?: Maybe<Scalars["ID"]>;
};

export type GlobalEntityResponse = {
  __typename?: "GlobalEntityResponse";
  data?: Maybe<GlobalEntity>;
};

export type GlobalInput = {
  favicon?: InputMaybe<Scalars["ID"]>;
  siteDescription?: InputMaybe<Scalars["String"]>;
  siteName?: InputMaybe<Scalars["String"]>;
};

export type Homepage = {
  __typename?: "Homepage";
  contractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  editoBlock?: Maybe<EditoBlockEntityResponse>;
  quizAndTipsBlock?: Maybe<QuizAndTipsBlockEntityResponse>;
  recyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  searchEngineBlock?: Maybe<SearchEngineBlockEntityResponse>;
  servicesBlock?: Maybe<ServicesBlockEntityResponse>;
  topContentBlock?: Maybe<TopContentBlockEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type HomepageEntity = {
  __typename?: "HomepageEntity";
  attributes?: Maybe<Homepage>;
  id?: Maybe<Scalars["ID"]>;
};

export type HomepageEntityResponse = {
  __typename?: "HomepageEntityResponse";
  data?: Maybe<HomepageEntity>;
};

export type HomepageEntityResponseCollection = {
  __typename?: "HomepageEntityResponseCollection";
  data: Array<HomepageEntity>;
  meta: ResponseCollectionMeta;
};

export type HomepageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<HomepageFiltersInput>>>;
  contractCustomization?: InputMaybe<ContractCustomizationFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  editoBlock?: InputMaybe<EditoBlockFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<HomepageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<HomepageFiltersInput>>>;
  quizAndTipsBlock?: InputMaybe<QuizAndTipsBlockFiltersInput>;
  recyclingGuideBlock?: InputMaybe<RecyclingGuideBlockFiltersInput>;
  searchEngineBlock?: InputMaybe<SearchEngineBlockFiltersInput>;
  servicesBlock?: InputMaybe<ServicesBlockFiltersInput>;
  topContentBlock?: InputMaybe<TopContentBlockFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type HomepageInput = {
  contractCustomization?: InputMaybe<Scalars["ID"]>;
  editoBlock?: InputMaybe<Scalars["ID"]>;
  quizAndTipsBlock?: InputMaybe<Scalars["ID"]>;
  recyclingGuideBlock?: InputMaybe<Scalars["ID"]>;
  searchEngineBlock?: InputMaybe<Scalars["ID"]>;
  servicesBlock?: InputMaybe<Scalars["ID"]>;
  topContentBlock?: InputMaybe<Scalars["ID"]>;
};

export type I18NLocale = {
  __typename?: "I18NLocale";
  code?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type I18NLocaleEntity = {
  __typename?: "I18NLocaleEntity";
  attributes?: Maybe<I18NLocale>;
  id?: Maybe<Scalars["ID"]>;
};

export type I18NLocaleEntityResponse = {
  __typename?: "I18NLocaleEntityResponse";
  data?: Maybe<I18NLocaleEntity>;
};

export type I18NLocaleEntityResponseCollection = {
  __typename?: "I18NLocaleEntityResponseCollection";
  data: Array<I18NLocaleEntity>;
  meta: ResponseCollectionMeta;
};

export type I18NLocaleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  code?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<I18NLocaleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<I18NLocaleFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type IdFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contains?: InputMaybe<Scalars["ID"]>;
  containsi?: InputMaybe<Scalars["ID"]>;
  endsWith?: InputMaybe<Scalars["ID"]>;
  eq?: InputMaybe<Scalars["ID"]>;
  eqi?: InputMaybe<Scalars["ID"]>;
  gt?: InputMaybe<Scalars["ID"]>;
  gte?: InputMaybe<Scalars["ID"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  lt?: InputMaybe<Scalars["ID"]>;
  lte?: InputMaybe<Scalars["ID"]>;
  ne?: InputMaybe<Scalars["ID"]>;
  not?: InputMaybe<IdFilterInput>;
  notContains?: InputMaybe<Scalars["ID"]>;
  notContainsi?: InputMaybe<Scalars["ID"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  startsWith?: InputMaybe<Scalars["ID"]>;
};

export type InformationMessage = {
  __typename?: "InformationMessage";
  createdAt?: Maybe<Scalars["DateTime"]>;
  dateEnd?: Maybe<Scalars["String"]>;
  dateStart: Scalars["String"];
  infoMessage: Scalars["String"];
  pickUpDays?: Maybe<PickUpDayRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type InformationMessagePickUpDaysArgs = {
  filters?: InputMaybe<PickUpDayFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type InformationMessageEntity = {
  __typename?: "InformationMessageEntity";
  attributes?: Maybe<InformationMessage>;
  id?: Maybe<Scalars["ID"]>;
};

export type InformationMessageEntityResponse = {
  __typename?: "InformationMessageEntityResponse";
  data?: Maybe<InformationMessageEntity>;
};

export type InformationMessageEntityResponseCollection = {
  __typename?: "InformationMessageEntityResponseCollection";
  data: Array<InformationMessageEntity>;
  meta: ResponseCollectionMeta;
};

export type InformationMessageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<InformationMessageFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  dateEnd?: InputMaybe<StringFilterInput>;
  dateStart?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  infoMessage?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<InformationMessageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<InformationMessageFiltersInput>>>;
  pickUpDays?: InputMaybe<PickUpDayFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type InformationMessageInput = {
  dateEnd?: InputMaybe<Scalars["String"]>;
  dateStart?: InputMaybe<Scalars["String"]>;
  infoMessage?: InputMaybe<Scalars["String"]>;
  pickUpDays?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type IntFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  contains?: InputMaybe<Scalars["Int"]>;
  containsi?: InputMaybe<Scalars["Int"]>;
  endsWith?: InputMaybe<Scalars["Int"]>;
  eq?: InputMaybe<Scalars["Int"]>;
  eqi?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  ne?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<IntFilterInput>;
  notContains?: InputMaybe<Scalars["Int"]>;
  notContainsi?: InputMaybe<Scalars["Int"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Int"]>>>;
  startsWith?: InputMaybe<Scalars["Int"]>;
};

export type JsonFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  contains?: InputMaybe<Scalars["JSON"]>;
  containsi?: InputMaybe<Scalars["JSON"]>;
  endsWith?: InputMaybe<Scalars["JSON"]>;
  eq?: InputMaybe<Scalars["JSON"]>;
  eqi?: InputMaybe<Scalars["JSON"]>;
  gt?: InputMaybe<Scalars["JSON"]>;
  gte?: InputMaybe<Scalars["JSON"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  lt?: InputMaybe<Scalars["JSON"]>;
  lte?: InputMaybe<Scalars["JSON"]>;
  ne?: InputMaybe<Scalars["JSON"]>;
  not?: InputMaybe<JsonFilterInput>;
  notContains?: InputMaybe<Scalars["JSON"]>;
  notContainsi?: InputMaybe<Scalars["JSON"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["JSON"]>>>;
  startsWith?: InputMaybe<Scalars["JSON"]>;
};

export type KeyMetric = {
  __typename?: "KeyMetric";
  createdAt?: Maybe<Scalars["DateTime"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type KeyMetricEntity = {
  __typename?: "KeyMetricEntity";
  attributes?: Maybe<KeyMetric>;
  id?: Maybe<Scalars["ID"]>;
};

export type KeyMetricEntityResponse = {
  __typename?: "KeyMetricEntityResponse";
  data?: Maybe<KeyMetricEntity>;
};

export type KeyMetricEntityResponseCollection = {
  __typename?: "KeyMetricEntityResponseCollection";
  data: Array<KeyMetricEntity>;
  meta: ResponseCollectionMeta;
};

export type KeyMetricFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<KeyMetricFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<KeyMetricFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<KeyMetricFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type KeyMetricInput = {
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  title?: InputMaybe<Scalars["String"]>;
};

export type KeyMetricRelationResponseCollection = {
  __typename?: "KeyMetricRelationResponseCollection";
  data: Array<KeyMetricEntity>;
};

export type KeyMetricsService = {
  __typename?: "KeyMetricsService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  keyMetrics?: Maybe<KeyMetricRelationResponseCollection>;
  name: Scalars["String"];
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type KeyMetricsServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type KeyMetricsServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type KeyMetricsServiceKeyMetricsArgs = {
  filters?: InputMaybe<KeyMetricFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type KeyMetricsServiceEntity = {
  __typename?: "KeyMetricsServiceEntity";
  attributes?: Maybe<KeyMetricsService>;
  id?: Maybe<Scalars["ID"]>;
};

export type KeyMetricsServiceEntityResponse = {
  __typename?: "KeyMetricsServiceEntityResponse";
  data?: Maybe<KeyMetricsServiceEntity>;
};

export type KeyMetricsServiceEntityResponseCollection = {
  __typename?: "KeyMetricsServiceEntityResponseCollection";
  data: Array<KeyMetricsServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type KeyMetricsServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<KeyMetricsServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  keyMetrics?: InputMaybe<KeyMetricFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<KeyMetricsServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<KeyMetricsServiceFiltersInput>>>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type KeyMetricsServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  keyMetrics?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type KeyMetricsServiceRelationResponseCollection = {
  __typename?: "KeyMetricsServiceRelationResponseCollection";
  data: Array<KeyMetricsServiceEntity>;
};

export type LongFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["Long"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["Long"]>>>;
  contains?: InputMaybe<Scalars["Long"]>;
  containsi?: InputMaybe<Scalars["Long"]>;
  endsWith?: InputMaybe<Scalars["Long"]>;
  eq?: InputMaybe<Scalars["Long"]>;
  eqi?: InputMaybe<Scalars["Long"]>;
  gt?: InputMaybe<Scalars["Long"]>;
  gte?: InputMaybe<Scalars["Long"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["Long"]>>>;
  lt?: InputMaybe<Scalars["Long"]>;
  lte?: InputMaybe<Scalars["Long"]>;
  ne?: InputMaybe<Scalars["Long"]>;
  not?: InputMaybe<LongFilterInput>;
  notContains?: InputMaybe<Scalars["Long"]>;
  notContainsi?: InputMaybe<Scalars["Long"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["Long"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["Long"]>>>;
  startsWith?: InputMaybe<Scalars["Long"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addCommuneToContract?: Maybe<ContractEntity>;
  bulkDeleteMedias?: Maybe<Array<Maybe<DeletedMessage>>>;
  bulkMoveMedias?: Maybe<Array<Maybe<RequestFileOrFolder>>>;
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  channelsActivation?: Maybe<Array<Maybe<ActivationAndService>>>;
  channelsDeactivation?: Maybe<Deactivation>;
  checkUnpublishedDate?: Maybe<Scalars["Boolean"]>;
  createAccessibility?: Maybe<AccessibilityEntityResponse>;
  createAccessibilitySubService?: Maybe<AccessibilitySubServiceEntityResponse>;
  createAlertNotification?: Maybe<AlertNotificationEntityResponse>;
  createAlertNotificationService?: Maybe<AlertNotificationServiceEntityResponse>;
  createAudienceType?: Maybe<AudienceTypeEntityResponse>;
  createCgu?: Maybe<CguEntityResponse>;
  createCguSubService?: Maybe<CguSubServiceEntityResponse>;
  createChannelType?: Maybe<ChannelTypeEntityResponse>;
  createCity?: Maybe<CityEntityResponse>;
  createClientContact?: Maybe<ClientContactEntityResponse>;
  createCollectDoorToDoor?: Maybe<CollectDoorToDoorEntityResponse>;
  createCollectDropOff?: Maybe<CollectDropOffEntityResponse>;
  createCollectVoluntary?: Maybe<CollectVoluntaryEntityResponse>;
  createConfidentiality?: Maybe<ConfidentialityEntityResponse>;
  createConfidentialitySubService?: Maybe<ConfidentialitySubServiceEntityResponse>;
  createContactUs?: Maybe<ContactUsEntityResponse>;
  createContactUsSubService?: Maybe<ContactUsSubServiceEntityResponse>;
  createContentTypeForContractId?: Maybe<FreeContentSubServiceEntity>;
  createContract?: Maybe<ContractEntityResponse>;
  createContractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  createContractMenu?: Maybe<ContractMenuEntityResponse>;
  createCookie?: Maybe<CookieEntityResponse>;
  createCookiesSubService?: Maybe<CookiesSubServiceEntityResponse>;
  createDescriptionService?: Maybe<DescriptionServiceEntityResponse>;
  createDocument?: Maybe<DocumentEntityResponse>;
  createDropOffMap?: Maybe<DropOffMapEntityResponse>;
  createDropOffMapService?: Maybe<DropOffMapServiceEntityResponse>;
  createEditoBlock?: Maybe<EditoBlockEntityResponse>;
  createEditorialService?: Maybe<EditorialServiceEntityResponse>;
  createEmptyContract?: Maybe<Array<Maybe<ContractAndClientContact>>>;
  createEpci?: Maybe<EpciEntityResponse>;
  createEvent?: Maybe<EventEntityResponse>;
  createEventSubService?: Maybe<EventSubServiceEntityResponse>;
  createExportEntity?: Maybe<ExportEntityEntityResponse>;
  createFlow?: Maybe<FlowEntityResponse>;
  createFlowColor?: Maybe<FlowColorEntityResponse>;
  createFooter?: Maybe<FooterEntityResponse>;
  createFreeContent?: Maybe<FreeContentEntityResponse>;
  createFreeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  createHomepage?: Maybe<HomepageEntityResponse>;
  createInformationMessage?: Maybe<InformationMessageEntityResponse>;
  createKeyMetric?: Maybe<KeyMetricEntityResponse>;
  createKeyMetricsService?: Maybe<KeyMetricsServiceEntityResponse>;
  createMwCounterService?: Maybe<MwCounterServiceEntityResponse>;
  createMwcContact?: Maybe<MwcContactEntityResponse>;
  createMwcFlow?: Maybe<MwcFlowEntityResponse>;
  createMyWasteCounter?: Maybe<MyWasteCounterEntityResponse>;
  createNew?: Maybe<NewEntityResponse>;
  createNewFolder?: Maybe<RequestFolderEntity>;
  createNewTag?: Maybe<RequestTagEntity>;
  createNewsSubService?: Maybe<NewsSubServiceEntityResponse>;
  createPickUpDay?: Maybe<PickUpDayEntityResponse>;
  createPickUpDayService?: Maybe<PickUpDayServiceEntityResponse>;
  createQuiz?: Maybe<QuizEntityResponse>;
  createQuizAndTipsBlock?: Maybe<QuizAndTipsBlockEntityResponse>;
  createQuizSubService?: Maybe<QuizSubServiceEntityResponse>;
  createRecyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  createRecyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  createRequest?: Maybe<RequestEntityResponse>;
  createRequestAggregate?: Maybe<RequestAggregateEntityResponse>;
  createRequestService?: Maybe<RequestServiceEntityResponse>;
  createRequestSlot?: Maybe<RequestSlotEntityResponse>;
  createRequestTaked?: Maybe<RequestTakedEntityResponse>;
  createSearchEngineBlock?: Maybe<SearchEngineBlockEntityResponse>;
  createSectorization?: Maybe<SectorizationEntityResponse>;
  createServicesBlock?: Maybe<ServicesBlockEntityResponse>;
  createTag?: Maybe<TagEntityResponse>;
  createTerritory?: Maybe<TerritoryEntityResponse>;
  createTerritoryType?: Maybe<TerritoryTypeEntityResponse>;
  createTip?: Maybe<TipEntityResponse>;
  createTipSubService?: Maybe<TipSubServiceEntityResponse>;
  createTopContentBlock?: Maybe<TopContentBlockEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  createUserDataStorage?: Maybe<UserDataStorageEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  createWasteFamily?: Maybe<WasteFamilyEntityResponse>;
  createWasteForm?: Maybe<WasteFormEntityResponse>;
  createYesWeScanService?: Maybe<YesWeScanServiceEntityResponse>;
  createYwsService?: Maybe<Scalars["Boolean"]>;
  deleteAccessibility?: Maybe<AccessibilityEntityResponse>;
  deleteAccessibilitySubService?: Maybe<AccessibilitySubServiceEntityResponse>;
  deleteAlertNotification?: Maybe<AlertNotificationEntityResponse>;
  deleteAlertNotificationService?: Maybe<AlertNotificationServiceEntityResponse>;
  deleteAudienceType?: Maybe<AudienceTypeEntityResponse>;
  deleteCgu?: Maybe<CguEntityResponse>;
  deleteCguSubService?: Maybe<CguSubServiceEntityResponse>;
  deleteChannelType?: Maybe<ChannelTypeEntityResponse>;
  deleteCity?: Maybe<CityEntityResponse>;
  deleteClientContact?: Maybe<ClientContactEntityResponse>;
  deleteCollectDoorToDoor?: Maybe<CollectDoorToDoorEntityResponse>;
  deleteCollectDropOff?: Maybe<CollectDropOffEntityResponse>;
  deleteCollectVoluntary?: Maybe<CollectVoluntaryEntityResponse>;
  deleteConfidentiality?: Maybe<ConfidentialityEntityResponse>;
  deleteConfidentialitySubService?: Maybe<ConfidentialitySubServiceEntityResponse>;
  deleteContactUs?: Maybe<ContactUsEntityResponse>;
  deleteContactUsSubService?: Maybe<ContactUsSubServiceEntityResponse>;
  deleteContent?: Maybe<Scalars["Boolean"]>;
  deleteContract?: Maybe<ContractEntityResponse>;
  deleteContractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  deleteContractMenu?: Maybe<ContractMenuEntityResponse>;
  deleteCookie?: Maybe<CookieEntityResponse>;
  deleteCookiesSubService?: Maybe<CookiesSubServiceEntityResponse>;
  deleteDescriptionService?: Maybe<DescriptionServiceEntityResponse>;
  deleteDocument?: Maybe<DocumentEntityResponse>;
  deleteDropOffMap?: Maybe<DropOffMapEntityResponse>;
  deleteDropOffMapService?: Maybe<DropOffMapServiceEntityResponse>;
  deleteEditoBlock?: Maybe<EditoBlockEntityResponse>;
  deleteEditorialService?: Maybe<EditorialServiceEntityResponse>;
  deleteEpci?: Maybe<EpciEntityResponse>;
  deleteEvent?: Maybe<EventEntityResponse>;
  deleteEventSubService?: Maybe<EventSubServiceEntityResponse>;
  deleteExportEntity?: Maybe<ExportEntityEntityResponse>;
  deleteFlow?: Maybe<FlowEntityResponse>;
  deleteFlowColor?: Maybe<FlowColorEntityResponse>;
  deleteFooter?: Maybe<FooterEntityResponse>;
  deleteFreeContent?: Maybe<FreeContentEntityResponse>;
  deleteFreeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  deleteGlobal?: Maybe<GlobalEntityResponse>;
  deleteHomepage?: Maybe<HomepageEntityResponse>;
  deleteInformationMessage?: Maybe<InformationMessageEntityResponse>;
  deleteKeyMetric?: Maybe<KeyMetricEntityResponse>;
  deleteKeyMetricsService?: Maybe<KeyMetricsServiceEntityResponse>;
  deleteMwCounterService?: Maybe<MwCounterServiceEntityResponse>;
  deleteMwcContact?: Maybe<MwcContactEntityResponse>;
  deleteMwcFlow?: Maybe<MwcFlowEntityResponse>;
  deleteMyWasteCounter?: Maybe<MyWasteCounterEntityResponse>;
  deleteNew?: Maybe<NewEntityResponse>;
  deleteNewsSubService?: Maybe<NewsSubServiceEntityResponse>;
  deletePickUpDay?: Maybe<PickUpDayEntityResponse>;
  deletePickUpDayService?: Maybe<PickUpDayServiceEntityResponse>;
  deleteQuiz?: Maybe<QuizEntityResponse>;
  deleteQuizAndTipsBlock?: Maybe<QuizAndTipsBlockEntityResponse>;
  deleteQuizSubService?: Maybe<QuizSubServiceEntityResponse>;
  deleteRecyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  deleteRecyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  deleteRequest?: Maybe<RequestEntityResponse>;
  deleteRequestAggregate?: Maybe<RequestAggregateEntityResponse>;
  deleteRequestService?: Maybe<RequestServiceEntityResponse>;
  deleteRequestSlot?: Maybe<RequestSlotEntityResponse>;
  deleteRequestTaked?: Maybe<RequestTakedEntityResponse>;
  deleteSearchEngineBlock?: Maybe<SearchEngineBlockEntityResponse>;
  deleteSectorization?: Maybe<SectorizationEntityResponse>;
  deleteServicesBlock?: Maybe<ServicesBlockEntityResponse>;
  deleteTag?: Maybe<TagEntityResponse>;
  deleteTerritory?: Maybe<TerritoryEntityResponse>;
  deleteTerritoryType?: Maybe<TerritoryTypeEntityResponse>;
  deleteTip?: Maybe<TipEntityResponse>;
  deleteTipSubService?: Maybe<TipSubServiceEntityResponse>;
  deleteTopContentBlock?: Maybe<TopContentBlockEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  deleteUserDataStorage?: Maybe<UserDataStorageEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteWasteFamily?: Maybe<WasteFamilyEntityResponse>;
  deleteWasteForm?: Maybe<WasteFormEntityResponse>;
  deleteYesWeScanService?: Maybe<YesWeScanServiceEntityResponse>;
  deleteYwsService?: Maybe<Scalars["Boolean"]>;
  duplicateContent?: Maybe<Scalars["Boolean"]>;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  endDateServices?: Maybe<Array<Maybe<ServicesDeactivated>>>;
  exportMunicipalities?: Maybe<Scalars["ID"]>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  importMunicipalities?: Maybe<Scalars["String"]>;
  importSiren?: Maybe<Scalars["Boolean"]>;
  logicalDeleteContract?: Maybe<Scalars["Boolean"]>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  sendEmail?: Maybe<Scalars["String"]>;
  servicesActivation?: Maybe<ServiceActivated>;
  setFlowIsActivated?: Maybe<FlowEntity>;
  singleUploadCustom: File;
  updateAccessibility?: Maybe<AccessibilityEntityResponse>;
  updateAccessibilitySubService?: Maybe<AccessibilitySubServiceEntityResponse>;
  updateAlertNotification?: Maybe<AlertNotificationEntityResponse>;
  updateAlertNotificationService?: Maybe<AlertNotificationServiceEntityResponse>;
  updateAudienceType?: Maybe<AudienceTypeEntityResponse>;
  updateCgu?: Maybe<CguEntityResponse>;
  updateCguSubService?: Maybe<CguSubServiceEntityResponse>;
  updateChannelType?: Maybe<ChannelTypeEntityResponse>;
  updateCity?: Maybe<CityEntityResponse>;
  updateClientContact?: Maybe<ClientContactEntityResponse>;
  updateCollectDoorToDoor?: Maybe<CollectDoorToDoorEntityResponse>;
  updateCollectDropOff?: Maybe<CollectDropOffEntityResponse>;
  updateCollectVoluntary?: Maybe<CollectVoluntaryEntityResponse>;
  updateConfidentiality?: Maybe<ConfidentialityEntityResponse>;
  updateConfidentialitySubService?: Maybe<ConfidentialitySubServiceEntityResponse>;
  updateContactMwc?: Maybe<ContactResponse>;
  updateContactUs?: Maybe<ContactUsEntityResponse>;
  updateContactUsSubService?: Maybe<ContactUsSubServiceEntityResponse>;
  updateContract?: Maybe<ContractEntityResponse>;
  updateContractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  updateContractMenu?: Maybe<ContractMenuEntityResponse>;
  updateContractNumberOfInhabitants?: Maybe<Scalars["Boolean"]>;
  updateCookie?: Maybe<CookieEntityResponse>;
  updateCookiesSubService?: Maybe<CookiesSubServiceEntityResponse>;
  updateDescriptionService?: Maybe<DescriptionServiceEntityResponse>;
  updateDocument?: Maybe<DocumentEntityResponse>;
  updateDropOffMap?: Maybe<DropOffMapEntityResponse>;
  updateDropOffMapService?: Maybe<DropOffMapServiceEntityResponse>;
  updateEditoBlock?: Maybe<EditoBlockEntityResponse>;
  updateEditorialService?: Maybe<EditorialServiceEntityResponse>;
  updateEpci?: Maybe<EpciEntityResponse>;
  updateEvent?: Maybe<EventEntityResponse>;
  updateEventSubService?: Maybe<EventSubServiceEntityResponse>;
  updateExportEntity?: Maybe<ExportEntityEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateFlow?: Maybe<FlowEntityResponse>;
  updateFlowColor?: Maybe<FlowColorEntityResponse>;
  updateFooter?: Maybe<FooterEntityResponse>;
  updateFreeContent?: Maybe<FreeContentEntityResponse>;
  updateFreeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  updateFullContract?: Maybe<Scalars["Boolean"]>;
  updateGlobal?: Maybe<GlobalEntityResponse>;
  updateHomepage?: Maybe<HomepageEntityResponse>;
  updateInformationMessage?: Maybe<InformationMessageEntityResponse>;
  updateKeyMetric?: Maybe<KeyMetricEntityResponse>;
  updateKeyMetricsService?: Maybe<KeyMetricsServiceEntityResponse>;
  updateMwCounterService?: Maybe<MwCounterServiceEntityResponse>;
  updateMwcContact?: Maybe<MwcContactEntityResponse>;
  updateMwcFlow?: Maybe<MwcFlowEntityResponse>;
  updateMyWasteCounter?: Maybe<MyWasteCounterEntityResponse>;
  updateNew?: Maybe<NewEntityResponse>;
  updateNewsSubService?: Maybe<NewsSubServiceEntityResponse>;
  updatePickUpDay?: Maybe<PickUpDayEntityResponse>;
  updatePickUpDayService?: Maybe<PickUpDayServiceEntityResponse>;
  updateQuiz?: Maybe<QuizEntityResponse>;
  updateQuizAndTipsBlock?: Maybe<QuizAndTipsBlockEntityResponse>;
  updateQuizSubService?: Maybe<QuizSubServiceEntityResponse>;
  updateRecyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  updateRecyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  updateRequest?: Maybe<RequestEntityResponse>;
  updateRequestAggregate?: Maybe<RequestAggregateEntityResponse>;
  updateRequestService?: Maybe<RequestServiceEntityResponse>;
  updateRequestSlot?: Maybe<RequestSlotEntityResponse>;
  updateRequestTaked?: Maybe<RequestTakedEntityResponse>;
  updateSearchEngineBlock?: Maybe<SearchEngineBlockEntityResponse>;
  updateSectorization?: Maybe<SectorizationEntityResponse>;
  updateServicesBlock?: Maybe<ServicesBlockEntityResponse>;
  updateTag?: Maybe<TagEntityResponse>;
  updateTerritory?: Maybe<TerritoryEntityResponse>;
  updateTerritoryType?: Maybe<TerritoryTypeEntityResponse>;
  updateTip?: Maybe<TipEntityResponse>;
  updateTipSubService?: Maybe<TipSubServiceEntityResponse>;
  updateTopContentBlock?: Maybe<TopContentBlockEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  updateUserDataStorage?: Maybe<UserDataStorageEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  updateWasteFamily?: Maybe<WasteFamilyEntityResponse>;
  updateWasteForm?: Maybe<WasteFormEntityResponse>;
  updateYesWeScanService?: Maybe<YesWeScanServiceEntityResponse>;
  upload: UploadFileEntityResponse;
  uploadFileAndGetId?: Maybe<UploadResult>;
  uploadGraphQL?: Maybe<Scalars["Boolean"]>;
  urlUploader?: Maybe<Scalars["Boolean"]>;
  ywsActivation?: Maybe<Scalars["Boolean"]>;
  ywsDeactivation?: Maybe<Scalars["Boolean"]>;
};

export type MutationAddCommuneToContractArgs = {
  ContractId: Scalars["ID"];
  commune: CommuneInput;
};

export type MutationBulkDeleteMediasArgs = {
  fileRequests: Array<InputMaybe<RequestFile>>;
  folderRequests: Array<InputMaybe<RequestFolder>>;
};

export type MutationBulkMoveMediasArgs = {
  fileRequests?: InputMaybe<Array<InputMaybe<RequestFile>>>;
  folderId: Scalars["ID"];
  folderRequests?: InputMaybe<Array<InputMaybe<RequestFolder>>>;
  path: Scalars["String"];
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars["String"];
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
};

export type MutationChannelsActivationArgs = {
  contractId: Scalars["ID"];
  typeActivation: Scalars["String"];
};

export type MutationChannelsDeactivationArgs = {
  contractId: Scalars["ID"];
  typeDeactivation: Scalars["String"];
};

export type MutationCheckUnpublishedDateArgs = {
  date?: InputMaybe<Scalars["String"]>;
};

export type MutationCreateAccessibilityArgs = {
  data: AccessibilityInput;
};

export type MutationCreateAccessibilitySubServiceArgs = {
  data: AccessibilitySubServiceInput;
};

export type MutationCreateAlertNotificationArgs = {
  data: AlertNotificationInput;
};

export type MutationCreateAlertNotificationServiceArgs = {
  data: AlertNotificationServiceInput;
};

export type MutationCreateAudienceTypeArgs = {
  data: AudienceTypeInput;
};

export type MutationCreateCguArgs = {
  data: CguInput;
};

export type MutationCreateCguSubServiceArgs = {
  data: CguSubServiceInput;
};

export type MutationCreateChannelTypeArgs = {
  data: ChannelTypeInput;
};

export type MutationCreateCityArgs = {
  data: CityInput;
};

export type MutationCreateClientContactArgs = {
  data: ClientContactInput;
};

export type MutationCreateCollectDoorToDoorArgs = {
  data: CollectDoorToDoorInput;
};

export type MutationCreateCollectDropOffArgs = {
  data: CollectDropOffInput;
};

export type MutationCreateCollectVoluntaryArgs = {
  data: CollectVoluntaryInput;
};

export type MutationCreateConfidentialityArgs = {
  data: ConfidentialityInput;
};

export type MutationCreateConfidentialitySubServiceArgs = {
  data: ConfidentialitySubServiceInput;
};

export type MutationCreateContactUsArgs = {
  data: ContactUsInput;
};

export type MutationCreateContactUsSubServiceArgs = {
  data: ContactUsSubServiceInput;
};

export type MutationCreateContentTypeForContractIdArgs = {
  contractId?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type MutationCreateContractArgs = {
  data: ContractInput;
};

export type MutationCreateContractCustomizationArgs = {
  data: ContractCustomizationInput;
};

export type MutationCreateContractMenuArgs = {
  data: ContractMenuInput;
};

export type MutationCreateCookieArgs = {
  data: CookieInput;
};

export type MutationCreateCookiesSubServiceArgs = {
  data: CookiesSubServiceInput;
};

export type MutationCreateDescriptionServiceArgs = {
  data: DescriptionServiceInput;
};

export type MutationCreateDocumentArgs = {
  data: DocumentInput;
};

export type MutationCreateDropOffMapArgs = {
  data: DropOffMapInput;
};

export type MutationCreateDropOffMapServiceArgs = {
  data: DropOffMapServiceInput;
};

export type MutationCreateEditoBlockArgs = {
  data: EditoBlockInput;
};

export type MutationCreateEditorialServiceArgs = {
  data: EditorialServiceInput;
};

export type MutationCreateEmptyContractArgs = {
  ccap?: InputMaybe<Scalars["Long"]>;
  clear?: InputMaybe<Scalars["Long"]>;
  clientName: Scalars["String"];
  clientType: Scalars["String"];
  contactEmail: Scalars["String"];
  contactFirstName: Scalars["String"];
  contactLastName: Scalars["String"];
  contactPhoneNumber: Scalars["String"];
  isNonExclusive: Scalars["Boolean"];
  isRVFrance: Scalars["Boolean"];
  siretNumber?: InputMaybe<Scalars["Long"]>;
};

export type MutationCreateEpciArgs = {
  data: EpciInput;
};

export type MutationCreateEventArgs = {
  data: EventInput;
};

export type MutationCreateEventSubServiceArgs = {
  data: EventSubServiceInput;
};

export type MutationCreateExportEntityArgs = {
  data: ExportEntityInput;
};

export type MutationCreateFlowArgs = {
  data: FlowInput;
};

export type MutationCreateFlowColorArgs = {
  data: FlowColorInput;
};

export type MutationCreateFooterArgs = {
  data: FooterInput;
};

export type MutationCreateFreeContentArgs = {
  data: FreeContentInput;
};

export type MutationCreateFreeContentSubServiceArgs = {
  data: FreeContentSubServiceInput;
};

export type MutationCreateHomepageArgs = {
  data: HomepageInput;
};

export type MutationCreateInformationMessageArgs = {
  data: InformationMessageInput;
};

export type MutationCreateKeyMetricArgs = {
  data: KeyMetricInput;
};

export type MutationCreateKeyMetricsServiceArgs = {
  data: KeyMetricsServiceInput;
};

export type MutationCreateMwCounterServiceArgs = {
  data: MwCounterServiceInput;
};

export type MutationCreateMwcContactArgs = {
  data: MwcContactInput;
};

export type MutationCreateMwcFlowArgs = {
  data: MwcFlowInput;
};

export type MutationCreateMyWasteCounterArgs = {
  data: MyWasteCounterInput;
};

export type MutationCreateNewArgs = {
  data: NewInput;
};

export type MutationCreateNewFolderArgs = {
  name: Scalars["String"];
  parentFolderPath: Scalars["String"];
  parentFolderPathId: Scalars["ID"];
};

export type MutationCreateNewTagArgs = {
  contractId: Scalars["ID"];
  tagName: Scalars["String"];
};

export type MutationCreateNewsSubServiceArgs = {
  data: NewsSubServiceInput;
};

export type MutationCreatePickUpDayArgs = {
  data: PickUpDayInput;
};

export type MutationCreatePickUpDayServiceArgs = {
  data: PickUpDayServiceInput;
};

export type MutationCreateQuizArgs = {
  data: QuizInput;
};

export type MutationCreateQuizAndTipsBlockArgs = {
  data: QuizAndTipsBlockInput;
};

export type MutationCreateQuizSubServiceArgs = {
  data: QuizSubServiceInput;
};

export type MutationCreateRecyclingGuideBlockArgs = {
  data: RecyclingGuideBlockInput;
};

export type MutationCreateRecyclingGuideServiceArgs = {
  data: RecyclingGuideServiceInput;
};

export type MutationCreateRequestArgs = {
  data: RequestInput;
};

export type MutationCreateRequestAggregateArgs = {
  data: RequestAggregateInput;
};

export type MutationCreateRequestServiceArgs = {
  data: RequestServiceInput;
};

export type MutationCreateRequestSlotArgs = {
  data: RequestSlotInput;
};

export type MutationCreateRequestTakedArgs = {
  data: RequestTakedInput;
};

export type MutationCreateSearchEngineBlockArgs = {
  data: SearchEngineBlockInput;
};

export type MutationCreateSectorizationArgs = {
  data: SectorizationInput;
};

export type MutationCreateServicesBlockArgs = {
  data: ServicesBlockInput;
};

export type MutationCreateTagArgs = {
  data: TagInput;
};

export type MutationCreateTerritoryArgs = {
  data: TerritoryInput;
};

export type MutationCreateTerritoryTypeArgs = {
  data: TerritoryTypeInput;
};

export type MutationCreateTipArgs = {
  data: TipInput;
};

export type MutationCreateTipSubServiceArgs = {
  data: TipSubServiceInput;
};

export type MutationCreateTopContentBlockArgs = {
  data: TopContentBlockInput;
};

export type MutationCreateUploadFileArgs = {
  data: UploadFileInput;
};

export type MutationCreateUploadFolderArgs = {
  data: UploadFolderInput;
};

export type MutationCreateUserDataStorageArgs = {
  data: UserDataStorageInput;
};

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationCreateWasteFamilyArgs = {
  data: WasteFamilyInput;
};

export type MutationCreateWasteFormArgs = {
  data: WasteFormInput;
};

export type MutationCreateYesWeScanServiceArgs = {
  data: YesWeScanServiceInput;
};

export type MutationCreateYwsServiceArgs = {
  contractId: Scalars["ID"];
  service: ServiceInput;
};

export type MutationDeleteAccessibilityArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteAccessibilitySubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteAlertNotificationArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteAlertNotificationServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteAudienceTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCguArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCguSubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteChannelTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCityArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteClientContactArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCollectDoorToDoorArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCollectDropOffArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCollectVoluntaryArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteConfidentialityArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteConfidentialitySubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContactUsArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContactUsSubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContentArgs = {
  id: Scalars["ID"];
  type?: InputMaybe<Scalars["String"]>;
};

export type MutationDeleteContractArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContractCustomizationArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContractMenuArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCookieArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCookiesSubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteDescriptionServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteDocumentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteDropOffMapArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteDropOffMapServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEditoBlockArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEditorialServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEpciArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEventArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEventSubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteExportEntityArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteFlowArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteFlowColorArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteFooterArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteFreeContentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteFreeContentSubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteHomepageArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteInformationMessageArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteKeyMetricArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteKeyMetricsServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteMwCounterServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteMwcContactArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteMwcFlowArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteMyWasteCounterArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteNewArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteNewsSubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePickUpDayArgs = {
  id: Scalars["ID"];
};

export type MutationDeletePickUpDayServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteQuizArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteQuizAndTipsBlockArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteQuizSubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRecyclingGuideBlockArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRecyclingGuideServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRequestArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRequestAggregateArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRequestServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRequestSlotArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteRequestTakedArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteSearchEngineBlockArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteSectorizationArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteServicesBlockArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTagArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTerritoryArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTerritoryTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTipArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTipSubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteTopContentBlockArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUploadFileArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUploadFolderArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUserDataStorageArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteWasteFamilyArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteWasteFormArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteYesWeScanServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteYwsServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDuplicateContentArgs = {
  id: Scalars["ID"];
  type?: InputMaybe<Scalars["String"]>;
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationImportMunicipalitiesArgs = {
  contractId?: InputMaybe<Scalars["ID"]>;
  file: Scalars["String"];
};

export type MutationImportSirenArgs = {
  contractId?: InputMaybe<Scalars["ID"]>;
  file: Scalars["String"];
};

export type MutationLogicalDeleteContractArgs = {
  contractId: Scalars["ID"];
};

export type MutationLoginArgs = {
  input: UsersPermissionsLoginInput;
};

export type MutationMultipleUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  files: Array<InputMaybe<Scalars["Upload"]>>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type MutationRegisterArgs = {
  input: UsersPermissionsRegisterInput;
};

export type MutationRemoveFileArgs = {
  id: Scalars["ID"];
};

export type MutationResetPasswordArgs = {
  code: Scalars["String"];
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
};

export type MutationSendEmailArgs = {
  content?: InputMaybe<Scalars["String"]>;
  recipientEmail: Scalars["String"];
  subject?: InputMaybe<Scalars["String"]>;
  templateId?: InputMaybe<Scalars["Int"]>;
};

export type MutationServicesActivationArgs = {
  ServiceName: Scalars["String"];
  contractId: Scalars["ID"];
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  serviceId: Scalars["ID"];
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type MutationSetFlowIsActivatedArgs = {
  code: Scalars["String"];
  id: Scalars["ID"];
  isActivated: Scalars["Boolean"];
};

export type MutationSingleUploadCustomArgs = {
  file: Scalars["Upload"];
};

export type MutationUpdateAccessibilityArgs = {
  data: AccessibilityInput;
  id: Scalars["ID"];
};

export type MutationUpdateAccessibilitySubServiceArgs = {
  data: AccessibilitySubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateAlertNotificationArgs = {
  data: AlertNotificationInput;
  id: Scalars["ID"];
};

export type MutationUpdateAlertNotificationServiceArgs = {
  data: AlertNotificationServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateAudienceTypeArgs = {
  data: AudienceTypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateCguArgs = {
  data: CguInput;
  id: Scalars["ID"];
};

export type MutationUpdateCguSubServiceArgs = {
  data: CguSubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateChannelTypeArgs = {
  data: ChannelTypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateCityArgs = {
  data: CityInput;
  id: Scalars["ID"];
};

export type MutationUpdateClientContactArgs = {
  data: ClientContactInput;
  id: Scalars["ID"];
};

export type MutationUpdateCollectDoorToDoorArgs = {
  data: CollectDoorToDoorInput;
  id: Scalars["ID"];
};

export type MutationUpdateCollectDropOffArgs = {
  data: CollectDropOffInput;
  id: Scalars["ID"];
};

export type MutationUpdateCollectVoluntaryArgs = {
  data: CollectVoluntaryInput;
  id: Scalars["ID"];
};

export type MutationUpdateConfidentialityArgs = {
  data: ConfidentialityInput;
  id: Scalars["ID"];
};

export type MutationUpdateConfidentialitySubServiceArgs = {
  data: ConfidentialitySubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateContactMwcArgs = {
  city?: InputMaybe<Scalars["String"]>;
  contactEmail?: InputMaybe<Scalars["String"]>;
  contractId?: InputMaybe<Scalars["Int"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
  postalAddress?: InputMaybe<Scalars["String"]>;
  postalCode?: InputMaybe<Scalars["String"]>;
  serviceName?: InputMaybe<Scalars["String"]>;
};

export type MutationUpdateContactUsArgs = {
  data: ContactUsInput;
  id: Scalars["ID"];
};

export type MutationUpdateContactUsSubServiceArgs = {
  data: ContactUsSubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateContractArgs = {
  data: ContractInput;
  id: Scalars["ID"];
};

export type MutationUpdateContractCustomizationArgs = {
  data: ContractCustomizationInput;
  id: Scalars["ID"];
};

export type MutationUpdateContractMenuArgs = {
  data: ContractMenuInput;
  id: Scalars["ID"];
};

export type MutationUpdateContractNumberOfInhabitantsArgs = {
  contractId: Scalars["ID"];
  numberOfInhabitants: Scalars["Int"];
};

export type MutationUpdateCookieArgs = {
  data: CookieInput;
  id: Scalars["ID"];
};

export type MutationUpdateCookiesSubServiceArgs = {
  data: CookiesSubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateDescriptionServiceArgs = {
  data: DescriptionServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateDocumentArgs = {
  data: DocumentInput;
  id: Scalars["ID"];
};

export type MutationUpdateDropOffMapArgs = {
  data: DropOffMapInput;
  id: Scalars["ID"];
};

export type MutationUpdateDropOffMapServiceArgs = {
  data: DropOffMapServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateEditoBlockArgs = {
  data: EditoBlockInput;
  id: Scalars["ID"];
};

export type MutationUpdateEditorialServiceArgs = {
  data: EditorialServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateEpciArgs = {
  data: EpciInput;
  id: Scalars["ID"];
};

export type MutationUpdateEventArgs = {
  data: EventInput;
  id: Scalars["ID"];
};

export type MutationUpdateEventSubServiceArgs = {
  data: EventSubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateExportEntityArgs = {
  data: ExportEntityInput;
  id: Scalars["ID"];
};

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"];
  info?: InputMaybe<FileInfoInput>;
};

export type MutationUpdateFlowArgs = {
  data: FlowInput;
  id: Scalars["ID"];
};

export type MutationUpdateFlowColorArgs = {
  data: FlowColorInput;
  id: Scalars["ID"];
};

export type MutationUpdateFooterArgs = {
  data: FooterInput;
  id: Scalars["ID"];
};

export type MutationUpdateFreeContentArgs = {
  data: FreeContentInput;
  id: Scalars["ID"];
};

export type MutationUpdateFreeContentSubServiceArgs = {
  data: FreeContentSubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateFullContractArgs = {
  clientData: ClientContactInput;
  contractData: ContractInput;
  contractId: Scalars["ID"];
};

export type MutationUpdateGlobalArgs = {
  data: GlobalInput;
};

export type MutationUpdateHomepageArgs = {
  data: HomepageInput;
  id: Scalars["ID"];
};

export type MutationUpdateInformationMessageArgs = {
  data: InformationMessageInput;
  id: Scalars["ID"];
};

export type MutationUpdateKeyMetricArgs = {
  data: KeyMetricInput;
  id: Scalars["ID"];
};

export type MutationUpdateKeyMetricsServiceArgs = {
  data: KeyMetricsServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateMwCounterServiceArgs = {
  data: MwCounterServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateMwcContactArgs = {
  data: MwcContactInput;
  id: Scalars["ID"];
};

export type MutationUpdateMwcFlowArgs = {
  data: MwcFlowInput;
  id: Scalars["ID"];
};

export type MutationUpdateMyWasteCounterArgs = {
  data: MyWasteCounterInput;
  id: Scalars["ID"];
};

export type MutationUpdateNewArgs = {
  data: NewInput;
  id: Scalars["ID"];
};

export type MutationUpdateNewsSubServiceArgs = {
  data: NewsSubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdatePickUpDayArgs = {
  data: PickUpDayInput;
  id: Scalars["ID"];
};

export type MutationUpdatePickUpDayServiceArgs = {
  data: PickUpDayServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateQuizArgs = {
  data: QuizInput;
  id: Scalars["ID"];
};

export type MutationUpdateQuizAndTipsBlockArgs = {
  data: QuizAndTipsBlockInput;
  id: Scalars["ID"];
};

export type MutationUpdateQuizSubServiceArgs = {
  data: QuizSubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateRecyclingGuideBlockArgs = {
  data: RecyclingGuideBlockInput;
  id: Scalars["ID"];
};

export type MutationUpdateRecyclingGuideServiceArgs = {
  data: RecyclingGuideServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateRequestArgs = {
  data: RequestInput;
  id: Scalars["ID"];
};

export type MutationUpdateRequestAggregateArgs = {
  data: RequestAggregateInput;
  id: Scalars["ID"];
};

export type MutationUpdateRequestServiceArgs = {
  data: RequestServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateRequestSlotArgs = {
  data: RequestSlotInput;
  id: Scalars["ID"];
};

export type MutationUpdateRequestTakedArgs = {
  data: RequestTakedInput;
  id: Scalars["ID"];
};

export type MutationUpdateSearchEngineBlockArgs = {
  data: SearchEngineBlockInput;
  id: Scalars["ID"];
};

export type MutationUpdateSectorizationArgs = {
  data: SectorizationInput;
  id: Scalars["ID"];
};

export type MutationUpdateServicesBlockArgs = {
  data: ServicesBlockInput;
  id: Scalars["ID"];
};

export type MutationUpdateTagArgs = {
  data: TagInput;
  id: Scalars["ID"];
};

export type MutationUpdateTerritoryArgs = {
  data: TerritoryInput;
  id: Scalars["ID"];
};

export type MutationUpdateTerritoryTypeArgs = {
  data: TerritoryTypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateTipArgs = {
  data: TipInput;
  id: Scalars["ID"];
};

export type MutationUpdateTipSubServiceArgs = {
  data: TipSubServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateTopContentBlockArgs = {
  data: TopContentBlockInput;
  id: Scalars["ID"];
};

export type MutationUpdateUploadFileArgs = {
  data: UploadFileInput;
  id: Scalars["ID"];
};

export type MutationUpdateUploadFolderArgs = {
  data: UploadFolderInput;
  id: Scalars["ID"];
};

export type MutationUpdateUserDataStorageArgs = {
  data: UserDataStorageInput;
  id: Scalars["ID"];
};

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars["ID"];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars["ID"];
};

export type MutationUpdateWasteFamilyArgs = {
  data: WasteFamilyInput;
  id: Scalars["ID"];
};

export type MutationUpdateWasteFormArgs = {
  data: WasteFormInput;
  id: Scalars["ID"];
};

export type MutationUpdateYesWeScanServiceArgs = {
  data: YesWeScanServiceInput;
  id: Scalars["ID"];
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  file: Scalars["Upload"];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type MutationUploadFileAndGetIdArgs = {
  path: Scalars["String"];
};

export type MutationUploadGraphQlArgs = {
  field?: InputMaybe<Scalars["String"]>;
  file: Scalars["Upload"];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type MutationUrlUploaderArgs = {
  imageName: Scalars["String"];
  url: Scalars["String"];
};

export type MutationYwsActivationArgs = {
  contractId: Scalars["ID"];
};

export type MutationYwsDeactivationArgs = {
  contractId: Scalars["ID"];
};

export type MwCounterService = {
  __typename?: "MwCounterService";
  MwCounter?: Maybe<MyWasteCounterRelationResponseCollection>;
  audience_types?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  mwcContact?: Maybe<MwcContactEntityResponse>;
  mwcFlows?: Maybe<MwcFlowRelationResponseCollection>;
  name?: Maybe<Scalars["String"]>;
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type MwCounterServiceMwCounterArgs = {
  filters?: InputMaybe<MyWasteCounterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MwCounterServiceAudience_TypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MwCounterServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MwCounterServiceMwcFlowsArgs = {
  filters?: InputMaybe<MwcFlowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type MwCounterServiceEntity = {
  __typename?: "MwCounterServiceEntity";
  attributes?: Maybe<MwCounterService>;
  id?: Maybe<Scalars["ID"]>;
};

export type MwCounterServiceEntityResponse = {
  __typename?: "MwCounterServiceEntityResponse";
  data?: Maybe<MwCounterServiceEntity>;
};

export type MwCounterServiceEntityResponseCollection = {
  __typename?: "MwCounterServiceEntityResponseCollection";
  data: Array<MwCounterServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type MwCounterServiceFiltersInput = {
  MwCounter?: InputMaybe<MyWasteCounterFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<MwCounterServiceFiltersInput>>>;
  audience_types?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  mwcContact?: InputMaybe<MwcContactFiltersInput>;
  mwcFlows?: InputMaybe<MwcFlowFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MwCounterServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MwCounterServiceFiltersInput>>>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MwCounterServiceInput = {
  MwCounter?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  audience_types?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  mwcContact?: InputMaybe<Scalars["ID"]>;
  mwcFlows?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type MwCounterServiceRelationResponseCollection = {
  __typename?: "MwCounterServiceRelationResponseCollection";
  data: Array<MwCounterServiceEntity>;
};

export type MwcContact = {
  __typename?: "MwcContact";
  MwCounterService?: Maybe<MwCounterServiceEntityResponse>;
  city?: Maybe<Scalars["String"]>;
  contactEmail?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  phoneNumber?: Maybe<Scalars["String"]>;
  postalAddress?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  serviceName?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type MwcContactEntity = {
  __typename?: "MwcContactEntity";
  attributes?: Maybe<MwcContact>;
  id?: Maybe<Scalars["ID"]>;
};

export type MwcContactEntityResponse = {
  __typename?: "MwcContactEntityResponse";
  data?: Maybe<MwcContactEntity>;
};

export type MwcContactEntityResponseCollection = {
  __typename?: "MwcContactEntityResponseCollection";
  data: Array<MwcContactEntity>;
  meta: ResponseCollectionMeta;
};

export type MwcContactFiltersInput = {
  MwCounterService?: InputMaybe<MwCounterServiceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<MwcContactFiltersInput>>>;
  city?: InputMaybe<StringFilterInput>;
  contactEmail?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<MwcContactFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MwcContactFiltersInput>>>;
  phoneNumber?: InputMaybe<StringFilterInput>;
  postalAddress?: InputMaybe<StringFilterInput>;
  postalCode?: InputMaybe<StringFilterInput>;
  serviceName?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MwcContactInput = {
  MwCounterService?: InputMaybe<Scalars["ID"]>;
  city?: InputMaybe<Scalars["String"]>;
  contactEmail?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
  postalAddress?: InputMaybe<Scalars["String"]>;
  postalCode?: InputMaybe<Scalars["String"]>;
  serviceName?: InputMaybe<Scalars["String"]>;
};

export type MwcFlow = {
  __typename?: "MwcFlow";
  averageProductionPerson?: Maybe<Scalars["Long"]>;
  blocks?: Maybe<Array<Maybe<MwcFlowBlocksDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  mwCounterService?: Maybe<MwCounterServiceEntityResponse>;
  name?: Maybe<Enum_Mwcflow_Name>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  weighingSystem?: Maybe<Enum_Mwcflow_Weighingsystem>;
};

export type MwcFlowBlocksDynamicZone =
  | ComponentBlocksImage
  | ComponentBlocksSubHeading
  | ComponentBlocksVideo
  | ComponentBlocksWysiwyg
  | Error;

export type MwcFlowEntity = {
  __typename?: "MwcFlowEntity";
  attributes?: Maybe<MwcFlow>;
  id?: Maybe<Scalars["ID"]>;
};

export type MwcFlowEntityResponse = {
  __typename?: "MwcFlowEntityResponse";
  data?: Maybe<MwcFlowEntity>;
};

export type MwcFlowEntityResponseCollection = {
  __typename?: "MwcFlowEntityResponseCollection";
  data: Array<MwcFlowEntity>;
  meta: ResponseCollectionMeta;
};

export type MwcFlowFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<MwcFlowFiltersInput>>>;
  averageProductionPerson?: InputMaybe<LongFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mwCounterService?: InputMaybe<MwCounterServiceFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MwcFlowFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MwcFlowFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  weighingSystem?: InputMaybe<StringFilterInput>;
};

export type MwcFlowInput = {
  averageProductionPerson?: InputMaybe<Scalars["Long"]>;
  blocks?: InputMaybe<Array<Scalars["MwcFlowBlocksDynamicZoneInput"]>>;
  mwCounterService?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Enum_Mwcflow_Name>;
  weighingSystem?: InputMaybe<Enum_Mwcflow_Weighingsystem>;
};

export type MwcFlowRelationResponseCollection = {
  __typename?: "MwcFlowRelationResponseCollection";
  data: Array<MwcFlowEntity>;
};

export type MyWasteCounter = {
  __typename?: "MyWasteCounter";
  MwCounterService?: Maybe<MwCounterServiceEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type MyWasteCounterEntity = {
  __typename?: "MyWasteCounterEntity";
  attributes?: Maybe<MyWasteCounter>;
  id?: Maybe<Scalars["ID"]>;
};

export type MyWasteCounterEntityResponse = {
  __typename?: "MyWasteCounterEntityResponse";
  data?: Maybe<MyWasteCounterEntity>;
};

export type MyWasteCounterEntityResponseCollection = {
  __typename?: "MyWasteCounterEntityResponseCollection";
  data: Array<MyWasteCounterEntity>;
  meta: ResponseCollectionMeta;
};

export type MyWasteCounterFiltersInput = {
  MwCounterService?: InputMaybe<MwCounterServiceFiltersInput>;
  and?: InputMaybe<Array<InputMaybe<MyWasteCounterFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<MyWasteCounterFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<MyWasteCounterFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type MyWasteCounterInput = {
  MwCounterService?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type MyWasteCounterRelationResponseCollection = {
  __typename?: "MyWasteCounterRelationResponseCollection";
  data: Array<MyWasteCounterEntity>;
};

export type New = {
  __typename?: "New";
  audiences?: Maybe<AudienceTypeRelationResponseCollection>;
  blocks?: Maybe<Array<Maybe<NewBlocksDynamicZone>>>;
  channels?: Maybe<ChannelTypeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  image?: Maybe<UploadFileEntityResponse>;
  linkToServices?: Maybe<Array<Maybe<NewLinkToServicesDynamicZone>>>;
  newsSubService?: Maybe<NewsSubServiceEntityResponse>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  shortDescription?: Maybe<Scalars["String"]>;
  status?: Maybe<Enum_New_Status>;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars["String"];
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  unpublishedDate?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type NewAudiencesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type NewChannelsArgs = {
  filters?: InputMaybe<ChannelTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type NewTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type NewBlocksDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksImage
  | ComponentBlocksSubHeading
  | ComponentBlocksVideo
  | ComponentBlocksWysiwyg
  | Error;

export type NewEntity = {
  __typename?: "NewEntity";
  attributes?: Maybe<New>;
  id?: Maybe<Scalars["ID"]>;
};

export type NewEntityResponse = {
  __typename?: "NewEntityResponse";
  data?: Maybe<NewEntity>;
};

export type NewEntityResponseCollection = {
  __typename?: "NewEntityResponseCollection";
  data: Array<NewEntity>;
  meta: ResponseCollectionMeta;
};

export type NewFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NewFiltersInput>>>;
  audiences?: InputMaybe<AudienceTypeFiltersInput>;
  channels?: InputMaybe<ChannelTypeFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  newsSubService?: InputMaybe<NewsSubServiceFiltersInput>;
  not?: InputMaybe<NewFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<NewFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  shortDescription?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  unpublishedDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type NewInput = {
  audiences?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  blocks?: InputMaybe<Array<Scalars["NewBlocksDynamicZoneInput"]>>;
  channels?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  image?: InputMaybe<Scalars["ID"]>;
  linkToServices?: InputMaybe<
    Array<Scalars["NewLinkToServicesDynamicZoneInput"]>
  >;
  newsSubService?: InputMaybe<Scalars["ID"]>;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  shortDescription?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Enum_New_Status>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  unpublishedDate?: InputMaybe<Scalars["DateTime"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type NewLinkToServicesDynamicZone =
  | ComponentLinksAlertNotification
  | ComponentLinksDropOffMap
  | ComponentLinksEditorial
  | ComponentLinksPickUpDay
  | ComponentLinksRecyclingGuide
  | ComponentLinksRequest
  | Error;

export type NewRelationResponseCollection = {
  __typename?: "NewRelationResponseCollection";
  data: Array<NewEntity>;
};

export type NewsSubService = {
  __typename?: "NewsSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  news?: Maybe<NewRelationResponseCollection>;
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type NewsSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type NewsSubServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type NewsSubServiceNewsArgs = {
  filters?: InputMaybe<NewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type NewsSubServiceEntity = {
  __typename?: "NewsSubServiceEntity";
  attributes?: Maybe<NewsSubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type NewsSubServiceEntityResponse = {
  __typename?: "NewsSubServiceEntityResponse";
  data?: Maybe<NewsSubServiceEntity>;
};

export type NewsSubServiceEntityResponseCollection = {
  __typename?: "NewsSubServiceEntityResponseCollection";
  data: Array<NewsSubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type NewsSubServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<NewsSubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  news?: InputMaybe<NewFiltersInput>;
  not?: InputMaybe<NewsSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<NewsSubServiceFiltersInput>>>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type NewsSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  news?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type NewsSubServiceRelationResponseCollection = {
  __typename?: "NewsSubServiceRelationResponseCollection";
  data: Array<NewsSubServiceEntity>;
};

export type Pagination = {
  __typename?: "Pagination";
  page: Scalars["Int"];
  pageCount: Scalars["Int"];
  pageSize: Scalars["Int"];
  total: Scalars["Int"];
};

export type PaginationArg = {
  limit?: InputMaybe<Scalars["Int"]>;
  page?: InputMaybe<Scalars["Int"]>;
  pageSize?: InputMaybe<Scalars["Int"]>;
  start?: InputMaybe<Scalars["Int"]>;
};

export type PickUpDay = {
  __typename?: "PickUpDay";
  advancedSelection: Scalars["JSON"];
  buttonLabel?: Maybe<Scalars["String"]>;
  cities?: Maybe<CityRelationResponseCollection>;
  collectDoorToDoor?: Maybe<CollectDoorToDoorEntityResponse>;
  collectVoluntary?: Maybe<CollectVoluntaryEntityResponse>;
  complementaryMention?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  externalLink?: Maybe<Scalars["String"]>;
  flow: FlowEntityResponse;
  includeHoliday: Scalars["Boolean"];
  informationMessage?: Maybe<InformationMessageEntityResponse>;
  name: Scalars["String"];
  periodicity?: Maybe<Enum_Pickupday_Periodicity>;
  pickUpDayService?: Maybe<PickUpDayServiceEntityResponse>;
  pickUpHours?: Maybe<Scalars["String"]>;
  request?: Maybe<RequestEntityResponse>;
  sectorizations?: Maybe<SectorizationRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type PickUpDayCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PickUpDaySectorizationsArgs = {
  filters?: InputMaybe<SectorizationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PickUpDayEntity = {
  __typename?: "PickUpDayEntity";
  attributes?: Maybe<PickUpDay>;
  id?: Maybe<Scalars["ID"]>;
};

export type PickUpDayEntityResponse = {
  __typename?: "PickUpDayEntityResponse";
  data?: Maybe<PickUpDayEntity>;
};

export type PickUpDayEntityResponseCollection = {
  __typename?: "PickUpDayEntityResponseCollection";
  data: Array<PickUpDayEntity>;
  meta: ResponseCollectionMeta;
};

export type PickUpDayFiltersInput = {
  advancedSelection?: InputMaybe<JsonFilterInput>;
  and?: InputMaybe<Array<InputMaybe<PickUpDayFiltersInput>>>;
  buttonLabel?: InputMaybe<StringFilterInput>;
  cities?: InputMaybe<CityFiltersInput>;
  collectDoorToDoor?: InputMaybe<CollectDoorToDoorFiltersInput>;
  collectVoluntary?: InputMaybe<CollectVoluntaryFiltersInput>;
  complementaryMention?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  externalLink?: InputMaybe<StringFilterInput>;
  flow?: InputMaybe<FlowFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  includeHoliday?: InputMaybe<BooleanFilterInput>;
  informationMessage?: InputMaybe<InformationMessageFiltersInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PickUpDayFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PickUpDayFiltersInput>>>;
  periodicity?: InputMaybe<StringFilterInput>;
  pickUpDayService?: InputMaybe<PickUpDayServiceFiltersInput>;
  pickUpHours?: InputMaybe<StringFilterInput>;
  request?: InputMaybe<RequestFiltersInput>;
  sectorizations?: InputMaybe<SectorizationFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PickUpDayInput = {
  advancedSelection?: InputMaybe<Scalars["JSON"]>;
  buttonLabel?: InputMaybe<Scalars["String"]>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  collectDoorToDoor?: InputMaybe<Scalars["ID"]>;
  collectVoluntary?: InputMaybe<Scalars["ID"]>;
  complementaryMention?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  externalLink?: InputMaybe<Scalars["String"]>;
  flow?: InputMaybe<Scalars["ID"]>;
  includeHoliday?: InputMaybe<Scalars["Boolean"]>;
  informationMessage?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  periodicity?: InputMaybe<Enum_Pickupday_Periodicity>;
  pickUpDayService?: InputMaybe<Scalars["ID"]>;
  pickUpHours?: InputMaybe<Scalars["String"]>;
  request?: InputMaybe<Scalars["ID"]>;
  sectorizations?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type PickUpDayRelationResponseCollection = {
  __typename?: "PickUpDayRelationResponseCollection";
  data: Array<PickUpDayEntity>;
};

export type PickUpDayService = {
  __typename?: "PickUpDayService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  pickUpDays?: Maybe<PickUpDayRelationResponseCollection>;
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type PickUpDayServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PickUpDayServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PickUpDayServicePickUpDaysArgs = {
  filters?: InputMaybe<PickUpDayFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type PickUpDayServiceEntity = {
  __typename?: "PickUpDayServiceEntity";
  attributes?: Maybe<PickUpDayService>;
  id?: Maybe<Scalars["ID"]>;
};

export type PickUpDayServiceEntityResponse = {
  __typename?: "PickUpDayServiceEntityResponse";
  data?: Maybe<PickUpDayServiceEntity>;
};

export type PickUpDayServiceEntityResponseCollection = {
  __typename?: "PickUpDayServiceEntityResponseCollection";
  data: Array<PickUpDayServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type PickUpDayServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<PickUpDayServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<PickUpDayServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<PickUpDayServiceFiltersInput>>>;
  pickUpDays?: InputMaybe<PickUpDayFiltersInput>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type PickUpDayServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  pickUpDays?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type PickUpDayServiceRelationResponseCollection = {
  __typename?: "PickUpDayServiceRelationResponseCollection";
  data: Array<PickUpDayServiceEntity>;
};

export type PictoDto = {
  __typename?: "PictoDTO";
  alternativeText?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  name: Scalars["String"];
  url: Scalars["String"];
};

export enum PublicationState {
  Live = "LIVE",
  Preview = "PREVIEW",
}

export type Query = {
  __typename?: "Query";
  accessibilities?: Maybe<AccessibilityEntityResponseCollection>;
  accessibility?: Maybe<AccessibilityEntityResponse>;
  accessibilitySubService?: Maybe<AccessibilitySubServiceEntityResponse>;
  accessibilitySubServices?: Maybe<AccessibilitySubServiceEntityResponseCollection>;
  alertNotification?: Maybe<AlertNotificationEntityResponse>;
  alertNotificationService?: Maybe<AlertNotificationServiceEntityResponse>;
  alertNotificationServices?: Maybe<AlertNotificationServiceEntityResponseCollection>;
  alertNotifications?: Maybe<AlertNotificationEntityResponseCollection>;
  audienceType?: Maybe<AudienceTypeEntityResponse>;
  audienceTypes?: Maybe<AudienceTypeEntityResponseCollection>;
  cgu?: Maybe<CguEntityResponse>;
  cguSubService?: Maybe<CguSubServiceEntityResponse>;
  cguSubServices?: Maybe<CguSubServiceEntityResponseCollection>;
  cgus?: Maybe<CguEntityResponseCollection>;
  channelType?: Maybe<ChannelTypeEntityResponse>;
  channelTypes?: Maybe<ChannelTypeEntityResponseCollection>;
  cities?: Maybe<CityEntityResponseCollection>;
  city?: Maybe<CityEntityResponse>;
  clientContact?: Maybe<ClientContactEntityResponse>;
  clientContacts?: Maybe<ClientContactEntityResponseCollection>;
  collectDoorToDoor?: Maybe<CollectDoorToDoorEntityResponse>;
  collectDoorToDoors?: Maybe<CollectDoorToDoorEntityResponseCollection>;
  collectDropOff?: Maybe<CollectDropOffEntityResponse>;
  collectDropOffs?: Maybe<CollectDropOffEntityResponseCollection>;
  collectVoluntaries?: Maybe<CollectVoluntaryEntityResponseCollection>;
  collectVoluntary?: Maybe<CollectVoluntaryEntityResponse>;
  confidentialities?: Maybe<ConfidentialityEntityResponseCollection>;
  confidentiality?: Maybe<ConfidentialityEntityResponse>;
  confidentialitySubService?: Maybe<ConfidentialitySubServiceEntityResponse>;
  confidentialitySubServices?: Maybe<ConfidentialitySubServiceEntityResponseCollection>;
  contactUs?: Maybe<ContactUsEntityResponse>;
  contactUsSubService?: Maybe<ContactUsSubServiceEntityResponse>;
  contactUsSubServices?: Maybe<ContactUsSubServiceEntityResponseCollection>;
  contactUses?: Maybe<ContactUsEntityResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  contractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  contractCustomizations?: Maybe<ContractCustomizationEntityResponseCollection>;
  contractMenu?: Maybe<ContractMenuEntityResponse>;
  contractMenus?: Maybe<ContractMenuEntityResponseCollection>;
  contractPublication?: Maybe<ContractStatus>;
  contracts?: Maybe<ContractEntityResponseCollection>;
  cookie?: Maybe<CookieEntityResponse>;
  cookies?: Maybe<CookieEntityResponseCollection>;
  cookiesSubService?: Maybe<CookiesSubServiceEntityResponse>;
  cookiesSubServices?: Maybe<CookiesSubServiceEntityResponseCollection>;
  countContentPerTag?: Maybe<Array<Maybe<TotalCountPerTag>>>;
  descriptionService?: Maybe<DescriptionServiceEntityResponse>;
  descriptionServices?: Maybe<DescriptionServiceEntityResponseCollection>;
  document?: Maybe<DocumentEntityResponse>;
  documents?: Maybe<DocumentEntityResponseCollection>;
  dropOffMap?: Maybe<DropOffMapEntityResponse>;
  dropOffMapService?: Maybe<DropOffMapServiceEntityResponse>;
  dropOffMapServices?: Maybe<DropOffMapServiceEntityResponseCollection>;
  dropOffMaps?: Maybe<DropOffMapEntityResponseCollection>;
  editoBlock?: Maybe<EditoBlockEntityResponse>;
  editoBlocks?: Maybe<EditoBlockEntityResponseCollection>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  editorialServices?: Maybe<EditorialServiceEntityResponseCollection>;
  epci?: Maybe<EpciEntityResponse>;
  epcis?: Maybe<EpciEntityResponseCollection>;
  event?: Maybe<EventEntityResponse>;
  eventSubService?: Maybe<EventSubServiceEntityResponse>;
  eventSubServices?: Maybe<EventSubServiceEntityResponseCollection>;
  events?: Maybe<EventEntityResponseCollection>;
  exportEntities?: Maybe<ExportEntityEntityResponseCollection>;
  exportEntity?: Maybe<ExportEntityEntityResponse>;
  files: Array<Maybe<File>>;
  flow?: Maybe<FlowEntityResponse>;
  flowColor?: Maybe<FlowColorEntityResponse>;
  flowColors?: Maybe<FlowColorEntityResponseCollection>;
  flows?: Maybe<FlowEntityResponseCollection>;
  footer?: Maybe<FooterEntityResponse>;
  footers?: Maybe<FooterEntityResponseCollection>;
  freeContent?: Maybe<FreeContentEntityResponse>;
  freeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  freeContentSubServices?: Maybe<FreeContentSubServiceEntityResponseCollection>;
  freeContents?: Maybe<FreeContentEntityResponseCollection>;
  getAddressCoordinates?: Maybe<Array<Maybe<SearchResultAddress>>>;
  getAllFoldersHierarchy?: Maybe<Array<Maybe<RequestFolders>>>;
  getContentTypeDTOs?: Maybe<Array<Maybe<ContentTypeDto>>>;
  getDropOffCollectType?: Maybe<Array<Maybe<CollectEntity>>>;
  getDropOffMaps?: Maybe<Array<Maybe<DropOffMapDto>>>;
  getEditoBlockDTO?: Maybe<EditoBlockDto>;
  getEditoContentDTOs?: Maybe<Array<Maybe<EditoContentDto>>>;
  getFilePath?: Maybe<Scalars["String"]>;
  getFolderHierarchy?: Maybe<Array<Maybe<RequestFolders>>>;
  getNewestTopContents?: Maybe<Array<Maybe<EventOrNews>>>;
  getNextAvailableSlots?: Maybe<Array<Maybe<RequestSlots>>>;
  getPickUpDaysByCoordinates?: Maybe<Array<Maybe<Scalars["ID"]>>>;
  getStatusExport?: Maybe<Scalars["String"]>;
  getTopContentBlockDTO?: Maybe<TopContentBlockDto>;
  getTopContentDTOs?: Maybe<Array<Maybe<EditoContentDto>>>;
  global?: Maybe<GlobalEntityResponse>;
  homepage?: Maybe<HomepageEntityResponse>;
  homepages?: Maybe<HomepageEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  informationMessage?: Maybe<InformationMessageEntityResponse>;
  informationMessages?: Maybe<InformationMessageEntityResponseCollection>;
  keyMetric?: Maybe<KeyMetricEntityResponse>;
  keyMetrics?: Maybe<KeyMetricEntityResponseCollection>;
  keyMetricsService?: Maybe<KeyMetricsServiceEntityResponse>;
  keyMetricsServices?: Maybe<KeyMetricsServiceEntityResponseCollection>;
  libraryBreadcrumbTrail?: Maybe<Array<Maybe<Folders>>>;
  librarySearchEngine?: Maybe<Array<Maybe<RequestFileOrFolder>>>;
  me?: Maybe<UsersPermissionsMe>;
  mwCounterService?: Maybe<MwCounterServiceEntityResponse>;
  mwCounterServices?: Maybe<MwCounterServiceEntityResponseCollection>;
  mwcContact?: Maybe<MwcContactEntityResponse>;
  mwcContacts?: Maybe<MwcContactEntityResponseCollection>;
  mwcFlow?: Maybe<MwcFlowEntityResponse>;
  mwcFlows?: Maybe<MwcFlowEntityResponseCollection>;
  myWasteCounter?: Maybe<MyWasteCounterEntityResponse>;
  myWasteCounters?: Maybe<MyWasteCounterEntityResponseCollection>;
  new?: Maybe<NewEntityResponse>;
  news?: Maybe<NewEntityResponseCollection>;
  newsSubService?: Maybe<NewsSubServiceEntityResponse>;
  newsSubServices?: Maybe<NewsSubServiceEntityResponseCollection>;
  pickUpDay?: Maybe<PickUpDayEntityResponse>;
  pickUpDayService?: Maybe<PickUpDayServiceEntityResponse>;
  pickUpDayServices?: Maybe<PickUpDayServiceEntityResponseCollection>;
  pickUpDays?: Maybe<PickUpDayEntityResponseCollection>;
  quiz?: Maybe<QuizEntityResponse>;
  quizAndTipsBlock?: Maybe<QuizAndTipsBlockEntityResponse>;
  quizAndTipsBlocks?: Maybe<QuizAndTipsBlockEntityResponseCollection>;
  quizSubService?: Maybe<QuizSubServiceEntityResponse>;
  quizSubServices?: Maybe<QuizSubServiceEntityResponseCollection>;
  quizzes?: Maybe<QuizEntityResponseCollection>;
  recyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  recyclingGuideBlocks?: Maybe<RecyclingGuideBlockEntityResponseCollection>;
  recyclingGuideSearchEngine?: Maybe<Array<Maybe<SearchResult>>>;
  recyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  recyclingGuideServices?: Maybe<RecyclingGuideServiceEntityResponseCollection>;
  request?: Maybe<RequestEntityResponse>;
  requestAggregate?: Maybe<RequestAggregateEntityResponse>;
  requestAggregates?: Maybe<RequestAggregateEntityResponseCollection>;
  requestService?: Maybe<RequestServiceEntityResponse>;
  requestServices?: Maybe<RequestServiceEntityResponseCollection>;
  requestSlot?: Maybe<RequestSlotEntityResponse>;
  requestSlots?: Maybe<RequestSlotEntityResponseCollection>;
  requestTaked?: Maybe<RequestTakedEntityResponse>;
  requestTakeds?: Maybe<RequestTakedEntityResponseCollection>;
  requests?: Maybe<RequestEntityResponseCollection>;
  searchCities?: Maybe<Array<Maybe<CityResult>>>;
  searchClientsByName?: Maybe<Array<Maybe<ClientName>>>;
  searchEngineBlock?: Maybe<SearchEngineBlockEntityResponse>;
  searchEngineBlocks?: Maybe<SearchEngineBlockEntityResponseCollection>;
  sectorization?: Maybe<SectorizationEntityResponse>;
  sectorizationByCity?: Maybe<CitySectorization>;
  sectorizations?: Maybe<SectorizationEntityResponseCollection>;
  servicesBlock?: Maybe<ServicesBlockEntityResponse>;
  servicesBlocks?: Maybe<ServicesBlockEntityResponseCollection>;
  tag?: Maybe<TagEntityResponse>;
  tags?: Maybe<TagEntityResponseCollection>;
  territories?: Maybe<TerritoryEntityResponseCollection>;
  territory?: Maybe<TerritoryEntityResponse>;
  territoryType?: Maybe<TerritoryTypeEntityResponse>;
  territoryTypes?: Maybe<TerritoryTypeEntityResponseCollection>;
  tip?: Maybe<TipEntityResponse>;
  tipSubService?: Maybe<TipSubServiceEntityResponse>;
  tipSubServices?: Maybe<TipSubServiceEntityResponseCollection>;
  tips?: Maybe<TipEntityResponseCollection>;
  topContentBlock?: Maybe<TopContentBlockEntityResponse>;
  topContentBlocks?: Maybe<TopContentBlockEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  userDataStorage?: Maybe<UserDataStorageEntityResponse>;
  userDataStorages?: Maybe<UserDataStorageEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
  wasteFamilies?: Maybe<WasteFamilyEntityResponseCollection>;
  wasteFamily?: Maybe<WasteFamilyEntityResponse>;
  wasteFamilyLength?: Maybe<Scalars["Int"]>;
  wasteForm?: Maybe<WasteFormEntityResponse>;
  wasteForms?: Maybe<WasteFormEntityResponseCollection>;
  yesWeScanService?: Maybe<YesWeScanServiceEntityResponse>;
  yesWeScanServices?: Maybe<YesWeScanServiceEntityResponseCollection>;
};

export type QueryAccessibilitiesArgs = {
  filters?: InputMaybe<AccessibilityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryAccessibilityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAccessibilitySubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAccessibilitySubServicesArgs = {
  filters?: InputMaybe<AccessibilitySubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryAlertNotificationArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAlertNotificationServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAlertNotificationServicesArgs = {
  filters?: InputMaybe<AlertNotificationServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryAlertNotificationsArgs = {
  filters?: InputMaybe<AlertNotificationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryAudienceTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCguArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCguSubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCguSubServicesArgs = {
  filters?: InputMaybe<CguSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCgusArgs = {
  filters?: InputMaybe<CguFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryChannelTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryChannelTypesArgs = {
  filters?: InputMaybe<ChannelTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryClientContactArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryClientContactsArgs = {
  filters?: InputMaybe<ClientContactFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCollectDoorToDoorArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCollectDoorToDoorsArgs = {
  filters?: InputMaybe<CollectDoorToDoorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCollectDropOffArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCollectDropOffsArgs = {
  filters?: InputMaybe<CollectDropOffFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCollectVoluntariesArgs = {
  filters?: InputMaybe<CollectVoluntaryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCollectVoluntaryArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryConfidentialitiesArgs = {
  filters?: InputMaybe<ConfidentialityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryConfidentialityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryConfidentialitySubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryConfidentialitySubServicesArgs = {
  filters?: InputMaybe<ConfidentialitySubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContactUsArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContactUsSubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContactUsSubServicesArgs = {
  filters?: InputMaybe<ContactUsSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContactUsesArgs = {
  filters?: InputMaybe<ContactUsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContractArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContractCustomizationArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContractCustomizationsArgs = {
  filters?: InputMaybe<ContractCustomizationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContractMenuArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContractMenusArgs = {
  filters?: InputMaybe<ContractMenuFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContractPublicationArgs = {
  contractId: Scalars["ID"];
};

export type QueryContractsArgs = {
  filters?: InputMaybe<ContractFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCookieArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCookiesArgs = {
  filters?: InputMaybe<CookieFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCookiesSubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryCookiesSubServicesArgs = {
  filters?: InputMaybe<CookiesSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryCountContentPerTagArgs = {
  contractId: Scalars["ID"];
};

export type QueryDescriptionServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryDescriptionServicesArgs = {
  filters?: InputMaybe<DescriptionServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDocumentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDropOffMapArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryDropOffMapServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryDropOffMapServicesArgs = {
  filters?: InputMaybe<DropOffMapServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryDropOffMapsArgs = {
  filters?: InputMaybe<DropOffMapFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryEditoBlockArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryEditoBlocksArgs = {
  filters?: InputMaybe<EditoBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryEditorialServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryEditorialServicesArgs = {
  filters?: InputMaybe<EditorialServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryEpciArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryEpcisArgs = {
  filters?: InputMaybe<EpciFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryEventArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryEventSubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryEventSubServicesArgs = {
  filters?: InputMaybe<EventSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryExportEntitiesArgs = {
  filters?: InputMaybe<ExportEntityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryExportEntityArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryFlowArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryFlowColorArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryFlowColorsArgs = {
  filters?: InputMaybe<FlowColorFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryFlowsArgs = {
  filters?: InputMaybe<FlowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryFooterArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryFootersArgs = {
  filters?: InputMaybe<FooterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryFreeContentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryFreeContentSubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryFreeContentSubServicesArgs = {
  filters?: InputMaybe<FreeContentSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryFreeContentsArgs = {
  filters?: InputMaybe<FreeContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryGetAddressCoordinatesArgs = {
  searchTerm: Scalars["String"];
};

export type QueryGetAllFoldersHierarchyArgs = {
  path: Scalars["String"];
};

export type QueryGetContentTypeDtOsArgs = {
  contractId: Scalars["ID"];
};

export type QueryGetDropOffCollectTypeArgs = {
  contractId: Scalars["ID"];
};

export type QueryGetDropOffMapsArgs = {
  dropOffMapServiceId: Scalars["ID"];
};

export type QueryGetEditoBlockDtoArgs = {
  contractId: Scalars["ID"];
  status?: InputMaybe<Enum_Editocontentdto_Status>;
};

export type QueryGetEditoContentDtOsArgs = {
  contractId: Scalars["ID"];
  status?: InputMaybe<Enum_Editocontentdto_Status>;
};

export type QueryGetFilePathArgs = {
  id: Scalars["ID"];
};

export type QueryGetFolderHierarchyArgs = {
  path: Scalars["String"];
};

export type QueryGetNewestTopContentsArgs = {
  contractId: Scalars["ID"];
};

export type QueryGetNextAvailableSlotsArgs = {
  lat: Scalars["Float"];
  long: Scalars["Float"];
  requestId: Scalars["ID"];
};

export type QueryGetPickUpDaysByCoordinatesArgs = {
  lat: Scalars["Float"];
  long: Scalars["Float"];
  pickUpDayServiceId: Scalars["ID"];
};

export type QueryGetStatusExportArgs = {
  id: Scalars["ID"];
};

export type QueryGetTopContentBlockDtoArgs = {
  contractId: Scalars["ID"];
  status?: InputMaybe<Enum_Topcontentdto_Status>;
};

export type QueryGetTopContentDtOsArgs = {
  contractId: Scalars["ID"];
  status?: InputMaybe<Enum_Topcontentdto_Status>;
};

export type QueryHomepageArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryHomepagesArgs = {
  filters?: InputMaybe<HomepageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryI18NLocaleArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryI18NLocalesArgs = {
  filters?: InputMaybe<I18NLocaleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryInformationMessageArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryInformationMessagesArgs = {
  filters?: InputMaybe<InformationMessageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryKeyMetricArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryKeyMetricsArgs = {
  filters?: InputMaybe<KeyMetricFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryKeyMetricsServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryKeyMetricsServicesArgs = {
  filters?: InputMaybe<KeyMetricsServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryLibraryBreadcrumbTrailArgs = {
  path: Scalars["String"];
};

export type QueryLibrarySearchEngineArgs = {
  path: Scalars["String"];
  query: Scalars["String"];
};

export type QueryMwCounterServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryMwCounterServicesArgs = {
  filters?: InputMaybe<MwCounterServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryMwcContactArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryMwcContactsArgs = {
  filters?: InputMaybe<MwcContactFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryMwcFlowArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryMwcFlowsArgs = {
  filters?: InputMaybe<MwcFlowFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryMyWasteCounterArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryMyWasteCountersArgs = {
  filters?: InputMaybe<MyWasteCounterFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryNewArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryNewsArgs = {
  filters?: InputMaybe<NewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryNewsSubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryNewsSubServicesArgs = {
  filters?: InputMaybe<NewsSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryPickUpDayArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryPickUpDayServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryPickUpDayServicesArgs = {
  filters?: InputMaybe<PickUpDayServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryPickUpDaysArgs = {
  filters?: InputMaybe<PickUpDayFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryQuizArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryQuizAndTipsBlockArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryQuizAndTipsBlocksArgs = {
  filters?: InputMaybe<QuizAndTipsBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryQuizSubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryQuizSubServicesArgs = {
  filters?: InputMaybe<QuizSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryQuizzesArgs = {
  filters?: InputMaybe<QuizFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryRecyclingGuideBlockArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRecyclingGuideBlocksArgs = {
  filters?: InputMaybe<RecyclingGuideBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryRecyclingGuideSearchEngineArgs = {
  contractId: Scalars["ID"];
  searchTerm: Scalars["String"];
};

export type QueryRecyclingGuideServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRecyclingGuideServicesArgs = {
  filters?: InputMaybe<RecyclingGuideServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryRequestArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRequestAggregateArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRequestAggregatesArgs = {
  filters?: InputMaybe<RequestAggregateFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryRequestServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRequestServicesArgs = {
  filters?: InputMaybe<RequestServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryRequestSlotArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRequestSlotsArgs = {
  filters?: InputMaybe<RequestSlotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryRequestTakedArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRequestTakedsArgs = {
  filters?: InputMaybe<RequestTakedFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryRequestsArgs = {
  filters?: InputMaybe<RequestFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QuerySearchCitiesArgs = {
  contractId: Scalars["ID"];
  searchTerm: Scalars["String"];
};

export type QuerySearchClientsByNameArgs = {
  name: Scalars["String"];
};

export type QuerySearchEngineBlockArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QuerySearchEngineBlocksArgs = {
  filters?: InputMaybe<SearchEngineBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QuerySectorizationArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QuerySectorizationByCityArgs = {
  postalCode: Scalars["Int"];
};

export type QuerySectorizationsArgs = {
  filters?: InputMaybe<SectorizationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryServicesBlockArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryServicesBlocksArgs = {
  filters?: InputMaybe<ServicesBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTagArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTerritoriesArgs = {
  filters?: InputMaybe<TerritoryFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTerritoryArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTerritoryTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTerritoryTypesArgs = {
  filters?: InputMaybe<TerritoryTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTipArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTipSubServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTipSubServicesArgs = {
  filters?: InputMaybe<TipSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTipsArgs = {
  filters?: InputMaybe<TipFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTopContentBlockArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTopContentBlocksArgs = {
  filters?: InputMaybe<TopContentBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUploadFileArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUploadFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUploadFolderArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUploadFoldersArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUserDataStorageArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUserDataStoragesArgs = {
  filters?: InputMaybe<UserDataStorageFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUsersPermissionsRoleArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUsersPermissionsRolesArgs = {
  filters?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryUsersPermissionsUserArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryUsersPermissionsUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWasteFamiliesArgs = {
  filters?: InputMaybe<WasteFamilyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryWasteFamilyArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryWasteFamilyLengthArgs = {
  id: Scalars["ID"];
};

export type QueryWasteFormArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryWasteFormsArgs = {
  filters?: InputMaybe<WasteFormFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryYesWeScanServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryYesWeScanServicesArgs = {
  filters?: InputMaybe<YesWeScanServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type Quiz = {
  __typename?: "Quiz";
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  quizSubService?: Maybe<QuizSubServiceEntityResponse>;
  shortDescription?: Maybe<Scalars["String"]>;
  status?: Maybe<Enum_Quiz_Status>;
  tags?: Maybe<TagRelationResponseCollection>;
  title?: Maybe<Scalars["String"]>;
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  unpublishedDate?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type QuizTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QuizAndTipsBlock = {
  __typename?: "QuizAndTipsBlock";
  createdAt?: Maybe<Scalars["DateTime"]>;
  displayBlock: Scalars["Boolean"];
  displayQuiz: Scalars["Boolean"];
  displayTips: Scalars["Boolean"];
  homepage?: Maybe<HomepageEntityResponse>;
  quiz?: Maybe<QuizEntityResponse>;
  tips?: Maybe<TipRelationResponseCollection>;
  titleContent: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type QuizAndTipsBlockTipsArgs = {
  filters?: InputMaybe<TipFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QuizAndTipsBlockEntity = {
  __typename?: "QuizAndTipsBlockEntity";
  attributes?: Maybe<QuizAndTipsBlock>;
  id?: Maybe<Scalars["ID"]>;
};

export type QuizAndTipsBlockEntityResponse = {
  __typename?: "QuizAndTipsBlockEntityResponse";
  data?: Maybe<QuizAndTipsBlockEntity>;
};

export type QuizAndTipsBlockEntityResponseCollection = {
  __typename?: "QuizAndTipsBlockEntityResponseCollection";
  data: Array<QuizAndTipsBlockEntity>;
  meta: ResponseCollectionMeta;
};

export type QuizAndTipsBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<QuizAndTipsBlockFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  displayBlock?: InputMaybe<BooleanFilterInput>;
  displayQuiz?: InputMaybe<BooleanFilterInput>;
  displayTips?: InputMaybe<BooleanFilterInput>;
  homepage?: InputMaybe<HomepageFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<QuizAndTipsBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<QuizAndTipsBlockFiltersInput>>>;
  quiz?: InputMaybe<QuizFiltersInput>;
  tips?: InputMaybe<TipFiltersInput>;
  titleContent?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type QuizAndTipsBlockInput = {
  displayBlock?: InputMaybe<Scalars["Boolean"]>;
  displayQuiz?: InputMaybe<Scalars["Boolean"]>;
  displayTips?: InputMaybe<Scalars["Boolean"]>;
  homepage?: InputMaybe<Scalars["ID"]>;
  quiz?: InputMaybe<Scalars["ID"]>;
  tips?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  titleContent?: InputMaybe<Scalars["String"]>;
};

export type QuizEntity = {
  __typename?: "QuizEntity";
  attributes?: Maybe<Quiz>;
  id?: Maybe<Scalars["ID"]>;
};

export type QuizEntityResponse = {
  __typename?: "QuizEntityResponse";
  data?: Maybe<QuizEntity>;
};

export type QuizEntityResponseCollection = {
  __typename?: "QuizEntityResponseCollection";
  data: Array<QuizEntity>;
  meta: ResponseCollectionMeta;
};

export type QuizFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<QuizFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<QuizFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<QuizFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  quizSubService?: InputMaybe<QuizSubServiceFiltersInput>;
  shortDescription?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  unpublishedDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type QuizInput = {
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  quizSubService?: InputMaybe<Scalars["ID"]>;
  shortDescription?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Enum_Quiz_Status>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  unpublishedDate?: InputMaybe<Scalars["DateTime"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type QuizRelationResponseCollection = {
  __typename?: "QuizRelationResponseCollection";
  data: Array<QuizEntity>;
};

export type QuizSubService = {
  __typename?: "QuizSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  quizzes?: Maybe<QuizRelationResponseCollection>;
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type QuizSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QuizSubServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QuizSubServiceQuizzesArgs = {
  filters?: InputMaybe<QuizFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QuizSubServiceEntity = {
  __typename?: "QuizSubServiceEntity";
  attributes?: Maybe<QuizSubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type QuizSubServiceEntityResponse = {
  __typename?: "QuizSubServiceEntityResponse";
  data?: Maybe<QuizSubServiceEntity>;
};

export type QuizSubServiceEntityResponseCollection = {
  __typename?: "QuizSubServiceEntityResponseCollection";
  data: Array<QuizSubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type QuizSubServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<QuizSubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<QuizSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<QuizSubServiceFiltersInput>>>;
  quizzes?: InputMaybe<QuizFiltersInput>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type QuizSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  quizzes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type QuizSubServiceRelationResponseCollection = {
  __typename?: "QuizSubServiceRelationResponseCollection";
  data: Array<QuizSubServiceEntity>;
};

export type RecyclingGuideBlock = {
  __typename?: "RecyclingGuideBlock";
  createdAt?: Maybe<Scalars["DateTime"]>;
  homepage?: Maybe<HomepageEntityResponse>;
  recyclingGuideDisplayContent: Scalars["String"];
  subtitleContent: Scalars["String"];
  tags?: Maybe<TagRelationResponseCollection>;
  titleContent: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type RecyclingGuideBlockTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RecyclingGuideBlockEntity = {
  __typename?: "RecyclingGuideBlockEntity";
  attributes?: Maybe<RecyclingGuideBlock>;
  id?: Maybe<Scalars["ID"]>;
};

export type RecyclingGuideBlockEntityResponse = {
  __typename?: "RecyclingGuideBlockEntityResponse";
  data?: Maybe<RecyclingGuideBlockEntity>;
};

export type RecyclingGuideBlockEntityResponseCollection = {
  __typename?: "RecyclingGuideBlockEntityResponseCollection";
  data: Array<RecyclingGuideBlockEntity>;
  meta: ResponseCollectionMeta;
};

export type RecyclingGuideBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RecyclingGuideBlockFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  homepage?: InputMaybe<HomepageFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<RecyclingGuideBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RecyclingGuideBlockFiltersInput>>>;
  recyclingGuideDisplayContent?: InputMaybe<StringFilterInput>;
  subtitleContent?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  titleContent?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RecyclingGuideBlockInput = {
  homepage?: InputMaybe<Scalars["ID"]>;
  recyclingGuideDisplayContent?: InputMaybe<Scalars["String"]>;
  subtitleContent?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  titleContent?: InputMaybe<Scalars["String"]>;
};

export type RecyclingGuideService = {
  __typename?: "RecyclingGuideService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  memoDesc?: Maybe<Scalars["String"]>;
  memoFile?: Maybe<UploadFileEntityResponse>;
  memoName: Scalars["String"];
  name: Scalars["String"];
  orderExtension?: Maybe<Scalars["Boolean"]>;
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  wasteFamilies?: Maybe<WasteFamilyRelationResponseCollection>;
  wasteForms?: Maybe<WasteFormRelationResponseCollection>;
};

export type RecyclingGuideServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RecyclingGuideServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RecyclingGuideServiceWasteFamiliesArgs = {
  filters?: InputMaybe<WasteFamilyFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RecyclingGuideServiceWasteFormsArgs = {
  filters?: InputMaybe<WasteFormFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RecyclingGuideServiceEntity = {
  __typename?: "RecyclingGuideServiceEntity";
  attributes?: Maybe<RecyclingGuideService>;
  id?: Maybe<Scalars["ID"]>;
};

export type RecyclingGuideServiceEntityResponse = {
  __typename?: "RecyclingGuideServiceEntityResponse";
  data?: Maybe<RecyclingGuideServiceEntity>;
};

export type RecyclingGuideServiceEntityResponseCollection = {
  __typename?: "RecyclingGuideServiceEntityResponseCollection";
  data: Array<RecyclingGuideServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type RecyclingGuideServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RecyclingGuideServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  memoDesc?: InputMaybe<StringFilterInput>;
  memoName?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<RecyclingGuideServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RecyclingGuideServiceFiltersInput>>>;
  orderExtension?: InputMaybe<BooleanFilterInput>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  wasteFamilies?: InputMaybe<WasteFamilyFiltersInput>;
  wasteForms?: InputMaybe<WasteFormFiltersInput>;
};

export type RecyclingGuideServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  memoDesc?: InputMaybe<Scalars["String"]>;
  memoFile?: InputMaybe<Scalars["ID"]>;
  memoName?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  orderExtension?: InputMaybe<Scalars["Boolean"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
  wasteFamilies?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  wasteForms?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type RecyclingGuideServiceRelationResponseCollection = {
  __typename?: "RecyclingGuideServiceRelationResponseCollection";
  data: Array<RecyclingGuideServiceEntity>;
};

export type Request = {
  __typename?: "Request";
  addableBlocks?: Maybe<Array<Maybe<RequestAddableBlocksDynamicZone>>>;
  blockText?: Maybe<Scalars["String"]>;
  confirmationMessage?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  displayUserCivility?: Maybe<Scalars["Boolean"]>;
  fieldAddressLabel?: Maybe<Scalars["String"]>;
  hasAddress: Scalars["Boolean"];
  hasAppointmentSlots?: Maybe<Scalars["Boolean"]>;
  hasSeveralRequestTypes: Scalars["Boolean"];
  hasUser: Scalars["Boolean"];
  hoursBeforeReservationIsActivated?: Maybe<Scalars["Int"]>;
  isActivated?: Maybe<Scalars["Boolean"]>;
  isUserEmailMandatory?: Maybe<Scalars["Boolean"]>;
  isUserNameMandatory?: Maybe<Scalars["Boolean"]>;
  isUserPhoneMandatory?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  numberOfRequiredSlots?: Maybe<Scalars["Int"]>;
  requestAggregate?: Maybe<RequestAggregateEntityResponse>;
  requestService?: Maybe<RequestServiceEntityResponse>;
  requestSlots?: Maybe<RequestSlotRelationResponseCollection>;
  requestType?: Maybe<Array<Maybe<ComponentBlocksRequestType>>>;
  slotsReservationRules?: Maybe<Scalars["JSON"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  userAllowSMSNotification?: Maybe<Scalars["Boolean"]>;
};

export type RequestRequestSlotsArgs = {
  filters?: InputMaybe<RequestSlotFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RequestRequestTypeArgs = {
  filters?: InputMaybe<ComponentBlocksRequestTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RequestAddableBlocksDynamicZone =
  | ComponentBlocksAttachments
  | ComponentBlocksCheckbox
  | ComponentBlocksCommentary
  | ComponentBlocksCumbersome
  | ComponentBlocksDateChoice
  | ComponentBlocksProofOfReceipt
  | ComponentBlocksQcm
  | ComponentBlocksQuestions
  | Error;

export type RequestAggregate = {
  __typename?: "RequestAggregate";
  createdAt?: Maybe<Scalars["DateTime"]>;
  name: Scalars["String"];
  requestService?: Maybe<RequestServiceEntityResponse>;
  requests?: Maybe<RequestRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type RequestAggregateRequestsArgs = {
  filters?: InputMaybe<RequestFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RequestAggregateEntity = {
  __typename?: "RequestAggregateEntity";
  attributes?: Maybe<RequestAggregate>;
  id?: Maybe<Scalars["ID"]>;
};

export type RequestAggregateEntityResponse = {
  __typename?: "RequestAggregateEntityResponse";
  data?: Maybe<RequestAggregateEntity>;
};

export type RequestAggregateEntityResponseCollection = {
  __typename?: "RequestAggregateEntityResponseCollection";
  data: Array<RequestAggregateEntity>;
  meta: ResponseCollectionMeta;
};

export type RequestAggregateFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RequestAggregateFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<RequestAggregateFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RequestAggregateFiltersInput>>>;
  requestService?: InputMaybe<RequestServiceFiltersInput>;
  requests?: InputMaybe<RequestFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RequestAggregateInput = {
  name?: InputMaybe<Scalars["String"]>;
  requestService?: InputMaybe<Scalars["ID"]>;
  requests?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type RequestAggregateRelationResponseCollection = {
  __typename?: "RequestAggregateRelationResponseCollection";
  data: Array<RequestAggregateEntity>;
};

export type RequestEntity = {
  __typename?: "RequestEntity";
  attributes?: Maybe<Request>;
  id?: Maybe<Scalars["ID"]>;
};

export type RequestEntityResponse = {
  __typename?: "RequestEntityResponse";
  data?: Maybe<RequestEntity>;
};

export type RequestEntityResponseCollection = {
  __typename?: "RequestEntityResponseCollection";
  data: Array<RequestEntity>;
  meta: ResponseCollectionMeta;
};

export type RequestFile = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type RequestFileOrFolder = Files | Folders;

export type RequestFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RequestFiltersInput>>>;
  blockText?: InputMaybe<StringFilterInput>;
  confirmationMessage?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  displayUserCivility?: InputMaybe<BooleanFilterInput>;
  fieldAddressLabel?: InputMaybe<StringFilterInput>;
  hasAddress?: InputMaybe<BooleanFilterInput>;
  hasAppointmentSlots?: InputMaybe<BooleanFilterInput>;
  hasSeveralRequestTypes?: InputMaybe<BooleanFilterInput>;
  hasUser?: InputMaybe<BooleanFilterInput>;
  hoursBeforeReservationIsActivated?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  isUserEmailMandatory?: InputMaybe<BooleanFilterInput>;
  isUserNameMandatory?: InputMaybe<BooleanFilterInput>;
  isUserPhoneMandatory?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<RequestFiltersInput>;
  numberOfRequiredSlots?: InputMaybe<IntFilterInput>;
  or?: InputMaybe<Array<InputMaybe<RequestFiltersInput>>>;
  requestAggregate?: InputMaybe<RequestAggregateFiltersInput>;
  requestService?: InputMaybe<RequestServiceFiltersInput>;
  requestSlots?: InputMaybe<RequestSlotFiltersInput>;
  requestType?: InputMaybe<ComponentBlocksRequestTypeFiltersInput>;
  slotsReservationRules?: InputMaybe<JsonFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  userAllowSMSNotification?: InputMaybe<BooleanFilterInput>;
};

export type RequestFolder = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type RequestFolderEntity = {
  __typename?: "RequestFolderEntity";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  path?: Maybe<Scalars["String"]>;
  pathId?: Maybe<Scalars["ID"]>;
};

export type RequestFolders = {
  __typename?: "RequestFolders";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  path?: Maybe<Scalars["String"]>;
  pathId?: Maybe<Scalars["String"]>;
};

export type RequestInput = {
  addableBlocks?: InputMaybe<
    Array<Scalars["RequestAddableBlocksDynamicZoneInput"]>
  >;
  blockText?: InputMaybe<Scalars["String"]>;
  confirmationMessage?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  displayUserCivility?: InputMaybe<Scalars["Boolean"]>;
  fieldAddressLabel?: InputMaybe<Scalars["String"]>;
  hasAddress?: InputMaybe<Scalars["Boolean"]>;
  hasAppointmentSlots?: InputMaybe<Scalars["Boolean"]>;
  hasSeveralRequestTypes?: InputMaybe<Scalars["Boolean"]>;
  hasUser?: InputMaybe<Scalars["Boolean"]>;
  hoursBeforeReservationIsActivated?: InputMaybe<Scalars["Int"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  isUserEmailMandatory?: InputMaybe<Scalars["Boolean"]>;
  isUserNameMandatory?: InputMaybe<Scalars["Boolean"]>;
  isUserPhoneMandatory?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  numberOfRequiredSlots?: InputMaybe<Scalars["Int"]>;
  requestAggregate?: InputMaybe<Scalars["ID"]>;
  requestService?: InputMaybe<Scalars["ID"]>;
  requestSlots?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  requestType?: InputMaybe<Array<InputMaybe<ComponentBlocksRequestTypeInput>>>;
  slotsReservationRules?: InputMaybe<Scalars["JSON"]>;
  userAllowSMSNotification?: InputMaybe<Scalars["Boolean"]>;
};

export type RequestRelationResponseCollection = {
  __typename?: "RequestRelationResponseCollection";
  data: Array<RequestEntity>;
};

export type RequestService = {
  __typename?: "RequestService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  requestAggregates?: Maybe<RequestAggregateRelationResponseCollection>;
  requests?: Maybe<RequestRelationResponseCollection>;
  startDate?: Maybe<Scalars["Date"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type RequestServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RequestServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RequestServiceRequestAggregatesArgs = {
  filters?: InputMaybe<RequestAggregateFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RequestServiceRequestsArgs = {
  filters?: InputMaybe<RequestFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RequestServiceEntity = {
  __typename?: "RequestServiceEntity";
  attributes?: Maybe<RequestService>;
  id?: Maybe<Scalars["ID"]>;
};

export type RequestServiceEntityResponse = {
  __typename?: "RequestServiceEntityResponse";
  data?: Maybe<RequestServiceEntity>;
};

export type RequestServiceEntityResponseCollection = {
  __typename?: "RequestServiceEntityResponseCollection";
  data: Array<RequestServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type RequestServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RequestServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<RequestServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RequestServiceFiltersInput>>>;
  requestAggregates?: InputMaybe<RequestAggregateFiltersInput>;
  requests?: InputMaybe<RequestFiltersInput>;
  startDate?: InputMaybe<DateFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RequestServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  requestAggregates?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  requests?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type RequestServiceRelationResponseCollection = {
  __typename?: "RequestServiceRelationResponseCollection";
  data: Array<RequestServiceEntity>;
};

export type RequestSlot = {
  __typename?: "RequestSlot";
  createdAt?: Maybe<Scalars["DateTime"]>;
  noSlotMessage?: Maybe<Scalars["String"]>;
  sectorizations?: Maybe<SectorizationRelationResponseCollection>;
  slotMessage?: Maybe<Scalars["String"]>;
  slotsExceptions?: Maybe<Array<Maybe<ComponentBlocksRequestSlotsExceptions>>>;
  timeSlots?: Maybe<Scalars["JSON"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type RequestSlotSectorizationsArgs = {
  filters?: InputMaybe<SectorizationFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RequestSlotSlotsExceptionsArgs = {
  filters?: InputMaybe<ComponentBlocksRequestSlotsExceptionsFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type RequestSlotEntity = {
  __typename?: "RequestSlotEntity";
  attributes?: Maybe<RequestSlot>;
  id?: Maybe<Scalars["ID"]>;
};

export type RequestSlotEntityResponse = {
  __typename?: "RequestSlotEntityResponse";
  data?: Maybe<RequestSlotEntity>;
};

export type RequestSlotEntityResponseCollection = {
  __typename?: "RequestSlotEntityResponseCollection";
  data: Array<RequestSlotEntity>;
  meta: ResponseCollectionMeta;
};

export type RequestSlotFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RequestSlotFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  noSlotMessage?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<RequestSlotFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RequestSlotFiltersInput>>>;
  sectorizations?: InputMaybe<SectorizationFiltersInput>;
  slotMessage?: InputMaybe<StringFilterInput>;
  slotsExceptions?: InputMaybe<ComponentBlocksRequestSlotsExceptionsFiltersInput>;
  timeSlots?: InputMaybe<JsonFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RequestSlotInput = {
  noSlotMessage?: InputMaybe<Scalars["String"]>;
  sectorizations?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  slotMessage?: InputMaybe<Scalars["String"]>;
  slotsExceptions?: InputMaybe<
    Array<InputMaybe<ComponentBlocksRequestSlotsExceptionsInput>>
  >;
  timeSlots?: InputMaybe<Scalars["JSON"]>;
};

export type RequestSlotRelationResponseCollection = {
  __typename?: "RequestSlotRelationResponseCollection";
  data: Array<RequestSlotEntity>;
};

export type RequestSlots = {
  __typename?: "RequestSlots";
  day?: Maybe<Scalars["String"]>;
  exceptionId?: Maybe<Scalars["ID"]>;
  requestSlotId: Scalars["ID"];
  startTime?: Maybe<Scalars["Time"]>;
};

export type RequestTagEntity = {
  __typename?: "RequestTagEntity";
  contractId?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type RequestTaked = {
  __typename?: "RequestTaked";
  city?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  name: Scalars["String"];
  requestType?: Maybe<ComponentBlocksRequestType>;
  request_slot?: Maybe<RequestSlotEntityResponse>;
  slotDate?: Maybe<Scalars["Date"]>;
  slotTaken?: Maybe<Scalars["JSON"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  user_data_storage?: Maybe<UserDataStorageEntityResponse>;
};

export type RequestTakedEntity = {
  __typename?: "RequestTakedEntity";
  attributes?: Maybe<RequestTaked>;
  id?: Maybe<Scalars["ID"]>;
};

export type RequestTakedEntityResponse = {
  __typename?: "RequestTakedEntityResponse";
  data?: Maybe<RequestTakedEntity>;
};

export type RequestTakedEntityResponseCollection = {
  __typename?: "RequestTakedEntityResponseCollection";
  data: Array<RequestTakedEntity>;
  meta: ResponseCollectionMeta;
};

export type RequestTakedFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<RequestTakedFiltersInput>>>;
  city?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<RequestTakedFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RequestTakedFiltersInput>>>;
  requestType?: InputMaybe<ComponentBlocksRequestTypeFiltersInput>;
  request_slot?: InputMaybe<RequestSlotFiltersInput>;
  slotDate?: InputMaybe<DateFilterInput>;
  slotTaken?: InputMaybe<JsonFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  user_data_storage?: InputMaybe<UserDataStorageFiltersInput>;
};

export type RequestTakedInput = {
  city?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  requestType?: InputMaybe<ComponentBlocksRequestTypeInput>;
  request_slot?: InputMaybe<Scalars["ID"]>;
  slotDate?: InputMaybe<Scalars["Date"]>;
  slotTaken?: InputMaybe<Scalars["JSON"]>;
  user_data_storage?: InputMaybe<Scalars["ID"]>;
};

export type RequestTakedRelationResponseCollection = {
  __typename?: "RequestTakedRelationResponseCollection";
  data: Array<RequestTakedEntity>;
};

export type ResponseCollectionMeta = {
  __typename?: "ResponseCollectionMeta";
  pagination: Pagination;
};

export type SearchEngineBlock = {
  __typename?: "SearchEngineBlock";
  createdAt?: Maybe<Scalars["DateTime"]>;
  homepage?: Maybe<HomepageEntityResponse>;
  titleContent: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type SearchEngineBlockEntity = {
  __typename?: "SearchEngineBlockEntity";
  attributes?: Maybe<SearchEngineBlock>;
  id?: Maybe<Scalars["ID"]>;
};

export type SearchEngineBlockEntityResponse = {
  __typename?: "SearchEngineBlockEntityResponse";
  data?: Maybe<SearchEngineBlockEntity>;
};

export type SearchEngineBlockEntityResponseCollection = {
  __typename?: "SearchEngineBlockEntityResponseCollection";
  data: Array<SearchEngineBlockEntity>;
  meta: ResponseCollectionMeta;
};

export type SearchEngineBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SearchEngineBlockFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  homepage?: InputMaybe<HomepageFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<SearchEngineBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SearchEngineBlockFiltersInput>>>;
  titleContent?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SearchEngineBlockInput = {
  homepage?: InputMaybe<Scalars["ID"]>;
  titleContent?: InputMaybe<Scalars["String"]>;
};

export type SearchResult = {
  __typename?: "SearchResult";
  id: Scalars["ID"];
  name: Scalars["String"];
  typeName: Scalars["String"];
  wasteFamilyName?: Maybe<Scalars["String"]>;
};

export type SearchResultAddress = {
  __typename?: "SearchResultAddress";
  banFeaturesProperties?: Maybe<Scalars["JSON"]>;
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
};

export type Sectorization = {
  __typename?: "Sectorization";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  name: Scalars["String"];
  polygonCoordinates?: Maybe<Scalars["JSON"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type SectorizationEntity = {
  __typename?: "SectorizationEntity";
  attributes?: Maybe<Sectorization>;
  id?: Maybe<Scalars["ID"]>;
};

export type SectorizationEntityResponse = {
  __typename?: "SectorizationEntityResponse";
  data?: Maybe<SectorizationEntity>;
};

export type SectorizationEntityResponseCollection = {
  __typename?: "SectorizationEntityResponseCollection";
  data: Array<SectorizationEntity>;
  meta: ResponseCollectionMeta;
};

export type SectorizationFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<SectorizationFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<SectorizationFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<SectorizationFiltersInput>>>;
  polygonCoordinates?: InputMaybe<JsonFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type SectorizationInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  polygonCoordinates?: InputMaybe<Scalars["JSON"]>;
};

export type SectorizationRelationResponseCollection = {
  __typename?: "SectorizationRelationResponseCollection";
  data: Array<SectorizationEntity>;
};

export type Service = {
  __typename?: "Service";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  serviceName?: Maybe<Scalars["String"]>;
};

export type ServiceActivated = {
  __typename?: "ServiceActivated";
  contractId: Scalars["ID"];
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  serviceId: Scalars["ID"];
  serviceName: Scalars["String"];
  startDate?: Maybe<Scalars["Date"]>;
};

export type ServiceInput = {
  endDate: Scalars["String"];
  name: Scalars["String"];
  startDate: Scalars["String"];
};

export type ServicesBlock = {
  __typename?: "ServicesBlock";
  createdAt?: Maybe<Scalars["DateTime"]>;
  homepage?: Maybe<HomepageEntityResponse>;
  serviceLinks?: Maybe<Array<Maybe<ServicesBlockServiceLinksDynamicZone>>>;
  titleContent: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ServicesBlockEntity = {
  __typename?: "ServicesBlockEntity";
  attributes?: Maybe<ServicesBlock>;
  id?: Maybe<Scalars["ID"]>;
};

export type ServicesBlockEntityResponse = {
  __typename?: "ServicesBlockEntityResponse";
  data?: Maybe<ServicesBlockEntity>;
};

export type ServicesBlockEntityResponseCollection = {
  __typename?: "ServicesBlockEntityResponseCollection";
  data: Array<ServicesBlockEntity>;
  meta: ResponseCollectionMeta;
};

export type ServicesBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ServicesBlockFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  homepage?: InputMaybe<HomepageFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ServicesBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ServicesBlockFiltersInput>>>;
  titleContent?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ServicesBlockInput = {
  homepage?: InputMaybe<Scalars["ID"]>;
  serviceLinks?: InputMaybe<
    Array<Scalars["ServicesBlockServiceLinksDynamicZoneInput"]>
  >;
  titleContent?: InputMaybe<Scalars["String"]>;
};

export type ServicesBlockServiceLinksDynamicZone =
  | ComponentLinksAlertNotification
  | ComponentLinksContactUs
  | ComponentLinksDropOffMap
  | ComponentLinksEvents
  | ComponentLinksExternal
  | ComponentLinksFrees
  | ComponentLinksKeyMetrics
  | ComponentLinksMyWasteCounter
  | ComponentLinksNews
  | ComponentLinksPickUpDay
  | ComponentLinksQuizzes
  | ComponentLinksRecyclingGuide
  | ComponentLinksRequest
  | ComponentLinksTips
  | Error;

export type ServicesDeactivated = {
  __typename?: "ServicesDeactivated";
  contractId?: Maybe<Scalars["ID"]>;
  serviceId?: Maybe<Scalars["ID"]>;
  serviceName?: Maybe<Scalars["String"]>;
};

export type StringFilterInput = {
  and?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  between?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  contains?: InputMaybe<Scalars["String"]>;
  containsi?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  eq?: InputMaybe<Scalars["String"]>;
  eqi?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  ne?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<StringFilterInput>;
  notContains?: InputMaybe<Scalars["String"]>;
  notContainsi?: InputMaybe<Scalars["String"]>;
  notIn?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  notNull?: InputMaybe<Scalars["Boolean"]>;
  null?: InputMaybe<Scalars["Boolean"]>;
  or?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type Tag = {
  __typename?: "Tag";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  name: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TagEntity = {
  __typename?: "TagEntity";
  attributes?: Maybe<Tag>;
  id?: Maybe<Scalars["ID"]>;
};

export type TagEntityResponse = {
  __typename?: "TagEntityResponse";
  data?: Maybe<TagEntity>;
};

export type TagEntityResponseCollection = {
  __typename?: "TagEntityResponseCollection";
  data: Array<TagEntity>;
  meta: ResponseCollectionMeta;
};

export type TagFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<TagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TagInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type TagRelationResponseCollection = {
  __typename?: "TagRelationResponseCollection";
  data: Array<TagEntity>;
};

export type Territory = {
  __typename?: "Territory";
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  epcis?: Maybe<EpciRelationResponseCollection>;
  name?: Maybe<Scalars["String"]>;
  territoryType?: Maybe<TerritoryTypeEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TerritoryCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TerritoryEpcisArgs = {
  filters?: InputMaybe<EpciFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TerritoryEntity = {
  __typename?: "TerritoryEntity";
  attributes?: Maybe<Territory>;
  id?: Maybe<Scalars["ID"]>;
};

export type TerritoryEntityResponse = {
  __typename?: "TerritoryEntityResponse";
  data?: Maybe<TerritoryEntity>;
};

export type TerritoryEntityResponseCollection = {
  __typename?: "TerritoryEntityResponseCollection";
  data: Array<TerritoryEntity>;
  meta: ResponseCollectionMeta;
};

export type TerritoryFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TerritoryFiltersInput>>>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  epcis?: InputMaybe<EpciFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<TerritoryFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TerritoryFiltersInput>>>;
  territoryType?: InputMaybe<TerritoryTypeFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TerritoryInput = {
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  epcis?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  territoryType?: InputMaybe<Scalars["ID"]>;
};

export type TerritoryRelationResponseCollection = {
  __typename?: "TerritoryRelationResponseCollection";
  data: Array<TerritoryEntity>;
};

export type TerritoryType = {
  __typename?: "TerritoryType";
  createdAt?: Maybe<Scalars["DateTime"]>;
  territoryType?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TerritoryTypeEntity = {
  __typename?: "TerritoryTypeEntity";
  attributes?: Maybe<TerritoryType>;
  id?: Maybe<Scalars["ID"]>;
};

export type TerritoryTypeEntityResponse = {
  __typename?: "TerritoryTypeEntityResponse";
  data?: Maybe<TerritoryTypeEntity>;
};

export type TerritoryTypeEntityResponseCollection = {
  __typename?: "TerritoryTypeEntityResponseCollection";
  data: Array<TerritoryTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type TerritoryTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TerritoryTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TerritoryTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TerritoryTypeFiltersInput>>>;
  territoryType?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TerritoryTypeInput = {
  territoryType?: InputMaybe<Scalars["String"]>;
};

export type Tip = {
  __typename?: "Tip";
  blocks?: Maybe<Array<Maybe<TipBlocksDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  image: UploadFileEntityResponse;
  link?: Maybe<Scalars["String"]>;
  linkToServices?: Maybe<Array<Maybe<TipLinkToServicesDynamicZone>>>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  shortDescription?: Maybe<Scalars["String"]>;
  status?: Maybe<Enum_Tip_Status>;
  tags?: Maybe<TagRelationResponseCollection>;
  tipSubService?: Maybe<TipSubServiceEntityResponse>;
  title: Scalars["String"];
  titleLabel?: Maybe<Scalars["String"]>;
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  unpublishedDate?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
};

export type TipTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TipBlocksDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksImage
  | ComponentBlocksSubHeading
  | ComponentBlocksVideo
  | ComponentBlocksWysiwyg
  | Error;

export type TipEntity = {
  __typename?: "TipEntity";
  attributes?: Maybe<Tip>;
  id?: Maybe<Scalars["ID"]>;
};

export type TipEntityResponse = {
  __typename?: "TipEntityResponse";
  data?: Maybe<TipEntity>;
};

export type TipEntityResponseCollection = {
  __typename?: "TipEntityResponseCollection";
  data: Array<TipEntity>;
  meta: ResponseCollectionMeta;
};

export type TipFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TipFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isSystem?: InputMaybe<BooleanFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<TipFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TipFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  shortDescription?: InputMaybe<StringFilterInput>;
  status?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  tipSubService?: InputMaybe<TipSubServiceFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  titleLabel?: InputMaybe<StringFilterInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  unpublishedDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
};

export type TipInput = {
  blocks?: InputMaybe<Array<Scalars["TipBlocksDynamicZoneInput"]>>;
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  image?: InputMaybe<Scalars["ID"]>;
  isSystem?: InputMaybe<Scalars["Boolean"]>;
  link?: InputMaybe<Scalars["String"]>;
  linkToServices?: InputMaybe<
    Array<Scalars["TipLinkToServicesDynamicZoneInput"]>
  >;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  shortDescription?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<Enum_Tip_Status>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  tipSubService?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  titleLabel?: InputMaybe<Scalars["String"]>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  unpublishedDate?: InputMaybe<Scalars["DateTime"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
};

export type TipLinkToServicesDynamicZone =
  | ComponentLinksAlertNotification
  | ComponentLinksDropOffMap
  | ComponentLinksEditorial
  | ComponentLinksPickUpDay
  | ComponentLinksRecyclingGuide
  | ComponentLinksRequest
  | Error;

export type TipRelationResponseCollection = {
  __typename?: "TipRelationResponseCollection";
  data: Array<TipEntity>;
};

export type TipSubService = {
  __typename?: "TipSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  cities?: Maybe<CityRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  endDate?: Maybe<Scalars["Date"]>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  startDate?: Maybe<Scalars["Date"]>;
  tips?: Maybe<TipRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TipSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TipSubServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TipSubServiceTipsArgs = {
  filters?: InputMaybe<TipFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TipSubServiceEntity = {
  __typename?: "TipSubServiceEntity";
  attributes?: Maybe<TipSubService>;
  id?: Maybe<Scalars["ID"]>;
};

export type TipSubServiceEntityResponse = {
  __typename?: "TipSubServiceEntityResponse";
  data?: Maybe<TipSubServiceEntity>;
};

export type TipSubServiceEntityResponseCollection = {
  __typename?: "TipSubServiceEntityResponseCollection";
  data: Array<TipSubServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type TipSubServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TipSubServiceFiltersInput>>>;
  audienceTypes?: InputMaybe<AudienceTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  endDate?: InputMaybe<DateFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<TipSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TipSubServiceFiltersInput>>>;
  startDate?: InputMaybe<DateFilterInput>;
  tips?: InputMaybe<TipFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TipSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
  tips?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type TipSubServiceRelationResponseCollection = {
  __typename?: "TipSubServiceRelationResponseCollection";
  data: Array<TipSubServiceEntity>;
};

export type TopContentBlock = {
  __typename?: "TopContentBlock";
  createdAt?: Maybe<Scalars["DateTime"]>;
  displayBlock: Scalars["Boolean"];
  displayLastThreeContents: Scalars["Boolean"];
  hasTopContent: Scalars["Boolean"];
  homepage?: Maybe<HomepageEntityResponse>;
  titleContent: Scalars["String"];
  topContent?: Maybe<Array<Maybe<TopContentBlockTopContentDynamicZone>>>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TopContentBlockDto = {
  __typename?: "TopContentBlockDTO";
  displayBlock: Scalars["Boolean"];
  displayLastThreeContents: Scalars["Boolean"];
  hasTopContent: Scalars["Boolean"];
  id: Scalars["ID"];
  titleContent: Scalars["String"];
  topContent?: Maybe<EditoContentDto>;
};

export type TopContentBlockEntity = {
  __typename?: "TopContentBlockEntity";
  attributes?: Maybe<TopContentBlock>;
  id?: Maybe<Scalars["ID"]>;
};

export type TopContentBlockEntityResponse = {
  __typename?: "TopContentBlockEntityResponse";
  data?: Maybe<TopContentBlockEntity>;
};

export type TopContentBlockEntityResponseCollection = {
  __typename?: "TopContentBlockEntityResponseCollection";
  data: Array<TopContentBlockEntity>;
  meta: ResponseCollectionMeta;
};

export type TopContentBlockFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TopContentBlockFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  displayBlock?: InputMaybe<BooleanFilterInput>;
  displayLastThreeContents?: InputMaybe<BooleanFilterInput>;
  hasTopContent?: InputMaybe<BooleanFilterInput>;
  homepage?: InputMaybe<HomepageFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<TopContentBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TopContentBlockFiltersInput>>>;
  titleContent?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TopContentBlockInput = {
  displayBlock?: InputMaybe<Scalars["Boolean"]>;
  displayLastThreeContents?: InputMaybe<Scalars["Boolean"]>;
  hasTopContent?: InputMaybe<Scalars["Boolean"]>;
  homepage?: InputMaybe<Scalars["ID"]>;
  titleContent?: InputMaybe<Scalars["String"]>;
  topContent?: InputMaybe<
    Array<Scalars["TopContentBlockTopContentDynamicZoneInput"]>
  >;
};

export type TopContentBlockTopContentDynamicZone =
  | ComponentLinksTopContent
  | Error;

export type UploadFile = {
  __typename?: "UploadFile";
  alternativeText?: Maybe<Scalars["String"]>;
  caption?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  ext?: Maybe<Scalars["String"]>;
  formats?: Maybe<Scalars["JSON"]>;
  hash: Scalars["String"];
  height?: Maybe<Scalars["Int"]>;
  mime: Scalars["String"];
  name: Scalars["String"];
  previewUrl?: Maybe<Scalars["String"]>;
  provider: Scalars["String"];
  provider_metadata?: Maybe<Scalars["JSON"]>;
  related?: Maybe<Array<Maybe<GenericMorph>>>;
  size: Scalars["Float"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  url: Scalars["String"];
  width?: Maybe<Scalars["Int"]>;
};

export type UploadFileEntity = {
  __typename?: "UploadFileEntity";
  attributes?: Maybe<UploadFile>;
  id?: Maybe<Scalars["ID"]>;
};

export type UploadFileEntityResponse = {
  __typename?: "UploadFileEntityResponse";
  data?: Maybe<UploadFileEntity>;
};

export type UploadFileEntityResponseCollection = {
  __typename?: "UploadFileEntityResponseCollection";
  data: Array<UploadFileEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFileFiltersInput = {
  alternativeText?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  caption?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  ext?: InputMaybe<StringFilterInput>;
  folder?: InputMaybe<UploadFolderFiltersInput>;
  folderPath?: InputMaybe<StringFilterInput>;
  formats?: InputMaybe<JsonFilterInput>;
  hash?: InputMaybe<StringFilterInput>;
  height?: InputMaybe<IntFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  mime?: InputMaybe<StringFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFileFiltersInput>>>;
  previewUrl?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  provider_metadata?: InputMaybe<JsonFilterInput>;
  size?: InputMaybe<FloatFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  url?: InputMaybe<StringFilterInput>;
  width?: InputMaybe<IntFilterInput>;
};

export type UploadFileInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  ext?: InputMaybe<Scalars["String"]>;
  folder?: InputMaybe<Scalars["ID"]>;
  folderPath?: InputMaybe<Scalars["String"]>;
  formats?: InputMaybe<Scalars["JSON"]>;
  hash?: InputMaybe<Scalars["String"]>;
  height?: InputMaybe<Scalars["Int"]>;
  mime?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  previewUrl?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  provider_metadata?: InputMaybe<Scalars["JSON"]>;
  size?: InputMaybe<Scalars["Float"]>;
  url?: InputMaybe<Scalars["String"]>;
  width?: InputMaybe<Scalars["Int"]>;
};

export type UploadFileRelationResponseCollection = {
  __typename?: "UploadFileRelationResponseCollection";
  data: Array<UploadFileEntity>;
};

export type UploadFolder = {
  __typename?: "UploadFolder";
  children?: Maybe<UploadFolderRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  files?: Maybe<UploadFileRelationResponseCollection>;
  name: Scalars["String"];
  parent?: Maybe<UploadFolderEntityResponse>;
  path: Scalars["String"];
  pathId: Scalars["Int"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UploadFolderChildrenArgs = {
  filters?: InputMaybe<UploadFolderFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UploadFolderFilesArgs = {
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UploadFolderEntity = {
  __typename?: "UploadFolderEntity";
  attributes?: Maybe<UploadFolder>;
  id?: Maybe<Scalars["ID"]>;
};

export type UploadFolderEntityResponse = {
  __typename?: "UploadFolderEntityResponse";
  data?: Maybe<UploadFolderEntity>;
};

export type UploadFolderEntityResponseCollection = {
  __typename?: "UploadFolderEntityResponseCollection";
  data: Array<UploadFolderEntity>;
  meta: ResponseCollectionMeta;
};

export type UploadFolderFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  children?: InputMaybe<UploadFolderFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  files?: InputMaybe<UploadFileFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UploadFolderFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UploadFolderFiltersInput>>>;
  parent?: InputMaybe<UploadFolderFiltersInput>;
  path?: InputMaybe<StringFilterInput>;
  pathId?: InputMaybe<IntFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UploadFolderInput = {
  children?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  files?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  name?: InputMaybe<Scalars["String"]>;
  parent?: InputMaybe<Scalars["ID"]>;
  path?: InputMaybe<Scalars["String"]>;
  pathId?: InputMaybe<Scalars["Int"]>;
};

export type UploadFolderRelationResponseCollection = {
  __typename?: "UploadFolderRelationResponseCollection";
  data: Array<UploadFolderEntity>;
};

export type UploadResult = {
  __typename?: "UploadResult";
  id: Scalars["String"];
};

export type UserDataStorage = {
  __typename?: "UserDataStorage";
  createdAt?: Maybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  firstname?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
  request_takeds?: Maybe<RequestTakedRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UserDataStorageRequest_TakedsArgs = {
  filters?: InputMaybe<RequestTakedFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UserDataStorageEntity = {
  __typename?: "UserDataStorageEntity";
  attributes?: Maybe<UserDataStorage>;
  id?: Maybe<Scalars["ID"]>;
};

export type UserDataStorageEntityResponse = {
  __typename?: "UserDataStorageEntityResponse";
  data?: Maybe<UserDataStorageEntity>;
};

export type UserDataStorageEntityResponseCollection = {
  __typename?: "UserDataStorageEntityResponseCollection";
  data: Array<UserDataStorageEntity>;
  meta: ResponseCollectionMeta;
};

export type UserDataStorageFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UserDataStorageFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  firstname?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UserDataStorageFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UserDataStorageFiltersInput>>>;
  phone?: InputMaybe<StringFilterInput>;
  request_takeds?: InputMaybe<RequestTakedFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UserDataStorageInput = {
  email?: InputMaybe<Scalars["String"]>;
  firstname?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  request_takeds?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type UsersPermissionsCreateRolePayload = {
  __typename?: "UsersPermissionsCreateRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsDeleteRolePayload = {
  __typename?: "UsersPermissionsDeleteRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsLoginInput = {
  identifier: Scalars["String"];
  password: Scalars["String"];
  provider?: Scalars["String"];
};

export type UsersPermissionsLoginPayload = {
  __typename?: "UsersPermissionsLoginPayload";
  jwt?: Maybe<Scalars["String"]>;
  user: UsersPermissionsMe;
};

export type UsersPermissionsMe = {
  __typename?: "UsersPermissionsMe";
  blocked?: Maybe<Scalars["Boolean"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  email?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  role?: Maybe<UsersPermissionsMeRole>;
  username: Scalars["String"];
};

export type UsersPermissionsMeRole = {
  __typename?: "UsersPermissionsMeRole";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name: Scalars["String"];
  type?: Maybe<Scalars["String"]>;
};

export type UsersPermissionsPasswordPayload = {
  __typename?: "UsersPermissionsPasswordPayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsPermission = {
  __typename?: "UsersPermissionsPermission";
  action: Scalars["String"];
  createdAt?: Maybe<Scalars["DateTime"]>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UsersPermissionsPermissionEntity = {
  __typename?: "UsersPermissionsPermissionEntity";
  attributes?: Maybe<UsersPermissionsPermission>;
  id?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsPermissionFiltersInput = {
  action?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsPermissionFiltersInput>>>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type UsersPermissionsPermissionRelationResponseCollection = {
  __typename?: "UsersPermissionsPermissionRelationResponseCollection";
  data: Array<UsersPermissionsPermissionEntity>;
};

export type UsersPermissionsRegisterInput = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type UsersPermissionsRole = {
  __typename?: "UsersPermissionsRole";
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  permissions?: Maybe<UsersPermissionsPermissionRelationResponseCollection>;
  type?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
};

export type UsersPermissionsRolePermissionsArgs = {
  filters?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UsersPermissionsRoleUsersArgs = {
  filters?: InputMaybe<UsersPermissionsUserFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type UsersPermissionsRoleEntity = {
  __typename?: "UsersPermissionsRoleEntity";
  attributes?: Maybe<UsersPermissionsRole>;
  id?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsRoleEntityResponse = {
  __typename?: "UsersPermissionsRoleEntityResponse";
  data?: Maybe<UsersPermissionsRoleEntity>;
};

export type UsersPermissionsRoleEntityResponseCollection = {
  __typename?: "UsersPermissionsRoleEntityResponseCollection";
  data: Array<UsersPermissionsRoleEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsRoleFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsRoleFiltersInput>>>;
  permissions?: InputMaybe<UsersPermissionsPermissionFiltersInput>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type UsersPermissionsRoleInput = {
  description?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  type?: InputMaybe<Scalars["String"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type UsersPermissionsUpdateRolePayload = {
  __typename?: "UsersPermissionsUpdateRolePayload";
  ok: Scalars["Boolean"];
};

export type UsersPermissionsUser = {
  __typename?: "UsersPermissionsUser";
  blocked?: Maybe<Scalars["Boolean"]>;
  confirmed?: Maybe<Scalars["Boolean"]>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  provider?: Maybe<Scalars["String"]>;
  role?: Maybe<UsersPermissionsRoleEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  username: Scalars["String"];
};

export type UsersPermissionsUserEntity = {
  __typename?: "UsersPermissionsUserEntity";
  attributes?: Maybe<UsersPermissionsUser>;
  id?: Maybe<Scalars["ID"]>;
};

export type UsersPermissionsUserEntityResponse = {
  __typename?: "UsersPermissionsUserEntityResponse";
  data?: Maybe<UsersPermissionsUserEntity>;
};

export type UsersPermissionsUserEntityResponseCollection = {
  __typename?: "UsersPermissionsUserEntityResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
  meta: ResponseCollectionMeta;
};

export type UsersPermissionsUserFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  blocked?: InputMaybe<BooleanFilterInput>;
  confirmationToken?: InputMaybe<StringFilterInput>;
  confirmed?: InputMaybe<BooleanFilterInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  email?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<UsersPermissionsUserFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<UsersPermissionsUserFiltersInput>>>;
  password?: InputMaybe<StringFilterInput>;
  provider?: InputMaybe<StringFilterInput>;
  resetPasswordToken?: InputMaybe<StringFilterInput>;
  role?: InputMaybe<UsersPermissionsRoleFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  username?: InputMaybe<StringFilterInput>;
};

export type UsersPermissionsUserInput = {
  blocked?: InputMaybe<Scalars["Boolean"]>;
  confirmationToken?: InputMaybe<Scalars["String"]>;
  confirmed?: InputMaybe<Scalars["Boolean"]>;
  contract?: InputMaybe<Scalars["ID"]>;
  email?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
  provider?: InputMaybe<Scalars["String"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["ID"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: "UsersPermissionsUserRelationResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
};

export type WasteFamily = {
  __typename?: "WasteFamily";
  createdAt?: Maybe<Scalars["DateTime"]>;
  familyName: Scalars["String"];
  isSystem: Scalars["Boolean"];
  recyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  wasteForms?: Maybe<WasteFormRelationResponseCollection>;
};

export type WasteFamilyWasteFormsArgs = {
  filters?: InputMaybe<WasteFormFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WasteFamilyEntity = {
  __typename?: "WasteFamilyEntity";
  attributes?: Maybe<WasteFamily>;
  id?: Maybe<Scalars["ID"]>;
};

export type WasteFamilyEntityResponse = {
  __typename?: "WasteFamilyEntityResponse";
  data?: Maybe<WasteFamilyEntity>;
};

export type WasteFamilyEntityResponseCollection = {
  __typename?: "WasteFamilyEntityResponseCollection";
  data: Array<WasteFamilyEntity>;
  meta: ResponseCollectionMeta;
};

export type WasteFamilyFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WasteFamilyFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  familyName?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isSystem?: InputMaybe<BooleanFilterInput>;
  not?: InputMaybe<WasteFamilyFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<WasteFamilyFiltersInput>>>;
  recyclingGuideService?: InputMaybe<RecyclingGuideServiceFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  wasteForms?: InputMaybe<WasteFormFiltersInput>;
};

export type WasteFamilyInput = {
  familyName?: InputMaybe<Scalars["String"]>;
  isSystem?: InputMaybe<Scalars["Boolean"]>;
  recyclingGuideService?: InputMaybe<Scalars["ID"]>;
  wasteForms?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type WasteFamilyRelationResponseCollection = {
  __typename?: "WasteFamilyRelationResponseCollection";
  data: Array<WasteFamilyEntity>;
};

export type WasteForm = {
  __typename?: "WasteForm";
  contentBlock?: Maybe<Array<Maybe<WasteFormContentBlockDynamicZone>>>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  customId?: Maybe<Scalars["String"]>;
  draftCreationId?: Maybe<Scalars["String"]>;
  flow?: Maybe<FlowEntityResponse>;
  hasDraft?: Maybe<Scalars["Boolean"]>;
  isHidden?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  publishedDate?: Maybe<Scalars["DateTime"]>;
  recyclingGestureText?: Maybe<Scalars["String"]>;
  recyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  status?: Maybe<Enum_Wasteform_Status>;
  tags?: Maybe<TagRelationResponseCollection>;
  toBeUpdated?: Maybe<Scalars["Boolean"]>;
  unpublishedDate?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  versionNumber?: Maybe<Scalars["Int"]>;
  wasteFamily?: Maybe<WasteFamilyEntityResponse>;
};

export type WasteFormTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type WasteFormContentBlockDynamicZone =
  | ComponentBlocksFile
  | ComponentBlocksHorizontalRule
  | ComponentBlocksImage
  | ComponentBlocksSubHeading
  | ComponentBlocksVideo
  | ComponentBlocksWysiwyg
  | Error;

export type WasteFormEntity = {
  __typename?: "WasteFormEntity";
  attributes?: Maybe<WasteForm>;
  id?: Maybe<Scalars["ID"]>;
};

export type WasteFormEntityResponse = {
  __typename?: "WasteFormEntityResponse";
  data?: Maybe<WasteFormEntity>;
};

export type WasteFormEntityResponseCollection = {
  __typename?: "WasteFormEntityResponseCollection";
  data: Array<WasteFormEntity>;
  meta: ResponseCollectionMeta;
};

export type WasteFormFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<WasteFormFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  customId?: InputMaybe<StringFilterInput>;
  draftCreationId?: InputMaybe<StringFilterInput>;
  flow?: InputMaybe<FlowFiltersInput>;
  hasDraft?: InputMaybe<BooleanFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isHidden?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<WasteFormFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<WasteFormFiltersInput>>>;
  publishedDate?: InputMaybe<DateTimeFilterInput>;
  recyclingGestureText?: InputMaybe<StringFilterInput>;
  recyclingGuideService?: InputMaybe<RecyclingGuideServiceFiltersInput>;
  status?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  toBeUpdated?: InputMaybe<BooleanFilterInput>;
  unpublishedDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  versionNumber?: InputMaybe<IntFilterInput>;
  wasteFamily?: InputMaybe<WasteFamilyFiltersInput>;
};

export type WasteFormInput = {
  contentBlock?: InputMaybe<
    Array<Scalars["WasteFormContentBlockDynamicZoneInput"]>
  >;
  customId?: InputMaybe<Scalars["String"]>;
  draftCreationId?: InputMaybe<Scalars["String"]>;
  flow?: InputMaybe<Scalars["ID"]>;
  hasDraft?: InputMaybe<Scalars["Boolean"]>;
  isHidden?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  picto?: InputMaybe<Scalars["ID"]>;
  publishedDate?: InputMaybe<Scalars["DateTime"]>;
  recyclingGestureText?: InputMaybe<Scalars["String"]>;
  recyclingGuideService?: InputMaybe<Scalars["ID"]>;
  status?: InputMaybe<Enum_Wasteform_Status>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  toBeUpdated?: InputMaybe<Scalars["Boolean"]>;
  unpublishedDate?: InputMaybe<Scalars["DateTime"]>;
  versionNumber?: InputMaybe<Scalars["Int"]>;
  wasteFamily?: InputMaybe<Scalars["ID"]>;
};

export type WasteFormRelationResponseCollection = {
  __typename?: "WasteFormRelationResponseCollection";
  data: Array<WasteFormEntity>;
};

export type YesWeScanService = {
  __typename?: "YesWeScanService";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  endDate?: Maybe<Scalars["DateTime"]>;
  serviceName?: Maybe<Scalars["String"]>;
  startDate?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type YesWeScanServiceEntity = {
  __typename?: "YesWeScanServiceEntity";
  attributes?: Maybe<YesWeScanService>;
  id?: Maybe<Scalars["ID"]>;
};

export type YesWeScanServiceEntityResponse = {
  __typename?: "YesWeScanServiceEntityResponse";
  data?: Maybe<YesWeScanServiceEntity>;
};

export type YesWeScanServiceEntityResponseCollection = {
  __typename?: "YesWeScanServiceEntityResponseCollection";
  data: Array<YesWeScanServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type YesWeScanServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<YesWeScanServiceFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<YesWeScanServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<YesWeScanServiceFiltersInput>>>;
  serviceName?: InputMaybe<StringFilterInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type YesWeScanServiceInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  serviceName?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
};

export type YesWeScanServiceRelationResponseCollection = {
  __typename?: "YesWeScanServiceRelationResponseCollection";
  data: Array<YesWeScanServiceEntity>;
};

export type ClientName = {
  __typename?: "clientName";
  clientName?: Maybe<Scalars["String"]>;
};

export type ContractStatus = {
  __typename?: "contractStatus";
  contractId?: Maybe<Scalars["ID"]>;
};

export type TotalCountPerTag = {
  __typename?: "totalCountPerTag";
  count: Scalars["Int"];
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type CreateNewMutationVariables = Exact<{
  data: NewInput;
}>;

export type CreateNewMutation = {
  __typename?: "Mutation";
  createNew?: {
    __typename?: "NewEntityResponse";
    data?: {
      __typename?: "NewEntity";
      id?: string | null;
      attributes?: {
        __typename?: "New";
        customId?: string | null;
        title: string;
        shortDescription?: string | null;
        status?: Enum_New_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        newsSubService?: {
          __typename?: "NewsSubServiceEntityResponse";
          data?: {
            __typename?: "NewsSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        } | null;
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteNewMutationVariables = Exact<{
  deleteNewId: Scalars["ID"];
}>;

export type DeleteNewMutation = {
  __typename?: "Mutation";
  deleteNew?: {
    __typename?: "NewEntityResponse";
    data?: {
      __typename?: "NewEntity";
      id?: string | null;
      attributes?: {
        __typename?: "New";
        customId?: string | null;
        title: string;
        shortDescription?: string | null;
        status?: Enum_New_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        newsSubService?: {
          __typename?: "NewsSubServiceEntityResponse";
          data?: {
            __typename?: "NewsSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        } | null;
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetAllVersionsOfNewsByCustomIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  customId?: InputMaybe<Scalars["String"]>;
  statusFilter?: InputMaybe<StringFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type GetAllVersionsOfNewsByCustomIdQuery = {
  __typename?: "Query";
  newsCount?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  newsCountDraft?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  newsCountPublished?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  newsCountArchived?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  news?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
    data: Array<{
      __typename?: "NewEntity";
      id?: string | null;
      attributes?: {
        __typename?: "New";
        versionNumber?: number | null;
        status?: Enum_New_Status | null;
        publishedDate?: any | null;
        updatedAt?: any | null;
      } | null;
    }>;
  } | null;
};

export type GetNewByIdQueryVariables = Exact<{
  newId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetNewByIdQuery = {
  __typename?: "Query";
  new?: {
    __typename?: "NewEntityResponse";
    data?: {
      __typename?: "NewEntity";
      id?: string | null;
      attributes?: {
        __typename?: "New";
        customId?: string | null;
        draftCreationId?: string | null;
        title: string;
        shortDescription?: string | null;
        status?: Enum_New_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        newsSubService?: {
          __typename?: "NewsSubServiceEntityResponse";
          data?: {
            __typename?: "NewsSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        } | null;
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetNewDraftQueryVariables = Exact<{
  customId: Scalars["String"];
}>;

export type GetNewDraftQuery = {
  __typename?: "Query";
  news?: {
    __typename?: "NewEntityResponseCollection";
    data: Array<{ __typename?: "NewEntity"; id?: string | null }>;
  } | null;
};

export type GetNewsByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  statusFilter?: InputMaybe<StringFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type GetNewsByContractIdQuery = {
  __typename?: "Query";
  newsCount?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  newsCountDraft?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  newsCountPublished?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  newsCountArchived?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  news?: {
    __typename?: "NewEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
    data: Array<{
      __typename?: "NewEntity";
      id?: string | null;
      attributes?: {
        __typename?: "New";
        title: string;
        shortDescription?: string | null;
        status?: Enum_New_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
      } | null;
    }>;
  } | null;
};

export type UpdateNewMutationVariables = Exact<{
  updateNewId: Scalars["ID"];
  data: NewInput;
}>;

export type UpdateNewMutation = {
  __typename?: "Mutation";
  updateNew?: {
    __typename?: "NewEntityResponse";
    data?: {
      __typename?: "NewEntity";
      id?: string | null;
      attributes?: {
        __typename?: "New";
        customId?: string | null;
        title: string;
        shortDescription?: string | null;
        status?: Enum_New_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        newsSubService?: {
          __typename?: "NewsSubServiceEntityResponse";
          data?: {
            __typename?: "NewsSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        } | null;
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type CreateTipMutationVariables = Exact<{
  data: TipInput;
}>;

export type CreateTipMutation = {
  __typename?: "Mutation";
  createTip?: {
    __typename?: "TipEntityResponse";
    data?: {
      __typename?: "TipEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Tip";
        title: string;
        shortDescription?: string | null;
        status?: Enum_Tip_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        tipSubService?: {
          __typename?: "TipSubServiceEntityResponse";
          data?: {
            __typename?: "TipSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        };
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteTipMutationVariables = Exact<{
  deleteTipId: Scalars["ID"];
}>;

export type DeleteTipMutation = {
  __typename?: "Mutation";
  deleteTip?: {
    __typename?: "TipEntityResponse";
    data?: {
      __typename?: "TipEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Tip";
        title: string;
        shortDescription?: string | null;
        status?: Enum_Tip_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        tipSubService?: {
          __typename?: "TipSubServiceEntityResponse";
          data?: {
            __typename?: "TipSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        };
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetAllVersionsOfTipByCustomIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  customId?: InputMaybe<Scalars["String"]>;
  statusFilter?: InputMaybe<StringFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type GetAllVersionsOfTipByCustomIdQuery = {
  __typename?: "Query";
  tipsCount?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  tipsCountDraft?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  tipsCountPublished?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  tipsCountArchived?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  tips?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
    data: Array<{
      __typename?: "TipEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Tip";
        versionNumber?: number | null;
        status?: Enum_Tip_Status | null;
        publishedDate?: any | null;
        updatedAt?: any | null;
      } | null;
    }>;
  } | null;
};

export type GetTipByIdQueryVariables = Exact<{
  tipId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetTipByIdQuery = {
  __typename?: "Query";
  tip?: {
    __typename?: "TipEntityResponse";
    data?: {
      __typename?: "TipEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Tip";
        customId?: string | null;
        draftCreationId?: string | null;
        title: string;
        shortDescription?: string | null;
        status?: Enum_Tip_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        tipSubService?: {
          __typename?: "TipSubServiceEntityResponse";
          data?: {
            __typename?: "TipSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        };
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetTipDraftQueryVariables = Exact<{
  customId: Scalars["String"];
}>;

export type GetTipDraftQuery = {
  __typename?: "Query";
  tips?: {
    __typename?: "TipEntityResponseCollection";
    data: Array<{ __typename?: "TipEntity"; id?: string | null }>;
  } | null;
};

export type GetTipsByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  statusFilter?: InputMaybe<StringFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type GetTipsByContractIdQuery = {
  __typename?: "Query";
  tipsCount?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  tipsCountDraft?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  tipsCountPublished?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  tipsCountArchived?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  tips?: {
    __typename?: "TipEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
    data: Array<{
      __typename?: "TipEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Tip";
        title: string;
        shortDescription?: string | null;
        status?: Enum_Tip_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
      } | null;
    }>;
  } | null;
};

export type UpdateTipMutationVariables = Exact<{
  updateTipId: Scalars["ID"];
  data: TipInput;
}>;

export type UpdateTipMutation = {
  __typename?: "Mutation";
  updateTip?: {
    __typename?: "TipEntityResponse";
    data?: {
      __typename?: "TipEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Tip";
        customId?: string | null;
        title: string;
        shortDescription?: string | null;
        status?: Enum_Tip_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        tipSubService?: {
          __typename?: "TipSubServiceEntityResponse";
          data?: {
            __typename?: "TipSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        };
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type CreateNewFolderMutationVariables = Exact<{
  name: Scalars["String"];
  parentFolderPath: Scalars["String"];
  parentFolderPathId: Scalars["ID"];
}>;

export type CreateNewFolderMutation = {
  __typename?: "Mutation";
  createNewFolder?: {
    __typename?: "RequestFolderEntity";
    id?: string | null;
    name?: string | null;
    path?: string | null;
    pathId?: string | null;
  } | null;
};

export type GetAllFoldersHierarchyQueryVariables = Exact<{
  path: Scalars["String"];
}>;

export type GetAllFoldersHierarchyQuery = {
  __typename?: "Query";
  getAllFoldersHierarchy?: Array<{
    __typename?: "RequestFolders";
    id?: string | null;
    name?: string | null;
    path?: string | null;
    pathId?: string | null;
  } | null> | null;
};

export type GetFilesPaginationByPathIdQueryVariables = Exact<{
  filters?: InputMaybe<UploadFileFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type GetFilesPaginationByPathIdQuery = {
  __typename?: "Query";
  uploadFiles?: {
    __typename?: "UploadFileEntityResponseCollection";
    data: Array<{
      __typename?: "UploadFileEntity";
      id?: string | null;
      attributes?: {
        __typename?: "UploadFile";
        name: string;
        mime: string;
        size: number;
        width?: number | null;
        height?: number | null;
        createdAt?: any | null;
        url: string;
        ext?: string | null;
        alternativeText?: string | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        total: number;
        pageSize: number;
        pageCount: number;
        page: number;
      };
    };
  } | null;
};

export type GetFolderAndChildrenByIdQueryVariables = Exact<{
  filters?: InputMaybe<UploadFolderFiltersInput>;
}>;

export type GetFolderAndChildrenByIdQuery = {
  __typename?: "Query";
  uploadFolders?: {
    __typename?: "UploadFolderEntityResponseCollection";
    data: Array<{
      __typename?: "UploadFolderEntity";
      id?: string | null;
      attributes?: {
        __typename?: "UploadFolder";
        name: string;
        pathId: number;
        path: string;
        files?: {
          __typename?: "UploadFileRelationResponseCollection";
          data: Array<{ __typename?: "UploadFileEntity"; id?: string | null }>;
        } | null;
        children?: {
          __typename?: "UploadFolderRelationResponseCollection";
          data: Array<{
            __typename?: "UploadFolderEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFolder";
              name: string;
              pathId: number;
              path: string;
              files?: {
                __typename?: "UploadFileRelationResponseCollection";
                data: Array<{
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                }>;
              } | null;
              children?: {
                __typename?: "UploadFolderRelationResponseCollection";
                data: Array<{
                  __typename?: "UploadFolderEntity";
                  id?: string | null;
                }>;
              } | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetFolderBreadcrumbQueryVariables = Exact<{
  path: Scalars["String"];
}>;

export type GetFolderBreadcrumbQuery = {
  __typename?: "Query";
  libraryBreadcrumbTrail?: Array<{
    __typename?: "Folders";
    id?: string | null;
    name?: string | null;
    path?: string | null;
    pathId?: string | null;
  } | null> | null;
};

export type GetFolderByPathIdQueryVariables = Exact<{
  pathId: Scalars["Int"];
}>;

export type GetFolderByPathIdQuery = {
  __typename?: "Query";
  uploadFolders?: {
    __typename?: "UploadFolderEntityResponseCollection";
    data: Array<{
      __typename?: "UploadFolderEntity";
      id?: string | null;
      attributes?: {
        __typename?: "UploadFolder";
        name: string;
        pathId: number;
        path: string;
      } | null;
    }>;
  } | null;
};

export type UpdateUploadFileMutationVariables = Exact<{
  updateUploadFileId: Scalars["ID"];
  data: UploadFileInput;
}>;

export type UpdateUploadFileMutation = {
  __typename?: "Mutation";
  updateUploadFile?: {
    __typename?: "UploadFileEntityResponse";
    data?: {
      __typename?: "UploadFileEntity";
      id?: string | null;
      attributes?: {
        __typename?: "UploadFile";
        createdAt?: any | null;
        hash: string;
        mime: string;
        name: string;
        provider: string;
        size: number;
        url: string;
        alternativeText?: string | null;
        ext?: string | null;
        height?: number | null;
        width?: number | null;
        related?: Array<
          | { __typename?: "Accessibility" }
          | { __typename?: "AccessibilitySubService" }
          | { __typename?: "AlertNotification" }
          | { __typename?: "AlertNotificationService" }
          | { __typename?: "AudienceType" }
          | { __typename?: "Cgu" }
          | { __typename?: "CguSubService" }
          | { __typename?: "ChannelType" }
          | { __typename?: "City" }
          | { __typename?: "ClientContact" }
          | { __typename?: "CollectDoorToDoor" }
          | { __typename?: "CollectDropOff" }
          | { __typename?: "CollectVoluntary" }
          | { __typename?: "ComponentBlocksAttachments" }
          | { __typename?: "ComponentBlocksCheckbox" }
          | { __typename?: "ComponentBlocksCommentary" }
          | { __typename?: "ComponentBlocksCumbersome" }
          | { __typename?: "ComponentBlocksDateChoice" }
          | { __typename?: "ComponentBlocksDownloadBlock" }
          | { __typename?: "ComponentBlocksFile" }
          | { __typename?: "ComponentBlocksHorizontalRule" }
          | { __typename?: "ComponentBlocksImage" }
          | { __typename?: "ComponentBlocksOpeningDay" }
          | { __typename?: "ComponentBlocksProofOfReceipt" }
          | { __typename?: "ComponentBlocksQcm" }
          | { __typename?: "ComponentBlocksQuestions" }
          | { __typename?: "ComponentBlocksRequestSlotsExceptions" }
          | { __typename?: "ComponentBlocksRequestType" }
          | { __typename?: "ComponentBlocksSubHeading" }
          | { __typename?: "ComponentBlocksTest" }
          | { __typename?: "ComponentBlocksVideo" }
          | { __typename?: "ComponentBlocksWysiwyg" }
          | { __typename?: "ComponentLinksAlertNotification" }
          | { __typename?: "ComponentLinksContactUs" }
          | { __typename?: "ComponentLinksDropOffMap" }
          | { __typename?: "ComponentLinksEditoContent" }
          | { __typename?: "ComponentLinksEditorial" }
          | { __typename?: "ComponentLinksEvents" }
          | { __typename?: "ComponentLinksExternal" }
          | { __typename?: "ComponentLinksFrees" }
          | { __typename?: "ComponentLinksKeyMetrics" }
          | { __typename?: "ComponentLinksMyWasteCounter" }
          | { __typename?: "ComponentLinksNews" }
          | { __typename?: "ComponentLinksPickUpDay" }
          | { __typename?: "ComponentLinksQuizzes" }
          | { __typename?: "ComponentLinksRecyclingGuide" }
          | { __typename?: "ComponentLinksRequest" }
          | { __typename?: "ComponentLinksTips" }
          | { __typename?: "ComponentLinksTopContent" }
          | { __typename?: "Confidentiality" }
          | { __typename?: "ConfidentialitySubService" }
          | { __typename?: "ContactUs" }
          | { __typename?: "ContactUsSubService" }
          | { __typename?: "Contract" }
          | { __typename?: "ContractCustomization" }
          | { __typename?: "ContractMenu" }
          | { __typename?: "Cookie" }
          | { __typename?: "CookiesSubService" }
          | { __typename?: "DescriptionService" }
          | { __typename?: "Document" }
          | { __typename?: "DropOffMap" }
          | { __typename?: "DropOffMapService" }
          | { __typename?: "EditoBlock" }
          | { __typename?: "EditorialService" }
          | { __typename?: "Epci" }
          | { __typename?: "Event" }
          | { __typename?: "EventSubService" }
          | { __typename?: "ExportEntity" }
          | { __typename?: "Flow" }
          | { __typename?: "FlowColor" }
          | { __typename?: "Footer" }
          | { __typename?: "FreeContent" }
          | { __typename?: "FreeContentSubService" }
          | { __typename?: "Global" }
          | { __typename?: "Homepage" }
          | { __typename?: "I18NLocale" }
          | { __typename?: "InformationMessage" }
          | { __typename?: "KeyMetric" }
          | { __typename?: "KeyMetricsService" }
          | { __typename?: "MwCounterService" }
          | { __typename?: "MwcContact" }
          | { __typename?: "MwcFlow" }
          | { __typename?: "MyWasteCounter" }
          | { __typename?: "New" }
          | { __typename?: "NewsSubService" }
          | { __typename?: "PickUpDay" }
          | { __typename?: "PickUpDayService" }
          | { __typename?: "Quiz" }
          | { __typename?: "QuizAndTipsBlock" }
          | { __typename?: "QuizSubService" }
          | { __typename?: "RecyclingGuideBlock" }
          | { __typename?: "RecyclingGuideService" }
          | { __typename?: "Request" }
          | { __typename?: "RequestAggregate" }
          | { __typename?: "RequestService" }
          | { __typename?: "RequestSlot" }
          | { __typename?: "RequestTaked" }
          | { __typename?: "SearchEngineBlock" }
          | { __typename?: "Sectorization" }
          | { __typename?: "ServicesBlock" }
          | { __typename?: "Tag" }
          | { __typename?: "Territory" }
          | { __typename?: "TerritoryType" }
          | { __typename?: "Tip" }
          | { __typename?: "TipSubService" }
          | { __typename?: "TopContentBlock" }
          | { __typename?: "UploadFile" }
          | {
              __typename?: "UploadFolder";
              name: string;
              path: string;
              pathId: number;
            }
          | { __typename?: "UserDataStorage" }
          | { __typename?: "UsersPermissionsPermission" }
          | { __typename?: "UsersPermissionsRole" }
          | { __typename?: "UsersPermissionsUser" }
          | { __typename?: "WasteFamily" }
          | { __typename?: "WasteForm" }
          | { __typename?: "YesWeScanService" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateUploadFolderMutationVariables = Exact<{
  updateUploadFolderId: Scalars["ID"];
  data: UploadFolderInput;
}>;

export type UpdateUploadFolderMutation = {
  __typename?: "Mutation";
  updateUploadFolder?: {
    __typename?: "UploadFolderEntityResponse";
    data?: {
      __typename?: "UploadFolderEntity";
      id?: string | null;
      attributes?: {
        __typename?: "UploadFolder";
        pathId: number;
        updatedAt?: any | null;
        name: string;
        path: string;
        children?: {
          __typename?: "UploadFolderRelationResponseCollection";
          data: Array<{
            __typename?: "UploadFolderEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFolder";
              name: string;
              path: string;
              pathId: number;
              children?: {
                __typename?: "UploadFolderRelationResponseCollection";
                data: Array<{
                  __typename?: "UploadFolderEntity";
                  id?: string | null;
                }>;
              } | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UploadGraphQlMutationVariables = Exact<{
  refId?: InputMaybe<Scalars["ID"]>;
  ref?: InputMaybe<Scalars["String"]>;
  field?: InputMaybe<Scalars["String"]>;
  info?: InputMaybe<FileInfoInput>;
  file: Scalars["Upload"];
}>;

export type UploadGraphQlMutation = {
  __typename?: "Mutation";
  uploadGraphQL?: boolean | null;
};

export type GetContactUsByIdQueryVariables = Exact<{
  contactUsId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetContactUsByIdQuery = {
  __typename?: "Query";
  contactUs?: {
    __typename?: "ContactUsEntityResponse";
    data?: {
      __typename?: "ContactUsEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ContactUs";
        customId?: string | null;
        title: string;
        status?: Enum_Contactus_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetContactUsesByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetContactUsesByContractIdQuery = {
  __typename?: "Query";
  contactUsSubServices?: {
    __typename?: "ContactUsSubServiceEntityResponseCollection";
    data: Array<{
      __typename?: "ContactUsSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ContactUsSubService";
        name: string;
        isActivated?: boolean | null;
        contactUses?: {
          __typename?: "ContactUsRelationResponseCollection";
          data: Array<{ __typename?: "ContactUsEntity"; id?: string | null }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type UpdateContactUsMutationVariables = Exact<{
  updateContactUsId: Scalars["ID"];
  data: ContactUsInput;
}>;

export type UpdateContactUsMutation = {
  __typename?: "Mutation";
  updateContactUs?: {
    __typename?: "ContactUsEntityResponse";
    data?: {
      __typename?: "ContactUsEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ContactUs";
        title: string;
        status?: Enum_Contactus_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type CreateFreeContentMutationVariables = Exact<{
  data: FreeContentInput;
}>;

export type CreateFreeContentMutation = {
  __typename?: "Mutation";
  createFreeContent?: {
    __typename?: "FreeContentEntityResponse";
    data?: {
      __typename?: "FreeContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "FreeContent";
        title: string;
        shortDescription?: string | null;
        status?: Enum_Freecontent_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        freeContentSubService?: {
          __typename?: "FreeContentSubServiceEntityResponse";
          data?: {
            __typename?: "FreeContentSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        };
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteFreeContentMutationVariables = Exact<{
  deleteFreeContentId: Scalars["ID"];
}>;

export type DeleteFreeContentMutation = {
  __typename?: "Mutation";
  deleteFreeContent?: {
    __typename?: "FreeContentEntityResponse";
    data?: {
      __typename?: "FreeContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "FreeContent";
        title: string;
        shortDescription?: string | null;
        status?: Enum_Freecontent_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        freeContentSubService?: {
          __typename?: "FreeContentSubServiceEntityResponse";
          data?: {
            __typename?: "FreeContentSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        };
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetAllVersionsOfFreeContentByCustomIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  customId?: InputMaybe<Scalars["String"]>;
  freeContentSubServiceId: Scalars["ID"];
  statusFilter?: InputMaybe<StringFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type GetAllVersionsOfFreeContentByCustomIdQuery = {
  __typename?: "Query";
  freeContentsCount?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  freeContentsCountDraft?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  freeContentsCountPublished?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  freeContentsCountArchived?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  freeContents?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
    data: Array<{
      __typename?: "FreeContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "FreeContent";
        versionNumber?: number | null;
        status?: Enum_Freecontent_Status | null;
        publishedDate?: any | null;
        updatedAt?: any | null;
        freeContentSubService?: {
          __typename?: "FreeContentSubServiceEntityResponse";
          data?: {
            __typename?: "FreeContentSubServiceEntity";
            attributes?: {
              __typename?: "FreeContentSubService";
              name: string;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetFreeContentByIdQueryVariables = Exact<{
  freeContentId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetFreeContentByIdQuery = {
  __typename?: "Query";
  freeContent?: {
    __typename?: "FreeContentEntityResponse";
    data?: {
      __typename?: "FreeContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "FreeContent";
        customId?: string | null;
        draftCreationId?: string | null;
        title: string;
        shortDescription?: string | null;
        status?: Enum_Freecontent_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        freeContentSubService?: {
          __typename?: "FreeContentSubServiceEntityResponse";
          data?: {
            __typename?: "FreeContentSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        };
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetFreeContentDraftQueryVariables = Exact<{
  customId: Scalars["String"];
}>;

export type GetFreeContentDraftQuery = {
  __typename?: "Query";
  freeContents?: {
    __typename?: "FreeContentEntityResponseCollection";
    data: Array<{ __typename?: "FreeContentEntity"; id?: string | null }>;
  } | null;
};

export type GetFreeContentSubServiceByIdQueryVariables = Exact<{
  freeContentSubServiceId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetFreeContentSubServiceByIdQuery = {
  __typename?: "Query";
  freeContentSubService?: {
    __typename?: "FreeContentSubServiceEntityResponse";
    data?: {
      __typename?: "FreeContentSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "FreeContentSubService";
        name: string;
        isActivated: boolean;
      } | null;
    } | null;
  } | null;
};

export type GetFreeContentsBySubServiceIdQueryVariables = Exact<{
  freeContentSubServiceId: Scalars["ID"];
  statusFilter?: InputMaybe<StringFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type GetFreeContentsBySubServiceIdQuery = {
  __typename?: "Query";
  freeContentsCount?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  freeContentsCountDraft?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  freeContentsCountPublished?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  freeContentsCountArchived?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  freeContents?: {
    __typename?: "FreeContentEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
    data: Array<{
      __typename?: "FreeContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "FreeContent";
        title: string;
        shortDescription?: string | null;
        status?: Enum_Freecontent_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
      } | null;
    }>;
  } | null;
};

export type UpdateFreeContentMutationVariables = Exact<{
  updateFreeContentId: Scalars["ID"];
  data: FreeContentInput;
}>;

export type UpdateFreeContentMutation = {
  __typename?: "Mutation";
  updateFreeContent?: {
    __typename?: "FreeContentEntityResponse";
    data?: {
      __typename?: "FreeContentEntity";
      id?: string | null;
      attributes?: {
        __typename?: "FreeContent";
        customId?: string | null;
        title: string;
        shortDescription?: string | null;
        status?: Enum_Freecontent_Status | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        freeContentSubService?: {
          __typename?: "FreeContentSubServiceEntityResponse";
          data?: {
            __typename?: "FreeContentSubServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        image: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        };
        blocks?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              id: string;
              hr?: string | null;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              isDecorative?: boolean | null;
              altText?: string | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    ext?: string | null;
                    height?: number | null;
                    width?: number | null;
                    createdAt?: any | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingText?: string | null;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              videoLink?: string | null;
              transcriptText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetTagsByContractIdQueryVariables = Exact<{
  contractId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetTagsByContractIdQuery = {
  __typename?: "Query";
  tags?: {
    __typename?: "TagEntityResponseCollection";
    data: Array<{
      __typename?: "TagEntity";
      id?: string | null;
      attributes?: { __typename?: "Tag"; name: string } | null;
    }>;
  } | null;
};

export type CountContentPerTagQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type CountContentPerTagQuery = {
  __typename?: "Query";
  countContentPerTag?: Array<{
    __typename?: "totalCountPerTag";
    id: string;
    name: string;
    count: number;
  } | null> | null;
};

export type CreateNewTagMutationVariables = Exact<{
  contractId: Scalars["ID"];
  tagName: Scalars["String"];
}>;

export type CreateNewTagMutation = {
  __typename?: "Mutation";
  createNewTag?: {
    __typename?: "RequestTagEntity";
    contractId?: string | null;
    id?: string | null;
    name?: string | null;
  } | null;
};

export type DeleteTagMutationVariables = Exact<{
  deleteTagId: Scalars["ID"];
}>;

export type DeleteTagMutation = {
  __typename?: "Mutation";
  deleteTag?: {
    __typename?: "TagEntityResponse";
    data?: {
      __typename?: "TagEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Tag";
        name: string;
        createdAt?: any | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateTagMutationVariables = Exact<{
  updateTagId: Scalars["ID"];
  data: TagInput;
}>;

export type UpdateTagMutation = {
  __typename?: "Mutation";
  updateTag?: {
    __typename?: "TagEntityResponse";
    data?: {
      __typename?: "TagEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Tag";
        name: string;
        createdAt?: any | null;
      } | null;
    } | null;
  } | null;
};

export type CreateContentTypeMutationVariables = Exact<{
  contractId?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
}>;

export type CreateContentTypeMutation = {
  __typename?: "Mutation";
  createContentTypeForContractId?: {
    __typename?: "FreeContentSubServiceEntity";
    id?: string | null;
  } | null;
};

export type GetContentTypeDtOsQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetContentTypeDtOsQuery = {
  __typename?: "Query";
  getContentTypeDTOs?: Array<{
    __typename?: "ContentTypeDTO";
    subServiceId: string;
    type: string;
    name: string;
    description?: string | null;
  } | null> | null;
};

export type UpdateContentTypeCookiesMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: CookiesSubServiceInput;
}>;

export type UpdateContentTypeCookiesMutation = {
  __typename?: "Mutation";
  updateCookiesSubService?: {
    __typename?: "CookiesSubServiceEntityResponse";
    data?: {
      __typename?: "CookiesSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "CookiesSubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContentTypeAccessibilityMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: AccessibilitySubServiceInput;
}>;

export type UpdateContentTypeAccessibilityMutation = {
  __typename?: "Mutation";
  updateAccessibilitySubService?: {
    __typename?: "AccessibilitySubServiceEntityResponse";
    data?: {
      __typename?: "AccessibilitySubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "AccessibilitySubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContentTypeContactUsMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: ContactUsSubServiceInput;
}>;

export type UpdateContentTypeContactUsMutation = {
  __typename?: "Mutation";
  updateContactUsSubService?: {
    __typename?: "ContactUsSubServiceEntityResponse";
    data?: {
      __typename?: "ContactUsSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ContactUsSubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContentTypeCguMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: CguSubServiceInput;
}>;

export type UpdateContentTypeCguMutation = {
  __typename?: "Mutation";
  updateCguSubService?: {
    __typename?: "CguSubServiceEntityResponse";
    data?: {
      __typename?: "CguSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "CguSubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContentTypeConfidentialityMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: ConfidentialitySubServiceInput;
}>;

export type UpdateContentTypeConfidentialityMutation = {
  __typename?: "Mutation";
  updateConfidentialitySubService?: {
    __typename?: "ConfidentialitySubServiceEntityResponse";
    data?: {
      __typename?: "ConfidentialitySubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ConfidentialitySubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContentTypeNewsMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: NewsSubServiceInput;
}>;

export type UpdateContentTypeNewsMutation = {
  __typename?: "Mutation";
  updateNewsSubService?: {
    __typename?: "NewsSubServiceEntityResponse";
    data?: {
      __typename?: "NewsSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "NewsSubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContentTypeTipMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: TipSubServiceInput;
}>;

export type UpdateContentTypeTipMutation = {
  __typename?: "Mutation";
  updateTipSubService?: {
    __typename?: "TipSubServiceEntityResponse";
    data?: {
      __typename?: "TipSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "TipSubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContentTypeQuizMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: QuizSubServiceInput;
}>;

export type UpdateContentTypeQuizMutation = {
  __typename?: "Mutation";
  updateQuizSubService?: {
    __typename?: "QuizSubServiceEntityResponse";
    data?: {
      __typename?: "QuizSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "QuizSubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContentTypeEventMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: EventSubServiceInput;
}>;

export type UpdateContentTypeEventMutation = {
  __typename?: "Mutation";
  updateEventSubService?: {
    __typename?: "EventSubServiceEntityResponse";
    data?: {
      __typename?: "EventSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "EventSubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContentTypeFreeContentMutationVariables = Exact<{
  updateSubServiceId: Scalars["ID"];
  data: FreeContentSubServiceInput;
}>;

export type UpdateContentTypeFreeContentMutation = {
  __typename?: "Mutation";
  updateFreeContentSubService?: {
    __typename?: "FreeContentSubServiceEntityResponse";
    data?: {
      __typename?: "FreeContentSubServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "FreeContentSubService";
        name: string;
        description?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetCollectionMethodsByContractIdQueryVariables = Exact<{
  filters?: InputMaybe<CollectDoorToDoorFiltersInput>;
}>;

export type GetCollectionMethodsByContractIdQuery = {
  __typename?: "Query";
  collectDoorToDoors?: {
    __typename?: "CollectDoorToDoorEntityResponseCollection";
    data: Array<{
      __typename?: "CollectDoorToDoorEntity";
      id?: string | null;
      attributes?: {
        __typename?: "CollectDoorToDoor";
        name?: string | null;
      } | null;
    }>;
  } | null;
  collectDropOffs?: {
    __typename?: "CollectDropOffEntityResponseCollection";
    data: Array<{
      __typename?: "CollectDropOffEntity";
      id?: string | null;
      attributes?: {
        __typename?: "CollectDropOff";
        name?: string | null;
      } | null;
    }>;
  } | null;
  collectVoluntaries?: {
    __typename?: "CollectVoluntaryEntityResponseCollection";
    data: Array<{
      __typename?: "CollectVoluntaryEntity";
      id?: string | null;
      attributes?: {
        __typename?: "CollectVoluntary";
        name?: string | null;
      } | null;
    }>;
  } | null;
};

export type GetColorsQueryVariables = Exact<{
  filters?: InputMaybe<FlowColorFiltersInput>;
}>;

export type GetColorsQuery = {
  __typename?: "Query";
  flowColors?: {
    __typename?: "FlowColorEntityResponseCollection";
    data: Array<{
      __typename?: "FlowColorEntity";
      id?: string | null;
      attributes?: {
        __typename?: "FlowColor";
        name: string;
        hexaCode: string;
        shouldChangeHexaCode: boolean;
      } | null;
    }>;
  } | null;
};

export type GetFlowsByContractIdQueryVariables = Exact<{
  filters?: InputMaybe<FlowFiltersInput>;
}>;

export type GetFlowsByContractIdQuery = {
  __typename?: "Query";
  flows?: {
    __typename?: "FlowEntityResponseCollection";
    data: Array<{
      __typename?: "FlowEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Flow";
        name?: string | null;
        isActivated?: boolean | null;
        createdAt?: any | null;
        recyclingGesture: Enum_Flow_Recyclinggesture;
        code?: string | null;
        wasteForms?: {
          __typename?: "WasteFormRelationResponseCollection";
          data: Array<{
            __typename?: "WasteFormEntity";
            id?: string | null;
            attributes?: {
              __typename?: "WasteForm";
              name?: string | null;
            } | null;
          }>;
        } | null;
        color?: {
          __typename?: "FlowColorEntityResponse";
          data?: {
            __typename?: "FlowColorEntity";
            id?: string | null;
            attributes?: {
              __typename?: "FlowColor";
              hexaCode: string;
              name: string;
            } | null;
          } | null;
        } | null;
        collectVoluntaries?: {
          __typename?: "CollectVoluntaryRelationResponseCollection";
          data: Array<{
            __typename?: "CollectVoluntaryEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectVoluntary";
              name?: string | null;
            } | null;
          }>;
        } | null;
        collectDoorToDoors?: {
          __typename?: "CollectDoorToDoorRelationResponseCollection";
          data: Array<{
            __typename?: "CollectDoorToDoorEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectDoorToDoor";
              name?: string | null;
            } | null;
          }>;
        } | null;
        collectDropOffs?: {
          __typename?: "CollectDropOffRelationResponseCollection";
          data: Array<{
            __typename?: "CollectDropOffEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectDropOff";
              name?: string | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type UpdateFlowMutationVariables = Exact<{
  updateFlowId: Scalars["ID"];
  data: FlowInput;
}>;

export type UpdateFlowMutation = {
  __typename?: "Mutation";
  updateFlow?: {
    __typename?: "FlowEntityResponse";
    data?: {
      __typename?: "FlowEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Flow";
        name?: string | null;
        isActivated?: boolean | null;
        recyclingGesture: Enum_Flow_Recyclinggesture;
        code?: string | null;
        color?: {
          __typename?: "FlowColorEntityResponse";
          data?: {
            __typename?: "FlowColorEntity";
            id?: string | null;
            attributes?: {
              __typename?: "FlowColor";
              hexaCode: string;
              name: string;
            } | null;
          } | null;
        } | null;
        collectDoorToDoors?: {
          __typename?: "CollectDoorToDoorRelationResponseCollection";
          data: Array<{
            __typename?: "CollectDoorToDoorEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectDoorToDoor";
              name?: string | null;
            } | null;
          }>;
        } | null;
        collectDropOffs?: {
          __typename?: "CollectDropOffRelationResponseCollection";
          data: Array<{
            __typename?: "CollectDropOffEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectDropOff";
              name?: string | null;
            } | null;
          }>;
        } | null;
        collectVoluntaries?: {
          __typename?: "CollectVoluntaryRelationResponseCollection";
          data: Array<{
            __typename?: "CollectVoluntaryEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectVoluntary";
              name?: string | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetBanAddressesAutoCompleteQueryVariables = Exact<{
  searchTerm: Scalars["String"];
}>;

export type GetBanAddressesAutoCompleteQuery = {
  __typename?: "Query";
  getAddressCoordinates?: Array<{
    __typename?: "SearchResultAddress";
    name?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    banFeaturesProperties?: any | null;
  } | null> | null;
};

export type GetContractByIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetContractByIdQuery = {
  __typename?: "Query";
  contract?: {
    __typename?: "ContractEntityResponse";
    data?: {
      __typename?: "ContractEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Contract";
        clientName: string;
        clientType: Enum_Contract_Clienttype;
        contractStatus: Enum_Contract_Contractstatus;
        siret?: any | null;
        clear?: any | null;
        ccap?: any | null;
        isNonExclusive: boolean;
        isRVFrance: boolean;
        pathId?: any | null;
        logo: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
            } | null;
          } | null;
        };
        channelType?: {
          __typename?: "ChannelTypeEntityResponse";
          data?: {
            __typename?: "ChannelTypeEntity";
            id?: string | null;
            attributes?: {
              __typename?: "ChannelType";
              hasWebApp?: boolean | null;
              hasWebSite?: boolean | null;
            } | null;
          } | null;
        } | null;
        clientContact?: {
          __typename?: "ClientContactEntityResponse";
          data?: {
            __typename?: "ClientContactEntity";
            id?: string | null;
            attributes?: {
              __typename?: "ClientContact";
              firstName: string;
              lastName: string;
              email: string;
              phoneNumber: string;
            } | null;
          } | null;
        } | null;
        contractCustomization?: {
          __typename?: "ContractCustomizationEntityResponse";
          data?: {
            __typename?: "ContractCustomizationEntity";
            id?: string | null;
            attributes?: {
              __typename?: "ContractCustomization";
              primaryColor: string;
              secondaryColor?: string | null;
              textContrast: string;
            } | null;
          } | null;
        } | null;
        editorialService?: {
          __typename?: "EditorialServiceEntityResponse";
          data?: {
            __typename?: "EditorialServiceEntity";
            id?: string | null;
            attributes?: {
              __typename?: "EditorialService";
              eventSubService?: {
                __typename?: "EventSubServiceEntityResponse";
                data?: {
                  __typename?: "EventSubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "EventSubService";
                    name: string;
                    isActivated: boolean;
                  } | null;
                } | null;
              } | null;
              freeContentSubServices?: {
                __typename?: "FreeContentSubServiceRelationResponseCollection";
                data: Array<{
                  __typename?: "FreeContentSubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "FreeContentSubService";
                    name: string;
                    isActivated: boolean;
                  } | null;
                }>;
              } | null;
              newsSubService?: {
                __typename?: "NewsSubServiceEntityResponse";
                data?: {
                  __typename?: "NewsSubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "NewsSubService";
                    name: string;
                    isActivated: boolean;
                  } | null;
                } | null;
              } | null;
              quizSubService?: {
                __typename?: "QuizSubServiceEntityResponse";
                data?: {
                  __typename?: "QuizSubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "QuizSubService";
                    name: string;
                    isActivated: boolean;
                  } | null;
                } | null;
              } | null;
              tipSubService?: {
                __typename?: "TipSubServiceEntityResponse";
                data?: {
                  __typename?: "TipSubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "TipSubService";
                    name: string;
                    isActivated: boolean;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
        recyclingGuideService?: {
          __typename?: "RecyclingGuideServiceEntityResponse";
          data?: {
            __typename?: "RecyclingGuideServiceEntity";
            id?: string | null;
            attributes?: {
              __typename?: "RecyclingGuideService";
              name: string;
              isActivated: boolean;
              memoName: string;
            } | null;
          } | null;
        } | null;
        pickUpDayService?: {
          __typename?: "PickUpDayServiceEntityResponse";
          data?: {
            __typename?: "PickUpDayServiceEntity";
            id?: string | null;
            attributes?: {
              __typename?: "PickUpDayService";
              name: string;
              isActivated: boolean;
            } | null;
          } | null;
        } | null;
        dropOffMapService?: {
          __typename?: "DropOffMapServiceEntityResponse";
          data?: {
            __typename?: "DropOffMapServiceEntity";
            id?: string | null;
            attributes?: {
              __typename?: "DropOffMapService";
              name?: string | null;
              isActivated: boolean;
            } | null;
          } | null;
        } | null;
        requestService?: {
          __typename?: "RequestServiceEntityResponse";
          data?: {
            __typename?: "RequestServiceEntity";
            id?: string | null;
            attributes?: {
              __typename?: "RequestService";
              name: string;
              isActivated: boolean;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetContractsQueryVariables = Exact<{ [key: string]: never }>;

export type GetContractsQuery = {
  __typename?: "Query";
  contracts?: {
    __typename?: "ContractEntityResponseCollection";
    data: Array<{
      __typename?: "ContractEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Contract";
        clientName: string;
        contractStatus: Enum_Contract_Contractstatus;
        dueDate?: any | null;
        hasYesWeScan?: boolean | null;
        clientType: Enum_Contract_Clienttype;
        isNonExclusive: boolean;
        isRVFrance: boolean;
        logo: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
            } | null;
          } | null;
        };
        channelType?: {
          __typename?: "ChannelTypeEntityResponse";
          data?: {
            __typename?: "ChannelTypeEntity";
            id?: string | null;
            attributes?: {
              __typename?: "ChannelType";
              hasWebApp?: boolean | null;
              hasWebSite?: boolean | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetServicesActiveQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetServicesActiveQuery = {
  __typename?: "Query";
  editorialServices?: {
    __typename?: "EditorialServiceEntityResponseCollection";
    data: Array<{
      __typename?: "EditorialServiceEntity";
      attributes?: {
        __typename?: "EditorialService";
        eventSubService?: {
          __typename?: "EventSubServiceEntityResponse";
          data?: {
            __typename?: "EventSubServiceEntity";
            attributes?: {
              __typename?: "EventSubService";
              isActivated: boolean;
            } | null;
          } | null;
        } | null;
        newsSubService?: {
          __typename?: "NewsSubServiceEntityResponse";
          data?: {
            __typename?: "NewsSubServiceEntity";
            attributes?: {
              __typename?: "NewsSubService";
              isActivated: boolean;
            } | null;
          } | null;
        } | null;
        quizSubService?: {
          __typename?: "QuizSubServiceEntityResponse";
          data?: {
            __typename?: "QuizSubServiceEntity";
            attributes?: {
              __typename?: "QuizSubService";
              isActivated: boolean;
            } | null;
          } | null;
        } | null;
        tipSubService?: {
          __typename?: "TipSubServiceEntityResponse";
          data?: {
            __typename?: "TipSubServiceEntity";
            attributes?: {
              __typename?: "TipSubService";
              isActivated: boolean;
            } | null;
          } | null;
        } | null;
        freeContentSubServices?: {
          __typename?: "FreeContentSubServiceRelationResponseCollection";
          data: Array<{
            __typename?: "FreeContentSubServiceEntity";
            attributes?: {
              __typename?: "FreeContentSubService";
              isActivated: boolean;
            } | null;
          }>;
        } | null;
        contactUsSubService?: {
          __typename?: "ContactUsSubServiceEntityResponse";
          data?: {
            __typename?: "ContactUsSubServiceEntity";
            attributes?: {
              __typename?: "ContactUsSubService";
              isActivated?: boolean | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
  recyclingGuideServices?: {
    __typename?: "RecyclingGuideServiceEntityResponseCollection";
    data: Array<{
      __typename?: "RecyclingGuideServiceEntity";
      attributes?: {
        __typename?: "RecyclingGuideService";
        isActivated: boolean;
      } | null;
    }>;
  } | null;
  requestServices?: {
    __typename?: "RequestServiceEntityResponseCollection";
    data: Array<{
      __typename?: "RequestServiceEntity";
      attributes?: {
        __typename?: "RequestService";
        isActivated: boolean;
      } | null;
    }>;
  } | null;
};

export type UpdateContactMwcMutationVariables = Exact<{
  serviceName?: InputMaybe<Scalars["String"]>;
  postalAddress?: InputMaybe<Scalars["String"]>;
  postalCode?: InputMaybe<Scalars["String"]>;
  city?: InputMaybe<Scalars["String"]>;
  contactEmail?: InputMaybe<Scalars["String"]>;
  phoneNumber?: InputMaybe<Scalars["String"]>;
  contractId?: InputMaybe<Scalars["Int"]>;
}>;

export type UpdateContactMwcMutation = {
  __typename?: "Mutation";
  updateContactMwc?: {
    __typename?: "ContactResponse";
    serviceName?: string | null;
    postalAddress?: string | null;
    city?: string | null;
    postalCode?: string | null;
    contactEmail?: string | null;
    phoneNumber?: string | null;
  } | null;
};

export type GetContactMwcQueryVariables = Exact<{
  filters?: InputMaybe<MwCounterServiceFiltersInput>;
}>;

export type GetContactMwcQuery = {
  __typename?: "Query";
  mwCounterServices?: {
    __typename?: "MwCounterServiceEntityResponseCollection";
    data: Array<{
      __typename?: "MwCounterServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "MwCounterService";
        mwcContact?: {
          __typename?: "MwcContactEntityResponse";
          data?: {
            __typename?: "MwcContactEntity";
            attributes?: {
              __typename?: "MwcContact";
              city?: string | null;
              serviceName?: string | null;
              postalAddress?: string | null;
              postalCode?: string | null;
              contactEmail?: string | null;
              phoneNumber?: string | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetEditoBlockTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
  status?: InputMaybe<Enum_Editocontentdto_Status>;
}>;

export type GetEditoBlockTabQuery = {
  __typename?: "Query";
  getEditoBlockDTO?: {
    __typename?: "EditoBlockDTO";
    id: string;
    displayBlock: boolean;
    titleContent: string;
    editoContents?: Array<{
      __typename?: "EditoContentDTO";
      componentId?: string | null;
      uniqueId: string;
      id: string;
      contentType: string;
      typeName: string;
      attributes: {
        __typename?: "EditoContentDTOAttributes";
        title: string;
        status?: Enum_Editocontentdto_Status | null;
        publishedDate?: any | null;
      };
    } | null> | null;
  } | null;
  getEditoContentDTOs?: Array<{
    __typename?: "EditoContentDTO";
    id: string;
    contentType: string;
    typeName: string;
    uniqueId: string;
    attributes: {
      __typename?: "EditoContentDTOAttributes";
      title: string;
      status?: Enum_Editocontentdto_Status | null;
      publishedDate?: any | null;
    };
  } | null> | null;
};

export type GetQuizAndTipsBlockTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
  status: Scalars["String"];
}>;

export type GetQuizAndTipsBlockTabQuery = {
  __typename?: "Query";
  contractCustomizations?: {
    __typename?: "ContractCustomizationEntityResponseCollection";
    data: Array<{
      __typename?: "ContractCustomizationEntity";
      attributes?: {
        __typename?: "ContractCustomization";
        homepage?: {
          __typename?: "HomepageEntityResponse";
          data?: {
            __typename?: "HomepageEntity";
            attributes?: {
              __typename?: "Homepage";
              quizAndTipsBlock?: {
                __typename?: "QuizAndTipsBlockEntityResponse";
                data?: {
                  __typename?: "QuizAndTipsBlockEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "QuizAndTipsBlock";
                    titleContent: string;
                    displayBlock: boolean;
                    displayQuiz: boolean;
                    displayTips: boolean;
                    quiz?: {
                      __typename?: "QuizEntityResponse";
                      data?: {
                        __typename?: "QuizEntity";
                        id?: string | null;
                        attributes?: {
                          __typename?: "Quiz";
                          title?: string | null;
                          status?: Enum_Quiz_Status | null;
                          publishedDate?: any | null;
                        } | null;
                      } | null;
                    } | null;
                    tips?: {
                      __typename?: "TipRelationResponseCollection";
                      data: Array<{
                        __typename?: "TipEntity";
                        id?: string | null;
                        attributes?: {
                          __typename?: "Tip";
                          title: string;
                          status?: Enum_Tip_Status | null;
                          publishedDate?: any | null;
                          image: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                hash: string;
                                mime: string;
                                name: string;
                                provider: string;
                                size: number;
                                url: string;
                                alternativeText?: string | null;
                              } | null;
                            } | null;
                          };
                        } | null;
                      }>;
                    } | null;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
  quizSubServices?: {
    __typename?: "QuizSubServiceEntityResponseCollection";
    data: Array<{
      __typename?: "QuizSubServiceEntity";
      attributes?: {
        __typename?: "QuizSubService";
        quizzes?: {
          __typename?: "QuizRelationResponseCollection";
          data: Array<{
            __typename?: "QuizEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Quiz";
              title?: string | null;
              status?: Enum_Quiz_Status | null;
              publishedDate?: any | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
  tipSubServices?: {
    __typename?: "TipSubServiceEntityResponseCollection";
    data: Array<{
      __typename?: "TipSubServiceEntity";
      attributes?: {
        __typename?: "TipSubService";
        tips?: {
          __typename?: "TipRelationResponseCollection";
          data: Array<{
            __typename?: "TipEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Tip";
              title: string;
              status?: Enum_Tip_Status | null;
              publishedDate?: any | null;
              image: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                  } | null;
                } | null;
              };
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetRecyclingGuideBlockTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetRecyclingGuideBlockTabQuery = {
  __typename?: "Query";
  contractCustomizations?: {
    __typename?: "ContractCustomizationEntityResponseCollection";
    data: Array<{
      __typename?: "ContractCustomizationEntity";
      attributes?: {
        __typename?: "ContractCustomization";
        homepage?: {
          __typename?: "HomepageEntityResponse";
          data?: {
            __typename?: "HomepageEntity";
            attributes?: {
              __typename?: "Homepage";
              recyclingGuideBlock?: {
                __typename?: "RecyclingGuideBlockEntityResponse";
                data?: {
                  __typename?: "RecyclingGuideBlockEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "RecyclingGuideBlock";
                    titleContent: string;
                    subtitleContent: string;
                    recyclingGuideDisplayContent: string;
                    tags?: {
                      __typename?: "TagRelationResponseCollection";
                      data: Array<{
                        __typename?: "TagEntity";
                        attributes?: {
                          __typename?: "Tag";
                          name: string;
                        } | null;
                      }>;
                    } | null;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetSearchEngineBlockTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetSearchEngineBlockTabQuery = {
  __typename?: "Query";
  contractCustomizations?: {
    __typename?: "ContractCustomizationEntityResponseCollection";
    data: Array<{
      __typename?: "ContractCustomizationEntity";
      attributes?: {
        __typename?: "ContractCustomization";
        homepage?: {
          __typename?: "HomepageEntityResponse";
          data?: {
            __typename?: "HomepageEntity";
            attributes?: {
              __typename?: "Homepage";
              searchEngineBlock?: {
                __typename?: "SearchEngineBlockEntityResponse";
                data?: {
                  __typename?: "SearchEngineBlockEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "SearchEngineBlock";
                    titleContent: string;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetServicesBlockTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetServicesBlockTabQuery = {
  __typename?: "Query";
  contractCustomizations?: {
    __typename?: "ContractCustomizationEntityResponseCollection";
    data: Array<{
      __typename?: "ContractCustomizationEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ContractCustomization";
        homepage?: {
          __typename?: "HomepageEntityResponse";
          data?: {
            __typename?: "HomepageEntity";
            attributes?: {
              __typename?: "Homepage";
              servicesBlock?: {
                __typename?: "ServicesBlockEntityResponse";
                data?: {
                  __typename?: "ServicesBlockEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "ServicesBlock";
                    titleContent: string;
                    serviceLinks?: Array<
                      | { __typename?: "ComponentLinksAlertNotification" }
                      | {
                          __typename?: "ComponentLinksContactUs";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksDropOffMap";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksEvents";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksExternal";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          externalLink?: string | null;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksFrees";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | { __typename?: "ComponentLinksKeyMetrics" }
                      | { __typename?: "ComponentLinksMyWasteCounter" }
                      | {
                          __typename?: "ComponentLinksNews";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksPickUpDay";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksQuizzes";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksRecyclingGuide";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksRequest";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksTips";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | { __typename?: "Error" }
                      | null
                    > | null;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetTopContentBlockTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
  status?: InputMaybe<Enum_Topcontentdto_Status>;
}>;

export type GetTopContentBlockTabQuery = {
  __typename?: "Query";
  getTopContentBlockDTO?: {
    __typename?: "TopContentBlockDTO";
    id: string;
    displayBlock: boolean;
    displayLastThreeContents: boolean;
    hasTopContent: boolean;
    titleContent: string;
    topContent?: {
      __typename?: "EditoContentDTO";
      componentId?: string | null;
      uniqueId: string;
      id: string;
      contentType: string;
      typeName: string;
      attributes: {
        __typename?: "EditoContentDTOAttributes";
        title: string;
        status?: Enum_Editocontentdto_Status | null;
        publishedDate?: any | null;
      };
    } | null;
  } | null;
  getTopContentDTOs?: Array<{
    __typename?: "EditoContentDTO";
    id: string;
    contentType: string;
    typeName: string;
    uniqueId: string;
    attributes: {
      __typename?: "EditoContentDTOAttributes";
      title: string;
      status?: Enum_Editocontentdto_Status | null;
      publishedDate?: any | null;
    };
  } | null> | null;
};

export type UpdateEditoBlockTabMutationVariables = Exact<{
  updateEditoBlockId: Scalars["ID"];
  data: EditoBlockInput;
}>;

export type UpdateEditoBlockTabMutation = {
  __typename?: "Mutation";
  updateEditoBlock?: {
    __typename?: "EditoBlockEntityResponse";
    data?: {
      __typename?: "EditoBlockEntity";
      id?: string | null;
      attributes?: {
        __typename?: "EditoBlock";
        displayBlock: boolean;
        titleContent: string;
      } | null;
    } | null;
  } | null;
};

export type UpdateQuizAndTipsBlockTabMutationVariables = Exact<{
  quizAndTipsBlockId: Scalars["ID"];
  data: QuizAndTipsBlockInput;
}>;

export type UpdateQuizAndTipsBlockTabMutation = {
  __typename?: "Mutation";
  updateQuizAndTipsBlock?: {
    __typename?: "QuizAndTipsBlockEntityResponse";
    data?: {
      __typename?: "QuizAndTipsBlockEntity";
      attributes?: {
        __typename?: "QuizAndTipsBlock";
        titleContent: string;
        displayBlock: boolean;
        displayQuiz: boolean;
        displayTips: boolean;
        quiz?: {
          __typename?: "QuizEntityResponse";
          data?: { __typename?: "QuizEntity"; id?: string | null } | null;
        } | null;
        tips?: {
          __typename?: "TipRelationResponseCollection";
          data: Array<{ __typename?: "TipEntity"; id?: string | null }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateRecyclingGuideTabMutationVariables = Exact<{
  updateRecyclingGuideBlockId: Scalars["ID"];
  data: RecyclingGuideBlockInput;
}>;

export type UpdateRecyclingGuideTabMutation = {
  __typename?: "Mutation";
  updateRecyclingGuideBlock?: {
    __typename?: "RecyclingGuideBlockEntityResponse";
    data?: {
      __typename?: "RecyclingGuideBlockEntity";
      attributes?: {
        __typename?: "RecyclingGuideBlock";
        titleContent: string;
        subtitleContent: string;
        recyclingGuideDisplayContent: string;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateSearchEngineBlockTabMutationVariables = Exact<{
  updateSearchEngineBlockId: Scalars["ID"];
  data: SearchEngineBlockInput;
}>;

export type UpdateSearchEngineBlockTabMutation = {
  __typename?: "Mutation";
  updateSearchEngineBlock?: {
    __typename?: "SearchEngineBlockEntityResponse";
    data?: {
      __typename?: "SearchEngineBlockEntity";
      attributes?: {
        __typename?: "SearchEngineBlock";
        titleContent: string;
      } | null;
    } | null;
  } | null;
};

export type UpdateServicesBlockTabMutationVariables = Exact<{
  updateServicesBlockId: Scalars["ID"];
  data: ServicesBlockInput;
}>;

export type UpdateServicesBlockTabMutation = {
  __typename?: "Mutation";
  updateServicesBlock?: {
    __typename?: "ServicesBlockEntityResponse";
    data?: {
      __typename?: "ServicesBlockEntity";
      id?: string | null;
      attributes?: {
        __typename?: "ServicesBlock";
        homepage?: {
          __typename?: "HomepageEntityResponse";
          data?: {
            __typename?: "HomepageEntity";
            attributes?: {
              __typename?: "Homepage";
              servicesBlock?: {
                __typename?: "ServicesBlockEntityResponse";
                data?: {
                  __typename?: "ServicesBlockEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "ServicesBlock";
                    titleContent: string;
                    serviceLinks?: Array<
                      | { __typename?: "ComponentLinksAlertNotification" }
                      | {
                          __typename?: "ComponentLinksContactUs";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksDropOffMap";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksEvents";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksExternal";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          externalLink?: string | null;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksFrees";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | { __typename?: "ComponentLinksKeyMetrics" }
                      | { __typename?: "ComponentLinksMyWasteCounter" }
                      | {
                          __typename?: "ComponentLinksNews";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksPickUpDay";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksQuizzes";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksRecyclingGuide";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksRequest";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | {
                          __typename?: "ComponentLinksTips";
                          id: string;
                          name?: string | null;
                          isDisplayed: boolean;
                          picto?: {
                            __typename?: "UploadFileEntityResponse";
                            data?: {
                              __typename?: "UploadFileEntity";
                              attributes?: {
                                __typename?: "UploadFile";
                                url: string;
                              } | null;
                            } | null;
                          } | null;
                        }
                      | { __typename?: "Error" }
                      | null
                    > | null;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateTopContentBlockTabMutationVariables = Exact<{
  updateTopContentBlockId: Scalars["ID"];
  data: TopContentBlockInput;
}>;

export type UpdateTopContentBlockTabMutation = {
  __typename?: "Mutation";
  updateTopContentBlock?: {
    __typename?: "TopContentBlockEntityResponse";
    data?: {
      __typename?: "TopContentBlockEntity";
      attributes?: {
        __typename?: "TopContentBlock";
        homepage?: {
          __typename?: "HomepageEntityResponse";
          data?: {
            __typename?: "HomepageEntity";
            attributes?: {
              __typename?: "Homepage";
              topContentBlock?: {
                __typename?: "TopContentBlockEntityResponse";
                data?: {
                  __typename?: "TopContentBlockEntity";
                  attributes?: {
                    __typename?: "TopContentBlock";
                    displayBlock: boolean;
                    titleContent: string;
                    hasTopContent: boolean;
                    displayLastThreeContents: boolean;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContractCustomizationMutationVariables = Exact<{
  updateContractCustomizationId: Scalars["ID"];
  data: ContractCustomizationInput;
}>;

export type UpdateContractCustomizationMutation = {
  __typename?: "Mutation";
  updateContractCustomization?: {
    __typename?: "ContractCustomizationEntityResponse";
    data?: {
      __typename?: "ContractCustomizationEntity";
      attributes?: {
        __typename?: "ContractCustomization";
        primaryColor: string;
        secondaryColor?: string | null;
        textContrast: string;
      } | null;
    } | null;
  } | null;
};

export type GetContractCustomizationByIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetContractCustomizationByIdQuery = {
  __typename?: "Query";
  contract?: {
    __typename?: "ContractEntityResponse";
    data?: {
      __typename?: "ContractEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Contract";
        logo: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
            } | null;
          } | null;
        };
        contractCustomization?: {
          __typename?: "ContractCustomizationEntityResponse";
          data?: {
            __typename?: "ContractCustomizationEntity";
            id?: string | null;
            attributes?: {
              __typename?: "ContractCustomization";
              primaryColor: string;
              secondaryColor?: string | null;
              textContrast: string;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateContractCustomizationByIdMutationVariables = Exact<{
  updateContractId: Scalars["ID"];
  data: ContractInput;
}>;

export type UpdateContractCustomizationByIdMutation = {
  __typename?: "Mutation";
  updateContract?: {
    __typename?: "ContractEntityResponse";
    data?: {
      __typename?: "ContractEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Contract";
        logo: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              alternativeText?: string | null;
              hash: string;
              mime: string;
              size: number;
              url: string;
              provider: string;
            } | null;
          } | null;
        };
        contractCustomization?: {
          __typename?: "ContractCustomizationEntityResponse";
          data?: {
            __typename?: "ContractCustomizationEntity";
            id?: string | null;
            attributes?: {
              __typename?: "ContractCustomization";
              primaryColor: string;
              secondaryColor?: string | null;
              textContrast: string;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetFooterPageQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetFooterPageQuery = {
  __typename?: "Query";
  contractCustomizations?: {
    __typename?: "ContractCustomizationEntityResponseCollection";
    data: Array<{
      __typename?: "ContractCustomizationEntity";
      attributes?: {
        __typename?: "ContractCustomization";
        footer?: {
          __typename?: "FooterEntityResponse";
          data?: {
            __typename?: "FooterEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Footer";
              accessibilityLevel?: Enum_Footer_Accessibilitylevel | null;
              cguSubService?: {
                __typename?: "CguSubServiceEntityResponse";
                data?: {
                  __typename?: "CguSubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "CguSubService";
                    link?: string | null;
                  } | null;
                } | null;
              } | null;
              accessibilitySubService?: {
                __typename?: "AccessibilitySubServiceEntityResponse";
                data?: {
                  __typename?: "AccessibilitySubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "AccessibilitySubService";
                    link?: string | null;
                  } | null;
                } | null;
              } | null;
              confidentialitySubService?: {
                __typename?: "ConfidentialitySubServiceEntityResponse";
                data?: {
                  __typename?: "ConfidentialitySubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "ConfidentialitySubService";
                    link?: string | null;
                  } | null;
                } | null;
              } | null;
              cookiesSubService?: {
                __typename?: "CookiesSubServiceEntityResponse";
                data?: {
                  __typename?: "CookiesSubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "CookiesSubService";
                    link?: string | null;
                  } | null;
                } | null;
              } | null;
              contactUsSubService?: {
                __typename?: "ContactUsSubServiceEntityResponse";
                data?: {
                  __typename?: "ContactUsSubServiceEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "ContactUsSubService";
                    label: string;
                    link?: string | null;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type UpdateFooterPageMutationVariables = Exact<{
  updateFooterId: Scalars["ID"];
  updateFooterData: FooterInput;
  updateContactUsSubServiceId: Scalars["ID"];
  updateContactUsSubServiceData: ContactUsSubServiceInput;
  updateAccessibilitySubServiceId: Scalars["ID"];
  updateAccessibilitySubServiceData: AccessibilitySubServiceInput;
  updateCguSubServiceId: Scalars["ID"];
  updateCguSubServiceData: CguSubServiceInput;
  updateCookiesSubServiceId: Scalars["ID"];
  updateCookiesSubServiceData: CookiesSubServiceInput;
  updateConfidentialitySubServiceId: Scalars["ID"];
  updateConfidentialitySubServiceData: ConfidentialitySubServiceInput;
}>;

export type UpdateFooterPageMutation = {
  __typename?: "Mutation";
  updateFooter?: {
    __typename?: "FooterEntityResponse";
    data?: {
      __typename?: "FooterEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Footer";
        accessibilityLevel?: Enum_Footer_Accessibilitylevel | null;
      } | null;
    } | null;
  } | null;
  updateContactUsSubService?: {
    __typename?: "ContactUsSubServiceEntityResponse";
    data?: {
      __typename?: "ContactUsSubServiceEntity";
      attributes?: {
        __typename?: "ContactUsSubService";
        label: string;
        link?: string | null;
      } | null;
    } | null;
  } | null;
  updateCguSubService?: {
    __typename?: "CguSubServiceEntityResponse";
    data?: {
      __typename?: "CguSubServiceEntity";
      attributes?: {
        __typename?: "CguSubService";
        link?: string | null;
      } | null;
    } | null;
  } | null;
  updateAccessibilitySubService?: {
    __typename?: "AccessibilitySubServiceEntityResponse";
    data?: {
      __typename?: "AccessibilitySubServiceEntity";
      attributes?: {
        __typename?: "AccessibilitySubService";
        link?: string | null;
      } | null;
    } | null;
  } | null;
  updateConfidentialitySubService?: {
    __typename?: "ConfidentialitySubServiceEntityResponse";
    data?: {
      __typename?: "ConfidentialitySubServiceEntity";
      attributes?: {
        __typename?: "ConfidentialitySubService";
        link?: string | null;
      } | null;
    } | null;
  } | null;
  updateCookiesSubService?: {
    __typename?: "CookiesSubServiceEntityResponse";
    data?: {
      __typename?: "CookiesSubServiceEntity";
      attributes?: {
        __typename?: "CookiesSubService";
        link?: string | null;
      } | null;
    } | null;
  } | null;
};

export type GetMenuPageQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetMenuPageQuery = {
  __typename?: "Query";
  contract?: {
    __typename?: "ContractEntityResponse";
    data?: {
      __typename?: "ContractEntity";
      attributes?: {
        __typename?: "Contract";
        contractMenu?: {
          __typename?: "ContractMenuEntityResponse";
          data?: {
            __typename?: "ContractMenuEntity";
            id?: string | null;
            attributes?: {
              __typename?: "ContractMenu";
              serviceLinks?: Array<
                | { __typename?: "ComponentLinksAlertNotification" }
                | {
                    __typename?: "ComponentLinksContactUs";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksDropOffMap";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksEvents";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksExternal";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    externalLink?: string | null;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksFrees";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | { __typename?: "ComponentLinksKeyMetrics" }
                | {
                    __typename?: "ComponentLinksMyWasteCounter";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksNews";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksPickUpDay";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksQuizzes";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksRecyclingGuide";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksRequest";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | {
                    __typename?: "ComponentLinksTips";
                    id: string;
                    name?: string | null;
                    isDisplayed: boolean;
                    picto?: {
                      __typename?: "UploadFileEntityResponse";
                      data?: {
                        __typename?: "UploadFileEntity";
                        attributes?: {
                          __typename?: "UploadFile";
                          url: string;
                          alternativeText?: string | null;
                        } | null;
                      } | null;
                    } | null;
                  }
                | { __typename?: "Error" }
                | null
              > | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateMenuPageMutationVariables = Exact<{
  updateMenuPageId: Scalars["ID"];
  data: ContractMenuInput;
}>;

export type UpdateMenuPageMutation = {
  __typename?: "Mutation";
  updateContractMenu?: {
    __typename?: "ContractMenuEntityResponse";
    data?: {
      __typename?: "ContractMenuEntity";
      attributes?: {
        __typename?: "ContractMenu";
        serviceLinks?: Array<
          | { __typename?: "ComponentLinksAlertNotification" }
          | {
              __typename?: "ComponentLinksContactUs";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentLinksDropOffMap";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentLinksEvents";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentLinksExternal";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              externalLink?: string | null;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentLinksFrees";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | { __typename?: "ComponentLinksKeyMetrics" }
          | { __typename?: "ComponentLinksMyWasteCounter" }
          | {
              __typename?: "ComponentLinksNews";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentLinksPickUpDay";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentLinksQuizzes";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentLinksRecyclingGuide";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentLinksRequest";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentLinksTips";
              id: string;
              name?: string | null;
              isDisplayed: boolean;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                  } | null;
                } | null;
              } | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type CreateSectorizationMutationVariables = Exact<{
  data: SectorizationInput;
}>;

export type CreateSectorizationMutation = {
  __typename?: "Mutation";
  createSectorization?: {
    __typename?: "SectorizationEntityResponse";
    data?: {
      __typename?: "SectorizationEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Sectorization";
        createdAt?: any | null;
        description: string;
        name: string;
        polygonCoordinates?: any | null;
        updatedAt?: any | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteSectorizationMutationVariables = Exact<{
  deleteSectorizationId: Scalars["ID"];
}>;

export type DeleteSectorizationMutation = {
  __typename?: "Mutation";
  deleteSectorization?: {
    __typename?: "SectorizationEntityResponse";
    data?: {
      __typename?: "SectorizationEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Sectorization";
        createdAt?: any | null;
        description: string;
        name: string;
        polygonCoordinates?: any | null;
        updatedAt?: any | null;
      } | null;
    } | null;
  } | null;
};

export type GetSectorizationByCityQueryVariables = Exact<{
  postalCode: Scalars["Int"];
}>;

export type GetSectorizationByCityQuery = {
  __typename?: "Query";
  sectorizationByCity?: {
    __typename?: "CitySectorization";
    GeoJson?: string | null;
  } | null;
};

export type GetSectorizationByContractIdQueryVariables = Exact<{
  sectorizationId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetSectorizationByContractIdQuery = {
  __typename?: "Query";
  sectorization?: {
    __typename?: "SectorizationEntityResponse";
    data?: {
      __typename?: "SectorizationEntity";
      attributes?: {
        __typename?: "Sectorization";
        name: string;
        description: string;
        polygonCoordinates?: any | null;
      } | null;
    } | null;
  } | null;
};

export type GetSectorizationsByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type GetSectorizationsByContractIdQuery = {
  __typename?: "Query";
  sectorizations?: {
    __typename?: "SectorizationEntityResponseCollection";
    data: Array<{
      __typename?: "SectorizationEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Sectorization";
        createdAt?: any | null;
        description: string;
        name: string;
        updatedAt?: any | null;
        polygonCoordinates?: any | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        total: number;
        pageSize: number;
        page: number;
        pageCount: number;
      };
    };
  } | null;
};

export type UpdateSectorizationMutationVariables = Exact<{
  updateSectorizationId: Scalars["ID"];
  data: SectorizationInput;
}>;

export type UpdateSectorizationMutation = {
  __typename?: "Mutation";
  updateSectorization?: {
    __typename?: "SectorizationEntityResponse";
    data?: {
      __typename?: "SectorizationEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Sectorization";
        name: string;
        description: string;
        polygonCoordinates?: any | null;
        updatedAt?: any | null;
        createdAt?: any | null;
      } | null;
    } | null;
  } | null;
};

export type CreateDropOffMapMutationVariables = Exact<{
  data: DropOffMapInput;
}>;

export type CreateDropOffMapMutation = {
  __typename?: "Mutation";
  createDropOffMap?: {
    __typename?: "DropOffMapEntityResponse";
    data?: {
      __typename?: "DropOffMapEntity";
      id?: string | null;
      attributes?: {
        __typename?: "DropOffMap";
        name?: string | null;
        address?: string | null;
        latitude?: number | null;
        longitude?: number | null;
        phoneNumber?: string | null;
        mustKnow?: string | null;
        dropOffMapService?: {
          __typename?: "DropOffMapServiceEntityResponse";
          data?: {
            __typename?: "DropOffMapServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        collectDropOff?: {
          __typename?: "CollectDropOffEntityResponse";
          data?: {
            __typename?: "CollectDropOffEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectDropOff";
              name?: string | null;
            } | null;
          } | null;
        } | null;
        collectVoluntary?: {
          __typename?: "CollectVoluntaryEntityResponse";
          data?: {
            __typename?: "CollectVoluntaryEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectVoluntary";
              name?: string | null;
            } | null;
          } | null;
        } | null;
        downloadableFiles?: Array<{
          __typename?: "ComponentBlocksDownloadBlock";
          id: string;
          linkText: string;
          file: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              id?: string | null;
              attributes?: {
                __typename?: "UploadFile";
                name: string;
                alternativeText?: string | null;
                hash: string;
                mime: string;
                size: number;
                url: string;
                provider: string;
              } | null;
            } | null;
          };
        } | null> | null;
        openingHoursBlocks?: Array<
          | {
              __typename?: "ComponentBlocksOpeningDay";
              id: string;
              weekDay: Enum_Componentblocksopeningday_Weekday;
              morningStart?: any | null;
              morningEnd?: any | null;
              afterNoonStart?: any | null;
              afterNoonEnd?: any | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type DeleteDropOffMapMutationVariables = Exact<{
  deleteDropOffMapId: Scalars["ID"];
}>;

export type DeleteDropOffMapMutation = {
  __typename?: "Mutation";
  deleteDropOffMap?: {
    __typename?: "DropOffMapEntityResponse";
    data?: { __typename?: "DropOffMapEntity"; id?: string | null } | null;
  } | null;
};

export type GetDropOffMapByIdQueryVariables = Exact<{
  dropOffMapId: Scalars["ID"];
}>;

export type GetDropOffMapByIdQuery = {
  __typename?: "Query";
  dropOffMap?: {
    __typename?: "DropOffMapEntityResponse";
    data?: {
      __typename?: "DropOffMapEntity";
      id?: string | null;
      attributes?: {
        __typename?: "DropOffMap";
        name?: string | null;
        address?: string | null;
        latitude?: number | null;
        longitude?: number | null;
        phoneNumber?: string | null;
        mustKnow?: string | null;
        dropOffMapService?: {
          __typename?: "DropOffMapServiceEntityResponse";
          data?: {
            __typename?: "DropOffMapServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        collectDropOff?: {
          __typename?: "CollectDropOffEntityResponse";
          data?: {
            __typename?: "CollectDropOffEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectDropOff";
              name?: string | null;
            } | null;
          } | null;
        } | null;
        collectVoluntary?: {
          __typename?: "CollectVoluntaryEntityResponse";
          data?: {
            __typename?: "CollectVoluntaryEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectVoluntary";
              name?: string | null;
            } | null;
          } | null;
        } | null;
        downloadableFiles?: Array<{
          __typename?: "ComponentBlocksDownloadBlock";
          id: string;
          linkText: string;
          file: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              id?: string | null;
              attributes?: {
                __typename?: "UploadFile";
                name: string;
                alternativeText?: string | null;
                hash: string;
                mime: string;
                size: number;
                url: string;
                provider: string;
              } | null;
            } | null;
          };
        } | null> | null;
        openingHoursBlocks?: Array<
          | {
              __typename?: "ComponentBlocksOpeningDay";
              id: string;
              weekDay: Enum_Componentblocksopeningday_Weekday;
              morningStart?: any | null;
              morningEnd?: any | null;
              afterNoonStart?: any | null;
              afterNoonEnd?: any | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetDropOffMapByDropOffMapByServiceIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type GetDropOffMapByDropOffMapByServiceIdQuery = {
  __typename?: "Query";
  dropOffMaps?: {
    __typename?: "DropOffMapEntityResponseCollection";
    data: Array<{
      __typename?: "DropOffMapEntity";
      id?: string | null;
      attributes?: {
        __typename?: "DropOffMap";
        createdAt?: any | null;
        description?: string | null;
        name?: string | null;
        updatedAt?: any | null;
        address?: string | null;
        latitude?: number | null;
        longitude?: number | null;
        city?: string | null;
        collectDropOff?: {
          __typename?: "CollectDropOffEntityResponse";
          data?: {
            __typename?: "CollectDropOffEntity";
            attributes?: {
              __typename?: "CollectDropOff";
              name?: string | null;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    url: string;
                    name: string;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
        collectVoluntary?: {
          __typename?: "CollectVoluntaryEntityResponse";
          data?: {
            __typename?: "CollectVoluntaryEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectVoluntary";
              name?: string | null;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    name: string;
                    url: string;
                  } | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        total: number;
        pageSize: number;
        page: number;
        pageCount: number;
      };
    };
  } | null;
};

export type UpdateDropOffMapMutationVariables = Exact<{
  updateDropOffMapId: Scalars["ID"];
  data: DropOffMapInput;
}>;

export type UpdateDropOffMapMutation = {
  __typename?: "Mutation";
  updateDropOffMap?: {
    __typename?: "DropOffMapEntityResponse";
    data?: {
      __typename?: "DropOffMapEntity";
      id?: string | null;
      attributes?: {
        __typename?: "DropOffMap";
        name?: string | null;
        address?: string | null;
        latitude?: number | null;
        longitude?: number | null;
        phoneNumber?: string | null;
        mustKnow?: string | null;
        dropOffMapService?: {
          __typename?: "DropOffMapServiceEntityResponse";
          data?: {
            __typename?: "DropOffMapServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        collectDropOff?: {
          __typename?: "CollectDropOffEntityResponse";
          data?: {
            __typename?: "CollectDropOffEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectDropOff";
              name?: string | null;
            } | null;
          } | null;
        } | null;
        collectVoluntary?: {
          __typename?: "CollectVoluntaryEntityResponse";
          data?: {
            __typename?: "CollectVoluntaryEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectVoluntary";
              name?: string | null;
            } | null;
          } | null;
        } | null;
        downloadableFiles?: Array<{
          __typename?: "ComponentBlocksDownloadBlock";
          id: string;
          linkText: string;
          file: {
            __typename?: "UploadFileEntityResponse";
            data?: {
              __typename?: "UploadFileEntity";
              id?: string | null;
              attributes?: {
                __typename?: "UploadFile";
                name: string;
                alternativeText?: string | null;
                hash: string;
                mime: string;
                size: number;
                url: string;
                provider: string;
              } | null;
            } | null;
          };
        } | null> | null;
        openingHoursBlocks?: Array<
          | {
              __typename?: "ComponentBlocksOpeningDay";
              id: string;
              weekDay: Enum_Componentblocksopeningday_Weekday;
              morningStart?: any | null;
              morningEnd?: any | null;
              afterNoonStart?: any | null;
              afterNoonEnd?: any | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type CreateRequestAggregateMutationVariables = Exact<{
  data: RequestAggregateInput;
}>;

export type CreateRequestAggregateMutation = {
  __typename?: "Mutation";
  createRequestAggregate?: {
    __typename?: "RequestAggregateEntityResponse";
    data?: {
      __typename?: "RequestAggregateEntity";
      id?: string | null;
      attributes?: {
        __typename?: "RequestAggregate";
        name: string;
        createdAt?: any | null;
        updatedAt?: any | null;
        requestService?: {
          __typename?: "RequestServiceEntityResponse";
          data?: {
            __typename?: "RequestServiceEntity";
            id?: string | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type CreateRequestByContractIdMutationVariables = Exact<{
  data: RequestInput;
}>;

export type CreateRequestByContractIdMutation = {
  __typename?: "Mutation";
  createRequest?: {
    __typename?: "RequestEntityResponse";
    data?: { __typename?: "RequestEntity"; id?: string | null } | null;
  } | null;
};

export type DeleteRequestAggregateByIdMutationVariables = Exact<{
  deleteRequestAggregateId: Scalars["ID"];
}>;

export type DeleteRequestAggregateByIdMutation = {
  __typename?: "Mutation";
  deleteRequestAggregate?: {
    __typename?: "RequestAggregateEntityResponse";
    data?: { __typename?: "RequestAggregateEntity"; id?: string | null } | null;
  } | null;
};

export type DeleteRequestByIdMutationVariables = Exact<{
  deleteRequestId: Scalars["ID"];
}>;

export type DeleteRequestByIdMutation = {
  __typename?: "Mutation";
  deleteRequest?: {
    __typename?: "RequestEntityResponse";
    data?: { __typename?: "RequestEntity"; id?: string | null } | null;
  } | null;
};

export type GetRequestAggregatesByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type GetRequestAggregatesByContractIdQuery = {
  __typename?: "Query";
  requestAggregates?: {
    __typename?: "RequestAggregateEntityResponseCollection";
    data: Array<{
      __typename?: "RequestAggregateEntity";
      id?: string | null;
      attributes?: {
        __typename?: "RequestAggregate";
        name: string;
        requests?: {
          __typename?: "RequestRelationResponseCollection";
          data: Array<{ __typename?: "RequestEntity"; id?: string | null }>;
        } | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        total: number;
        page: number;
        pageSize: number;
        pageCount: number;
      };
    };
  } | null;
};

export type GetRequestByIdQueryVariables = Exact<{
  requestId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetRequestByIdQuery = {
  __typename?: "Query";
  request?: {
    __typename?: "RequestEntityResponse";
    data?: {
      __typename?: "RequestEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Request";
        name?: string | null;
        description?: string | null;
        blockText?: string | null;
        isActivated?: boolean | null;
        hasSeveralRequestTypes: boolean;
        hasAddress: boolean;
        fieldAddressLabel?: string | null;
        hasUser: boolean;
        displayUserCivility?: boolean | null;
        isUserNameMandatory?: boolean | null;
        isUserEmailMandatory?: boolean | null;
        isUserPhoneMandatory?: boolean | null;
        userAllowSMSNotification?: boolean | null;
        requestService?: {
          __typename?: "RequestServiceEntityResponse";
          data?: {
            __typename?: "RequestServiceEntity";
            id?: string | null;
          } | null;
        } | null;
        requestAggregate?: {
          __typename?: "RequestAggregateEntityResponse";
          data?: {
            __typename?: "RequestAggregateEntity";
            id?: string | null;
            attributes?: {
              __typename?: "RequestAggregate";
              name: string;
            } | null;
          } | null;
        } | null;
        requestType?: Array<{
          __typename?: "ComponentBlocksRequestType";
          id: string;
          title: string;
          isEmail?: boolean | null;
          email?: string | null;
          isTSMS?: boolean | null;
        } | null> | null;
        addableBlocks?: Array<
          | {
              __typename?: "ComponentBlocksAttachments";
              id: string;
              attachmentLabel: string;
              renderField: boolean;
              multipleAttachments?: boolean | null;
            }
          | {
              __typename?: "ComponentBlocksCheckbox";
              id: string;
              fieldStatusCheckbox: Enum_Componentblockscheckbox_Fieldstatuscheckbox;
              labelCheckbox: string;
            }
          | { __typename?: "ComponentBlocksCommentary" }
          | { __typename?: "ComponentBlocksCumbersome" }
          | {
              __typename?: "ComponentBlocksDateChoice";
              id: string;
              fieldStatus: Enum_Componentblocksdatechoice_Fieldstatus;
              fieldLabelDateChoice: string;
            }
          | { __typename?: "ComponentBlocksProofOfReceipt" }
          | {
              __typename?: "ComponentBlocksQcm";
              id: string;
              fieldStatusQCM: Enum_Componentblocksqcm_Fieldstatusqcm;
              fieldLabelQCM: string;
              responses: string;
              multipleChoice: boolean;
            }
          | {
              __typename?: "ComponentBlocksQuestions";
              id: string;
              height: boolean;
              questionTextLabel: string;
              questionTextPlaceholder: string;
              textStatus: Enum_Componentblocksquestions_Textstatus;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetRequestsByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type GetRequestsByContractIdQuery = {
  __typename?: "Query";
  requests?: {
    __typename?: "RequestEntityResponseCollection";
    data: Array<{
      __typename?: "RequestEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Request";
        name?: string | null;
        isActivated?: boolean | null;
        hasSeveralRequestTypes: boolean;
        updatedAt?: any | null;
        createdAt?: any | null;
        requestType?: Array<{
          __typename?: "ComponentBlocksRequestType";
          email?: string | null;
          id: string;
          title: string;
          isEmail?: boolean | null;
          isTSMS?: boolean | null;
        } | null> | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageCount: number;
        pageSize: number;
        total: number;
      };
    };
  } | null;
};

export type UpdateRequestAggregateMutationVariables = Exact<{
  updateRequestAggregateId: Scalars["ID"];
  data: RequestAggregateInput;
}>;

export type UpdateRequestAggregateMutation = {
  __typename?: "Mutation";
  updateRequestAggregate?: {
    __typename?: "RequestAggregateEntityResponse";
    data?: {
      __typename?: "RequestAggregateEntity";
      id?: string | null;
      attributes?: { __typename?: "RequestAggregate"; name: string } | null;
    } | null;
  } | null;
};

export type UpdateRequestByIdMutationVariables = Exact<{
  updateRequestId: Scalars["ID"];
  data: RequestInput;
}>;

export type UpdateRequestByIdMutation = {
  __typename?: "Mutation";
  updateRequest?: {
    __typename?: "RequestEntityResponse";
    data?: { __typename?: "RequestEntity"; id?: string | null } | null;
  } | null;
};

export type GetWasteFamiliesQueryVariables = Exact<{
  contractId?: InputMaybe<Scalars["ID"]>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type GetWasteFamiliesQuery = {
  __typename?: "Query";
  recyclingGuideService?: {
    __typename?: "RecyclingGuideServiceEntityResponse";
    data?: {
      __typename?: "RecyclingGuideServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "RecyclingGuideService";
        wasteFamilies?: {
          __typename?: "WasteFamilyRelationResponseCollection";
          data: Array<{
            __typename?: "WasteFamilyEntity";
            id?: string | null;
            attributes?: {
              __typename?: "WasteFamily";
              familyName: string;
              isSystem: boolean;
              wasteForms?: {
                __typename?: "WasteFormRelationResponseCollection";
                data: Array<{
                  __typename?: "WasteFormEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "WasteForm";
                    name?: string | null;
                  } | null;
                }>;
              } | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetWasteFamiliesByContractIdQueryVariables = Exact<{
  contractId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetWasteFamiliesByContractIdQuery = {
  __typename?: "Query";
  recyclingGuideService?: {
    __typename?: "RecyclingGuideServiceEntityResponse";
    data?: {
      __typename?: "RecyclingGuideServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "RecyclingGuideService";
        wasteFamilies?: {
          __typename?: "WasteFamilyRelationResponseCollection";
          data: Array<{
            __typename?: "WasteFamilyEntity";
            id?: string | null;
            attributes?: {
              __typename?: "WasteFamily";
              familyName: string;
              isSystem: boolean;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateWasteFamilyMutationVariables = Exact<{
  updateWasteFamilyId: Scalars["ID"];
  data: WasteFamilyInput;
}>;

export type UpdateWasteFamilyMutation = {
  __typename?: "Mutation";
  updateWasteFamily?: {
    __typename?: "WasteFamilyEntityResponse";
    data?: {
      __typename?: "WasteFamilyEntity";
      id?: string | null;
      attributes?: {
        __typename?: "WasteFamily";
        familyName: string;
        createdAt?: any | null;
        updatedAt?: any | null;
        isSystem: boolean;
      } | null;
    } | null;
  } | null;
};

export type GetAllVersionsOfWasteFormByCustomIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  customId?: InputMaybe<Scalars["String"]>;
  statusFilter?: InputMaybe<StringFilterInput>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type GetAllVersionsOfWasteFormByCustomIdQuery = {
  __typename?: "Query";
  wasteFormsCount?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  wasteFormsCountDraft?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  wasteFormsCountPublished?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  wasteFormsCountArchived?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  wasteForms?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
    data: Array<{
      __typename?: "WasteFormEntity";
      id?: string | null;
      attributes?: {
        __typename?: "WasteForm";
        versionNumber?: number | null;
        status?: Enum_Wasteform_Status | null;
        publishedDate?: any | null;
        updatedAt?: any | null;
      } | null;
    }>;
  } | null;
};

export type GetFlowsFilterByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetFlowsFilterByContractIdQuery = {
  __typename?: "Query";
  flows?: {
    __typename?: "FlowEntityResponseCollection";
    data: Array<{
      __typename?: "FlowEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Flow";
        name?: string | null;
        recyclingGesture: Enum_Flow_Recyclinggesture;
      } | null;
    }>;
  } | null;
};

export type GetWasteFormByIdQueryVariables = Exact<{
  wasteFormId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetWasteFormByIdQuery = {
  __typename?: "Query";
  wasteForm?: {
    __typename?: "WasteFormEntityResponse";
    data?: {
      __typename?: "WasteFormEntity";
      id?: string | null;
      attributes?: {
        __typename?: "WasteForm";
        customId?: string | null;
        name?: string | null;
        updatedAt?: any | null;
        status?: Enum_Wasteform_Status | null;
        createdAt?: any | null;
        publishedDate?: any | null;
        unpublishedDate?: any | null;
        versionNumber?: number | null;
        draftCreationId?: string | null;
        isHidden?: boolean | null;
        recyclingGestureText?: string | null;
        tags?: {
          __typename?: "TagRelationResponseCollection";
          data: Array<{
            __typename?: "TagEntity";
            id?: string | null;
            attributes?: { __typename?: "Tag"; name: string } | null;
          }>;
        } | null;
        flow?: {
          __typename?: "FlowEntityResponse";
          data?: {
            __typename?: "FlowEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Flow";
              name?: string | null;
              recyclingGesture: Enum_Flow_Recyclinggesture;
            } | null;
          } | null;
        } | null;
        picto?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              createdAt?: any | null;
              ext?: string | null;
              width?: number | null;
              height?: number | null;
            } | null;
          } | null;
        } | null;
        wasteFamily?: {
          __typename?: "WasteFamilyEntityResponse";
          data?: {
            __typename?: "WasteFamilyEntity";
            id?: string | null;
            attributes?: {
              __typename?: "WasteFamily";
              familyName: string;
              isSystem: boolean;
              createdAt?: any | null;
              updatedAt?: any | null;
            } | null;
          } | null;
        } | null;
        contentBlock?: Array<
          | {
              __typename?: "ComponentBlocksFile";
              id: string;
              document?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksHorizontalRule";
              hr?: string | null;
              id: string;
            }
          | {
              __typename?: "ComponentBlocksImage";
              id: string;
              altText?: string | null;
              isDecorative?: boolean | null;
              picture?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "UploadFile";
                    hash: string;
                    mime: string;
                    name: string;
                    provider: string;
                    size: number;
                    url: string;
                    alternativeText?: string | null;
                    createdAt?: any | null;
                    ext?: string | null;
                    width?: number | null;
                    height?: number | null;
                  } | null;
                } | null;
              } | null;
            }
          | {
              __typename?: "ComponentBlocksSubHeading";
              id: string;
              subHeadingTag?: Enum_Componentblockssubheading_Subheadingtag | null;
              subHeadingText?: string | null;
            }
          | {
              __typename?: "ComponentBlocksVideo";
              id: string;
              transcriptText?: string | null;
              videoLink?: string | null;
            }
          | {
              __typename?: "ComponentBlocksWysiwyg";
              id: string;
              textEditor?: string | null;
            }
          | { __typename?: "Error" }
          | null
        > | null;
      } | null;
    } | null;
  } | null;
};

export type GetWasteFormDraftQueryVariables = Exact<{
  customId: Scalars["String"];
}>;

export type GetWasteFormDraftQuery = {
  __typename?: "Query";
  wasteForms?: {
    __typename?: "WasteFormEntityResponseCollection";
    data: Array<{ __typename?: "WasteFormEntity"; id?: string | null }>;
  } | null;
};

export type GetWasteFormsByContractIdQueryVariables = Exact<{
  contractId?: InputMaybe<Scalars["ID"]>;
  statusFilter?: InputMaybe<Scalars["String"]>;
  flowId?: InputMaybe<Scalars["ID"]>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type GetWasteFormsByContractIdQuery = {
  __typename?: "Query";
  wasteFormsCount?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  wasteFormsDraftCount?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  wasteFormsPublishedCount?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  wasteFormsArchivedCount?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: { __typename?: "Pagination"; total: number };
    };
  } | null;
  wasteForms?: {
    __typename?: "WasteFormEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
    data: Array<{
      __typename?: "WasteFormEntity";
      id?: string | null;
      attributes?: {
        __typename?: "WasteForm";
        name?: string | null;
        status?: Enum_Wasteform_Status | null;
        updatedAt?: any | null;
        isHidden?: boolean | null;
      } | null;
    }>;
  } | null;
};

export type UpdateWasteFormMutationVariables = Exact<{
  updateWasteFormId: Scalars["ID"];
  data: WasteFormInput;
}>;

export type UpdateWasteFormMutation = {
  __typename?: "Mutation";
  updateWasteForm?: {
    __typename?: "WasteFormEntityResponse";
    data?: {
      __typename?: "WasteFormEntity";
      id?: string | null;
      attributes?: {
        __typename?: "WasteForm";
        customId?: string | null;
        isHidden?: boolean | null;
      } | null;
    } | null;
  } | null;
};

export type GetRecyclingGuideServiceByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetRecyclingGuideServiceByContractIdQuery = {
  __typename?: "Query";
  recyclingGuideServices?: {
    __typename?: "RecyclingGuideServiceEntityResponseCollection";
    data: Array<{
      __typename?: "RecyclingGuideServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "RecyclingGuideService";
        name: string;
        endDate?: any | null;
        memoName: string;
        memoDesc?: string | null;
        isActivated: boolean;
        orderExtension?: boolean | null;
        wasteFamilies?: {
          __typename?: "WasteFamilyRelationResponseCollection";
          data: Array<{
            __typename?: "WasteFamilyEntity";
            id?: string | null;
            attributes?: {
              __typename?: "WasteFamily";
              createdAt?: any | null;
              familyName: string;
              isSystem: boolean;
              updatedAt?: any | null;
              wasteForms?: {
                __typename?: "WasteFormRelationResponseCollection";
                data: Array<{
                  __typename?: "WasteFormEntity";
                  id?: string | null;
                  attributes?: {
                    __typename?: "WasteForm";
                    name?: string | null;
                  } | null;
                }>;
              } | null;
            } | null;
          }>;
        } | null;
        memoFile?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              name: string;
              hash: string;
              mime: string;
              size: number;
              url: string;
              provider: string;
            } | null;
          } | null;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetRecyclingGuideServiceByIdQueryVariables = Exact<{
  recyclingGuideServiceId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetRecyclingGuideServiceByIdQuery = {
  __typename?: "Query";
  recyclingGuideService?: {
    __typename?: "RecyclingGuideServiceEntityResponse";
    data?: {
      __typename?: "RecyclingGuideServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "RecyclingGuideService";
        orderExtension?: boolean | null;
        memoName: string;
        memoDesc?: string | null;
        memoFile?: {
          __typename?: "UploadFileEntityResponse";
          data?: {
            __typename?: "UploadFileEntity";
            id?: string | null;
            attributes?: {
              __typename?: "UploadFile";
              hash: string;
              mime: string;
              name: string;
              provider: string;
              size: number;
              url: string;
              alternativeText?: string | null;
              ext?: string | null;
              height?: number | null;
              width?: number | null;
              createdAt?: any | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateMemoTriMutationVariables = Exact<{
  updateRecyclingGuideServiceId: Scalars["ID"];
  data: RecyclingGuideServiceInput;
}>;

export type UpdateMemoTriMutation = {
  __typename?: "Mutation";
  updateRecyclingGuideService?: {
    __typename?: "RecyclingGuideServiceEntityResponse";
    data?: {
      __typename?: "RecyclingGuideServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "RecyclingGuideService";
        name: string;
        isActivated: boolean;
        memoName: string;
        memoDesc?: string | null;
        memoFile?: {
          __typename?: "UploadFileEntityResponse";
          data?: { __typename?: "UploadFileEntity"; id?: string | null } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateRecyclingGuideServiceMutationVariables = Exact<{
  updateRecyclingGuideServiceId: Scalars["ID"];
  data: RecyclingGuideServiceInput;
}>;

export type UpdateRecyclingGuideServiceMutation = {
  __typename?: "Mutation";
  updateRecyclingGuideService?: {
    __typename?: "RecyclingGuideServiceEntityResponse";
    data?: {
      __typename?: "RecyclingGuideServiceEntity";
      id?: string | null;
      attributes?: {
        __typename?: "RecyclingGuideService";
        orderExtension?: boolean | null;
      } | null;
    } | null;
  } | null;
};

export type GetFilteredFlowsQueryVariables = Exact<{
  contractId?: InputMaybe<Scalars["ID"]>;
  sectorizationsId?: InputMaybe<
    Array<InputMaybe<Scalars["ID"]>> | InputMaybe<Scalars["ID"]>
  >;
}>;

export type GetFilteredFlowsQuery = {
  __typename?: "Query";
  flows?: {
    __typename?: "FlowEntityResponseCollection";
    data: Array<{
      __typename?: "FlowEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Flow";
        name?: string | null;
        pickUpDays?: {
          __typename?: "PickUpDayRelationResponseCollection";
          data: Array<{ __typename?: "PickUpDayEntity"; id?: string | null }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type CreateInformationMessageMutationVariables = Exact<{
  data: InformationMessageInput;
}>;

export type CreateInformationMessageMutation = {
  __typename?: "Mutation";
  createInformationMessage?: {
    __typename?: "InformationMessageEntityResponse";
    data?: {
      __typename?: "InformationMessageEntity";
      id?: string | null;
      attributes?: {
        __typename?: "InformationMessage";
        dateStart: string;
        infoMessage: string;
        dateEnd?: string | null;
        pickUpDays?: {
          __typename?: "PickUpDayRelationResponseCollection";
          data: Array<{ __typename?: "PickUpDayEntity"; id?: string | null }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type CreatePickUpDayMutationVariables = Exact<{
  data: PickUpDayInput;
}>;

export type CreatePickUpDayMutation = {
  __typename?: "Mutation";
  createPickUpDay?: {
    __typename?: "PickUpDayEntityResponse";
    data?: {
      __typename?: "PickUpDayEntity";
      id?: string | null;
      attributes?: {
        __typename?: "PickUpDay";
        name: string;
        description?: string | null;
        periodicity?: Enum_Pickupday_Periodicity | null;
        advancedSelection: any;
        pickUpHours?: string | null;
        includeHoliday: boolean;
        complementaryMention?: string | null;
        createdAt?: any | null;
        updatedAt?: any | null;
        buttonLabel?: string | null;
        externalLink?: string | null;
        request?: {
          __typename?: "RequestEntityResponse";
          data?: { __typename?: "RequestEntity"; id?: string | null } | null;
        } | null;
        flow: {
          __typename?: "FlowEntityResponse";
          data?: {
            __typename?: "FlowEntity";
            id?: string | null;
            attributes?: { __typename?: "Flow"; name?: string | null } | null;
          } | null;
        };
        pickUpDayService?: {
          __typename?: "PickUpDayServiceEntityResponse";
          data?: {
            __typename?: "PickUpDayServiceEntity";
            id?: string | null;
            attributes?: {
              __typename?: "PickUpDayService";
              name: string;
            } | null;
          } | null;
        } | null;
        sectorizations?: {
          __typename?: "SectorizationRelationResponseCollection";
          data: Array<{
            __typename?: "SectorizationEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Sectorization";
              name: string;
              description: string;
              polygonCoordinates?: any | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetActiveRequestsByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetActiveRequestsByContractIdQuery = {
  __typename?: "Query";
  requests?: {
    __typename?: "RequestEntityResponseCollection";
    data: Array<{
      __typename?: "RequestEntity";
      id?: string | null;
      attributes?: {
        __typename?: "Request";
        name?: string | null;
        isActivated?: boolean | null;
        hasSeveralRequestTypes: boolean;
        hasAddress: boolean;
        hasUser: boolean;
      } | null;
    }>;
  } | null;
};

export type GetCollectDoorToDoorByFlowIdQueryVariables = Exact<{
  flowId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetCollectDoorToDoorByFlowIdQuery = {
  __typename?: "Query";
  collectDoorToDoors?: {
    __typename?: "CollectDoorToDoorEntityResponseCollection";
    data: Array<{
      __typename?: "CollectDoorToDoorEntity";
      id?: string | null;
      attributes?: {
        __typename?: "CollectDoorToDoor";
        name?: string | null;
      } | null;
    }>;
  } | null;
};

export type GetCollectVoluntariesByFlowIdQueryVariables = Exact<{
  flowId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetCollectVoluntariesByFlowIdQuery = {
  __typename?: "Query";
  collectVoluntaries?: {
    __typename?: "CollectVoluntaryEntityResponseCollection";
    data: Array<{
      __typename?: "CollectVoluntaryEntity";
      id?: string | null;
      attributes?: {
        __typename?: "CollectVoluntary";
        name?: string | null;
      } | null;
    }>;
  } | null;
};

export type GetDropOffCollectTypeByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetDropOffCollectTypeByContractIdQuery = {
  __typename?: "Query";
  getDropOffCollectType?: Array<{
    __typename?: "CollectEntity";
    entityTypeName: string;
    uniqueId: string;
    grammaticalGender: string;
    name: string;
    originalId: string;
  } | null> | null;
};

export type GetFlowsQueryVariables = Exact<{
  contractId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetFlowsQuery = {
  __typename?: "Query";
  flows?: {
    __typename?: "FlowEntityResponseCollection";
    data: Array<{
      __typename?: "FlowEntity";
      id?: string | null;
      attributes?: { __typename?: "Flow"; name?: string | null } | null;
    }>;
  } | null;
};

export type GetInformationMessageByContractIdQueryVariables = Exact<{
  contractId: Scalars["ID"];
  pickUpDaysId?: InputMaybe<Scalars["ID"]>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
}>;

export type GetInformationMessageByContractIdQuery = {
  __typename?: "Query";
  informationMessages?: {
    __typename?: "InformationMessageEntityResponseCollection";
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageCount: number;
        pageSize: number;
        total: number;
      };
    };
    data: Array<{
      __typename?: "InformationMessageEntity";
      id?: string | null;
      attributes?: {
        __typename?: "InformationMessage";
        infoMessage: string;
        pickUpDays?: {
          __typename?: "PickUpDayRelationResponseCollection";
          data: Array<{
            __typename?: "PickUpDayEntity";
            id?: string | null;
            attributes?: { __typename?: "PickUpDay"; name: string } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetInformationMessageByIdQueryVariables = Exact<{
  informationMessageId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetInformationMessageByIdQuery = {
  __typename?: "Query";
  informationMessage?: {
    __typename?: "InformationMessageEntityResponse";
    data?: {
      __typename?: "InformationMessageEntity";
      id?: string | null;
      attributes?: {
        __typename?: "InformationMessage";
        dateStart: string;
        dateEnd?: string | null;
        infoMessage: string;
        pickUpDays?: {
          __typename?: "PickUpDayRelationResponseCollection";
          data: Array<{
            __typename?: "PickUpDayEntity";
            id?: string | null;
            attributes?: { __typename?: "PickUpDay"; name: string } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetPickUpDayByIdQueryVariables = Exact<{
  pickUpDayId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetPickUpDayByIdQuery = {
  __typename?: "Query";
  pickUpDay?: {
    __typename?: "PickUpDayEntityResponse";
    data?: {
      __typename?: "PickUpDayEntity";
      id?: string | null;
      attributes?: {
        __typename?: "PickUpDay";
        name: string;
        periodicity?: Enum_Pickupday_Periodicity | null;
        advancedSelection: any;
        pickUpHours?: string | null;
        includeHoliday: boolean;
        complementaryMention?: string | null;
        buttonLabel?: string | null;
        externalLink?: string | null;
        request?: {
          __typename?: "RequestEntityResponse";
          data?: { __typename?: "RequestEntity"; id?: string | null } | null;
        } | null;
        flow: {
          __typename?: "FlowEntityResponse";
          data?: {
            __typename?: "FlowEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Flow";
              name?: string | null;
              recyclingGesture: Enum_Flow_Recyclinggesture;
            } | null;
          } | null;
        };
        sectorizations?: {
          __typename?: "SectorizationRelationResponseCollection";
          data: Array<{
            __typename?: "SectorizationEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Sectorization";
              name: string;
              description: string;
              polygonCoordinates?: any | null;
            } | null;
          }>;
        } | null;
        cities?: {
          __typename?: "CityRelationResponseCollection";
          data: Array<{
            __typename?: "CityEntity";
            id?: string | null;
            attributes?: { __typename?: "City"; name?: string | null } | null;
          }>;
        } | null;
        collectDoorToDoor?: {
          __typename?: "CollectDoorToDoorEntityResponse";
          data?: {
            __typename?: "CollectDoorToDoorEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectDoorToDoor";
              name?: string | null;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
        collectVoluntary?: {
          __typename?: "CollectVoluntaryEntityResponse";
          data?: {
            __typename?: "CollectVoluntaryEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectVoluntary";
              name?: string | null;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type GetPickUpDaysByContractIdQueryVariables = Exact<{
  contractId?: InputMaybe<Scalars["ID"]>;
  sort?: InputMaybe<
    Array<InputMaybe<Scalars["String"]>> | InputMaybe<Scalars["String"]>
  >;
  pagination?: InputMaybe<PaginationArg>;
}>;

export type GetPickUpDaysByContractIdQuery = {
  __typename?: "Query";
  pickUpDays?: {
    __typename?: "PickUpDayEntityResponseCollection";
    data: Array<{
      __typename?: "PickUpDayEntity";
      id?: string | null;
      attributes?: {
        __typename?: "PickUpDay";
        name: string;
        updatedAt?: any | null;
        collectDoorToDoor?: {
          __typename?: "CollectDoorToDoorEntityResponse";
          data?: {
            __typename?: "CollectDoorToDoorEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectDoorToDoor";
              name?: string | null;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
        collectVoluntary?: {
          __typename?: "CollectVoluntaryEntityResponse";
          data?: {
            __typename?: "CollectVoluntaryEntity";
            id?: string | null;
            attributes?: {
              __typename?: "CollectVoluntary";
              name?: string | null;
              picto?: {
                __typename?: "UploadFileEntityResponse";
                data?: {
                  __typename?: "UploadFileEntity";
                  id?: string | null;
                } | null;
              } | null;
            } | null;
          } | null;
        } | null;
        flow: {
          __typename?: "FlowEntityResponse";
          data?: {
            __typename?: "FlowEntity";
            attributes?: { __typename?: "Flow"; name?: string | null } | null;
          } | null;
        };
        sectorizations?: {
          __typename?: "SectorizationRelationResponseCollection";
          data: Array<{
            __typename?: "SectorizationEntity";
            attributes?: { __typename?: "Sectorization"; name: string } | null;
          }>;
        } | null;
      } | null;
    }>;
    meta: {
      __typename?: "ResponseCollectionMeta";
      pagination: {
        __typename?: "Pagination";
        page: number;
        pageCount: number;
        pageSize: number;
        total: number;
      };
    };
  } | null;
};

export type GetSearchCitiesQueryVariables = Exact<{
  searchTerm: Scalars["String"];
  contractId: Scalars["ID"];
}>;

export type GetSearchCitiesQuery = {
  __typename?: "Query";
  searchCities?: Array<{
    __typename?: "CityResult";
    id: string;
    name?: string | null;
  } | null> | null;
};

export type GetSectorizationsPickUpDayQueryVariables = Exact<{
  contractId?: InputMaybe<Scalars["ID"]>;
}>;

export type GetSectorizationsPickUpDayQuery = {
  __typename?: "Query";
  sectorizations?: {
    __typename?: "SectorizationEntityResponseCollection";
    data: Array<{
      __typename?: "SectorizationEntity";
      id?: string | null;
      attributes?: { __typename?: "Sectorization"; name: string } | null;
    }>;
  } | null;
};

export type UpdateInformationMessageByIdMutationVariables = Exact<{
  updateInformationMessageId: Scalars["ID"];
  data: InformationMessageInput;
}>;

export type UpdateInformationMessageByIdMutation = {
  __typename?: "Mutation";
  updateInformationMessage?: {
    __typename?: "InformationMessageEntityResponse";
    data?: {
      __typename?: "InformationMessageEntity";
      id?: string | null;
      attributes?: {
        __typename?: "InformationMessage";
        infoMessage: string;
        dateStart: string;
        dateEnd?: string | null;
        pickUpDays?: {
          __typename?: "PickUpDayRelationResponseCollection";
          data: Array<{
            __typename?: "PickUpDayEntity";
            id?: string | null;
            attributes?: { __typename?: "PickUpDay"; name: string } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdatePickUpDayMutationVariables = Exact<{
  updatePickUpDayId: Scalars["ID"];
  data: PickUpDayInput;
}>;

export type UpdatePickUpDayMutation = {
  __typename?: "Mutation";
  updatePickUpDay?: {
    __typename?: "PickUpDayEntityResponse";
    data?: {
      __typename?: "PickUpDayEntity";
      id?: string | null;
      attributes?: {
        __typename?: "PickUpDay";
        name: string;
        description?: string | null;
        periodicity?: Enum_Pickupday_Periodicity | null;
        advancedSelection: any;
        pickUpHours?: string | null;
        includeHoliday: boolean;
        complementaryMention?: string | null;
        buttonLabel?: string | null;
        externalLink?: string | null;
        request?: {
          __typename?: "RequestEntityResponse";
          data?: { __typename?: "RequestEntity"; id?: string | null } | null;
        } | null;
        flow: {
          __typename?: "FlowEntityResponse";
          data?: {
            __typename?: "FlowEntity";
            id?: string | null;
            attributes?: { __typename?: "Flow"; name?: string | null } | null;
          } | null;
        };
        sectorizations?: {
          __typename?: "SectorizationRelationResponseCollection";
          data: Array<{
            __typename?: "SectorizationEntity";
            id?: string | null;
            attributes?: {
              __typename?: "Sectorization";
              name: string;
              description: string;
              polygonCoordinates?: any | null;
            } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export const CreateNewDocument = gql`
  mutation createNew($data: NewInput!) {
    createNew(data: $data) {
      data {
        id
        attributes {
          customId
          title
          shortDescription
          newsSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type CreateNewMutationFn = Apollo.MutationFunction<
  CreateNewMutation,
  CreateNewMutationVariables
>;

/**
 * __useCreateNewMutation__
 *
 * To run a mutation, you first call `useCreateNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewMutation, { data, loading, error }] = useCreateNewMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewMutation,
    CreateNewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateNewMutation, CreateNewMutationVariables>(
    CreateNewDocument,
    options,
  );
}
export type CreateNewMutationHookResult = ReturnType<
  typeof useCreateNewMutation
>;
export type CreateNewMutationResult = Apollo.MutationResult<CreateNewMutation>;
export type CreateNewMutationOptions = Apollo.BaseMutationOptions<
  CreateNewMutation,
  CreateNewMutationVariables
>;
export const DeleteNewDocument = gql`
  mutation deleteNew($deleteNewId: ID!) {
    deleteNew(id: $deleteNewId) {
      data {
        id
        attributes {
          customId
          title
          shortDescription
          newsSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type DeleteNewMutationFn = Apollo.MutationFunction<
  DeleteNewMutation,
  DeleteNewMutationVariables
>;

/**
 * __useDeleteNewMutation__
 *
 * To run a mutation, you first call `useDeleteNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNewMutation, { data, loading, error }] = useDeleteNewMutation({
 *   variables: {
 *      deleteNewId: // value for 'deleteNewId'
 *   },
 * });
 */
export function useDeleteNewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteNewMutation,
    DeleteNewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteNewMutation, DeleteNewMutationVariables>(
    DeleteNewDocument,
    options,
  );
}
export type DeleteNewMutationHookResult = ReturnType<
  typeof useDeleteNewMutation
>;
export type DeleteNewMutationResult = Apollo.MutationResult<DeleteNewMutation>;
export type DeleteNewMutationOptions = Apollo.BaseMutationOptions<
  DeleteNewMutation,
  DeleteNewMutationVariables
>;
export const GetAllVersionsOfNewsByCustomIdDocument = gql`
  query getAllVersionsOfNewsByCustomId(
    $contractId: ID!
    $customId: String
    $statusFilter: StringFilterInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    newsCount: news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    newsCountDraft: news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: { eq: "draft" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    newsCountPublished: news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: { eq: "published" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    newsCountArchived: news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: { eq: "archived" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: $statusFilter
      }
      sort: $sort
      pagination: $pagination
    ) {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
      data {
        id
        attributes {
          versionNumber
          status
          publishedDate
          updatedAt
        }
      }
    }
  }
`;

/**
 * __useGetAllVersionsOfNewsByCustomIdQuery__
 *
 * To run a query within a React component, call `useGetAllVersionsOfNewsByCustomIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllVersionsOfNewsByCustomIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllVersionsOfNewsByCustomIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      customId: // value for 'customId'
 *      statusFilter: // value for 'statusFilter'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetAllVersionsOfNewsByCustomIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllVersionsOfNewsByCustomIdQuery,
    GetAllVersionsOfNewsByCustomIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllVersionsOfNewsByCustomIdQuery,
    GetAllVersionsOfNewsByCustomIdQueryVariables
  >(GetAllVersionsOfNewsByCustomIdDocument, options);
}
export function useGetAllVersionsOfNewsByCustomIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllVersionsOfNewsByCustomIdQuery,
    GetAllVersionsOfNewsByCustomIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllVersionsOfNewsByCustomIdQuery,
    GetAllVersionsOfNewsByCustomIdQueryVariables
  >(GetAllVersionsOfNewsByCustomIdDocument, options);
}
export type GetAllVersionsOfNewsByCustomIdQueryHookResult = ReturnType<
  typeof useGetAllVersionsOfNewsByCustomIdQuery
>;
export type GetAllVersionsOfNewsByCustomIdLazyQueryHookResult = ReturnType<
  typeof useGetAllVersionsOfNewsByCustomIdLazyQuery
>;
export type GetAllVersionsOfNewsByCustomIdQueryResult = Apollo.QueryResult<
  GetAllVersionsOfNewsByCustomIdQuery,
  GetAllVersionsOfNewsByCustomIdQueryVariables
>;
export const GetNewByIdDocument = gql`
  query getNewById($newId: ID) {
    new(id: $newId) {
      data {
        id
        attributes {
          customId
          draftCreationId
          title
          shortDescription
          newsSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetNewByIdQuery__
 *
 * To run a query within a React component, call `useGetNewByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewByIdQuery({
 *   variables: {
 *      newId: // value for 'newId'
 *   },
 * });
 */
export function useGetNewByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetNewByIdQuery,
    GetNewByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNewByIdQuery, GetNewByIdQueryVariables>(
    GetNewByIdDocument,
    options,
  );
}
export function useGetNewByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNewByIdQuery,
    GetNewByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNewByIdQuery, GetNewByIdQueryVariables>(
    GetNewByIdDocument,
    options,
  );
}
export type GetNewByIdQueryHookResult = ReturnType<typeof useGetNewByIdQuery>;
export type GetNewByIdLazyQueryHookResult = ReturnType<
  typeof useGetNewByIdLazyQuery
>;
export type GetNewByIdQueryResult = Apollo.QueryResult<
  GetNewByIdQuery,
  GetNewByIdQueryVariables
>;
export const GetNewDraftDocument = gql`
  query getNewDraft($customId: String!) {
    news(filters: { customId: { eq: $customId }, status: { eq: "draft" } }) {
      data {
        id
      }
    }
  }
`;

/**
 * __useGetNewDraftQuery__
 *
 * To run a query within a React component, call `useGetNewDraftQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewDraftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewDraftQuery({
 *   variables: {
 *      customId: // value for 'customId'
 *   },
 * });
 */
export function useGetNewDraftQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetNewDraftQuery,
    GetNewDraftQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNewDraftQuery, GetNewDraftQueryVariables>(
    GetNewDraftDocument,
    options,
  );
}
export function useGetNewDraftLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNewDraftQuery,
    GetNewDraftQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNewDraftQuery, GetNewDraftQueryVariables>(
    GetNewDraftDocument,
    options,
  );
}
export type GetNewDraftQueryHookResult = ReturnType<typeof useGetNewDraftQuery>;
export type GetNewDraftLazyQueryHookResult = ReturnType<
  typeof useGetNewDraftLazyQuery
>;
export type GetNewDraftQueryResult = Apollo.QueryResult<
  GetNewDraftQuery,
  GetNewDraftQueryVariables
>;
export const GetNewsByContractIdDocument = gql`
  query getNewsByContractId(
    $contractId: ID!
    $statusFilter: StringFilterInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    newsCount: news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    newsCountDraft: news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        status: { eq: "draft" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    newsCountPublished: news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        status: { eq: "published" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    newsCountArchived: news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        status: { eq: "archived" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    news(
      filters: {
        newsSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        status: $statusFilter
      }
      sort: $sort
      pagination: $pagination
    ) {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
      data {
        id
        attributes {
          title
          shortDescription
          status
          publishedDate
          unpublishedDate
        }
      }
    }
  }
`;

/**
 * __useGetNewsByContractIdQuery__
 *
 * To run a query within a React component, call `useGetNewsByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewsByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewsByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      statusFilter: // value for 'statusFilter'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetNewsByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetNewsByContractIdQuery,
    GetNewsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetNewsByContractIdQuery,
    GetNewsByContractIdQueryVariables
  >(GetNewsByContractIdDocument, options);
}
export function useGetNewsByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetNewsByContractIdQuery,
    GetNewsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetNewsByContractIdQuery,
    GetNewsByContractIdQueryVariables
  >(GetNewsByContractIdDocument, options);
}
export type GetNewsByContractIdQueryHookResult = ReturnType<
  typeof useGetNewsByContractIdQuery
>;
export type GetNewsByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetNewsByContractIdLazyQuery
>;
export type GetNewsByContractIdQueryResult = Apollo.QueryResult<
  GetNewsByContractIdQuery,
  GetNewsByContractIdQueryVariables
>;
export const UpdateNewDocument = gql`
  mutation UpdateNew($updateNewId: ID!, $data: NewInput!) {
    updateNew(id: $updateNewId, data: $data) {
      data {
        id
        attributes {
          customId
          title
          shortDescription
          newsSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateNewMutationFn = Apollo.MutationFunction<
  UpdateNewMutation,
  UpdateNewMutationVariables
>;

/**
 * __useUpdateNewMutation__
 *
 * To run a mutation, you first call `useUpdateNewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNewMutation, { data, loading, error }] = useUpdateNewMutation({
 *   variables: {
 *      updateNewId: // value for 'updateNewId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateNewMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNewMutation,
    UpdateNewMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateNewMutation, UpdateNewMutationVariables>(
    UpdateNewDocument,
    options,
  );
}
export type UpdateNewMutationHookResult = ReturnType<
  typeof useUpdateNewMutation
>;
export type UpdateNewMutationResult = Apollo.MutationResult<UpdateNewMutation>;
export type UpdateNewMutationOptions = Apollo.BaseMutationOptions<
  UpdateNewMutation,
  UpdateNewMutationVariables
>;
export const CreateTipDocument = gql`
  mutation createTip($data: TipInput!) {
    createTip(data: $data) {
      data {
        id
        attributes {
          title
          shortDescription
          tipSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type CreateTipMutationFn = Apollo.MutationFunction<
  CreateTipMutation,
  CreateTipMutationVariables
>;

/**
 * __useCreateTipMutation__
 *
 * To run a mutation, you first call `useCreateTipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTipMutation, { data, loading, error }] = useCreateTipMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTipMutation,
    CreateTipMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTipMutation, CreateTipMutationVariables>(
    CreateTipDocument,
    options,
  );
}
export type CreateTipMutationHookResult = ReturnType<
  typeof useCreateTipMutation
>;
export type CreateTipMutationResult = Apollo.MutationResult<CreateTipMutation>;
export type CreateTipMutationOptions = Apollo.BaseMutationOptions<
  CreateTipMutation,
  CreateTipMutationVariables
>;
export const DeleteTipDocument = gql`
  mutation deleteTip($deleteTipId: ID!) {
    deleteTip(id: $deleteTipId) {
      data {
        id
        attributes {
          title
          shortDescription
          tipSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type DeleteTipMutationFn = Apollo.MutationFunction<
  DeleteTipMutation,
  DeleteTipMutationVariables
>;

/**
 * __useDeleteTipMutation__
 *
 * To run a mutation, you first call `useDeleteTipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTipMutation, { data, loading, error }] = useDeleteTipMutation({
 *   variables: {
 *      deleteTipId: // value for 'deleteTipId'
 *   },
 * });
 */
export function useDeleteTipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTipMutation,
    DeleteTipMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteTipMutation, DeleteTipMutationVariables>(
    DeleteTipDocument,
    options,
  );
}
export type DeleteTipMutationHookResult = ReturnType<
  typeof useDeleteTipMutation
>;
export type DeleteTipMutationResult = Apollo.MutationResult<DeleteTipMutation>;
export type DeleteTipMutationOptions = Apollo.BaseMutationOptions<
  DeleteTipMutation,
  DeleteTipMutationVariables
>;
export const GetAllVersionsOfTipByCustomIdDocument = gql`
  query getAllVersionsOfTipByCustomId(
    $contractId: ID!
    $customId: String
    $statusFilter: StringFilterInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    tipsCount: tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    tipsCountDraft: tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: { eq: "draft" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    tipsCountPublished: tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: { eq: "published" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    tipsCountArchived: tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: { eq: "archived" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: $statusFilter
      }
      sort: $sort
      pagination: $pagination
    ) {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
      data {
        id
        attributes {
          versionNumber
          status
          publishedDate
          updatedAt
        }
      }
    }
  }
`;

/**
 * __useGetAllVersionsOfTipByCustomIdQuery__
 *
 * To run a query within a React component, call `useGetAllVersionsOfTipByCustomIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllVersionsOfTipByCustomIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllVersionsOfTipByCustomIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      customId: // value for 'customId'
 *      statusFilter: // value for 'statusFilter'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetAllVersionsOfTipByCustomIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllVersionsOfTipByCustomIdQuery,
    GetAllVersionsOfTipByCustomIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllVersionsOfTipByCustomIdQuery,
    GetAllVersionsOfTipByCustomIdQueryVariables
  >(GetAllVersionsOfTipByCustomIdDocument, options);
}
export function useGetAllVersionsOfTipByCustomIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllVersionsOfTipByCustomIdQuery,
    GetAllVersionsOfTipByCustomIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllVersionsOfTipByCustomIdQuery,
    GetAllVersionsOfTipByCustomIdQueryVariables
  >(GetAllVersionsOfTipByCustomIdDocument, options);
}
export type GetAllVersionsOfTipByCustomIdQueryHookResult = ReturnType<
  typeof useGetAllVersionsOfTipByCustomIdQuery
>;
export type GetAllVersionsOfTipByCustomIdLazyQueryHookResult = ReturnType<
  typeof useGetAllVersionsOfTipByCustomIdLazyQuery
>;
export type GetAllVersionsOfTipByCustomIdQueryResult = Apollo.QueryResult<
  GetAllVersionsOfTipByCustomIdQuery,
  GetAllVersionsOfTipByCustomIdQueryVariables
>;
export const GetTipByIdDocument = gql`
  query getTipById($tipId: ID) {
    tip(id: $tipId) {
      data {
        id
        attributes {
          customId
          draftCreationId
          title
          shortDescription
          tipSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetTipByIdQuery__
 *
 * To run a query within a React component, call `useGetTipByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTipByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTipByIdQuery({
 *   variables: {
 *      tipId: // value for 'tipId'
 *   },
 * });
 */
export function useGetTipByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTipByIdQuery,
    GetTipByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTipByIdQuery, GetTipByIdQueryVariables>(
    GetTipByIdDocument,
    options,
  );
}
export function useGetTipByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTipByIdQuery,
    GetTipByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTipByIdQuery, GetTipByIdQueryVariables>(
    GetTipByIdDocument,
    options,
  );
}
export type GetTipByIdQueryHookResult = ReturnType<typeof useGetTipByIdQuery>;
export type GetTipByIdLazyQueryHookResult = ReturnType<
  typeof useGetTipByIdLazyQuery
>;
export type GetTipByIdQueryResult = Apollo.QueryResult<
  GetTipByIdQuery,
  GetTipByIdQueryVariables
>;
export const GetTipDraftDocument = gql`
  query getTipDraft($customId: String!) {
    tips(filters: { customId: { eq: $customId }, status: { eq: "draft" } }) {
      data {
        id
      }
    }
  }
`;

/**
 * __useGetTipDraftQuery__
 *
 * To run a query within a React component, call `useGetTipDraftQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTipDraftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTipDraftQuery({
 *   variables: {
 *      customId: // value for 'customId'
 *   },
 * });
 */
export function useGetTipDraftQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTipDraftQuery,
    GetTipDraftQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTipDraftQuery, GetTipDraftQueryVariables>(
    GetTipDraftDocument,
    options,
  );
}
export function useGetTipDraftLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTipDraftQuery,
    GetTipDraftQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTipDraftQuery, GetTipDraftQueryVariables>(
    GetTipDraftDocument,
    options,
  );
}
export type GetTipDraftQueryHookResult = ReturnType<typeof useGetTipDraftQuery>;
export type GetTipDraftLazyQueryHookResult = ReturnType<
  typeof useGetTipDraftLazyQuery
>;
export type GetTipDraftQueryResult = Apollo.QueryResult<
  GetTipDraftQuery,
  GetTipDraftQueryVariables
>;
export const GetTipsByContractIdDocument = gql`
  query getTipsByContractId(
    $contractId: ID!
    $statusFilter: StringFilterInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    tipsCount: tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    tipsCountDraft: tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        status: { eq: "draft" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    tipsCountPublished: tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        status: { eq: "published" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    tipsCountArchived: tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        status: { eq: "archived" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    tips(
      filters: {
        tipSubService: {
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        status: $statusFilter
      }
      sort: $sort
      pagination: $pagination
    ) {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
      data {
        id
        attributes {
          title
          shortDescription
          status
          publishedDate
          unpublishedDate
        }
      }
    }
  }
`;

/**
 * __useGetTipsByContractIdQuery__
 *
 * To run a query within a React component, call `useGetTipsByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTipsByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTipsByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      statusFilter: // value for 'statusFilter'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetTipsByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTipsByContractIdQuery,
    GetTipsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTipsByContractIdQuery,
    GetTipsByContractIdQueryVariables
  >(GetTipsByContractIdDocument, options);
}
export function useGetTipsByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTipsByContractIdQuery,
    GetTipsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTipsByContractIdQuery,
    GetTipsByContractIdQueryVariables
  >(GetTipsByContractIdDocument, options);
}
export type GetTipsByContractIdQueryHookResult = ReturnType<
  typeof useGetTipsByContractIdQuery
>;
export type GetTipsByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetTipsByContractIdLazyQuery
>;
export type GetTipsByContractIdQueryResult = Apollo.QueryResult<
  GetTipsByContractIdQuery,
  GetTipsByContractIdQueryVariables
>;
export const UpdateTipDocument = gql`
  mutation updateTip($updateTipId: ID!, $data: TipInput!) {
    updateTip(id: $updateTipId, data: $data) {
      data {
        id
        attributes {
          customId
          title
          shortDescription
          tipSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateTipMutationFn = Apollo.MutationFunction<
  UpdateTipMutation,
  UpdateTipMutationVariables
>;

/**
 * __useUpdateTipMutation__
 *
 * To run a mutation, you first call `useUpdateTipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTipMutation, { data, loading, error }] = useUpdateTipMutation({
 *   variables: {
 *      updateTipId: // value for 'updateTipId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTipMutation,
    UpdateTipMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTipMutation, UpdateTipMutationVariables>(
    UpdateTipDocument,
    options,
  );
}
export type UpdateTipMutationHookResult = ReturnType<
  typeof useUpdateTipMutation
>;
export type UpdateTipMutationResult = Apollo.MutationResult<UpdateTipMutation>;
export type UpdateTipMutationOptions = Apollo.BaseMutationOptions<
  UpdateTipMutation,
  UpdateTipMutationVariables
>;
export const CreateNewFolderDocument = gql`
  mutation createNewFolder(
    $name: String!
    $parentFolderPath: String!
    $parentFolderPathId: ID!
  ) {
    createNewFolder(
      name: $name
      parentFolderPath: $parentFolderPath
      parentFolderPathId: $parentFolderPathId
    ) {
      id
      name
      path
      pathId
    }
  }
`;
export type CreateNewFolderMutationFn = Apollo.MutationFunction<
  CreateNewFolderMutation,
  CreateNewFolderMutationVariables
>;

/**
 * __useCreateNewFolderMutation__
 *
 * To run a mutation, you first call `useCreateNewFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewFolderMutation, { data, loading, error }] = useCreateNewFolderMutation({
 *   variables: {
 *      name: // value for 'name'
 *      parentFolderPath: // value for 'parentFolderPath'
 *      parentFolderPathId: // value for 'parentFolderPathId'
 *   },
 * });
 */
export function useCreateNewFolderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewFolderMutation,
    CreateNewFolderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNewFolderMutation,
    CreateNewFolderMutationVariables
  >(CreateNewFolderDocument, options);
}
export type CreateNewFolderMutationHookResult = ReturnType<
  typeof useCreateNewFolderMutation
>;
export type CreateNewFolderMutationResult =
  Apollo.MutationResult<CreateNewFolderMutation>;
export type CreateNewFolderMutationOptions = Apollo.BaseMutationOptions<
  CreateNewFolderMutation,
  CreateNewFolderMutationVariables
>;
export const GetAllFoldersHierarchyDocument = gql`
  query getAllFoldersHierarchy($path: String!) {
    getAllFoldersHierarchy(path: $path) {
      id
      name
      path
      pathId
    }
  }
`;

/**
 * __useGetAllFoldersHierarchyQuery__
 *
 * To run a query within a React component, call `useGetAllFoldersHierarchyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllFoldersHierarchyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllFoldersHierarchyQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetAllFoldersHierarchyQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllFoldersHierarchyQuery,
    GetAllFoldersHierarchyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllFoldersHierarchyQuery,
    GetAllFoldersHierarchyQueryVariables
  >(GetAllFoldersHierarchyDocument, options);
}
export function useGetAllFoldersHierarchyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllFoldersHierarchyQuery,
    GetAllFoldersHierarchyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllFoldersHierarchyQuery,
    GetAllFoldersHierarchyQueryVariables
  >(GetAllFoldersHierarchyDocument, options);
}
export type GetAllFoldersHierarchyQueryHookResult = ReturnType<
  typeof useGetAllFoldersHierarchyQuery
>;
export type GetAllFoldersHierarchyLazyQueryHookResult = ReturnType<
  typeof useGetAllFoldersHierarchyLazyQuery
>;
export type GetAllFoldersHierarchyQueryResult = Apollo.QueryResult<
  GetAllFoldersHierarchyQuery,
  GetAllFoldersHierarchyQueryVariables
>;
export const GetFilesPaginationByPathIdDocument = gql`
  query getFilesPaginationByPathId(
    $filters: UploadFileFiltersInput
    $pagination: PaginationArg
    $sort: [String]
  ) {
    uploadFiles(filters: $filters, pagination: $pagination, sort: $sort) {
      data {
        id
        attributes {
          name
          mime
          size
          width
          height
          createdAt
          url
          ext
          alternativeText
          createdAt
        }
      }
      meta {
        pagination {
          total
          pageSize
          pageCount
          page
        }
      }
    }
  }
`;

/**
 * __useGetFilesPaginationByPathIdQuery__
 *
 * To run a query within a React component, call `useGetFilesPaginationByPathIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilesPaginationByPathIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilesPaginationByPathIdQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetFilesPaginationByPathIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFilesPaginationByPathIdQuery,
    GetFilesPaginationByPathIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFilesPaginationByPathIdQuery,
    GetFilesPaginationByPathIdQueryVariables
  >(GetFilesPaginationByPathIdDocument, options);
}
export function useGetFilesPaginationByPathIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFilesPaginationByPathIdQuery,
    GetFilesPaginationByPathIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFilesPaginationByPathIdQuery,
    GetFilesPaginationByPathIdQueryVariables
  >(GetFilesPaginationByPathIdDocument, options);
}
export type GetFilesPaginationByPathIdQueryHookResult = ReturnType<
  typeof useGetFilesPaginationByPathIdQuery
>;
export type GetFilesPaginationByPathIdLazyQueryHookResult = ReturnType<
  typeof useGetFilesPaginationByPathIdLazyQuery
>;
export type GetFilesPaginationByPathIdQueryResult = Apollo.QueryResult<
  GetFilesPaginationByPathIdQuery,
  GetFilesPaginationByPathIdQueryVariables
>;
export const GetFolderAndChildrenByIdDocument = gql`
  query getFolderAndChildrenById($filters: UploadFolderFiltersInput) {
    uploadFolders(filters: $filters) {
      data {
        id
        attributes {
          name
          pathId
          path
          files {
            data {
              id
            }
          }
          children {
            data {
              id
              attributes {
                name
                pathId
                path
                files {
                  data {
                    id
                  }
                }
                children {
                  data {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetFolderAndChildrenByIdQuery__
 *
 * To run a query within a React component, call `useGetFolderAndChildrenByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFolderAndChildrenByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFolderAndChildrenByIdQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetFolderAndChildrenByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFolderAndChildrenByIdQuery,
    GetFolderAndChildrenByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFolderAndChildrenByIdQuery,
    GetFolderAndChildrenByIdQueryVariables
  >(GetFolderAndChildrenByIdDocument, options);
}
export function useGetFolderAndChildrenByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFolderAndChildrenByIdQuery,
    GetFolderAndChildrenByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFolderAndChildrenByIdQuery,
    GetFolderAndChildrenByIdQueryVariables
  >(GetFolderAndChildrenByIdDocument, options);
}
export type GetFolderAndChildrenByIdQueryHookResult = ReturnType<
  typeof useGetFolderAndChildrenByIdQuery
>;
export type GetFolderAndChildrenByIdLazyQueryHookResult = ReturnType<
  typeof useGetFolderAndChildrenByIdLazyQuery
>;
export type GetFolderAndChildrenByIdQueryResult = Apollo.QueryResult<
  GetFolderAndChildrenByIdQuery,
  GetFolderAndChildrenByIdQueryVariables
>;
export const GetFolderBreadcrumbDocument = gql`
  query getFolderBreadcrumb($path: String!) {
    libraryBreadcrumbTrail(path: $path) {
      id
      name
      path
      pathId
    }
  }
`;

/**
 * __useGetFolderBreadcrumbQuery__
 *
 * To run a query within a React component, call `useGetFolderBreadcrumbQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFolderBreadcrumbQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFolderBreadcrumbQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useGetFolderBreadcrumbQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFolderBreadcrumbQuery,
    GetFolderBreadcrumbQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFolderBreadcrumbQuery,
    GetFolderBreadcrumbQueryVariables
  >(GetFolderBreadcrumbDocument, options);
}
export function useGetFolderBreadcrumbLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFolderBreadcrumbQuery,
    GetFolderBreadcrumbQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFolderBreadcrumbQuery,
    GetFolderBreadcrumbQueryVariables
  >(GetFolderBreadcrumbDocument, options);
}
export type GetFolderBreadcrumbQueryHookResult = ReturnType<
  typeof useGetFolderBreadcrumbQuery
>;
export type GetFolderBreadcrumbLazyQueryHookResult = ReturnType<
  typeof useGetFolderBreadcrumbLazyQuery
>;
export type GetFolderBreadcrumbQueryResult = Apollo.QueryResult<
  GetFolderBreadcrumbQuery,
  GetFolderBreadcrumbQueryVariables
>;
export const GetFolderByPathIdDocument = gql`
  query getFolderByPathId($pathId: Int!) {
    uploadFolders(filters: { pathId: { eq: $pathId } }) {
      data {
        id
        attributes {
          name
          pathId
          path
        }
      }
    }
  }
`;

/**
 * __useGetFolderByPathIdQuery__
 *
 * To run a query within a React component, call `useGetFolderByPathIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFolderByPathIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFolderByPathIdQuery({
 *   variables: {
 *      pathId: // value for 'pathId'
 *   },
 * });
 */
export function useGetFolderByPathIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFolderByPathIdQuery,
    GetFolderByPathIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFolderByPathIdQuery,
    GetFolderByPathIdQueryVariables
  >(GetFolderByPathIdDocument, options);
}
export function useGetFolderByPathIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFolderByPathIdQuery,
    GetFolderByPathIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFolderByPathIdQuery,
    GetFolderByPathIdQueryVariables
  >(GetFolderByPathIdDocument, options);
}
export type GetFolderByPathIdQueryHookResult = ReturnType<
  typeof useGetFolderByPathIdQuery
>;
export type GetFolderByPathIdLazyQueryHookResult = ReturnType<
  typeof useGetFolderByPathIdLazyQuery
>;
export type GetFolderByPathIdQueryResult = Apollo.QueryResult<
  GetFolderByPathIdQuery,
  GetFolderByPathIdQueryVariables
>;
export const UpdateUploadFileDocument = gql`
  mutation updateUploadFile($updateUploadFileId: ID!, $data: UploadFileInput!) {
    updateUploadFile(id: $updateUploadFileId, data: $data) {
      data {
        id
        attributes {
          createdAt
          hash
          mime
          name
          provider
          size
          url
          alternativeText
          ext
          height
          width
          createdAt
          related {
            ... on UploadFolder {
              name
              path
              pathId
            }
          }
        }
      }
    }
  }
`;
export type UpdateUploadFileMutationFn = Apollo.MutationFunction<
  UpdateUploadFileMutation,
  UpdateUploadFileMutationVariables
>;

/**
 * __useUpdateUploadFileMutation__
 *
 * To run a mutation, you first call `useUpdateUploadFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUploadFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUploadFileMutation, { data, loading, error }] = useUpdateUploadFileMutation({
 *   variables: {
 *      updateUploadFileId: // value for 'updateUploadFileId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUploadFileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUploadFileMutation,
    UpdateUploadFileMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUploadFileMutation,
    UpdateUploadFileMutationVariables
  >(UpdateUploadFileDocument, options);
}
export type UpdateUploadFileMutationHookResult = ReturnType<
  typeof useUpdateUploadFileMutation
>;
export type UpdateUploadFileMutationResult =
  Apollo.MutationResult<UpdateUploadFileMutation>;
export type UpdateUploadFileMutationOptions = Apollo.BaseMutationOptions<
  UpdateUploadFileMutation,
  UpdateUploadFileMutationVariables
>;
export const UpdateUploadFolderDocument = gql`
  mutation updateUploadFolder(
    $updateUploadFolderId: ID!
    $data: UploadFolderInput!
  ) {
    updateUploadFolder(id: $updateUploadFolderId, data: $data) {
      data {
        id
        attributes {
          pathId
          updatedAt
          name
          path
          children {
            data {
              id
              attributes {
                name
                path
                pathId
                children {
                  data {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateUploadFolderMutationFn = Apollo.MutationFunction<
  UpdateUploadFolderMutation,
  UpdateUploadFolderMutationVariables
>;

/**
 * __useUpdateUploadFolderMutation__
 *
 * To run a mutation, you first call `useUpdateUploadFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUploadFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUploadFolderMutation, { data, loading, error }] = useUpdateUploadFolderMutation({
 *   variables: {
 *      updateUploadFolderId: // value for 'updateUploadFolderId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUploadFolderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUploadFolderMutation,
    UpdateUploadFolderMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateUploadFolderMutation,
    UpdateUploadFolderMutationVariables
  >(UpdateUploadFolderDocument, options);
}
export type UpdateUploadFolderMutationHookResult = ReturnType<
  typeof useUpdateUploadFolderMutation
>;
export type UpdateUploadFolderMutationResult =
  Apollo.MutationResult<UpdateUploadFolderMutation>;
export type UpdateUploadFolderMutationOptions = Apollo.BaseMutationOptions<
  UpdateUploadFolderMutation,
  UpdateUploadFolderMutationVariables
>;
export const UploadGraphQlDocument = gql`
  mutation uploadGraphQL(
    $refId: ID
    $ref: String
    $field: String
    $info: FileInfoInput
    $file: Upload!
  ) {
    uploadGraphQL(
      refId: $refId
      ref: $ref
      field: $field
      info: $info
      file: $file
    )
  }
`;
export type UploadGraphQlMutationFn = Apollo.MutationFunction<
  UploadGraphQlMutation,
  UploadGraphQlMutationVariables
>;

/**
 * __useUploadGraphQlMutation__
 *
 * To run a mutation, you first call `useUploadGraphQlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadGraphQlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadGraphQlMutation, { data, loading, error }] = useUploadGraphQlMutation({
 *   variables: {
 *      refId: // value for 'refId'
 *      ref: // value for 'ref'
 *      field: // value for 'field'
 *      info: // value for 'info'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadGraphQlMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UploadGraphQlMutation,
    UploadGraphQlMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UploadGraphQlMutation,
    UploadGraphQlMutationVariables
  >(UploadGraphQlDocument, options);
}
export type UploadGraphQlMutationHookResult = ReturnType<
  typeof useUploadGraphQlMutation
>;
export type UploadGraphQlMutationResult =
  Apollo.MutationResult<UploadGraphQlMutation>;
export type UploadGraphQlMutationOptions = Apollo.BaseMutationOptions<
  UploadGraphQlMutation,
  UploadGraphQlMutationVariables
>;
export const GetContactUsByIdDocument = gql`
  query getContactUsById($contactUsId: ID) {
    contactUs(id: $contactUsId) {
      data {
        id
        attributes {
          customId
          title
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetContactUsByIdQuery__
 *
 * To run a query within a React component, call `useGetContactUsByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactUsByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactUsByIdQuery({
 *   variables: {
 *      contactUsId: // value for 'contactUsId'
 *   },
 * });
 */
export function useGetContactUsByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetContactUsByIdQuery,
    GetContactUsByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetContactUsByIdQuery, GetContactUsByIdQueryVariables>(
    GetContactUsByIdDocument,
    options,
  );
}
export function useGetContactUsByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetContactUsByIdQuery,
    GetContactUsByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetContactUsByIdQuery,
    GetContactUsByIdQueryVariables
  >(GetContactUsByIdDocument, options);
}
export type GetContactUsByIdQueryHookResult = ReturnType<
  typeof useGetContactUsByIdQuery
>;
export type GetContactUsByIdLazyQueryHookResult = ReturnType<
  typeof useGetContactUsByIdLazyQuery
>;
export type GetContactUsByIdQueryResult = Apollo.QueryResult<
  GetContactUsByIdQuery,
  GetContactUsByIdQueryVariables
>;
export const GetContactUsesByContractIdDocument = gql`
  query getContactUsesByContractId($contractId: ID!) {
    contactUsSubServices(
      filters: { editorialService: { contract: { id: { eq: $contractId } } } }
    ) {
      data {
        id
        attributes {
          contactUses {
            data {
              id
            }
          }
          name
          isActivated
        }
      }
    }
  }
`;

/**
 * __useGetContactUsesByContractIdQuery__
 *
 * To run a query within a React component, call `useGetContactUsesByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactUsesByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactUsesByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetContactUsesByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetContactUsesByContractIdQuery,
    GetContactUsesByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetContactUsesByContractIdQuery,
    GetContactUsesByContractIdQueryVariables
  >(GetContactUsesByContractIdDocument, options);
}
export function useGetContactUsesByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetContactUsesByContractIdQuery,
    GetContactUsesByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetContactUsesByContractIdQuery,
    GetContactUsesByContractIdQueryVariables
  >(GetContactUsesByContractIdDocument, options);
}
export type GetContactUsesByContractIdQueryHookResult = ReturnType<
  typeof useGetContactUsesByContractIdQuery
>;
export type GetContactUsesByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetContactUsesByContractIdLazyQuery
>;
export type GetContactUsesByContractIdQueryResult = Apollo.QueryResult<
  GetContactUsesByContractIdQuery,
  GetContactUsesByContractIdQueryVariables
>;
export const UpdateContactUsDocument = gql`
  mutation UpdateContactUs($updateContactUsId: ID!, $data: ContactUsInput!) {
    updateContactUs(id: $updateContactUsId, data: $data) {
      data {
        id
        attributes {
          title
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateContactUsMutationFn = Apollo.MutationFunction<
  UpdateContactUsMutation,
  UpdateContactUsMutationVariables
>;

/**
 * __useUpdateContactUsMutation__
 *
 * To run a mutation, you first call `useUpdateContactUsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactUsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactUsMutation, { data, loading, error }] = useUpdateContactUsMutation({
 *   variables: {
 *      updateContactUsId: // value for 'updateContactUsId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContactUsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContactUsMutation,
    UpdateContactUsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContactUsMutation,
    UpdateContactUsMutationVariables
  >(UpdateContactUsDocument, options);
}
export type UpdateContactUsMutationHookResult = ReturnType<
  typeof useUpdateContactUsMutation
>;
export type UpdateContactUsMutationResult =
  Apollo.MutationResult<UpdateContactUsMutation>;
export type UpdateContactUsMutationOptions = Apollo.BaseMutationOptions<
  UpdateContactUsMutation,
  UpdateContactUsMutationVariables
>;
export const CreateFreeContentDocument = gql`
  mutation createFreeContent($data: FreeContentInput!) {
    createFreeContent(data: $data) {
      data {
        id
        attributes {
          title
          shortDescription
          freeContentSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type CreateFreeContentMutationFn = Apollo.MutationFunction<
  CreateFreeContentMutation,
  CreateFreeContentMutationVariables
>;

/**
 * __useCreateFreeContentMutation__
 *
 * To run a mutation, you first call `useCreateFreeContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFreeContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFreeContentMutation, { data, loading, error }] = useCreateFreeContentMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateFreeContentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFreeContentMutation,
    CreateFreeContentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateFreeContentMutation,
    CreateFreeContentMutationVariables
  >(CreateFreeContentDocument, options);
}
export type CreateFreeContentMutationHookResult = ReturnType<
  typeof useCreateFreeContentMutation
>;
export type CreateFreeContentMutationResult =
  Apollo.MutationResult<CreateFreeContentMutation>;
export type CreateFreeContentMutationOptions = Apollo.BaseMutationOptions<
  CreateFreeContentMutation,
  CreateFreeContentMutationVariables
>;
export const DeleteFreeContentDocument = gql`
  mutation deleteFreeContent($deleteFreeContentId: ID!) {
    deleteFreeContent(id: $deleteFreeContentId) {
      data {
        id
        attributes {
          title
          shortDescription
          freeContentSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type DeleteFreeContentMutationFn = Apollo.MutationFunction<
  DeleteFreeContentMutation,
  DeleteFreeContentMutationVariables
>;

/**
 * __useDeleteFreeContentMutation__
 *
 * To run a mutation, you first call `useDeleteFreeContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFreeContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFreeContentMutation, { data, loading, error }] = useDeleteFreeContentMutation({
 *   variables: {
 *      deleteFreeContentId: // value for 'deleteFreeContentId'
 *   },
 * });
 */
export function useDeleteFreeContentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFreeContentMutation,
    DeleteFreeContentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteFreeContentMutation,
    DeleteFreeContentMutationVariables
  >(DeleteFreeContentDocument, options);
}
export type DeleteFreeContentMutationHookResult = ReturnType<
  typeof useDeleteFreeContentMutation
>;
export type DeleteFreeContentMutationResult =
  Apollo.MutationResult<DeleteFreeContentMutation>;
export type DeleteFreeContentMutationOptions = Apollo.BaseMutationOptions<
  DeleteFreeContentMutation,
  DeleteFreeContentMutationVariables
>;
export const GetAllVersionsOfFreeContentByCustomIdDocument = gql`
  query getAllVersionsOfFreeContentByCustomId(
    $contractId: ID!
    $customId: String
    $freeContentSubServiceId: ID!
    $statusFilter: StringFilterInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    freeContentsCount: freeContents(
      filters: {
        freeContentSubService: {
          id: { eq: $freeContentSubServiceId }
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    freeContentsCountDraft: freeContents(
      filters: {
        freeContentSubService: {
          id: { eq: $freeContentSubServiceId }
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: { eq: "draft" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    freeContentsCountPublished: freeContents(
      filters: {
        freeContentSubService: {
          id: { eq: $freeContentSubServiceId }
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: { eq: "published" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    freeContentsCountArchived: freeContents(
      filters: {
        freeContentSubService: {
          id: { eq: $freeContentSubServiceId }
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: { eq: "archived" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    freeContents(
      filters: {
        freeContentSubService: {
          id: { eq: $freeContentSubServiceId }
          editorialService: { contract: { id: { eq: $contractId } } }
        }
        customId: { eq: $customId }
        status: $statusFilter
      }
      sort: $sort
      pagination: $pagination
    ) {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
      data {
        id
        attributes {
          freeContentSubService {
            data {
              attributes {
                name
              }
            }
          }
          versionNumber
          status
          publishedDate
          updatedAt
        }
      }
    }
  }
`;

/**
 * __useGetAllVersionsOfFreeContentByCustomIdQuery__
 *
 * To run a query within a React component, call `useGetAllVersionsOfFreeContentByCustomIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllVersionsOfFreeContentByCustomIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllVersionsOfFreeContentByCustomIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      customId: // value for 'customId'
 *      freeContentSubServiceId: // value for 'freeContentSubServiceId'
 *      statusFilter: // value for 'statusFilter'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetAllVersionsOfFreeContentByCustomIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllVersionsOfFreeContentByCustomIdQuery,
    GetAllVersionsOfFreeContentByCustomIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllVersionsOfFreeContentByCustomIdQuery,
    GetAllVersionsOfFreeContentByCustomIdQueryVariables
  >(GetAllVersionsOfFreeContentByCustomIdDocument, options);
}
export function useGetAllVersionsOfFreeContentByCustomIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllVersionsOfFreeContentByCustomIdQuery,
    GetAllVersionsOfFreeContentByCustomIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllVersionsOfFreeContentByCustomIdQuery,
    GetAllVersionsOfFreeContentByCustomIdQueryVariables
  >(GetAllVersionsOfFreeContentByCustomIdDocument, options);
}
export type GetAllVersionsOfFreeContentByCustomIdQueryHookResult = ReturnType<
  typeof useGetAllVersionsOfFreeContentByCustomIdQuery
>;
export type GetAllVersionsOfFreeContentByCustomIdLazyQueryHookResult =
  ReturnType<typeof useGetAllVersionsOfFreeContentByCustomIdLazyQuery>;
export type GetAllVersionsOfFreeContentByCustomIdQueryResult =
  Apollo.QueryResult<
    GetAllVersionsOfFreeContentByCustomIdQuery,
    GetAllVersionsOfFreeContentByCustomIdQueryVariables
  >;
export const GetFreeContentByIdDocument = gql`
  query getFreeContentById($freeContentId: ID) {
    freeContent(id: $freeContentId) {
      data {
        id
        attributes {
          customId
          draftCreationId
          title
          shortDescription
          freeContentSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetFreeContentByIdQuery__
 *
 * To run a query within a React component, call `useGetFreeContentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFreeContentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFreeContentByIdQuery({
 *   variables: {
 *      freeContentId: // value for 'freeContentId'
 *   },
 * });
 */
export function useGetFreeContentByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFreeContentByIdQuery,
    GetFreeContentByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFreeContentByIdQuery,
    GetFreeContentByIdQueryVariables
  >(GetFreeContentByIdDocument, options);
}
export function useGetFreeContentByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFreeContentByIdQuery,
    GetFreeContentByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFreeContentByIdQuery,
    GetFreeContentByIdQueryVariables
  >(GetFreeContentByIdDocument, options);
}
export type GetFreeContentByIdQueryHookResult = ReturnType<
  typeof useGetFreeContentByIdQuery
>;
export type GetFreeContentByIdLazyQueryHookResult = ReturnType<
  typeof useGetFreeContentByIdLazyQuery
>;
export type GetFreeContentByIdQueryResult = Apollo.QueryResult<
  GetFreeContentByIdQuery,
  GetFreeContentByIdQueryVariables
>;
export const GetFreeContentDraftDocument = gql`
  query getFreeContentDraft($customId: String!) {
    freeContents(
      filters: { customId: { eq: $customId }, status: { eq: "draft" } }
    ) {
      data {
        id
      }
    }
  }
`;

/**
 * __useGetFreeContentDraftQuery__
 *
 * To run a query within a React component, call `useGetFreeContentDraftQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFreeContentDraftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFreeContentDraftQuery({
 *   variables: {
 *      customId: // value for 'customId'
 *   },
 * });
 */
export function useGetFreeContentDraftQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFreeContentDraftQuery,
    GetFreeContentDraftQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFreeContentDraftQuery,
    GetFreeContentDraftQueryVariables
  >(GetFreeContentDraftDocument, options);
}
export function useGetFreeContentDraftLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFreeContentDraftQuery,
    GetFreeContentDraftQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFreeContentDraftQuery,
    GetFreeContentDraftQueryVariables
  >(GetFreeContentDraftDocument, options);
}
export type GetFreeContentDraftQueryHookResult = ReturnType<
  typeof useGetFreeContentDraftQuery
>;
export type GetFreeContentDraftLazyQueryHookResult = ReturnType<
  typeof useGetFreeContentDraftLazyQuery
>;
export type GetFreeContentDraftQueryResult = Apollo.QueryResult<
  GetFreeContentDraftQuery,
  GetFreeContentDraftQueryVariables
>;
export const GetFreeContentSubServiceByIdDocument = gql`
  query getFreeContentSubServiceById($freeContentSubServiceId: ID) {
    freeContentSubService(id: $freeContentSubServiceId) {
      data {
        id
        attributes {
          name
          isActivated
        }
      }
    }
  }
`;

/**
 * __useGetFreeContentSubServiceByIdQuery__
 *
 * To run a query within a React component, call `useGetFreeContentSubServiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFreeContentSubServiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFreeContentSubServiceByIdQuery({
 *   variables: {
 *      freeContentSubServiceId: // value for 'freeContentSubServiceId'
 *   },
 * });
 */
export function useGetFreeContentSubServiceByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFreeContentSubServiceByIdQuery,
    GetFreeContentSubServiceByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFreeContentSubServiceByIdQuery,
    GetFreeContentSubServiceByIdQueryVariables
  >(GetFreeContentSubServiceByIdDocument, options);
}
export function useGetFreeContentSubServiceByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFreeContentSubServiceByIdQuery,
    GetFreeContentSubServiceByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFreeContentSubServiceByIdQuery,
    GetFreeContentSubServiceByIdQueryVariables
  >(GetFreeContentSubServiceByIdDocument, options);
}
export type GetFreeContentSubServiceByIdQueryHookResult = ReturnType<
  typeof useGetFreeContentSubServiceByIdQuery
>;
export type GetFreeContentSubServiceByIdLazyQueryHookResult = ReturnType<
  typeof useGetFreeContentSubServiceByIdLazyQuery
>;
export type GetFreeContentSubServiceByIdQueryResult = Apollo.QueryResult<
  GetFreeContentSubServiceByIdQuery,
  GetFreeContentSubServiceByIdQueryVariables
>;
export const GetFreeContentsBySubServiceIdDocument = gql`
  query getFreeContentsBySubServiceId(
    $freeContentSubServiceId: ID!
    $statusFilter: StringFilterInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    freeContentsCount: freeContents(
      filters: {
        freeContentSubService: { id: { eq: $freeContentSubServiceId } }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    freeContentsCountDraft: freeContents(
      filters: {
        freeContentSubService: { id: { eq: $freeContentSubServiceId } }
        status: { eq: "draft" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    freeContentsCountPublished: freeContents(
      filters: {
        freeContentSubService: { id: { eq: $freeContentSubServiceId } }
        status: { eq: "published" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    freeContentsCountArchived: freeContents(
      filters: {
        freeContentSubService: { id: { eq: $freeContentSubServiceId } }
        status: { eq: "archived" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    freeContents(
      filters: {
        freeContentSubService: { id: { eq: $freeContentSubServiceId } }
        status: $statusFilter
      }
      sort: $sort
      pagination: $pagination
    ) {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
      data {
        id
        attributes {
          title
          shortDescription
          status
          publishedDate
          unpublishedDate
        }
      }
    }
  }
`;

/**
 * __useGetFreeContentsBySubServiceIdQuery__
 *
 * To run a query within a React component, call `useGetFreeContentsBySubServiceIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFreeContentsBySubServiceIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFreeContentsBySubServiceIdQuery({
 *   variables: {
 *      freeContentSubServiceId: // value for 'freeContentSubServiceId'
 *      statusFilter: // value for 'statusFilter'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetFreeContentsBySubServiceIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFreeContentsBySubServiceIdQuery,
    GetFreeContentsBySubServiceIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFreeContentsBySubServiceIdQuery,
    GetFreeContentsBySubServiceIdQueryVariables
  >(GetFreeContentsBySubServiceIdDocument, options);
}
export function useGetFreeContentsBySubServiceIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFreeContentsBySubServiceIdQuery,
    GetFreeContentsBySubServiceIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFreeContentsBySubServiceIdQuery,
    GetFreeContentsBySubServiceIdQueryVariables
  >(GetFreeContentsBySubServiceIdDocument, options);
}
export type GetFreeContentsBySubServiceIdQueryHookResult = ReturnType<
  typeof useGetFreeContentsBySubServiceIdQuery
>;
export type GetFreeContentsBySubServiceIdLazyQueryHookResult = ReturnType<
  typeof useGetFreeContentsBySubServiceIdLazyQuery
>;
export type GetFreeContentsBySubServiceIdQueryResult = Apollo.QueryResult<
  GetFreeContentsBySubServiceIdQuery,
  GetFreeContentsBySubServiceIdQueryVariables
>;
export const UpdateFreeContentDocument = gql`
  mutation updateFreeContent(
    $updateFreeContentId: ID!
    $data: FreeContentInput!
  ) {
    updateFreeContent(id: $updateFreeContentId, data: $data) {
      data {
        id
        attributes {
          customId
          title
          shortDescription
          freeContentSubService {
            data {
              id
            }
          }
          status
          publishedDate
          unpublishedDate
          createdAt
          updatedAt
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          image {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
          blocks {
            ... on ComponentBlocksSubHeading {
              id
              subHeadingText
              subHeadingTag
            }
            ... on ComponentBlocksVideo {
              id
              videoLink
              transcriptText
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksHorizontalRule {
              id
              hr
            }
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
              isDecorative
              altText
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    ext
                    height
                    width
                    createdAt
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateFreeContentMutationFn = Apollo.MutationFunction<
  UpdateFreeContentMutation,
  UpdateFreeContentMutationVariables
>;

/**
 * __useUpdateFreeContentMutation__
 *
 * To run a mutation, you first call `useUpdateFreeContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFreeContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFreeContentMutation, { data, loading, error }] = useUpdateFreeContentMutation({
 *   variables: {
 *      updateFreeContentId: // value for 'updateFreeContentId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFreeContentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFreeContentMutation,
    UpdateFreeContentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateFreeContentMutation,
    UpdateFreeContentMutationVariables
  >(UpdateFreeContentDocument, options);
}
export type UpdateFreeContentMutationHookResult = ReturnType<
  typeof useUpdateFreeContentMutation
>;
export type UpdateFreeContentMutationResult =
  Apollo.MutationResult<UpdateFreeContentMutation>;
export type UpdateFreeContentMutationOptions = Apollo.BaseMutationOptions<
  UpdateFreeContentMutation,
  UpdateFreeContentMutationVariables
>;
export const GetTagsByContractIdDocument = gql`
  query getTagsByContractId($contractId: ID) {
    tags(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

/**
 * __useGetTagsByContractIdQuery__
 *
 * To run a query within a React component, call `useGetTagsByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetTagsByContractIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetTagsByContractIdQuery,
    GetTagsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTagsByContractIdQuery,
    GetTagsByContractIdQueryVariables
  >(GetTagsByContractIdDocument, options);
}
export function useGetTagsByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTagsByContractIdQuery,
    GetTagsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTagsByContractIdQuery,
    GetTagsByContractIdQueryVariables
  >(GetTagsByContractIdDocument, options);
}
export type GetTagsByContractIdQueryHookResult = ReturnType<
  typeof useGetTagsByContractIdQuery
>;
export type GetTagsByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetTagsByContractIdLazyQuery
>;
export type GetTagsByContractIdQueryResult = Apollo.QueryResult<
  GetTagsByContractIdQuery,
  GetTagsByContractIdQueryVariables
>;
export const CountContentPerTagDocument = gql`
  query countContentPerTag($contractId: ID!) {
    countContentPerTag(contractId: $contractId) {
      id
      name
      count
    }
  }
`;

/**
 * __useCountContentPerTagQuery__
 *
 * To run a query within a React component, call `useCountContentPerTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountContentPerTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountContentPerTagQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useCountContentPerTagQuery(
  baseOptions: Apollo.QueryHookOptions<
    CountContentPerTagQuery,
    CountContentPerTagQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CountContentPerTagQuery,
    CountContentPerTagQueryVariables
  >(CountContentPerTagDocument, options);
}
export function useCountContentPerTagLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CountContentPerTagQuery,
    CountContentPerTagQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CountContentPerTagQuery,
    CountContentPerTagQueryVariables
  >(CountContentPerTagDocument, options);
}
export type CountContentPerTagQueryHookResult = ReturnType<
  typeof useCountContentPerTagQuery
>;
export type CountContentPerTagLazyQueryHookResult = ReturnType<
  typeof useCountContentPerTagLazyQuery
>;
export type CountContentPerTagQueryResult = Apollo.QueryResult<
  CountContentPerTagQuery,
  CountContentPerTagQueryVariables
>;
export const CreateNewTagDocument = gql`
  mutation createNewTag($contractId: ID!, $tagName: String!) {
    createNewTag(contractId: $contractId, tagName: $tagName) {
      contractId
      id
      name
    }
  }
`;
export type CreateNewTagMutationFn = Apollo.MutationFunction<
  CreateNewTagMutation,
  CreateNewTagMutationVariables
>;

/**
 * __useCreateNewTagMutation__
 *
 * To run a mutation, you first call `useCreateNewTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewTagMutation, { data, loading, error }] = useCreateNewTagMutation({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      tagName: // value for 'tagName'
 *   },
 * });
 */
export function useCreateNewTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateNewTagMutation,
    CreateNewTagMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateNewTagMutation,
    CreateNewTagMutationVariables
  >(CreateNewTagDocument, options);
}
export type CreateNewTagMutationHookResult = ReturnType<
  typeof useCreateNewTagMutation
>;
export type CreateNewTagMutationResult =
  Apollo.MutationResult<CreateNewTagMutation>;
export type CreateNewTagMutationOptions = Apollo.BaseMutationOptions<
  CreateNewTagMutation,
  CreateNewTagMutationVariables
>;
export const DeleteTagDocument = gql`
  mutation deleteTag($deleteTagId: ID!) {
    deleteTag(id: $deleteTagId) {
      data {
        id
        attributes {
          name
          createdAt
        }
      }
    }
  }
`;
export type DeleteTagMutationFn = Apollo.MutationFunction<
  DeleteTagMutation,
  DeleteTagMutationVariables
>;

/**
 * __useDeleteTagMutation__
 *
 * To run a mutation, you first call `useDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagMutation, { data, loading, error }] = useDeleteTagMutation({
 *   variables: {
 *      deleteTagId: // value for 'deleteTagId'
 *   },
 * });
 */
export function useDeleteTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteTagMutation,
    DeleteTagMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteTagMutation, DeleteTagMutationVariables>(
    DeleteTagDocument,
    options,
  );
}
export type DeleteTagMutationHookResult = ReturnType<
  typeof useDeleteTagMutation
>;
export type DeleteTagMutationResult = Apollo.MutationResult<DeleteTagMutation>;
export type DeleteTagMutationOptions = Apollo.BaseMutationOptions<
  DeleteTagMutation,
  DeleteTagMutationVariables
>;
export const UpdateTagDocument = gql`
  mutation updateTag($updateTagId: ID!, $data: TagInput!) {
    updateTag(id: $updateTagId, data: $data) {
      data {
        id
        attributes {
          name
          createdAt
        }
      }
    }
  }
`;
export type UpdateTagMutationFn = Apollo.MutationFunction<
  UpdateTagMutation,
  UpdateTagMutationVariables
>;

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      updateTagId: // value for 'updateTagId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTagMutation,
    UpdateTagMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(
    UpdateTagDocument,
    options,
  );
}
export type UpdateTagMutationHookResult = ReturnType<
  typeof useUpdateTagMutation
>;
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<
  UpdateTagMutation,
  UpdateTagMutationVariables
>;
export const CreateContentTypeDocument = gql`
  mutation createContentType(
    $contractId: ID
    $name: String
    $description: String
  ) {
    createContentTypeForContractId(
      contractId: $contractId
      name: $name
      description: $description
    ) {
      id
    }
  }
`;
export type CreateContentTypeMutationFn = Apollo.MutationFunction<
  CreateContentTypeMutation,
  CreateContentTypeMutationVariables
>;

/**
 * __useCreateContentTypeMutation__
 *
 * To run a mutation, you first call `useCreateContentTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentTypeMutation, { data, loading, error }] = useCreateContentTypeMutation({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateContentTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateContentTypeMutation,
    CreateContentTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateContentTypeMutation,
    CreateContentTypeMutationVariables
  >(CreateContentTypeDocument, options);
}
export type CreateContentTypeMutationHookResult = ReturnType<
  typeof useCreateContentTypeMutation
>;
export type CreateContentTypeMutationResult =
  Apollo.MutationResult<CreateContentTypeMutation>;
export type CreateContentTypeMutationOptions = Apollo.BaseMutationOptions<
  CreateContentTypeMutation,
  CreateContentTypeMutationVariables
>;
export const GetContentTypeDtOsDocument = gql`
  query getContentTypeDTOs($contractId: ID!) {
    getContentTypeDTOs(contractId: $contractId) {
      subServiceId
      type
      name
      description
    }
  }
`;

/**
 * __useGetContentTypeDtOsQuery__
 *
 * To run a query within a React component, call `useGetContentTypeDtOsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContentTypeDtOsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContentTypeDtOsQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetContentTypeDtOsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetContentTypeDtOsQuery,
    GetContentTypeDtOsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetContentTypeDtOsQuery,
    GetContentTypeDtOsQueryVariables
  >(GetContentTypeDtOsDocument, options);
}
export function useGetContentTypeDtOsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetContentTypeDtOsQuery,
    GetContentTypeDtOsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetContentTypeDtOsQuery,
    GetContentTypeDtOsQueryVariables
  >(GetContentTypeDtOsDocument, options);
}
export type GetContentTypeDtOsQueryHookResult = ReturnType<
  typeof useGetContentTypeDtOsQuery
>;
export type GetContentTypeDtOsLazyQueryHookResult = ReturnType<
  typeof useGetContentTypeDtOsLazyQuery
>;
export type GetContentTypeDtOsQueryResult = Apollo.QueryResult<
  GetContentTypeDtOsQuery,
  GetContentTypeDtOsQueryVariables
>;
export const UpdateContentTypeCookiesDocument = gql`
  mutation updateContentTypeCookies(
    $updateSubServiceId: ID!
    $data: CookiesSubServiceInput!
  ) {
    updateCookiesSubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeCookiesMutationFn = Apollo.MutationFunction<
  UpdateContentTypeCookiesMutation,
  UpdateContentTypeCookiesMutationVariables
>;

/**
 * __useUpdateContentTypeCookiesMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeCookiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeCookiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeCookiesMutation, { data, loading, error }] = useUpdateContentTypeCookiesMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeCookiesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeCookiesMutation,
    UpdateContentTypeCookiesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeCookiesMutation,
    UpdateContentTypeCookiesMutationVariables
  >(UpdateContentTypeCookiesDocument, options);
}
export type UpdateContentTypeCookiesMutationHookResult = ReturnType<
  typeof useUpdateContentTypeCookiesMutation
>;
export type UpdateContentTypeCookiesMutationResult =
  Apollo.MutationResult<UpdateContentTypeCookiesMutation>;
export type UpdateContentTypeCookiesMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateContentTypeCookiesMutation,
    UpdateContentTypeCookiesMutationVariables
  >;
export const UpdateContentTypeAccessibilityDocument = gql`
  mutation updateContentTypeAccessibility(
    $updateSubServiceId: ID!
    $data: AccessibilitySubServiceInput!
  ) {
    updateAccessibilitySubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeAccessibilityMutationFn = Apollo.MutationFunction<
  UpdateContentTypeAccessibilityMutation,
  UpdateContentTypeAccessibilityMutationVariables
>;

/**
 * __useUpdateContentTypeAccessibilityMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeAccessibilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeAccessibilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeAccessibilityMutation, { data, loading, error }] = useUpdateContentTypeAccessibilityMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeAccessibilityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeAccessibilityMutation,
    UpdateContentTypeAccessibilityMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeAccessibilityMutation,
    UpdateContentTypeAccessibilityMutationVariables
  >(UpdateContentTypeAccessibilityDocument, options);
}
export type UpdateContentTypeAccessibilityMutationHookResult = ReturnType<
  typeof useUpdateContentTypeAccessibilityMutation
>;
export type UpdateContentTypeAccessibilityMutationResult =
  Apollo.MutationResult<UpdateContentTypeAccessibilityMutation>;
export type UpdateContentTypeAccessibilityMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateContentTypeAccessibilityMutation,
    UpdateContentTypeAccessibilityMutationVariables
  >;
export const UpdateContentTypeContactUsDocument = gql`
  mutation updateContentTypeContactUs(
    $updateSubServiceId: ID!
    $data: ContactUsSubServiceInput!
  ) {
    updateContactUsSubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeContactUsMutationFn = Apollo.MutationFunction<
  UpdateContentTypeContactUsMutation,
  UpdateContentTypeContactUsMutationVariables
>;

/**
 * __useUpdateContentTypeContactUsMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeContactUsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeContactUsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeContactUsMutation, { data, loading, error }] = useUpdateContentTypeContactUsMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeContactUsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeContactUsMutation,
    UpdateContentTypeContactUsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeContactUsMutation,
    UpdateContentTypeContactUsMutationVariables
  >(UpdateContentTypeContactUsDocument, options);
}
export type UpdateContentTypeContactUsMutationHookResult = ReturnType<
  typeof useUpdateContentTypeContactUsMutation
>;
export type UpdateContentTypeContactUsMutationResult =
  Apollo.MutationResult<UpdateContentTypeContactUsMutation>;
export type UpdateContentTypeContactUsMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateContentTypeContactUsMutation,
    UpdateContentTypeContactUsMutationVariables
  >;
export const UpdateContentTypeCguDocument = gql`
  mutation updateContentTypeCGU(
    $updateSubServiceId: ID!
    $data: CguSubServiceInput!
  ) {
    updateCguSubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeCguMutationFn = Apollo.MutationFunction<
  UpdateContentTypeCguMutation,
  UpdateContentTypeCguMutationVariables
>;

/**
 * __useUpdateContentTypeCguMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeCguMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeCguMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeCguMutation, { data, loading, error }] = useUpdateContentTypeCguMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeCguMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeCguMutation,
    UpdateContentTypeCguMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeCguMutation,
    UpdateContentTypeCguMutationVariables
  >(UpdateContentTypeCguDocument, options);
}
export type UpdateContentTypeCguMutationHookResult = ReturnType<
  typeof useUpdateContentTypeCguMutation
>;
export type UpdateContentTypeCguMutationResult =
  Apollo.MutationResult<UpdateContentTypeCguMutation>;
export type UpdateContentTypeCguMutationOptions = Apollo.BaseMutationOptions<
  UpdateContentTypeCguMutation,
  UpdateContentTypeCguMutationVariables
>;
export const UpdateContentTypeConfidentialityDocument = gql`
  mutation updateContentTypeConfidentiality(
    $updateSubServiceId: ID!
    $data: ConfidentialitySubServiceInput!
  ) {
    updateConfidentialitySubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeConfidentialityMutationFn =
  Apollo.MutationFunction<
    UpdateContentTypeConfidentialityMutation,
    UpdateContentTypeConfidentialityMutationVariables
  >;

/**
 * __useUpdateContentTypeConfidentialityMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeConfidentialityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeConfidentialityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeConfidentialityMutation, { data, loading, error }] = useUpdateContentTypeConfidentialityMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeConfidentialityMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeConfidentialityMutation,
    UpdateContentTypeConfidentialityMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeConfidentialityMutation,
    UpdateContentTypeConfidentialityMutationVariables
  >(UpdateContentTypeConfidentialityDocument, options);
}
export type UpdateContentTypeConfidentialityMutationHookResult = ReturnType<
  typeof useUpdateContentTypeConfidentialityMutation
>;
export type UpdateContentTypeConfidentialityMutationResult =
  Apollo.MutationResult<UpdateContentTypeConfidentialityMutation>;
export type UpdateContentTypeConfidentialityMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateContentTypeConfidentialityMutation,
    UpdateContentTypeConfidentialityMutationVariables
  >;
export const UpdateContentTypeNewsDocument = gql`
  mutation updateContentTypeNews(
    $updateSubServiceId: ID!
    $data: NewsSubServiceInput!
  ) {
    updateNewsSubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeNewsMutationFn = Apollo.MutationFunction<
  UpdateContentTypeNewsMutation,
  UpdateContentTypeNewsMutationVariables
>;

/**
 * __useUpdateContentTypeNewsMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeNewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeNewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeNewsMutation, { data, loading, error }] = useUpdateContentTypeNewsMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeNewsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeNewsMutation,
    UpdateContentTypeNewsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeNewsMutation,
    UpdateContentTypeNewsMutationVariables
  >(UpdateContentTypeNewsDocument, options);
}
export type UpdateContentTypeNewsMutationHookResult = ReturnType<
  typeof useUpdateContentTypeNewsMutation
>;
export type UpdateContentTypeNewsMutationResult =
  Apollo.MutationResult<UpdateContentTypeNewsMutation>;
export type UpdateContentTypeNewsMutationOptions = Apollo.BaseMutationOptions<
  UpdateContentTypeNewsMutation,
  UpdateContentTypeNewsMutationVariables
>;
export const UpdateContentTypeTipDocument = gql`
  mutation updateContentTypeTip(
    $updateSubServiceId: ID!
    $data: TipSubServiceInput!
  ) {
    updateTipSubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeTipMutationFn = Apollo.MutationFunction<
  UpdateContentTypeTipMutation,
  UpdateContentTypeTipMutationVariables
>;

/**
 * __useUpdateContentTypeTipMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeTipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeTipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeTipMutation, { data, loading, error }] = useUpdateContentTypeTipMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeTipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeTipMutation,
    UpdateContentTypeTipMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeTipMutation,
    UpdateContentTypeTipMutationVariables
  >(UpdateContentTypeTipDocument, options);
}
export type UpdateContentTypeTipMutationHookResult = ReturnType<
  typeof useUpdateContentTypeTipMutation
>;
export type UpdateContentTypeTipMutationResult =
  Apollo.MutationResult<UpdateContentTypeTipMutation>;
export type UpdateContentTypeTipMutationOptions = Apollo.BaseMutationOptions<
  UpdateContentTypeTipMutation,
  UpdateContentTypeTipMutationVariables
>;
export const UpdateContentTypeQuizDocument = gql`
  mutation updateContentTypeQuiz(
    $updateSubServiceId: ID!
    $data: QuizSubServiceInput!
  ) {
    updateQuizSubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeQuizMutationFn = Apollo.MutationFunction<
  UpdateContentTypeQuizMutation,
  UpdateContentTypeQuizMutationVariables
>;

/**
 * __useUpdateContentTypeQuizMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeQuizMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeQuizMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeQuizMutation, { data, loading, error }] = useUpdateContentTypeQuizMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeQuizMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeQuizMutation,
    UpdateContentTypeQuizMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeQuizMutation,
    UpdateContentTypeQuizMutationVariables
  >(UpdateContentTypeQuizDocument, options);
}
export type UpdateContentTypeQuizMutationHookResult = ReturnType<
  typeof useUpdateContentTypeQuizMutation
>;
export type UpdateContentTypeQuizMutationResult =
  Apollo.MutationResult<UpdateContentTypeQuizMutation>;
export type UpdateContentTypeQuizMutationOptions = Apollo.BaseMutationOptions<
  UpdateContentTypeQuizMutation,
  UpdateContentTypeQuizMutationVariables
>;
export const UpdateContentTypeEventDocument = gql`
  mutation updateContentTypeEvent(
    $updateSubServiceId: ID!
    $data: EventSubServiceInput!
  ) {
    updateEventSubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeEventMutationFn = Apollo.MutationFunction<
  UpdateContentTypeEventMutation,
  UpdateContentTypeEventMutationVariables
>;

/**
 * __useUpdateContentTypeEventMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeEventMutation, { data, loading, error }] = useUpdateContentTypeEventMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeEventMutation,
    UpdateContentTypeEventMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeEventMutation,
    UpdateContentTypeEventMutationVariables
  >(UpdateContentTypeEventDocument, options);
}
export type UpdateContentTypeEventMutationHookResult = ReturnType<
  typeof useUpdateContentTypeEventMutation
>;
export type UpdateContentTypeEventMutationResult =
  Apollo.MutationResult<UpdateContentTypeEventMutation>;
export type UpdateContentTypeEventMutationOptions = Apollo.BaseMutationOptions<
  UpdateContentTypeEventMutation,
  UpdateContentTypeEventMutationVariables
>;
export const UpdateContentTypeFreeContentDocument = gql`
  mutation updateContentTypeFreeContent(
    $updateSubServiceId: ID!
    $data: FreeContentSubServiceInput!
  ) {
    updateFreeContentSubService(id: $updateSubServiceId, data: $data) {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
`;
export type UpdateContentTypeFreeContentMutationFn = Apollo.MutationFunction<
  UpdateContentTypeFreeContentMutation,
  UpdateContentTypeFreeContentMutationVariables
>;

/**
 * __useUpdateContentTypeFreeContentMutation__
 *
 * To run a mutation, you first call `useUpdateContentTypeFreeContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentTypeFreeContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentTypeFreeContentMutation, { data, loading, error }] = useUpdateContentTypeFreeContentMutation({
 *   variables: {
 *      updateSubServiceId: // value for 'updateSubServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContentTypeFreeContentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContentTypeFreeContentMutation,
    UpdateContentTypeFreeContentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContentTypeFreeContentMutation,
    UpdateContentTypeFreeContentMutationVariables
  >(UpdateContentTypeFreeContentDocument, options);
}
export type UpdateContentTypeFreeContentMutationHookResult = ReturnType<
  typeof useUpdateContentTypeFreeContentMutation
>;
export type UpdateContentTypeFreeContentMutationResult =
  Apollo.MutationResult<UpdateContentTypeFreeContentMutation>;
export type UpdateContentTypeFreeContentMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateContentTypeFreeContentMutation,
    UpdateContentTypeFreeContentMutationVariables
  >;
export const GetCollectionMethodsByContractIdDocument = gql`
  query getCollectionMethodsByContractId(
    $filters: CollectDoorToDoorFiltersInput
  ) {
    collectDoorToDoors(filters: $filters) {
      data {
        id
        attributes {
          name
        }
      }
    }
    collectDropOffs {
      data {
        id
        attributes {
          name
        }
      }
    }
    collectVoluntaries {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

/**
 * __useGetCollectionMethodsByContractIdQuery__
 *
 * To run a query within a React component, call `useGetCollectionMethodsByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionMethodsByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionMethodsByContractIdQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetCollectionMethodsByContractIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCollectionMethodsByContractIdQuery,
    GetCollectionMethodsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCollectionMethodsByContractIdQuery,
    GetCollectionMethodsByContractIdQueryVariables
  >(GetCollectionMethodsByContractIdDocument, options);
}
export function useGetCollectionMethodsByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectionMethodsByContractIdQuery,
    GetCollectionMethodsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCollectionMethodsByContractIdQuery,
    GetCollectionMethodsByContractIdQueryVariables
  >(GetCollectionMethodsByContractIdDocument, options);
}
export type GetCollectionMethodsByContractIdQueryHookResult = ReturnType<
  typeof useGetCollectionMethodsByContractIdQuery
>;
export type GetCollectionMethodsByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetCollectionMethodsByContractIdLazyQuery
>;
export type GetCollectionMethodsByContractIdQueryResult = Apollo.QueryResult<
  GetCollectionMethodsByContractIdQuery,
  GetCollectionMethodsByContractIdQueryVariables
>;
export const GetColorsDocument = gql`
  query getColors($filters: FlowColorFiltersInput) {
    flowColors(filters: $filters) {
      data {
        id
        attributes {
          name
          hexaCode
          shouldChangeHexaCode
        }
      }
    }
  }
`;

/**
 * __useGetColorsQuery__
 *
 * To run a query within a React component, call `useGetColorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetColorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetColorsQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetColorsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetColorsQuery,
    GetColorsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetColorsQuery, GetColorsQueryVariables>(
    GetColorsDocument,
    options,
  );
}
export function useGetColorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetColorsQuery,
    GetColorsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetColorsQuery, GetColorsQueryVariables>(
    GetColorsDocument,
    options,
  );
}
export type GetColorsQueryHookResult = ReturnType<typeof useGetColorsQuery>;
export type GetColorsLazyQueryHookResult = ReturnType<
  typeof useGetColorsLazyQuery
>;
export type GetColorsQueryResult = Apollo.QueryResult<
  GetColorsQuery,
  GetColorsQueryVariables
>;
export const GetFlowsByContractIdDocument = gql`
  query getFlowsByContractId($filters: FlowFiltersInput) {
    flows(filters: $filters) {
      data {
        id
        attributes {
          name
          isActivated
          createdAt
          recyclingGesture
          wasteForms {
            data {
              id
              attributes {
                name
              }
            }
          }
          code
          color {
            data {
              id
              attributes {
                hexaCode
                name
              }
            }
          }
          collectVoluntaries {
            data {
              id
              attributes {
                name
              }
            }
          }
          collectDoorToDoors {
            data {
              id
              attributes {
                name
              }
            }
          }
          collectDropOffs {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetFlowsByContractIdQuery__
 *
 * To run a query within a React component, call `useGetFlowsByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFlowsByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFlowsByContractIdQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetFlowsByContractIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFlowsByContractIdQuery,
    GetFlowsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFlowsByContractIdQuery,
    GetFlowsByContractIdQueryVariables
  >(GetFlowsByContractIdDocument, options);
}
export function useGetFlowsByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFlowsByContractIdQuery,
    GetFlowsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFlowsByContractIdQuery,
    GetFlowsByContractIdQueryVariables
  >(GetFlowsByContractIdDocument, options);
}
export type GetFlowsByContractIdQueryHookResult = ReturnType<
  typeof useGetFlowsByContractIdQuery
>;
export type GetFlowsByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetFlowsByContractIdLazyQuery
>;
export type GetFlowsByContractIdQueryResult = Apollo.QueryResult<
  GetFlowsByContractIdQuery,
  GetFlowsByContractIdQueryVariables
>;
export const UpdateFlowDocument = gql`
  mutation updateFlow($updateFlowId: ID!, $data: FlowInput!) {
    updateFlow(id: $updateFlowId, data: $data) {
      data {
        id
        attributes {
          name
          isActivated
          recyclingGesture
          color {
            data {
              id
              attributes {
                hexaCode
                name
              }
            }
          }
          code
          collectDoorToDoors {
            data {
              id
              attributes {
                name
              }
            }
          }
          collectDropOffs {
            data {
              id
              attributes {
                name
              }
            }
          }
          collectVoluntaries {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateFlowMutationFn = Apollo.MutationFunction<
  UpdateFlowMutation,
  UpdateFlowMutationVariables
>;

/**
 * __useUpdateFlowMutation__
 *
 * To run a mutation, you first call `useUpdateFlowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFlowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFlowMutation, { data, loading, error }] = useUpdateFlowMutation({
 *   variables: {
 *      updateFlowId: // value for 'updateFlowId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateFlowMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFlowMutation,
    UpdateFlowMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateFlowMutation, UpdateFlowMutationVariables>(
    UpdateFlowDocument,
    options,
  );
}
export type UpdateFlowMutationHookResult = ReturnType<
  typeof useUpdateFlowMutation
>;
export type UpdateFlowMutationResult =
  Apollo.MutationResult<UpdateFlowMutation>;
export type UpdateFlowMutationOptions = Apollo.BaseMutationOptions<
  UpdateFlowMutation,
  UpdateFlowMutationVariables
>;
export const GetBanAddressesAutoCompleteDocument = gql`
  query getBanAddressesAutoComplete($searchTerm: String!) {
    getAddressCoordinates(searchTerm: $searchTerm) {
      name
      latitude
      longitude
      banFeaturesProperties
    }
  }
`;

/**
 * __useGetBanAddressesAutoCompleteQuery__
 *
 * To run a query within a React component, call `useGetBanAddressesAutoCompleteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBanAddressesAutoCompleteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBanAddressesAutoCompleteQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetBanAddressesAutoCompleteQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetBanAddressesAutoCompleteQuery,
    GetBanAddressesAutoCompleteQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetBanAddressesAutoCompleteQuery,
    GetBanAddressesAutoCompleteQueryVariables
  >(GetBanAddressesAutoCompleteDocument, options);
}
export function useGetBanAddressesAutoCompleteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBanAddressesAutoCompleteQuery,
    GetBanAddressesAutoCompleteQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetBanAddressesAutoCompleteQuery,
    GetBanAddressesAutoCompleteQueryVariables
  >(GetBanAddressesAutoCompleteDocument, options);
}
export type GetBanAddressesAutoCompleteQueryHookResult = ReturnType<
  typeof useGetBanAddressesAutoCompleteQuery
>;
export type GetBanAddressesAutoCompleteLazyQueryHookResult = ReturnType<
  typeof useGetBanAddressesAutoCompleteLazyQuery
>;
export type GetBanAddressesAutoCompleteQueryResult = Apollo.QueryResult<
  GetBanAddressesAutoCompleteQuery,
  GetBanAddressesAutoCompleteQueryVariables
>;
export const GetContractByIdDocument = gql`
  query getContractById($contractId: ID!) {
    contract(id: $contractId) {
      data {
        id
        attributes {
          clientName
          clientType
          contractStatus
          siret
          clear
          ccap
          isNonExclusive
          isRVFrance
          pathId
          logo {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
              }
            }
          }
          channelType {
            data {
              id
              attributes {
                hasWebApp
                hasWebSite
              }
            }
          }
          clientContact {
            data {
              id
              attributes {
                firstName
                lastName
                email
                phoneNumber
              }
            }
          }
          contractCustomization {
            data {
              id
              attributes {
                primaryColor
                secondaryColor
                textContrast
              }
            }
          }
          editorialService {
            data {
              id
              attributes {
                eventSubService {
                  data {
                    id
                    attributes {
                      name
                      isActivated
                    }
                  }
                }
                freeContentSubServices {
                  data {
                    id
                    attributes {
                      name
                      isActivated
                    }
                  }
                }
                newsSubService {
                  data {
                    id
                    attributes {
                      name
                      isActivated
                    }
                  }
                }
                quizSubService {
                  data {
                    id
                    attributes {
                      name
                      isActivated
                    }
                  }
                }
                tipSubService {
                  data {
                    id
                    attributes {
                      name
                      isActivated
                    }
                  }
                }
              }
            }
          }
          recyclingGuideService {
            data {
              id
              attributes {
                name
                isActivated
                memoName
              }
            }
          }
          pickUpDayService {
            data {
              id
              attributes {
                name
                isActivated
              }
            }
          }
          dropOffMapService {
            data {
              id
              attributes {
                name
                isActivated
              }
            }
          }
          requestService {
            data {
              id
              attributes {
                name
                isActivated
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetContractByIdQuery__
 *
 * To run a query within a React component, call `useGetContractByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractByIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetContractByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetContractByIdQuery,
    GetContractByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetContractByIdQuery, GetContractByIdQueryVariables>(
    GetContractByIdDocument,
    options,
  );
}
export function useGetContractByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetContractByIdQuery,
    GetContractByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetContractByIdQuery,
    GetContractByIdQueryVariables
  >(GetContractByIdDocument, options);
}
export type GetContractByIdQueryHookResult = ReturnType<
  typeof useGetContractByIdQuery
>;
export type GetContractByIdLazyQueryHookResult = ReturnType<
  typeof useGetContractByIdLazyQuery
>;
export type GetContractByIdQueryResult = Apollo.QueryResult<
  GetContractByIdQuery,
  GetContractByIdQueryVariables
>;
export const GetContractsDocument = gql`
  query getContracts {
    contracts {
      data {
        id
        attributes {
          clientName
          contractStatus
          dueDate
          hasYesWeScan
          clientType
          isNonExclusive
          isRVFrance
          logo {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
              }
            }
          }
          channelType {
            data {
              id
              attributes {
                hasWebApp
                hasWebSite
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetContractsQuery__
 *
 * To run a query within a React component, call `useGetContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetContractsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetContractsQuery,
    GetContractsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetContractsQuery, GetContractsQueryVariables>(
    GetContractsDocument,
    options,
  );
}
export function useGetContractsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetContractsQuery,
    GetContractsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetContractsQuery, GetContractsQueryVariables>(
    GetContractsDocument,
    options,
  );
}
export type GetContractsQueryHookResult = ReturnType<
  typeof useGetContractsQuery
>;
export type GetContractsLazyQueryHookResult = ReturnType<
  typeof useGetContractsLazyQuery
>;
export type GetContractsQueryResult = Apollo.QueryResult<
  GetContractsQuery,
  GetContractsQueryVariables
>;
export const GetServicesActiveDocument = gql`
  query getServicesActive($contractId: ID!) {
    editorialServices(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        attributes {
          eventSubService {
            data {
              attributes {
                isActivated
              }
            }
          }
          newsSubService {
            data {
              attributes {
                isActivated
              }
            }
          }
          quizSubService {
            data {
              attributes {
                isActivated
              }
            }
          }
          tipSubService {
            data {
              attributes {
                isActivated
              }
            }
          }
          freeContentSubServices {
            data {
              attributes {
                isActivated
              }
            }
          }
          contactUsSubService {
            data {
              attributes {
                isActivated
              }
            }
          }
        }
      }
    }
    recyclingGuideServices(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        attributes {
          isActivated
        }
      }
    }
    requestServices(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        attributes {
          isActivated
        }
      }
    }
  }
`;

/**
 * __useGetServicesActiveQuery__
 *
 * To run a query within a React component, call `useGetServicesActiveQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesActiveQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesActiveQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetServicesActiveQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetServicesActiveQuery,
    GetServicesActiveQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetServicesActiveQuery,
    GetServicesActiveQueryVariables
  >(GetServicesActiveDocument, options);
}
export function useGetServicesActiveLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetServicesActiveQuery,
    GetServicesActiveQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetServicesActiveQuery,
    GetServicesActiveQueryVariables
  >(GetServicesActiveDocument, options);
}
export type GetServicesActiveQueryHookResult = ReturnType<
  typeof useGetServicesActiveQuery
>;
export type GetServicesActiveLazyQueryHookResult = ReturnType<
  typeof useGetServicesActiveLazyQuery
>;
export type GetServicesActiveQueryResult = Apollo.QueryResult<
  GetServicesActiveQuery,
  GetServicesActiveQueryVariables
>;
export const UpdateContactMwcDocument = gql`
  mutation UpdateContactMwc(
    $serviceName: String
    $postalAddress: String
    $postalCode: String
    $city: String
    $contactEmail: String
    $phoneNumber: String
    $contractId: Int
  ) {
    updateContactMwc(
      serviceName: $serviceName
      postalAddress: $postalAddress
      postalCode: $postalCode
      city: $city
      contactEmail: $contactEmail
      phoneNumber: $phoneNumber
      contractId: $contractId
    ) {
      serviceName
      postalAddress
      city
      postalCode
      contactEmail
      phoneNumber
    }
  }
`;
export type UpdateContactMwcMutationFn = Apollo.MutationFunction<
  UpdateContactMwcMutation,
  UpdateContactMwcMutationVariables
>;

/**
 * __useUpdateContactMwcMutation__
 *
 * To run a mutation, you first call `useUpdateContactMwcMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactMwcMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactMwcMutation, { data, loading, error }] = useUpdateContactMwcMutation({
 *   variables: {
 *      serviceName: // value for 'serviceName'
 *      postalAddress: // value for 'postalAddress'
 *      postalCode: // value for 'postalCode'
 *      city: // value for 'city'
 *      contactEmail: // value for 'contactEmail'
 *      phoneNumber: // value for 'phoneNumber'
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useUpdateContactMwcMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContactMwcMutation,
    UpdateContactMwcMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContactMwcMutation,
    UpdateContactMwcMutationVariables
  >(UpdateContactMwcDocument, options);
}
export type UpdateContactMwcMutationHookResult = ReturnType<
  typeof useUpdateContactMwcMutation
>;
export type UpdateContactMwcMutationResult =
  Apollo.MutationResult<UpdateContactMwcMutation>;
export type UpdateContactMwcMutationOptions = Apollo.BaseMutationOptions<
  UpdateContactMwcMutation,
  UpdateContactMwcMutationVariables
>;
export const GetContactMwcDocument = gql`
  query GetContactMwc($filters: MwCounterServiceFiltersInput) {
    mwCounterServices(filters: $filters) {
      data {
        id
        attributes {
          mwcContact {
            data {
              attributes {
                city
                serviceName
                postalAddress
                postalCode
                contactEmail
                phoneNumber
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetContactMwcQuery__
 *
 * To run a query within a React component, call `useGetContactMwcQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactMwcQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactMwcQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useGetContactMwcQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetContactMwcQuery,
    GetContactMwcQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetContactMwcQuery, GetContactMwcQueryVariables>(
    GetContactMwcDocument,
    options,
  );
}
export function useGetContactMwcLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetContactMwcQuery,
    GetContactMwcQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetContactMwcQuery, GetContactMwcQueryVariables>(
    GetContactMwcDocument,
    options,
  );
}
export type GetContactMwcQueryHookResult = ReturnType<
  typeof useGetContactMwcQuery
>;
export type GetContactMwcLazyQueryHookResult = ReturnType<
  typeof useGetContactMwcLazyQuery
>;
export type GetContactMwcQueryResult = Apollo.QueryResult<
  GetContactMwcQuery,
  GetContactMwcQueryVariables
>;
export const GetEditoBlockTabDocument = gql`
  query getEditoBlockTab(
    $contractId: ID!
    $status: ENUM_EDITOCONTENTDTO_STATUS
  ) {
    getEditoBlockDTO(contractId: $contractId, status: $status) {
      id
      displayBlock
      titleContent
      editoContents {
        componentId
        uniqueId
        id
        contentType
        typeName
        attributes {
          title
          status
          publishedDate
        }
      }
    }
    getEditoContentDTOs(contractId: $contractId, status: $status) {
      id
      contentType
      typeName
      uniqueId
      attributes {
        title
        status
        publishedDate
      }
    }
  }
`;

/**
 * __useGetEditoBlockTabQuery__
 *
 * To run a query within a React component, call `useGetEditoBlockTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEditoBlockTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEditoBlockTabQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetEditoBlockTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetEditoBlockTabQuery,
    GetEditoBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEditoBlockTabQuery, GetEditoBlockTabQueryVariables>(
    GetEditoBlockTabDocument,
    options,
  );
}
export function useGetEditoBlockTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEditoBlockTabQuery,
    GetEditoBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetEditoBlockTabQuery,
    GetEditoBlockTabQueryVariables
  >(GetEditoBlockTabDocument, options);
}
export type GetEditoBlockTabQueryHookResult = ReturnType<
  typeof useGetEditoBlockTabQuery
>;
export type GetEditoBlockTabLazyQueryHookResult = ReturnType<
  typeof useGetEditoBlockTabLazyQuery
>;
export type GetEditoBlockTabQueryResult = Apollo.QueryResult<
  GetEditoBlockTabQuery,
  GetEditoBlockTabQueryVariables
>;
export const GetQuizAndTipsBlockTabDocument = gql`
  query getQuizAndTipsBlockTab($contractId: ID!, $status: String!) {
    contractCustomizations(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        attributes {
          homepage {
            data {
              attributes {
                quizAndTipsBlock {
                  data {
                    id
                    attributes {
                      titleContent
                      displayBlock
                      displayQuiz
                      quiz {
                        data {
                          id
                          attributes {
                            title
                            status
                            publishedDate
                          }
                        }
                      }
                      displayTips
                      tips {
                        data {
                          id
                          attributes {
                            title
                            status
                            publishedDate
                            image {
                              data {
                                attributes {
                                  hash
                                  mime
                                  name
                                  provider
                                  size
                                  url
                                  alternativeText
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    quizSubServices(
      filters: { editorialService: { contract: { id: { eq: $contractId } } } }
    ) {
      data {
        attributes {
          quizzes(filters: { status: { eq: $status } }) {
            data {
              id
              attributes {
                title
                status
                publishedDate
              }
            }
          }
        }
      }
    }
    tipSubServices(
      filters: { editorialService: { contract: { id: { eq: $contractId } } } }
    ) {
      data {
        attributes {
          tips(filters: { status: { eq: $status } }) {
            data {
              id
              attributes {
                title
                status
                publishedDate
                image {
                  data {
                    attributes {
                      hash
                      mime
                      name
                      provider
                      size
                      url
                      alternativeText
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetQuizAndTipsBlockTabQuery__
 *
 * To run a query within a React component, call `useGetQuizAndTipsBlockTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuizAndTipsBlockTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuizAndTipsBlockTabQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetQuizAndTipsBlockTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetQuizAndTipsBlockTabQuery,
    GetQuizAndTipsBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetQuizAndTipsBlockTabQuery,
    GetQuizAndTipsBlockTabQueryVariables
  >(GetQuizAndTipsBlockTabDocument, options);
}
export function useGetQuizAndTipsBlockTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetQuizAndTipsBlockTabQuery,
    GetQuizAndTipsBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetQuizAndTipsBlockTabQuery,
    GetQuizAndTipsBlockTabQueryVariables
  >(GetQuizAndTipsBlockTabDocument, options);
}
export type GetQuizAndTipsBlockTabQueryHookResult = ReturnType<
  typeof useGetQuizAndTipsBlockTabQuery
>;
export type GetQuizAndTipsBlockTabLazyQueryHookResult = ReturnType<
  typeof useGetQuizAndTipsBlockTabLazyQuery
>;
export type GetQuizAndTipsBlockTabQueryResult = Apollo.QueryResult<
  GetQuizAndTipsBlockTabQuery,
  GetQuizAndTipsBlockTabQueryVariables
>;
export const GetRecyclingGuideBlockTabDocument = gql`
  query getRecyclingGuideBlockTab($contractId: ID!) {
    contractCustomizations(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        attributes {
          homepage {
            data {
              attributes {
                recyclingGuideBlock {
                  data {
                    id
                    attributes {
                      titleContent
                      subtitleContent
                      recyclingGuideDisplayContent
                      tags {
                        data {
                          attributes {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetRecyclingGuideBlockTabQuery__
 *
 * To run a query within a React component, call `useGetRecyclingGuideBlockTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecyclingGuideBlockTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecyclingGuideBlockTabQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetRecyclingGuideBlockTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRecyclingGuideBlockTabQuery,
    GetRecyclingGuideBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRecyclingGuideBlockTabQuery,
    GetRecyclingGuideBlockTabQueryVariables
  >(GetRecyclingGuideBlockTabDocument, options);
}
export function useGetRecyclingGuideBlockTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRecyclingGuideBlockTabQuery,
    GetRecyclingGuideBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRecyclingGuideBlockTabQuery,
    GetRecyclingGuideBlockTabQueryVariables
  >(GetRecyclingGuideBlockTabDocument, options);
}
export type GetRecyclingGuideBlockTabQueryHookResult = ReturnType<
  typeof useGetRecyclingGuideBlockTabQuery
>;
export type GetRecyclingGuideBlockTabLazyQueryHookResult = ReturnType<
  typeof useGetRecyclingGuideBlockTabLazyQuery
>;
export type GetRecyclingGuideBlockTabQueryResult = Apollo.QueryResult<
  GetRecyclingGuideBlockTabQuery,
  GetRecyclingGuideBlockTabQueryVariables
>;
export const GetSearchEngineBlockTabDocument = gql`
  query getSearchEngineBlockTab($contractId: ID!) {
    contractCustomizations(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        attributes {
          homepage {
            data {
              attributes {
                searchEngineBlock {
                  data {
                    id
                    attributes {
                      titleContent
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetSearchEngineBlockTabQuery__
 *
 * To run a query within a React component, call `useGetSearchEngineBlockTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchEngineBlockTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchEngineBlockTabQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetSearchEngineBlockTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSearchEngineBlockTabQuery,
    GetSearchEngineBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSearchEngineBlockTabQuery,
    GetSearchEngineBlockTabQueryVariables
  >(GetSearchEngineBlockTabDocument, options);
}
export function useGetSearchEngineBlockTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSearchEngineBlockTabQuery,
    GetSearchEngineBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSearchEngineBlockTabQuery,
    GetSearchEngineBlockTabQueryVariables
  >(GetSearchEngineBlockTabDocument, options);
}
export type GetSearchEngineBlockTabQueryHookResult = ReturnType<
  typeof useGetSearchEngineBlockTabQuery
>;
export type GetSearchEngineBlockTabLazyQueryHookResult = ReturnType<
  typeof useGetSearchEngineBlockTabLazyQuery
>;
export type GetSearchEngineBlockTabQueryResult = Apollo.QueryResult<
  GetSearchEngineBlockTabQuery,
  GetSearchEngineBlockTabQueryVariables
>;
export const GetServicesBlockTabDocument = gql`
  query getServicesBlockTab($contractId: ID!) {
    contractCustomizations(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        id
        attributes {
          homepage {
            data {
              attributes {
                servicesBlock {
                  data {
                    id
                    attributes {
                      titleContent
                      serviceLinks {
                        ... on ComponentLinksDropOffMap {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksPickUpDay {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksRecyclingGuide {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksRequest {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksContactUs {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksNews {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksEvents {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksQuizzes {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksTips {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksFrees {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksExternal {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                          externalLink
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetServicesBlockTabQuery__
 *
 * To run a query within a React component, call `useGetServicesBlockTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServicesBlockTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServicesBlockTabQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetServicesBlockTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetServicesBlockTabQuery,
    GetServicesBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetServicesBlockTabQuery,
    GetServicesBlockTabQueryVariables
  >(GetServicesBlockTabDocument, options);
}
export function useGetServicesBlockTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetServicesBlockTabQuery,
    GetServicesBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetServicesBlockTabQuery,
    GetServicesBlockTabQueryVariables
  >(GetServicesBlockTabDocument, options);
}
export type GetServicesBlockTabQueryHookResult = ReturnType<
  typeof useGetServicesBlockTabQuery
>;
export type GetServicesBlockTabLazyQueryHookResult = ReturnType<
  typeof useGetServicesBlockTabLazyQuery
>;
export type GetServicesBlockTabQueryResult = Apollo.QueryResult<
  GetServicesBlockTabQuery,
  GetServicesBlockTabQueryVariables
>;
export const GetTopContentBlockTabDocument = gql`
  query getTopContentBlockTab(
    $contractId: ID!
    $status: ENUM_TOPCONTENTDTO_STATUS
  ) {
    getTopContentBlockDTO(contractId: $contractId, status: $status) {
      id
      displayBlock
      displayLastThreeContents
      hasTopContent
      titleContent
      topContent {
        componentId
        uniqueId
        id
        contentType
        typeName
        attributes {
          title
          status
          publishedDate
        }
      }
    }
    getTopContentDTOs(contractId: $contractId, status: $status) {
      id
      contentType
      typeName
      uniqueId
      attributes {
        title
        status
        publishedDate
      }
    }
  }
`;

/**
 * __useGetTopContentBlockTabQuery__
 *
 * To run a query within a React component, call `useGetTopContentBlockTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopContentBlockTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopContentBlockTabQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetTopContentBlockTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTopContentBlockTabQuery,
    GetTopContentBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetTopContentBlockTabQuery,
    GetTopContentBlockTabQueryVariables
  >(GetTopContentBlockTabDocument, options);
}
export function useGetTopContentBlockTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTopContentBlockTabQuery,
    GetTopContentBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTopContentBlockTabQuery,
    GetTopContentBlockTabQueryVariables
  >(GetTopContentBlockTabDocument, options);
}
export type GetTopContentBlockTabQueryHookResult = ReturnType<
  typeof useGetTopContentBlockTabQuery
>;
export type GetTopContentBlockTabLazyQueryHookResult = ReturnType<
  typeof useGetTopContentBlockTabLazyQuery
>;
export type GetTopContentBlockTabQueryResult = Apollo.QueryResult<
  GetTopContentBlockTabQuery,
  GetTopContentBlockTabQueryVariables
>;
export const UpdateEditoBlockTabDocument = gql`
  mutation updateEditoBlockTab(
    $updateEditoBlockId: ID!
    $data: EditoBlockInput!
  ) {
    updateEditoBlock(id: $updateEditoBlockId, data: $data) {
      data {
        id
        attributes {
          displayBlock
          titleContent
        }
      }
    }
  }
`;
export type UpdateEditoBlockTabMutationFn = Apollo.MutationFunction<
  UpdateEditoBlockTabMutation,
  UpdateEditoBlockTabMutationVariables
>;

/**
 * __useUpdateEditoBlockTabMutation__
 *
 * To run a mutation, you first call `useUpdateEditoBlockTabMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEditoBlockTabMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEditoBlockTabMutation, { data, loading, error }] = useUpdateEditoBlockTabMutation({
 *   variables: {
 *      updateEditoBlockId: // value for 'updateEditoBlockId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateEditoBlockTabMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEditoBlockTabMutation,
    UpdateEditoBlockTabMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateEditoBlockTabMutation,
    UpdateEditoBlockTabMutationVariables
  >(UpdateEditoBlockTabDocument, options);
}
export type UpdateEditoBlockTabMutationHookResult = ReturnType<
  typeof useUpdateEditoBlockTabMutation
>;
export type UpdateEditoBlockTabMutationResult =
  Apollo.MutationResult<UpdateEditoBlockTabMutation>;
export type UpdateEditoBlockTabMutationOptions = Apollo.BaseMutationOptions<
  UpdateEditoBlockTabMutation,
  UpdateEditoBlockTabMutationVariables
>;
export const UpdateQuizAndTipsBlockTabDocument = gql`
  mutation updateQuizAndTipsBlockTab(
    $quizAndTipsBlockId: ID!
    $data: QuizAndTipsBlockInput!
  ) {
    updateQuizAndTipsBlock(id: $quizAndTipsBlockId, data: $data) {
      data {
        attributes {
          titleContent
          displayBlock
          displayQuiz
          quiz {
            data {
              id
            }
          }
          displayTips
          tips {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
export type UpdateQuizAndTipsBlockTabMutationFn = Apollo.MutationFunction<
  UpdateQuizAndTipsBlockTabMutation,
  UpdateQuizAndTipsBlockTabMutationVariables
>;

/**
 * __useUpdateQuizAndTipsBlockTabMutation__
 *
 * To run a mutation, you first call `useUpdateQuizAndTipsBlockTabMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuizAndTipsBlockTabMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuizAndTipsBlockTabMutation, { data, loading, error }] = useUpdateQuizAndTipsBlockTabMutation({
 *   variables: {
 *      quizAndTipsBlockId: // value for 'quizAndTipsBlockId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateQuizAndTipsBlockTabMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateQuizAndTipsBlockTabMutation,
    UpdateQuizAndTipsBlockTabMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateQuizAndTipsBlockTabMutation,
    UpdateQuizAndTipsBlockTabMutationVariables
  >(UpdateQuizAndTipsBlockTabDocument, options);
}
export type UpdateQuizAndTipsBlockTabMutationHookResult = ReturnType<
  typeof useUpdateQuizAndTipsBlockTabMutation
>;
export type UpdateQuizAndTipsBlockTabMutationResult =
  Apollo.MutationResult<UpdateQuizAndTipsBlockTabMutation>;
export type UpdateQuizAndTipsBlockTabMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateQuizAndTipsBlockTabMutation,
    UpdateQuizAndTipsBlockTabMutationVariables
  >;
export const UpdateRecyclingGuideTabDocument = gql`
  mutation updateRecyclingGuideTab(
    $updateRecyclingGuideBlockId: ID!
    $data: RecyclingGuideBlockInput!
  ) {
    updateRecyclingGuideBlock(id: $updateRecyclingGuideBlockId, data: $data) {
      data {
        attributes {
          titleContent
          subtitleContent
          recyclingGuideDisplayContent
          tags {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateRecyclingGuideTabMutationFn = Apollo.MutationFunction<
  UpdateRecyclingGuideTabMutation,
  UpdateRecyclingGuideTabMutationVariables
>;

/**
 * __useUpdateRecyclingGuideTabMutation__
 *
 * To run a mutation, you first call `useUpdateRecyclingGuideTabMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecyclingGuideTabMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecyclingGuideTabMutation, { data, loading, error }] = useUpdateRecyclingGuideTabMutation({
 *   variables: {
 *      updateRecyclingGuideBlockId: // value for 'updateRecyclingGuideBlockId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateRecyclingGuideTabMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRecyclingGuideTabMutation,
    UpdateRecyclingGuideTabMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateRecyclingGuideTabMutation,
    UpdateRecyclingGuideTabMutationVariables
  >(UpdateRecyclingGuideTabDocument, options);
}
export type UpdateRecyclingGuideTabMutationHookResult = ReturnType<
  typeof useUpdateRecyclingGuideTabMutation
>;
export type UpdateRecyclingGuideTabMutationResult =
  Apollo.MutationResult<UpdateRecyclingGuideTabMutation>;
export type UpdateRecyclingGuideTabMutationOptions = Apollo.BaseMutationOptions<
  UpdateRecyclingGuideTabMutation,
  UpdateRecyclingGuideTabMutationVariables
>;
export const UpdateSearchEngineBlockTabDocument = gql`
  mutation updateSearchEngineBlockTab(
    $updateSearchEngineBlockId: ID!
    $data: SearchEngineBlockInput!
  ) {
    updateSearchEngineBlock(id: $updateSearchEngineBlockId, data: $data) {
      data {
        attributes {
          titleContent
        }
      }
    }
  }
`;
export type UpdateSearchEngineBlockTabMutationFn = Apollo.MutationFunction<
  UpdateSearchEngineBlockTabMutation,
  UpdateSearchEngineBlockTabMutationVariables
>;

/**
 * __useUpdateSearchEngineBlockTabMutation__
 *
 * To run a mutation, you first call `useUpdateSearchEngineBlockTabMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSearchEngineBlockTabMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSearchEngineBlockTabMutation, { data, loading, error }] = useUpdateSearchEngineBlockTabMutation({
 *   variables: {
 *      updateSearchEngineBlockId: // value for 'updateSearchEngineBlockId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSearchEngineBlockTabMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSearchEngineBlockTabMutation,
    UpdateSearchEngineBlockTabMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateSearchEngineBlockTabMutation,
    UpdateSearchEngineBlockTabMutationVariables
  >(UpdateSearchEngineBlockTabDocument, options);
}
export type UpdateSearchEngineBlockTabMutationHookResult = ReturnType<
  typeof useUpdateSearchEngineBlockTabMutation
>;
export type UpdateSearchEngineBlockTabMutationResult =
  Apollo.MutationResult<UpdateSearchEngineBlockTabMutation>;
export type UpdateSearchEngineBlockTabMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateSearchEngineBlockTabMutation,
    UpdateSearchEngineBlockTabMutationVariables
  >;
export const UpdateServicesBlockTabDocument = gql`
  mutation updateServicesBlockTab(
    $updateServicesBlockId: ID!
    $data: ServicesBlockInput!
  ) {
    updateServicesBlock(id: $updateServicesBlockId, data: $data) {
      data {
        id
        attributes {
          homepage {
            data {
              attributes {
                servicesBlock {
                  data {
                    id
                    attributes {
                      titleContent
                      serviceLinks {
                        ... on ComponentLinksDropOffMap {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksPickUpDay {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksRecyclingGuide {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksRequest {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksContactUs {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksNews {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksEvents {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksQuizzes {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksTips {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksFrees {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                        }
                        ... on ComponentLinksExternal {
                          id
                          name
                          isDisplayed
                          picto {
                            data {
                              attributes {
                                url
                              }
                            }
                          }
                          externalLink
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateServicesBlockTabMutationFn = Apollo.MutationFunction<
  UpdateServicesBlockTabMutation,
  UpdateServicesBlockTabMutationVariables
>;

/**
 * __useUpdateServicesBlockTabMutation__
 *
 * To run a mutation, you first call `useUpdateServicesBlockTabMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServicesBlockTabMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServicesBlockTabMutation, { data, loading, error }] = useUpdateServicesBlockTabMutation({
 *   variables: {
 *      updateServicesBlockId: // value for 'updateServicesBlockId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateServicesBlockTabMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateServicesBlockTabMutation,
    UpdateServicesBlockTabMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateServicesBlockTabMutation,
    UpdateServicesBlockTabMutationVariables
  >(UpdateServicesBlockTabDocument, options);
}
export type UpdateServicesBlockTabMutationHookResult = ReturnType<
  typeof useUpdateServicesBlockTabMutation
>;
export type UpdateServicesBlockTabMutationResult =
  Apollo.MutationResult<UpdateServicesBlockTabMutation>;
export type UpdateServicesBlockTabMutationOptions = Apollo.BaseMutationOptions<
  UpdateServicesBlockTabMutation,
  UpdateServicesBlockTabMutationVariables
>;
export const UpdateTopContentBlockTabDocument = gql`
  mutation updateTopContentBlockTab(
    $updateTopContentBlockId: ID!
    $data: TopContentBlockInput!
  ) {
    updateTopContentBlock(id: $updateTopContentBlockId, data: $data) {
      data {
        attributes {
          homepage {
            data {
              attributes {
                topContentBlock {
                  data {
                    attributes {
                      displayBlock
                      titleContent
                      hasTopContent
                      displayLastThreeContents
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateTopContentBlockTabMutationFn = Apollo.MutationFunction<
  UpdateTopContentBlockTabMutation,
  UpdateTopContentBlockTabMutationVariables
>;

/**
 * __useUpdateTopContentBlockTabMutation__
 *
 * To run a mutation, you first call `useUpdateTopContentBlockTabMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopContentBlockTabMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopContentBlockTabMutation, { data, loading, error }] = useUpdateTopContentBlockTabMutation({
 *   variables: {
 *      updateTopContentBlockId: // value for 'updateTopContentBlockId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTopContentBlockTabMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTopContentBlockTabMutation,
    UpdateTopContentBlockTabMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateTopContentBlockTabMutation,
    UpdateTopContentBlockTabMutationVariables
  >(UpdateTopContentBlockTabDocument, options);
}
export type UpdateTopContentBlockTabMutationHookResult = ReturnType<
  typeof useUpdateTopContentBlockTabMutation
>;
export type UpdateTopContentBlockTabMutationResult =
  Apollo.MutationResult<UpdateTopContentBlockTabMutation>;
export type UpdateTopContentBlockTabMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateTopContentBlockTabMutation,
    UpdateTopContentBlockTabMutationVariables
  >;
export const UpdateContractCustomizationDocument = gql`
  mutation UpdateContractCustomization(
    $updateContractCustomizationId: ID!
    $data: ContractCustomizationInput!
  ) {
    updateContractCustomization(
      id: $updateContractCustomizationId
      data: $data
    ) {
      data {
        attributes {
          primaryColor
          secondaryColor
          textContrast
        }
      }
    }
  }
`;
export type UpdateContractCustomizationMutationFn = Apollo.MutationFunction<
  UpdateContractCustomizationMutation,
  UpdateContractCustomizationMutationVariables
>;

/**
 * __useUpdateContractCustomizationMutation__
 *
 * To run a mutation, you first call `useUpdateContractCustomizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContractCustomizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContractCustomizationMutation, { data, loading, error }] = useUpdateContractCustomizationMutation({
 *   variables: {
 *      updateContractCustomizationId: // value for 'updateContractCustomizationId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContractCustomizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContractCustomizationMutation,
    UpdateContractCustomizationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContractCustomizationMutation,
    UpdateContractCustomizationMutationVariables
  >(UpdateContractCustomizationDocument, options);
}
export type UpdateContractCustomizationMutationHookResult = ReturnType<
  typeof useUpdateContractCustomizationMutation
>;
export type UpdateContractCustomizationMutationResult =
  Apollo.MutationResult<UpdateContractCustomizationMutation>;
export type UpdateContractCustomizationMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateContractCustomizationMutation,
    UpdateContractCustomizationMutationVariables
  >;
export const GetContractCustomizationByIdDocument = gql`
  query getContractCustomizationById($contractId: ID!) {
    contract(id: $contractId) {
      data {
        id
        attributes {
          logo {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
              }
            }
          }
          contractCustomization {
            data {
              id
              attributes {
                primaryColor
                secondaryColor
                textContrast
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetContractCustomizationByIdQuery__
 *
 * To run a query within a React component, call `useGetContractCustomizationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractCustomizationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractCustomizationByIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetContractCustomizationByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetContractCustomizationByIdQuery,
    GetContractCustomizationByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetContractCustomizationByIdQuery,
    GetContractCustomizationByIdQueryVariables
  >(GetContractCustomizationByIdDocument, options);
}
export function useGetContractCustomizationByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetContractCustomizationByIdQuery,
    GetContractCustomizationByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetContractCustomizationByIdQuery,
    GetContractCustomizationByIdQueryVariables
  >(GetContractCustomizationByIdDocument, options);
}
export type GetContractCustomizationByIdQueryHookResult = ReturnType<
  typeof useGetContractCustomizationByIdQuery
>;
export type GetContractCustomizationByIdLazyQueryHookResult = ReturnType<
  typeof useGetContractCustomizationByIdLazyQuery
>;
export type GetContractCustomizationByIdQueryResult = Apollo.QueryResult<
  GetContractCustomizationByIdQuery,
  GetContractCustomizationByIdQueryVariables
>;
export const UpdateContractCustomizationByIdDocument = gql`
  mutation updateContractCustomizationById(
    $updateContractId: ID!
    $data: ContractInput!
  ) {
    updateContract(id: $updateContractId, data: $data) {
      data {
        id
        attributes {
          logo {
            data {
              id
              attributes {
                name
                alternativeText
                hash
                mime
                size
                url
                provider
              }
            }
          }
          contractCustomization {
            data {
              id
              attributes {
                primaryColor
                secondaryColor
                textContrast
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateContractCustomizationByIdMutationFn = Apollo.MutationFunction<
  UpdateContractCustomizationByIdMutation,
  UpdateContractCustomizationByIdMutationVariables
>;

/**
 * __useUpdateContractCustomizationByIdMutation__
 *
 * To run a mutation, you first call `useUpdateContractCustomizationByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContractCustomizationByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContractCustomizationByIdMutation, { data, loading, error }] = useUpdateContractCustomizationByIdMutation({
 *   variables: {
 *      updateContractId: // value for 'updateContractId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateContractCustomizationByIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateContractCustomizationByIdMutation,
    UpdateContractCustomizationByIdMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateContractCustomizationByIdMutation,
    UpdateContractCustomizationByIdMutationVariables
  >(UpdateContractCustomizationByIdDocument, options);
}
export type UpdateContractCustomizationByIdMutationHookResult = ReturnType<
  typeof useUpdateContractCustomizationByIdMutation
>;
export type UpdateContractCustomizationByIdMutationResult =
  Apollo.MutationResult<UpdateContractCustomizationByIdMutation>;
export type UpdateContractCustomizationByIdMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateContractCustomizationByIdMutation,
    UpdateContractCustomizationByIdMutationVariables
  >;
export const GetFooterPageDocument = gql`
  query getFooterPage($contractId: ID!) {
    contractCustomizations(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        attributes {
          footer {
            data {
              id
              attributes {
                accessibilityLevel
                cguSubService {
                  data {
                    id
                    attributes {
                      link
                    }
                  }
                }
                accessibilitySubService {
                  data {
                    id
                    attributes {
                      link
                    }
                  }
                }
                confidentialitySubService {
                  data {
                    id
                    attributes {
                      link
                    }
                  }
                }
                cookiesSubService {
                  data {
                    id
                    attributes {
                      link
                    }
                  }
                }
                contactUsSubService {
                  data {
                    id
                    attributes {
                      label
                      link
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetFooterPageQuery__
 *
 * To run a query within a React component, call `useGetFooterPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFooterPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFooterPageQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetFooterPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFooterPageQuery,
    GetFooterPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFooterPageQuery, GetFooterPageQueryVariables>(
    GetFooterPageDocument,
    options,
  );
}
export function useGetFooterPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFooterPageQuery,
    GetFooterPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetFooterPageQuery, GetFooterPageQueryVariables>(
    GetFooterPageDocument,
    options,
  );
}
export type GetFooterPageQueryHookResult = ReturnType<
  typeof useGetFooterPageQuery
>;
export type GetFooterPageLazyQueryHookResult = ReturnType<
  typeof useGetFooterPageLazyQuery
>;
export type GetFooterPageQueryResult = Apollo.QueryResult<
  GetFooterPageQuery,
  GetFooterPageQueryVariables
>;
export const UpdateFooterPageDocument = gql`
  mutation updateFooterPage(
    $updateFooterId: ID!
    $updateFooterData: FooterInput!
    $updateContactUsSubServiceId: ID!
    $updateContactUsSubServiceData: ContactUsSubServiceInput!
    $updateAccessibilitySubServiceId: ID!
    $updateAccessibilitySubServiceData: AccessibilitySubServiceInput!
    $updateCguSubServiceId: ID!
    $updateCguSubServiceData: CguSubServiceInput!
    $updateCookiesSubServiceId: ID!
    $updateCookiesSubServiceData: CookiesSubServiceInput!
    $updateConfidentialitySubServiceId: ID!
    $updateConfidentialitySubServiceData: ConfidentialitySubServiceInput!
  ) {
    updateFooter(id: $updateFooterId, data: $updateFooterData) {
      data {
        id
        attributes {
          accessibilityLevel
        }
      }
    }
    updateContactUsSubService(
      id: $updateContactUsSubServiceId
      data: $updateContactUsSubServiceData
    ) {
      data {
        attributes {
          label
          link
        }
      }
    }
    updateCguSubService(
      id: $updateCguSubServiceId
      data: $updateCguSubServiceData
    ) {
      data {
        attributes {
          link
        }
      }
    }
    updateAccessibilitySubService(
      id: $updateAccessibilitySubServiceId
      data: $updateAccessibilitySubServiceData
    ) {
      data {
        attributes {
          link
        }
      }
    }
    updateConfidentialitySubService(
      id: $updateConfidentialitySubServiceId
      data: $updateConfidentialitySubServiceData
    ) {
      data {
        attributes {
          link
        }
      }
    }
    updateCookiesSubService(
      id: $updateCookiesSubServiceId
      data: $updateCookiesSubServiceData
    ) {
      data {
        attributes {
          link
        }
      }
    }
  }
`;
export type UpdateFooterPageMutationFn = Apollo.MutationFunction<
  UpdateFooterPageMutation,
  UpdateFooterPageMutationVariables
>;

/**
 * __useUpdateFooterPageMutation__
 *
 * To run a mutation, you first call `useUpdateFooterPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFooterPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFooterPageMutation, { data, loading, error }] = useUpdateFooterPageMutation({
 *   variables: {
 *      updateFooterId: // value for 'updateFooterId'
 *      updateFooterData: // value for 'updateFooterData'
 *      updateContactUsSubServiceId: // value for 'updateContactUsSubServiceId'
 *      updateContactUsSubServiceData: // value for 'updateContactUsSubServiceData'
 *      updateAccessibilitySubServiceId: // value for 'updateAccessibilitySubServiceId'
 *      updateAccessibilitySubServiceData: // value for 'updateAccessibilitySubServiceData'
 *      updateCguSubServiceId: // value for 'updateCguSubServiceId'
 *      updateCguSubServiceData: // value for 'updateCguSubServiceData'
 *      updateCookiesSubServiceId: // value for 'updateCookiesSubServiceId'
 *      updateCookiesSubServiceData: // value for 'updateCookiesSubServiceData'
 *      updateConfidentialitySubServiceId: // value for 'updateConfidentialitySubServiceId'
 *      updateConfidentialitySubServiceData: // value for 'updateConfidentialitySubServiceData'
 *   },
 * });
 */
export function useUpdateFooterPageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFooterPageMutation,
    UpdateFooterPageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateFooterPageMutation,
    UpdateFooterPageMutationVariables
  >(UpdateFooterPageDocument, options);
}
export type UpdateFooterPageMutationHookResult = ReturnType<
  typeof useUpdateFooterPageMutation
>;
export type UpdateFooterPageMutationResult =
  Apollo.MutationResult<UpdateFooterPageMutation>;
export type UpdateFooterPageMutationOptions = Apollo.BaseMutationOptions<
  UpdateFooterPageMutation,
  UpdateFooterPageMutationVariables
>;
export const GetMenuPageDocument = gql`
  query getMenuPage($contractId: ID!) {
    contract(id: $contractId) {
      data {
        attributes {
          contractMenu {
            data {
              id
              attributes {
                serviceLinks {
                  ... on ComponentLinksDropOffMap {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksPickUpDay {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksRecyclingGuide {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksRequest {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksContactUs {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksNews {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksEvents {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksQuizzes {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksTips {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksFrees {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksMyWasteCounter {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                  }
                  ... on ComponentLinksExternal {
                    id
                    name
                    isDisplayed
                    picto {
                      data {
                        attributes {
                          url
                          alternativeText
                        }
                      }
                    }
                    externalLink
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetMenuPageQuery__
 *
 * To run a query within a React component, call `useGetMenuPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMenuPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMenuPageQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetMenuPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMenuPageQuery,
    GetMenuPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMenuPageQuery, GetMenuPageQueryVariables>(
    GetMenuPageDocument,
    options,
  );
}
export function useGetMenuPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMenuPageQuery,
    GetMenuPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMenuPageQuery, GetMenuPageQueryVariables>(
    GetMenuPageDocument,
    options,
  );
}
export type GetMenuPageQueryHookResult = ReturnType<typeof useGetMenuPageQuery>;
export type GetMenuPageLazyQueryHookResult = ReturnType<
  typeof useGetMenuPageLazyQuery
>;
export type GetMenuPageQueryResult = Apollo.QueryResult<
  GetMenuPageQuery,
  GetMenuPageQueryVariables
>;
export const UpdateMenuPageDocument = gql`
  mutation updateMenuPage($updateMenuPageId: ID!, $data: ContractMenuInput!) {
    updateContractMenu(id: $updateMenuPageId, data: $data) {
      data {
        attributes {
          serviceLinks {
            ... on ComponentLinksDropOffMap {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksPickUpDay {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksRecyclingGuide {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksRequest {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksContactUs {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksNews {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksEvents {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksQuizzes {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksTips {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksFrees {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            ... on ComponentLinksExternal {
              id
              name
              isDisplayed
              picto {
                data {
                  attributes {
                    url
                  }
                }
              }
              externalLink
            }
          }
        }
      }
    }
  }
`;
export type UpdateMenuPageMutationFn = Apollo.MutationFunction<
  UpdateMenuPageMutation,
  UpdateMenuPageMutationVariables
>;

/**
 * __useUpdateMenuPageMutation__
 *
 * To run a mutation, you first call `useUpdateMenuPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMenuPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMenuPageMutation, { data, loading, error }] = useUpdateMenuPageMutation({
 *   variables: {
 *      updateMenuPageId: // value for 'updateMenuPageId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMenuPageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMenuPageMutation,
    UpdateMenuPageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMenuPageMutation,
    UpdateMenuPageMutationVariables
  >(UpdateMenuPageDocument, options);
}
export type UpdateMenuPageMutationHookResult = ReturnType<
  typeof useUpdateMenuPageMutation
>;
export type UpdateMenuPageMutationResult =
  Apollo.MutationResult<UpdateMenuPageMutation>;
export type UpdateMenuPageMutationOptions = Apollo.BaseMutationOptions<
  UpdateMenuPageMutation,
  UpdateMenuPageMutationVariables
>;
export const CreateSectorizationDocument = gql`
  mutation createSectorization($data: SectorizationInput!) {
    createSectorization(data: $data) {
      data {
        id
        attributes {
          createdAt
          description
          name
          polygonCoordinates
          updatedAt
        }
      }
    }
  }
`;
export type CreateSectorizationMutationFn = Apollo.MutationFunction<
  CreateSectorizationMutation,
  CreateSectorizationMutationVariables
>;

/**
 * __useCreateSectorizationMutation__
 *
 * To run a mutation, you first call `useCreateSectorizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSectorizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSectorizationMutation, { data, loading, error }] = useCreateSectorizationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateSectorizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSectorizationMutation,
    CreateSectorizationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSectorizationMutation,
    CreateSectorizationMutationVariables
  >(CreateSectorizationDocument, options);
}
export type CreateSectorizationMutationHookResult = ReturnType<
  typeof useCreateSectorizationMutation
>;
export type CreateSectorizationMutationResult =
  Apollo.MutationResult<CreateSectorizationMutation>;
export type CreateSectorizationMutationOptions = Apollo.BaseMutationOptions<
  CreateSectorizationMutation,
  CreateSectorizationMutationVariables
>;
export const DeleteSectorizationDocument = gql`
  mutation deleteSectorization($deleteSectorizationId: ID!) {
    deleteSectorization(id: $deleteSectorizationId) {
      data {
        id
        attributes {
          createdAt
          description
          name
          polygonCoordinates
          updatedAt
        }
      }
    }
  }
`;
export type DeleteSectorizationMutationFn = Apollo.MutationFunction<
  DeleteSectorizationMutation,
  DeleteSectorizationMutationVariables
>;

/**
 * __useDeleteSectorizationMutation__
 *
 * To run a mutation, you first call `useDeleteSectorizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSectorizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSectorizationMutation, { data, loading, error }] = useDeleteSectorizationMutation({
 *   variables: {
 *      deleteSectorizationId: // value for 'deleteSectorizationId'
 *   },
 * });
 */
export function useDeleteSectorizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSectorizationMutation,
    DeleteSectorizationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteSectorizationMutation,
    DeleteSectorizationMutationVariables
  >(DeleteSectorizationDocument, options);
}
export type DeleteSectorizationMutationHookResult = ReturnType<
  typeof useDeleteSectorizationMutation
>;
export type DeleteSectorizationMutationResult =
  Apollo.MutationResult<DeleteSectorizationMutation>;
export type DeleteSectorizationMutationOptions = Apollo.BaseMutationOptions<
  DeleteSectorizationMutation,
  DeleteSectorizationMutationVariables
>;
export const GetSectorizationByCityDocument = gql`
  query getSectorizationByCity($postalCode: Int!) {
    sectorizationByCity(postalCode: $postalCode) {
      GeoJson
    }
  }
`;

/**
 * __useGetSectorizationByCityQuery__
 *
 * To run a query within a React component, call `useGetSectorizationByCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectorizationByCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectorizationByCityQuery({
 *   variables: {
 *      postalCode: // value for 'postalCode'
 *   },
 * });
 */
export function useGetSectorizationByCityQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSectorizationByCityQuery,
    GetSectorizationByCityQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSectorizationByCityQuery,
    GetSectorizationByCityQueryVariables
  >(GetSectorizationByCityDocument, options);
}
export function useGetSectorizationByCityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSectorizationByCityQuery,
    GetSectorizationByCityQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSectorizationByCityQuery,
    GetSectorizationByCityQueryVariables
  >(GetSectorizationByCityDocument, options);
}
export type GetSectorizationByCityQueryHookResult = ReturnType<
  typeof useGetSectorizationByCityQuery
>;
export type GetSectorizationByCityLazyQueryHookResult = ReturnType<
  typeof useGetSectorizationByCityLazyQuery
>;
export type GetSectorizationByCityQueryResult = Apollo.QueryResult<
  GetSectorizationByCityQuery,
  GetSectorizationByCityQueryVariables
>;
export const GetSectorizationByContractIdDocument = gql`
  query getSectorizationByContractId($sectorizationId: ID) {
    sectorization(id: $sectorizationId) {
      data {
        attributes {
          name
          description
          polygonCoordinates
        }
      }
    }
  }
`;

/**
 * __useGetSectorizationByContractIdQuery__
 *
 * To run a query within a React component, call `useGetSectorizationByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectorizationByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectorizationByContractIdQuery({
 *   variables: {
 *      sectorizationId: // value for 'sectorizationId'
 *   },
 * });
 */
export function useGetSectorizationByContractIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSectorizationByContractIdQuery,
    GetSectorizationByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSectorizationByContractIdQuery,
    GetSectorizationByContractIdQueryVariables
  >(GetSectorizationByContractIdDocument, options);
}
export function useGetSectorizationByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSectorizationByContractIdQuery,
    GetSectorizationByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSectorizationByContractIdQuery,
    GetSectorizationByContractIdQueryVariables
  >(GetSectorizationByContractIdDocument, options);
}
export type GetSectorizationByContractIdQueryHookResult = ReturnType<
  typeof useGetSectorizationByContractIdQuery
>;
export type GetSectorizationByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetSectorizationByContractIdLazyQuery
>;
export type GetSectorizationByContractIdQueryResult = Apollo.QueryResult<
  GetSectorizationByContractIdQuery,
  GetSectorizationByContractIdQueryVariables
>;
export const GetSectorizationsByContractIdDocument = gql`
  query getSectorizationsByContractId(
    $contractId: ID!
    $pagination: PaginationArg
    $sort: [String]
  ) {
    sectorizations(
      filters: { contract: { id: { eq: $contractId } } }
      pagination: $pagination
      sort: $sort
    ) {
      data {
        id
        attributes {
          createdAt
          description
          name
          updatedAt
          polygonCoordinates
        }
      }
      meta {
        pagination {
          total
          pageSize
          page
          pageCount
        }
      }
    }
  }
`;

/**
 * __useGetSectorizationsByContractIdQuery__
 *
 * To run a query within a React component, call `useGetSectorizationsByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectorizationsByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectorizationsByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetSectorizationsByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSectorizationsByContractIdQuery,
    GetSectorizationsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSectorizationsByContractIdQuery,
    GetSectorizationsByContractIdQueryVariables
  >(GetSectorizationsByContractIdDocument, options);
}
export function useGetSectorizationsByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSectorizationsByContractIdQuery,
    GetSectorizationsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSectorizationsByContractIdQuery,
    GetSectorizationsByContractIdQueryVariables
  >(GetSectorizationsByContractIdDocument, options);
}
export type GetSectorizationsByContractIdQueryHookResult = ReturnType<
  typeof useGetSectorizationsByContractIdQuery
>;
export type GetSectorizationsByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetSectorizationsByContractIdLazyQuery
>;
export type GetSectorizationsByContractIdQueryResult = Apollo.QueryResult<
  GetSectorizationsByContractIdQuery,
  GetSectorizationsByContractIdQueryVariables
>;
export const UpdateSectorizationDocument = gql`
  mutation UpdateSectorization(
    $updateSectorizationId: ID!
    $data: SectorizationInput!
  ) {
    updateSectorization(id: $updateSectorizationId, data: $data) {
      data {
        id
        attributes {
          name
          description
          polygonCoordinates
          updatedAt
          createdAt
        }
      }
    }
  }
`;
export type UpdateSectorizationMutationFn = Apollo.MutationFunction<
  UpdateSectorizationMutation,
  UpdateSectorizationMutationVariables
>;

/**
 * __useUpdateSectorizationMutation__
 *
 * To run a mutation, you first call `useUpdateSectorizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSectorizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSectorizationMutation, { data, loading, error }] = useUpdateSectorizationMutation({
 *   variables: {
 *      updateSectorizationId: // value for 'updateSectorizationId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSectorizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSectorizationMutation,
    UpdateSectorizationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateSectorizationMutation,
    UpdateSectorizationMutationVariables
  >(UpdateSectorizationDocument, options);
}
export type UpdateSectorizationMutationHookResult = ReturnType<
  typeof useUpdateSectorizationMutation
>;
export type UpdateSectorizationMutationResult =
  Apollo.MutationResult<UpdateSectorizationMutation>;
export type UpdateSectorizationMutationOptions = Apollo.BaseMutationOptions<
  UpdateSectorizationMutation,
  UpdateSectorizationMutationVariables
>;
export const CreateDropOffMapDocument = gql`
  mutation createDropOffMap($data: DropOffMapInput!) {
    createDropOffMap(data: $data) {
      data {
        id
        attributes {
          name
          address
          latitude
          longitude
          phoneNumber
          mustKnow
          dropOffMapService {
            data {
              id
            }
          }
          collectDropOff {
            data {
              id
              attributes {
                name
              }
            }
          }
          collectVoluntary {
            data {
              id
              attributes {
                name
              }
            }
          }
          downloadableFiles {
            id
            linkText
            file {
              data {
                id
                attributes {
                  name
                  alternativeText
                  hash
                  mime
                  size
                  url
                  provider
                }
              }
            }
          }
          openingHoursBlocks {
            ... on ComponentBlocksOpeningDay {
              id
              weekDay
              morningStart
              morningEnd
              afterNoonStart
              afterNoonEnd
            }
          }
        }
      }
    }
  }
`;
export type CreateDropOffMapMutationFn = Apollo.MutationFunction<
  CreateDropOffMapMutation,
  CreateDropOffMapMutationVariables
>;

/**
 * __useCreateDropOffMapMutation__
 *
 * To run a mutation, you first call `useCreateDropOffMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDropOffMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDropOffMapMutation, { data, loading, error }] = useCreateDropOffMapMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDropOffMapMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDropOffMapMutation,
    CreateDropOffMapMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateDropOffMapMutation,
    CreateDropOffMapMutationVariables
  >(CreateDropOffMapDocument, options);
}
export type CreateDropOffMapMutationHookResult = ReturnType<
  typeof useCreateDropOffMapMutation
>;
export type CreateDropOffMapMutationResult =
  Apollo.MutationResult<CreateDropOffMapMutation>;
export type CreateDropOffMapMutationOptions = Apollo.BaseMutationOptions<
  CreateDropOffMapMutation,
  CreateDropOffMapMutationVariables
>;
export const DeleteDropOffMapDocument = gql`
  mutation deleteDropOffMap($deleteDropOffMapId: ID!) {
    deleteDropOffMap(id: $deleteDropOffMapId) {
      data {
        id
      }
    }
  }
`;
export type DeleteDropOffMapMutationFn = Apollo.MutationFunction<
  DeleteDropOffMapMutation,
  DeleteDropOffMapMutationVariables
>;

/**
 * __useDeleteDropOffMapMutation__
 *
 * To run a mutation, you first call `useDeleteDropOffMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDropOffMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDropOffMapMutation, { data, loading, error }] = useDeleteDropOffMapMutation({
 *   variables: {
 *      deleteDropOffMapId: // value for 'deleteDropOffMapId'
 *   },
 * });
 */
export function useDeleteDropOffMapMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteDropOffMapMutation,
    DeleteDropOffMapMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteDropOffMapMutation,
    DeleteDropOffMapMutationVariables
  >(DeleteDropOffMapDocument, options);
}
export type DeleteDropOffMapMutationHookResult = ReturnType<
  typeof useDeleteDropOffMapMutation
>;
export type DeleteDropOffMapMutationResult =
  Apollo.MutationResult<DeleteDropOffMapMutation>;
export type DeleteDropOffMapMutationOptions = Apollo.BaseMutationOptions<
  DeleteDropOffMapMutation,
  DeleteDropOffMapMutationVariables
>;
export const GetDropOffMapByIdDocument = gql`
  query getDropOffMapById($dropOffMapId: ID!) {
    dropOffMap(id: $dropOffMapId) {
      data {
        id
        attributes {
          name
          address
          latitude
          longitude
          phoneNumber
          mustKnow
          dropOffMapService {
            data {
              id
            }
          }
          collectDropOff {
            data {
              id
              attributes {
                name
              }
            }
          }
          collectVoluntary {
            data {
              id
              attributes {
                name
              }
            }
          }
          downloadableFiles {
            id
            linkText
            file {
              data {
                id
                attributes {
                  name
                  alternativeText
                  hash
                  mime
                  size
                  url
                  provider
                }
              }
            }
          }
          openingHoursBlocks {
            ... on ComponentBlocksOpeningDay {
              id
              weekDay
              morningStart
              morningEnd
              afterNoonStart
              afterNoonEnd
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetDropOffMapByIdQuery__
 *
 * To run a query within a React component, call `useGetDropOffMapByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDropOffMapByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDropOffMapByIdQuery({
 *   variables: {
 *      dropOffMapId: // value for 'dropOffMapId'
 *   },
 * });
 */
export function useGetDropOffMapByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetDropOffMapByIdQuery,
    GetDropOffMapByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetDropOffMapByIdQuery,
    GetDropOffMapByIdQueryVariables
  >(GetDropOffMapByIdDocument, options);
}
export function useGetDropOffMapByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDropOffMapByIdQuery,
    GetDropOffMapByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetDropOffMapByIdQuery,
    GetDropOffMapByIdQueryVariables
  >(GetDropOffMapByIdDocument, options);
}
export type GetDropOffMapByIdQueryHookResult = ReturnType<
  typeof useGetDropOffMapByIdQuery
>;
export type GetDropOffMapByIdLazyQueryHookResult = ReturnType<
  typeof useGetDropOffMapByIdLazyQuery
>;
export type GetDropOffMapByIdQueryResult = Apollo.QueryResult<
  GetDropOffMapByIdQuery,
  GetDropOffMapByIdQueryVariables
>;
export const GetDropOffMapByDropOffMapByServiceIdDocument = gql`
  query getDropOffMapByDropOffMapByServiceId(
    $contractId: ID!
    $pagination: PaginationArg
    $sort: [String]
  ) {
    dropOffMaps(
      filters: { dropOffMapService: { contract: { id: { eq: $contractId } } } }
      pagination: $pagination
      sort: $sort
    ) {
      data {
        id
        attributes {
          createdAt
          description
          name
          updatedAt
          address
          latitude
          longitude
          city
          collectDropOff {
            data {
              attributes {
                name
                picto {
                  data {
                    attributes {
                      url
                      name
                    }
                    id
                  }
                }
              }
            }
          }
          collectVoluntary {
            data {
              attributes {
                name
                picto {
                  data {
                    id
                    attributes {
                      name
                      url
                    }
                  }
                }
              }
              id
            }
          }
        }
      }
      meta {
        pagination {
          total
          pageSize
          page
          pageCount
        }
      }
    }
  }
`;

/**
 * __useGetDropOffMapByDropOffMapByServiceIdQuery__
 *
 * To run a query within a React component, call `useGetDropOffMapByDropOffMapByServiceIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDropOffMapByDropOffMapByServiceIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDropOffMapByDropOffMapByServiceIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetDropOffMapByDropOffMapByServiceIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetDropOffMapByDropOffMapByServiceIdQuery,
    GetDropOffMapByDropOffMapByServiceIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetDropOffMapByDropOffMapByServiceIdQuery,
    GetDropOffMapByDropOffMapByServiceIdQueryVariables
  >(GetDropOffMapByDropOffMapByServiceIdDocument, options);
}
export function useGetDropOffMapByDropOffMapByServiceIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDropOffMapByDropOffMapByServiceIdQuery,
    GetDropOffMapByDropOffMapByServiceIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetDropOffMapByDropOffMapByServiceIdQuery,
    GetDropOffMapByDropOffMapByServiceIdQueryVariables
  >(GetDropOffMapByDropOffMapByServiceIdDocument, options);
}
export type GetDropOffMapByDropOffMapByServiceIdQueryHookResult = ReturnType<
  typeof useGetDropOffMapByDropOffMapByServiceIdQuery
>;
export type GetDropOffMapByDropOffMapByServiceIdLazyQueryHookResult =
  ReturnType<typeof useGetDropOffMapByDropOffMapByServiceIdLazyQuery>;
export type GetDropOffMapByDropOffMapByServiceIdQueryResult =
  Apollo.QueryResult<
    GetDropOffMapByDropOffMapByServiceIdQuery,
    GetDropOffMapByDropOffMapByServiceIdQueryVariables
  >;
export const UpdateDropOffMapDocument = gql`
  mutation updateDropOffMap($updateDropOffMapId: ID!, $data: DropOffMapInput!) {
    updateDropOffMap(id: $updateDropOffMapId, data: $data) {
      data {
        id
        attributes {
          name
          address
          latitude
          longitude
          phoneNumber
          mustKnow
          dropOffMapService {
            data {
              id
            }
          }
          collectDropOff {
            data {
              id
              attributes {
                name
              }
            }
          }
          collectVoluntary {
            data {
              id
              attributes {
                name
              }
            }
          }
          downloadableFiles {
            id
            linkText
            file {
              data {
                id
                attributes {
                  name
                  alternativeText
                  hash
                  mime
                  size
                  url
                  provider
                }
              }
            }
          }
          openingHoursBlocks {
            ... on ComponentBlocksOpeningDay {
              id
              weekDay
              morningStart
              morningEnd
              afterNoonStart
              afterNoonEnd
            }
          }
        }
      }
    }
  }
`;
export type UpdateDropOffMapMutationFn = Apollo.MutationFunction<
  UpdateDropOffMapMutation,
  UpdateDropOffMapMutationVariables
>;

/**
 * __useUpdateDropOffMapMutation__
 *
 * To run a mutation, you first call `useUpdateDropOffMapMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDropOffMapMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDropOffMapMutation, { data, loading, error }] = useUpdateDropOffMapMutation({
 *   variables: {
 *      updateDropOffMapId: // value for 'updateDropOffMapId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDropOffMapMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDropOffMapMutation,
    UpdateDropOffMapMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateDropOffMapMutation,
    UpdateDropOffMapMutationVariables
  >(UpdateDropOffMapDocument, options);
}
export type UpdateDropOffMapMutationHookResult = ReturnType<
  typeof useUpdateDropOffMapMutation
>;
export type UpdateDropOffMapMutationResult =
  Apollo.MutationResult<UpdateDropOffMapMutation>;
export type UpdateDropOffMapMutationOptions = Apollo.BaseMutationOptions<
  UpdateDropOffMapMutation,
  UpdateDropOffMapMutationVariables
>;
export const CreateRequestAggregateDocument = gql`
  mutation createRequestAggregate($data: RequestAggregateInput!) {
    createRequestAggregate(data: $data) {
      data {
        id
        attributes {
          name
          requestService {
            data {
              id
            }
          }
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export type CreateRequestAggregateMutationFn = Apollo.MutationFunction<
  CreateRequestAggregateMutation,
  CreateRequestAggregateMutationVariables
>;

/**
 * __useCreateRequestAggregateMutation__
 *
 * To run a mutation, you first call `useCreateRequestAggregateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestAggregateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestAggregateMutation, { data, loading, error }] = useCreateRequestAggregateMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRequestAggregateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRequestAggregateMutation,
    CreateRequestAggregateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateRequestAggregateMutation,
    CreateRequestAggregateMutationVariables
  >(CreateRequestAggregateDocument, options);
}
export type CreateRequestAggregateMutationHookResult = ReturnType<
  typeof useCreateRequestAggregateMutation
>;
export type CreateRequestAggregateMutationResult =
  Apollo.MutationResult<CreateRequestAggregateMutation>;
export type CreateRequestAggregateMutationOptions = Apollo.BaseMutationOptions<
  CreateRequestAggregateMutation,
  CreateRequestAggregateMutationVariables
>;
export const CreateRequestByContractIdDocument = gql`
  mutation createRequestByContractId($data: RequestInput!) {
    createRequest(data: $data) {
      data {
        id
      }
    }
  }
`;
export type CreateRequestByContractIdMutationFn = Apollo.MutationFunction<
  CreateRequestByContractIdMutation,
  CreateRequestByContractIdMutationVariables
>;

/**
 * __useCreateRequestByContractIdMutation__
 *
 * To run a mutation, you first call `useCreateRequestByContractIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestByContractIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestByContractIdMutation, { data, loading, error }] = useCreateRequestByContractIdMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateRequestByContractIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRequestByContractIdMutation,
    CreateRequestByContractIdMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateRequestByContractIdMutation,
    CreateRequestByContractIdMutationVariables
  >(CreateRequestByContractIdDocument, options);
}
export type CreateRequestByContractIdMutationHookResult = ReturnType<
  typeof useCreateRequestByContractIdMutation
>;
export type CreateRequestByContractIdMutationResult =
  Apollo.MutationResult<CreateRequestByContractIdMutation>;
export type CreateRequestByContractIdMutationOptions =
  Apollo.BaseMutationOptions<
    CreateRequestByContractIdMutation,
    CreateRequestByContractIdMutationVariables
  >;
export const DeleteRequestAggregateByIdDocument = gql`
  mutation deleteRequestAggregateById($deleteRequestAggregateId: ID!) {
    deleteRequestAggregate(id: $deleteRequestAggregateId) {
      data {
        id
      }
    }
  }
`;
export type DeleteRequestAggregateByIdMutationFn = Apollo.MutationFunction<
  DeleteRequestAggregateByIdMutation,
  DeleteRequestAggregateByIdMutationVariables
>;

/**
 * __useDeleteRequestAggregateByIdMutation__
 *
 * To run a mutation, you first call `useDeleteRequestAggregateByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRequestAggregateByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRequestAggregateByIdMutation, { data, loading, error }] = useDeleteRequestAggregateByIdMutation({
 *   variables: {
 *      deleteRequestAggregateId: // value for 'deleteRequestAggregateId'
 *   },
 * });
 */
export function useDeleteRequestAggregateByIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRequestAggregateByIdMutation,
    DeleteRequestAggregateByIdMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteRequestAggregateByIdMutation,
    DeleteRequestAggregateByIdMutationVariables
  >(DeleteRequestAggregateByIdDocument, options);
}
export type DeleteRequestAggregateByIdMutationHookResult = ReturnType<
  typeof useDeleteRequestAggregateByIdMutation
>;
export type DeleteRequestAggregateByIdMutationResult =
  Apollo.MutationResult<DeleteRequestAggregateByIdMutation>;
export type DeleteRequestAggregateByIdMutationOptions =
  Apollo.BaseMutationOptions<
    DeleteRequestAggregateByIdMutation,
    DeleteRequestAggregateByIdMutationVariables
  >;
export const DeleteRequestByIdDocument = gql`
  mutation deleteRequestById($deleteRequestId: ID!) {
    deleteRequest(id: $deleteRequestId) {
      data {
        id
      }
    }
  }
`;
export type DeleteRequestByIdMutationFn = Apollo.MutationFunction<
  DeleteRequestByIdMutation,
  DeleteRequestByIdMutationVariables
>;

/**
 * __useDeleteRequestByIdMutation__
 *
 * To run a mutation, you first call `useDeleteRequestByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRequestByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRequestByIdMutation, { data, loading, error }] = useDeleteRequestByIdMutation({
 *   variables: {
 *      deleteRequestId: // value for 'deleteRequestId'
 *   },
 * });
 */
export function useDeleteRequestByIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRequestByIdMutation,
    DeleteRequestByIdMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteRequestByIdMutation,
    DeleteRequestByIdMutationVariables
  >(DeleteRequestByIdDocument, options);
}
export type DeleteRequestByIdMutationHookResult = ReturnType<
  typeof useDeleteRequestByIdMutation
>;
export type DeleteRequestByIdMutationResult =
  Apollo.MutationResult<DeleteRequestByIdMutation>;
export type DeleteRequestByIdMutationOptions = Apollo.BaseMutationOptions<
  DeleteRequestByIdMutation,
  DeleteRequestByIdMutationVariables
>;
export const GetRequestAggregatesByContractIdDocument = gql`
  query getRequestAggregatesByContractId(
    $contractId: ID!
    $pagination: PaginationArg
    $sort: [String]
  ) {
    requestAggregates(
      filters: { requestService: { contract: { id: { eq: $contractId } } } }
      pagination: $pagination
      sort: $sort
    ) {
      data {
        id
        attributes {
          name
          requests {
            data {
              id
            }
          }
        }
      }
      meta {
        pagination {
          total
          page
          pageSize
          pageCount
        }
      }
    }
  }
`;

/**
 * __useGetRequestAggregatesByContractIdQuery__
 *
 * To run a query within a React component, call `useGetRequestAggregatesByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestAggregatesByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestAggregatesByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetRequestAggregatesByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRequestAggregatesByContractIdQuery,
    GetRequestAggregatesByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRequestAggregatesByContractIdQuery,
    GetRequestAggregatesByContractIdQueryVariables
  >(GetRequestAggregatesByContractIdDocument, options);
}
export function useGetRequestAggregatesByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRequestAggregatesByContractIdQuery,
    GetRequestAggregatesByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRequestAggregatesByContractIdQuery,
    GetRequestAggregatesByContractIdQueryVariables
  >(GetRequestAggregatesByContractIdDocument, options);
}
export type GetRequestAggregatesByContractIdQueryHookResult = ReturnType<
  typeof useGetRequestAggregatesByContractIdQuery
>;
export type GetRequestAggregatesByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetRequestAggregatesByContractIdLazyQuery
>;
export type GetRequestAggregatesByContractIdQueryResult = Apollo.QueryResult<
  GetRequestAggregatesByContractIdQuery,
  GetRequestAggregatesByContractIdQueryVariables
>;
export const GetRequestByIdDocument = gql`
  query getRequestById($requestId: ID) {
    request(id: $requestId) {
      data {
        id
        attributes {
          name
          description
          blockText
          isActivated
          hasSeveralRequestTypes
          requestService {
            data {
              id
            }
          }
          requestAggregate {
            data {
              id
              attributes {
                name
              }
            }
          }
          requestType {
            id
            title
            isEmail
            email
          }
          hasAddress
          fieldAddressLabel
          addableBlocks {
            ... on ComponentBlocksAttachments {
              id
              attachmentLabel
              renderField
              multipleAttachments
            }
            ... on ComponentBlocksQuestions {
              id
              height
              questionTextLabel
              questionTextPlaceholder
              textStatus
            }
            ... on ComponentBlocksDateChoice {
              id
              fieldStatus
              fieldLabelDateChoice
            }
            ... on ComponentBlocksQcm {
              id
              fieldStatusQCM
              fieldLabelQCM
              responses
              multipleChoice
            }
            ... on ComponentBlocksCheckbox {
              id
              fieldStatusCheckbox
              labelCheckbox
            }
          }
          requestType {
            id
            title
            isEmail
            email
            isTSMS
          }
          hasUser
          displayUserCivility
          isUserNameMandatory
          isUserEmailMandatory
          isUserPhoneMandatory
          userAllowSMSNotification
        }
      }
    }
  }
`;

/**
 * __useGetRequestByIdQuery__
 *
 * To run a query within a React component, call `useGetRequestByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestByIdQuery({
 *   variables: {
 *      requestId: // value for 'requestId'
 *   },
 * });
 */
export function useGetRequestByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetRequestByIdQuery,
    GetRequestByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetRequestByIdQuery, GetRequestByIdQueryVariables>(
    GetRequestByIdDocument,
    options,
  );
}
export function useGetRequestByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRequestByIdQuery,
    GetRequestByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetRequestByIdQuery, GetRequestByIdQueryVariables>(
    GetRequestByIdDocument,
    options,
  );
}
export type GetRequestByIdQueryHookResult = ReturnType<
  typeof useGetRequestByIdQuery
>;
export type GetRequestByIdLazyQueryHookResult = ReturnType<
  typeof useGetRequestByIdLazyQuery
>;
export type GetRequestByIdQueryResult = Apollo.QueryResult<
  GetRequestByIdQuery,
  GetRequestByIdQueryVariables
>;
export const GetRequestsByContractIdDocument = gql`
  query getRequestsByContractId(
    $contractId: ID!
    $pagination: PaginationArg
    $sort: [String]
  ) {
    requests(
      filters: { requestService: { contract: { id: { eq: $contractId } } } }
      pagination: $pagination
      sort: $sort
    ) {
      data {
        id
        attributes {
          requestType {
            email
            id
            title
            isEmail
            isTSMS
          }
          name
          isActivated
          hasSeveralRequestTypes
          updatedAt
          createdAt
        }
      }
      meta {
        pagination {
          page
          pageCount
          pageSize
          total
        }
      }
    }
  }
`;

/**
 * __useGetRequestsByContractIdQuery__
 *
 * To run a query within a React component, call `useGetRequestsByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRequestsByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRequestsByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetRequestsByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRequestsByContractIdQuery,
    GetRequestsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRequestsByContractIdQuery,
    GetRequestsByContractIdQueryVariables
  >(GetRequestsByContractIdDocument, options);
}
export function useGetRequestsByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRequestsByContractIdQuery,
    GetRequestsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRequestsByContractIdQuery,
    GetRequestsByContractIdQueryVariables
  >(GetRequestsByContractIdDocument, options);
}
export type GetRequestsByContractIdQueryHookResult = ReturnType<
  typeof useGetRequestsByContractIdQuery
>;
export type GetRequestsByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetRequestsByContractIdLazyQuery
>;
export type GetRequestsByContractIdQueryResult = Apollo.QueryResult<
  GetRequestsByContractIdQuery,
  GetRequestsByContractIdQueryVariables
>;
export const UpdateRequestAggregateDocument = gql`
  mutation updateRequestAggregate(
    $updateRequestAggregateId: ID!
    $data: RequestAggregateInput!
  ) {
    updateRequestAggregate(id: $updateRequestAggregateId, data: $data) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
export type UpdateRequestAggregateMutationFn = Apollo.MutationFunction<
  UpdateRequestAggregateMutation,
  UpdateRequestAggregateMutationVariables
>;

/**
 * __useUpdateRequestAggregateMutation__
 *
 * To run a mutation, you first call `useUpdateRequestAggregateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRequestAggregateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRequestAggregateMutation, { data, loading, error }] = useUpdateRequestAggregateMutation({
 *   variables: {
 *      updateRequestAggregateId: // value for 'updateRequestAggregateId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateRequestAggregateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRequestAggregateMutation,
    UpdateRequestAggregateMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateRequestAggregateMutation,
    UpdateRequestAggregateMutationVariables
  >(UpdateRequestAggregateDocument, options);
}
export type UpdateRequestAggregateMutationHookResult = ReturnType<
  typeof useUpdateRequestAggregateMutation
>;
export type UpdateRequestAggregateMutationResult =
  Apollo.MutationResult<UpdateRequestAggregateMutation>;
export type UpdateRequestAggregateMutationOptions = Apollo.BaseMutationOptions<
  UpdateRequestAggregateMutation,
  UpdateRequestAggregateMutationVariables
>;
export const UpdateRequestByIdDocument = gql`
  mutation updateRequestById($updateRequestId: ID!, $data: RequestInput!) {
    updateRequest(id: $updateRequestId, data: $data) {
      data {
        id
      }
    }
  }
`;
export type UpdateRequestByIdMutationFn = Apollo.MutationFunction<
  UpdateRequestByIdMutation,
  UpdateRequestByIdMutationVariables
>;

/**
 * __useUpdateRequestByIdMutation__
 *
 * To run a mutation, you first call `useUpdateRequestByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRequestByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRequestByIdMutation, { data, loading, error }] = useUpdateRequestByIdMutation({
 *   variables: {
 *      updateRequestId: // value for 'updateRequestId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateRequestByIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRequestByIdMutation,
    UpdateRequestByIdMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateRequestByIdMutation,
    UpdateRequestByIdMutationVariables
  >(UpdateRequestByIdDocument, options);
}
export type UpdateRequestByIdMutationHookResult = ReturnType<
  typeof useUpdateRequestByIdMutation
>;
export type UpdateRequestByIdMutationResult =
  Apollo.MutationResult<UpdateRequestByIdMutation>;
export type UpdateRequestByIdMutationOptions = Apollo.BaseMutationOptions<
  UpdateRequestByIdMutation,
  UpdateRequestByIdMutationVariables
>;
export const GetWasteFamiliesDocument = gql`
  query getWasteFamilies($contractId: ID, $sort: [String]) {
    recyclingGuideService(id: $contractId) {
      data {
        id
        attributes {
          wasteFamilies(sort: $sort) {
            data {
              id
              attributes {
                familyName
                isSystem
                wasteForms {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetWasteFamiliesQuery__
 *
 * To run a query within a React component, call `useGetWasteFamiliesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWasteFamiliesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWasteFamiliesQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetWasteFamiliesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetWasteFamiliesQuery,
    GetWasteFamiliesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetWasteFamiliesQuery, GetWasteFamiliesQueryVariables>(
    GetWasteFamiliesDocument,
    options,
  );
}
export function useGetWasteFamiliesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWasteFamiliesQuery,
    GetWasteFamiliesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWasteFamiliesQuery,
    GetWasteFamiliesQueryVariables
  >(GetWasteFamiliesDocument, options);
}
export type GetWasteFamiliesQueryHookResult = ReturnType<
  typeof useGetWasteFamiliesQuery
>;
export type GetWasteFamiliesLazyQueryHookResult = ReturnType<
  typeof useGetWasteFamiliesLazyQuery
>;
export type GetWasteFamiliesQueryResult = Apollo.QueryResult<
  GetWasteFamiliesQuery,
  GetWasteFamiliesQueryVariables
>;
export const GetWasteFamiliesByContractIdDocument = gql`
  query getWasteFamiliesByContractId($contractId: ID) {
    recyclingGuideService(id: $contractId) {
      data {
        id
        attributes {
          wasteFamilies {
            data {
              id
              attributes {
                familyName
                isSystem
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetWasteFamiliesByContractIdQuery__
 *
 * To run a query within a React component, call `useGetWasteFamiliesByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWasteFamiliesByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWasteFamiliesByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetWasteFamiliesByContractIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetWasteFamiliesByContractIdQuery,
    GetWasteFamiliesByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetWasteFamiliesByContractIdQuery,
    GetWasteFamiliesByContractIdQueryVariables
  >(GetWasteFamiliesByContractIdDocument, options);
}
export function useGetWasteFamiliesByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWasteFamiliesByContractIdQuery,
    GetWasteFamiliesByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWasteFamiliesByContractIdQuery,
    GetWasteFamiliesByContractIdQueryVariables
  >(GetWasteFamiliesByContractIdDocument, options);
}
export type GetWasteFamiliesByContractIdQueryHookResult = ReturnType<
  typeof useGetWasteFamiliesByContractIdQuery
>;
export type GetWasteFamiliesByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetWasteFamiliesByContractIdLazyQuery
>;
export type GetWasteFamiliesByContractIdQueryResult = Apollo.QueryResult<
  GetWasteFamiliesByContractIdQuery,
  GetWasteFamiliesByContractIdQueryVariables
>;
export const UpdateWasteFamilyDocument = gql`
  mutation UpdateWasteFamily(
    $updateWasteFamilyId: ID!
    $data: WasteFamilyInput!
  ) {
    updateWasteFamily(id: $updateWasteFamilyId, data: $data) {
      data {
        id
        attributes {
          familyName
          createdAt
          updatedAt
          isSystem
        }
      }
    }
  }
`;
export type UpdateWasteFamilyMutationFn = Apollo.MutationFunction<
  UpdateWasteFamilyMutation,
  UpdateWasteFamilyMutationVariables
>;

/**
 * __useUpdateWasteFamilyMutation__
 *
 * To run a mutation, you first call `useUpdateWasteFamilyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWasteFamilyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWasteFamilyMutation, { data, loading, error }] = useUpdateWasteFamilyMutation({
 *   variables: {
 *      updateWasteFamilyId: // value for 'updateWasteFamilyId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateWasteFamilyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateWasteFamilyMutation,
    UpdateWasteFamilyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateWasteFamilyMutation,
    UpdateWasteFamilyMutationVariables
  >(UpdateWasteFamilyDocument, options);
}
export type UpdateWasteFamilyMutationHookResult = ReturnType<
  typeof useUpdateWasteFamilyMutation
>;
export type UpdateWasteFamilyMutationResult =
  Apollo.MutationResult<UpdateWasteFamilyMutation>;
export type UpdateWasteFamilyMutationOptions = Apollo.BaseMutationOptions<
  UpdateWasteFamilyMutation,
  UpdateWasteFamilyMutationVariables
>;
export const GetAllVersionsOfWasteFormByCustomIdDocument = gql`
  query getAllVersionsOfWasteFormByCustomId(
    $contractId: ID!
    $customId: String
    $statusFilter: StringFilterInput
    $sort: [String]
    $pagination: PaginationArg
  ) {
    wasteFormsCount: wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
        customId: { eq: $customId }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    wasteFormsCountDraft: wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
        customId: { eq: $customId }
        status: { eq: "draft" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    wasteFormsCountPublished: wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
        customId: { eq: $customId }
        status: { eq: "published" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    wasteFormsCountArchived: wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
        customId: { eq: $customId }
        status: { eq: "archived" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
        customId: { eq: $customId }
        status: $statusFilter
      }
      sort: $sort
      pagination: $pagination
    ) {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
      data {
        id
        attributes {
          versionNumber
          status
          publishedDate
          updatedAt
        }
      }
    }
  }
`;

/**
 * __useGetAllVersionsOfWasteFormByCustomIdQuery__
 *
 * To run a query within a React component, call `useGetAllVersionsOfWasteFormByCustomIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllVersionsOfWasteFormByCustomIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllVersionsOfWasteFormByCustomIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      customId: // value for 'customId'
 *      statusFilter: // value for 'statusFilter'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetAllVersionsOfWasteFormByCustomIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAllVersionsOfWasteFormByCustomIdQuery,
    GetAllVersionsOfWasteFormByCustomIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetAllVersionsOfWasteFormByCustomIdQuery,
    GetAllVersionsOfWasteFormByCustomIdQueryVariables
  >(GetAllVersionsOfWasteFormByCustomIdDocument, options);
}
export function useGetAllVersionsOfWasteFormByCustomIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllVersionsOfWasteFormByCustomIdQuery,
    GetAllVersionsOfWasteFormByCustomIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetAllVersionsOfWasteFormByCustomIdQuery,
    GetAllVersionsOfWasteFormByCustomIdQueryVariables
  >(GetAllVersionsOfWasteFormByCustomIdDocument, options);
}
export type GetAllVersionsOfWasteFormByCustomIdQueryHookResult = ReturnType<
  typeof useGetAllVersionsOfWasteFormByCustomIdQuery
>;
export type GetAllVersionsOfWasteFormByCustomIdLazyQueryHookResult = ReturnType<
  typeof useGetAllVersionsOfWasteFormByCustomIdLazyQuery
>;
export type GetAllVersionsOfWasteFormByCustomIdQueryResult = Apollo.QueryResult<
  GetAllVersionsOfWasteFormByCustomIdQuery,
  GetAllVersionsOfWasteFormByCustomIdQueryVariables
>;
export const GetFlowsFilterByContractIdDocument = gql`
  query getFlowsFilterByContractId($contractId: ID!) {
    flows(
      filters: {
        isActivated: { eq: true }
        contract: { id: { eq: $contractId } }
      }
      sort: "name:asc"
    ) {
      data {
        id
        attributes {
          name
          recyclingGesture
        }
      }
    }
  }
`;

/**
 * __useGetFlowsFilterByContractIdQuery__
 *
 * To run a query within a React component, call `useGetFlowsFilterByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFlowsFilterByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFlowsFilterByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetFlowsFilterByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFlowsFilterByContractIdQuery,
    GetFlowsFilterByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFlowsFilterByContractIdQuery,
    GetFlowsFilterByContractIdQueryVariables
  >(GetFlowsFilterByContractIdDocument, options);
}
export function useGetFlowsFilterByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFlowsFilterByContractIdQuery,
    GetFlowsFilterByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFlowsFilterByContractIdQuery,
    GetFlowsFilterByContractIdQueryVariables
  >(GetFlowsFilterByContractIdDocument, options);
}
export type GetFlowsFilterByContractIdQueryHookResult = ReturnType<
  typeof useGetFlowsFilterByContractIdQuery
>;
export type GetFlowsFilterByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetFlowsFilterByContractIdLazyQuery
>;
export type GetFlowsFilterByContractIdQueryResult = Apollo.QueryResult<
  GetFlowsFilterByContractIdQuery,
  GetFlowsFilterByContractIdQueryVariables
>;
export const GetWasteFormByIdDocument = gql`
  query getWasteFormById($wasteFormId: ID) {
    wasteForm(id: $wasteFormId) {
      data {
        id
        attributes {
          customId
          name
          updatedAt
          status
          createdAt
          publishedDate
          unpublishedDate
          versionNumber
          tags {
            data {
              id
              attributes {
                name
              }
            }
          }
          draftCreationId
          flow {
            data {
              id
              attributes {
                name
                recyclingGesture
              }
            }
          }
          isHidden
          picto {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                createdAt
                ext
                width
                height
              }
            }
          }
          recyclingGestureText
          wasteFamily {
            data {
              id
              attributes {
                familyName
                isSystem
                createdAt
                updatedAt
              }
            }
          }
          contentBlock {
            ... on ComponentBlocksImage {
              id
              picture {
                data {
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                  id
                }
              }
              altText
              isDecorative
            }
            ... on ComponentBlocksFile {
              id
              document {
                data {
                  id
                  attributes {
                    hash
                    mime
                    name
                    provider
                    size
                    url
                    alternativeText
                    createdAt
                    ext
                    width
                    height
                  }
                }
              }
            }
            ... on ComponentBlocksWysiwyg {
              id
              textEditor
            }
            ... on ComponentBlocksVideo {
              id
              transcriptText
              videoLink
            }
            ... on ComponentBlocksSubHeading {
              id
              subHeadingTag
              subHeadingText
            }
            ... on ComponentBlocksHorizontalRule {
              hr
              id
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetWasteFormByIdQuery__
 *
 * To run a query within a React component, call `useGetWasteFormByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWasteFormByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWasteFormByIdQuery({
 *   variables: {
 *      wasteFormId: // value for 'wasteFormId'
 *   },
 * });
 */
export function useGetWasteFormByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetWasteFormByIdQuery,
    GetWasteFormByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetWasteFormByIdQuery, GetWasteFormByIdQueryVariables>(
    GetWasteFormByIdDocument,
    options,
  );
}
export function useGetWasteFormByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWasteFormByIdQuery,
    GetWasteFormByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWasteFormByIdQuery,
    GetWasteFormByIdQueryVariables
  >(GetWasteFormByIdDocument, options);
}
export type GetWasteFormByIdQueryHookResult = ReturnType<
  typeof useGetWasteFormByIdQuery
>;
export type GetWasteFormByIdLazyQueryHookResult = ReturnType<
  typeof useGetWasteFormByIdLazyQuery
>;
export type GetWasteFormByIdQueryResult = Apollo.QueryResult<
  GetWasteFormByIdQuery,
  GetWasteFormByIdQueryVariables
>;
export const GetWasteFormDraftDocument = gql`
  query getWasteFormDraft($customId: String!) {
    wasteForms(
      filters: { customId: { eq: $customId }, status: { eq: "draft" } }
    ) {
      data {
        id
      }
    }
  }
`;

/**
 * __useGetWasteFormDraftQuery__
 *
 * To run a query within a React component, call `useGetWasteFormDraftQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWasteFormDraftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWasteFormDraftQuery({
 *   variables: {
 *      customId: // value for 'customId'
 *   },
 * });
 */
export function useGetWasteFormDraftQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetWasteFormDraftQuery,
    GetWasteFormDraftQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetWasteFormDraftQuery,
    GetWasteFormDraftQueryVariables
  >(GetWasteFormDraftDocument, options);
}
export function useGetWasteFormDraftLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWasteFormDraftQuery,
    GetWasteFormDraftQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWasteFormDraftQuery,
    GetWasteFormDraftQueryVariables
  >(GetWasteFormDraftDocument, options);
}
export type GetWasteFormDraftQueryHookResult = ReturnType<
  typeof useGetWasteFormDraftQuery
>;
export type GetWasteFormDraftLazyQueryHookResult = ReturnType<
  typeof useGetWasteFormDraftLazyQuery
>;
export type GetWasteFormDraftQueryResult = Apollo.QueryResult<
  GetWasteFormDraftQuery,
  GetWasteFormDraftQueryVariables
>;
export const GetWasteFormsByContractIdDocument = gql`
  query getWasteFormsByContractId(
    $contractId: ID
    $statusFilter: String
    $flowId: ID
    $sort: [String]
    $pagination: PaginationArg
  ) {
    wasteFormsCount: wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    wasteFormsDraftCount: wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
        status: { eq: "draft" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    wasteFormsPublishedCount: wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
        status: { eq: "published" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    wasteFormsArchivedCount: wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
        status: { eq: "archived" }
      }
    ) {
      meta {
        pagination {
          total
        }
      }
    }
    wasteForms(
      filters: {
        recyclingGuideService: { contract: { id: { eq: $contractId } } }
        status: { eq: $statusFilter }
        flow: { id: { eq: $flowId } }
      }
      sort: $sort
      pagination: $pagination
    ) {
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
      data {
        id
        attributes {
          name
          status
          updatedAt
          isHidden
        }
      }
    }
  }
`;

/**
 * __useGetWasteFormsByContractIdQuery__
 *
 * To run a query within a React component, call `useGetWasteFormsByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWasteFormsByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWasteFormsByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      statusFilter: // value for 'statusFilter'
 *      flowId: // value for 'flowId'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetWasteFormsByContractIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetWasteFormsByContractIdQuery,
    GetWasteFormsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetWasteFormsByContractIdQuery,
    GetWasteFormsByContractIdQueryVariables
  >(GetWasteFormsByContractIdDocument, options);
}
export function useGetWasteFormsByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWasteFormsByContractIdQuery,
    GetWasteFormsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWasteFormsByContractIdQuery,
    GetWasteFormsByContractIdQueryVariables
  >(GetWasteFormsByContractIdDocument, options);
}
export type GetWasteFormsByContractIdQueryHookResult = ReturnType<
  typeof useGetWasteFormsByContractIdQuery
>;
export type GetWasteFormsByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetWasteFormsByContractIdLazyQuery
>;
export type GetWasteFormsByContractIdQueryResult = Apollo.QueryResult<
  GetWasteFormsByContractIdQuery,
  GetWasteFormsByContractIdQueryVariables
>;
export const UpdateWasteFormDocument = gql`
  mutation UpdateWasteForm($updateWasteFormId: ID!, $data: WasteFormInput!) {
    updateWasteForm(id: $updateWasteFormId, data: $data) {
      data {
        id
        attributes {
          customId
          isHidden
        }
      }
    }
  }
`;
export type UpdateWasteFormMutationFn = Apollo.MutationFunction<
  UpdateWasteFormMutation,
  UpdateWasteFormMutationVariables
>;

/**
 * __useUpdateWasteFormMutation__
 *
 * To run a mutation, you first call `useUpdateWasteFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWasteFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWasteFormMutation, { data, loading, error }] = useUpdateWasteFormMutation({
 *   variables: {
 *      updateWasteFormId: // value for 'updateWasteFormId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateWasteFormMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateWasteFormMutation,
    UpdateWasteFormMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateWasteFormMutation,
    UpdateWasteFormMutationVariables
  >(UpdateWasteFormDocument, options);
}
export type UpdateWasteFormMutationHookResult = ReturnType<
  typeof useUpdateWasteFormMutation
>;
export type UpdateWasteFormMutationResult =
  Apollo.MutationResult<UpdateWasteFormMutation>;
export type UpdateWasteFormMutationOptions = Apollo.BaseMutationOptions<
  UpdateWasteFormMutation,
  UpdateWasteFormMutationVariables
>;
export const GetRecyclingGuideServiceByContractIdDocument = gql`
  query getRecyclingGuideServiceByContractId($contractId: ID!) {
    recyclingGuideServices(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        id
        attributes {
          name
          endDate
          memoName
          memoDesc
          isActivated
          orderExtension
          wasteFamilies {
            data {
              id
              attributes {
                createdAt
                familyName
                isSystem
                updatedAt
                wasteForms {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
              }
            }
          }
          memoFile {
            data {
              id
              attributes {
                name
                hash
                mime
                size
                url
                provider
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetRecyclingGuideServiceByContractIdQuery__
 *
 * To run a query within a React component, call `useGetRecyclingGuideServiceByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecyclingGuideServiceByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecyclingGuideServiceByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetRecyclingGuideServiceByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRecyclingGuideServiceByContractIdQuery,
    GetRecyclingGuideServiceByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRecyclingGuideServiceByContractIdQuery,
    GetRecyclingGuideServiceByContractIdQueryVariables
  >(GetRecyclingGuideServiceByContractIdDocument, options);
}
export function useGetRecyclingGuideServiceByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRecyclingGuideServiceByContractIdQuery,
    GetRecyclingGuideServiceByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRecyclingGuideServiceByContractIdQuery,
    GetRecyclingGuideServiceByContractIdQueryVariables
  >(GetRecyclingGuideServiceByContractIdDocument, options);
}
export type GetRecyclingGuideServiceByContractIdQueryHookResult = ReturnType<
  typeof useGetRecyclingGuideServiceByContractIdQuery
>;
export type GetRecyclingGuideServiceByContractIdLazyQueryHookResult =
  ReturnType<typeof useGetRecyclingGuideServiceByContractIdLazyQuery>;
export type GetRecyclingGuideServiceByContractIdQueryResult =
  Apollo.QueryResult<
    GetRecyclingGuideServiceByContractIdQuery,
    GetRecyclingGuideServiceByContractIdQueryVariables
  >;
export const GetRecyclingGuideServiceByIdDocument = gql`
  query getRecyclingGuideServiceById($recyclingGuideServiceId: ID) {
    recyclingGuideService(id: $recyclingGuideServiceId) {
      data {
        id
        attributes {
          orderExtension
          memoName
          memoDesc
          memoFile {
            data {
              id
              attributes {
                hash
                mime
                name
                provider
                size
                url
                alternativeText
                ext
                height
                width
                createdAt
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetRecyclingGuideServiceByIdQuery__
 *
 * To run a query within a React component, call `useGetRecyclingGuideServiceByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecyclingGuideServiceByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecyclingGuideServiceByIdQuery({
 *   variables: {
 *      recyclingGuideServiceId: // value for 'recyclingGuideServiceId'
 *   },
 * });
 */
export function useGetRecyclingGuideServiceByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetRecyclingGuideServiceByIdQuery,
    GetRecyclingGuideServiceByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRecyclingGuideServiceByIdQuery,
    GetRecyclingGuideServiceByIdQueryVariables
  >(GetRecyclingGuideServiceByIdDocument, options);
}
export function useGetRecyclingGuideServiceByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRecyclingGuideServiceByIdQuery,
    GetRecyclingGuideServiceByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRecyclingGuideServiceByIdQuery,
    GetRecyclingGuideServiceByIdQueryVariables
  >(GetRecyclingGuideServiceByIdDocument, options);
}
export type GetRecyclingGuideServiceByIdQueryHookResult = ReturnType<
  typeof useGetRecyclingGuideServiceByIdQuery
>;
export type GetRecyclingGuideServiceByIdLazyQueryHookResult = ReturnType<
  typeof useGetRecyclingGuideServiceByIdLazyQuery
>;
export type GetRecyclingGuideServiceByIdQueryResult = Apollo.QueryResult<
  GetRecyclingGuideServiceByIdQuery,
  GetRecyclingGuideServiceByIdQueryVariables
>;
export const UpdateMemoTriDocument = gql`
  mutation updateMemoTri(
    $updateRecyclingGuideServiceId: ID!
    $data: RecyclingGuideServiceInput!
  ) {
    updateRecyclingGuideService(
      id: $updateRecyclingGuideServiceId
      data: $data
    ) {
      data {
        id
        attributes {
          name
          isActivated
          memoName
          memoDesc
          memoFile {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
export type UpdateMemoTriMutationFn = Apollo.MutationFunction<
  UpdateMemoTriMutation,
  UpdateMemoTriMutationVariables
>;

/**
 * __useUpdateMemoTriMutation__
 *
 * To run a mutation, you first call `useUpdateMemoTriMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMemoTriMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMemoTriMutation, { data, loading, error }] = useUpdateMemoTriMutation({
 *   variables: {
 *      updateRecyclingGuideServiceId: // value for 'updateRecyclingGuideServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateMemoTriMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateMemoTriMutation,
    UpdateMemoTriMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateMemoTriMutation,
    UpdateMemoTriMutationVariables
  >(UpdateMemoTriDocument, options);
}
export type UpdateMemoTriMutationHookResult = ReturnType<
  typeof useUpdateMemoTriMutation
>;
export type UpdateMemoTriMutationResult =
  Apollo.MutationResult<UpdateMemoTriMutation>;
export type UpdateMemoTriMutationOptions = Apollo.BaseMutationOptions<
  UpdateMemoTriMutation,
  UpdateMemoTriMutationVariables
>;
export const UpdateRecyclingGuideServiceDocument = gql`
  mutation updateRecyclingGuideService(
    $updateRecyclingGuideServiceId: ID!
    $data: RecyclingGuideServiceInput!
  ) {
    updateRecyclingGuideService(
      id: $updateRecyclingGuideServiceId
      data: $data
    ) {
      data {
        id
        attributes {
          orderExtension
        }
      }
    }
  }
`;
export type UpdateRecyclingGuideServiceMutationFn = Apollo.MutationFunction<
  UpdateRecyclingGuideServiceMutation,
  UpdateRecyclingGuideServiceMutationVariables
>;

/**
 * __useUpdateRecyclingGuideServiceMutation__
 *
 * To run a mutation, you first call `useUpdateRecyclingGuideServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRecyclingGuideServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRecyclingGuideServiceMutation, { data, loading, error }] = useUpdateRecyclingGuideServiceMutation({
 *   variables: {
 *      updateRecyclingGuideServiceId: // value for 'updateRecyclingGuideServiceId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateRecyclingGuideServiceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRecyclingGuideServiceMutation,
    UpdateRecyclingGuideServiceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateRecyclingGuideServiceMutation,
    UpdateRecyclingGuideServiceMutationVariables
  >(UpdateRecyclingGuideServiceDocument, options);
}
export type UpdateRecyclingGuideServiceMutationHookResult = ReturnType<
  typeof useUpdateRecyclingGuideServiceMutation
>;
export type UpdateRecyclingGuideServiceMutationResult =
  Apollo.MutationResult<UpdateRecyclingGuideServiceMutation>;
export type UpdateRecyclingGuideServiceMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateRecyclingGuideServiceMutation,
    UpdateRecyclingGuideServiceMutationVariables
  >;
export const GetFilteredFlowsDocument = gql`
  query getFilteredFlows($contractId: ID, $sectorizationsId: [ID]) {
    flows(
      filters: {
        contract: { id: { eq: $contractId } }
        isActivated: { eq: true }
      }
    ) {
      data {
        id
        attributes {
          name
          pickUpDays(
            filters: { sectorizations: { id: { in: $sectorizationsId } } }
          ) {
            data {
              id
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetFilteredFlowsQuery__
 *
 * To run a query within a React component, call `useGetFilteredFlowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredFlowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredFlowsQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      sectorizationsId: // value for 'sectorizationsId'
 *   },
 * });
 */
export function useGetFilteredFlowsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFilteredFlowsQuery,
    GetFilteredFlowsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFilteredFlowsQuery, GetFilteredFlowsQueryVariables>(
    GetFilteredFlowsDocument,
    options,
  );
}
export function useGetFilteredFlowsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFilteredFlowsQuery,
    GetFilteredFlowsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFilteredFlowsQuery,
    GetFilteredFlowsQueryVariables
  >(GetFilteredFlowsDocument, options);
}
export type GetFilteredFlowsQueryHookResult = ReturnType<
  typeof useGetFilteredFlowsQuery
>;
export type GetFilteredFlowsLazyQueryHookResult = ReturnType<
  typeof useGetFilteredFlowsLazyQuery
>;
export type GetFilteredFlowsQueryResult = Apollo.QueryResult<
  GetFilteredFlowsQuery,
  GetFilteredFlowsQueryVariables
>;
export const CreateInformationMessageDocument = gql`
  mutation createInformationMessage($data: InformationMessageInput!) {
    createInformationMessage(data: $data) {
      data {
        id
        attributes {
          dateStart
          infoMessage
          dateEnd
          pickUpDays {
            data {
              id
            }
          }
        }
      }
    }
  }
`;
export type CreateInformationMessageMutationFn = Apollo.MutationFunction<
  CreateInformationMessageMutation,
  CreateInformationMessageMutationVariables
>;

/**
 * __useCreateInformationMessageMutation__
 *
 * To run a mutation, you first call `useCreateInformationMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInformationMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInformationMessageMutation, { data, loading, error }] = useCreateInformationMessageMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateInformationMessageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateInformationMessageMutation,
    CreateInformationMessageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateInformationMessageMutation,
    CreateInformationMessageMutationVariables
  >(CreateInformationMessageDocument, options);
}
export type CreateInformationMessageMutationHookResult = ReturnType<
  typeof useCreateInformationMessageMutation
>;
export type CreateInformationMessageMutationResult =
  Apollo.MutationResult<CreateInformationMessageMutation>;
export type CreateInformationMessageMutationOptions =
  Apollo.BaseMutationOptions<
    CreateInformationMessageMutation,
    CreateInformationMessageMutationVariables
  >;
export const CreatePickUpDayDocument = gql`
  mutation createPickUpDay($data: PickUpDayInput!) {
    createPickUpDay(data: $data) {
      data {
        id
        attributes {
          name
          description
          periodicity
          advancedSelection
          pickUpHours
          includeHoliday
          complementaryMention
          createdAt
          updatedAt
          buttonLabel
          externalLink
          request {
            data {
              id
            }
          }
          flow {
            data {
              id
              attributes {
                name
              }
            }
          }
          pickUpDayService {
            data {
              id
              attributes {
                name
              }
            }
          }
          sectorizations {
            data {
              id
              attributes {
                name
                description
                polygonCoordinates
              }
            }
          }
        }
      }
    }
  }
`;
export type CreatePickUpDayMutationFn = Apollo.MutationFunction<
  CreatePickUpDayMutation,
  CreatePickUpDayMutationVariables
>;

/**
 * __useCreatePickUpDayMutation__
 *
 * To run a mutation, you first call `useCreatePickUpDayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePickUpDayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPickUpDayMutation, { data, loading, error }] = useCreatePickUpDayMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePickUpDayMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePickUpDayMutation,
    CreatePickUpDayMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePickUpDayMutation,
    CreatePickUpDayMutationVariables
  >(CreatePickUpDayDocument, options);
}
export type CreatePickUpDayMutationHookResult = ReturnType<
  typeof useCreatePickUpDayMutation
>;
export type CreatePickUpDayMutationResult =
  Apollo.MutationResult<CreatePickUpDayMutation>;
export type CreatePickUpDayMutationOptions = Apollo.BaseMutationOptions<
  CreatePickUpDayMutation,
  CreatePickUpDayMutationVariables
>;
export const GetActiveRequestsByContractIdDocument = gql`
  query getActiveRequestsByContractId($contractId: ID!) {
    requests(
      filters: {
        requestService: { contract: { id: { eq: $contractId } } }
        isActivated: { eq: true }
      }
    ) {
      data {
        id
        attributes {
          name
          isActivated
          hasSeveralRequestTypes
          hasAddress
          hasUser
        }
      }
    }
  }
`;

/**
 * __useGetActiveRequestsByContractIdQuery__
 *
 * To run a query within a React component, call `useGetActiveRequestsByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveRequestsByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveRequestsByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetActiveRequestsByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetActiveRequestsByContractIdQuery,
    GetActiveRequestsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetActiveRequestsByContractIdQuery,
    GetActiveRequestsByContractIdQueryVariables
  >(GetActiveRequestsByContractIdDocument, options);
}
export function useGetActiveRequestsByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetActiveRequestsByContractIdQuery,
    GetActiveRequestsByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetActiveRequestsByContractIdQuery,
    GetActiveRequestsByContractIdQueryVariables
  >(GetActiveRequestsByContractIdDocument, options);
}
export type GetActiveRequestsByContractIdQueryHookResult = ReturnType<
  typeof useGetActiveRequestsByContractIdQuery
>;
export type GetActiveRequestsByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetActiveRequestsByContractIdLazyQuery
>;
export type GetActiveRequestsByContractIdQueryResult = Apollo.QueryResult<
  GetActiveRequestsByContractIdQuery,
  GetActiveRequestsByContractIdQueryVariables
>;
export const GetCollectDoorToDoorByFlowIdDocument = gql`
  query getCollectDoorToDoorByFlowId($flowId: ID) {
    collectDoorToDoors(filters: { flows: { id: { eq: $flowId } } }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

/**
 * __useGetCollectDoorToDoorByFlowIdQuery__
 *
 * To run a query within a React component, call `useGetCollectDoorToDoorByFlowIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectDoorToDoorByFlowIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectDoorToDoorByFlowIdQuery({
 *   variables: {
 *      flowId: // value for 'flowId'
 *   },
 * });
 */
export function useGetCollectDoorToDoorByFlowIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCollectDoorToDoorByFlowIdQuery,
    GetCollectDoorToDoorByFlowIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCollectDoorToDoorByFlowIdQuery,
    GetCollectDoorToDoorByFlowIdQueryVariables
  >(GetCollectDoorToDoorByFlowIdDocument, options);
}
export function useGetCollectDoorToDoorByFlowIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectDoorToDoorByFlowIdQuery,
    GetCollectDoorToDoorByFlowIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCollectDoorToDoorByFlowIdQuery,
    GetCollectDoorToDoorByFlowIdQueryVariables
  >(GetCollectDoorToDoorByFlowIdDocument, options);
}
export type GetCollectDoorToDoorByFlowIdQueryHookResult = ReturnType<
  typeof useGetCollectDoorToDoorByFlowIdQuery
>;
export type GetCollectDoorToDoorByFlowIdLazyQueryHookResult = ReturnType<
  typeof useGetCollectDoorToDoorByFlowIdLazyQuery
>;
export type GetCollectDoorToDoorByFlowIdQueryResult = Apollo.QueryResult<
  GetCollectDoorToDoorByFlowIdQuery,
  GetCollectDoorToDoorByFlowIdQueryVariables
>;
export const GetCollectVoluntariesByFlowIdDocument = gql`
  query getCollectVoluntariesByFlowId($flowId: ID) {
    collectVoluntaries(filters: { flows: { id: { eq: $flowId } } }) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

/**
 * __useGetCollectVoluntariesByFlowIdQuery__
 *
 * To run a query within a React component, call `useGetCollectVoluntariesByFlowIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectVoluntariesByFlowIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectVoluntariesByFlowIdQuery({
 *   variables: {
 *      flowId: // value for 'flowId'
 *   },
 * });
 */
export function useGetCollectVoluntariesByFlowIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCollectVoluntariesByFlowIdQuery,
    GetCollectVoluntariesByFlowIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCollectVoluntariesByFlowIdQuery,
    GetCollectVoluntariesByFlowIdQueryVariables
  >(GetCollectVoluntariesByFlowIdDocument, options);
}
export function useGetCollectVoluntariesByFlowIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCollectVoluntariesByFlowIdQuery,
    GetCollectVoluntariesByFlowIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCollectVoluntariesByFlowIdQuery,
    GetCollectVoluntariesByFlowIdQueryVariables
  >(GetCollectVoluntariesByFlowIdDocument, options);
}
export type GetCollectVoluntariesByFlowIdQueryHookResult = ReturnType<
  typeof useGetCollectVoluntariesByFlowIdQuery
>;
export type GetCollectVoluntariesByFlowIdLazyQueryHookResult = ReturnType<
  typeof useGetCollectVoluntariesByFlowIdLazyQuery
>;
export type GetCollectVoluntariesByFlowIdQueryResult = Apollo.QueryResult<
  GetCollectVoluntariesByFlowIdQuery,
  GetCollectVoluntariesByFlowIdQueryVariables
>;
export const GetDropOffCollectTypeByContractIdDocument = gql`
  query getDropOffCollectTypeByContractId($contractId: ID!) {
    getDropOffCollectType(contractId: $contractId) {
      entityTypeName
      uniqueId
      grammaticalGender
      name
      originalId
    }
  }
`;

/**
 * __useGetDropOffCollectTypeByContractIdQuery__
 *
 * To run a query within a React component, call `useGetDropOffCollectTypeByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDropOffCollectTypeByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDropOffCollectTypeByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetDropOffCollectTypeByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetDropOffCollectTypeByContractIdQuery,
    GetDropOffCollectTypeByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetDropOffCollectTypeByContractIdQuery,
    GetDropOffCollectTypeByContractIdQueryVariables
  >(GetDropOffCollectTypeByContractIdDocument, options);
}
export function useGetDropOffCollectTypeByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetDropOffCollectTypeByContractIdQuery,
    GetDropOffCollectTypeByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetDropOffCollectTypeByContractIdQuery,
    GetDropOffCollectTypeByContractIdQueryVariables
  >(GetDropOffCollectTypeByContractIdDocument, options);
}
export type GetDropOffCollectTypeByContractIdQueryHookResult = ReturnType<
  typeof useGetDropOffCollectTypeByContractIdQuery
>;
export type GetDropOffCollectTypeByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetDropOffCollectTypeByContractIdLazyQuery
>;
export type GetDropOffCollectTypeByContractIdQueryResult = Apollo.QueryResult<
  GetDropOffCollectTypeByContractIdQuery,
  GetDropOffCollectTypeByContractIdQueryVariables
>;
export const GetFlowsDocument = gql`
  query getFlows($contractId: ID) {
    flows(
      filters: {
        contract: { id: { eq: $contractId } }
        isActivated: { eq: true }
      }
    ) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

/**
 * __useGetFlowsQuery__
 *
 * To run a query within a React component, call `useGetFlowsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFlowsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFlowsQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetFlowsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetFlowsQuery, GetFlowsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetFlowsQuery, GetFlowsQueryVariables>(
    GetFlowsDocument,
    options,
  );
}
export function useGetFlowsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFlowsQuery,
    GetFlowsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetFlowsQuery, GetFlowsQueryVariables>(
    GetFlowsDocument,
    options,
  );
}
export type GetFlowsQueryHookResult = ReturnType<typeof useGetFlowsQuery>;
export type GetFlowsLazyQueryHookResult = ReturnType<
  typeof useGetFlowsLazyQuery
>;
export type GetFlowsQueryResult = Apollo.QueryResult<
  GetFlowsQuery,
  GetFlowsQueryVariables
>;
export const GetInformationMessageByContractIdDocument = gql`
  query getInformationMessageByContractId(
    $contractId: ID!
    $pickUpDaysId: ID
    $pagination: PaginationArg
    $sort: [String]
  ) {
    informationMessages(
      filters: {
        pickUpDays: {
          pickUpDayService: { contract: { id: { eq: $contractId } } }
          id: { eq: $pickUpDaysId }
        }
      }
      pagination: $pagination
      sort: $sort
    ) {
      meta {
        pagination {
          page
          pageCount
          pageSize
          total
        }
      }
      data {
        id
        attributes {
          infoMessage
          pickUpDays {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetInformationMessageByContractIdQuery__
 *
 * To run a query within a React component, call `useGetInformationMessageByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInformationMessageByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInformationMessageByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      pickUpDaysId: // value for 'pickUpDaysId'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetInformationMessageByContractIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetInformationMessageByContractIdQuery,
    GetInformationMessageByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetInformationMessageByContractIdQuery,
    GetInformationMessageByContractIdQueryVariables
  >(GetInformationMessageByContractIdDocument, options);
}
export function useGetInformationMessageByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInformationMessageByContractIdQuery,
    GetInformationMessageByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetInformationMessageByContractIdQuery,
    GetInformationMessageByContractIdQueryVariables
  >(GetInformationMessageByContractIdDocument, options);
}
export type GetInformationMessageByContractIdQueryHookResult = ReturnType<
  typeof useGetInformationMessageByContractIdQuery
>;
export type GetInformationMessageByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetInformationMessageByContractIdLazyQuery
>;
export type GetInformationMessageByContractIdQueryResult = Apollo.QueryResult<
  GetInformationMessageByContractIdQuery,
  GetInformationMessageByContractIdQueryVariables
>;
export const GetInformationMessageByIdDocument = gql`
  query getInformationMessageById($informationMessageId: ID) {
    informationMessage(id: $informationMessageId) {
      data {
        id
        attributes {
          dateStart
          dateEnd
          infoMessage
          pickUpDays {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetInformationMessageByIdQuery__
 *
 * To run a query within a React component, call `useGetInformationMessageByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInformationMessageByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInformationMessageByIdQuery({
 *   variables: {
 *      informationMessageId: // value for 'informationMessageId'
 *   },
 * });
 */
export function useGetInformationMessageByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetInformationMessageByIdQuery,
    GetInformationMessageByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetInformationMessageByIdQuery,
    GetInformationMessageByIdQueryVariables
  >(GetInformationMessageByIdDocument, options);
}
export function useGetInformationMessageByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetInformationMessageByIdQuery,
    GetInformationMessageByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetInformationMessageByIdQuery,
    GetInformationMessageByIdQueryVariables
  >(GetInformationMessageByIdDocument, options);
}
export type GetInformationMessageByIdQueryHookResult = ReturnType<
  typeof useGetInformationMessageByIdQuery
>;
export type GetInformationMessageByIdLazyQueryHookResult = ReturnType<
  typeof useGetInformationMessageByIdLazyQuery
>;
export type GetInformationMessageByIdQueryResult = Apollo.QueryResult<
  GetInformationMessageByIdQuery,
  GetInformationMessageByIdQueryVariables
>;
export const GetPickUpDayByIdDocument = gql`
  query getPickUpDayById($pickUpDayId: ID) {
    pickUpDay(id: $pickUpDayId) {
      data {
        id
        attributes {
          name
          periodicity
          advancedSelection
          pickUpHours
          includeHoliday
          complementaryMention
          buttonLabel
          externalLink
          request {
            data {
              id
            }
          }
          flow {
            data {
              id
              attributes {
                name
                recyclingGesture
              }
            }
          }
          sectorizations {
            data {
              id
              attributes {
                name
                description
                polygonCoordinates
              }
            }
          }
          cities {
            data {
              id
              attributes {
                name
              }
            }
          }
          periodicity
          advancedSelection
          collectDoorToDoor {
            data {
              id
              attributes {
                name
                picto {
                  data {
                    id
                  }
                }
              }
            }
          }
          collectVoluntary {
            data {
              id
              attributes {
                name
                picto {
                  data {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * __useGetPickUpDayByIdQuery__
 *
 * To run a query within a React component, call `useGetPickUpDayByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPickUpDayByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPickUpDayByIdQuery({
 *   variables: {
 *      pickUpDayId: // value for 'pickUpDayId'
 *   },
 * });
 */
export function useGetPickUpDayByIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPickUpDayByIdQuery,
    GetPickUpDayByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPickUpDayByIdQuery, GetPickUpDayByIdQueryVariables>(
    GetPickUpDayByIdDocument,
    options,
  );
}
export function useGetPickUpDayByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPickUpDayByIdQuery,
    GetPickUpDayByIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPickUpDayByIdQuery,
    GetPickUpDayByIdQueryVariables
  >(GetPickUpDayByIdDocument, options);
}
export type GetPickUpDayByIdQueryHookResult = ReturnType<
  typeof useGetPickUpDayByIdQuery
>;
export type GetPickUpDayByIdLazyQueryHookResult = ReturnType<
  typeof useGetPickUpDayByIdLazyQuery
>;
export type GetPickUpDayByIdQueryResult = Apollo.QueryResult<
  GetPickUpDayByIdQuery,
  GetPickUpDayByIdQueryVariables
>;
export const GetPickUpDaysByContractIdDocument = gql`
  query getPickUpDaysByContractId(
    $contractId: ID
    $sort: [String]
    $pagination: PaginationArg
  ) {
    pickUpDays(
      filters: { pickUpDayService: { contract: { id: { eq: $contractId } } } }
      sort: $sort
      pagination: $pagination
    ) {
      data {
        id
        attributes {
          name
          updatedAt
          collectDoorToDoor {
            data {
              id
              attributes {
                name
                picto {
                  data {
                    id
                  }
                }
              }
            }
          }
          collectVoluntary {
            data {
              id
              attributes {
                name
                picto {
                  data {
                    id
                  }
                }
              }
            }
          }
          flow {
            data {
              attributes {
                name
              }
            }
          }
          sectorizations {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageCount
          pageSize
          total
        }
      }
    }
  }
`;

/**
 * __useGetPickUpDaysByContractIdQuery__
 *
 * To run a query within a React component, call `useGetPickUpDaysByContractIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPickUpDaysByContractIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPickUpDaysByContractIdQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      sort: // value for 'sort'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetPickUpDaysByContractIdQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPickUpDaysByContractIdQuery,
    GetPickUpDaysByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPickUpDaysByContractIdQuery,
    GetPickUpDaysByContractIdQueryVariables
  >(GetPickUpDaysByContractIdDocument, options);
}
export function useGetPickUpDaysByContractIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPickUpDaysByContractIdQuery,
    GetPickUpDaysByContractIdQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPickUpDaysByContractIdQuery,
    GetPickUpDaysByContractIdQueryVariables
  >(GetPickUpDaysByContractIdDocument, options);
}
export type GetPickUpDaysByContractIdQueryHookResult = ReturnType<
  typeof useGetPickUpDaysByContractIdQuery
>;
export type GetPickUpDaysByContractIdLazyQueryHookResult = ReturnType<
  typeof useGetPickUpDaysByContractIdLazyQuery
>;
export type GetPickUpDaysByContractIdQueryResult = Apollo.QueryResult<
  GetPickUpDaysByContractIdQuery,
  GetPickUpDaysByContractIdQueryVariables
>;
export const GetSearchCitiesDocument = gql`
  query getSearchCities($searchTerm: String!, $contractId: ID!) {
    searchCities(searchTerm: $searchTerm, contractId: $contractId) {
      id
      name
    }
  }
`;

/**
 * __useGetSearchCitiesQuery__
 *
 * To run a query within a React component, call `useGetSearchCitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchCitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchCitiesQuery({
 *   variables: {
 *      searchTerm: // value for 'searchTerm'
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetSearchCitiesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSearchCitiesQuery,
    GetSearchCitiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSearchCitiesQuery, GetSearchCitiesQueryVariables>(
    GetSearchCitiesDocument,
    options,
  );
}
export function useGetSearchCitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSearchCitiesQuery,
    GetSearchCitiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSearchCitiesQuery,
    GetSearchCitiesQueryVariables
  >(GetSearchCitiesDocument, options);
}
export type GetSearchCitiesQueryHookResult = ReturnType<
  typeof useGetSearchCitiesQuery
>;
export type GetSearchCitiesLazyQueryHookResult = ReturnType<
  typeof useGetSearchCitiesLazyQuery
>;
export type GetSearchCitiesQueryResult = Apollo.QueryResult<
  GetSearchCitiesQuery,
  GetSearchCitiesQueryVariables
>;
export const GetSectorizationsPickUpDayDocument = gql`
  query getSectorizationsPickUpDay($contractId: ID) {
    sectorizations(
      filters: { contract: { id: { eq: $contractId } } }
      sort: "createdAt:desc"
    ) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

/**
 * __useGetSectorizationsPickUpDayQuery__
 *
 * To run a query within a React component, call `useGetSectorizationsPickUpDayQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSectorizationsPickUpDayQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSectorizationsPickUpDayQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetSectorizationsPickUpDayQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetSectorizationsPickUpDayQuery,
    GetSectorizationsPickUpDayQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSectorizationsPickUpDayQuery,
    GetSectorizationsPickUpDayQueryVariables
  >(GetSectorizationsPickUpDayDocument, options);
}
export function useGetSectorizationsPickUpDayLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSectorizationsPickUpDayQuery,
    GetSectorizationsPickUpDayQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSectorizationsPickUpDayQuery,
    GetSectorizationsPickUpDayQueryVariables
  >(GetSectorizationsPickUpDayDocument, options);
}
export type GetSectorizationsPickUpDayQueryHookResult = ReturnType<
  typeof useGetSectorizationsPickUpDayQuery
>;
export type GetSectorizationsPickUpDayLazyQueryHookResult = ReturnType<
  typeof useGetSectorizationsPickUpDayLazyQuery
>;
export type GetSectorizationsPickUpDayQueryResult = Apollo.QueryResult<
  GetSectorizationsPickUpDayQuery,
  GetSectorizationsPickUpDayQueryVariables
>;
export const UpdateInformationMessageByIdDocument = gql`
  mutation updateInformationMessageById(
    $updateInformationMessageId: ID!
    $data: InformationMessageInput!
  ) {
    updateInformationMessage(id: $updateInformationMessageId, data: $data) {
      data {
        id
        attributes {
          infoMessage
          dateStart
          dateEnd
          pickUpDays {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdateInformationMessageByIdMutationFn = Apollo.MutationFunction<
  UpdateInformationMessageByIdMutation,
  UpdateInformationMessageByIdMutationVariables
>;

/**
 * __useUpdateInformationMessageByIdMutation__
 *
 * To run a mutation, you first call `useUpdateInformationMessageByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInformationMessageByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInformationMessageByIdMutation, { data, loading, error }] = useUpdateInformationMessageByIdMutation({
 *   variables: {
 *      updateInformationMessageId: // value for 'updateInformationMessageId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateInformationMessageByIdMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateInformationMessageByIdMutation,
    UpdateInformationMessageByIdMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateInformationMessageByIdMutation,
    UpdateInformationMessageByIdMutationVariables
  >(UpdateInformationMessageByIdDocument, options);
}
export type UpdateInformationMessageByIdMutationHookResult = ReturnType<
  typeof useUpdateInformationMessageByIdMutation
>;
export type UpdateInformationMessageByIdMutationResult =
  Apollo.MutationResult<UpdateInformationMessageByIdMutation>;
export type UpdateInformationMessageByIdMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateInformationMessageByIdMutation,
    UpdateInformationMessageByIdMutationVariables
  >;
export const UpdatePickUpDayDocument = gql`
  mutation updatePickUpDay($updatePickUpDayId: ID!, $data: PickUpDayInput!) {
    updatePickUpDay(id: $updatePickUpDayId, data: $data) {
      data {
        id
        attributes {
          name
          description
          periodicity
          advancedSelection
          pickUpHours
          includeHoliday
          complementaryMention
          buttonLabel
          externalLink
          request {
            data {
              id
            }
          }
          flow {
            data {
              id
              attributes {
                name
              }
            }
          }
          sectorizations {
            data {
              id
              attributes {
                name
                description
                polygonCoordinates
              }
            }
          }
        }
      }
    }
  }
`;
export type UpdatePickUpDayMutationFn = Apollo.MutationFunction<
  UpdatePickUpDayMutation,
  UpdatePickUpDayMutationVariables
>;

/**
 * __useUpdatePickUpDayMutation__
 *
 * To run a mutation, you first call `useUpdatePickUpDayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePickUpDayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePickUpDayMutation, { data, loading, error }] = useUpdatePickUpDayMutation({
 *   variables: {
 *      updatePickUpDayId: // value for 'updatePickUpDayId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePickUpDayMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePickUpDayMutation,
    UpdatePickUpDayMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePickUpDayMutation,
    UpdatePickUpDayMutationVariables
  >(UpdatePickUpDayDocument, options);
}
export type UpdatePickUpDayMutationHookResult = ReturnType<
  typeof useUpdatePickUpDayMutation
>;
export type UpdatePickUpDayMutationResult =
  Apollo.MutationResult<UpdatePickUpDayMutation>;
export type UpdatePickUpDayMutationOptions = Apollo.BaseMutationOptions<
  UpdatePickUpDayMutation,
  UpdatePickUpDayMutationVariables
>;
