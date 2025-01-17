import React, { useContext } from "react";
import { IUserRightData } from "../lib/user";

export interface IUserContext {
  hasOtherContracts?: boolean;
  setHasOtherContracts: (value: boolean) => void;
  userUuid: string;
  userRole: string;
  userRights: Array<IUserRightData>;
  setIsConnected: (value: boolean) => void;
}

export const UserContext = React.createContext<IUserContext>({
  hasOtherContracts: undefined,
  setHasOtherContracts: () => null,
  userUuid: "",
  userRole: "",
  userRights: [],
  setIsConnected: () => null,
});

export const useUser = () => useContext(UserContext);
