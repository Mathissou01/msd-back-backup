import { GetAudiencesByContractIdDocument } from "../src/graphql/codegen/generated-types";

export const getNoAudienceMockedData = [
  {
    request: {
      query: GetAudiencesByContractIdDocument,
      variables: {
        filters: {
          contract: {
            id: {
              eq: undefined,
            },
          },
          isActive: {
            eq: true,
          },
        },
      },
    },
    result: {
      data: {
        audiences: {
          data: [],
        },
      },
    },
  },
];

export const getSingleAudienceMockedData = [
  {
    request: {
      query: GetAudiencesByContractIdDocument,
      variables: {
        filters: {
          contract: {
            id: {
              eq: undefined,
            },
          },
          isActive: {
            eq: true,
          },
        },
      },
    },
    result: {
      data: {
        audiences: {
          data: [
            {
              id: 1,
              attributes: {
                isActive: true,
                type: "Particuliers",
                __typename: "Audience",
              },
            },
          ],
        },
      },
    },
  },
];

export const getTwoAudiencesMockedData = [
  {
    request: {
      query: GetAudiencesByContractIdDocument,
      variables: {
        filters: {
          contract: {
            id: {
              eq: undefined,
            },
          },
          isActive: {
            eq: true,
          },
        },
      },
    },
    result: {
      data: {
        audiences: {
          data: [
            {
              id: 1,
              attributes: {
                isActive: true,
                type: "Particuliers",
                __typename: "Audience",
              },
            },
            {
              id: 2,
              attributes: {
                isActive: true,
                type: "Collectifs",
                __typename: "Audience",
              },
            },
          ],
        },
      },
    },
  },
];

export const getAllAudiencesMockedData = [
  {
    request: {
      query: GetAudiencesByContractIdDocument,
      variables: {
        filters: {
          contract: {
            id: {
              eq: undefined,
            },
          },
          isActive: {
            eq: true,
          },
        },
      },
    },
    result: {
      data: {
        audiences: {
          data: [
            {
              id: 1,
              attributes: {
                isActive: true,
                type: "Particuliers",
                __typename: "Audience",
              },
            },
            {
              id: 2,
              attributes: {
                isActive: true,
                type: "Collectifs",
                __typename: "Audience",
              },
            },
            {
              id: 3,
              attributes: {
                isActive: true,
                type: "Professionnels",
                __typename: "Audience",
              },
            },
          ],
        },
      },
    },
  },
];
