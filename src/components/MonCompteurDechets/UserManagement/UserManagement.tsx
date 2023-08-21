import { FormProvider, useForm } from "react-hook-form";
import React, { useState } from "react";
import {
  SearchResultAddress,
  useGetAddressCoordinatesLazyQuery,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import useFetchUsers from "../../../hooks/User/useFetchUsers";
import FormAutoCompleteInput from "../../Form/FormAutoCompleteInput/FormAutoCompleteInput";
import FormInput from "../../Form/FormInput/FormInput";
import CommonButton from "../../Common/CommonButton/CommonButton";
import UserListBlock from "./UserListBlock/UserListBlock";

import "./user-management.scss";

interface Params {
  id?: string;
  address?: string;
  limit: number;
  page: number;
}

export default function UserManagement() {
  const methods = useForm();

  const {
    users,
    isLoading: loadingUsers,
    fetchUsers,
    refetch,
  } = useFetchUsers();

  const [getAddressCoordinates, { loading }] =
    useGetAddressCoordinatesLazyQuery({
      fetchPolicy: "network-only",
    });

  const [isFirstSearch, setIsFirstSearch] = useState(true);

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
    const params: Params = {
      id: data.id || "",
      address: data.address || "",
      limit: 10,
      page: 1,
    };
    setIsFirstSearch(false);
    fetchUsers(params);
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
        users={users}
        isLoading={loadingUsers}
        refetch={refetch}
        isFirstSearch={isFirstSearch}
      />
    </FormProvider>
  );
}
