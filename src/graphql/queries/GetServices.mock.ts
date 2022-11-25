export const ComponentEditoTipsSubServiceMock = {
  __typename: "ComponentEditoTipsSubService",
  isActivated: true,
};

export const ComponentEditoQuizzesSubServiceMock = {
  __typename: "ComponentEditoQuizzesSubService",
  isActivated: true,
};

export const ComponentMsdEditorialMock = {
  __typename: "ComponentMsdEditorial",
  id: "4",
  editorialServices: {
    data: [
      {
        attributes: {
          subServiceInstance: [
            ...new Array(ComponentEditoQuizzesSubServiceMock),
          ],
        },
      },
      {
        attributes: {
          subServiceInstance: [...new Array(ComponentEditoTipsSubServiceMock)],
        },
      },
    ],
  },
};

export const GetServicesMock = {
  __typename: "ServiceEntityResponseCollection",
  data: [
    {
      attributes: {
        isActivated: true,
        startDate: () => "2022-01-01",
        endDate: () => "2025-01-01",
        serviceInstance: [...new Array(ComponentMsdEditorialMock)],
      },
    },
  ],
};
