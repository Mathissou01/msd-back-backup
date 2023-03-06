import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/mediaCreateFolderButtonMockData";
import MediaUpdateFolderButton from "./MediaUpdateFolderButton";

const mockData = {
  folder: {
    id: "2",
    name: "Guinea",
    path: "/1/2",
    pathId: 2,
  },
  activePath: "/1/2",
  activePathId: 2,
};

describe("MediaUpdateFolderButton", () => {
  it("renders the button", () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData}>
        <MediaUpdateFolderButton
          folder={mockData.folder}
          activePath={mockData.activePath}
          activePathId={mockData.activePathId}
        />
      </MockedProvider>,
    );

    const mediaUpdateFolderButton = screen.getByTestId(
      "media-update-folder-button",
    );
    expect(mediaUpdateFolderButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
