import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/recyclingGuideTabMockData";
import RecyclingGuideTab from "./RecyclingGuideTab";

describe("RecyclingGuideTab", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData} addTypename={false}>
        <RecyclingGuideTab />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
    expect(await screen.findByText("Sous titre *")).toBeInTheDocument();
    expect(
      await screen.findByText("30 caractères maximum"),
    ).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("Titre modifié"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
