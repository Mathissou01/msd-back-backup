import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import { statusLabels } from "../../../../lib/status";
import { IWasteFormFields } from "../../../../lib/recycling-guide";
import FormDatePicker from "../../../Form/FormDatePicker/FormDatePicker";
import InformationsCard from "../../../../layouts/FormLayout/FormLayoutSideBar/InformationsCard/InformationsCard";
import VersioningCard from "../../../../layouts/FormLayout/FormLayoutSideBar/VersioningCard/VersioningCard";
import "./waste-form-sidebar.scss";

export default function WasteFormSideBar() {
  /* Static Values */
  const labels = {
    unpublishedDateLabel: "Date de dépublication",
    text: "A la date de dépublication, l’actualité est masquée sur le site mais conservée dans le back-office à l’état archivé.",
  };

  /* Local Data */
  const {
    formState: { defaultValues },
  } = useFormContext<IWasteFormFields>();

  return (
    <>
      <span
        className={classNames("c-WasteFormSideBar__Status", {
          "c-WasteFormSideBar__Status_draft": defaultValues?.status === "draft",
          "c-WasteFormSideBar__Status_published":
            defaultValues?.status === "published",
        })}
      >
        {defaultValues?.status
          ? statusLabels[defaultValues?.status]
          : statusLabels.draft}
      </span>
      {defaultValues?.status !== "archived" && (
        <div className="c-WasteFormSideBar__UnpublishedDateDatePicker">
          <FormDatePicker
            name="unpublishedDate"
            minDate={new Date()}
            maxDate={new Date("2099-12-31")}
            label={labels.unpublishedDateLabel}
          />
          <p className="c-WasteFormSideBar__UnpublishedDateText">
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
      {defaultValues?.customId && (
        <VersioningCard
          customId={defaultValues.customId}
          typename={"WasteFormEntity"}
        />
      )}
    </>
  );
}
