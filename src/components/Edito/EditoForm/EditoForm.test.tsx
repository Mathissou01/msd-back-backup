import { render, screen } from "@testing-library/react";
import React from "react";
import { IEditoFields, TDynamicFieldOption } from "../../../lib/edito";
import { valueToEStatus } from "../../../lib/status";
import EditoForm from "./EditoForm";

const mocks: {
  dynamicFieldOptions: Array<TDynamicFieldOption>;
  data: IEditoFields;
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
};

describe("EditoForm", () => {
  it("renders", async () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <EditoForm
        data={mocks.data}
        dynamicFieldsOptions={mocks.dynamicFieldOptions}
        onSubmitValid={onSubmit}
      />,
    );

    expect(screen.getByDisplayValue("mock title")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("this is a subHeadingText value"),
    ).toBeInTheDocument();
    expect(await container).toMatchSnapshot();
  });
});
