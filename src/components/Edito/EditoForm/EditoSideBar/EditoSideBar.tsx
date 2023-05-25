import classNames from "classnames";
import { EStatus, statusLabels } from "../../../../lib/status";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import FormDatePicker from "../../../Form/FormDatePicker/FormDatePicker";
import "./edito-sidebar.scss";
import InformationsCard from "./InformationsCard/InformationsCard";
import { useRouter } from "next/router";
import { useNavigation } from "../../../../hooks/useNavigation";

interface IEditoSideBarProps {
  status?: EStatus;
  creationDate: string;
  updateDate: string;
  customId: string;
}

export default function EditoSideBar({
  status,
  creationDate,
  updateDate,
  customId,
}: IEditoSideBarProps) {
  /* Static Values */

  const router = useRouter();
  const { currentRoot } = useNavigation();

  // TODO: structure is done (commented), finish other sidebar features later
  const labels = {
    unpublishedDateLabel: "Date de dépublication",
    users: "Usagers",
    channels: "Diffusion",
    alert: "Alerte",
    text: "A la date de dépublication, l’actualité est masquée sur le site mais conservée dans le back-office à l’état archivé.",
    versionButton: "Gérer les versions",
  };
  return (
    <div className="c-EditoSideBar">
      <span
        className={classNames("c-EditoSideBar__Status", {
          "c-EditoSideBar__Status_draft": status === "draft",
          "c-EditoSideBar__Status_published": status === "published",
        })}
      >
        {status ? statusLabels[status] : statusLabels.draft}
      </span>
      {status !== "archived" && (
        <div className="c-EditoSideBar__UnpublishedDateDatePicker">
          <FormDatePicker
            name="unpublishedDate"
            minDate={new Date()}
            maxDate={new Date("2099-12-31")}
            label={labels.unpublishedDateLabel}
          />
          <p className="c-EditoSideBar__UnpublishedDateText">{labels.text}</p>
        </div>
      )}
      {/*<div className="c-EditoSideBar__Users">{labels.users}</div>*/}
      {/*<div className="c-EditoSideBar__Channels">{labels.channels}</div>*/}
      {/*<div className="c-EditoSideBar__Alert">{labels.alert}</div>*/}
      <InformationsCard creationDate={creationDate} updateDate={updateDate} />
      <CommonButton
        type="button"
        style="primary"
        picto="history"
        label={labels.versionButton}
        onClick={() =>
          router.push(`${currentRoot}/edito/actualites/version/${customId}`)
        }
      />
    </div>
  );
}
