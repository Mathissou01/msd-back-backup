import React, { useState } from "react";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import InformationContract from "../../../../components/Informations/InformationContract/InformationContract";
import EditInformationContract from "../../../../components/Informations/EditInformationContract/EditInformationContract";
import "./gestion-informations-page.scss";

export function GestionInformationsPage() {
  /* Static Data */
  const labels = {
    title: "Informations",
    clientData: "Client",
    clientName: "Nom du client",
    siret: "Numéro Siret",
    contractStatus: "Statut du client",
    isNonExclusive: "Exclusivité",
    clientType: "Type",
    contactData: "Contact client",
    clientFirstNameLastName: "Prénom Nom",
    clientEmail: "Email",
    clientPhoneNumber: "Téléphone",
    suezData: "Données Suez",
    isRVFrance: "Services opérés par RV France",
    ccap: "Numéro CCAP",
    clear: "Numéro CLEAR",
    buttonEditLabel: "Éditer le client",
    buttonDeleteLabel: "Supprimer le client",
    confirmationText: "Confirmez-vous la suppression du client ?",
    affirmativeModalButton: "Oui",
    negativeModalButton: "Non",
    buttonEditLabels: "Éditer le client",
    reactivateContract: "Réactiver le client",
    deactivateContract: "Désactiver le client",
    reactivateMessage: "Confirmez-vous la réactivation du client ?",
    deactivateMessage: "Confirmez-vous la désactivation du client ?",
    yes: "Oui",
    no: "Non",
  };

  /* Local Data */
  const { contract } = useContract();
  const [editMode, setEditMode] = useState<boolean>(false);

  return (
    <div className="c-GestionInformationsPage">
      {!!contract.id &&
        !!contract.attributes &&
        (editMode ? (
          <EditInformationContract
            contractId={contract.id}
            contractData={contract.attributes}
            labels={labels}
            setEditMode={setEditMode}
          />
        ) : (
          <InformationContract
            contractData={contract.attributes}
            labels={labels}
            setEditMode={setEditMode}
          />
        ))}
    </div>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <GestionInformationsPage />
    </ContractLayout>
  );
}
