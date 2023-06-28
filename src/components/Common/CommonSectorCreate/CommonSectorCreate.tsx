import { useEffect, useState, useRef } from "react";
import CommonButton from "../CommonButton/CommonButton";
import CommonModalWrapper, {
  CommonModalWrapperRef,
  ICommonModalWrapperSize,
} from "../CommonModalWrapper/CommonModalWrapper";
import FormSector from "./FormSector/FormSector";
import { ISectorsTableRow } from "../../../lib/sectors";

export interface ICommonSectorCreateProps {
  styleButton?: "primary" | "secondary" | null;
}

export default function CommonSectorCreate({
  styleButton = "primary",
}: ICommonSectorCreateProps) {
  /* Static Data */
  const label = {
    addButton: "Créer un secteur",
  };

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const [secteurDefaultValue, setSecteurDefaultValue] =
    useState<ISectorsTableRow>();

  /* Methods */
  const handleStartModal = () => {
    modalRef.current?.toggleModal(true);
  };

  const handleCloseCommonModal = () => {
    setSecteurDefaultValue(undefined);
  };

  const handleCloseModal = () => {
    modalRef.current?.toggleModal(false);
    setSecteurDefaultValue(undefined);
  };

  useEffect(() => {
    setSecteurDefaultValue(undefined);
  }, []);

  return (
    <div>
      <CommonButton
        label={label.addButton}
        style={styleButton}
        picto="add"
        type="button"
        onClick={() => handleStartModal()}
      />
      <CommonModalWrapper
        onClose={handleCloseCommonModal}
        size={ICommonModalWrapperSize.LARGE}
        ref={modalRef}
      >
        <FormSector
          defaultValue={secteurDefaultValue}
          handleCloseModal={handleCloseModal}
        />
      </CommonModalWrapper>
    </div>
  );
}
