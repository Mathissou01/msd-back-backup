import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/mediaCreateFolderButtonMockData";
import EditoBibliothequeDeMedia from "./index.page";

describe("MediaCreateFolderButton", () => {
  it("check it renders correctly the component ", () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData}>
        <EditoBibliothequeDeMedia />
      </MockedProvider>,
    );

    const mediaCreateFolderButton = screen.getByTestId(
      "media-create-folder-button",
    );
    expect(mediaCreateFolderButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
