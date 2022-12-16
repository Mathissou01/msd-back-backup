import React from "react";
import PageTitle from "../../../components/PageTitle/PageTitle";

export default function PersonnalisationMenuPage() {
  /* Static Data */
  const title = "Menu";
  const description =
    "Choisissez, personnalisez et ordonnez les entrées du menu de gauche";

  return <PageTitle title={title} description={description} />;
}
