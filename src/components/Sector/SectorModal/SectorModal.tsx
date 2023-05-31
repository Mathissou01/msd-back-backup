import { FieldValues, FormProvider, useForm } from "react-hook-form";
import React from "react";
import dynamic from "next/dynamic";
import {
  GetSectorizationByContractIdQueryVariables,
  useGetSectorizationByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import { TPolygon } from "../../../lib/sectors";
import CommonButton from "../../Common/CommonButton/CommonButton";
import { IDefaultTableRow } from "../../Common/CommonDataTable/CommonDataTable";
import FormInput from "../../Form/FormInput/FormInput";
import "./sector-modal.scss";

//TODO: to import it for #2220
// import FormMultiselect from "../../Form/FormSingleMultiselect/FormSingleMultiselect";

interface ISectorsTableRow extends IDefaultTableRow {
  name: string;
  description: string;
}

interface ISectorModal {
  onSubmitValid: (data: FieldValues) => void;
  onSubmitAndModalRefresh: (data: FieldValues) => void;
  handleCloseModal: () => void;
  defaultValue: ISectorsTableRow | undefined;
  onUpdate: (data: FieldValues) => void;
  handlePolygon: (data: TPolygon) => void;
}

export default function SectorModal({
  onSubmitValid,
  onSubmitAndModalRefresh,
  handleCloseModal,
  defaultValue,
  onUpdate,
  handlePolygon,
}: ISectorModal) {
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
  const maxCharacters = 30;
  const defaultQueryVariables: GetSectorizationByContractIdQueryVariables = {
    sectorizationId: defaultValue?.id,
  };

  /* Local Data */
  const { data } = useGetSectorizationByContractIdQuery({
    variables: defaultQueryVariables,
    fetchPolicy: "network-only",
  });
  //TODO: to use it to store postalcode
  // const [currentSectorContents, setCurrentSectorContents] = useState<any>([]);
  const polygon = data?.sectorization?.data?.attributes?.polygonCoordinates;
  const form = useForm({
    mode: "onChange",
    defaultValues: defaultValue ?? {},
  });
  const { handleSubmit } = form;
  const GoogleMap = dynamic(() => import("../../Map/LeafletMap"), {
    ssr: false,
  });

  //TODO: postalcode example
  // const postalCodes = [
  //   { value: 69500, name: "lyon-1" },
  //   { value: 69400, name: "lyon-2" },
  //   { value: 69100, name: "lyon-3" },
  //   { value: 69200, name: "lyon-4" },
  // ];
  // useEffect(() => {
  //   const mappedTags = postalCodes.map((commune) => {
  //     if (!communeLoading) {
  //       return {
  //         value: commune.value ?? "",
  //         label: commune.name ?? "",
  //       };
  //     }
  //   });
  //   setCurrentSectorContents(mappedTags);
  // }, []);
  // const watchingData = watch("communes");

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
              label={formLabels.descritpion}
              isRequired={true}
              maxLengthValidation={maxCharacters}
            />
          </div>

          <div className="c-SectorModal__InformationsSectorCommunes">
            {
              //TODO: add commune selector
              /* {currentSectorContents && (
              <FormMultiselect
                name="communes"
                label="communes"
                options={currentSectorContents}
                isMulti
                maxMultiSelection={3}
              />
            )}  */
            }
          </div>
          <div className="c-SectorModal__InformationsSectorListing"></div>
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
            handlePolygon={handlePolygon}

            //TODO:Send Commune
            // commune={
            //   watchingData && watchingData.length > 0
            //     ? watchingData[0].value
            //     : ""
            // }
          />
        </div>
      </form>
    </FormProvider>
  );
}
