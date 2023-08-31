import { render, screen, within } from "@testing-library/react";
import React from "react";
import CommonDataTable from "./CommonDataTable";
import "jest-styled-components";

interface ITestRow {
  id: string;
  editState: boolean;
  name: string;
}

const mocks = {
  columns: [
    {
      id: "id",
      selector: (row: ITestRow) => row.id,
      omit: true,
    },
    {
      id: "name",
      name: "name",
      selector: (row: ITestRow) => row.name,
    },
  ],
  data: [
    { id: "1", editState: false, name: "first name" },
    { id: "2", editState: false, name: "second name" },
    { id: "5", editState: false, name: "fifth name" },
    { id: "10", editState: false, name: "tenth name" },
  ],
};

describe("CommonDataTable", () => {
  it("renders", () => {
    const { container } = render(
      <CommonDataTable columns={mocks.columns} data={mocks.data} />,
    );

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    const rowGroups = within(table).getAllByRole("rowgroup");
    const rows = within(table).getAllByRole("row");
    expect(rowGroups.length).toBe(2);
    expect(rows.length).toBe(5);
    expect(container).toMatchSnapshot();
  });
});
