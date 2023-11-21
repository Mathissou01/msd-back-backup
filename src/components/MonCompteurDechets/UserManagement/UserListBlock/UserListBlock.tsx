import React from "react";
import { getRightsByLabel } from "../../../../lib/user";
import { useUser } from "../../../../hooks/useUser";
import {
  GetUserFromAddressOrUuidQuery,
  User,
  useUpdateCounterStatusMutation,
} from "../../../../graphql/codegen/generated-types";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import "./user-list-block.scss";
import CommonLoader from "../../../Common/CommonLoader/CommonLoader";

interface IUserListBlockProps {
  users: GetUserFromAddressOrUuidQuery | undefined;
  firstSearch: boolean;
  refetchUsers: () => void;
  usersLoading: boolean;
}
export default function UserListBlock({
  users,
  firstSearch,
  refetchUsers,
  usersLoading,
}: IUserListBlockProps) {
  /* Local data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Mwc", userRights);

  const [updateUserCounter, { loading }] = useUpdateCounterStatusMutation({
    refetchQueries: ["GetUserFromAddressOrUuid"],
  });

  const usersArray = JSON.parse(
    JSON.stringify(users?.getUserFromAddressOrUuid || []),
  );

  const usersSorted = usersArray.sort((a: User, b: User) => {
    const aActive = a?.activeCounter ?? false;
    const bActive = b?.activeCounter ?? false;

    if (bActive && !aActive) {
      return 1;
    } else if (aActive && !bActive) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <CommonLoader isLoading={usersLoading || loading}>
      <div className="c-UserListBlock">
        {users &&
        users.getUserFromAddressOrUuid &&
        users.getUserFromAddressOrUuid.length > 0 ? (
          <>
            {usersSorted.map((user: User) => (
              <div
                className="c-UserListBlock__UserBlockContainer"
                key={user?.uuid}
              >
                <div className="c-UserListBlock__UserBlock">
                  <div>
                    <p>ID utilisateur</p>
                    <strong>{user?.uuid}</strong>
                  </div>
                  <div>
                    <p>Email</p>
                    <strong>{user?.email}</strong>
                  </div>
                  <div>
                    <p>Adresse complète</p>
                    <strong>{user?.address?.label ?? ""}</strong>
                  </div>
                </div>

                {user?.activeCounter ? (
                  <CommonButton
                    type="button"
                    label="Désactiver le compteur"
                    isDisabled={!userPermissions.update}
                    style="secondary"
                    onClick={() => {
                      updateUserCounter({
                        variables: {
                          uuid: user?.uuid ?? "",
                          activeCounter: false,
                        },
                      }).then(() => refetchUsers());
                    }}
                  />
                ) : (
                  <p>Le compteur déchets de l&apos;utilisateur est désactivé</p>
                )}
              </div>
            ))}
          </>
        ) : (
          <p className="c-UserListBlock__UserNotFound">
            {firstSearch === false &&
              "Aucun utilisateur ne correspond à votre recherche"}
          </p>
        )}
      </div>
    </CommonLoader>
  );
}
