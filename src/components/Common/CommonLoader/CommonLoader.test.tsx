import { render } from "@testing-library/react";
import CommonLoader from "./CommonLoader";
import { ApolloError } from "@apollo/client";

describe("CommonLoader", () => {
  it("renders loading state", () => {
    const { container } = render(
      <CommonLoader isLoading={true} hasDelay={false}>
        <span>loaded content</span>
      </CommonLoader>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders loaded state", () => {
    const { container } = render(
      <CommonLoader isLoading={false} hasDelay={false}>
        <span>loaded content</span>
      </CommonLoader>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders error state", () => {
    const error = new ApolloError({ errorMessage: "error message" });
    const { container } = render(
      <CommonLoader isLoading={false} hasDelay={false} errors={[error]}>
        <span>loaded content</span>
      </CommonLoader>,
    );
    expect(container).toMatchSnapshot();
  });
});
