import React, { useContext } from "react";

export interface IContractContext {
  contractId: `${number}`;
  setContractId: (id: `${number}`) => void;
}

export const ContractContext = React.createContext<IContractContext>({
  contractId: "1",
  setContractId: () => null,
});

export const useContract = () => useContext(ContractContext);
