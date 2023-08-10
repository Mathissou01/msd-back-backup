import {
  GetAllFoldersHierarchyDocument,
  GetAudiencesByContractIdDocument,
  GetTagsByContractIdDocument,
} from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetTagsByContractIdDocument,
      variables: {
        contractId: "1",
      },
    },
    result: {
      data: {
        tags: {
          data: [
            {
              id: "1",
              attributes: {
                name: "Biodéchets",
              },
            },
            {
              id: "2",
              attributes: {
                name: "Biodiversité",
              },
            },
            {
              id: "3",
              attributes: {
                name: "Gaspillage alimentaire",
              },
            },
            {
              id: "4",
              attributes: {
                name: "Réemploi",
              },
            },
            {
              id: "5",
              attributes: {
                name: "Compostage",
              },
            },
            {
              id: "6",
              attributes: {
                name: "Réduction des déchets",
              },
            },
            {
              id: "7",
              attributes: {
                name: "Eco responsable",
              },
            },
            {
              id: "8",
              attributes: {
                name: "Recycler ses déchets",
              },
            },
            {
              id: "9",
              attributes: {
                name: "Zéro déchet",
              },
            },
            {
              id: "10",
              attributes: {
                name: "Evénement",
              },
            },
            {
              id: "11",
              attributes: {
                name: "Services à domicile",
              },
            },
            {
              id: "12",
              attributes: {
                name: "Dons",
              },
            },
            {
              id: "13",
              attributes: {
                name: "Réglementation",
              },
            },
            {
              id: "14",
              attributes: {
                name: "Prise de RDV",
              },
            },
            {
              id: "15",
              attributes: {
                name: "Produits électriques et électroniques",
              },
            },
            {
              id: "16",
              attributes: {
                name: "Déchets Alimentaires",
              },
            },
            {
              id: "17",
              attributes: {
                name: "Déchets Verts",
              },
            },
            {
              id: "18",
              attributes: {
                name: "Bois",
              },
            },
            {
              id: "19",
              attributes: {
                name: "Emballages cartons",
              },
            },
            {
              id: "20",
              attributes: {
                name: "Textiles",
              },
            },
            {
              id: "21",
              attributes: {
                name: "Produits Médicaux",
              },
            },
            {
              id: "22",
              attributes: {
                name: "Emballages Plastiques",
              },
            },
            {
              id: "23",
              attributes: {
                name: "Emballages Métals",
              },
            },
            {
              id: "24",
              attributes: {
                name: "Emballages en polystyrene",
              },
            },
            {
              id: "25",
              attributes: {
                name: "Emballages en verre",
              },
            },
            {
              id: "26",
              attributes: {
                name: "Loisirs et jeux",
              },
            },
            {
              id: "27",
              attributes: {
                name: "Materiaux de Construction",
              },
            },
            {
              id: "28",
              attributes: {
                name: "Mobilier",
              },
            },
            {
              id: "29",
              attributes: {
                name: "Papier",
              },
            },
            {
              id: "30",
              attributes: {
                name: "Produits automobile",
              },
            },
            {
              id: "31",
              attributes: {
                name: "Produits dangereux",
              },
            },
            {
              id: "32",
              attributes: {
                name: "Produits d'hygiène et beauté",
              },
            },
            {
              id: "33",
              attributes: {
                name: "Autres produits",
              },
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GetAllFoldersHierarchyDocument,
      variables: {
        path: "/1/2",
      },
    },
    result: {
      data: {
        getAllFoldersHierarchy: [
          {
            id: "1",
            name: "Contracts",
            path: "/1",
            pathId: "1",
          },
          {
            id: "2",
            name: "Guinea",
            path: "/1/2",
            pathId: "2",
          },
        ],
      },
    },
  },
  {
    request: {
      query: GetAudiencesByContractIdDocument,
      variables: {
        filters: { contract: { id: { eq: "1" } }, isActive: { eq: true } },
      },
    },
    result: {
      data: {
        audiences: {
          data: [
            {
              id: "1",
              attributes: {
                isActive: true,
                type: "Particuliers",
                __typename: "Audience",
              },
              __typename: "AudienceEntity",
            },
          ],
          __typename: "AudienceEntityResponseCollection",
        },
      },
    },
  },
];
