import { GetServicesBlockTabDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetServicesBlockTabDocument,
      variables: {
        contractId: "1",
      },
    },
    result: {
      data: {
        contractCustomizations: {
          data: [
            {
              id: "1",
              attributes: {
                homepage: {
                  data: {
                    attributes: {
                      servicesBlock: {
                        data: {
                          id: "1",
                          attributes: {
                            titleContent: "Les services de ma ville",
                            serviceLinks: [
                              {
                                name: "Carte",
                                isDisplayed: true,
                                picto: {
                                  data: null,
                                },
                              },
                              {
                                name: "Collecte à mon adresse",
                                isDisplayed: true,
                                picto: {
                                  data: null,
                                },
                              },
                              {
                                name: "Guide du tri",
                                isDisplayed: true,
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
                                isDisplayed: true,
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
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
];
