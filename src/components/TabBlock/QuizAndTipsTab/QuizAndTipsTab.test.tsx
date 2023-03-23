import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/quizAndTipsTabMockData";
import QuizAndTipsTab from "./QuizAndTipsTab";

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

  // it("should show error UI", async () => {
  //   const { container } = render(
  //     <MockedProvider mocks={errorMockData} addTypename={false}>
  //       <QuizAndTipsTab />
  //     </MockedProvider>,
  //   );
  //
  //   expect(await screen.findByText("Loading...")).toBeInTheDocument();
  //   expect(await screen.findByText("An error occurred")).toBeInTheDocument();
  //   expect(await container).toMatchSnapshot();
  // });
});
