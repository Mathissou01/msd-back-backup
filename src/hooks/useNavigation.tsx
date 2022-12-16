import React, { useContext } from "react";

export enum ENavigationPages {
  "/" = "Accueil",
  // Edito
  "/edito" = "Edito",
  "/edito/actualites" = "Actualités",
  "/edito/evenements" = "Événements",
  "/edito/astuces" = "Astuces",
  "/edito/libre" = "CONTENU LIBRE",
  "/edito/quiz" = "Quiz",
  "/edito/chiffres-cles" = "Chiffres clés",
  "/edito/thematiques" = "Thématiques",
  "/edito/type-contenu" = "Type de contenu",
  "/edito/accessibilite" = "Accessibilité",
  "/edito/conditions-generales" = "Conditions générales",
  "/edito/politique-cookies" = "Politique de cookies",
  "/edito/confidentialite" = "Confidentialité",
  "/edito/contact" = "Contact",
  // Services
  "/services" = "Services",
  "/services/points-collecte" = "Points de collecte",
  "/services/guide-tri" = "Guide du tri",
  "/services/jour-collecte" = "Jour de collecte",
  "/services/demandes" = "Demandes",
  "/services/yeswescan" = "YesWeScan",
  "/services/alertes" = "Alertes",
  // Personnalisation
  "/personnalisation" = "Personnalisation",
  "/personnalisation/couleurs" = "Couleurs, logo, lien",
  "/personnalisation/menu" = "Menu",
  "/personnalisation/accueil" = "Page d'accueil",
  "/personnalisation/footer" = "Footer",
  "/personnalisation/types-conteneurs" = "Types de conteneurs",
  "/personnalisation/types-apport" = "Types de lieux d'apport",
  // SectorsAndUsers
  "/secteurs-usagers" = "Secteurs et Usagers",
  "/secteurs-usagers/secteurs" = "Secteurs",
  "/secteurs-usagers/usagers" = "Usagers",
  // Administration
  "/administration" = "Gestion",
  "/administration/informations" = "Informations",
  "/administration/territoire" = "Territoire",
  "/administration/activation-services" = "Activation des services",
  "/administration/utilisateurs" = "Utilisateurs",
  // Bin
  "/corbeille" = "Corbeille",
}

export interface INavigationContext {
  currentPage: keyof typeof ENavigationPages;
  setCurrentPage: (pageName: keyof typeof ENavigationPages) => void;
}

export const NavigationContext = React.createContext<INavigationContext>({
  currentPage: "/",
  setCurrentPage: () => null,
});

export const useNavigation = () => useContext(NavigationContext);
