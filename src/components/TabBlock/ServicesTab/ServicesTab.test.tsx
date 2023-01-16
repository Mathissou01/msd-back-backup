import { render, screen } from "@testing-library/react";
import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { defaultMockData } from "../../../../__mocks__/servicesTapMockData";
import ServicesTab from "./ServicesTab";

describe("ServicesTab", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData} addTypename={false}>
        <ServicesTab />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
    expect(await screen.findByText("Titre du bloc *")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Vous pouvez choisir d’afficher jusqu’à 6 blocs maximum",
      ),
    ).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("Les services de ma ville"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
