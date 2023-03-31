import React, { useContext } from "react";

export enum ENavigationPages {
  "/" = "Accueil",
  /* Edito */
  "/edito/" = "Edito",
  "/edito/actualites" = "Actualités",
  "/edito/evenements" = "Événements",
  "/edito/astuces" = "Astuces",
  "/edito/contenu-libre/[freeContentSubServiceId]" = "",
  "/edito/quiz" = "Quiz",
  "/edito/chiffres-cles" = "Chiffres clés",
  "/edito/bibliotheque-de-medias" = "Bibliothèque de médias",
  "/edito/thematiques" = "Thématiques",
  "/edito/type-contenu" = "Type de contenu",
  "/edito/accessibilite" = "Accessibilité",
  "/edito/conditions-generales" = "Conditions générales",
  "/edito/politique-cookies" = "Politique de cookies",
  "/edito/confidentialite" = "Confidentialité",
  "/edito/contact" = "Contact",
  /* Services */
  "/services/" = "Services",
  "/services/points-collecte" = "Points de collecte",
  "/services/guide-tri" = "Guide du tri",
  "/services/jour-collecte" = "Jour de collecte",
  "/services/demandes" = "Demandes",
  "/services/yeswescan" = "YesWeScan",
  "/services/alertes" = "Alertes",
  /* Personnalisation */
  "/personnalisation/" = "Personnalisation",
  "/personnalisation/couleurs" = "Couleurs, logo, lien",
  "/personnalisation/menu" = "Menu",
  "/personnalisation/accueil" = "Page d'accueil",
  "/personnalisation/footer" = "Footer",
  "/personnalisation/types-conteneurs" = "Types de conteneurs",
  "/personnalisation/types-apport" = "Types de lieux d'apport",
  /* SectorsAndUsers */
  "/secteurs-usagers/" = "Secteurs et Usagers",
  "/secteurs-usagers/secteurs" = "Secteurs",
  "/secteurs-usagers/usagers" = "Usagers",
  /* gestion */
  "/gestion/" = "Gestion",
  "/gestion/informations" = "Informations",
  "/gestion/territoire" = "Territoire",
  "/gestion/activation-services" = "Activation des services",
  "/gestion/utilisateurs" = "Utilisateurs",
  /* Bin */
  "/corbeille/" = "Corbeille",
}

export interface INavigationContext {
  currentRoot: string | null;
  setCurrentRoot: (root: string) => void;
  currentPage: keyof typeof ENavigationPages | string;
  setCurrentPage: (page: keyof typeof ENavigationPages | string) => void;
}

export const NavigationContext = React.createContext<INavigationContext>({
  currentRoot: null,
  setCurrentRoot: () => null,
  currentPage: "/",
  setCurrentPage: () => null,
});

export const useNavigation = () => useContext(NavigationContext);

export function isNavigationPath(
  path: string,
): path is keyof typeof ENavigationPages {
  return Object.keys(ENavigationPages).includes(path);
}

export function containsNavigationPath(path: string) {
  return Object.keys(ENavigationPages).filter((page) => path.includes(page));
}

export function matchLongestNavigationPath(
  routerPath: string,
  realPath: string,
) {
  const matches = Object.keys(ENavigationPages).filter((page) => {
    return routerPath.includes(page);
  });
  let longestLength = 0;
  let longestValue = null;
  for (let i = 0; i < matches.length; i++) {
    const value = matches[i];
    if (value.length > longestLength) {
      longestLength = value.length;
      longestValue = value;
    }
  }

  let realPathValue = longestValue;
  if (longestValue && longestValue !== realPath) {
    // count how many slashes are in the route, truncate the real path to the same number of slashes
    const slashes = [...longestValue.matchAll(new RegExp("/", "gi"))].map(
      (a) => a.index,
    );
    const realSlashes = [...`${realPath}/`.matchAll(new RegExp("/", "gi"))].map(
      (a) => a.index,
    );
    realPathValue = realPath.slice(0, realSlashes[slashes.length]);
  }

  return { routerPath: longestValue, realPath: realPathValue };
}
