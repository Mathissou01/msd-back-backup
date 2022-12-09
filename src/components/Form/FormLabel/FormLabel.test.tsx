import { render, screen } from "@testing-library/react";
import React from "react";
import FormLabel from "./FormLabel";

const mock = {
  name: "form-label",
  label: "form label",
  secondaryLabel: "secondary label",
  validationLabel: "validation label",
};

describe("FormLabel", () => {
  it("renders", () => {
    const { container } = render(
      <FormLabel
        label={mock.label}
        secondaryLabel={mock.secondaryLabel}
        validationLabel={mock.validationLabel}
        forId={mock.name}
        isRequired={false}
      />,
    );

    const label = screen.getByText("form label");
    expect(label).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
