import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/memoTriTabMockData";
import MemoTriTab from "./MemoTriTab";

jest.mock("../../../graphql/client", () => null);
describe("MemoTriTab", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData}>
        <MemoTriTab />
      </MockedProvider>,
    );

    expect(await container).toMatchSnapshot();
    expect(await screen.findByText("Nom du mémotri *")).toBeInTheDocument();
    expect(
      await screen.findByText("20 caractères maximum"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
