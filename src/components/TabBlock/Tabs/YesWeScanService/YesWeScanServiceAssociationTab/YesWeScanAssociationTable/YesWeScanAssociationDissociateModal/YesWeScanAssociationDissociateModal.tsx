import { RefObject } from "react";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../../../../../Common/CommonModalWrapper/CommonModalWrapper";
import CommonButton from "../../../../../../Common/CommonButton/CommonButton";
import "./yes-we-scan-association-dissociate-modal.scss";

interface IYesWeScanAssociationDissociateModalProps {
  modalRef: RefObject<CommonModalWrapperRef>;
  selectedQrCodeID: string;
  handleConfirm: (id: string) => void;
}

const labels = {
  text: "Souhaitez-vous vraiment dissocier le QR Code",
  confirm: "Confirmer",
  cancel: "Annuler",
};

export default function YesWeScanAssociationDissociateModal({
  modalRef,
  selectedQrCodeID,
  handleConfirm,
}: IYesWeScanAssociationDissociateModalProps) {
  /* Local Data */
  const handleCloseModal = () => {
    modalRef.current?.toggleModal(false);
  };

  return (
    <CommonModalWrapper ref={modalRef}>
      <div className="c-YesWeScanAssociationDissociateModal">
        <span className="c-YesWeScanAssociationDissociateModal__ModalText">
          {labels.text} ({selectedQrCodeID})
        </span>
        <div className="c-YesWeScanAssociationDissociateModal__ModalButtonsContainer">
          <CommonButton
            label={labels.confirm}
            picto="check"
            style="primary"
            onClick={() => handleConfirm(selectedQrCodeID)}
          />
          <CommonButton
            label={labels.cancel}
            picto="cross"
            onClick={handleCloseModal}
          />
        </div>
      </div>
    </CommonModalWrapper>
  );
}
