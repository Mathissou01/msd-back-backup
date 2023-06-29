import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import React, { ClassAttributes, ImgHTMLAttributes } from "react";
import { IEditorialFields } from "../../../lib/editorial";
import { valueToEStatus } from "../../../lib/status";
import { TDynamicFieldConfiguration } from "../../../lib/dynamic-blocks";
import { ContractContext } from "../../../hooks/useContract";
import { defaultMockData } from "../../../../__mocks__/editorialFormMockData";
import { mockData } from "../../../../__mocks__/contractContextMockData";
import EditorialForm from "./EditorialForm";

jest.mock("../../../graphql/client", () => null);
jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: React.JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement> & { priority: boolean },
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, ...rest } = props;
    return (
      <>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img {...rest} alt="" />
      </>
    );
  },
}));

const mocks: {
  dynamicFieldConfigurations: Array<TDynamicFieldConfiguration>;
  data: IEditorialFields;
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
  dynamicFieldConfigurations: [
    { option: "ComponentBlocksSubHeading" },
    { option: "ComponentBlocksHorizontalRule" },
  ],
  data: {
    id: "0",
    status: valueToEStatus("draft"),
    title: "mock title",
    shortDescription: "description",
    image: {
      id: "160",
      attributes: {
        hash: "feuille_aluminium_31766_ad7a901593",
        mime: "image/svg+xml",
        name: "feuille-aluminium_31766.svg",
        provider: "azure-storage-blob",
        size: 2.86,
        url: "https://stomsdmediadev.blob.core.windows.net/msd-media-dev/assets-local-piric/feuille-aluminium_31766.svg",
        alternativeText: null,
        ext: ".svg",
        height: 284,
        width: 284,
        createdAt: "2023-05-04T09:53:33.444Z",
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

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.12345);
});

describe("EditorialForm", () => {
  // mockRandomForEach([0.12345]);
  it("renders", async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <ContractContext.Provider
        value={{
          contract: mockData,
          setContract: () => null,
          contractId: "1",
          setContractId: () => null,
        }}
      >
        <MockedProvider mocks={defaultMockData}>
          <EditorialForm
            data={mocks.data}
            dynamicFieldConfigurations={mocks.dynamicFieldConfigurations}
            onSubmitValid={onSubmit}
            labels={mocks.formLabels}
          />
        </MockedProvider>
      </ContractContext.Provider>,
    );

    expect(screen.getByDisplayValue("mock title")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("this is a subHeadingText value"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
