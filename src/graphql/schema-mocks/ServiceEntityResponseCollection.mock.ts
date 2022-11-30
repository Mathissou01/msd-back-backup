import { ComponentMsdEditorialMock } from "./ComponentMsdEditorial.mock";
import { ComponentMsdRecyclingMock } from "./ComponentMsdRecycling.mock";

export const ServiceEntityResponseCollectionMock = {
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
    {
      attributes: {
        isActivated: true,
        startDate: () => "2022-01-01",
        endDate: () => "2025-01-01",
        serviceInstance: [...new Array(ComponentMsdRecyclingMock)],
      },
    },
  ],
};
