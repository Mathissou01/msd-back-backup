import React, { useRef } from "react";
import { useRouter } from "next/router";
import {
  Contract,
  Enum_Contract_Contractstatus,
  Statuses,
  useChangeContractStatusMutation,
  useDeleteContractByIdMutation,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { EContractClientTypeLabels } from "../../../lib/contract";
import { IInformationContractLabels } from "../../../lib/informations";
import PageTitle from "../../PageTitle/PageTitle";
import CommonButton from "../../Common/CommonButton/CommonButton";
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
  /* Methods */
  async function handleConfirmRemove() {
    return deleteContractIdMutation({
      variables: { deleteContractId: contractId },
    })
      .then(() => {
        deleteModalRef.current?.toggleModal(false);
        router.push("/");
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du contrat:", error);
      });
  }

  async function handleConfirmActivation() {
    return changeContractStatus({
      variables: {
        contractId: contractId,
        status:
          contractData.contractStatus === Enum_Contract_Contractstatus.Desactive
            ? Statuses.Active
            : Statuses.Inactive,
      },
    })
      .then(() => {
        activationModalRef.current?.toggleModal(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error(
          "Erreur lors de l'activation ou désactivation du client",
          error,
        );
      });
  }

  /* External Data */
  const [deleteContractIdMutation] = useDeleteContractByIdMutation();
  const [changeContractStatus] = useChangeContractStatusMutation();

  /* Local Data */
  const { contractId } = useContract();
  const deleteModalRef = useRef<CommonModalWrapperRef>(null);
  const activationModalRef = useRef<CommonModalWrapperRef>(null);
  const router = useRouter();
  const contractInformation = {
    // Client
    clientName: contractData.clientName ?? "N/A",
    siret: contractData.siret ?? "N/A",
    contractStatus: contractData.contractStatus ?? "N/A",
    isNonExclusive: contractData.isNonExclusive ? "Non exclusif" : "Exclusif",
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

  const isInactive =
    contractData.contractStatus === Enum_Contract_Contractstatus.Desactive;

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
      {/* TODO: only show edit and activation buttons for Super Admin */}
      <div className="c-InformationContract__Buttons">
        <CommonButton
          label={labels.buttonEditLabel}
          style="primary"
          picto="edit"
          onClick={() => setEditMode(true)}
          isDisabled={isInactive}
        />
        <CommonButton
          label={
            contractData.contractStatus === "Desactive"
              ? labels.reactivateContract
              : labels.deactivateContract
          }
          style="primary"
          onClick={() => activationModalRef.current?.toggleModal(true)}
        />
        <CommonButton
          label={labels.buttonDeleteLabel}
          style="primary"
          onClick={() => deleteModalRef.current?.toggleModal(true)}
        />

        <div className="c-InformationContract__Modal">
          <CommonModalWrapper ref={deleteModalRef}>
            <div className="c-InformationContract__ConfirmationModalButtons">
              <p>{labels.confirmationText}</p>
              <CommonButton
                type="button"
                style="secondary"
                label={labels.negativeModalButton}
                onClick={() => deleteModalRef.current?.toggleModal(false)}
              />
              <CommonButton
                type="submit"
                style="primary"
                label={labels.affirmativeModalButton}
                onClick={handleConfirmRemove}
              />
            </div>
          </CommonModalWrapper>
          <CommonModalWrapper ref={activationModalRef}>
            <div className="c-InformationContract__ConfirmationModalButtons">
              {contractData.contractStatus ===
                Enum_Contract_Contractstatus.Desactive && (
                <p>{labels.reactivateMessage}</p>
              )}
              {contractData.contractStatus !==
                Enum_Contract_Contractstatus.Desactive && (
                <p>{labels.deactivateMessage}</p>
              )}
              <CommonButton
                type="button"
                style="secondary"
                label={labels.negativeModalButton}
                onClick={() => activationModalRef.current?.toggleModal(false)}
              />
              <CommonButton
                type="submit"
                style="primary"
                label={labels.affirmativeModalButton}
                onClick={handleConfirmActivation}
              />
            </div>
          </CommonModalWrapper>
        </div>
      </div>
    </div>
  );
}
