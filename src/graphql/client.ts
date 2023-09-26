import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { headerContractIdVar } from "./apolloState";
import { onError } from "@apollo/client/link/error";

let client: ApolloClient<NormalizedCacheObject>;

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: "include",
});

// Apollo typing is missing the statusCode property. Could not find a way to fix it.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logoutLink = onError((error: any) => {
  // Regulars error exception are not handled.
  if (
    error.networkError?.statusCode !== 401 &&
    error.networkError?.statusCode !== 403
  ) {
    return;
  }

  // Redirects to Azure login.
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
    credentials: "include",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((data) => {
      if (!data.url) {
        throw new Error("Missing URL in response");
      }

      window.location.href = data.url;
      return;
    });
});

const dynamicHeadersLink = new ApolloLink((operation, forward) => {
  const contractId = headerContractIdVar();
  operation.setContext({
    headers: {
      "x-contract-key": contractId,
    },
  });

  return forward(operation);
});

if (process.env.NEXT_PUBLIC_MOCK === "true") {
  /* With .env variable NEXT_PUBLIC_MOCK=true, return mock graphql client with fake response data */
  client = (await import("./mockedClient")).default(1000);
} else {
  client = await new ApolloClient({
    link: logoutLink.concat(dynamicHeadersLink.concat(httpLink)),
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
        FreeContent: {
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
        RequestSlot: {
          merge: true,
        },
        CollectVoluntary: {
          merge: true,
        },
        Sectorization: {
          merge: true,
        },
        Audience: {
          merge: true,
        },
        ChannelType: {
          merge: true,
        },
      },
    }),
  });
}

export default client;
