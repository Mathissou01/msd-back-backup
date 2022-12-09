import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";
import CommonSvgDefs from "../components/Common/CommonSvgDefs/CommonSvgDefs";
import Header from "../components/Header/Header";
import "../styles/main.scss";

function MsdBackApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div id={"app"}>
        <CommonSvgDefs />
        <Header />
        <div className="o-Page__Container">
          <main role="main" className="o-Page__Main">
            <Component {...pageProps} />
          </main>
          {/*<Footer />*/}
        </div>
        <div id="modal-portal" />
      </div>
    </ApolloProvider>
  );
}

export default MsdBackApp;
