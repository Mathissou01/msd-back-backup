import React, { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { fireEvent, render, screen } from "@testing-library/react";
import FormSwitch from "./FormSwitch";

const mock = {
  name: "form-switch",
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return <FormProvider {...formMethods}>{props.children}</FormProvider>;
};

describe("FormSwitch", () => {
  it("renders", () => {
    const { container } = render(
      <Wrapper>
        <FormSwitch name={mock.name} />
      </Wrapper>,
    );

    const formSwitch = screen.getByTestId("form-switch");
    expect(formSwitch).toBeInTheDocument();
    expect(formSwitch).not.toHaveAttribute("disabled");

    expect(container).toMatchSnapshot();
  });

  it("when checked", async () => {
    render(
      <Wrapper>
        <FormSwitch name={mock.name} />
      </Wrapper>,
    );

    const formSwitch = screen.getByTestId("form-switch");
    fireEvent.click(formSwitch);
    expect(formSwitch).toBeChecked();
  });

  it("when unchecked", async () => {
    render(
      <Wrapper>
        <FormSwitch name={mock.name} />
      </Wrapper>,
    );

    const formSwitch = screen.getByTestId("form-switch");
    fireEvent.doubleClick(formSwitch);
    expect(formSwitch).not.toBeChecked();
  });

  it("can be disabled", () => {
    render(
      <Wrapper>
        <FormSwitch name={mock.name} isDisabled />
      </Wrapper>,
    );

    const formSwitch = screen.getByTestId("form-switch");
    expect(formSwitch).toHaveAttribute("disabled");
    fireEvent.click(formSwitch);
  });
});
