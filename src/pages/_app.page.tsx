import { ApolloProvider } from "@apollo/client";
import { useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import client from "../graphql/client";
import { ContractContext } from "../hooks/useContract";
import { ENavigationPages, NavigationContext } from "../hooks/useNavigation";
import CommonSvgDefs from "../components/Common/CommonSvgDefs/CommonSvgDefs";
import Header from "../components/Header/Header";
import "../styles/main.scss";

function MsdBackApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [contractId, setContractId] = useState<`${number}`>("1");
  const [currentPage, setCurrentPage] = useState<keyof typeof ENavigationPages>(
    router.route as keyof typeof ENavigationPages,
  );

  return (
    <ApolloProvider client={client}>
      <ContractContext.Provider value={{ contractId, setContractId }}>
        <NavigationContext.Provider value={{ currentPage, setCurrentPage }}>
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
        </NavigationContext.Provider>
      </ContractContext.Provider>
    </ApolloProvider>
  );
}

export default MsdBackApp;
