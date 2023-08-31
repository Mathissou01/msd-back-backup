import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IFormSingleMultiselectOption } from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import CommonButton from "../../Common/CommonButton/CommonButton";
import AlertSectorsModal from "./AlertSectorsModal/AlertSectorsModal";
import "./alert-selecting-sectors.scss";

export default function AlertSelectingSectors() {
  /* Static Data */
  const labels = {
    title: "Secteurs *",
    modalOpenningBtn: "Sélectionner les secteurs",
  };

  /* Methods */
  const handleStartModal = () => {
    modalRef.current?.toggleModal(true);
  };

  function setSelectedSectors(
    sectorizations: Array<IFormSingleMultiselectOption>,
    cities: Array<IFormSingleMultiselectOption>,
  ) {
    setSelectedSectorizations(sectorizations);
    setSelectedCities(cities);
  }

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const {
    formState: { defaultValues, errors },
  } = useFormContext();
  const [selectedSectorizations, setSelectedSectorizations] =
    useState<Array<IFormSingleMultiselectOption>>();
  const [selectedCities, setSelectedCities] =
    useState<Array<IFormSingleMultiselectOption>>();

  useEffect(() => {
    if (defaultValues) {
      setSelectedSectorizations(defaultValues.sectorizations);
      setSelectedCities(defaultValues.cities);
    }
  }, [defaultValues]);

  return (
    <>
      <div className="c-AlertSelectingSectors__Label">{labels.title}</div>
      <ul className="c-AlertSelectingSectors__List">
        {selectedSectorizations &&
          selectedSectorizations.map((sector, index) => {
            return <li key={index}>{sector.label}</li>;
          })}
        {selectedCities &&
          selectedCities.map((city, index) => {
            return <li key={index}>{city.label}</li>;
          })}
      </ul>
      <CommonButton
        label={labels.modalOpenningBtn}
        type="button"
        style="secondary"
        onClick={() => handleStartModal()}
      />
      <ErrorMessage
        errors={errors}
        name="audiences"
        render={({ message }: { message: string }) => (
          <CommonFormErrorText message={message} errorId={`audiences_error`} />
        )}
      />
      <AlertSectorsModal
        modalRef={modalRef}
        onValidate={setSelectedSectors}
        selectedSectorizations={selectedSectorizations}
        selectedCities={selectedCities}
      />
    </>
  );
}
