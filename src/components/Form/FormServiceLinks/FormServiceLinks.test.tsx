import { render, screen, within } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import FormServiceLinks from "./FormServiceLinks";

const mock = {
  name: "serviceLinks",
  label: "label",
  modalTitle: "modal title",
  modalNameLabel: "modal name label",
  serviceLinks: [
    {
      type: "ComponentLinksFrees",
      id: 0,
      name: "Valoriser mes déchets",
      isDisplayed: true,
    },
    {
      type: "ComponentLinksContactUs",
      id: 1,
      name: "Contact",
      isDisplayed: true,
    },
    {
      type: "ComponentLinksRecycling",
      id: 2,
      name: "Guide du tri",
      isDisplayed: true,
    },
  ],
};

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  formMethods.reset({ [mock.name]: mock.serviceLinks });
  return (
    <>
      <FormProvider {...formMethods}>{props.children}</FormProvider>
    </>
  );
};

describe("FormServiceLinks", () => {
  it("renders", () => {
    const { container } = render(
      <Wrapper>
        <FormServiceLinks
          name={mock.name}
          label={mock.label}
          editModalTitle={mock.modalTitle}
          editModalNameLabel={mock.modalNameLabel}
        />
      </Wrapper>,
    );

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const items = within(list).getAllByRole("listitem");
    expect(items.length).toBe(3);
    expect(container).toMatchSnapshot();
  });
});
