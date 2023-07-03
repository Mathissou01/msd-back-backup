import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { statusLabels } from "../../../../lib/status";
import { IEditorialFields } from "../../../../lib/editorial";
import FormDatePicker from "../../../Form/FormDatePicker/FormDatePicker";
import InformationsCard from "../../../../layouts/FormLayout/FormLayoutSideBar/InformationsCard/InformationsCard";
import VersioningCard from "../../../../layouts/FormLayout/FormLayoutSideBar/VersioningCard/VersioningCard";
import "./editorial-sidebar.scss";
import { isNavigationEntity } from "../../../../lib/navigation";

interface IEditorialSideBar {
  additionalPath?: string;
}

export default function EditorialSideBar({
  additionalPath,
}: IEditorialSideBar) {
  /* Static Data */
  const labels = {
    unpublishedDateLabel: "Date de dépublication",
    users: "Usagers",
    channels: "Diffusion",
    alert: "Alerte",
    text: "A la date de dépublication, l’actualité est masquée sur le site mais conservée dans le back-office à l’état archivé.",
  };

  /* Local Data */
  const {
    formState: { defaultValues },
  } = useFormContext<IEditorialFields>();

  return (
    <>
      <span
        className={classNames("c-EditorialSideBar__Status", {
          "c-EditorialSideBar__Status_draft": defaultValues?.status === "draft",
          "c-EditorialSideBar__Status_published":
            defaultValues?.status === "published",
        })}
      >
        {defaultValues?.status
          ? statusLabels[defaultValues?.status]
          : statusLabels.draft}
      </span>
      {defaultValues?.status !== "archived" && (
        <div className="c-EditorialSideBar__UnpublishedDateDatePicker">
          <FormDatePicker
            name="unpublishedDate"
            minDate={new Date()}
            maxDate={new Date("2099-12-31")}
            label={labels.unpublishedDateLabel}
          />
          <p className="c-EditorialSideBar__UnpublishedDateText">
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
            additionalPath={additionalPath}
          />
        )}
    </>
  );
}
