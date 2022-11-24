import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormInput from "./FormInput";

const mock = {
  name: "form-input",
  label: "form input",
  secondaryLabel: "secondary label",
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return (
    <>
      <FormProvider {...formMethods}>{props.children}</FormProvider>
    </>
  );
};

it("renders", () => {
  const { container } = render(
    <Wrapper>
      <FormInput
        type={"text"}
        name={mock.name}
        label={mock.label}
        secondaryLabel={mock.secondaryLabel}
        isDisabled={false}
      />
    </Wrapper>,
  );

  const input = screen.getByTestId("form-input");
  expect(input).toBeInTheDocument();
  expect(input).not.toHaveClass("c-FormInput__Input_invalid");
  expect(input).not.toHaveAttribute("disabled");

  expect(container).toMatchSnapshot();
});

it("can be disabled", () => {
  render(
    <Wrapper>
      <FormInput
        type={"text"}
        name={mock.name}
        label={mock.label}
        secondaryLabel={mock.secondaryLabel}
        isDisabled={true}
      />
    </Wrapper>,
  );

  const input = screen.getByTestId("form-input");
  expect(input).toHaveAttribute("disabled");
});
