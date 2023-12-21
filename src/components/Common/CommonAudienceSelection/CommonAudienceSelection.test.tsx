import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { FormProvider, useForm } from "react-hook-form";
import { ReactNode } from "react";
import {
  getAllAudiencesMockedData,
  getNoAudienceMockedData,
  getSingleAudienceMockedData,
  getTwoAudiencesMockedData,
} from "../../../../__mocks__/audiencesMockData";
import CommonAudienceSelection from "./CommonAudienceSelection";

jest.mock("../../../graphql/client", () => null);

const audienceModalTitle = "Sélectionner les usagers";
const openModalButtonLabel = "Sélectionner les usagers";
const modalSubmitBtnLabel = "Valider la sélection";

const individualsText = "Particuliers";
const collectivesText = "Collectifs";
const twoSelectedAudiencesValue = {
  audiences: [
    { label: "Particuliers", value: 1 },
    { label: "Collectifs", value: 2 },
  ],
};
const allAudiencesText = "Tous";
const noAudienceAvailableMessage =
  "Merci d'activer au moins un usager afin de pouvoir enregistrer ce formulaire";

const Wrapper = (props: { children: ReactNode }) => {
  const formMethods = useForm();
  return (
    <>
      <FormProvider {...formMethods}>{props.children}</FormProvider>{" "}
      <div id="modal-portal" />
    </>
  );
};

const WrapperWithTwoSelectedAudiences = (props: { children: ReactNode }) => {
  const formMethods = useForm({
    defaultValues: twoSelectedAudiencesValue,
  });
  return (
    <>
      <FormProvider {...formMethods}>{props.children}</FormProvider>
      <div id="modal-portal" />
    </>
  );
};

describe("CommonAudienceSelection", () => {
  it("renders", () => {
    const { container } = render(
      <Wrapper>
        <MockedProvider mocks={getSingleAudienceMockedData}>
          <CommonAudienceSelection />
        </MockedProvider>
      </Wrapper>,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders without audiences", async () => {
    const { container } = render(
      <Wrapper>
        <MockedProvider mocks={getNoAudienceMockedData}>
          <CommonAudienceSelection />
        </MockedProvider>
      </Wrapper>,
    );
    const noAudienceAvailableText = await screen.findByText(
      noAudienceAvailableMessage,
    );
    expect(noAudienceAvailableText).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("has working behaviour when having single audience and clicking button", async () => {
    const { container } = render(
      <Wrapper>
        <MockedProvider mocks={getSingleAudienceMockedData}>
          <CommonAudienceSelection />
        </MockedProvider>
      </Wrapper>,
    );
    const audienceModalContent = screen.queryByText(audienceModalTitle);
    expect(audienceModalContent).toBeNull();
    const button = await screen.findByText(openModalButtonLabel);
    expect(button).toBeInTheDocument();
    expect(await screen.findByText(individualsText)).toBeInTheDocument();
    await fireEvent.click(button);
    expect(await screen.findByText(audienceModalTitle)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("has working behaviour when having two audiences and clicking button", async () => {
    render(
      <Wrapper>
        <MockedProvider mocks={getTwoAudiencesMockedData}>
          <CommonAudienceSelection />
        </MockedProvider>
      </Wrapper>,
    );
    const audienceModalContent = screen.queryByText(audienceModalTitle);
    expect(audienceModalContent).toBeNull();
    const selectUsersButton = await screen.findByText(openModalButtonLabel);
    expect(selectUsersButton).toBeInTheDocument();
    expect(screen.queryByText(individualsText)).not.toBeInTheDocument();
    await fireEvent.click(selectUsersButton);
    expect(await screen.findAllByText(audienceModalTitle)).toHaveLength(2);
  });

  it("has working behaviour when having two audiences already selected matching all available audiences", async () => {
    const { container } = render(
      <WrapperWithTwoSelectedAudiences>
        <MockedProvider mocks={getTwoAudiencesMockedData}>
          <CommonAudienceSelection />
        </MockedProvider>
      </WrapperWithTwoSelectedAudiences>,
    );
    const selectUsersButton = await screen.findByText(openModalButtonLabel);
    expect(selectUsersButton).toBeInTheDocument();
    expect(await screen.findByText(allAudiencesText)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("has working behaviour when having two audiences already selected not matching all available audiences", async () => {
    const { container } = render(
      <WrapperWithTwoSelectedAudiences>
        <MockedProvider mocks={getAllAudiencesMockedData}>
          <CommonAudienceSelection />
        </MockedProvider>
      </WrapperWithTwoSelectedAudiences>,
    );
    const selectUsersButton = await screen.findByText(openModalButtonLabel);
    expect(selectUsersButton).toBeInTheDocument();
    expect(await screen.findByText(individualsText)).toBeInTheDocument();
    expect(await screen.findByText(collectivesText)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("has working behaviour when having two audiences selected and clicking on submitButton in AudienceModal", async () => {
    const { container } = render(
      <WrapperWithTwoSelectedAudiences>
        <MockedProvider mocks={getTwoAudiencesMockedData}>
          <CommonAudienceSelection />
        </MockedProvider>
      </WrapperWithTwoSelectedAudiences>,
    );
    const selectUsersButton = await screen.findByText(openModalButtonLabel);
    expect(selectUsersButton).toBeInTheDocument();
    await fireEvent.click(selectUsersButton);
    const modalSubmitButton = await screen.findByText(modalSubmitBtnLabel);
    expect(modalSubmitButton).toBeInTheDocument();
    await fireEvent.click(modalSubmitButton);
    expect(await screen.findByText(allAudiencesText)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
