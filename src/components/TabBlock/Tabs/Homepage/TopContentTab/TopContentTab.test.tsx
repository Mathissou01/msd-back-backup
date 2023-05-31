import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../../../__mocks__/topContentTabMockData";
import TopContentTab from "./TopContentTab";

describe("TopContentTab", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData} addTypename={false}>
        <TopContentTab />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
    // expect(await screen.findByText("event test")).toBeInTheDocument();
    // expect(
    //   await screen.findByDisplayValue("Titre modifié"),
    // ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
