import { GetFilesPaginationByFolderIdDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetFilesPaginationByFolderIdDocument,
      filters: {
        folder: {
          id: {
            eq: 2,
          },
        },
      },
      pagination: {
        page: 1,
        pageSize: 10,
      },
      sort: "createdAt:desc",
    },
    result: {
      data: {
        uploadFiles: {
          data: [
            {
              id: "124",
              attributes: {
                name: "La Bruja.jpeg",
                mime: "image/jpeg",
                size: 124.35,
                width: 1280,
                height: 853,
                createdAt: "2023-01-26T10:34:26.058Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/La%20Bruja.jpeg",
                ext: ".jpeg",
              },
            },
            {
              id: "122",
              attributes: {
                name: "Banana Mama Rooftop & Kitchen 5.jpeg",
                mime: "image/jpeg",
                size: 68.84,
                width: 960,
                height: 960,
                createdAt: "2023-01-26T10:30:22.701Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/Banana%20Mama%20Rooftop%20%26%20Kitchen%205.jpeg",
                ext: ".jpeg",
              },
            },
            {
              id: "121",
              attributes: {
                name: "Sichuan Hot Pot.jpeg",
                mime: "image/jpeg",
                size: 2233.13,
                width: 6962,
                height: 4615,
                createdAt: "2023-01-18T17:39:30.518Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/Sichuan%20Hot%20Pot.jpeg",
                ext: ".jpeg",
              },
            },
            {
              id: "120",
              attributes: {
                name: "mahbod-akhzami-kg40JrEsCvY-unsplash.jpg",
                mime: "image/jpeg",
                size: 1788.48,
                width: 6000,
                height: 4000,
                createdAt: "2023-01-18T17:39:29.900Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/mahbod-akhzami-kg40JrEsCvY-unsplash.jpg",
                ext: ".jpg",
              },
            },
            {
              id: "119",
              attributes: {
                name: "Paella in Valencia.jpeg",
                mime: "image/jpeg",
                size: 1026.93,
                width: 3851,
                height: 2528,
                createdAt: "2023-01-18T17:39:29.720Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/Paella%20in%20Valencia.jpeg",
                ext: ".jpeg",
              },
            },
            {
              id: "118",
              attributes: {
                name: "Rusconi's American Kitchen 3.jpeg",
                mime: "image/jpeg",
                size: 209.81,
                width: 1999,
                height: 1333,
                createdAt: "2023-01-18T17:39:29.502Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/Rusconi%27s%20American%20Kitchen%203.jpeg",
                ext: ".jpeg",
              },
            },
            {
              id: "117",
              attributes: {
                name: "Quince 5.jpeg",
                mime: "image/jpeg",
                size: 197.32,
                width: 2000,
                height: 1500,
                createdAt: "2023-01-18T17:39:29.310Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/Quince%205.jpeg",
                ext: ".jpeg",
              },
            },
            {
              id: "116",
              attributes: {
                name: "Rusconi's American Kitchen 2.jpeg",
                mime: "image/jpeg",
                size: 72.49,
                width: 1000,
                height: 1500,
                createdAt: "2023-01-18T17:39:29.221Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/Rusconi%27s%20American%20Kitchen%202.jpeg",
                ext: ".jpeg",
              },
            },
            {
              id: "115",
              attributes: {
                name: "Pur' - Jean-François Rouquette 3.jpeg",
                mime: "image/jpeg",
                size: 63.2,
                width: 1280,
                height: 853,
                createdAt: "2023-01-18T17:39:29.039Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/Pur%27%20-%20Jean-Fran%C3%A7ois%20Rouquette%203.jpeg",
                ext: ".jpeg",
              },
            },
            {
              id: "114",
              attributes: {
                name: "muneeb-muhamed-kPXT9HA4LOk-unsplash.jpg",
                mime: "image/jpeg",
                size: 516.64,
                width: 3456,
                height: 4608,
                createdAt: "2023-01-18T17:39:28.922Z",
                url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-sdial/muneeb-muhamed-kPXT9HA4LOk-unsplash.jpg",
                ext: ".jpg",
              },
            },
          ],
          meta: {
            pagination: {
              total: 122,
              pageSize: 10,
              pageCount: 13,
              page: 1,
            },
          },
        },
      },
    },
  },
];
