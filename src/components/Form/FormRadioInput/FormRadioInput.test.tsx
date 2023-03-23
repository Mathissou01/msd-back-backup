import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormRadioInput from "./FormRadioInput";

const mock = {
  name: "form-radio-input",
  displayName: "form radio input",
  secondaryDisplayName: "secondary display name",
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

describe("FormRadioInput", () => {
  it("renders", () => {
    const { container } = render(
      <Wrapper>
        <FormRadioInput
          name={mock.name}
          displayName={mock.displayName}
          secondaryDisplayName={mock.secondaryDisplayName}
          isRequired={false}
          isDisabled={false}
          options={[
            { value: 0, label: "first" },
            { value: 1, label: "second" },
          ]}
          defaultValue={"1"}
        />
      </Wrapper>,
    );
    expect(screen.getByTestId("form-radio-input_0")).toBeInTheDocument();
    expect(screen.getByTestId("form-radio-input_1")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
