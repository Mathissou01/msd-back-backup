import { GetFooterPageDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetFooterPageDocument,
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
                footer: {
                  data: {
                    id: "1",
                    attributes: {
                      accessibilityLevel: "partially_conform",
                      legalContent: {
                        data: {
                          id: "1",
                          attributes: {
                            GCULink: "https://google.com",
                            accessibilityLink: "https://google.com",
                            confidentiality: "https://google.com",
                            cookiesPolicy: "https://google.com",
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
        contactUsServices: {
          data: [
            {
              id: "1",
              attributes: {
                isActivated: true,
                label: "Contactez-nous",
                link: "https://google.com",
              },
            },
          ],
        },
      },
    },
  },
];
