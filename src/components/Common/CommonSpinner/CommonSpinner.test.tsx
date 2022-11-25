import { render } from "@testing-library/react";
import CommonSpinner from "./CommonSpinner";

it("renders", () => {
  const { container } = render(<CommonSpinner />);
  expect(container).toMatchSnapshot();
});

it("renders in cover mode", () => {
  const { container } = render(<CommonSpinner isCover={true} />);
  expect(container).toMatchSnapshot();
});
