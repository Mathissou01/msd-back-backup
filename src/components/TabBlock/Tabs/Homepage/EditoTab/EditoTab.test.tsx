import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../../../__mocks__/editorialTabMockData";
import EditoTab from "./EditoTab";

describe("EditoTab", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData} addTypename={false}>
        <EditoTab
          activatedTypes={["tip", "quiz", "event", "new", "free-content"]}
        />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
    expect(
      await screen.findByText("Nom du quiz - 20/11/2022"),
    ).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("Titre modifié"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
