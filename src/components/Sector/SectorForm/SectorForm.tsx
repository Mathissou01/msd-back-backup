import React, { useEffect, useState } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  CityEntity,
  GetSectorizationByIdQueryVariables,
  useGetCitiesByContractIdQuery,
  useGetSectorizationByIdQuery,
} from "../../../graphql/codegen/generated-types";
import { ISectorsTableRow } from "../../../lib/sectors";
import { useContract } from "../../../hooks/useContract";
import { usePreventAndStop } from "../../../hooks/usePreventAndStop";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import FormSingleMultiselect from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import SectorFormMap from "./SectorFormMap/SectorFormMap";
import "./sector-form.scss";

interface ISectorFormProps {
  onSubmitValid: (data: FieldValues) => void;
  onSubmitAndModalRefresh: (data: FieldValues) => void;
  handleCloseModal: () => void;
  defaultValue: ISectorsTableRow | undefined;
  onUpdate: (data: FieldValues) => void;
}

export default function SectorForm({
  onSubmitValid,
  onSubmitAndModalRefresh,
  handleCloseModal,
  defaultValue,
  onUpdate,
}: ISectorFormProps) {
  /* Static Data */
  const formLabels = {
    title: "Nom du secteur",
    description: "Description du secteur",
  };
  const buttonLabels = {
    save: "Enregistrer ce secteur",
    saveAndCreate: "Enregistrer et créer un autre secteur",
    cancel: "Annuler",
  };
  const communesLabels = {
    title:
      "Dessinez un secteur sur la carte ou bien saisissez les communes du secteur :",
  };
  const maxCharacters = 30;
  const defaultQueryVariables: GetSectorizationByIdQueryVariables = {
    sectorizationId: defaultValue?.id,
  };

  /* Local Data */
  const { contractId } = useContract();
  const { data } = useGetSectorizationByIdQuery({
    variables: defaultQueryVariables,
    fetchPolicy: "network-only",
  });
  const { data: cities } = useGetCitiesByContractIdQuery({
    variables: {
      contractId: contractId,
    },
    fetchPolicy: "network-only",
  });
  const [currentSectorContents, setCurrentSectorContents] = useState<
    {
      value: number;
      label: string;
    }[]
  >([{ value: 0, label: "" }]);

  const form = useForm({
    mode: "onChange",
    defaultValues: defaultValue ?? {},
  });
  const { register, handleSubmit } = form;
  const initialPolygon =
    data?.sectorization?.data?.attributes?.polygonCoordinates;
  register("polygonData", { value: initialPolygon });

  useEffect(() => {
    const mappedTags =
      cities?.territories?.data[0]?.attributes?.cities?.data.reduce(
        (result: { value: number; label: string }[], city: CityEntity) => {
          if (
            city.attributes &&
            city.attributes.postalCode !== undefined &&
            city.attributes.postalCode !== null &&
            city.attributes.name !== undefined &&
            city.attributes.name !== null
          ) {
            result.push({
              value: city.attributes.postalCode,
              label: city.attributes.name,
            });
          }
          return result;
        },
        [],
      );
    setCurrentSectorContents(mappedTags || []);
  }, [cities]);

  return (
    <FormProvider {...form}>
      <form
        className="c-SectorForm"
        onSubmit={usePreventAndStop(
          handleSubmit(defaultValue ? onUpdate : onSubmitValid),
        )}
      >
        <div className="c-SectorForm__Informations">
          <div className="c-SectorForm__InformationsTitle">
            {formLabels.title}
          </div>
          <div className="c-SectorForm__InformationsSectorName">
            <FormInput
              type="text"
              name="name"
              label={formLabels.title}
              isRequired={true}
              maxLengthValidation={maxCharacters}
            />
          </div>
          <div className="c-SectorForm__InformationsSectorDescription">
            <FormInput
              type="text"
              name="description"
              label={formLabels.description}
              isRequired={true}
              maxLengthValidation={maxCharacters}
            />
          </div>
          <div className="c-SectorForm__InformationsSectorCommunes">
            <div className="c-SectorForm__InformationsSectorCommunesInfo">
              <p>{communesLabels.title}</p>
              {currentSectorContents && (
                <FormSingleMultiselect
                  name="communes"
                  label="communes"
                  options={currentSectorContents}
                  isMulti
                  maxMultiSelection={20}
                />
              )}
            </div>
          </div>
          <div className="c-SectorForm__InformationsButtons">
            <div className="c-SectorForm__InformationsSaveButton">
              <CommonButton
                type="submit"
                label={buttonLabels.save}
                picto="check"
                style="primary"
              />
            </div>
            <div className="c-SectorForm__InformationsSaveAndCancel">
              <CommonButton
                type="button"
                label={buttonLabels.saveAndCreate}
                picto="add"
                style="primary"
                onClick={() =>
                  handleSubmit((data) => {
                    form.reset();
                    onSubmitAndModalRefresh(data);
                  })()
                }
              />
              <CommonButton
                label={buttonLabels.cancel}
                picto="cross"
                onClick={handleCloseModal}
              />
            </div>
          </div>
        </div>
        <SectorFormMap initialPolygon={initialPolygon} />
      </form>
    </FormProvider>
  );
}
