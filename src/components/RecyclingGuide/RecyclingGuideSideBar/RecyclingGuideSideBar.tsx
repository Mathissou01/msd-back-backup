import classNames from "classnames";
import Image from "next/image";
import InformationsCard from "./InformationsCard/InformationsCard";
import { EStatus, statusLabels } from "../../../lib/status";
import FormDatePicker from "../../Form/FormDatePicker/FormDatePicker";
import refreshIcon from "./../../../../public/images/pictos/default.svg";
import "./recycling-guide-sidebar.scss";

interface IRecyclingGuideSiderBarProps {
  status?: EStatus;
  creationDate: string;
  updateDate: string;
}

export default function RecyclingGuideSiderBar({
  status,
  creationDate,
  updateDate,
}: IRecyclingGuideSiderBarProps) {
  /* Static Values */
  const labels = {
    unpublishedDateLabel: "Date de dépublication",
    text: "A la date de dépublication, l’actualité est masquée sur le site mais conservée dans le back-office à l’état archivé.",
  };

  return (
    <div className="c-RecyclingGuideSiderBar">
      <span
        className={classNames("c-RecyclingGuideSiderBar__Status", {
          "c-RecyclingGuideSiderBar__Status_draft": status === "draft",
          "c-RecyclingGuideSiderBar__Status_published": status === "published",
        })}
      >
        {status ? statusLabels[status] : statusLabels.draft}
      </span>
      {status !== "archived" && (
        <div className="c-RecyclingGuideSiderBar__UnpublishedDateDatePicker">
          <FormDatePicker
            name="unpublishedDate"
            minDate={new Date()}
            maxDate={new Date("2099-12-31")}
            label={labels.unpublishedDateLabel}
          />
          <p className="c-RecyclingGuideSiderBar__UnpublishedDateText">
            {labels.text}
          </p>
        </div>
      )}
      <InformationsCard creationDate={creationDate} updateDate={updateDate} />
      {/** TODO: Version managing will be implemented in another US */}
      <div className="c-RecyclingGuideSiderBar__VersionManaging">
        <Image width={24} height={24} src={refreshIcon} alt="" />
        <span>Gérer les versions</span>
      </div>
    </div>
  );
}
