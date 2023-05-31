import {
  Enum_Contract_Clienttype,
  Enum_Contract_Contractstatus,
} from "../src/graphql/codegen/generated-types";

export const mockData = {
  id: "1",
  attributes: {
    clientName: "Grand test",
    clientType: "city" as Enum_Contract_Clienttype,
    contractStatus: "Initialisation" as Enum_Contract_Contractstatus,
    siret: 12345678910123,
    clear: 123456789,
    ccap: 123456789,
    isNonExclusive: false,
    isRVFrance: true,
    pathId: 2,
    logo: {
      data: null,
    },
    channelType: {
      data: {
        id: "1",
        attributes: {
          hasWebApp: false,
          hasWebSite: false,
        },
      },
    },
    clientContact: {
      data: {
        id: "1",
        attributes: {
          firstName: "test",
          lastName: "test",
          email: "test.test@mail.com",
          phoneNumber: "07 81 21 56 81",
        },
      },
    },
    contractCustomization: {
      data: {
        id: "1",
        attributes: {
          primaryColor: "#9BCD41",
          secondaryColor: "#FFC229",
          textContrast: "#030F40",
        },
      },
    },
    editorialService: {
      data: {
        id: "1",
        attributes: {
          eventSubService: {
            data: {
              id: "1",
              attributes: {
                name: "Evénement ",
                isActivated: true,
              },
            },
          },
          freeContentSubServices: {
            data: [
              {
                id: "1",
                attributes: {
                  name: "Editorial 1",
                  isActivated: true,
                },
              },
              {
                id: "2",
                attributes: {
                  name: "Editorial 2",
                  isActivated: true,
                },
              },
            ],
          },
          newsSubService: {
            data: {
              id: "1",
              attributes: {
                name: "Actualités",
                isActivated: true,
              },
            },
          },
          quizSubService: {
            data: {
              id: "1",
              attributes: {
                name: "Quiz",
                isActivated: true,
              },
            },
          },
          tipSubService: {
            data: {
              id: "1",
              attributes: {
                name: "Astuces",
                isActivated: true,
              },
            },
          },
        },
      },
    },
    recyclingGuideService: {
      data: {
        id: "1",
        attributes: {
          name: "Guide du tri",
          isActivated: false,
          memoName: "Memo Tri",
        },
      },
    },
    pickUpDayService: {
      data: {
        id: "1",
        attributes: {
          name: "Jour de collecte",
          isActivated: false,
        },
      },
    },
    dropOffMapService: {
      data: {
        id: "1",
        attributes: {
          name: "Points d'apports et carte",
          isActivated: false,
        },
      },
    },
    requestService: {
      data: {
        id: "1",
        attributes: {
          name: "Demande",
          isActivated: false,
        },
      },
    },
  },
};
