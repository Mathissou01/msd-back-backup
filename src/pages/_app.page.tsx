import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "../graphql/client";
import { ContractEntity } from "../graphql/codegen/generated-types";
import { NavigationContext } from "../hooks/useNavigation";
import { ContractContext } from "../hooks/useContract";
import { UserContext } from "../hooks/useUser";
import { ENavigationPages } from "../lib/navigation";
import CommonSvgDefs from "../components/Common/CommonSvgDefs/CommonSvgDefs";
import type { AppProps } from "next/app";
import "../styles/main.scss";

function MsdBackApp({ Component, pageProps }: AppProps) {
  const [currentHasOtherContracts, setCurrentHasOtherContracts] = useState<
    boolean | undefined
  >();
  const [currentContract, setCurrentContract] = useState<ContractEntity>({});
  const [currentContractId, setCurrentContractId] = useState<`${number}`>("0");
  const [currentRoot, setCurrentRoot] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<
    keyof typeof ENavigationPages | string
  >("/");

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider
        value={{
          hasOtherContracts: currentHasOtherContracts,
          setHasOtherContracts: setCurrentHasOtherContracts,
        }}
      >
        <ContractContext.Provider
          value={{
            contract: currentContract,
            setContract: setCurrentContract,
            contractId: currentContractId,
            setContractId: setCurrentContractId,
          }}
        >
          <NavigationContext.Provider
            value={{
              currentRoot,
              setCurrentRoot,
              currentPage,
              setCurrentPage,
            }}
          >
            <div id={"app"}>
              <CommonSvgDefs />
              <Component {...pageProps} />
              <div id="modal-portal" />
            </div>
          </NavigationContext.Provider>
        </ContractContext.Provider>
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default MsdBackApp;
