import classNames from "classnames";
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { FocusFirstElement } from "../../../lib/utilities";
import "./common-modal-wrapper.scss";

export enum ICommonModalWrapperSize {
  MEDIUM = "medium",
  LARGE = "large",
}

interface ICommonModalWrapperProps {
  onClose?: () => void;
  children: ReactNode;
  size?: ICommonModalWrapperSize;
}

export type CommonModalWrapperRef = {
  toggleModal: (setValue?: boolean, isCancel?: boolean) => void;
};

export default forwardRef(function CommonModalWrapper(
  {
    onClose,
    children,
    size = ICommonModalWrapperSize.MEDIUM,
  }: ICommonModalWrapperProps,
  parentRef,
) {
  const modalId = useId();
  const ref = useRef<Element | null>(null);
  const [isMounted, setMounted] = useState<boolean>(false);

  const handleToggle = useCallback(
    (setValue?: boolean) => {
      ref.current = document.querySelector<HTMLElement>("#modal-portal");
      const newValue = setValue ?? !isMounted;
      setMounted(newValue);
      if (!newValue && onClose) onClose();
    },
    [isMounted, onClose],
  );

  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.code === "Escape") {
        handleToggle(false);
      }
    }

    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleToggle]);

  useImperativeHandle(
    parentRef,
    () => ({
      toggleModal(setValue?: boolean) {
        handleToggle(setValue);
      },
    }),
    [handleToggle],
  );

  const focusRef = useCallback((node: HTMLDivElement) => {
    FocusFirstElement(node);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Tab" || !ref.current) return;
    const parentElement = ref.current?.querySelector(`[id="${modalId}"]`);
    const focusableModalElements = parentElement?.querySelectorAll(
      "a[href], button:not([disabled]), textarea, input, select",
    );
    const firstElement = focusableModalElements?.[0] as HTMLElement;
    const lastElement = focusableModalElements?.[
      focusableModalElements.length - 1
    ] as HTMLElement;

    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  }

  return isMounted && ref.current
    ? createPortal(
        <div
          className="c-CommonModalWrapper"
          onClick={() => handleToggle(false)}
          id={modalId}
          data-testid="common-modal-wrapper"
        >
          <div
            className={classNames("c-CommonModalWrapper__Modal", {
              "c-CommonModalWrapper__Modal_sizeMedium":
                size === ICommonModalWrapperSize.MEDIUM,
              "c-CommonModalWrapper__Modal_sizeLarge":
                size === ICommonModalWrapperSize.LARGE,
            })}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => handleKeyDown(e)}
            ref={focusRef}
            data-testid="common-modal"
          >
            {children}
            <button
              className="c-CommonModalWrapper__Close"
              onClick={() => handleToggle(false)}
              data-testid="common-modal-close"
            />
          </div>
        </div>,
        ref.current,
      )
    : null;
});
