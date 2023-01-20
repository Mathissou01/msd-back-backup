import { fireEvent, render, screen } from "@testing-library/react";
import CommonPagination from "./CommonPagination";

const mock = {
  page: 1,
  pageCount: 5,
  pagiSize: [10, 20, 50, 100],
};

describe("CommonPagination", () => {
  it("renders", () => {
    const handleClick = jest.fn();
    const { container } = render(
      <CommonPagination
        pageCount={mock.pageCount}
        page={mock.page}
        pageSize={mock.pagiSize}
        onPreviousPage={handleClick}
        onNextPage={handleClick}
        onFirstPage={handleClick}
        onLastPage={handleClick}
        onSpecificPage={handleClick}
        setCurrentPagesize={handleClick}
      />,
    );
    expect(container).toMatchSnapshot();
    fireEvent.click(screen.getByText(1));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
