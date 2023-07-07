import React, { useContext } from "react";

export interface IUserContext {
  hasOtherContracts?: boolean;
  setHasOtherContracts: (value: boolean) => void;
}

export const UserContext = React.createContext<IUserContext>({
  hasOtherContracts: undefined,
  setHasOtherContracts: () => null,
});

export const useUser = () => useContext(UserContext);
