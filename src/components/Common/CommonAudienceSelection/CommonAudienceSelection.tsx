import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useContract } from "../../../hooks/useContract";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../CommonButton/CommonButton";
import { IFormSingleMultiselectOption } from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import AudienceModal from "./AudienceModal/AudienceModal";
import "./common-audience-selection.scss";

export default function CommonAudienceSelection() {
  /* Static Data */
  const labels = {
    users: "Usagers *",
    modalOpenningBtn: "Sélectionner les usagers",
    allAudiences: "Tous",
  };

  /* Methods */
  const handleStartModal = () => {
    modalRef.current?.toggleModal(true);
  };

  function setAudiences(audiences: Array<IFormSingleMultiselectOption>) {
    setValue("audiences", audiences);
    setSelectedAudiences(audiences);
  }

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const { contract } = useContract();
  const { watch, setValue, register } = useFormContext();
  const [selectedAudiences, setSelectedAudiences] =
    useState<Array<IFormSingleMultiselectOption>>();
  const audiencesNumberFromContract =
    contract?.attributes?.audiences?.data?.length ?? 0;
  const isInitialized = useRef<boolean>(false);
  const audiencesWatch = watch("audiences");
  register("audiences", {
    required: !audiencesWatch,
  });

  useEffect(() => {
    if (!isInitialized.current) {
      if (
        audiencesNumberFromContract === 1 &&
        contract?.attributes?.audiences?.data
      ) {
        const uniqueAssignedAudience = contract.attributes.audiences.data[0];
        if (
          uniqueAssignedAudience?.id &&
          uniqueAssignedAudience.attributes?.type
        ) {
          setSelectedAudiences([
            {
              label: uniqueAssignedAudience.attributes.type,
              value: uniqueAssignedAudience.id,
            },
          ]);
          setValue("audiences", uniqueAssignedAudience?.id);
        }
      } else {
        setSelectedAudiences(audiencesWatch);
      }
    }
    isInitialized.current = true;
  }, [
    audiencesNumberFromContract,
    audiencesWatch,
    contract.attributes?.audiences?.data,
    setValue,
  ]);

  useEffect(() => {
    if (audiencesWatch === undefined) {
      register("audiences", {
        required: !audiencesWatch,
      });
    }
  }, [audiencesWatch, register]);

  return (
    <>
      <div className="c-CommonAudienceSelection__Label">{labels.users}</div>
      <ul className="c-CommonAudienceSelection__List">
        {selectedAudiences &&
          (selectedAudiences.length > 1 ? (
            selectedAudiences?.length === audiencesNumberFromContract ? (
              <li>{labels.allAudiences}</li>
            ) : (
              selectedAudiences.map((audience, index) => {
                return <li key={index}>{audience.label}</li>;
              })
            )
          ) : (
            selectedAudiences.length === 1 && (
              <li>{selectedAudiences[0].label}</li>
            )
          ))}
      </ul>
      <CommonButton
        label={labels.modalOpenningBtn}
        type="button"
        style="secondary"
        isDisabled={audiencesNumberFromContract <= 1}
        onClick={() => handleStartModal()}
      />
      <AudienceModal
        modalRef={modalRef}
        onValidate={setAudiences}
        selectedAudiences={selectedAudiences}
      />
    </>
  );
}
