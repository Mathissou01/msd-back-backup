import { render } from "@testing-library/react";
import { ApolloError } from "@apollo/client";
import CommonErrors from "./CommonErrors";

const errors = [new ApolloError({ errorMessage: "error message" })];

describe("CommonErrors", () => {
  it("renders", () => {
    const { container } = render(
      <CommonErrors errors={errors} displayMode="under">
        <span>Child Element</span>
      </CommonErrors>,
    );
    expect(container).toMatchSnapshot();
  });
});
