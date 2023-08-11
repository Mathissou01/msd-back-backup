import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../../../__mocks__/welcomeAndSearchEngineTabMockData";
import WelcomeAndSearchEngineTab from "./WelcomeAndSearchEngineTab";

jest.mock("../../../../../graphql/client", () => null);

const showBlockTestId = "form-checkbox";
const welcomeTitleValue = "Title";
const welcomeSubtitleValue = "Subtitle";
const searchEngineTitleValue = "Titre modifié";

describe("WelcomeAndSearchEngineTab", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData} addTypename={false}>
        <WelcomeAndSearchEngineTab />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
    expect(await screen.findByTestId(showBlockTestId)).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue(welcomeTitleValue),
    ).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue(welcomeSubtitleValue),
    ).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue(searchEngineTitleValue),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
