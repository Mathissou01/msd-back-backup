import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommonModalWrapper, {
  CommonModalWrapperRef,
} from "./CommonModalWrapper";
import React from "react";

const childRef = React.createRef<CommonModalWrapperRef>();
const TestModal = (props: {
  handleClose: () => void;
  toggleValue?: boolean;
}) => (
  <>
    <main>
      <input data-testid="outside-content" />
      <button
        onClick={() => childRef.current?.toggleModal(props.toggleValue)}
      />
      <CommonModalWrapper ref={childRef} onClose={props.handleClose}>
        <input data-testid="modal-content-1" />
        <input data-testid="modal-content-2" />
        <input data-testid="modal-content-3" />
      </CommonModalWrapper>
    </main>
    <div id="modal-portal" />
  </>
);

it("renders nothing when not opened", () => {
  const handleClose = jest.fn();
  const props = { handleClose };
  const { container } = render(<TestModal {...props} />);

  const modal = screen.queryByTestId("common-modal");
  const modalContent = screen.queryByTestId("modal-content-1");
  expect(modal).not.toBeInTheDocument();
  expect(modalContent).not.toBeInTheDocument();

  expect(container).toMatchSnapshot();
});

it("renders content when opened", () => {
  const handleClose = jest.fn();
  const props = { handleClose, toggleValue: true };
  const { container } = render(<TestModal {...props} />);

  const button = screen.getByRole("button");
  fireEvent.click(button);
  const modal = screen.getByTestId("common-modal");
  const modalContent = within(modal).queryByTestId("modal-content-1");
  expect(modalContent).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});

it("it traps focus for Tab and Shift+Tab navigation", async () => {
  const handleClose = jest.fn();
  const props = { handleClose };
  render(<TestModal {...props} />);
  const button = screen.getByRole("button");

  fireEvent.click(button);
  const modal = screen.getByTestId("common-modal");
  const input1 = within(modal).getByTestId("modal-content-1");
  const input2 = within(modal).getByTestId("modal-content-2");
  const input3 = within(modal).getByTestId("modal-content-3");
  const modalClose = within(modal).getByTestId("common-modal-close");
  expect(input1).toHaveFocus();

  await userEvent.tab();
  expect(input2).toHaveFocus();
  await userEvent.tab();
  expect(input3).toHaveFocus();
  await userEvent.tab();
  expect(modalClose).toHaveFocus();
  await userEvent.tab();
  expect(input1).toHaveFocus();

  await userEvent.tab({ shift: true });
  await userEvent.tab({ shift: true });
  expect(input3).toHaveFocus();
});

it("closes with button, click outside, or escape key", () => {
  const handleClose = jest.fn();
  const props = { handleClose };
  render(<TestModal {...props} />);
  const button = screen.getByRole("button");

  // First open
  fireEvent.click(button);
  const modal = screen.getByTestId("common-modal");
  const modalOpen = within(modal).queryByTestId("modal-content-1");
  expect(modalOpen).toBeInTheDocument();

  const closeCross = within(modal).getByRole("button");
  fireEvent.click(closeCross);
  expect(handleClose).toHaveBeenCalledTimes(1);
  expect(modal).not.toBeInTheDocument();

  // Second open
  fireEvent.click(button);
  const modal2 = screen.getByTestId("common-modal");
  const modalOpen2 = within(modal2).queryByTestId("modal-content-1");
  expect(modalOpen2).toBeInTheDocument();

  const clickOutside = screen.getByTestId("common-modal-wrapper");
  fireEvent.click(clickOutside);
  expect(handleClose).toHaveBeenCalledTimes(2);
  expect(modal2).not.toBeInTheDocument();

  // Third open
  fireEvent.click(button);
  const modal3 = screen.getByTestId("common-modal");
  const modalOpen3 = within(modal3).queryByTestId("modal-content-1");
  expect(modalOpen3).toBeInTheDocument();

  fireEvent.keyDown(modal3, { key: "Escape", code: "Escape" });
  expect(handleClose).toHaveBeenCalledTimes(3);
  expect(modal3).not.toBeInTheDocument();
});
