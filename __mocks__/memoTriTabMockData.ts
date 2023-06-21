import {
  GetAllFoldersHierarchyDocument,
  GetRecyclingGuideServiceByIdDocument,
} from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetRecyclingGuideServiceByIdDocument,
      variables: {
        recyclingGuideServiceId: "1",
      },
    },
    result: {
      data: {
        recyclingGuideService: {
          data: {
            id: "1",
            attributes: {
              name: "Guide du tri",
              orderExtension: true,
              memoName: "Nom du Mémotri test",
              memoDesc: "desc",
              memoFile: {
                data: {
                  id: "197",
                  attributes: {
                    hash: "sample_4d68bee0d1",
                    mime: "application/pdf",
                    name: "sample.pdf",
                    provider: "azure-storage-blob",
                    size: 3.04,
                    url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-hamna/sample.pdf",
                    alternativeText: "sample.pdf",
                    ext: ".pdf",
                    height: null,
                    width: null,
                    createdAt: "2023-05-23T16:20:29.293Z",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    request: {
      query: GetAllFoldersHierarchyDocument,
      variables: {
        path: "/1/2",
      },
    },
    result: {
      data: {
        getAllFoldersHierarchy: [
          {
            id: "1",
            name: "Contracts",
            path: "/1",
            pathId: "1",
          },
          {
            id: "2",
            name: "Guinea",
            path: "/1/2",
            pathId: "2",
          },
        ],
      },
    },
  },
  {
    request: {
      query: GetAllFoldersHierarchyDocument,
      variables: {
        path: "/1/2",
      },
    },
    result: {
      data: {
        getAllFoldersHierarchy: [
          {
            id: "1",
            name: "Contracts",
            path: "/1",
            pathId: "1",
          },
          {
            id: "2",
            name: "Guinea",
            path: "/1/2",
            pathId: "2",
          },
        ],
      },
    },
  },
];
