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
  const [userUuid, setUserUuid] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserRights(data.rights);
        setUserUuid(data.uuidciam);
        setUserRole(data.role);
        setIsConnected(true);
      });
  }, [isConnected]);

  return (
    <UserContext.Provider
      value={{
        hasOtherContracts: currentHasOtherContracts,
        setHasOtherContracts: setCurrentHasOtherContracts,
        userUuid: userUuid,
        userRole: userRole,
        userRights: userRights,
        setIsConnected: setIsConnected,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
