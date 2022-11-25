import { GetQuizAndTipsBlockDocument } from "../../../../graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetQuizAndTipsBlockDocument,
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
                      quizAndTipsBlock: {
                        data: {
                          id: "1",
                          attributes: {
                            title: "Titre modifié",
                            displayBlock: false,
                            displayQuiz: false,
                            quiz: {
                              data: {
                                id: "2",
                                attributes: {
                                  title: "Nom du quiz",
                                  publishedAt: "2022-11-20T02:34:14.535Z",
                                },
                              },
                            },
                            displayTips: false,
                            tips: {
                              data: [],
                            },
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
                    __typename: "ComponentMsdEditorial",
                    id: "4",
                    editorialServices: {
                      data: [
                        {
                          attributes: {
                            subServiceInstance: [
                              {
                                __typename: "ComponentEditoQuizzesSubService",
                                isActivated: true,
                                quizzes: {
                                  data: [
                                    {
                                      id: "2",
                                      attributes: {
                                        title: "Nom du quiz",
                                        publishedAt: "2022-11-20T02:34:14.535Z",
                                      },
                                    },
                                    {
                                      id: "1",
                                      attributes: {
                                        title: "truc",
                                        publishedAt: "2022-11-18T10:16:08.936Z",
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
                            subServiceInstance: [
                              {
                                __typename: "ComponentEditoTipsSubService",
                                isActivated: true,
                                tips: {
                                  data: [
                                    {
                                      id: "5",
                                      attributes: {
                                        title: "nah",
                                        publishedAt: "2022-11-19T00:14:37.403Z",
                                      },
                                    },
                                    {
                                      id: "2",
                                      attributes: {
                                        title: "Titre de l'astuce 1",
                                        publishedAt: "2022-11-19T00:14:08.232Z",
                                      },
                                    },
                                    {
                                      id: "1",
                                      attributes: {
                                        title: "Titre de l'astuce 2",
                                        publishedAt: "2022-11-18T10:17:11.158Z",
                                      },
                                    },
                                    {
                                      id: "3",
                                      attributes: {
                                        title: "Titre de l'astuce 3",
                                        publishedAt: "2022-11-19T00:14:20.490Z",
                                      },
                                    },
                                    {
                                      id: "4",
                                      attributes: {
                                        title: "Titre de l'astuce 4",
                                        publishedAt: "2022-11-19T00:14:30.273Z",
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

export const errorMockData = [
  {
    request: {
      query: GetQuizAndTipsBlockDocument,
      variables: {
        contractId: "1",
      },
    },
    error: new Error("An error occured"),
  },
];
