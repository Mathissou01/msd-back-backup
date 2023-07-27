import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import { statusLabels } from "../../../lib/status";
import { ICookiesStaticFields } from "../CookiesForm";
import "./cookies-sidebar.scss";

export default function CookiesSideBar() {
  /* Local Data */
  const {
    formState: { defaultValues },
  } = useFormContext<ICookiesStaticFields>();

  return (
    <>
      <span
        className={classNames("c-CookiesSideBar__Status", {
          "c-CookiesSideBar__Status_draft": defaultValues?.status === "draft",
          "c-CookiesSideBar__Status_activated":
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
