import { fireEvent, render, screen } from "@testing-library/react";
import CommonButton from "./CommonButton";

const mock = {
  label: "common button",
};

it("renders", () => {
  const { container } = render(
    <CommonButton label={mock.label} style={null} />,
  );
  expect(container).toMatchSnapshot();
});

it("has working props", () => {
  const handleClick = jest.fn();
  render(
    <CommonButton
      label={mock.label}
      style={"primary"}
      type={"button"}
      isDisabled={false}
      onClick={handleClick}
      formLabelId={"common-button"}
    />,
  );
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("common button");
  expect(button).toHaveClass("c-CommonButton_primary");
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it("can be disabled", () => {
  const handleClick = jest.fn();
  render(
    <CommonButton label={mock.label} isDisabled={true} onClick={handleClick} />,
  );
  const button = screen.getByRole("button");
  expect(button).toHaveAttribute("disabled");
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(0);
});
