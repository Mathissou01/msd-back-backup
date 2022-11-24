import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";
import "../styles/main.scss";
import Header from "../components/Header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div id={"app"}>
        <Header />
        <main role="main" className="o-Page__Content">
          <Component {...pageProps} />
        </main>
        <div id="modal-portal" />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;
