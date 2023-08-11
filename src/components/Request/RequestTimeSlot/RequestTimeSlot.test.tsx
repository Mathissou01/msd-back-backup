import { render, screen } from "@testing-library/react";
import RequestTimeSlot from "./RequestTimeSlot";

const timeSlotsMock = {
  day: "Lundi",
  slots: [
    { slot: "08h00 - 12h00", nbAppointments: 3 },
    { slot: "14h00 - 18h00", nbAppointments: 10 },
  ],
};

describe("RequestTimeSlot", () => {
  it("renders", () => {
    const { container } = render(<RequestTimeSlot timeSlot={timeSlotsMock} />);
    expect(screen.getByTestId("time-slot-day")).toBeInTheDocument();
    expect(screen.getAllByTestId("time-slot-text")).toHaveLength(2);
    expect(screen.getAllByTestId("time-slot-nb-appointments")).toHaveLength(2);
    expect(container).toMatchSnapshot();
  });
});
