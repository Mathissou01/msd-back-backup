import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/personnalisationFooterPageMockData";
import PersonnalisationFooterPage from "./index";

describe("PersonnalisationFooterPage", () => {
  it("renders loading and loaded state", async () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData} addTypename={false}>
        <PersonnalisationFooterPage />
      </MockedProvider>,
    );

    expect(await screen.findByTestId("common-spinner")).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
    expect(await screen.findByDisplayValue("not_conform")).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("Contactez-nous"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
