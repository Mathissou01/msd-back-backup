import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import client from "../graphql/client";
import { useState } from "react";
import { ContractEntity } from "../graphql/codegen/generated-types";
import { ENavigationPages, NavigationContext } from "../hooks/useNavigation";
import { ContractContext } from "../hooks/useContract";
import CommonSvgDefs from "../components/Common/CommonSvgDefs/CommonSvgDefs";
import "../styles/main.scss";

function MsdBackApp({ Component, pageProps }: AppProps) {
  const [currentContract, setCurrentContract] = useState<ContractEntity>({});
  const [currentContractId, setCurrentContractId] = useState<`${number}`>("0");
  const [currentRoot, setCurrentRoot] = useState<string | null>(null);
  const [currentPage, setCurrentPage] =
    useState<keyof typeof ENavigationPages>("/");

  return (
    <ApolloProvider client={client}>
      <ContractContext.Provider
        value={{
          contract: currentContract,
          setContract: setCurrentContract,
          contractId: currentContractId,
          setContractId: setCurrentContractId,
        }}
      >
        <NavigationContext.Provider
          value={{ currentRoot, setCurrentRoot, currentPage, setCurrentPage }}
        >
          <div id={"app"}>
            <CommonSvgDefs />
            <Component {...pageProps} />
            <div id="modal-portal" />
          </div>
        </NavigationContext.Provider>
      </ContractContext.Provider>
    </ApolloProvider>
  );
}

export default MsdBackApp;
