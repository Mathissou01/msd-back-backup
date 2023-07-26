import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useContract } from "../../../hooks/useContract";
import { CommonModalWrapperRef } from "../../Common/CommonModalWrapper/CommonModalWrapper";
import { IFormSingleMultiselectOption } from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import CommonButton from "../CommonButton/CommonButton";
import CommonFormErrorText from "../CommonFormErrorText/CommonFormErrorText";
import AudienceModal from "./AudienceModal/AudienceModal";
import "./common-audience-selection.scss";

export default function CommonAudienceSelection() {
  /* Static Data */
  const labels = {
    users: "Usagers *",
    modalOpenningBtn: "Sélectionner les usagers",
    allAudiences: "Tous",
  };
  const requiredMessage = "Ce champ est obligatoire";

  /* Methods */
  const handleStartModal = () => {
    modalRef.current?.toggleModal(true);
  };

  function setAudiences(audiences: Array<IFormSingleMultiselectOption>) {
    setSelectedAudiences(audiences);
  }

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const { contract } = useContract();
  const {
    watch,
    setValue,
    register,
    formState: { defaultValues, errors },
  } = useFormContext();
  const [selectedAudiences, setSelectedAudiences] =
    useState<Array<IFormSingleMultiselectOption>>();
  const audiencesNumberFromContract =
    contract?.attributes?.audiences?.data?.length ?? 0;
  const audiencesWatch = watch("audiences");
  register("audiences", {
    required: {
      value: true,
      message: requiredMessage,
    },
  });

  useEffect(() => {
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
      if (defaultValues) {
        setSelectedAudiences(defaultValues.audiences);
      }
    }
  }, [
    audiencesNumberFromContract,
    defaultValues,
    contract.attributes?.audiences?.data,
    setValue,
  ]);

  useEffect(() => {
    if (audiencesWatch === undefined) {
      register("audiences", {
        required: {
          value: true,
          message: requiredMessage,
        },
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
      <ErrorMessage
        errors={errors}
        name="audiences"
        render={({ message }: { message: string }) => (
          <CommonFormErrorText message={message} errorId={`audiences_error`} />
        )}
      />
      <AudienceModal
        modalRef={modalRef}
        onValidate={setAudiences}
        selectedAudiences={selectedAudiences}
      />
    </>
  );
}
