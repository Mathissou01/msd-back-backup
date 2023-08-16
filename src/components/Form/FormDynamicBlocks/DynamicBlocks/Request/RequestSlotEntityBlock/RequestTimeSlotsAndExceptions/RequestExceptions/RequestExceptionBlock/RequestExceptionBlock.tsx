import { useFormContext } from "react-hook-form";
import FormWeeklySlots from "../../../../../../../FormWeeklySlots/FormWeeklySlots";
import { Enum_Componentblocksrequestslotsexceptions_Exceptiontype } from "../../../../../../../../../graphql/codegen/generated-types";
import { weekDays } from "../../../../../../../../../lib/time";
import PseudoImageFallback from "../../../../../../../../Accessibility/PseudoImageFallback/PseudoImageFallback";
import FormSelect from "../../../../../../../FormSelect/FormSelect";
import FormDatePicker from "../../../../../../../FormDatePicker/FormDatePicker";
import FormCheckbox from "../../../../../../../FormCheckbox/FormCheckbox";
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
  const { watch, register, setValue, getValues, unregister } = useFormContext();
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
    const watchStartDate: Date = new Date(
      watch(`${name}.${blockIndex}.slotException.startDate`),
    );
    const watchEndDate: Date = new Date(
      watch(`${name}.${blockIndex}.slotException.endDate`),
    );
    const daysBetweenEndStartDate =
      (watchEndDate.getTime() - watchStartDate.getTime()) / (1000 * 3600 * 24);

    return daysBetweenEndStartDate >= 7
      ? undefined
      : watchExceptionType &&
        watchStartDate &&
        watchExceptionType ===
          Enum_Componentblocksrequestslotsexceptions_Exceptiontype.Daily
      ? weekDays.slice(watchStartDate.getDay(), watchStartDate.getDay() + 1)
      : watchStartDate.getDay() < watchEndDate.getDay()
      ? weekDays.slice(watchStartDate.getDay(), watchEndDate.getDay() + 1)
      : weekDays.slice(watchEndDate.getDay(), watchStartDate.getDay() + 1);
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
                onChange={() => {
                  setValue(
                    `${name}.${blockIndex}.slotException.startDate`,
                    getValues(
                      `${name}.${blockIndex}.slotException.startDate`,
                    ).toISOString(),
                  );
                }}
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
                  onChange={() => {
                    setValue(
                      `${name}.${blockIndex}.slotException.startDate`,
                      getValues(
                        `${name}.${blockIndex}.slotException.startDate`,
                      ).toISOString(),
                    );
                  }}
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
                  onChange={() => {
                    setValue(
                      `${name}.${blockIndex}.slotException.endDate`,
                      getValues(
                        `${name}.${blockIndex}.slotException.endDate`,
                      ).toISOString(),
                    );
                  }}
                />
              </div>
            </div>
          )}
          <FormCheckbox
            name={`${name}.${blockIndex}.slotException.hasAppointmentSlots`}
            isDisabled={
              hasOneActivatedRequestTaked && watch(`${name}.${blockIndex}.id`)
            }
            onClick={() => {
              if (
                !getValues(
                  `${name}.${blockIndex}.slotException.hasAppointmentSlots`,
                )
              ) {
                unregister(`${name}.${blockIndex}.slotException.timeSlots`);
              }

              setValue(
                `${name}.${blockIndex}.slotException.hasAppointmentSlots`,
                !getValues(
                  `${name}.${blockIndex}.slotException.hasAppointmentSlots`,
                ),
              );
            }}
            label={labels.appointmentSlots}
          />
          {hasAppointmentSlots && (
            <FormWeeklySlots
              name={`${name}.${blockIndex}.slotException.timeSlots`}
              isDisabled={
                hasOneActivatedRequestTaked && watch(`${name}.${blockIndex}.id`)
              }
              weekDaysOverride={getWeekDaysToShow(blockIndex)}
            />
          )}
        </>
      )}
    </div>
  );
}
