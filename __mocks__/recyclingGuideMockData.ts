import { GetRecyclingBlockByContractIdDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetRecyclingBlockByContractIdDocument,
      variables: {
        contractId: "1",
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
