import { useFormContext } from "react-hook-form";
import FormWeeklySlots from "../../../../../../../FormWeeklySlots/FormWeeklySlots";
import { Enum_Componentblocksrequestslotsexceptions_Exceptiontype } from "../../../../../../../../../graphql/codegen/generated-types";
import { weekDays } from "../../../../../../../../../lib/time";
import PseudoImageFallback from "../../../../../../../../Accessibility/PseudoImageFallback/PseudoImageFallback";
import FormSelect from "../../../../../../../FormSelect/FormSelect";
import FormDatePicker from "../../../../../../../FormDatePicker/FormDatePicker";
import FormRadioInput from "../../../../../../../FormRadioInput/FormRadioInput";
import { newBlockExceptionSlot } from "../RequestExceptions";

export interface IRequestExceptionsLabels {
  addExceptionButton: string;
  daily: string;
  dateRange: string;
  selectException: string;
  day: string;
  appointmentSlots: string;
}

interface IRequestExceptionBlockProps {
  name: string;
  blockIndex: number;
  labels: IRequestExceptionsLabels;
  exceptionBlocks: Array<newBlockExceptionSlot>;
  setExceptionBlocks: (exceptionBlocks: Array<newBlockExceptionSlot>) => void;
  hasOneActivatedRequestTaked: boolean;
}

