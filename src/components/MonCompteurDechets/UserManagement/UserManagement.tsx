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

  const [getUserByAddress, { data: usersData }] =
    useGetUserFromAddressOrUuidLazyQuery();

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
    const uuid = data.id;
    const streetNumber = data.address.split(" ")[0];
    const streetName = data.address
      .split(" ")
      .slice(1, data.address.split(" ").length - 2);
    const postalCode =
      data.address.split(" ")[data.address.split(" ").length - 2];
    const city = data.address.split(" ")[data.address.split(" ").length - 1];

    getUserByAddress({
      variables: {
        contractId: contractId,
        isUUID: uuid ? true : false,
        city: city,
        postalCode: postalCode,
        streetName: streetName.join(" "),
        streetNumber: streetNumber,
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
      <UserListBlock users={usersData} firstSearch={firstSearch} />
    </FormProvider>
  );
}
