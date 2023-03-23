import { GetAllFoldersHierarchyDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
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
