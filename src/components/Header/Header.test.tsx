import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("renders", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  it("has navigation elements", () => {
    render(<Header />);
    const topBar = screen.getByTestId("top-bar");
    expect(topBar).toBeInTheDocument();
    const leftBar = screen.getByTestId("side-bar");
    expect(leftBar).toBeInTheDocument();
  });
});
