import { render } from "@testing-library/react";
import CommonSpinner from "./CommonSpinner";

describe("CommonSpinner", () => {
  it("renders", () => {
    const { container } = render(<CommonSpinner />);
    expect(container).toMatchSnapshot();
  });
});
