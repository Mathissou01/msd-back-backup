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
  ContractMenuServiceLinksDynamicZoneInput: any;
  Date: any;
  DateTime: any;
  JSON: any;
  Long: any;
  ServicesBlockServiceLinksDynamicZoneInput: any;
  Upload: any;
};

export type Attributes = {
  __typename?: "Attributes";
  publishedAt: Scalars["DateTime"];
  title: Scalars["String"];
};

export type AudienceType = {
  __typename?: "AudienceType";
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
  and?: InputMaybe<Array<InputMaybe<AudienceTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<AudienceTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<AudienceTypeFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type AudienceTypeInput = {
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

export type ChannelType = {
  __typename?: "ChannelType";
  createdAt?: Maybe<Scalars["DateTime"]>;
  type?: Maybe<Scalars["String"]>;
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
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ChannelTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ChannelTypeFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ChannelTypeInput = {
  type?: InputMaybe<Scalars["String"]>;
};

export type ChannelTypeRelationResponseCollection = {
  __typename?: "ChannelTypeRelationResponseCollection";
  data: Array<ChannelTypeEntity>;
};

export type City = {
  __typename?: "City";
  createdAt?: Maybe<Scalars["DateTime"]>;
  label: Scalars["String"];
  postalCode: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
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
  and?: InputMaybe<Array<InputMaybe<CityFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<CityFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<CityFiltersInput>>>;
  postalCode?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type CityInput = {
  label?: InputMaybe<Scalars["String"]>;
  postalCode?: InputMaybe<Scalars["String"]>;
};

export type CityRelationResponseCollection = {
  __typename?: "CityRelationResponseCollection";
  data: Array<CityEntity>;
};

export type Client = {
  __typename?: "Client";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  firstname: Scalars["String"];
  lastname: Scalars["String"];
  mail?: Maybe<Scalars["String"]>;
  phone: Scalars["String"];
  profile?: Maybe<ProfileEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ClientEntity = {
  __typename?: "ClientEntity";
  attributes?: Maybe<Client>;
  id?: Maybe<Scalars["ID"]>;
};

export type ClientEntityResponse = {
  __typename?: "ClientEntityResponse";
  data?: Maybe<ClientEntity>;
};

export type ClientEntityResponseCollection = {
  __typename?: "ClientEntityResponseCollection";
  data: Array<ClientEntity>;
  meta: ResponseCollectionMeta;
};

export type ClientFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ClientFiltersInput>>>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  firstname?: InputMaybe<StringFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  lastname?: InputMaybe<StringFilterInput>;
  mail?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ClientFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ClientFiltersInput>>>;
  phone?: InputMaybe<StringFilterInput>;
  profile?: InputMaybe<ProfileFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClientInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  firstname?: InputMaybe<Scalars["String"]>;
  lastname?: InputMaybe<Scalars["String"]>;
  mail?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  profile?: InputMaybe<Scalars["ID"]>;
};

export type ClientType = {
  __typename?: "ClientType";
  createdAt?: Maybe<Scalars["DateTime"]>;
  type?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ClientTypeEntity = {
  __typename?: "ClientTypeEntity";
  attributes?: Maybe<ClientType>;
  id?: Maybe<Scalars["ID"]>;
};

export type ClientTypeEntityResponse = {
  __typename?: "ClientTypeEntityResponse";
  data?: Maybe<ClientTypeEntity>;
};

export type ClientTypeEntityResponseCollection = {
  __typename?: "ClientTypeEntityResponseCollection";
  data: Array<ClientTypeEntity>;
  meta: ResponseCollectionMeta;
};

export type ClientTypeFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ClientTypeFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<ClientTypeFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ClientTypeFiltersInput>>>;
  type?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ClientTypeInput = {
  type?: InputMaybe<Scalars["String"]>;
};

export type ComponentLinksContactUs = {
  __typename?: "ComponentLinksContactUs";
  contactUsService?: Maybe<ContactUsServiceEntityResponse>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksEditorial = {
  __typename?: "ComponentLinksEditorial";
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksEvents = {
  __typename?: "ComponentLinksEvents";
  eventSubService?: Maybe<EventSubServiceEntityResponse>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksExternal = {
  __typename?: "ComponentLinksExternal";
  externalLink?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
};

export type ComponentLinksFrees = {
  __typename?: "ComponentLinksFrees";
  freeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksNews = {
  __typename?: "ComponentLinksNews";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  newsSubService?: Maybe<NewsSubServiceEntityResponse>;
  order?: Maybe<Scalars["Int"]>;
  picto?: Maybe<UploadFileEntityResponse>;
};

export type ComponentLinksQuizzes = {
  __typename?: "ComponentLinksQuizzes";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  quizSubService?: Maybe<QuizSubServiceEntityResponse>;
};

export type ComponentLinksRecycling = {
  __typename?: "ComponentLinksRecycling";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  recyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
};

export type ComponentLinksRequest = {
  __typename?: "ComponentLinksRequest";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  requestService?: Maybe<RequestServiceEntityResponse>;
};

export type ComponentLinksTips = {
  __typename?: "ComponentLinksTips";
  id: Scalars["ID"];
  isDisplayed: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  order?: Maybe<Scalars["Int"]>;
  picto?: Maybe<UploadFileEntityResponse>;
  tipSubService?: Maybe<TipSubServiceEntityResponse>;
};

export type ContactUsService = {
  __typename?: "ContactUsService";
  channelType?: Maybe<ChannelTypeEntityResponse>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  endDate: Scalars["DateTime"];
  isActivated: Scalars["Boolean"];
  label: Scalars["String"];
  link: Scalars["String"];
  startDate: Scalars["DateTime"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ContactUsServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type ContactUsServiceEntity = {
  __typename?: "ContactUsServiceEntity";
  attributes?: Maybe<ContactUsService>;
  id?: Maybe<Scalars["ID"]>;
};

export type ContactUsServiceEntityResponse = {
  __typename?: "ContactUsServiceEntityResponse";
  data?: Maybe<ContactUsServiceEntity>;
};

export type ContactUsServiceEntityResponseCollection = {
  __typename?: "ContactUsServiceEntityResponseCollection";
  data: Array<ContactUsServiceEntity>;
  meta: ResponseCollectionMeta;
};

export type ContactUsServiceFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ContactUsServiceFiltersInput>>>;
  channelType?: InputMaybe<ChannelTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ContactUsServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContactUsServiceFiltersInput>>>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContactUsServiceInput = {
  channelType?: InputMaybe<Scalars["ID"]>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  label?: InputMaybe<Scalars["String"]>;
  link?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
};

export type Contract = {
  __typename?: "Contract";
  ccap?: Maybe<Scalars["Int"]>;
  clear?: Maybe<Scalars["Int"]>;
  clientName?: Maybe<Scalars["String"]>;
  contactClient?: Maybe<ClientEntityResponse>;
  contactUsService?: Maybe<ContactUsServiceEntityResponse>;
  contractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  contractMenu?: Maybe<ContractMenuEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  label: Scalars["String"];
  recyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  requestService?: Maybe<RequestServiceEntityResponse>;
  siret?: Maybe<Scalars["Long"]>;
  tags?: Maybe<TagRelationResponseCollection>;
  territory?: Maybe<TerritoryEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  users?: Maybe<UsersPermissionsUserRelationResponseCollection>;
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

export type ContractCustomization = {
  __typename?: "ContractCustomization";
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  footer?: Maybe<FooterEntityResponse>;
  homepage?: Maybe<HomepageEntityResponse>;
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
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ContractCustomizationInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  footer?: InputMaybe<Scalars["ID"]>;
  homepage?: InputMaybe<Scalars["ID"]>;
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
  and?: InputMaybe<Array<InputMaybe<ContractFiltersInput>>>;
  ccap?: InputMaybe<IntFilterInput>;
  clear?: InputMaybe<IntFilterInput>;
  clientName?: InputMaybe<StringFilterInput>;
  contactClient?: InputMaybe<ClientFiltersInput>;
  contactUsService?: InputMaybe<ContactUsServiceFiltersInput>;
  contractCustomization?: InputMaybe<ContractCustomizationFiltersInput>;
  contractMenu?: InputMaybe<ContractMenuFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  label?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ContractFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ContractFiltersInput>>>;
  recyclingGuideService?: InputMaybe<RecyclingGuideServiceFiltersInput>;
  requestService?: InputMaybe<RequestServiceFiltersInput>;
  siret?: InputMaybe<LongFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  territory?: InputMaybe<TerritoryFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
  users?: InputMaybe<UsersPermissionsUserFiltersInput>;
};

export type ContractInput = {
  ccap?: InputMaybe<Scalars["Int"]>;
  clear?: InputMaybe<Scalars["Int"]>;
  clientName?: InputMaybe<Scalars["String"]>;
  contactClient?: InputMaybe<Scalars["ID"]>;
  contactUsService?: InputMaybe<Scalars["ID"]>;
  contractCustomization?: InputMaybe<Scalars["ID"]>;
  contractMenu?: InputMaybe<Scalars["ID"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  label?: InputMaybe<Scalars["String"]>;
  recyclingGuideService?: InputMaybe<Scalars["ID"]>;
  requestService?: InputMaybe<Scalars["ID"]>;
  siret?: InputMaybe<Scalars["Long"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  territory?: InputMaybe<Scalars["ID"]>;
  users?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
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
  | ComponentLinksContactUs
  | ComponentLinksEditorial
  | ComponentLinksEvents
  | ComponentLinksExternal
  | ComponentLinksFrees
  | ComponentLinksNews
  | ComponentLinksQuizzes
  | ComponentLinksRecycling
  | ComponentLinksRequest
  | ComponentLinksTips
  | Error;

export type ContractPayload = {
  __typename?: "ContractPayload";
  contractId?: Maybe<Scalars["ID"]>;
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

export enum Enum_Footer_Accessibilitylevel {
  Conform = "conform",
  NotConform = "not_conform",
  PartiallyConform = "partially_conform",
}

export type EditoBlock = {
  __typename?: "EditoBlock";
  createdAt?: Maybe<Scalars["DateTime"]>;
  displayBlock?: Maybe<Scalars["Boolean"]>;
  editoContents?: Maybe<EditoContentRelationResponseCollection>;
  homepage?: Maybe<HomepageEntityResponse>;
  titleContent: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EditoBlockEditoContentsArgs = {
  filters?: InputMaybe<EditoContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EditoBlockDto = {
  __typename?: "EditoBlockDTO";
  displayBlock: Scalars["Boolean"];
  editoContents?: Maybe<Array<Maybe<EditoContentDto>>>;
  id: Scalars["ID"];
  titleContent: Scalars["String"];
};

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
  editoContents?: InputMaybe<EditoContentFiltersInput>;
  homepage?: InputMaybe<HomepageFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<EditoBlockFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EditoBlockFiltersInput>>>;
  titleContent?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EditoBlockInput = {
  displayBlock?: InputMaybe<Scalars["Boolean"]>;
  editoContents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  homepage?: InputMaybe<Scalars["ID"]>;
  titleContent?: InputMaybe<Scalars["String"]>;
};

export type EditoContent = {
  __typename?: "EditoContent";
  createdAt?: Maybe<Scalars["DateTime"]>;
  editoBlock?: Maybe<EditoBlockEntityResponse>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  event?: Maybe<EventEntityResponse>;
  freeContent?: Maybe<FreeContentEntityResponse>;
  news?: Maybe<NewEntityResponse>;
  quiz?: Maybe<QuizEntityResponse>;
  tip?: Maybe<TipEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EditoContentDto = {
  __typename?: "EditoContentDTO";
  attributes: Attributes;
  contentType: Scalars["String"];
  id: Scalars["ID"];
  typeName: Scalars["String"];
};

export type EditoContentEntity = {
  __typename?: "EditoContentEntity";
  attributes?: Maybe<EditoContent>;
  id?: Maybe<Scalars["ID"]>;
};

export type EditoContentEntityResponse = {
  __typename?: "EditoContentEntityResponse";
  data?: Maybe<EditoContentEntity>;
};

export type EditoContentEntityResponseCollection = {
  __typename?: "EditoContentEntityResponseCollection";
  data: Array<EditoContentEntity>;
  meta: ResponseCollectionMeta;
};

export type EditoContentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<EditoContentFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  editoBlock?: InputMaybe<EditoBlockFiltersInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  event?: InputMaybe<EventFiltersInput>;
  freeContent?: InputMaybe<FreeContentFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  news?: InputMaybe<NewFiltersInput>;
  not?: InputMaybe<EditoContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EditoContentFiltersInput>>>;
  quiz?: InputMaybe<QuizFiltersInput>;
  tip?: InputMaybe<TipFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EditoContentInput = {
  editoBlock?: InputMaybe<Scalars["ID"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  event?: InputMaybe<Scalars["ID"]>;
  freeContent?: InputMaybe<Scalars["ID"]>;
  news?: InputMaybe<Scalars["ID"]>;
  quiz?: InputMaybe<Scalars["ID"]>;
  tip?: InputMaybe<Scalars["ID"]>;
};

export type EditoContentRelationResponseCollection = {
  __typename?: "EditoContentRelationResponseCollection";
  data: Array<EditoContentEntity>;
};

export type EditorialService = {
  __typename?: "EditorialService";
  channelType?: Maybe<ChannelTypeEntityResponse>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  editoContents?: Maybe<EditoContentRelationResponseCollection>;
  endDate: Scalars["DateTime"];
  eventSubService?: Maybe<EventSubServiceEntityResponse>;
  freeContentSubServices?: Maybe<FreeContentSubServiceRelationResponseCollection>;
  isActivated: Scalars["Boolean"];
  newsSubService?: Maybe<NewsSubServiceEntityResponse>;
  quizSubService?: Maybe<QuizSubServiceEntityResponse>;
  startDate: Scalars["DateTime"];
  tipSubService?: Maybe<TipSubServiceEntityResponse>;
  topContents?: Maybe<TopContentRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EditorialServiceCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EditorialServiceEditoContentsArgs = {
  filters?: InputMaybe<EditoContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EditorialServiceFreeContentSubServicesArgs = {
  filters?: InputMaybe<FreeContentSubServiceFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EditorialServiceTopContentsArgs = {
  filters?: InputMaybe<TopContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EditorialServiceEntity = {
  __typename?: "EditorialServiceEntity";
  attributes?: Maybe<EditorialService>;
  id?: Maybe<Scalars["ID"]>;
  serviceId?: Maybe<Scalars["ID"]>;
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
  and?: InputMaybe<Array<InputMaybe<EditorialServiceFiltersInput>>>;
  channelType?: InputMaybe<ChannelTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  editoContents?: InputMaybe<EditoContentFiltersInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  eventSubService?: InputMaybe<EventSubServiceFiltersInput>;
  freeContentSubServices?: InputMaybe<FreeContentSubServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  newsSubService?: InputMaybe<NewsSubServiceFiltersInput>;
  not?: InputMaybe<EditorialServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EditorialServiceFiltersInput>>>;
  quizSubService?: InputMaybe<QuizSubServiceFiltersInput>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  tipSubService?: InputMaybe<TipSubServiceFiltersInput>;
  topContents?: InputMaybe<TopContentFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EditorialServiceInput = {
  channelType?: InputMaybe<Scalars["ID"]>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  editoContents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  eventSubService?: InputMaybe<Scalars["ID"]>;
  freeContentSubServices?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  newsSubService?: InputMaybe<Scalars["ID"]>;
  quizSubService?: InputMaybe<Scalars["ID"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
  tipSubService?: InputMaybe<Scalars["ID"]>;
  topContents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type Epci = {
  __typename?: "Epci";
  cities?: Maybe<CityRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  name?: Maybe<Scalars["String"]>;
  territories?: Maybe<TerritoryRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EpciCitiesArgs = {
  filters?: InputMaybe<CityFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
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
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
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
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  documents?: Maybe<DocumentRelationResponseCollection>;
  editoContent?: Maybe<EditoContentEntityResponse>;
  eventSubService?: Maybe<EventSubServiceEntityResponse>;
  events?: Maybe<EventRelationResponseCollection>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars["String"];
  topContent?: Maybe<TopContentEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EventDocumentsArgs = {
  filters?: InputMaybe<DocumentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

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
  description?: InputMaybe<StringFilterInput>;
  documents?: InputMaybe<DocumentFiltersInput>;
  editoContent?: InputMaybe<EditoContentFiltersInput>;
  eventSubService?: InputMaybe<EventSubServiceFiltersInput>;
  events?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<EventFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  topContent?: InputMaybe<TopContentFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventInput = {
  description?: InputMaybe<Scalars["String"]>;
  documents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  editoContent?: InputMaybe<Scalars["ID"]>;
  eventSubService?: InputMaybe<Scalars["ID"]>;
  events?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
  topContent?: InputMaybe<Scalars["ID"]>;
};

export type EventRelationResponseCollection = {
  __typename?: "EventRelationResponseCollection";
  data: Array<EventEntity>;
};

export type EventSubService = {
  __typename?: "EventSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  events?: Maybe<EventRelationResponseCollection>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type EventSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type EventSubServiceEventsArgs = {
  filters?: InputMaybe<EventFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
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
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  events?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<EventSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<EventSubServiceFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type EventSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  events?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type FileInfoInput = {
  alternativeText?: InputMaybe<Scalars["String"]>;
  caption?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
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

export type Footer = {
  __typename?: "Footer";
  accessibilityLevel?: Maybe<Enum_Footer_Accessibilitylevel>;
  contractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  legalContent?: Maybe<LegalContentEntityResponse>;
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
  and?: InputMaybe<Array<InputMaybe<FooterFiltersInput>>>;
  contractCustomization?: InputMaybe<ContractCustomizationFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  legalContent?: InputMaybe<LegalContentFiltersInput>;
  not?: InputMaybe<FooterFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FooterFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FooterInput = {
  accessibilityLevel?: InputMaybe<Enum_Footer_Accessibilitylevel>;
  contractCustomization?: InputMaybe<Scalars["ID"]>;
  legalContent?: InputMaybe<Scalars["ID"]>;
};

export type FreeContent = {
  __typename?: "FreeContent";
  body?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  editoContent?: Maybe<EditoContentEntityResponse>;
  freeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  image?: Maybe<UploadFileEntityResponse>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  shortDescription?: Maybe<Scalars["String"]>;
  tags?: Maybe<TagRelationResponseCollection>;
  title?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type FreeContentTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

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
  body?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  editoContent?: InputMaybe<EditoContentFiltersInput>;
  freeContentSubService?: InputMaybe<FreeContentSubServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<FreeContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FreeContentFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  shortDescription?: InputMaybe<StringFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FreeContentInput = {
  body?: InputMaybe<Scalars["String"]>;
  editoContent?: InputMaybe<Scalars["ID"]>;
  freeContentSubService?: InputMaybe<Scalars["ID"]>;
  image?: InputMaybe<Scalars["ID"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  shortDescription?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
};

export type FreeContentRelationResponseCollection = {
  __typename?: "FreeContentRelationResponseCollection";
  data: Array<FreeContentEntity>;
};

export type FreeContentSubService = {
  __typename?: "FreeContentSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  freeContents?: Maybe<FreeContentRelationResponseCollection>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type FreeContentSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type FreeContentSubServiceFreeContentsArgs = {
  filters?: InputMaybe<FreeContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
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
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  freeContents?: InputMaybe<FreeContentFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<FreeContentSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<FreeContentSubServiceFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type FreeContentSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  freeContents?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type FreeContentSubServiceRelationResponseCollection = {
  __typename?: "FreeContentSubServiceRelationResponseCollection";
  data: Array<FreeContentSubServiceEntity>;
};

export type GenericMorph =
  | AudienceType
  | ChannelType
  | City
  | Client
  | ClientType
  | ComponentLinksContactUs
  | ComponentLinksEditorial
  | ComponentLinksEvents
  | ComponentLinksExternal
  | ComponentLinksFrees
  | ComponentLinksNews
  | ComponentLinksQuizzes
  | ComponentLinksRecycling
  | ComponentLinksRequest
  | ComponentLinksTips
  | ContactUsService
  | Contract
  | ContractCustomization
  | ContractMenu
  | DescriptionService
  | Document
  | EditoBlock
  | EditoContent
  | EditorialService
  | Epci
  | Event
  | EventSubService
  | Footer
  | FreeContent
  | FreeContentSubService
  | Global
  | Homepage
  | I18NLocale
  | KeyMetric
  | LegalContent
  | New
  | NewsSubService
  | Profile
  | Quiz
  | QuizAndTipsBlock
  | QuizSubService
  | RecyclingGuideBlock
  | RecyclingGuideService
  | RequestService
  | SearchEngineBlock
  | ServicesBlock
  | Tag
  | Territory
  | TerritoryType
  | Tip
  | TipSubService
  | TopContent
  | TopContentBlock
  | UploadFile
  | UploadFolder
  | UsersPermissionsPermission
  | UsersPermissionsRole
  | UsersPermissionsUser;

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

export type LegalContent = {
  __typename?: "LegalContent";
  GCULink?: Maybe<Scalars["String"]>;
  accessibilityLink?: Maybe<Scalars["String"]>;
  confidentiality?: Maybe<Scalars["String"]>;
  cookiesPolicy?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type LegalContentEntity = {
  __typename?: "LegalContentEntity";
  attributes?: Maybe<LegalContent>;
  id?: Maybe<Scalars["ID"]>;
};

export type LegalContentEntityResponse = {
  __typename?: "LegalContentEntityResponse";
  data?: Maybe<LegalContentEntity>;
};

export type LegalContentEntityResponseCollection = {
  __typename?: "LegalContentEntityResponseCollection";
  data: Array<LegalContentEntity>;
  meta: ResponseCollectionMeta;
};

export type LegalContentFiltersInput = {
  GCULink?: InputMaybe<StringFilterInput>;
  accessibilityLink?: InputMaybe<StringFilterInput>;
  and?: InputMaybe<Array<InputMaybe<LegalContentFiltersInput>>>;
  confidentiality?: InputMaybe<StringFilterInput>;
  cookiesPolicy?: InputMaybe<StringFilterInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<LegalContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<LegalContentFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type LegalContentInput = {
  GCULink?: InputMaybe<Scalars["String"]>;
  accessibilityLink?: InputMaybe<Scalars["String"]>;
  confidentiality?: InputMaybe<Scalars["String"]>;
  cookiesPolicy?: InputMaybe<Scalars["String"]>;
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
  /** Change user password. Confirm with the current password. */
  changePassword?: Maybe<UsersPermissionsLoginPayload>;
  createAudienceType?: Maybe<AudienceTypeEntityResponse>;
  createChannelType?: Maybe<ChannelTypeEntityResponse>;
  createCity?: Maybe<CityEntityResponse>;
  createClient?: Maybe<ClientEntityResponse>;
  createClientType?: Maybe<ClientTypeEntityResponse>;
  createContactUsService?: Maybe<ContactUsServiceEntityResponse>;
  createContract?: Maybe<ContractEntityResponse>;
  createContractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  createContractMenu?: Maybe<ContractMenuEntityResponse>;
  createDescriptionService?: Maybe<DescriptionServiceEntityResponse>;
  createDocument?: Maybe<DocumentEntityResponse>;
  createEditoBlock?: Maybe<EditoBlockEntityResponse>;
  createEditoContent?: Maybe<EditoContentEntityResponse>;
  createEditorialService?: Maybe<EditorialServiceEntityResponse>;
  createEditorialServiceForContract?: Maybe<EditorialServiceEntity>;
  createEmptyContract?: Maybe<ContractPayload>;
  createEpci?: Maybe<EpciEntityResponse>;
  createEvent?: Maybe<EventEntityResponse>;
  createEventSubService?: Maybe<EventSubServiceEntityResponse>;
  createFooter?: Maybe<FooterEntityResponse>;
  createFreeContent?: Maybe<FreeContentEntityResponse>;
  createFreeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  createHomepage?: Maybe<HomepageEntityResponse>;
  createKeyMetric?: Maybe<KeyMetricEntityResponse>;
  createLegalContent?: Maybe<LegalContentEntityResponse>;
  createNew?: Maybe<NewEntityResponse>;
  createNewsSubService?: Maybe<NewsSubServiceEntityResponse>;
  createProfile?: Maybe<ProfileEntityResponse>;
  createQuiz?: Maybe<QuizEntityResponse>;
  createQuizAndTipsBlock?: Maybe<QuizAndTipsBlockEntityResponse>;
  createQuizSubService?: Maybe<QuizSubServiceEntityResponse>;
  createRecyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  createRecyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  createRequestService?: Maybe<RequestServiceEntityResponse>;
  createRequestServiceForContract?: Maybe<RequestServiceEntity>;
  createSearchEngineBlock?: Maybe<SearchEngineBlockEntityResponse>;
  createServicesBlock?: Maybe<ServicesBlockEntityResponse>;
  createTag?: Maybe<TagEntityResponse>;
  createTerritory?: Maybe<TerritoryEntityResponse>;
  createTerritoryType?: Maybe<TerritoryTypeEntityResponse>;
  createTip?: Maybe<TipEntityResponse>;
  createTipSubService?: Maybe<TipSubServiceEntityResponse>;
  createTopContent?: Maybe<TopContentEntityResponse>;
  createTopContentBlock?: Maybe<TopContentBlockEntityResponse>;
  createUploadFile?: Maybe<UploadFileEntityResponse>;
  createUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Create a new role */
  createUsersPermissionsRole?: Maybe<UsersPermissionsCreateRolePayload>;
  /** Create a new user */
  createUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  deleteAudienceType?: Maybe<AudienceTypeEntityResponse>;
  deleteChannelType?: Maybe<ChannelTypeEntityResponse>;
  deleteCity?: Maybe<CityEntityResponse>;
  deleteClient?: Maybe<ClientEntityResponse>;
  deleteClientType?: Maybe<ClientTypeEntityResponse>;
  deleteContactUsService?: Maybe<ContactUsServiceEntityResponse>;
  deleteContract?: Maybe<ContractEntityResponse>;
  deleteContractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  deleteContractMenu?: Maybe<ContractMenuEntityResponse>;
  deleteDescriptionService?: Maybe<DescriptionServiceEntityResponse>;
  deleteDocument?: Maybe<DocumentEntityResponse>;
  deleteEditoBlock?: Maybe<EditoBlockEntityResponse>;
  deleteEditoContent?: Maybe<EditoContentEntityResponse>;
  deleteEditorialService?: Maybe<EditorialServiceEntityResponse>;
  deleteEpci?: Maybe<EpciEntityResponse>;
  deleteEvent?: Maybe<EventEntityResponse>;
  deleteEventSubService?: Maybe<EventSubServiceEntityResponse>;
  deleteFooter?: Maybe<FooterEntityResponse>;
  deleteFreeContent?: Maybe<FreeContentEntityResponse>;
  deleteFreeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  deleteGlobal?: Maybe<GlobalEntityResponse>;
  deleteHomepage?: Maybe<HomepageEntityResponse>;
  deleteKeyMetric?: Maybe<KeyMetricEntityResponse>;
  deleteLegalContent?: Maybe<LegalContentEntityResponse>;
  deleteNew?: Maybe<NewEntityResponse>;
  deleteNewsSubService?: Maybe<NewsSubServiceEntityResponse>;
  deleteProfile?: Maybe<ProfileEntityResponse>;
  deleteQuiz?: Maybe<QuizEntityResponse>;
  deleteQuizAndTipsBlock?: Maybe<QuizAndTipsBlockEntityResponse>;
  deleteQuizSubService?: Maybe<QuizSubServiceEntityResponse>;
  deleteRecyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  deleteRecyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  deleteRequestService?: Maybe<RequestServiceEntityResponse>;
  deleteSearchEngineBlock?: Maybe<SearchEngineBlockEntityResponse>;
  deleteServicesBlock?: Maybe<ServicesBlockEntityResponse>;
  deleteTag?: Maybe<TagEntityResponse>;
  deleteTerritory?: Maybe<TerritoryEntityResponse>;
  deleteTerritoryType?: Maybe<TerritoryTypeEntityResponse>;
  deleteTip?: Maybe<TipEntityResponse>;
  deleteTipSubService?: Maybe<TipSubServiceEntityResponse>;
  deleteTopContent?: Maybe<TopContentEntityResponse>;
  deleteTopContentBlock?: Maybe<TopContentBlockEntityResponse>;
  deleteUploadFile?: Maybe<UploadFileEntityResponse>;
  deleteUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Delete an existing role */
  deleteUsersPermissionsRole?: Maybe<UsersPermissionsDeleteRolePayload>;
  /** Delete an existing user */
  deleteUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  /** Confirm an email users email address */
  emailConfirmation?: Maybe<UsersPermissionsLoginPayload>;
  /** Request a reset password token */
  forgotPassword?: Maybe<UsersPermissionsPasswordPayload>;
  login: UsersPermissionsLoginPayload;
  multipleUpload: Array<Maybe<UploadFileEntityResponse>>;
  /** Register a user */
  register: UsersPermissionsLoginPayload;
  removeFile?: Maybe<UploadFileEntityResponse>;
  /** Reset user password. Confirm with a code (resetToken from forgotPassword) */
  resetPassword?: Maybe<UsersPermissionsLoginPayload>;
  updateAudienceType?: Maybe<AudienceTypeEntityResponse>;
  updateChannelType?: Maybe<ChannelTypeEntityResponse>;
  updateCity?: Maybe<CityEntityResponse>;
  updateClient?: Maybe<ClientEntityResponse>;
  updateClientType?: Maybe<ClientTypeEntityResponse>;
  updateContactUsService?: Maybe<ContactUsServiceEntityResponse>;
  updateContract?: Maybe<ContractEntityResponse>;
  updateContractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  updateContractMenu?: Maybe<ContractMenuEntityResponse>;
  updateDescriptionService?: Maybe<DescriptionServiceEntityResponse>;
  updateDocument?: Maybe<DocumentEntityResponse>;
  updateEditoBlock?: Maybe<EditoBlockEntityResponse>;
  updateEditoContent?: Maybe<EditoContentEntityResponse>;
  updateEditorialService?: Maybe<EditorialServiceEntityResponse>;
  updateEpci?: Maybe<EpciEntityResponse>;
  updateEvent?: Maybe<EventEntityResponse>;
  updateEventSubService?: Maybe<EventSubServiceEntityResponse>;
  updateFileInfo: UploadFileEntityResponse;
  updateFooter?: Maybe<FooterEntityResponse>;
  updateFreeContent?: Maybe<FreeContentEntityResponse>;
  updateFreeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  updateGlobal?: Maybe<GlobalEntityResponse>;
  updateHomepage?: Maybe<HomepageEntityResponse>;
  updateKeyMetric?: Maybe<KeyMetricEntityResponse>;
  updateLegalContent?: Maybe<LegalContentEntityResponse>;
  updateNew?: Maybe<NewEntityResponse>;
  updateNewsSubService?: Maybe<NewsSubServiceEntityResponse>;
  updateProfile?: Maybe<ProfileEntityResponse>;
  updateQuiz?: Maybe<QuizEntityResponse>;
  updateQuizAndTipsBlock?: Maybe<QuizAndTipsBlockEntityResponse>;
  updateQuizSubService?: Maybe<QuizSubServiceEntityResponse>;
  updateRecyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  updateRecyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  updateRequestService?: Maybe<RequestServiceEntityResponse>;
  updateSearchEngineBlock?: Maybe<SearchEngineBlockEntityResponse>;
  updateServicesBlock?: Maybe<ServicesBlockEntityResponse>;
  updateTag?: Maybe<TagEntityResponse>;
  updateTerritory?: Maybe<TerritoryEntityResponse>;
  updateTerritoryType?: Maybe<TerritoryTypeEntityResponse>;
  updateTip?: Maybe<TipEntityResponse>;
  updateTipSubService?: Maybe<TipSubServiceEntityResponse>;
  updateTopContent?: Maybe<TopContentEntityResponse>;
  updateTopContentBlock?: Maybe<TopContentBlockEntityResponse>;
  updateUploadFile?: Maybe<UploadFileEntityResponse>;
  updateUploadFolder?: Maybe<UploadFolderEntityResponse>;
  /** Update an existing role */
  updateUsersPermissionsRole?: Maybe<UsersPermissionsUpdateRolePayload>;
  /** Update an existing user */
  updateUsersPermissionsUser: UsersPermissionsUserEntityResponse;
  upload: UploadFileEntityResponse;
};

export type MutationChangePasswordArgs = {
  currentPassword: Scalars["String"];
  password: Scalars["String"];
  passwordConfirmation: Scalars["String"];
};

export type MutationCreateAudienceTypeArgs = {
  data: AudienceTypeInput;
};

export type MutationCreateChannelTypeArgs = {
  data: ChannelTypeInput;
};

export type MutationCreateCityArgs = {
  data: CityInput;
};

export type MutationCreateClientArgs = {
  data: ClientInput;
};

export type MutationCreateClientTypeArgs = {
  data: ClientTypeInput;
};

export type MutationCreateContactUsServiceArgs = {
  data: ContactUsServiceInput;
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

export type MutationCreateDescriptionServiceArgs = {
  data: DescriptionServiceInput;
};

export type MutationCreateDocumentArgs = {
  data: DocumentInput;
};

export type MutationCreateEditoBlockArgs = {
  data: EditoBlockInput;
};

export type MutationCreateEditoContentArgs = {
  data: EditoContentInput;
};

export type MutationCreateEditorialServiceArgs = {
  data: EditorialServiceInput;
};

export type MutationCreateEditorialServiceForContractArgs = {
  contractId?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
};

export type MutationCreateEmptyContractArgs = {
  name?: InputMaybe<Scalars["String"]>;
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

export type MutationCreateKeyMetricArgs = {
  data: KeyMetricInput;
};

export type MutationCreateLegalContentArgs = {
  data: LegalContentInput;
};

export type MutationCreateNewArgs = {
  data: NewInput;
};

export type MutationCreateNewsSubServiceArgs = {
  data: NewsSubServiceInput;
};

export type MutationCreateProfileArgs = {
  data: ProfileInput;
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

export type MutationCreateRequestServiceArgs = {
  data: RequestServiceInput;
};

export type MutationCreateRequestServiceForContractArgs = {
  contractId?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["Date"]>;
  startDate?: InputMaybe<Scalars["Date"]>;
};

export type MutationCreateSearchEngineBlockArgs = {
  data: SearchEngineBlockInput;
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

export type MutationCreateTopContentArgs = {
  data: TopContentInput;
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

export type MutationCreateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
};

export type MutationCreateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
};

export type MutationDeleteAudienceTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteChannelTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteCityArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteClientArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteClientTypeArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteContactUsServiceArgs = {
  id: Scalars["ID"];
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

export type MutationDeleteDescriptionServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteDocumentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEditoBlockArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteEditoContentArgs = {
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

export type MutationDeleteKeyMetricArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteLegalContentArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteNewArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteNewsSubServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteProfileArgs = {
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

export type MutationDeleteRequestServiceArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteSearchEngineBlockArgs = {
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

export type MutationDeleteTopContentArgs = {
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

export type MutationDeleteUsersPermissionsRoleArgs = {
  id: Scalars["ID"];
};

export type MutationDeleteUsersPermissionsUserArgs = {
  id: Scalars["ID"];
};

export type MutationEmailConfirmationArgs = {
  confirmation: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
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

export type MutationUpdateAudienceTypeArgs = {
  data: AudienceTypeInput;
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

export type MutationUpdateClientArgs = {
  data: ClientInput;
  id: Scalars["ID"];
};

export type MutationUpdateClientTypeArgs = {
  data: ClientTypeInput;
  id: Scalars["ID"];
};

export type MutationUpdateContactUsServiceArgs = {
  data: ContactUsServiceInput;
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

export type MutationUpdateDescriptionServiceArgs = {
  data: DescriptionServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateDocumentArgs = {
  data: DocumentInput;
  id: Scalars["ID"];
};

export type MutationUpdateEditoBlockArgs = {
  data: EditoBlockInput;
  id: Scalars["ID"];
};

export type MutationUpdateEditoContentArgs = {
  data: EditoContentInput;
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

export type MutationUpdateFileInfoArgs = {
  id: Scalars["ID"];
  info?: InputMaybe<FileInfoInput>;
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

export type MutationUpdateGlobalArgs = {
  data: GlobalInput;
};

export type MutationUpdateHomepageArgs = {
  data: HomepageInput;
  id: Scalars["ID"];
};

export type MutationUpdateKeyMetricArgs = {
  data: KeyMetricInput;
  id: Scalars["ID"];
};

export type MutationUpdateLegalContentArgs = {
  data: LegalContentInput;
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

export type MutationUpdateProfileArgs = {
  data: ProfileInput;
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

export type MutationUpdateRequestServiceArgs = {
  data: RequestServiceInput;
  id: Scalars["ID"];
};

export type MutationUpdateSearchEngineBlockArgs = {
  data: SearchEngineBlockInput;
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

export type MutationUpdateTopContentArgs = {
  data: TopContentInput;
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

export type MutationUpdateUsersPermissionsRoleArgs = {
  data: UsersPermissionsRoleInput;
  id: Scalars["ID"];
};

export type MutationUpdateUsersPermissionsUserArgs = {
  data: UsersPermissionsUserInput;
  id: Scalars["ID"];
};

export type MutationUploadArgs = {
  field?: InputMaybe<Scalars["String"]>;
  file: Scalars["Upload"];
  info?: InputMaybe<FileInfoInput>;
  ref?: InputMaybe<Scalars["String"]>;
  refId?: InputMaybe<Scalars["ID"]>;
};

export type New = {
  __typename?: "New";
  audiences?: Maybe<AudienceTypeRelationResponseCollection>;
  channels?: Maybe<ChannelTypeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  editoContent?: Maybe<EditoContentEntityResponse>;
  image?: Maybe<UploadFileEntityResponse>;
  newsSubService?: Maybe<NewsSubServiceEntityResponse>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  tags?: Maybe<TagRelationResponseCollection>;
  title: Scalars["String"];
  topContent?: Maybe<TopContentEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  video?: Maybe<UploadFileEntityResponse>;
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
  editoContent?: InputMaybe<EditoContentFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  newsSubService?: InputMaybe<NewsSubServiceFiltersInput>;
  not?: InputMaybe<NewFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<NewFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  topContent?: InputMaybe<TopContentFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type NewInput = {
  audiences?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  channels?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  editoContent?: InputMaybe<Scalars["ID"]>;
  image?: InputMaybe<Scalars["ID"]>;
  newsSubService?: InputMaybe<Scalars["ID"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
  topContent?: InputMaybe<Scalars["ID"]>;
  video?: InputMaybe<Scalars["ID"]>;
};

export type NewRelationResponseCollection = {
  __typename?: "NewRelationResponseCollection";
  data: Array<NewEntity>;
};

export type NewsSubService = {
  __typename?: "NewsSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  news?: Maybe<NewRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type NewsSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type NewsSubServiceNewsArgs = {
  filters?: InputMaybe<NewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
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
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  news?: InputMaybe<NewFiltersInput>;
  not?: InputMaybe<NewsSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<NewsSubServiceFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type NewsSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  news?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
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

export type Profile = {
  __typename?: "Profile";
  createdAt?: Maybe<Scalars["DateTime"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type ProfileEntity = {
  __typename?: "ProfileEntity";
  attributes?: Maybe<Profile>;
  id?: Maybe<Scalars["ID"]>;
};

export type ProfileEntityResponse = {
  __typename?: "ProfileEntityResponse";
  data?: Maybe<ProfileEntity>;
};

export type ProfileEntityResponseCollection = {
  __typename?: "ProfileEntityResponseCollection";
  data: Array<ProfileEntity>;
  meta: ResponseCollectionMeta;
};

export type ProfileFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<ProfileFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<ProfileFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<ProfileFiltersInput>>>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type ProfileInput = {
  name?: InputMaybe<Scalars["String"]>;
};

export enum PublicationState {
  Live = "LIVE",
  Preview = "PREVIEW",
}

export type Query = {
  __typename?: "Query";
  audienceType?: Maybe<AudienceTypeEntityResponse>;
  audienceTypes?: Maybe<AudienceTypeEntityResponseCollection>;
  channelType?: Maybe<ChannelTypeEntityResponse>;
  channelTypes?: Maybe<ChannelTypeEntityResponseCollection>;
  cities?: Maybe<CityEntityResponseCollection>;
  city?: Maybe<CityEntityResponse>;
  client?: Maybe<ClientEntityResponse>;
  clientType?: Maybe<ClientTypeEntityResponse>;
  clientTypes?: Maybe<ClientTypeEntityResponseCollection>;
  clients?: Maybe<ClientEntityResponseCollection>;
  contactUsService?: Maybe<ContactUsServiceEntityResponse>;
  contactUsServices?: Maybe<ContactUsServiceEntityResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  contractCustomization?: Maybe<ContractCustomizationEntityResponse>;
  contractCustomizations?: Maybe<ContractCustomizationEntityResponseCollection>;
  contractMenu?: Maybe<ContractMenuEntityResponse>;
  contractMenus?: Maybe<ContractMenuEntityResponseCollection>;
  contracts?: Maybe<ContractEntityResponseCollection>;
  countContentPerTag?: Maybe<Array<Maybe<Tag>>>;
  descriptionService?: Maybe<DescriptionServiceEntityResponse>;
  descriptionServices?: Maybe<DescriptionServiceEntityResponseCollection>;
  document?: Maybe<DocumentEntityResponse>;
  documents?: Maybe<DocumentEntityResponseCollection>;
  editoBlock?: Maybe<EditoBlockEntityResponse>;
  editoBlocks?: Maybe<EditoBlockEntityResponseCollection>;
  editoContent?: Maybe<EditoContentEntityResponse>;
  editoContents?: Maybe<EditoContentEntityResponseCollection>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  editorialServices?: Maybe<EditorialServiceEntityResponseCollection>;
  epci?: Maybe<EpciEntityResponse>;
  epcis?: Maybe<EpciEntityResponseCollection>;
  event?: Maybe<EventEntityResponse>;
  eventSubService?: Maybe<EventSubServiceEntityResponse>;
  eventSubServices?: Maybe<EventSubServiceEntityResponseCollection>;
  events?: Maybe<EventEntityResponseCollection>;
  footer?: Maybe<FooterEntityResponse>;
  footers?: Maybe<FooterEntityResponseCollection>;
  freeContent?: Maybe<FreeContentEntityResponse>;
  freeContentSubService?: Maybe<FreeContentSubServiceEntityResponse>;
  freeContentSubServices?: Maybe<FreeContentSubServiceEntityResponseCollection>;
  freeContents?: Maybe<FreeContentEntityResponseCollection>;
  getEditoBlockDTO?: Maybe<EditoBlockDto>;
  getEditoContentDTOs?: Maybe<Array<Maybe<EditoContentDto>>>;
  getTopContentBlockDTO?: Maybe<TopContentBlockDto>;
  getTopContentDTOs?: Maybe<Array<Maybe<TopContentDto>>>;
  global?: Maybe<GlobalEntityResponse>;
  homepage?: Maybe<HomepageEntityResponse>;
  homepages?: Maybe<HomepageEntityResponseCollection>;
  i18NLocale?: Maybe<I18NLocaleEntityResponse>;
  i18NLocales?: Maybe<I18NLocaleEntityResponseCollection>;
  keyMetric?: Maybe<KeyMetricEntityResponse>;
  keyMetrics?: Maybe<KeyMetricEntityResponseCollection>;
  legalContent?: Maybe<LegalContentEntityResponse>;
  legalContents?: Maybe<LegalContentEntityResponseCollection>;
  me?: Maybe<UsersPermissionsMe>;
  new?: Maybe<NewEntityResponse>;
  news?: Maybe<NewEntityResponseCollection>;
  newsSubService?: Maybe<NewsSubServiceEntityResponse>;
  newsSubServices?: Maybe<NewsSubServiceEntityResponseCollection>;
  profile?: Maybe<ProfileEntityResponse>;
  profiles?: Maybe<ProfileEntityResponseCollection>;
  quiz?: Maybe<QuizEntityResponse>;
  quizAndTipsBlock?: Maybe<QuizAndTipsBlockEntityResponse>;
  quizAndTipsBlocks?: Maybe<QuizAndTipsBlockEntityResponseCollection>;
  quizSubService?: Maybe<QuizSubServiceEntityResponse>;
  quizSubServices?: Maybe<QuizSubServiceEntityResponseCollection>;
  quizzes?: Maybe<QuizEntityResponseCollection>;
  recyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  recyclingGuideBlocks?: Maybe<RecyclingGuideBlockEntityResponseCollection>;
  recyclingGuideService?: Maybe<RecyclingGuideServiceEntityResponse>;
  recyclingGuideServices?: Maybe<RecyclingGuideServiceEntityResponseCollection>;
  requestService?: Maybe<RequestServiceEntityResponse>;
  requestServices?: Maybe<RequestServiceEntityResponseCollection>;
  searchEngineBlock?: Maybe<SearchEngineBlockEntityResponse>;
  searchEngineBlocks?: Maybe<SearchEngineBlockEntityResponseCollection>;
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
  topContent?: Maybe<TopContentEntityResponse>;
  topContentBlock?: Maybe<TopContentBlockEntityResponse>;
  topContentBlocks?: Maybe<TopContentBlockEntityResponseCollection>;
  topContents?: Maybe<TopContentEntityResponseCollection>;
  uploadFile?: Maybe<UploadFileEntityResponse>;
  uploadFiles?: Maybe<UploadFileEntityResponseCollection>;
  uploadFolder?: Maybe<UploadFolderEntityResponse>;
  uploadFolders?: Maybe<UploadFolderEntityResponseCollection>;
  usersPermissionsRole?: Maybe<UsersPermissionsRoleEntityResponse>;
  usersPermissionsRoles?: Maybe<UsersPermissionsRoleEntityResponseCollection>;
  usersPermissionsUser?: Maybe<UsersPermissionsUserEntityResponse>;
  usersPermissionsUsers?: Maybe<UsersPermissionsUserEntityResponseCollection>;
};

export type QueryAudienceTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
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

export type QueryClientArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryClientTypeArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryClientTypesArgs = {
  filters?: InputMaybe<ClientTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryClientsArgs = {
  filters?: InputMaybe<ClientFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryContactUsServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryContactUsServicesArgs = {
  filters?: InputMaybe<ContactUsServiceFiltersInput>;
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

export type QueryContractsArgs = {
  filters?: InputMaybe<ContractFiltersInput>;
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

export type QueryEditoBlockArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryEditoBlocksArgs = {
  filters?: InputMaybe<EditoBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryEditoContentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryEditoContentsArgs = {
  filters?: InputMaybe<EditoContentFiltersInput>;
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
  publicationState?: InputMaybe<PublicationState>;
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
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryGetEditoBlockDtoArgs = {
  contractId: Scalars["ID"];
};

export type QueryGetEditoContentDtOsArgs = {
  contractId: Scalars["ID"];
};

export type QueryGetTopContentBlockDtoArgs = {
  contractId: Scalars["ID"];
};

export type QueryGetTopContentDtOsArgs = {
  contractId: Scalars["ID"];
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

export type QueryKeyMetricArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryKeyMetricsArgs = {
  filters?: InputMaybe<KeyMetricFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryLegalContentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryLegalContentsArgs = {
  filters?: InputMaybe<LegalContentFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryNewArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryNewsArgs = {
  filters?: InputMaybe<NewFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
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

export type QueryProfileArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryProfilesArgs = {
  filters?: InputMaybe<ProfileFiltersInput>;
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
  publicationState?: InputMaybe<PublicationState>;
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

export type QueryRecyclingGuideServiceArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryRecyclingGuideServicesArgs = {
  filters?: InputMaybe<RecyclingGuideServiceFiltersInput>;
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

export type QuerySearchEngineBlockArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QuerySearchEngineBlocksArgs = {
  filters?: InputMaybe<SearchEngineBlockFiltersInput>;
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
  publicationState?: InputMaybe<PublicationState>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTopContentArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTopContentBlockArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type QueryTopContentBlocksArgs = {
  filters?: InputMaybe<TopContentBlockFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QueryTopContentsArgs = {
  filters?: InputMaybe<TopContentFiltersInput>;
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

export type Quiz = {
  __typename?: "Quiz";
  createdAt?: Maybe<Scalars["DateTime"]>;
  editoContent?: Maybe<EditoContentEntityResponse>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  quizSubService?: Maybe<QuizSubServiceEntityResponse>;
  tags?: Maybe<TagRelationResponseCollection>;
  title?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
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
  publicationState?: InputMaybe<PublicationState>;
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
  editoContent?: InputMaybe<EditoContentFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  not?: InputMaybe<QuizFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<QuizFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  quizSubService?: InputMaybe<QuizSubServiceFiltersInput>;
  tags?: InputMaybe<TagFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type QuizInput = {
  editoContent?: InputMaybe<Scalars["ID"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  quizSubService?: InputMaybe<Scalars["ID"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  title?: InputMaybe<Scalars["String"]>;
};

export type QuizRelationResponseCollection = {
  __typename?: "QuizRelationResponseCollection";
  data: Array<QuizEntity>;
};

export type QuizSubService = {
  __typename?: "QuizSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  quizzes?: Maybe<QuizRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type QuizSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type QuizSubServiceQuizzesArgs = {
  filters?: InputMaybe<QuizFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
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
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<QuizSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<QuizSubServiceFiltersInput>>>;
  quizzes?: InputMaybe<QuizFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type QuizSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  quizzes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
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
  channelType?: Maybe<ChannelTypeEntityResponse>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  endDate: Scalars["DateTime"];
  isActivated: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  startDate: Scalars["DateTime"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
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
  channelType?: InputMaybe<ChannelTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<RecyclingGuideServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RecyclingGuideServiceFiltersInput>>>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RecyclingGuideServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  channelType?: InputMaybe<Scalars["ID"]>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
};

export type RequestService = {
  __typename?: "RequestService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  channelType?: Maybe<ChannelTypeEntityResponse>;
  cities?: Maybe<CityRelationResponseCollection>;
  contract?: Maybe<ContractEntityResponse>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  endDate: Scalars["DateTime"];
  isActivated: Scalars["Boolean"];
  name?: Maybe<Scalars["String"]>;
  startDate: Scalars["DateTime"];
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

export type RequestServiceEntity = {
  __typename?: "RequestServiceEntity";
  attributes?: Maybe<RequestService>;
  id?: Maybe<Scalars["ID"]>;
  serviceId?: Maybe<Scalars["ID"]>;
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
  channelType?: InputMaybe<ChannelTypeFiltersInput>;
  cities?: InputMaybe<CityFiltersInput>;
  contract?: InputMaybe<ContractFiltersInput>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  endDate?: InputMaybe<DateTimeFilterInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<RequestServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<RequestServiceFiltersInput>>>;
  startDate?: InputMaybe<DateTimeFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type RequestServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  channelType?: InputMaybe<Scalars["ID"]>;
  cities?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  contract?: InputMaybe<Scalars["ID"]>;
  endDate?: InputMaybe<Scalars["DateTime"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
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
  | ComponentLinksContactUs
  | ComponentLinksEditorial
  | ComponentLinksEvents
  | ComponentLinksExternal
  | ComponentLinksFrees
  | ComponentLinksNews
  | ComponentLinksQuizzes
  | ComponentLinksRecycling
  | ComponentLinksRequest
  | ComponentLinksTips
  | Error;

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
  event?: Maybe<EventEntityResponse>;
  freeContent?: Maybe<FreeContentEntityResponse>;
  name?: Maybe<Scalars["String"]>;
  news?: Maybe<NewEntityResponse>;
  quiz?: Maybe<QuizEntityResponse>;
  recyclingGuideBlock?: Maybe<RecyclingGuideBlockEntityResponse>;
  tagPerContent?: Maybe<Scalars["Int"]>;
  tip?: Maybe<TipEntityResponse>;
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
  event?: InputMaybe<EventFiltersInput>;
  freeContent?: InputMaybe<FreeContentFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isSystem?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  news?: InputMaybe<NewFiltersInput>;
  not?: InputMaybe<TagFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TagFiltersInput>>>;
  quiz?: InputMaybe<QuizFiltersInput>;
  recyclingGuideBlock?: InputMaybe<RecyclingGuideBlockFiltersInput>;
  tagPerContent?: InputMaybe<IntFilterInput>;
  tip?: InputMaybe<TipFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TagInput = {
  contract?: InputMaybe<Scalars["ID"]>;
  event?: InputMaybe<Scalars["ID"]>;
  freeContent?: InputMaybe<Scalars["ID"]>;
  isSystem?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  news?: InputMaybe<Scalars["ID"]>;
  quiz?: InputMaybe<Scalars["ID"]>;
  recyclingGuideBlock?: InputMaybe<Scalars["ID"]>;
  tagPerContent?: InputMaybe<Scalars["Int"]>;
  tip?: InputMaybe<Scalars["ID"]>;
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
  createdAt?: Maybe<Scalars["DateTime"]>;
  editoContent?: Maybe<EditoContentEntityResponse>;
  link?: Maybe<Scalars["String"]>;
  publishedAt?: Maybe<Scalars["DateTime"]>;
  tags?: Maybe<TagRelationResponseCollection>;
  tipSubService?: Maybe<TipSubServiceEntityResponse>;
  title: Scalars["String"];
  titleLabel?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TipTagsArgs = {
  filters?: InputMaybe<TagFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

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
  editoContent?: InputMaybe<EditoContentFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  link?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<TipFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TipFiltersInput>>>;
  publishedAt?: InputMaybe<DateTimeFilterInput>;
  tags?: InputMaybe<TagFiltersInput>;
  tipSubService?: InputMaybe<TipSubServiceFiltersInput>;
  title?: InputMaybe<StringFilterInput>;
  titleLabel?: InputMaybe<StringFilterInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TipInput = {
  editoContent?: InputMaybe<Scalars["ID"]>;
  link?: InputMaybe<Scalars["String"]>;
  publishedAt?: InputMaybe<Scalars["DateTime"]>;
  tags?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  tipSubService?: InputMaybe<Scalars["ID"]>;
  title?: InputMaybe<Scalars["String"]>;
  titleLabel?: InputMaybe<Scalars["String"]>;
};

export type TipRelationResponseCollection = {
  __typename?: "TipRelationResponseCollection";
  data: Array<TipEntity>;
};

export type TipSubService = {
  __typename?: "TipSubService";
  audienceTypes?: Maybe<AudienceTypeRelationResponseCollection>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description: Scalars["String"];
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  isActivated: Scalars["Boolean"];
  name: Scalars["String"];
  tips?: Maybe<TipRelationResponseCollection>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TipSubServiceAudienceTypesArgs = {
  filters?: InputMaybe<AudienceTypeFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  sort?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
};

export type TipSubServiceTipsArgs = {
  filters?: InputMaybe<TipFiltersInput>;
  pagination?: InputMaybe<PaginationArg>;
  publicationState?: InputMaybe<PublicationState>;
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
  createdAt?: InputMaybe<DateTimeFilterInput>;
  description?: InputMaybe<StringFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  isActivated?: InputMaybe<BooleanFilterInput>;
  name?: InputMaybe<StringFilterInput>;
  not?: InputMaybe<TipSubServiceFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TipSubServiceFiltersInput>>>;
  tips?: InputMaybe<TipFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TipSubServiceInput = {
  audienceTypes?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
  description?: InputMaybe<Scalars["String"]>;
  editorialService?: InputMaybe<Scalars["ID"]>;
  isActivated?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  tips?: InputMaybe<Array<InputMaybe<Scalars["ID"]>>>;
};

export type TopContent = {
  __typename?: "TopContent";
  createdAt?: Maybe<Scalars["DateTime"]>;
  editorialService?: Maybe<EditorialServiceEntityResponse>;
  event?: Maybe<EventEntityResponse>;
  news?: Maybe<NewEntityResponse>;
  topContentBlock?: Maybe<TopContentBlockEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TopContentBlock = {
  __typename?: "TopContentBlock";
  createdAt?: Maybe<Scalars["DateTime"]>;
  displayBlock?: Maybe<Scalars["Boolean"]>;
  displayLastThreeContents?: Maybe<Scalars["Boolean"]>;
  hasTopContent?: Maybe<Scalars["Boolean"]>;
  homepage?: Maybe<HomepageEntityResponse>;
  titleContent: Scalars["String"];
  topContent?: Maybe<TopContentEntityResponse>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type TopContentBlockDto = {
  __typename?: "TopContentBlockDTO";
  displayBlock: Scalars["Boolean"];
  displayLastThreeContents: Scalars["Boolean"];
  hasTopContent: Scalars["Boolean"];
  id: Scalars["ID"];
  titleContent: Scalars["String"];
  topContent?: Maybe<TopContentDto>;
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
  topContent?: InputMaybe<TopContentFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TopContentBlockInput = {
  displayBlock?: InputMaybe<Scalars["Boolean"]>;
  displayLastThreeContents?: InputMaybe<Scalars["Boolean"]>;
  hasTopContent?: InputMaybe<Scalars["Boolean"]>;
  homepage?: InputMaybe<Scalars["ID"]>;
  titleContent?: InputMaybe<Scalars["String"]>;
  topContent?: InputMaybe<Scalars["ID"]>;
};

export type TopContentDto = {
  __typename?: "TopContentDTO";
  attributes: Attributes;
  contentType: Scalars["String"];
  id: Scalars["ID"];
  typeName: Scalars["String"];
};

export type TopContentEntity = {
  __typename?: "TopContentEntity";
  attributes?: Maybe<TopContent>;
  id?: Maybe<Scalars["ID"]>;
};

export type TopContentEntityResponse = {
  __typename?: "TopContentEntityResponse";
  data?: Maybe<TopContentEntity>;
};

export type TopContentEntityResponseCollection = {
  __typename?: "TopContentEntityResponseCollection";
  data: Array<TopContentEntity>;
  meta: ResponseCollectionMeta;
};

export type TopContentFiltersInput = {
  and?: InputMaybe<Array<InputMaybe<TopContentFiltersInput>>>;
  createdAt?: InputMaybe<DateTimeFilterInput>;
  editorialService?: InputMaybe<EditorialServiceFiltersInput>;
  event?: InputMaybe<EventFiltersInput>;
  id?: InputMaybe<IdFilterInput>;
  news?: InputMaybe<NewFiltersInput>;
  not?: InputMaybe<TopContentFiltersInput>;
  or?: InputMaybe<Array<InputMaybe<TopContentFiltersInput>>>;
  topContentBlock?: InputMaybe<TopContentBlockFiltersInput>;
  updatedAt?: InputMaybe<DateTimeFilterInput>;
};

export type TopContentInput = {
  editorialService?: InputMaybe<Scalars["ID"]>;
  event?: InputMaybe<Scalars["ID"]>;
  news?: InputMaybe<Scalars["ID"]>;
  topContentBlock?: InputMaybe<Scalars["ID"]>;
};

export type TopContentRelationResponseCollection = {
  __typename?: "TopContentRelationResponseCollection";
  data: Array<TopContentEntity>;
};

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
  profile?: Maybe<ProfileEntityResponse>;
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
  profile?: InputMaybe<ProfileFiltersInput>;
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
  profile?: InputMaybe<Scalars["ID"]>;
  provider?: InputMaybe<Scalars["String"]>;
  resetPasswordToken?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<Scalars["ID"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type UsersPermissionsUserRelationResponseCollection = {
  __typename?: "UsersPermissionsUserRelationResponseCollection";
  data: Array<UsersPermissionsUserEntity>;
};

export type GetEditoBlockTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
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
      id: string;
      contentType: string;
      typeName: string;
      attributes: {
        __typename?: "Attributes";
        title: string;
        publishedAt: any;
      };
    } | null> | null;
  } | null;
  getEditoContentDTOs?: Array<{
    __typename?: "EditoContentDTO";
    id: string;
    contentType: string;
    typeName: string;
    attributes: { __typename?: "Attributes"; title: string; publishedAt: any };
  } | null> | null;
};

export type GetQuizAndTipsBlockTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
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
                          publishedAt?: any | null;
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
                          publishedAt?: any | null;
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
              publishedAt?: any | null;
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
              publishedAt?: any | null;
            } | null;
          }>;
        } | null;
      } | null;
    }>;
  } | null;
};

export type GetRecyclingBlockTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetRecyclingBlockTabQuery = {
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
                          name?: string | null;
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

export type GetSearchEngineTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetSearchEngineTabQuery = {
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
        isActivated: boolean;
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
  contactUsServices?: {
    __typename?: "ContactUsServiceEntityResponseCollection";
    data: Array<{
      __typename?: "ContactUsServiceEntity";
      attributes?: {
        __typename?: "ContactUsService";
        isActivated: boolean;
      } | null;
    }>;
  } | null;
};

export type GetTopContentTabQueryVariables = Exact<{
  contractId: Scalars["ID"];
}>;

export type GetTopContentTabQuery = {
  __typename?: "Query";
  getTopContentBlockDTO?: {
    __typename?: "TopContentBlockDTO";
    id: string;
    displayBlock: boolean;
    displayLastThreeContents: boolean;
    hasTopContent: boolean;
    titleContent: string;
    topContent?: {
      __typename?: "TopContentDTO";
      id: string;
      contentType: string;
      typeName: string;
      attributes: {
        __typename?: "Attributes";
        title: string;
        publishedAt: any;
      };
    } | null;
  } | null;
  getTopContentDTOs?: Array<{
    __typename: "TopContentDTO";
    id: string;
    contentType: string;
    typeName: string;
    attributes: { __typename?: "Attributes"; title: string; publishedAt: any };
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
        displayBlock?: boolean | null;
        titleContent: string;
        editoContents?: {
          __typename?: "EditoContentRelationResponseCollection";
          data: Array<{
            __typename?: "EditoContentEntity";
            id?: string | null;
          }>;
        } | null;
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
            attributes?: { __typename?: "Tag"; name?: string | null } | null;
          }>;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type UpdateSearchEngineTabMutationVariables = Exact<{
  updateSearchEngineBlockId: Scalars["ID"];
  data: SearchEngineBlockInput;
}>;

export type UpdateSearchEngineTabMutation = {
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

export type UpdateTopContentTabMutationVariables = Exact<{
  updateTopContentBlockId: Scalars["ID"];
  data: TopContentBlockInput;
}>;

export type UpdateTopContentTabMutation = {
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
                    displayBlock?: boolean | null;
                    titleContent: string;
                    hasTopContent?: boolean | null;
                    displayLastThreeContents?: boolean | null;
                    topContent?: {
                      __typename?: "TopContentEntityResponse";
                      data?: {
                        __typename?: "TopContentEntity";
                        attributes?: {
                          __typename?: "TopContent";
                          event?: {
                            __typename?: "EventEntityResponse";
                            data?: {
                              __typename?: "EventEntity";
                              attributes?: {
                                __typename?: "Event";
                                publishedAt?: any | null;
                                title: string;
                              } | null;
                            } | null;
                          } | null;
                          news?: {
                            __typename?: "NewEntityResponse";
                            data?: {
                              __typename?: "NewEntity";
                              attributes?: {
                                __typename?: "New";
                                title: string;
                                publishedAt?: any | null;
                              } | null;
                            } | null;
                          } | null;
                        } | null;
                      } | null;
                    } | null;
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

export const GetEditoBlockTabDocument = gql`
  query getEditoBlockTab($contractId: ID!) {
    getEditoBlockDTO(contractId: $contractId) {
      id
      displayBlock
      titleContent
      editoContents {
        id
        contentType
        typeName
        attributes {
          title
          publishedAt
        }
      }
    }
    getEditoContentDTOs(contractId: $contractId) {
      id
      contentType
      typeName
      attributes {
        title
        publishedAt
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
  query getQuizAndTipsBlockTab($contractId: ID!) {
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
                            publishedAt
                          }
                        }
                      }
                      displayTips
                      tips {
                        data {
                          id
                          attributes {
                            title
                            publishedAt
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
          quizzes {
            data {
              id
              attributes {
                title
                publishedAt
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
          tips {
            data {
              id
              attributes {
                title
                publishedAt
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
export const GetRecyclingBlockTabDocument = gql`
  query getRecyclingBlockTab($contractId: ID!) {
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
 * __useGetRecyclingBlockTabQuery__
 *
 * To run a query within a React component, call `useGetRecyclingBlockTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecyclingBlockTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecyclingBlockTabQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetRecyclingBlockTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetRecyclingBlockTabQuery,
    GetRecyclingBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetRecyclingBlockTabQuery,
    GetRecyclingBlockTabQueryVariables
  >(GetRecyclingBlockTabDocument, options);
}
export function useGetRecyclingBlockTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetRecyclingBlockTabQuery,
    GetRecyclingBlockTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetRecyclingBlockTabQuery,
    GetRecyclingBlockTabQueryVariables
  >(GetRecyclingBlockTabDocument, options);
}
export type GetRecyclingBlockTabQueryHookResult = ReturnType<
  typeof useGetRecyclingBlockTabQuery
>;
export type GetRecyclingBlockTabLazyQueryHookResult = ReturnType<
  typeof useGetRecyclingBlockTabLazyQuery
>;
export type GetRecyclingBlockTabQueryResult = Apollo.QueryResult<
  GetRecyclingBlockTabQuery,
  GetRecyclingBlockTabQueryVariables
>;
export const GetSearchEngineTabDocument = gql`
  query getSearchEngineTab($contractId: ID!) {
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
 * __useGetSearchEngineTabQuery__
 *
 * To run a query within a React component, call `useGetSearchEngineTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchEngineTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchEngineTabQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetSearchEngineTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSearchEngineTabQuery,
    GetSearchEngineTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSearchEngineTabQuery,
    GetSearchEngineTabQueryVariables
  >(GetSearchEngineTabDocument, options);
}
export function useGetSearchEngineTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSearchEngineTabQuery,
    GetSearchEngineTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSearchEngineTabQuery,
    GetSearchEngineTabQueryVariables
  >(GetSearchEngineTabDocument, options);
}
export type GetSearchEngineTabQueryHookResult = ReturnType<
  typeof useGetSearchEngineTabQuery
>;
export type GetSearchEngineTabLazyQueryHookResult = ReturnType<
  typeof useGetSearchEngineTabLazyQuery
>;
export type GetSearchEngineTabQueryResult = Apollo.QueryResult<
  GetSearchEngineTabQuery,
  GetSearchEngineTabQueryVariables
>;
export const GetServicesActiveDocument = gql`
  query getServicesActive($contractId: ID!) {
    editorialServices(filters: { contract: { id: { eq: $contractId } } }) {
      data {
        attributes {
          isActivated
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
    contactUsServices(filters: { contract: { id: { eq: $contractId } } }) {
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
export const GetTopContentTabDocument = gql`
  query getTopContentTab($contractId: ID!) {
    getTopContentBlockDTO(contractId: $contractId) {
      id
      displayBlock
      displayLastThreeContents
      hasTopContent
      titleContent
      topContent {
        id
        contentType
        typeName
        attributes {
          title
          publishedAt
        }
      }
    }
    getTopContentDTOs(contractId: $contractId) {
      __typename
      id
      contentType
      typeName
      attributes {
        title
        publishedAt
      }
    }
  }
`;

/**
 * __useGetTopContentTabQuery__
 *
 * To run a query within a React component, call `useGetTopContentTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopContentTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopContentTabQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *   },
 * });
 */
export function useGetTopContentTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetTopContentTabQuery,
    GetTopContentTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTopContentTabQuery, GetTopContentTabQueryVariables>(
    GetTopContentTabDocument,
    options,
  );
}
export function useGetTopContentTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTopContentTabQuery,
    GetTopContentTabQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetTopContentTabQuery,
    GetTopContentTabQueryVariables
  >(GetTopContentTabDocument, options);
}
export type GetTopContentTabQueryHookResult = ReturnType<
  typeof useGetTopContentTabQuery
>;
export type GetTopContentTabLazyQueryHookResult = ReturnType<
  typeof useGetTopContentTabLazyQuery
>;
export type GetTopContentTabQueryResult = Apollo.QueryResult<
  GetTopContentTabQuery,
  GetTopContentTabQueryVariables
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
          editoContents {
            data {
              id
            }
          }
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
export const UpdateSearchEngineTabDocument = gql`
  mutation updateSearchEngineTab(
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
export type UpdateSearchEngineTabMutationFn = Apollo.MutationFunction<
  UpdateSearchEngineTabMutation,
  UpdateSearchEngineTabMutationVariables
>;

/**
 * __useUpdateSearchEngineTabMutation__
 *
 * To run a mutation, you first call `useUpdateSearchEngineTabMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSearchEngineTabMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSearchEngineTabMutation, { data, loading, error }] = useUpdateSearchEngineTabMutation({
 *   variables: {
 *      updateSearchEngineBlockId: // value for 'updateSearchEngineBlockId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateSearchEngineTabMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSearchEngineTabMutation,
    UpdateSearchEngineTabMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateSearchEngineTabMutation,
    UpdateSearchEngineTabMutationVariables
  >(UpdateSearchEngineTabDocument, options);
}
export type UpdateSearchEngineTabMutationHookResult = ReturnType<
  typeof useUpdateSearchEngineTabMutation
>;
export type UpdateSearchEngineTabMutationResult =
  Apollo.MutationResult<UpdateSearchEngineTabMutation>;
export type UpdateSearchEngineTabMutationOptions = Apollo.BaseMutationOptions<
  UpdateSearchEngineTabMutation,
  UpdateSearchEngineTabMutationVariables
>;
export const UpdateTopContentTabDocument = gql`
  mutation updateTopContentTab(
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
                      topContent {
                        data {
                          attributes {
                            event {
                              data {
                                attributes {
                                  publishedAt
                                  title
                                }
                              }
                            }
                            news {
                              data {
                                attributes {
                                  title
                                  publishedAt
                                }
                              }
                            }
                          }
                        }
                      }
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
export type UpdateTopContentTabMutationFn = Apollo.MutationFunction<
  UpdateTopContentTabMutation,
  UpdateTopContentTabMutationVariables
>;

/**
 * __useUpdateTopContentTabMutation__
 *
 * To run a mutation, you first call `useUpdateTopContentTabMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTopContentTabMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTopContentTabMutation, { data, loading, error }] = useUpdateTopContentTabMutation({
 *   variables: {
 *      updateTopContentBlockId: // value for 'updateTopContentBlockId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTopContentTabMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTopContentTabMutation,
    UpdateTopContentTabMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateTopContentTabMutation,
    UpdateTopContentTabMutationVariables
  >(UpdateTopContentTabDocument, options);
}
export type UpdateTopContentTabMutationHookResult = ReturnType<
  typeof useUpdateTopContentTabMutation
>;
export type UpdateTopContentTabMutationResult =
  Apollo.MutationResult<UpdateTopContentTabMutation>;
export type UpdateTopContentTabMutationOptions = Apollo.BaseMutationOptions<
  UpdateTopContentTabMutation,
  UpdateTopContentTabMutationVariables
>;
