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
  "/services/carte" = "Carte",
  "/services/guide-tri" = "Guide du tri",
  "/services/mon-compteur-dechets" = "Mon compteur dechets",
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
  "/gestion/flux" = "Activation des flux",
  "/gestion/utilisateurs" = "Utilisateurs",
  "/gestion/services" = "Activation des Services",
  /* Bin */
  "/corbeille/" = "Corbeille",
}

export const NavigationEntities = [
  "NewEntity",
  "TipEntity",
  "EventEntity",
  "QuizEntity",
  "FreeContentEntity",
  "ContactUsEntity",
  "WasteFormEntity",
];
export type TNavigationEntities = (typeof NavigationEntities)[number];

export function isNavigationEntity(
  typename: string,
): typename is TNavigationEntities {
  return NavigationEntities.includes(typename);
}

export function isTypename<Typename>(
  entity: unknown,
  typename: string,
): entity is Typename {
  return (
    typeof entity === "object" &&
    !!entity &&
    "__typename" in entity &&
    entity.__typename === typename
  );
}

interface INavigationPathMap {
  path: string;
}

export const navigationPathMap: Record<
  TNavigationEntities,
  INavigationPathMap
> = {
  NewEntity: {
    path: "/edito/actualites",
  },
  TipEntity: {
    path: "/edito/astuces",
  },
  EventEntity: {
    path: "/edito/evenements",
  },
  QuizEntity: {
    path: "/edito/quiz",
  },
  FreeContentEntity: {
    path: "/edito/contenu-libre/",
  },
  ContactUsEntity: {
    path: "/edito/contact",
  },
  WasteFormEntity: {
    path: "/services/guide-tri/fiche-dechet",
  },
};
