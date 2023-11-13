import React from "react";
import { getRightsByLabel } from "../../../../lib/user";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import CommonSpinner from "../../../Common/CommonSpinner/CommonSpinner";
import { useUser } from "../../../../hooks/useUser";
import "./user-list-block.scss";
import {
  Address,
  GetUserFromAddressOrUuidQuery,
  useUpdateCounterStatusMutation,
} from "../../../../graphql/codegen/generated-types";

interface IUserListBlockProps {
  users: GetUserFromAddressOrUuidQuery | undefined;
  firstSearch: boolean;
}
export default function UserListBlock({
  users,
  firstSearch,
}: IUserListBlockProps) {
  /* Local data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Mwc", userRights);

  const [updateUserCounter, { loading }] = useUpdateCounterStatusMutation();

  function userAddressTransform(address: Address) {
    return `${address.housenumber} ${address.street} ${address.postcode} ${address.city}`;
  }

  return (
    <div className="c-UserListBlock">
      {users && users.getUserFromAddressOrUuid ? (
        <>
          {!loading ? (
            <div className="c-UserListBlock__UserBlockContainer">
              <div className="c-UserListBlock__UserBlock">
                <div>
                  <p>ID utilisateur</p>
                  <strong>{users.getUserFromAddressOrUuid.uuid}</strong>
                </div>
                <div>
                  <p>Email</p>
                  <strong>{users.getUserFromAddressOrUuid.email}</strong>
                </div>
                <div>
                  <p>Adresse complète</p>
                  <strong>
                    {userAddressTransform(
                      users.getUserFromAddressOrUuid.address ?? {},
                    )}
                  </strong>
                </div>
              </div>
              {users.getUserFromAddressOrUuid.activeCounter ? (
                <CommonButton
                  type="button"
                  label="Désactiver le compteur"
                  isDisabled={!userPermissions.update}
                  style="secondary"
                  onClick={() =>
                    updateUserCounter({
                      variables: {
                        uuid: users?.getUserFromAddressOrUuid?.uuid ?? "",
                        activeCounter: false,
                      },
                    })
                  }
                />
              ) : (
                <p>Le compteur déchets de l&apos;utilisateur est désactivé</p>
              )}
            </div>
          ) : (
            <div className="c-UserListBlock__Spinner">
              <CommonSpinner />
            </div>
          )}
        </>
      ) : (
        <p className="c-UserListBlock__UserNotFound">
          {!firstSearch && "Aucun utilisateur ne correspond à votre recherche"}
        </p>
      )}
    </div>
  );
}
