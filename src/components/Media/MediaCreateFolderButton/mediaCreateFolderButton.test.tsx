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
      id: 1,
      name: "name1",
      path: "/1/6",
      pathId: 6,
    } as unknown as RequestFolders,
  ],
  localFolderPathId: "6" as `${number}`,
};

describe("MediaCreateFolderButton", () => {
  it("renders the button", () => {
    const { container } = render(
      <MockedProvider mocks={defaultMockData}>
        <MediaCreateFolderButton
          folderHierarchy={mockData.folderHierarchy}
          localFolderPathId={"6" as `${number}`}
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
