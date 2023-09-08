import { fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormCheckbox from "./FormCheckbox";

const mock = {
  name: "form-checkbox",
  label: "form checkbox",
  secondaryLabel: "secondary label",
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return <FormProvider {...formMethods}>{props.children}</FormProvider>;
};

describe("FormCheckbox", () => {
  it("renders", () => {
    const { container } = render(
      <Wrapper>
        <FormCheckbox
          name={mock.name}
          label={mock.label}
          secondaryLabel={mock.secondaryLabel}
          defaultChecked={false}
          isDisabled={false}
        />
      </Wrapper>,
    );

    const checkbox = screen.getByTestId("form-checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toHaveClass("c-FormCheckbox__Input_checked");
    expect(checkbox).not.toHaveAttribute("disabled");

    expect(container).toMatchSnapshot();
  });

  it("changes style when checked", async () => {
    render(
      <Wrapper>
        <FormCheckbox
          name={mock.name}
          label={mock.label}
          defaultChecked={true}
        />
      </Wrapper>,
    );

    const checkbox = screen.getByTestId("form-checkbox");
    expect(checkbox).toHaveClass("c-FormCheckbox__Input_checked");
    fireEvent.click(checkbox);
    expect(checkbox).not.toHaveClass("c-FormCheckbox__Input_checked");
  });

  it("can be disabled", () => {
    render(
      <Wrapper>
        <FormCheckbox name={mock.name} label={mock.label} isDisabled={true} />
      </Wrapper>,
    );

    const checkbox = screen.getByTestId("form-checkbox");
    expect(checkbox).toHaveAttribute("disabled");
    fireEvent.click(checkbox);
    expect(checkbox).not.toHaveClass("c-FormCheckbox__Input_checked");
  });
});
