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
