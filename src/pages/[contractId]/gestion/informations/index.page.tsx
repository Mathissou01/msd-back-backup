import React from "react";
import { EContractClientTypeLabels } from "../../../../lib/contract";
import { useContract } from "../../../../hooks/useContract";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
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
  };

  /* Local Data */
  const { contract } = useContract();

  const contractInformation = {
    // Client
    clientName: contract.attributes?.clientName ?? "N/A",
    siret: contract.attributes?.siret ?? "N/A",
    contractStatus: contract.attributes?.contractStatus ?? "N/A",
    isNonExclusive: contract.attributes?.isNonExclusive ? "Non" : "Oui",
    clientType: contract.attributes?.clientType
      ? EContractClientTypeLabels[contract.attributes?.clientType]
      : "N/A",
    // Contact
    clientFirstName:
      contract.attributes?.clientContact?.data?.attributes?.firstName ?? "N/A",
    clientLastName:
      contract.attributes?.clientContact?.data?.attributes?.lastName ?? "N/A",
    clientEmail:
      contract.attributes?.clientContact?.data?.attributes?.email ?? "N/A",
    clientPhoneNumber:
      contract.attributes?.clientContact?.data?.attributes?.phoneNumber ??
      "N/A",
    // Suez
    isRVFrance: contract.attributes?.isRVFrance ? "Oui" : "Non",
    ccap: contract.attributes?.ccap ?? "N/A",
    clear: contract.attributes?.clear ?? "N/A",
  };

  return (
    <>
      <div className="c-GestionInformationsPage">
        <PageTitle title={labels.title} />
        <h2>{labels.clientData}</h2>
        <table className="c-GestionInformationsPage__Table">
          <tbody>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.clientName}</th>
              <td>{contractInformation.clientName}</td>
            </tr>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.siret}</th>
              <td>{contractInformation.siret}</td>
            </tr>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.contractStatus}</th>
              <td>{contractInformation.contractStatus}</td>
            </tr>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.isNonExclusive}</th>
              <td>{contractInformation.isNonExclusive}</td>
            </tr>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.clientType}</th>
              <td>{contractInformation.clientType}</td>
            </tr>
          </tbody>
        </table>
        <h2>{labels.contactData}</h2>
        <table className="c-GestionInformationsPage__Table">
          <tbody>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.clientFirstNameLastName}</th>
              <td>
                {`${contractInformation.clientFirstName} ${contractInformation.clientLastName}`}
              </td>
            </tr>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.clientEmail}</th>
              <td>{contractInformation.clientEmail}</td>
            </tr>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.clientPhoneNumber}</th>
              <td>{contractInformation.clientPhoneNumber}</td>
            </tr>
          </tbody>
        </table>
        <h2>{labels.suezData}</h2>
        <table className="c-GestionInformationsPage__Table">
          <tbody>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.isRVFrance}</th>
              <td>{contractInformation.isRVFrance}</td>
            </tr>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.ccap}</th>
              <td>{contractInformation.ccap}</td>
            </tr>
            <tr className="c-GestionInformationsPage__TableRow">
              <th>{labels.clear}</th>
              <td>{contractInformation.clear}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <GestionInformationsPage />
    </ContractLayout>
  );
}
