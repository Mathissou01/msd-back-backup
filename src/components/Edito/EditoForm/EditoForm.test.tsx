import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import React from "react";
import { IEditoFields, TDynamicFieldOption } from "../../../lib/edito";
import { valueToEStatus } from "../../../lib/status";
import EditoForm from "./EditoForm";
import { defaultMockData } from "../../../../__mocks__/editoFormMockData";

jest.mock("../../../graphql/client", () => null);

const mocks: {
  dynamicFieldOptions: Array<TDynamicFieldOption>;
  data: IEditoFields;
  formLabels: {
    staticTitle: string;
    staticTags: string;
    staticTagsDescription: string;
    staticImage: string;
    staticImageValidation: string;
    staticImagePlaceholder: string;
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
    image: {
      __typename: "UploadFileEntity",
      id: "1",
      attributes: {
        name: "name",
        hash: "hash",
        mime: "mime",
        provider: "provider",
        size: 123,
        url: "url",
      },
    },
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
    staticTags: "Thématique",
    staticTagsDescription: "(Tags)",
    staticImage: "Vignette",
    staticImageValidation:
      "Format carré, format .gif, .svg, .png ou .jpg, 30 Mo maximum",
    staticImagePlaceholder:
      "Cliquer pour ajouter une image depuis la bibliothèque de média ou glissez-déposez une image dans cette zone.",
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
