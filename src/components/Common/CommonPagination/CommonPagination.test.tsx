import { fireEvent, render, screen } from "@testing-library/react";
import CommonPagination from "./CommonPagination";
import React from "react";

const mock = {
  currentPage: 1,
  rowCount: 21,
};

describe("CommonPagination", () => {
  it("renders", () => {
    const handleClick = jest.fn();
    const { container } = render(
      <CommonPagination
        currentPage={mock.currentPage}
        rowCount={mock.rowCount}
        onChangePage={handleClick}
        onChangeRowsPerPage={handleClick}
      />,
    );
    fireEvent.click(screen.getByText(3));
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });
});
