import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  SearchResultAddress,
  useGetAddressCoordinatesLazyQuery,
} from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import FormLabel from "../../../Form/FormLabel/FormLabel";
import FormInput from "../../../Form/FormInput/FormInput";
import FormAutoCompleteInput from "../../../Form/FormAutoCompleteInput/FormAutoCompleteInput";
import CommonErrors from "../../../Common/CommonErrors/CommonErrors";
import "./address-or-gps-fields.scss";

type TRadioName = "address" | "gpsCoordinates";

export interface AddressOrGpsFieldsLabels {
  addressRadio: string;
  addressField: string;
  gpsCoordinatesRadio: string;
  latitudeField: string;
  longitudeField: string;
}

interface AddressOrGpsFieldsProps {
  labels: AddressOrGpsFieldsLabels;
}

export default function AddressOrGpsFields({
  labels,
}: AddressOrGpsFieldsProps) {
  /* Methods */
  // Handle switch change and keeping the data inside the input
  const handleFieldSwitch = (value: TRadioName) => {
    if (value === "address") {
      setValue("latitude", getValues("latitude"));
      setValue("longitude", getValues("longitude"));
    } else if (value === "gpsCoordinates") {
      setValue("address", getValues("address"));
    }
    setRadioValue(value);
  };

  async function searchFunction(
    searchValue: string,
  ): Promise<Array<SearchResultAddress>> {
    let searchResults: Array<SearchResultAddress> = [];
    await getAddressCoordinates({
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

  /* Local Data */
  const [getAddressCoordinates, { loading, error }] =
    useGetAddressCoordinatesLazyQuery({
      fetchPolicy: "network-only",
    });
  const [radioValue, setRadioValue] = useState<TRadioName>("address");
  const { getValues, setValue } = useFormContext();

  useEffect(() => {
    // Update the radio value based on the initial values
    const addressValue = getValues("address");
    const latitudeValue = getValues("latitude");
    const longitudeValue = getValues("longitude");

    if (addressValue !== undefined && addressValue !== "") {
      setRadioValue("address");
    } else if (
      latitudeValue !== undefined &&
      longitudeValue !== undefined &&
      latitudeValue !== "" &&
      longitudeValue !== ""
    ) {
      setRadioValue("gpsCoordinates");
    }
  }, [getValues]);
  return (
    <div className="c-AddressOrGpsFields">
      <fieldset className="c-AddressOrGpsFields__Radio">
        <div className="c-AddressOrGpsFields__Option">
          <input
            className={`c-AddressOrGpsFields__Input ${
              radioValue === "address"
                ? "c-AddressOrGpsFields__Input_checked"
                : ""
            }`}
            id="address-radio"
            type="radio"
            value="address"
            checked={radioValue === "address"}
            onChange={() => handleFieldSwitch("address")}
          />
          <FormLabel label={labels.addressRadio} forId="address-radio" />
        </div>
        <div className="c-AddressOrGpsFields__Option">
          <input
            className={`c-AddressOrGpsFields__Input ${
              radioValue === "gpsCoordinates"
                ? "c-AddressOrGpsFields__Input_checked"
                : ""
            }`}
            id="gpsCoordinates-radio"
            type="radio"
            value="gpsCoordinates"
            checked={radioValue === "gpsCoordinates"}
            onChange={() => handleFieldSwitch("gpsCoordinates")}
          />
          <FormLabel
            label={labels.gpsCoordinatesRadio}
            forId="gpsCoordinates-radio"
          />
        </div>
      </fieldset>
      {radioValue === "address" && (
        <CommonErrors errors={[error]} displayMode="toaster">
          <FormAutoCompleteInput<SearchResultAddress>
            name="address"
            searchFunction={searchFunction}
            displayTransformFunction={(result) => result.name ?? ""}
            selectTransformFunction={(result) => result.name ?? undefined}
            isLoading={loading}
            isRequired={true}
            defaultValue={getValues("address")}
            labelProps={{ label: labels.addressField }}
          />
        </CommonErrors>
      )}
      {radioValue === "gpsCoordinates" && (
        <div className="c-AddressOrGpsFields__GpsCoordinates">
          <FormInput
            type="number"
            name="latitude"
            minNumberValidation={-90}
            maxNumberValidation={90}
            step={0.000001}
            label={labels.latitudeField}
            isRequired={true}
            defaultValue={getValues("latitude")}
          />
          <FormInput
            type="number"
            name="longitude"
            minNumberValidation={-180}
            maxNumberValidation={180}
            step={0.000001}
            label={labels.longitudeField}
            isRequired={true}
            defaultValue={getValues("longitude")}
          />
        </div>
      )}
    </div>
  );
}
