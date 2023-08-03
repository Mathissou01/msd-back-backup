import { GetTopContentBlockTabDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetTopContentBlockTabDocument,
      variables: {
        contractId: "0",
        audienceId: "",
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
                      topContentBlock: {
                        data: {
                          attributes: {
                            displayBlock: true,
                            titleContent: "Titre modifié",
                            hasTopContent: false,
                            topContent: {
                              data: {
                                id: "1",
                                attributes: {
                                  event: {
                                    data: {
                                      id: "1",
                                      attributes: {
                                        publishedDate:
                                          "2022-12-05T15:58:52.482Z",
                                        title: "event test",
                                      },
                                    },
                                  },
                                  news: {
                                    data: null,
                                  },
                                },
                              },
                            },
                            displayLastThreeContents: false,
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
        services: {
          data: [
            {
              attributes: {
                serviceInstance: [
                  {
                    editorialServices: {
                      data: [
                        {
                          attributes: {
                            isActivated: true,
                            subServiceInstance: [
                              {
                                __typename: "ComponentEditoNewsSubService",
                                id: "1",
                                news: {
                                  data: [
                                    {
                                      id: "1",
                                      attributes: {
                                        publishedDate:
                                          "2022-12-05T15:59:19.503Z",
                                        title: "news test",
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                        {
                          attributes: {
                            isActivated: true,
                            subServiceInstance: [
                              {
                                __typename: "ComponentEditoEventSubService",
                                id: "1",
                                events: {
                                  data: [
                                    {
                                      id: "1",
                                      attributes: {
                                        publishedDate:
                                          "2022-12-05T15:58:52.482Z",
                                        title: "event test",
                                      },
                                    },
                                  ],
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  },
];
