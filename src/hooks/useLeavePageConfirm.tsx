import { useEffect } from "react";
import Router from "next/router";
import { useBeforeUnload } from "react-use";

export function useLeavePageConfirm(isConfirm = true, message?: string) {
  const defaultConfirmationMessage =
    "Vous avez des modifications non enregistrées, êtes-vous sûr de vouloir quitter la page ?";
  useBeforeUnload(isConfirm, message ?? defaultConfirmationMessage);

  useEffect(() => {
    const handler = () => {
      if (isConfirm && !window.confirm(message ?? defaultConfirmationMessage)) {
        throw "Route Canceled";
      }
    };

    Router.events.on("beforeHistoryChange", handler);

    return () => {
      Router.events.off("beforeHistoryChange", handler);
    };
  }, [isConfirm, message]);
}
