import { GetSearchEngineTabDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetSearchEngineTabDocument,
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
                      searchEngineBlock: {
                        data: {
                          id: "1",
                          attributes: {
                            titleContent: "Titre modifié",
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
