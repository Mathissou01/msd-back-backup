import { GetRecyclingGuideBlockByContractIdDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetRecyclingGuideBlockByContractIdDocument,
      variables: {
        contractId: "0",
      },
    },
    result: {
      data: {
        contractCustomizations: {
          data: [
            {
              attributes: {
                homepage: {
                  data: {
                    attributes: {
                      recyclingGuideBlock: {
                        data: {
                          id: "1",
                          attributes: {
                            titleContent: "Titre modifié",
                            subtitleContent:
                              "Trouver les consignes de tri dans ma ville",
                            recyclingGuideDisplayContent:
                              "Lampe, écran, épluchure",
                            tags: [],
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
