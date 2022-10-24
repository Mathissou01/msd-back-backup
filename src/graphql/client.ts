import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import getMockedClient from "./mockedClient";

let client: ApolloClient<NormalizedCacheObject>;

if (process.env.NEXT_PUBLIC_MOCK === "true") {
  /* With NODE_ENV var NEXT_PUBLIC_MOCK=true, mock client/graphql fetch with fake response data */
  client = getMockedClient(1000);
} else {
  client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache(),
  });
}

export default client;
