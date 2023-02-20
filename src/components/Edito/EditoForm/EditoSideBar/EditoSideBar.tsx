import classNames from "classnames";
import { EStatus, statusLabels } from "../../../../lib/status";
import "./edito-sidebar.scss";

interface IEditoSideBarProps {
  status?: EStatus;
}

export default function EditoSideBar({ status }: IEditoSideBarProps) {
  /* Static Values */
  // TODO: structure is done (commented), finish other sidebar features later
  // const labels = {
  //   unpublishedDate: "Date de dépublication",
  //   users: "Usagers",
  //   channels: "Diffusion",
  //   alert: "Alerte",
  // };

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
      {/*<div className="c-EditoSideBar__UnpublishedDate">*/}
      {/*  {labels.unpublishedDate}*/}
      {/*</div>*/}
      {/*<div className="c-EditoSideBar__Users">{labels.users}</div>*/}
      {/*<div className="c-EditoSideBar__Channels">{labels.channels}</div>*/}
      {/*<div className="c-EditoSideBar__Alert">{labels.alert}</div>*/}
    </div>
  );
}
