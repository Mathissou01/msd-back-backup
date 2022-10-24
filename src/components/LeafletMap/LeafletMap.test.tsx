import { render, screen } from "@testing-library/react";
import LeafletMap from "./LeafletMap";

it("renders", () => {
  const { container } = render(<LeafletMap />);
  expect(container).toMatchSnapshot();
});

it("has map container", () => {
  render(<LeafletMap />);
  // MapContainer from react-leaflet is mocked and only returns <div/>
  const mapContainer = screen.getByTestId("map-container");
  expect(mapContainer).toBeInTheDocument();
});

it("has a result button", () => {
  render(<LeafletMap />);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
});
