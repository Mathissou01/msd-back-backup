import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/mediaCreateFolderButtonMockData";
import MediaUpdateFolderButton from "./MediaUpdateFolderButton";

const mockData = {
  localFolderPathId: "6" as `${number}`,
  folder: {
    id: "4",
    name: "Guinea",
    path: "1/2/4",
  },
};

describe("MediaUpdateFolderButton", () => {
  it("renders the button", () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData}>
        <MediaUpdateFolderButton
          id={mockData.folder.id}
          name={mockData.folder.name}
          path={mockData.folder.path}
          localFolderPathId={"6" as `${number}`}
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
