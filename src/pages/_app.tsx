import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";
import "../styles/main.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div id={"app"}>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
