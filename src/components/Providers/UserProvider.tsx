import { ReactNode, useEffect, useState } from "react";
import { UserContext } from "../../hooks/useUser";
import { IUserRightData } from "../../lib/user";

interface IUserProviderProps {
  children: ReactNode;
}

function UserProvider({ children }: IUserProviderProps) {
  const [currentHasOtherContracts, setCurrentHasOtherContracts] = useState<
    boolean | undefined
  >();
  const [userRights, setUserRights] = useState<Array<IUserRightData>>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserRights(data.rights);
        setIsConnected(true);
      });
  }, [isConnected]);

  return (
    <UserContext.Provider
      value={{
        hasOtherContracts: currentHasOtherContracts,
        setHasOtherContracts: setCurrentHasOtherContracts,
        userRights: userRights,
        setIsConnected: setIsConnected,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
