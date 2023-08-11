import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  useGetSearchCitiesQuery,
  useGetSectorizationsPickUpDayQuery,
} from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import { useContract } from "../../../../hooks/useContract";
import FormSingleMultiselect, {
  IFormSingleMultiselectOption,
} from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import "./alert-sectors-modal.scss";

interface IAlertSectorsModalProps {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  selectedSectorizations?: Array<IFormSingleMultiselectOption>;
  selectedCities?: Array<IFormSingleMultiselectOption>;
  onValidate: (
    sectorizations: Array<IFormSingleMultiselectOption>,
    cities: Array<IFormSingleMultiselectOption>,
  ) => void;
}

export default function AlertSectorsModal({
  modalRef,
  selectedSectorizations,
  selectedCities,
  onValidate,
}: IAlertSectorsModalProps) {
  /* Static Data */
  const labels = {
    title: "Secteurs *",
    submitBtn: "Valider la sélection",
    cancelBtn: "Annuler",
  };
  const formLabels = {
    sectorizations: "Secteur",
    cities: "Communes ou EPCI",
    citiesValidationLabel: "Nom, Code postal, n° Siren ou n° Insee",
  };

  /* Methods */
  function handleMultiSelectInputChange(event: string): void {
    setSearchTerm(event);
  }

  const handleCloseModal = () => {
    resetField("sectorizations");
    setValue("sectorizations", selectedSectorizations);
    resetField("cities");
    setValue("cities", selectedCities);
  };

  function handleValidation() {
    onValidate(sectorizationsWatch, citiesWatch);
    modalRef.current?.toggleModal(false);
    setValue("sectorizations", sectorizationsWatch, { shouldDirty: true });
    setValue("cities", citiesWatch, { shouldDirty: true });
  }

  /* Local Data */
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [citiesOptions, setCitiesOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const [sectorizationOptions, setSectorizationOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { watch, setValue, resetField } = useFormContext();
  const sectorizationsWatch = watch("sectorizations", selectedSectorizations);
  const citiesWatch = watch("cities", selectedCities);

  /* External Data */
  const { contractId } = useContract();
  const { data: searchCitiesData } = useGetSearchCitiesQuery({
    variables: { contractId, searchTerm: searchTerm },
    fetchPolicy: "no-cache",
  });
  const { data: sectorizationsData } = useGetSectorizationsPickUpDayQuery({
    variables: { contractId },
    fetchPolicy: "cache-and-network",
  });

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
    if (sectorizationsWatch || citiesWatch) {
      setIsDisabled(
        (!Array.isArray(sectorizationsWatch) ||
          sectorizationsWatch.length === 0) &&
          (!Array.isArray(citiesWatch) || citiesWatch.length === 0),
      );
    }
  }, [sectorizationsWatch, citiesWatch]);

  useEffect(() => {
    if (selectedSectorizations)
      setValue("sectorizations", selectedSectorizations);
    if (selectedCities) setValue("cities", selectedCities);
  }, [selectedSectorizations, selectedCities, setValue]);

  return (
    <CommonModalWrapper ref={modalRef} onClose={handleCloseModal}>
      <div className="c-AlertSectorsModal">
        <div className="c-AlertSectorsModal__ModalTitle">{labels.title}</div>
        <hgroup>
          <div className="c-AlertSectorsModal__ModalFields">
            <FormSingleMultiselect
              name="cities"
              label={formLabels.cities}
              validationLabel={formLabels.citiesValidationLabel}
              options={citiesOptions}
              isMulti
              onInputChange={handleMultiSelectInputChange}
            />
          </div>
          <div className="c-AlertSectorsModal__ModalFields">
            <FormSingleMultiselect
              name="sectorizations"
              label={formLabels.sectorizations}
              options={sectorizationOptions}
              isMulti
            />
          </div>
        </hgroup>
        <div className="c-AlertSectorsModal__ModalButtons">
          <CommonButton
            type="button"
            label={labels.submitBtn}
            style="primary"
            isDisabled={isDisabled}
            onClick={() => handleValidation()}
          />
          <CommonButton
            type="button"
            label={labels.cancelBtn}
            onClick={() => {
              modalRef.current?.toggleModal(false);
              handleCloseModal();
            }}
          />
        </div>
      </div>
    </CommonModalWrapper>
  );
}
