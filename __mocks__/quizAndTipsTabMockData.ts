import { GetQuizAndTipsBlockTabDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetQuizAndTipsBlockTabDocument,
      variables: {
        contractId: "0",
        status: "published",
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
                      quizAndTipsBlocks: {
                        data: [
                          {
                            id: "1",
                            attributes: {
                              titleContent: "Titre modifié",
                              displayBlock: true,
                              displayQuiz: false,
                              quiz: {
                                data: {
                                  id: "2",
                                  attributes: {
                                    title: "Nom du quiz",
                                    status: "published",
                                    publishedDate: "2022-11-20T02:34:14.535Z",
                                  },
                                },
                              },
                              displayTips: true,
                              tips: {
                                data: [
                                  {
                                    id: "5",
                                    attributes: {
                                      title:
                                        "Pas besoin de nettoyer vos pots de yaourts avant de les jeter",
                                      status: "published",
                                      publishedDate: "2022-11-19T00:14:37.403Z",
                                      image: {
                                        data: null,
                                      },
                                    },
                                  },
                                  {
                                    id: "3",
                                    attributes: {
                                      title: "Titre de l'astuce 3",
                                      status: "published",
                                      publishedDate: "2022-11-19T00:14:20.490Z",
                                      image: {
                                        data: null,
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        quizSubServices: {
          data: [
            {
              attributes: {
                quizzes: {
                  data: [
                    {
                      id: "2",
                      attributes: {
                        title: "Nom du quiz",
                        status: "published",
                        publishedDate: "2022-11-20T02:34:14.535Z",
                      },
                    },
                    {
                      id: "1",
                      attributes: {
                        title: "truc",
                        status: "published",
                        publishedDate: "2022-11-18T10:16:08.936Z",
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
        tipSubServices: {
          data: [
            {
              attributes: {
                tips: {
                  data: [
                    {
                      id: "2",
                      attributes: {
                        title:
                          "Découper vos peaux de bananes avant de les jeter dans votre compost.",
                        status: "published",
                        publishedDate: "2022-11-19T00:14:08.232Z",
                        image: {
                          data: null,
                        },
                      },
                    },
                    {
                      id: "5",
                      attributes: {
                        title:
                          "Pas besoin de nettoyer vos pots de yaourts avant de les jeter",
                        status: "published",
                        publishedDate: "2022-11-19T00:14:37.403Z",
                        image: {
                          data: null,
                        },
                      },
                    },
                    {
                      id: "1",
                      attributes: {
                        title:
                          "Remplacez vos sacs en plastique par des sacs réutilisables, un caddie ou des paniers.",
                        status: "published",
                        publishedDate: "2022-11-18T10:17:11.158Z",
                        image: {
                          data: null,
                        },
                      },
                    },
                    {
                      id: "3",
                      attributes: {
                        title: "Titre de l'astuce 3",
                        status: "published",
                        publishedDate: "2022-11-19T00:14:20.490Z",
                        image: {
                          data: null,
                        },
                      },
                    },
                    {
                      id: "4",
                      attributes: {
                        title: "Titre de l'astuce 4",
                        status: "published",
                        publishedDate: "2022-11-19T00:14:30.273Z",
                        image: {
                          data: null,
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  },
];
