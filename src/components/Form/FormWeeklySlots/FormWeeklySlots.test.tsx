import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormWeeklySlots from "./FormWeeklySlots";

const mock = {
  name: "form-weekly-slots",
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return (
    <>
      <FormProvider {...formMethods}>{props.children}</FormProvider>
    </>
  );
};

describe("FormWeeklySlots", () => {
  it("renders", () => {
    const { container } = render(
      <Wrapper>
        <FormWeeklySlots name={mock.name} />
      </Wrapper>,
    );

    const inputsContainer = screen.getByTestId("form-weekly-slots");
    expect(inputsContainer).toBeInTheDocument();
    const firstInput = screen.getByTestId("form-weekly-slots-1");
    expect(firstInput).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
