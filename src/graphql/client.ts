import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let client: ApolloClient<NormalizedCacheObject>;

if (process.env.NEXT_PUBLIC_MOCK === "true") {
  /* With .env variable NEXT_PUBLIC_MOCK=true, return mock graphql client with fake response data */
  client = (await import("./mockedClient")).default(1000);
} else {
  client = await new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache({
      typePolicies: {
        UploadFolder: {
          merge: true,
        },
        UploadFile: {
          merge: true,
        },
        Contract: {
          merge: true,
        },
        ContractCustomization: {
          merge: true,
        },
        New: {
          merge: true,
        },
        Tip: {
          merge: true,
        },
        RecyclingGuideService: {
          merge: true,
        },
        WasteForm: {
          merge: true,
        },
        WasteFamily: {
          merge: true,
        },
        Flow: {
          merge: true,
        },
        FlowColor: {
          merge: true,
        },
        DropOffMap: {
          merge: true,
        },
        Request: {
          merge: true,
        },
        RequestAggregate: {
          merge: true,
        },
      },
    }),
  });
}

export default client;
