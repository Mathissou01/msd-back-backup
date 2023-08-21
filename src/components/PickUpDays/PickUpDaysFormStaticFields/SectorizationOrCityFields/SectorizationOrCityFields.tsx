import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useContract } from "../../../../hooks/useContract";
import {
  useGetSearchCitiesByContractIdQuery,
  useGetSectorizationsPickUpDayByContractIdQuery,
} from "../../../../graphql/codegen/generated-types";
import FormSingleMultiselect, {
  IFormSingleMultiselectOption,
} from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormLabel from "../../../Form/FormLabel/FormLabel";
import { removeNulls } from "../../../../lib/utilities";
import CommonSectorCreate from "../../../Common/CommonSectorCreate/CommonSectorCreate";
import "./sectorization-or-city-fields.scss";

export interface ISectorizationOrCityFieldsLabels {
  sectorizationsRadio: string;
  sectorizationsField: string;
  citiesRadio: string;
  citiesField: string;
}

interface ISectorizationOrCityFieldsProps {
  labels: ISectorizationOrCityFieldsLabels;
}

export default function SectorizationOrCityFields({
  labels,
}: ISectorizationOrCityFieldsProps) {
  /* Local Data */
  const { contractId } = useContract();
  const { watch, setValue } = useFormContext();
  const [radioBtnStatus, setRadioBtnStatus] =
    useState<string>("sectorizations");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sectorizationOptions, setSectorizationOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const [citiesOptions, setCitiesOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const radioBtnStatusWatch = watch("sectorizationsMode");

  /* External Data */
  const { data: sectorizationsData } =
    useGetSectorizationsPickUpDayByContractIdQuery({
      variables: { contractId },
      fetchPolicy: "cache-and-network",
    });
  const { data: searchCitiesData } = useGetSearchCitiesByContractIdQuery({
    variables: { contractId, searchTerm: searchTerm },
    fetchPolicy: "no-cache",
  });

  /* Methods */
  function handleMultiSelectInputChange(event: string): void {
    setSearchTerm(event);
  }

  useEffect(() => {
    if (sectorizationsData) {
      const mappedSectorizations: Array<IFormSingleMultiselectOption> =
        sectorizationsData.sectorizations?.data
          .map((sectorization) => {
            return {
              value: sectorization.id ?? "",
              label: sectorization.attributes?.name ?? "",
            };
          })
          .filter(removeNulls) ?? [];
      setSectorizationOptions(mappedSectorizations);
    }
  }, [sectorizationsData]);

  useEffect(() => {
    if (searchCitiesData) {
      const mappedCities: Array<IFormSingleMultiselectOption> =
        searchCitiesData.searchCities
          ?.map((city) => {
            return {
              value: city?.id ?? "",
              label: city?.name ?? "",
            };
          })
          .filter(removeNulls) ?? [];
      setCitiesOptions(mappedCities);
    }
  }, [searchCitiesData]);

  useEffect(() => {
    if (radioBtnStatusWatch) {
      setRadioBtnStatus(radioBtnStatusWatch);
    }
  }, [radioBtnStatusWatch]);

  return (
    <div className="c-SectorizationOrCityFields">
      <fieldset className="c-SectorizationOrCityFields__Radio">
        <div className="c-SectorizationOrCityFields__Option">
          <input
            className={`c-SectorizationOrCityFields__Input ${
              radioBtnStatus === "sectorizations"
                ? "c-SectorizationOrCityFields__Input_checked"
                : ""
            }`}
            type="radio"
            value="sectorizations"
            name="sectorizations"
            id="sectorizations"
            checked={radioBtnStatus === "sectorizations"}
            onChange={() => {
              setRadioBtnStatus("sectorizations");
              setValue("cities", null);
            }}
          />
          <FormLabel
            label={labels.sectorizationsRadio}
            forId="sectorizations"
          />
        </div>
        <div className="c-SectorizationOrCityFields__Option">
          <input
            className={`c-SectorizationOrCityFields__Input ${
              radioBtnStatus === "cities"
                ? "c-SectorizationOrCityFields__Input_checked"
                : ""
            }`}
            type="radio"
            value="cities"
            name="cities"
            id="cities"
            checked={radioBtnStatus === "cities"}
            onChange={() => {
              setRadioBtnStatus("cities");
              setValue("sectorizations", null);
            }}
          />
          <FormLabel label={labels.citiesRadio} forId="cities" />
        </div>
      </fieldset>
      {radioBtnStatus === "sectorizations" ? (
        <>
          <FormSingleMultiselect
            name="sectorizations"
            label={labels.sectorizationsField}
            options={sectorizationOptions}
            isMulti
            isRequired
          />
          <CommonSectorCreate styleButton="secondary" />
        </>
      ) : (
        <FormSingleMultiselect
          name="cities"
          label={labels.citiesField}
          validationLabel="Nom, Code postal, n° Siren ou n° Insee"
          options={citiesOptions}
          isMulti
          onInputChange={handleMultiSelectInputChange}
          isRequired
        />
      )}
    </div>
  );
}
