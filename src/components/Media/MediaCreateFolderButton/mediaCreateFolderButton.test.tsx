import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/mediaCreateFolderButtonMockData";
import { RequestFolders } from "../../../graphql/codegen/generated-types";
import MediaCreateFolderButton from "./MediaCreateFolderButton";

const mockData = {
  folderHierarchy: [
    {
      __typename: "RequestFolders",
      id: 2,
      name: "name1",
      path: "/1/2",
      pathId: 2,
    } as unknown as RequestFolders,
  ],
  activePathId: 2,
};

describe("MediaCreateFolderButton", () => {
  it("renders the button", () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData}>
        <MediaCreateFolderButton
          folderHierarchy={mockData.folderHierarchy}
          activePathId={mockData.activePathId}
        />
      </MockedProvider>,
    );

    const mediaCreateFolderButton = screen.getByTestId(
      "media-create-folder-button",
    );
    expect(mediaCreateFolderButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
