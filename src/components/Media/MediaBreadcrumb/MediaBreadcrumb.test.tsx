import { render, screen } from "@testing-library/react";
import MediaBreadcrumb from "./MediaBreadcrumb";

const mockFoldersUrl = [
  {
    label: "lorem",
    onClick: jest.fn(),
  },
  {
    label: "Etiam",
    onClick: jest.fn(),
  },
  {
    label: "Vestibulum",
    onClick: jest.fn(),
  },
];

describe("MediaBreadcrumb", () => {
  it("renders", () => {
    const { container } = render(
      <MediaBreadcrumb foldersBreadcrumb={mockFoldersUrl} />,
    );
    const labelUrl = screen.getByText("lorem");
    expect(labelUrl).toMatchSnapshot();
    expect(container).toMatchSnapshot();
  });
});
