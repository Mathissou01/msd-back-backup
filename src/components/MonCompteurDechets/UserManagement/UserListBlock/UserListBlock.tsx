import React from "react";
import { IUser, getRightsByLabel } from "../../../../lib/user";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import CommonSpinner from "../../../Common/CommonSpinner/CommonSpinner";
import useUpdateUser from "../../../../hooks/User/useUpdateUser";
import { useUser } from "../../../../hooks/useUser";
import "./user-list-block.scss";

interface IUserListBlockProps {
  users: IUser[];
  isLoading: boolean;
  refetch: () => void;
  isFirstSearch: boolean;
}
export default function UserListBlock({
  users,
  isLoading,
  refetch,
  isFirstSearch,
}: IUserListBlockProps) {
  /* Local data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Mwc", userRights);
  const { updateUser } = useUpdateUser();

  return (
    <div className="c-UserListBlock">
      {users && users.length > 0 ? (
        <>
          {!isLoading ? (
            users?.map((user) => (
              <div
                className="c-UserListBlock__UserBlockContainer"
                key={user._id}
              >
                <div className="c-UserListBlock__UserBlock">
                  <div>
                    <p>ID utilisateur</p>
                    <strong>{user._id}</strong>
                  </div>
                  <div>
                    <p>Email</p>
                    <strong>{user.email}</strong>
                  </div>
                  <div>
                    <p>Adresse complète</p>
                    <strong>{user.addressLabel}</strong>
                  </div>
                </div>
                {user.activeCounter ? (
                  <CommonButton
                    type="button"
                    label="Désactiver le compteur"
                    isDisabled={!userPermissions.update}
                    style="secondary"
                    onClick={() => {
                      updateUser(user._id, { activeCounter: false }, refetch);
                    }}
                  />
                ) : (
                  <p>Le compteur déchets de l&apos;utilisateur est désactivé</p>
                )}
              </div>
            ))
          ) : (
            <div className="c-UserListBlock__Spinner">
              <CommonSpinner />
            </div>
          )}
        </>
      ) : (
        <p className="c-UserListBlock__UserNotFound">
          {!isFirstSearch &&
            "Aucun utilisateur ne correspond à votre recherche"}
        </p>
      )}
    </div>
  );
}
