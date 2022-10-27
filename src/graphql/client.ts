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
  client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache(),
  });
}

export default client;
