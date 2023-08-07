import { GetWelcomeMessageAndSearchEngineBlockTabDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetWelcomeMessageAndSearchEngineBlockTabDocument,
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
                      searchEngineBlock: {
                        data: {
                          id: "1",
                          attributes: {
                            titleContent: "Titre modifié",
                          },
                        },
                      },
                      welcomeMessageBlock: {
                        data: {
                          id: "1",
                          attributes: {
                            showBlock: true,
                            subtitle: "Subtitle",
                            title: "Title",
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
