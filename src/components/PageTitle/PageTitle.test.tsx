import { render, screen } from "@testing-library/react";
import PageTitle from "./PageTitle";

const props = {
  title: "page title",
  description: "page description.",
};

describe("PageTitle", () => {
  it("renders", () => {
    const { container } = render(
      <PageTitle title={props.title} description={props.description} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("has a title and description", () => {
    render(<PageTitle title={props.title} description={props.description} />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(props.title);
    const description = screen.getByTestId("description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent(props.description);
  });
});
