import React from "react";
import { useRouter } from "next/router";
import ContractLayout from "../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../components/PageTitle/PageTitle";
import CommonBibliothequeMedia from "../../../../components/Common/CommonBibliothequeMedia/CommonBibliothequeMedia";
import { getRightsByLabel } from "../../../../lib/user";
import { useContract } from "../../../../hooks/useContract";
import { useUser } from "../../../../hooks/useUser";
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

  const { contractId } = useContract();
  const router = useRouter();
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Medias", userRights);

  if (!userPermissions.read) router.push(`/${contractId}`);

  return (
    <>
      <PageTitle
        title={formLabels.title}
        description={formLabels.description}
      />
      <CommonBibliothequeMedia
        canSelectMultipleFiles
        canDeleteFiles={userPermissions.delete}
      />
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
