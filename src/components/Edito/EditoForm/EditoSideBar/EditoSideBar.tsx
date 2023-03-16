import classNames from "classnames";
import { EStatus, statusLabels } from "../../../../lib/status";
import CommonDatePicker from "../../../Common/CommonDatePIcker/CommonDatePicker";
import DateBlock from "./DraftInformationBlock/DateBlock";
import "./edito-sidebar.scss";

interface IEditoSideBarProps {
  status?: EStatus;
  creationDate: string;
  updateDate: string;
}

export default function EditoSideBar({
  status,
  creationDate,
  updateDate,
}: IEditoSideBarProps) {
  /* Static Values */
  // TODO: structure is done (commented), finish other sidebar features later
  const labels = {
    unpublishedDateLabel: "Date de dépublication",
    users: "Usagers",
    channels: "Diffusion",
    alert: "Alerte",
    text: "A la date de dépublication, l’actualité est masquée sur le site mais conservée dans le back-office à l’état archivé.",
  };
  return (
    <div className="c-EditoSideBar">
      <div
        className={classNames("c-EditoSideBar__Status", {
          "c-EditoSideBar__Status_draft": status === "draft",
          "c-EditoSideBar__Status_published": status === "published",
        })}
      >
        {status ? statusLabels[status] : statusLabels.draft}
      </div>
      {status !== "archived" ? (
        <div className="c-EditoSideBar__UnpublishedDate">
          {labels.unpublishedDateLabel}

          <div className="c-EditoSideBar__UnpublishedDate_datePicker">
            <CommonDatePicker
              name="unpublishedDate"
              startMinDate={new Date()}
              maxDate={new Date("2099-12-31")}
            />
          </div>
          <div className="c-EditoSideBar__UnpublishedDate_text">
            {labels.text}
          </div>
        </div>
      ) : (
        ""
      )}

      {/*</div>*/}
      {/*<div className="c-EditoSideBar__Users">{labels.users}</div>*/}
      {/*<div className="c-EditoSideBar__Channels">{labels.channels}</div>*/}
      {/*<div className="c-EditoSideBar__Alert">{labels.alert}</div>*/}
      <DateBlock creationDate={creationDate} updateDate={updateDate} />
    </div>
  );
}
