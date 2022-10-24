declare module "src/graphql/queries/events.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const GetTimeEvents: DocumentNode;
  export const CreateTimeEvent: DocumentNode;
  export const GetTimeSlots: DocumentNode;
  export const CreateTimeSlot: DocumentNode;
  export const GetTimeDays: DocumentNode;
  export const CreateTimeDay: DocumentNode;

  export default defaultDocument;
}

declare module "src/graphql/queries/pages.graphql" {
  import { DocumentNode } from "graphql";
  const defaultDocument: DocumentNode;
  export const GetPages: DocumentNode;
  export const PagesSummary: DocumentNode;

  export default defaultDocument;
}
