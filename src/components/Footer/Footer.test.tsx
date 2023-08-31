import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders a basic footer", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
