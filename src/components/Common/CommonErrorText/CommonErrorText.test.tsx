import { render } from "@testing-library/react";
import CommonErrorText from "./CommonErrorText";

const mock = {
  message: "error message",
  errorId: "error-1",
};

describe("CommonErrorText", () => {
  it("renders", () => {
    const { container } = render(
      <CommonErrorText message={mock.message} errorId={mock.errorId} />,
    );
    expect(container).toMatchSnapshot();
  });
});
