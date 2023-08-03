import { GetEditoBlockTabDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetEditoBlockTabDocument,
      variables: {
        contractId: "0",
        audienceId: "",
      },
    },
    result: {
      data: {
        getEditoBlockDTO: {
          id: "2",
          displayBlock: true,
          titleContent: "Titre modifié",
          editoContents: [
            {
              id: "7",
              contentType: "tip",
              typeName: "Astuces",
              attributes: {
                title:
                  "Remplacez vos sacs en plastique par des sacs réutilisables, un caddie ou des paniers.",
                status: "published",
                publishedDate: "2022-11-18T10:17:11.158Z",
              },
            },
            {
              id: "14",
              contentType: "freeContent",
              typeName: "Valoriser mes déchets",
              attributes: {
                title: "freecontent test",
                status: "published",
                publishedDate: "2022-12-05T15:59:38.467Z",
              },
            },
            {
              id: "2",
              contentType: "quiz",
              typeName: "Quiz",
              attributes: {
                title: "Nom du quiz",
                status: "published",
                publishedDate: "2022-11-20T02:34:14.535Z",
              },
            },
          ],
        },
        getEditoContentDTOs: [
          {
            id: "1",
            contentType: "tip",
            typeName: "Astuces",
            attributes: {
              title:
                "Découper vos peaux de bananes avant de les jeter dans votre compost.",
              status: "published",
              publishedDate: "2022-11-19T00:14:08.232Z",
            },
          },
          {
            id: "2",
            contentType: "quiz",
            typeName: "Quiz",
            attributes: {
              title: "Nom du quiz",
              status: "published",
              publishedDate: "2022-11-20T02:34:14.535Z",
            },
          },
          {
            id: "7",
            contentType: "tip",
            typeName: "Astuces",
            attributes: {
              title:
                "Remplacez vos sacs en plastique par des sacs réutilisables, un caddie ou des paniers.",
              status: "published",
              publishedDate: "2022-11-18T10:17:11.158Z",
            },
          },
          {
            id: "8",
            contentType: "tip",
            typeName: "Astuces",
            attributes: {
              title: "Titre de l'astuce 3",
              status: "published",
              publishedDate: "2022-11-19T00:14:20.490Z",
            },
          },
          {
            id: "9",
            contentType: "tip",
            typeName: "Astuces",
            attributes: {
              title: "Titre de l'astuce 4",
              status: "published",
              publishedDate: "2022-11-19T00:14:30.273Z",
            },
          },
          {
            id: "11",
            contentType: "quiz",
            typeName: "Quiz",
            attributes: {
              title: "truc",
              status: "published",
              publishedDate: "2022-11-18T10:16:08.936Z",
            },
          },
          {
            id: "12",
            contentType: "news",
            typeName: "Actualités",
            attributes: {
              title: "news test",
              status: "published",
              publishedDate: "2022-12-05T15:59:19.503Z",
            },
          },
          {
            id: "13",
            contentType: "event",
            typeName: "Evénement",
            attributes: {
              title: "event test",
              status: "published",
              publishedDate: "2022-12-05T15:58:52.482Z",
            },
          },
          {
            id: "14",
            contentType: "freeContent",
            typeName: "Valoriser mes déchets",
            attributes: {
              title: "freecontent test",
              status: "published",
              publishedDate: "2022-12-05T15:59:38.467Z",
            },
          },
        ],
      },
    },
  },
];
