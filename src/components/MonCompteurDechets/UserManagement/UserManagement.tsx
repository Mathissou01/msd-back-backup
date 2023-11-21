import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  SearchResultAddress,
  useGetAddressCoordinatesLazyQuery,
  useGetUserFromAddressOrUuidLazyQuery,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";
import FormAutoCompleteInput from "../../Form/FormAutoCompleteInput/FormAutoCompleteInput";
import FormInput from "../../Form/FormInput/FormInput";
import CommonButton from "../../Common/CommonButton/CommonButton";
import UserListBlock from "./UserListBlock/UserListBlock";
import "./user-management.scss";

export default function UserManagement() {
  /* Local data */
  const methods = useForm();
  const { contractId } = useContract();

  const [firstSearch, setFirstSearch] = useState<boolean>(true);

  const [getAddressCoordinates, { loading }] =
    useGetAddressCoordinatesLazyQuery({
      fetchPolicy: "network-only",
    });

  const [
    getUserByAddress,
    { data: usersData, loading: usersLoading, refetch: refetchUsers },
  ] = useGetUserFromAddressOrUuidLazyQuery();

  async function searchFunction(
    searchValue: string,
  ): Promise<Array<SearchResultAddress>> {
    let searchResults: Array<SearchResultAddress> = [];
    await getAddressCoordinates({
      variables: { searchTerm: searchValue },
      onCompleted: (results) => {
        if (results.getAddressCoordinates) {
          searchResults = results.getAddressCoordinates?.filter(removeNulls);
        }
      },
    });
    return searchResults;
  }

  const onSubmit = (data: { [key: string]: string }) => {
    setFirstSearch(false);
    getUserByAddress({
      variables: {
        contractId: contractId,
        uuid: data.id,
        address: data.address,
      },
    });
  };
  return (
    <FormProvider {...methods}>
      <form
        className="c-UserManagement"
        onSubmit={methods.handleSubmit((data) => {
          onSubmit(data);
        })}
      >
        <div className="c-UserManagement__Form">
          <div className="c-UserManagement__Input">
            <FormAutoCompleteInput<SearchResultAddress>
              name="address"
              searchFunction={searchFunction}
              displayTransformFunction={(result) => result.name ?? ""}
              selectTransformFunction={(result) => result.name ?? undefined}
              isLoading={loading}
              isRequired={false}
              placeholder="Veuillez saisir une adresse"
              labelProps={{ label: "Recherche par adresse" }}
            />
          </div>
          <div className="c-UserManagement__Input">
            <FormInput
              type="text"
              name="id"
              label="Recherche par ID"
              placeholder="Veuillez saisir un identifiant"
            />
          </div>
          <div className="c-UserManagement__Button">
            <CommonButton type="submit" label="Rechercher" style="primary" />
          </div>
        </div>
      </form>
      <UserListBlock
        users={usersData}
        firstSearch={firstSearch}
        refetchUsers={refetchUsers}
        usersLoading={usersLoading}
      />
    </FormProvider>
  );
}
