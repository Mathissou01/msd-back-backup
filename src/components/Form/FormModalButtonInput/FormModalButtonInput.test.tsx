import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormModalButtonInput from "./FormModalButtonInput";

const mock = {
  name: "form-modal-input",
  label: "form modal input",
  buttonLabel: "button label",
  modalTitle: "modal title",
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return (
    <>
      <FormProvider {...formMethods}>{props.children}</FormProvider>
    </>
  );
};

describe("FormModalButtonInput", () => {
  it("renders", () => {
    const handleTransform = jest.fn();
    const handleSubmit = jest.fn();
    const { container } = render(
      <Wrapper>
        <FormModalButtonInput
          name={mock.name}
          label={mock.label}
          displayTransform={handleTransform}
          buttonLabel={mock.buttonLabel}
          modalTitle={mock.modalTitle}
          onModalSubmit={handleSubmit}
          modalFormValidationMode={"onChange"}
          isDisabled={false}
        >
          <div />
        </FormModalButtonInput>
      </Wrapper>,
    );

    const modalInput = screen.getByTestId("form-modal-input");
    expect(modalInput).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
