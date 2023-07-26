import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useContract } from "../../../../hooks/useContract";
import { removeNulls } from "../../../../lib/utilities";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../CommonButton/CommonButton";
import FormSingleMultiselect, {
  IFormSingleMultiselectOption,
} from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import "./audience-modal.scss";

interface IAudienceModalProps {
  modalRef: React.RefObject<CommonModalWrapperRef>;
  selectedAudiences?: Array<IFormSingleMultiselectOption>;
  onValidate: (audiences: Array<IFormSingleMultiselectOption>) => void;
}

export default function AudienceModal({
  modalRef,
  selectedAudiences,
  onValidate,
}: IAudienceModalProps) {
  /* Static Data */
  const labels = {
    title: "Sélectionner les usagers",
    submitBtn: "Valider la sélection",
    cancelBtn: "Annuler",
  };
  const formLabels = {
    users: "Usagers",
  };

  /* Methods */
  const handleCloseModal = () => {
    resetField("audiences");
    setValue("audiences", selectedAudiences);
  };

  function handleValidation() {
    onValidate(audiencesWatch);
    modalRef.current?.toggleModal(false);
    setValue("audiences", audiencesWatch, { shouldDirty: true });
  }

  /* Local Data */
  const { contract } = useContract();
  const [audienceOptions, setAudienceOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const { watch, setValue, resetField } = useFormContext();
  const audiencesWatch = watch("audiences", selectedAudiences);

  useEffect(() => {
    if (audienceOptions.length === 0) {
      const audiencesFromContract = contract?.attributes?.audiences?.data;
      if (audiencesFromContract) {
        setAudienceOptions(
          audiencesFromContract
            ?.map((audience) => {
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
    }
  }, [audienceOptions, contract]);

  useEffect(() => {
    if (audiencesWatch) {
      setIsDisabled(
        !Array.isArray(audiencesWatch) || audiencesWatch.length === 0,
      );
    }
  }, [audiencesWatch]);

  useEffect(() => {
    if (selectedAudiences) setValue("audiences", selectedAudiences);
  }, [selectedAudiences, setValue]);

  return (
    <CommonModalWrapper ref={modalRef} onClose={handleCloseModal}>
      <div className="c-AudienceModal__ModalTitle">{labels.title}</div>
      <hgroup>
        <div className="c-AudienceModal__ModalFields">
          <FormSingleMultiselect
            name="audiences"
            label={formLabels.users}
            options={audienceOptions}
            isMulti
            isRequired
          />
        </div>
      </hgroup>
      <div className="c-AudienceModal__ModalButtons">
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
    </CommonModalWrapper>
  );
}
