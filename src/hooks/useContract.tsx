import React, { useContext } from "react";

export interface IContractContext {
  contractId: `${number}`;
  setContractId: (id: `${number}`) => void;
  contractPathId: number;
}

export const ContractContext = React.createContext<IContractContext>({
  contractId: "1",
  setContractId: () => null,
  contractPathId: 2,
});

export const useContract = () => useContext(ContractContext);
