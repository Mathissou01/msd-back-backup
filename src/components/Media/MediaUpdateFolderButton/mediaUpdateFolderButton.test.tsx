import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { defaultMockData } from "../../../../__mocks__/mediaCreateFolderButtonMockData";
import { RequestFolders } from "../../../graphql/codegen/generated-types";
import MediaUpdateFolderButton from "./MediaUpdateFolderButton";

const mockData = {
  folderHierarchy: [
    {
      __typename: "RequestFolders",
      id: 1,
      name: "name1",
      path: "/1/6",
      pathId: 6,
    } as unknown as RequestFolders,
  ],
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
          folderHierarchy={mockData.folderHierarchy}
          localFolderPathId={"6" as `${number}`}
          id={mockData.folder.id}
          name={mockData.folder.name}
          path={mockData.folder.path}
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
