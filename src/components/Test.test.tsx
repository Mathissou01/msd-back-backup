import { render, screen } from "@testing-library/react";

test("renders learn test", () => {
  render(<div>testing?</div>);
  const linkElement = screen.getByText("testing?");
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toMatchSnapshot();
});