export default function RequestExceptionBlock({
  name,
  blockIndex,
  labels,
  exceptionBlocks,
  setExceptionBlocks,
  hasOneActivatedRequestTaked,
}: IRequestExceptionBlockProps) {
  /* Static Datas */
  const altLabels = {
    delete: "Supprimer",
  };

  /* Local Datas */
  const { watch, register, setValue, unregister } = useFormContext();
  register(`${name}.${blockIndex}`, { value: exceptionBlocks[blockIndex] });

  const watchExceptionType = watch(`${name}.${blockIndex}.exceptionType`);
  const hasAppointmentSlots = watch(
    `${name}.${blockIndex}.slotException.hasAppointmentSlots`,
  );

  /* Methods */
  function handleDelete(blockIndex: number) {
    unregister(`${name}`);
    const newExceptionSlots = [...exceptionBlocks];
    newExceptionSlots.splice(blockIndex, 1);
    setExceptionBlocks(newExceptionSlots);
    setValue(name, newExceptionSlots, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }

  function getWeekDaysToShow(blockIndex: number) {
    const endDateWatch = watch(`${name}.${blockIndex}.slotException.endDate`);
    const watchStartDate: Date = new Date(
      watch(`${name}.${blockIndex}.slotException.startDate`),
    );
    if (
      !endDateWatch ||
      watchExceptionType ===
        Enum_Componentblocksrequestslotsexceptions_Exceptiontype.Daily
    ) {
      return [weekDays[watchStartDate.getDay() - 1]];
    }
    const watchEndDate: Date = new Date(endDateWatch);
    const daysBetweenEndStartDate =
      (watchEndDate.getTime() - watchStartDate.getTime()) / (1000 * 3600 * 24);

    // More or equals to a week => undefined
    if (daysBetweenEndStartDate >= 7) {
      return undefined;
    } else {
      // case when one of the dates is a Sunday (last on the tab)
      if (watchStartDate.getDay() === 0) {
        return [
          weekDays[6],
          weekDays.slice(0, watchEndDate.getDay()).flat(),
        ].flat();
      } else if (watchEndDate.getDay() === 0) {
        return weekDays.slice(watchStartDate.getDay() - 1, 7);
      } else if (watchStartDate.getDay() >= watchEndDate.getDay()) {
        return [
          weekDays[watchStartDate.getDay() - 1],
          weekDays[watchStartDate.getDay()],
          weekDays.slice(0, watchEndDate.getDay()).flat(),
        ].flat();
      } else {
        return weekDays.slice(
          watchStartDate.getDay() - 1,
          watchEndDate.getDay(),
        );
      }
    }
  }

  return (
    <div key={blockIndex} className="c-RequestExceptions__BlockException">
      <button
        className="c-RequestExceptions__BlockAction_delete"
        type="button"
        onClick={() => handleDelete(blockIndex)}
        hidden={
          hasOneActivatedRequestTaked && watch(`${name}.${blockIndex}.id`)
        }
        title={altLabels.delete}
      >
        <PseudoImageFallback alt={altLabels.delete} />
      </button>
      <label
        className="c-FormWeeklySlots__Title"
        htmlFor={`${name}.${blockIndex}.exceptionType`}
      >
        {labels.selectException + "*"}
      </label>
      <FormSelect<Enum_Componentblocksrequestslotsexceptions_Exceptiontype>
        label=""
        isRequired
        isDisabled={
          hasOneActivatedRequestTaked && watch(`${name}.${blockIndex}.id`)
        }
        name={`${name}.${blockIndex}.exceptionType`}
        options={[
          {
            option:
              Enum_Componentblocksrequestslotsexceptions_Exceptiontype.Daily,
            label: labels.daily,
          },
          {
            option:
              Enum_Componentblocksrequestslotsexceptions_Exceptiontype.DateRange,
            label: labels.dateRange,
          },
        ]}
      />
      {watchExceptionType && (
        <>
          {watchExceptionType ===
          Enum_Componentblocksrequestslotsexceptions_Exceptiontype.Daily ? (
            <>
              <label
                className="c-FormWeeklySlots__Title"
                htmlFor={`${name}.${blockIndex}.slotException.startDate`}
              >
                {labels.day + "*"}
              </label>
              <FormDatePicker
                isRequired
                isDisabled={
                  hasOneActivatedRequestTaked &&
                  watch(`${name}.${blockIndex}.id`)
                }
                minDate={new Date()}
                name={`${name}.${blockIndex}.slotException.startDate`}
              />
            </>
          ) : (
            <div className="c-FormWeeklySlots">
              <label
                className="c-FormWeeklySlots__Title"
                htmlFor={`${name}.${blockIndex}.slotException.startDate`}
              >
                {labels.dateRange + "*"}
              </label>
              <div className="c-FormWeeklySlots__DatePickersBlock">
                <FormDatePicker
                  label="Du"
                  isRequired
                  isDisabled={
                    hasOneActivatedRequestTaked &&
                    watch(`${name}.${blockIndex}.id`)
                  }
                  minDate={new Date()}
                  name={`${name}.${blockIndex}.slotException.startDate`}
                />
                <FormDatePicker
                  label="Au"
                  isRequired
                  isDisabled={
                    hasOneActivatedRequestTaked &&
                    watch(`${name}.${blockIndex}.id`)
                  }
                  minDate={
                    new Date(
                      watch(`${name}.${blockIndex}.slotException.startDate`),
                    )
                  }
                  name={`${name}.${blockIndex}.slotException.endDate`}
                />
              </div>
            </div>
          )}
          <FormRadioInput
            name={`${blockIndex}`}
            defaultValue={
              watch(`${name}.${blockIndex}.slotException.hasAppointmentSlots`)
                ? "1"
                : "0"
            }
            isDisabled={
              hasOneActivatedRequestTaked && watch(`${name}.${blockIndex}.id`)
            }
            displayName={labels.appointmentSlots}
            options={[
              {
                label: "Oui",
                value: "1",
              },
              {
                label: "Non",
                value: "0",
              },
            ]}
            onChange={(value) => {
              setValue(
                `${name}.${blockIndex}.slotException.hasAppointmentSlots`,
                value === "1",
              );
            }}
          />
          {hasAppointmentSlots &&
            watch(`${name}.${blockIndex}.slotException.startDate`) && (
              <FormWeeklySlots
                name={`${name}.${blockIndex}.slotException.timeSlots`}
                isDisabled={
                  hasOneActivatedRequestTaked &&
                  watch(`${name}.${blockIndex}.id`)
                }
                weekDaysOverride={getWeekDaysToShow(blockIndex)}
              />
            )}
        </>
      )}
    </div>
  );
}
