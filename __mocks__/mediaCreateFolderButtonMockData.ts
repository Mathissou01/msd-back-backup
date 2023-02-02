import { GetAllFoldersHierarchyDocument } from "../src/graphql/codegen/generated-types";

export const defaultMockData = [
  {
    request: {
      query: GetAllFoldersHierarchyDocument,
      variables: {
        path: "/1",
        pathId: "6",
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
            id: "6",
            name: "contract2",
            path: "/1/6",
            pathId: "6",
          },
          {
            id: "32",
            name: "hello",
            path: "/1/26",
            pathId: "26",
          },
          {
            id: "16",
            name: "dede",
            path: "/1/6/12",
            pathId: "12",
          },
          {
            id: "37",
            name: "xfgcfhf,h,ut",
            path: "/1/26/29",
            pathId: "29",
          },
          {
            id: "41",
            name: "lulu",
            path: "/1/6/33",
            pathId: "33",
          },
          {
            id: "38",
            name: "cghcg,h,cgh",
            path: "/1/26/29/30",
            pathId: "30",
          },
          {
            id: "42",
            name: "dedechildren2",
            path: "/1/6/12/34",
            pathId: "34",
          },
          {
            id: "43",
            name: "dedechildren1",
            path: "/1/6/12/35",
            pathId: "35",
          },
          {
            id: "45",
            name: "dedechildren3",
            path: "/1/6/12/37",
            pathId: "37",
          },
          {
            id: "39",
            name: "fgnxfchgf,c",
            path: "/1/26/29/30/31",
            pathId: "31",
          },
          {
            id: "44",
            name: "dedechildrenchildren1",
            path: "/1/6/12/35/36",
            pathId: "36",
          },
        ],
      },
    },
  },
];
