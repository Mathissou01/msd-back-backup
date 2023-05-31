import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormWysiwyg from "./FormWysiwyg";

const mock = {
  name: "form-wysiwyg",
  label: "form wysiwyg",
  validationLabel: "validation label",
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return (
    <>
      <FormProvider {...formMethods}>{props.children}</FormProvider>
    </>
  );
};

describe("FormWysiwyg", () => {
  it("renders", async () => {
    const { container } = render(
      <Wrapper>
        <FormWysiwyg
          name={mock.name}
          label={mock.label}
          validationLabel={mock.validationLabel}
          isVisible
          isRequired
        />
      </Wrapper>,
    );

    const input = await screen.findByTestId("form-wysiwyg");
    expect(input).not.toHaveClass("c-FormWysiwyg__Input_invalid");
    expect(container).toMatchSnapshot();
  });
});
