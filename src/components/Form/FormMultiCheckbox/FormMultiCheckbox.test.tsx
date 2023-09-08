import React, { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fireEvent, render, screen } from "@testing-library/react";
import FormMultiCheckbox from "./FormMultiCheckbox";
import { dayOptions } from "../../../lib/pickup-days";

const mock = {
  name: "form-checkbox",
  label: "form checkbox",
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return <FormProvider {...formMethods}>{props.children}</FormProvider>;
};

describe("FormMultiCheckbox", () => {
  it("renders", () => {
    const { container } = render(
      <Wrapper>
        <FormMultiCheckbox
          name={mock.name}
          label={mock.label}
          options={dayOptions}
          isRequired
        />
      </Wrapper>,
    );

    const checkbox = screen.getByTestId("form-multi-checkbox_0");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toHaveClass("c-FormMultiCheckbox__Input_checked");

    expect(container).toMatchSnapshot();
  });

  it("changes style when checked", async () => {
    render(
      <Wrapper>
        <FormMultiCheckbox
          name={mock.name}
          label={mock.label}
          options={dayOptions}
          isRequired
        />
      </Wrapper>,
    );

    const checkbox = screen.getByTestId("form-multi-checkbox_0");
    expect(checkbox).not.toHaveClass("c-FormMultiCheckbox__Input_checked");
    fireEvent.click(checkbox);
    expect(checkbox).toHaveClass("c-FormMultiCheckbox__Input_checked");
  });

  it("can be disabled", () => {
    render(
      <Wrapper>
        <FormMultiCheckbox
          name={mock.name}
          label={mock.label}
          options={dayOptions}
          isRequired
          isDisabled={true}
        />
      </Wrapper>,
    );

    const checkbox = screen.getByTestId("form-multi-checkbox_0");
    expect(checkbox).toHaveAttribute("disabled");
    fireEvent.click(checkbox);
    expect(checkbox).not.toHaveClass("c-FormMultiCheckbox__Input_checked");
  });
});
