import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../../../__mocks__/quizAndTipsTabMockData";
import QuizAndTipsTab from "./QuizAndTipsTab";

// Prevent loading of client inside MockedProvider, otherwise leads to "unexpected token" error
jest.mock("../../../../../graphql/client", () => null);

describe("QuizAndTipsTab", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData} addTypename={false}>
        <QuizAndTipsTab />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
    expect(await screen.findByText("Nom du quiz")).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("Titre modifié"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
