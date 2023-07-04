import GeoJSON from "ol/format/GeoJSON";
import React, { useEffect, useState, useMemo } from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import {
  GetSectorizationByContractIdQueryVariables,
  useGetSectorizationByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import { ISectorsTableRow } from "../../../lib/sectors";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import FormMultiselect from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import "./sector-modal.scss";

interface ISectorModalProps {
  onSubmitValid: (data: FieldValues) => void;
  onSubmitAndModalRefresh: (data: FieldValues) => void;
  handleCloseModal: () => void;
  defaultValue: ISectorsTableRow | undefined;
  onUpdate: (data: FieldValues) => void;
  handlePolygon: (data: GeoJSON | string) => void;
}

export default function SectorModal({
  onSubmitValid,
  onSubmitAndModalRefresh,
  handleCloseModal,
  defaultValue,
  onUpdate,
  handlePolygon,
}: ISectorModalProps) {
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
  const defaultQueryVariables: GetSectorizationByContractIdQueryVariables = {
    sectorizationId: defaultValue?.id,
  };

  /* Local Data */
  const { data } = useGetSectorizationByContractIdQuery({
    variables: defaultQueryVariables,
    fetchPolicy: "network-only",
  });
  const [currentSectorContents, setCurrentSectorContents] = useState<
    {
      value: number | string;
      label: string;
    }[]
  >([{ value: 0, label: "" }]);

  const polygon = data?.sectorization?.data?.attributes?.polygonCoordinates;
  const form = useForm({
    mode: "onChange",
    defaultValues: defaultValue ?? {},
  });
  const { handleSubmit, watch } = form;
  const GoogleMap = useMemo(
    () =>
      dynamic(() => import("../../Map/OpenlayersMap"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    [],
  );
  const postalCodes = useMemo(
    () => [
      { value: 69500, name: "lyon-1" },
      { value: 69400, name: "lyon-2" },
      { value: 69100, name: "lyon-3" },
      { value: 69200, name: "lyon-4" },
    ],
    [],
  );

  const SelectedCommunes = watch("communes");
  useEffect(() => {
    const mappedTags = postalCodes.map(
      (commune: { value: number; name: string }) => {
        return {
          value: commune.value ?? "",
          label: commune.name ?? "",
        };
      },
    );
    setCurrentSectorContents(mappedTags);
  }, [postalCodes]);

  return (
    <FormProvider {...form}>
      <form
        className="c-SectorModal"
        onSubmit={handleSubmit(defaultValue ? onUpdate : onSubmitValid)}
      >
        <div className="c-SectorModal__Informations">
          <div className="c-SectorModal__InformationsTitle">
            {formLabels.title}
          </div>
          <div className="c-SectorModal__InformationsSectorName">
            <FormInput
              type="text"
              name="name"
              label={formLabels.title}
              isRequired={true}
              maxLengthValidation={maxCharacters}
            />
          </div>
          <div className="c-SectorModal__InformationsSectorDescription">
            <FormInput
              type="text"
              name="description"
              label={formLabels.description}
              isRequired={true}
              maxLengthValidation={maxCharacters}
            />
          </div>

          <div className="c-SectorModal__InformationsSectorCommunes">
            <div className="c-SectorModal__InformationsSectorCommunesInfo">
              <p>{communesLabels.title}</p>
              {currentSectorContents && (
                <FormMultiselect
                  name="communes"
                  label="communes"
                  options={currentSectorContents}
                  isMulti
                  maxMultiSelection={20}
                />
              )}
            </div>
          </div>

          <div className="c-SectorModal__InformationsButtons">
            <div className="c-SectorModal__InformationsSaveButton">
              <CommonButton
                type="submit"
                label={buttonLabels.save}
                picto="check"
                style="primary"
              />
            </div>
            <div className="c-SectorModal__InformationsSavAndCancel">
              <CommonButton
                type="button"
                label={buttonLabels.saveAndCreate}
                picto="add"
                style="primary"
                onClick={async () => {
                  await handleSubmit(onSubmitAndModalRefresh)();
                  form.reset();
                }}
              />

              <CommonButton
                label={buttonLabels.cancel}
                picto="cross"
                onClick={handleCloseModal}
              />
            </div>
          </div>
        </div>
        <div className="c-SectorModal__Maps">
          <GoogleMap
            polygon={polygon}
            communes={SelectedCommunes || []}
            handlePolygon={handlePolygon}
          />
        </div>
      </form>
    </FormProvider>
  );
}
