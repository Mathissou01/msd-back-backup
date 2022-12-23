import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/personnalisationMenuPageMockData";
import PersonnalisationMenuPage from "./index.page";

describe("PersonnalisationMenuPage", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData} addTypename={false}>
        <PersonnalisationMenuPage />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
    expect(
      await screen.findByText("Ordre d’affichage du menu"),
    ).toBeInTheDocument();
    // expect(
    //   await screen.findByText("Collecte à mon adresse !"),
    // ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
