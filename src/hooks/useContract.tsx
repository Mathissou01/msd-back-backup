import React, { useContext } from "react";
import { ContractEntity } from "../graphql/codegen/generated-types";

export interface IContractContext {
  contract: ContractEntity;
  setContract: (contract: Partial<ContractEntity>) => void;
  contractId: `${number}`;
  setContractId: (id: `${number}`) => void;
}

export const ContractContext = React.createContext<IContractContext>({
  contract: {},
  setContract: () => null,
  contractId: "0",
  setContractId: () => null,
});

export const useContract = () => useContext(ContractContext);
