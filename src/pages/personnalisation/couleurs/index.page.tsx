import React from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";

export default function PersonnalisationMenuPage() {
  /* Static Data */
  const title = "Couleurs, logo, lien";
  const description = "Personnalisez le site à vos couleurs.";

  return <PageTitle title={title} description={description} />;
}
