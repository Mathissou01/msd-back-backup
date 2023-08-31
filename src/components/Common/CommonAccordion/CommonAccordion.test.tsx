import { fireEvent, render, screen } from "@testing-library/react";
import CommonAccordion from "./CommonAccordion";

const expanderLabel = "Mocked expander label";
const expandedContentTestId = "accordion-expandedContent";

describe("CommonAccordion", () => {
  it("renders", () => {
    const { container } = render(
      <CommonAccordion
        content={<span>Mocked content</span>}
        expandedContent={<span>Mocked expanded content</span>}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("has working props", () => {
    render(
      <CommonAccordion
        content={<span>Mocked content</span>}
        expandedContent={<span>Mocked expanded content</span>}
        expanderLabel={expanderLabel}
      />,
    );
    let expandedContent = screen.queryByTestId(expandedContentTestId);
    expect(expandedContent).toBeNull();
    const content = screen.getByTestId("accordion-content");
    expect(content).toBeInTheDocument();
    const expander = screen.getByTestId("accordion-expander");
    expect(expander).toBeInTheDocument();
    expect(expander).toHaveTextContent("Mocked expander label");
    fireEvent.click(expander);
    expandedContent = screen.getByTestId(expandedContentTestId);
    expect(expandedContent).toBeInTheDocument();
  });
});
