import { GetContractMenuByContractIdDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetContractMenuByContractIdDocument,
      variables: {
        contractId: "0",
      },
    },
    result: {
      data: {
        contract: {
          data: {
            attributes: {
              contractMenu: {
                data: {
                  id: "3",
                  attributes: {
                    serviceLinks: [
                      {
                        name: "Carte",
                        isDisplayed: true,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: "Collecte à mon adresse !",
                        isDisplayed: true,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: "Guide du tri",
                        isDisplayed: false,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: "Faire une demande",
                        isDisplayed: true,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: "Réduire mes déchets",
                        isDisplayed: false,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: "Valoriser mes déchets",
                        isDisplayed: true,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: null,
                        isDisplayed: false,
                        picto: {
                          data: null,
                        },
                        externalLink: null,
                      },
                      {
                        name: null,
                        isDisplayed: false,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: null,
                        isDisplayed: false,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: null,
                        isDisplayed: false,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: null,
                        isDisplayed: false,
                        picto: {
                          data: null,
                        },
                      },
                      {
                        name: null,
                        isDisplayed: false,
                        picto: {
                          data: null,
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
];
