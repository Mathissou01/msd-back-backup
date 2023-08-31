import { render } from "@testing-library/react";
import CommonFormErrorText from "./CommonFormErrorText";

const mock = {
  message: "error message",
  errorId: "error-1",
};

describe("CommonFormErrorText", () => {
  it("renders", () => {
    const { container } = render(
      <CommonFormErrorText message={mock.message} errorId={mock.errorId} />,
    );
    expect(container).toMatchSnapshot();
  });
});
