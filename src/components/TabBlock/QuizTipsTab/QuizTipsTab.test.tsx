import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "./__mocks__/mockData";
import QuizTipsTab from "./QuizTipsTab";

it("renders loading and loaded state", async () => {
  const { container } = render(
    <MockedProvider mocks={defaultMockData} addTypename={false}>
      <QuizTipsTab />
    </MockedProvider>,
  );

  expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
  expect(await container).toMatchSnapshot();
  expect(await screen.findByText("Quiz et Astuces")).toBeInTheDocument();
  expect(await container).toMatchSnapshot();
});

// it("should show error UI", async () => {
//   const { container } = render(
//     <MockedProvider mocks={errorMockData} addTypename={false}>
//       <QuizTipsTab />
//     </MockedProvider>,
//   );
//
//   expect(await screen.findByText("Loading...")).toBeInTheDocument();
//   expect(await screen.findByText("An error occurred")).toBeInTheDocument();
//   expect(await container).toMatchSnapshot();
// });
