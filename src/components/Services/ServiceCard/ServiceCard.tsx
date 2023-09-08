import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import FormDatePicker from "../../Form/FormDatePicker/FormDatePicker";
import FormSwitch from "../../Form/FormSwitch/FormSwitch";
import "./service-card.scss";

interface IServiceCardProps {
  label: string;
  name: string;
  hasDate?: boolean;
  isDisabled?: boolean;
  onChange?: (toggleIsOn: boolean) => void;
}

export default function ServiceCard({
  label,
  name,
  hasDate = false,
  isDisabled = false,
  onChange,
}: IServiceCardProps) {
  /* Static Data */
  const labels = {
    startDate: "Date de début",
    endDate: "Date de fin",
  };
  const fieldNames = {
    isActivated: "isActivated",
    startDate: "startDate",
    endDate: "endDate",
  };

  /* Local Data */
  const form = useFormContext();
  const { watch, resetField } = form;
  const switchName = hasDate ? `${name}.${fieldNames.isActivated}` : name;
  const switchWatch = watch(switchName);
  const startDateName = `${name}.${fieldNames.startDate}`;
  const endDateName = `${name}.${fieldNames.endDate}`;

  const startDateWatch = watch(startDateName);
  const endDateWatch = watch(endDateName);

  useEffect(() => {
    if (startDateWatch) {
      const startDateTimestamp = new Date(startDateWatch).getTime();
      const endDateTimestamp = new Date(endDateWatch).getTime();

      if (startDateTimestamp > endDateTimestamp) resetField(endDateName);
    }
  }, [startDateWatch, endDateWatch, endDateName, resetField]);

  useEffect(() => {
    if (switchWatch !== undefined) {
      onChange && onChange(switchWatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchWatch]);

  return (
    <div className="c-ServiceCard">
      <div className="c-ServiceCard__ToggleActivation">
        <div className="c-ServiceCard__Label">{label}</div>
        <FormSwitch name={switchName} isDisabled={isDisabled} />
      </div>
      {hasDate && (
        <div className="c-ServiceCard__DatePicker">
          <FormDatePicker
            name={startDateName}
            minDate={new Date()}
            label={labels.startDate}
            isRequired={watch(`${name}.${fieldNames.isActivated}`)}
            isDisabled={!watch(`${name}.${fieldNames.isActivated}`)}
          />
          <FormDatePicker
            name={endDateName}
            minDate={watch(startDateName)}
            label={labels.endDate}
            isRequired={watch(`${name}.${fieldNames.isActivated}`)}
            isDisabled={!watch(startDateName)}
          />
        </div>
      )}
    </div>
  );
}
