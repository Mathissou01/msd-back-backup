import React from "react";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonBibliothequeMedia from "../../../../components/Common/CommonBibliothequeMedia/CommonBibliothequeMedia";
import "./edito-bibliotheque-de-medias.scss";

export interface IFolder {
  id: string;
  name: string;
  path: string;
  pathId: number;
  children?: Array<string>;
  childrenAmount?: number;
  filesAmount?: number;
}

export function EditoBibliothequeDeMedias() {
  /* Static Data */
  const formLabels = {
    title: "Ajouter des médias",
    description: "",
    defaultValueName: "Bibliothèque de Médias",
    MediaSectionTitle: "Médias",
    FolderSectionTitle: "Dossiers",
  };

  return (
    <>
      <PageTitle
        title={formLabels.title}
        description={formLabels.description}
      />
      <CommonBibliothequeMedia />
    </>
  );
}

export default function IndexPage() {
  return (
    <ContractLayout>
      <EditoBibliothequeDeMedias />
    </ContractLayout>
  );
}
