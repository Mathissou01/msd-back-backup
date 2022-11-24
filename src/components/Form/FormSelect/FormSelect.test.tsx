import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormSelect from "./FormSelect";

const mock = {
  name: "form-select",
  label: "form select",
  secondaryLabel: "secondary label",
  noneLabel: "none",
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
  const handleTransform = (data: { id: number; content: string }) => {
    return "-" + data.content;
  };
  const { container } = render(
    <Wrapper>
      <FormSelect<{ id: number; content: string }>
        name={mock.name}
        label={mock.label}
        secondaryLabel={mock.secondaryLabel}
        displayTransform={handleTransform}
        isRequired={false}
        isDisabled={false}
        options={[
          { id: 1, content: "content 1" },
          { id: 2, content: "content 2" },
        ]}
        optionKey={"id"}
        defaultValue={{ id: 1, content: "content 2" }}
        noneSelectedLabel={mock.noneLabel}
      />
    </Wrapper>,
  );
  expect(screen.getByTestId("form-select")).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
