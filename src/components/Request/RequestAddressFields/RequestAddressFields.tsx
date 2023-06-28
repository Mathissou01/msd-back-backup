import React from "react";
import { useFormContext } from "react-hook-form";
import {
  SearchResultAddress,
  useGetBanAddressesAutoCompleteLazyQuery,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import CommonErrors from "../../Common/CommonErrors/CommonErrors";
import FormAutoCompleteInput from "../../Form/FormAutoCompleteInput/FormAutoCompleteInput";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import "./request-address-fields.scss";

export interface IRequestAddressFields {
  addressCheckboxLabel: string;
  addressLabel: string;
}

interface RequestAddressProps {
  labels: IRequestAddressFields;
}

export default function RequestAddressFields({ labels }: RequestAddressProps) {
  /* Local Data */
  const { resetField, getValues } = useFormContext();
  const { watch } = useFormContext();
  const watchHasAddress = watch("hasAddress");

  /* External Data */
  const [getBanAddresses, { loading, error }] =
    useGetBanAddressesAutoCompleteLazyQuery({
      fetchPolicy: "network-only",
    });

  /* Methods */
  async function searchFunction(
    searchValue: string,
  ): Promise<Array<SearchResultAddress>> {
    let searchResults: Array<SearchResultAddress> = [];
    await getBanAddresses({
      variables: { searchTerm: searchValue },
      onCompleted: (results) => {
        if (
          results.getAddressCoordinates &&
          results.getAddressCoordinates?.length > 0
        ) {
          searchResults = results.getAddressCoordinates?.filter(removeNulls);
        }
      },
    });
    return searchResults;
  }

  return (
    <div className="c-RequestAddressFields">
      <FormCheckbox
        label={labels.addressCheckboxLabel}
        name="hasAddress"
        onClick={() => resetField("fieldAddressLabel", { defaultValue: "" })}
      />
      {watchHasAddress && (
        <CommonErrors errors={[error]}>
          <FormAutoCompleteInput<SearchResultAddress>
            name="fieldAddressLabel"
            searchFunction={searchFunction}
            displayTransformFunction={(result) => result.name ?? ""}
            selectTransformFunction={(result) => result.name ?? undefined}
            isLoading={loading}
            isRequired={true}
            defaultValue={getValues("fieldAddressLabel")}
            labelProps={{ label: labels.addressLabel }}
          />
        </CommonErrors>
      )}
    </div>
  );
}
