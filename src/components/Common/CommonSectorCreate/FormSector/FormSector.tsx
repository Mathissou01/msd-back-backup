import React, { useEffect, useState, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  GetSectorizationByContractIdQueryVariables,
  GetSectorizationsPickUpDayDocument,
  useCreateSectorizationMutation,
  useGetSectorizationByContractIdQuery,
} from "../../../../graphql/codegen/generated-types";
import GeoJSON from "ol/format/GeoJSON";
import { useContract } from "../../../../hooks/useContract";
import CommonButton from "../../CommonButton/CommonButton";
import FormInput from "../../../Form/FormInput/FormInput";
import FormMultiselect, {
  ICommonSelectOption,
} from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import { ISectorsTableRow } from "../../../../lib/sectors";
import "./form-sector.scss";
import { removeNulls } from "../../../../lib/utilities";

interface IFormSectorProps {
  handleCloseModal: () => void;
  defaultValue: ISectorsTableRow | undefined;
}

export default function FormSector({
  handleCloseModal,
  defaultValue,
}: IFormSectorProps) {
  /* Static Data */
  const formLabels = {
    title: "Nom du secteur",
    descritpion: "Description du secteur",
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

  /* External Data */
  const [createSectorization] = useCreateSectorizationMutation({
    awaitRefetchQueries: true,
  });
  const { data } = useGetSectorizationByContractIdQuery({
    variables: defaultQueryVariables,
    fetchPolicy: "network-only",
  });

  /* Local Data */
  const { contractId } = useContract();
  const [currentSectorContents, setCurrentSectorContents] = useState<
    ICommonSelectOption[]
  >([{ value: 0, label: "" }]);

  const polygon = data?.sectorization?.data?.attributes?.polygonCoordinates;
  const form = useForm({
    mode: "onChange",
    defaultValues: defaultValue ?? {},
  });
  const {
    watch,
    getValues,
    trigger,
    formState: { isValid },
  } = form;
  const GoogleMap = useMemo(
    () =>
      dynamic(() => import("../../../Map/OpenlayersMap"), {
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
  let polygonData: GeoJSON | string;

  /* Methods */
  function handlePolygon(polygon: GeoJSON | string) {
    polygonData = polygon;
  }

  useEffect(() => {
    const mappedTags = postalCodes
      .map((commune: { value: number; name: string }) => {
        return {
          value: commune.value ?? "",
          label: commune.name ?? "",
        };
      })
      .filter(removeNulls);

    setCurrentSectorContents(mappedTags);
  }, [postalCodes]);

  async function onSubmit(submitData: ISectorsTableRow) {
    trigger();
    if (isValid) {
      onSubmitAndModalRefresh(submitData);
      handleCloseModal();
    }
  }

  async function onSubmitAndModalRefresh(submitData: ISectorsTableRow) {
    const variables = {
      data: {
        name: submitData.name,
        description: submitData.description,
        contract: contractId,
        polygonCoordinates: polygonData,
      },
    };
    createSectorization({
      variables,
      refetchQueries: [
        {
          query: GetSectorizationsPickUpDayDocument,
          variables: { contractId },
        },
      ],
    });
  }

  return (
    <FormProvider {...form}>
      <form className="c-FormSector">
        <div className="c-FormSector__Informations">
          <div className="c-FormSector__Title">{formLabels.title}</div>
          <div className="c-FormSector__Name">
            <FormInput
              type="text"
              name="name"
              label={formLabels.title}
              isRequired={true}
              maxLengthValidation={maxCharacters}
            />
          </div>
          <div className="c-FormSector__Description">
            <FormInput
              type="text"
              name="description"
              label={formLabels.descritpion}
              isRequired={true}
              maxLengthValidation={maxCharacters}
            />
          </div>

          <div className="c-FormSector__Communes">
            <Image
              src={"/images/pictos/polygon.svg"}
              alt=""
              width={30}
              height={30}
            />
            <div className="c-FormSector__Info">
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

          <div className="c-FormSector__ButtonsWrapper">
            <div className="c-FormSector__SaveButton">
              <CommonButton
                type="button"
                label={buttonLabels.save}
                picto="check"
                style="primary"
                onClick={() => onSubmit(getValues())}
              />
            </div>
            <div className="c-FormSector__SavAndCancel">
              <CommonButton
                type="button"
                label={buttonLabels.saveAndCreate}
                picto="add"
                style="primary"
                onClick={async () => {
                  await onSubmitAndModalRefresh(getValues());
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
        <div className="c-FormSector__Maps">
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
