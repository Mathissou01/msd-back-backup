import { useFormContext } from "react-hook-form";
import FormInput from "../../../Form/FormInput/FormInput";
import FormDatePicker from "../../../Form/FormDatePicker/FormDatePicker";
import "./yes-we-scan-service-card.scss";

interface IYesWeScanServiceCardProps {
  name: string;
  onTrashClick: () => void;
}

export default function YesWeScanServiceCard({
  name,
  onTrashClick,
}: IYesWeScanServiceCardProps) {
  /* Static Data */
  const labels = {
    service: "Service",
    startDate: "Date de début",
    endDate: "Date de fin",
  };
  const fieldNames = {
    serviceName: "serviceName",
    startDate: "startDate",
    endDate: "endDate",
  };

  /* Local Data */
  const form = useFormContext();
  const { watch } = form;

  return (
    <div className="c-YesWeScanServiceCard">
      <div className="c-YesWeScanServiceCard__Header">
        <div className="c-YesWeScanServiceCard__ServiceName">
          <FormInput
            type="text"
            name={`${name}.${fieldNames.serviceName}`}
            label={labels.service}
            isRequired
          />
        </div>
        <button
          type="button"
          className="c-YesWeScanServiceCard__TrashIcon"
          onClick={onTrashClick}
        />
      </div>
      <div className="c-YesWeScanServiceCard__DatePicker">
        <FormDatePicker
          name={`${name}.${fieldNames.startDate}`}
          minDate={new Date()}
          label={labels.startDate}
          isRequired
        />
        <FormDatePicker
          name={`${name}.${fieldNames.endDate}`}
          minDate={watch(`${name}.${fieldNames.startDate}`)}
          label={labels.endDate}
          isRequired
        />
      </div>
    </div>
  );
}
