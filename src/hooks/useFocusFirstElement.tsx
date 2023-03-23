import { useCallback } from "react";
import { FocusFirstElement } from "../lib/utilities";

export const useFocusFirstElement = () =>
  useCallback((node: HTMLFormElement) => {
    FocusFirstElement(node);
  }, []);
