import React, { useRef } from "react";
import {
  Contract,
  useDeleteContractByIdMutation,
} from "../../../graphql/codegen/generated-types";
import { EContractClientTypeLabels } from "../../../lib/contract";
import { IInformationContractLabels } from "../../../lib/informations";
import PageTitle from "../../PageTitle/PageTitle";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./information-contract.scss";
import { useRouter } from "next/router";
import { useContract } from "../../../hooks/useContract";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "../../Common/CommonModalWrapper/CommonModalWrapper";
import "./information-contract.scss";

interface IInformationContractProps {
  labels: IInformationContractLabels;
  contractData: Contract;
  setEditMode: (editMode: boolean) => void;
}

export default function InformationContract({
  labels,
  contractData,
  setEditMode,
}: IInformationContractProps) {
  const contractInformation = {
    // Client
    clientName: contractData.clientName ?? "N/A",
    siret: contractData.siret ?? "N/A",
    contractStatus: contractData.contractStatus ?? "N/A",
    isNonExclusive: contractData.isNonExclusive ? "Non" : "Oui",
    clientType: contractData.clientType
      ? EContractClientTypeLabels[contractData.clientType]
      : "N/A",
    // Contact
    clientFirstName:
      contractData.clientContact?.data?.attributes?.firstName ?? "N/A",
    clientLastName:
      contractData.clientContact?.data?.attributes?.lastName ?? "N/A",
    clientEmail: contractData.clientContact?.data?.attributes?.email ?? "N/A",
    clientPhoneNumber:
      contractData.clientContact?.data?.attributes?.phoneNumber ?? "N/A",
    // Suez
    isRVFrance: contractData.isRVFrance ? "Oui" : "Non",
    ccap: contractData.ccap ?? "N/A",
    clear: contractData.clear ?? "N/A",
  };

  /* Methods */
  const handleStartModal = () => {
    modalRef.current?.toggleModal(true);
  };

  const handleCloseModal = () => {
    modalRef.current?.toggleModal(false);
  };
  async function handleConfirmRemove() {
    return deleteContractIdMutation({
      variables: { deleteContractId: contractId },
    });
  }
  const handleConfirmAndCloseModal = async () => {
    try {
      await handleConfirmRemove();
      handleCloseModal();
      router.push(`/`);
    } catch (error) {
      console.error("Erreur lors de la suppression du contrat:", error);
    }
  };
  /* External Data */
  const [deleteContractIdMutation] = useDeleteContractByIdMutation();

  /* Local Data */
  const { contractId } = useContract();
  const modalRef = useRef<CommonModalWrapperRef>(null);
  const router = useRouter();
  return (
    <div className="c-InformationContract">
      <PageTitle title={labels.title} />
      <h2>{labels.clientData}</h2>
      <table className="c-InformationContract__Table">
        <tbody>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.clientName}</th>
            <td>{contractInformation.clientName}</td>
          </tr>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.siret}</th>
            <td>{contractInformation.siret}</td>
          </tr>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.contractStatus}</th>
            <td>{contractInformation.contractStatus}</td>
          </tr>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.isNonExclusive}</th>
            <td>{contractInformation.isNonExclusive}</td>
          </tr>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.clientType}</th>
            <td>{contractInformation.clientType}</td>
          </tr>
        </tbody>
      </table>
      <h2>{labels.contactData}</h2>
      <table className="c-InformationContract__Table">
        <tbody>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.clientFirstNameLastName}</th>
            <td>
              {`${contractInformation.clientFirstName} ${contractInformation.clientLastName}`}
            </td>
          </tr>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.clientEmail}</th>
            <td>{contractInformation.clientEmail}</td>
          </tr>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.clientPhoneNumber}</th>
            <td>{contractInformation.clientPhoneNumber}</td>
          </tr>
        </tbody>
      </table>
      <h2>{labels.suezData}</h2>
      <table className="c-InformationContract__Table">
        <tbody>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.isRVFrance}</th>
            <td>{contractInformation.isRVFrance}</td>
          </tr>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.ccap}</th>
            <td>{contractInformation.ccap}</td>
          </tr>
          <tr className="c-InformationContract__TableRow">
            <th>{labels.clear}</th>
            <td>{contractInformation.clear}</td>
          </tr>
        </tbody>
      </table>
      {/* TODO: only show edit button for Super Admin */}
      <div className="c-InformationContract__Buttons">
        <CommonButton
          label={labels.buttonEditLabel}
          style="primary"
          picto="edit"
          onClick={() => setEditMode(true)}
        />
        <CommonButton
          label={labels.buttonDeleteLabel}
          style="primary"
          onClick={() => handleStartModal()}
        />
        <div className="c-InformationContract__Modal">
          <CommonModalWrapper ref={modalRef}>
            <div className="c-InformationContract__ConfirmationModalButtons">
              <p>{labels.confirmationText}</p>
              <CommonButton
                type="button"
                style="secondary"
                label={labels.negativeModalButton}
                onClick={() => handleCloseModal()}
              />
              <CommonButton
                type="submit"
                style="primary"
                label={labels.affirmativeModalButton}
                onClick={handleConfirmAndCloseModal}
              />
            </div>
          </CommonModalWrapper>
        </div>
      </div>
    </div>
  );
}
