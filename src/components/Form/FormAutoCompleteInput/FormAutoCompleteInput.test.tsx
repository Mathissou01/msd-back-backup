import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormAutoCompleteInput from "./FormAutoCompleteInput";

interface ITestResult {
  name: string;
}

const mock = {
  name: "autocomplete",
  label: "form autocomplete input label",
  results: [{ name: "name 1" }, { name: "name 2" }],
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return (
    <>
      <FormProvider {...formMethods}>{props.children}</FormProvider>
    </>
  );
};

async function searchFunction(): Promise<Array<ITestResult>> {
  return new Promise(() => mock.results);
}

describe("FormAutoCompleteInput", () => {
  it("renders", () => {
    const { container } = render(
      <Wrapper>
        <FormAutoCompleteInput<ITestResult>
          name={mock.name}
          searchFunction={searchFunction}
          displayTransformFunction={(result) => result.name ?? ""}
          selectTransformFunction={(result) => result.name ?? undefined}
          isLoading={false}
          labelProps={{ label: mock.label }}
        />
      </Wrapper>,
    );

    const input = screen.getByTestId("form-auto-complete-input");
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveClass("c-CommonInput_invalid");
    expect(input).not.toHaveAttribute("disabled");

    expect(container).toMatchSnapshot();
  });
});
