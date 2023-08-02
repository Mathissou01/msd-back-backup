import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../../../__mocks__/welcomeAndSearchEngineTabMockData";
import WelcomeAndSearchEngineTab from "./WelcomeAndSearchEngineTab";

// Prevent loading of client inside MockedProvider, otherwise leads to "unexpected token" error
jest.mock("../../../../../graphql/client", () => null);

describe("WelcomeAndSearchEngineTab", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData} addTypename={false}>
        <WelcomeAndSearchEngineTab />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
    expect(
      await screen.findByDisplayValue("Titre modifié"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
