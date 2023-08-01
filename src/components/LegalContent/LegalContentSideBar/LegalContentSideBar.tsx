import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { statusLabels } from "../../../lib/status";
import { ILegalContentStaticFields } from "../../../lib/legal-content";
import "./legal-content-sidebar.scss";

export default function LegalContentSideBar() {
  /* Local Data */
  const {
    formState: { defaultValues },
  } = useFormContext<ILegalContentStaticFields>();

  return (
    <>
      <span
        className={classNames("c-LegalContentSideBar__Status", {
          "c-LegalContentSideBar__Status_draft":
            defaultValues?.status === "draft",
          "c-LegalContentSideBar__Status_activated":
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
