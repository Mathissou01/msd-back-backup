import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/memoTriTabMockData";
import MemoTriTab from "./MemoTriTab";
import { mockData } from "../../../../__mocks__/contractContextMockData";
import { ContractContext } from "../../../hooks/useContract";

jest.mock("../../../graphql/client", () => null);

describe("MemoTriTab", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <ContractContext.Provider
        value={{
          contract: mockData,
          setContract: () => null,
          contractId: "1",
          setContractId: () => null,
        }}
      >
        <MockedProvider mocks={defaultMockData}>
          <MemoTriTab />
        </MockedProvider>
      </ContractContext.Provider>,
    );

    expect(await container).toMatchSnapshot();
    expect(await screen.findByText("Nom du mémotri *")).toBeInTheDocument();
    expect(
      await screen.findByText("20 caractères maximum"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
