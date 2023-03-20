import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import React from "react";
import { IEditoFields, TDynamicFieldOption } from "../../../lib/edito";
import { valueToEStatus } from "../../../lib/status";
import EditoForm from "./EditoForm";
import { defaultMockData } from "../../../../__mocks__/editoFormMockData";

const mocks: {
  dynamicFieldOptions: Array<TDynamicFieldOption>;
  data: IEditoFields;
  formLabels: {
    staticTitle: string;
    staticTagsLabel: string;
    staticTagsLabelDescription: string;
    staticShortDescription: string;
    staticShortDescriptionMaxCharacters: string;
  };
} = {
  dynamicFieldOptions: [
    "ComponentBlocksSubHeading",
    "ComponentBlocksHorizontalRule",
  ],
  data: {
    id: "0",
    status: valueToEStatus("draft"),
    title: "mock title",
    shortDescription: "description",
    blocks: [
      {
        __typename: "ComponentBlocksSubHeading",
        id: "140",
        subHeadingText: "this is a subHeadingText value",
        subHeadingTag: "h3",
      },
      {
        __typename: "ComponentBlocksHorizontalRule",
        id: "136",
        hr: "<hr>",
      },
    ],
  },
  formLabels: {
    staticTitle: "Titre de l'actualité",
    staticTagsLabel: "Thématique",
    staticTagsLabelDescription: "(Tags)",
    staticShortDescription: "Description courte",
    staticShortDescriptionMaxCharacters:
      "caractères maximum, affichés dans l'aperçu de l'actualité",
  },
};

describe("EditoForm", () => {
  it("renders", async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <MockedProvider mocks={defaultMockData}>
        <EditoForm
          data={mocks.data}
          dynamicFieldsOptions={mocks.dynamicFieldOptions}
          onSubmitValid={onSubmit}
          labels={mocks.formLabels}
        />
      </MockedProvider>,
    );

    expect(screen.getByDisplayValue("mock title")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("this is a subHeadingText value"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
