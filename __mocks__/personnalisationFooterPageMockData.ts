import { GetFooterPageDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetFooterPageDocument,
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
                footer: {
                  data: {
                    id: "1",
                    attributes: {
                      accessibilityLevel: "partially_conform",
                      cguSubService: {
                        data: {
                          id: "1",
                          attributes: {
                            link: "https://google.com",
                          },
                        },
                      },
                      accessibilitySubService: {
                        data: {
                          id: "1",
                          attributes: {
                            link: "https://google.com",
                          },
                        },
                      },
                      confidentialitySubService: {
                        data: {
                          id: "1",
                          attributes: {
                            link: "https://google.com",
                          },
                        },
                      },
                      cookiesSubService: {
                        data: {
                          id: "1",
                          attributes: {
                            link: "https://google.com",
                          },
                        },
                      },
                      contactUsSubService: {
                        data: {
                          id: "1",
                          attributes: {
                            label: "Contactez-nous",
                            link: "https://google.com",
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
