import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { statusLabels } from "../../../lib/status";
import { IRequestFields } from "../RequestForm";
import "./request-sidebar.scss";

export default function RequestSideBar() {
  /* Local Data */
  const {
    formState: { defaultValues },
  } = useFormContext<IRequestFields>();

  return (
    <>
      <span
        className={classNames("c-RequestSideBar__Status", {
          "c-RequestSideBar__Status_draft": defaultValues?.status === "draft",
          "c-RequestSideBar__Status_activated":
            defaultValues?.status === "activated",
        })}
      >
        {defaultValues?.status
          ? statusLabels[defaultValues?.status]
          : statusLabels.draft}
      </span>
    </>
  );
}
