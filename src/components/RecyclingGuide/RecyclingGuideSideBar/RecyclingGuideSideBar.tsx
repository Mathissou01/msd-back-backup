import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { statusLabels } from "../../../lib/status";
import { IRecyclingGuideFields } from "../../../lib/recycling-guide";
import FormDatePicker from "../../Form/FormDatePicker/FormDatePicker";
import InformationsCard from "../../../layouts/FormLayout/FormLayoutSideBar/InformationsCard/InformationsCard";
import VersioningCard from "../../../layouts/FormLayout/FormLayoutSideBar/VersioningCard/VersioningCard";
import "./recycling-guide-sidebar.scss";
import { isNavigationEntity } from "../../../lib/navigation";

export default function RecyclingGuideSideBar() {
  /* Static Values */
  const labels = {
    unpublishedDateLabel: "Date de dépublication",
    text: "A la date de dépublication, l’actualité est masquée sur le site mais conservée dans le back-office à l’état archivé.",
  };

  /* Local Data */
  const {
    formState: { defaultValues },
  } = useFormContext<IRecyclingGuideFields>();

  return (
    <>
      <span
        className={classNames("c-RecyclingGuideSideBar__Status", {
          "c-RecyclingGuideSideBar__Status_draft":
            defaultValues?.status === "draft",
          "c-RecyclingGuideSideBar__Status_published":
            defaultValues?.status === "published",
        })}
      >
        {defaultValues?.status
          ? statusLabels[defaultValues?.status]
          : statusLabels.draft}
      </span>
      {defaultValues?.status !== "archived" && (
        <div className="c-RecyclingGuideSideBar__UnpublishedDateDatePicker">
          <FormDatePicker
            name="unpublishedDate"
            minDate={new Date()}
            maxDate={new Date("2099-12-31")}
            label={labels.unpublishedDateLabel}
          />
          <p className="c-RecyclingGuideSideBar__UnpublishedDateText">
            {labels.text}
          </p>
        </div>
      )}
      {defaultValues?.createdAt && defaultValues?.updatedAt && (
        <InformationsCard
          creationDate={defaultValues?.createdAt}
          updateDate={defaultValues?.updatedAt}
        />
      )}
      {defaultValues?.customId &&
        defaultValues?.__typename &&
        isNavigationEntity(defaultValues.__typename) && (
          <VersioningCard
            customId={defaultValues.customId}
            typename={defaultValues.__typename}
          />
        )}
    </>
  );
}
