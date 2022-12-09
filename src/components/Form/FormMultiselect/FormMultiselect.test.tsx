import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormMultiselect from "./FormMultiselect";

const mock = {
  name: "form-multiselect",
  label: "form multiselect",
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return (
    <>
      <FormProvider {...formMethods}>{props.children}</FormProvider>
    </>
  );
};

describe("FormMultiselect", () => {
  it("renders", () => {
    const handleTransform = (data: { id: number; content: string }) => {
      return "-" + data.content;
    };
    const { container } = render(
      <Wrapper>
        <FormMultiselect
          name={mock.name}
          label={mock.label}
          displayTransform={handleTransform}
          isRequired={false}
          isDisabled={false}
          selectAmount={2}
          options={[
            { id: 1, content: "content 1" },
            { id: 2, content: "content 2" },
          ]}
          optionKey={"id"}
        />
      </Wrapper>,
    );
    expect(screen.getByTestId("form-multiselect_0")).toBeInTheDocument;
    expect(screen.getByTestId("form-multiselect_1")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
