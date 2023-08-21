import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useGetAudiencesQuery } from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { useContract } from "../../../hooks/useContract";
import { CommonModalWrapperRef } from "../CommonModalWrapper/CommonModalWrapper";
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
  const noAudienceAvailableMessage =
    "Merci d'activer au moins un usager afin de pouvoir enregistrer ce formulaire";

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
  const [audienceOptions, setAudienceOptions] =
    useState<Array<IFormSingleMultiselectOption>>();
  const { data: audiencesFromContract, loading: audiencesFromContractLoading } =
    useGetAudiencesQuery({
      variables: {
        filters: {
          contract: {
            id: {
              eq: contract.id,
            },
          },
          isActive: {
            eq: true,
          },
        },
      },
      fetchPolicy: "network-only",
    });
  const audiencesNumberFromContract =
    audiencesFromContract?.audiences?.data?.length;
  const audiencesWatch = watch("audiences");
  register("audiences", {
    required: {
      value: true,
      message: requiredMessage,
    },
  });

  useEffect(() => {
    if (audiencesNumberFromContract === 0) {
      setValue("audiences", undefined);
    } else if (
      audiencesNumberFromContract === 1 &&
      audiencesFromContract?.audiences?.data
    ) {
      const uniqueAssignedAudience = audiencesFromContract.audiences.data[0];
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
      }
    } else if (audiencesNumberFromContract && defaultValues?.audiences) {
      const filteredAudiences = defaultValues.audiences.filter(
        (audience: IFormSingleMultiselectOption) =>
          audiencesFromContract?.audiences?.data?.some(
            (audience2) => audience2.id === audience.value,
          ),
      );
      setSelectedAudiences(filteredAudiences);
    }
  }, [
    audiencesNumberFromContract,
    defaultValues,
    setValue,
    audiencesFromContract?.audiences?.data,
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

  useEffect(() => {
    if (audiencesFromContract?.audiences?.data && !audienceOptions) {
      setAudienceOptions(
        audiencesFromContract.audiences.data
          .map((audience) => {
            if (audience?.attributes?.type && audience.id) {
              return {
                label: audience.attributes.type,
                value: audience.id,
              };
            }
          })
          .filter(removeNulls),
      );
    }
  }, [audiencesFromContract?.audiences?.data, audienceOptions]);

  return (
    <>
      <div className="c-CommonAudienceSelection__Label">{labels.users}</div>
      {!audiencesFromContractLoading && (
        <>
          {audiencesNumberFromContract === 0 ? (
            <span className="c-CommonAudienceSelection__NoAudienceAvailableMessage">
              {noAudienceAvailableMessage}
            </span>
          ) : (
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
          )}
          <CommonButton
            label={labels.modalOpenningBtn}
            type="button"
            style="secondary"
            isDisabled={
              !audiencesNumberFromContract || audiencesNumberFromContract <= 1
            }
            onClick={() => handleStartModal()}
          />
          <ErrorMessage
            errors={errors}
            name="audiences"
            render={({ message }: { message: string }) => (
              <CommonFormErrorText
                message={message}
                errorId={`audiences_error`}
              />
            )}
          />
        </>
      )}
      <AudienceModal
        modalRef={modalRef}
        onValidate={setAudiences}
        selectedAudiences={selectedAudiences}
        audienceOptions={audienceOptions ?? []}
      />
    </>
  );
}
