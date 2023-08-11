import { act, fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import React, { ReactNode } from "react";
import { CommonModalWrapperRef } from "../../CommonModalWrapper/CommonModalWrapper";
import AudienceModal from "./AudienceModal";

const twoAudiencesOptions = [
  { label: "Particuliers", value: 1 },
  { label: "Collectifs", value: 2 },
];
const individualsText = "Particuliers";
const collectivesText = "Collectifs";
const submitBtnLabel = "Valider la sélection";
const cancelBtnLabel = "Annuler";

const childRef = React.createRef<CommonModalWrapperRef>();

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      {props.children}
      <div id="modal-portal" />
    </FormProvider>
  );
};

describe("AudienceModal", () => {
  it("renders", () => {
    const { container } = render(
      <Wrapper>
        <AudienceModal
          audienceOptions={twoAudiencesOptions}
          modalRef={childRef}
          onValidate={jest.fn()}
        />
      </Wrapper>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with two selected audiences", async () => {
    const { container } = render(
      <Wrapper>
        <AudienceModal
          audienceOptions={twoAudiencesOptions}
          modalRef={childRef}
          onValidate={jest.fn()}
          selectedAudiences={twoAudiencesOptions}
        />
      </Wrapper>,
    );
    await act(() => {
      childRef.current?.toggleModal(true);
    });
    expect(await screen.findByText(individualsText)).toBeInTheDocument();
    expect(await screen.findByText(collectivesText)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("submits when clicking on submit button", async () => {
    const validateFunction = jest.fn();
    render(
      <Wrapper>
        <AudienceModal
          audienceOptions={twoAudiencesOptions}
          modalRef={childRef}
          onValidate={validateFunction}
          selectedAudiences={twoAudiencesOptions}
        />
      </Wrapper>,
    );
    await act(() => {
      childRef.current?.toggleModal(true);
    });
    expect(await screen.findByText(individualsText)).toBeInTheDocument();
    expect(await screen.findByText(collectivesText)).toBeInTheDocument();
    const submitButton = await screen.findByText(submitBtnLabel);
    expect(submitButton).toBeInTheDocument();
    await fireEvent.click(submitButton);
    expect(validateFunction).toHaveBeenCalled();
  });

  it("cancels when clicking on cancel button", async () => {
    render(
      <Wrapper>
        <AudienceModal
          audienceOptions={twoAudiencesOptions}
          modalRef={childRef}
          onValidate={jest.fn()}
          selectedAudiences={twoAudiencesOptions}
        />
      </Wrapper>,
    );
    await act(() => {
      childRef.current?.toggleModal(true);
    });
    expect(await screen.findByText(individualsText)).toBeInTheDocument();
    expect(await screen.findByText(collectivesText)).toBeInTheDocument();
    const cancelButton = await screen.findByText(cancelBtnLabel);
    expect(cancelButton).toBeInTheDocument();
    await fireEvent.click(cancelButton);
    expect(screen.queryByText(individualsText)).not.toBeInTheDocument();
    expect(screen.queryByText(collectivesText)).not.toBeInTheDocument();
  });
});
