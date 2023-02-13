import { fireEvent, render, screen } from "@testing-library/react";
import CommonDragDropFile from "./CommonDragDropFile";

describe("CommonDragDropFile", () => {
  const handleDragOver = jest.fn();
  const handleFileChange = jest.fn();
  const handleDrop = jest.fn();

  it("renders component", () => {
    const { container } = render(
      <CommonDragDropFile
        handleDragOver={handleDragOver}
        handleFileChange={handleFileChange}
        handleDrop={handleDrop}
      />,
    );
    expect(container).toMatchSnapshot();
    expect(handleDragOver).toReturnTimes(0);
    expect(handleFileChange).toReturnTimes(0);
    expect(handleDrop).toReturnTimes(0);
  });

  it("handles drag and drop events", () => {
    render(
      <CommonDragDropFile
        handleDragOver={handleDragOver}
        handleFileChange={handleFileChange}
        handleDrop={handleDrop}
      />,
    );

    const form = screen.getByTestId("common-drag-drop-file-form");
    expect(form).toBeInTheDocument();
    fireEvent.drop(form);
    expect(handleDrop).toBeCalledTimes(1);
    fireEvent.dragOver(form);
    expect(handleDragOver).toBeCalledTimes(1);
  });

  it("changes input value", () => {
    render(
      <CommonDragDropFile
        handleDragOver={handleDragOver}
        handleFileChange={handleFileChange}
        handleDrop={handleDrop}
      />,
    );

    const input = screen.getByTestId("common-drag-drop-file-input");
    expect(input).toBeInTheDocument();
    fireEvent.change(input);
    expect(handleFileChange).toBeCalledTimes(1);
  });
});
