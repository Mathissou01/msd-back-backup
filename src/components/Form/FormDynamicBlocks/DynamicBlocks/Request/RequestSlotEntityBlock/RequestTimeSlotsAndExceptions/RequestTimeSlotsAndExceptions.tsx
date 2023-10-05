import { useFormContext } from "react-hook-form";
import {
  ComponentBlocksRequestSlotsExceptions,
  Enum_Componentblocksrequestslotsexceptions_Exceptiontype,
  Enum_Requestslot_Slottype,
  Scalars,
} from "../../../../../../../graphql/codegen/generated-types";
import {
  IExceptionSlotDisplay,
  ITimeSlotsDisplay,
  parseSlotsExceptions,
  parseTimeSlots,
  slotTypeLabelMap,
  TWeeklySlots,
} from "../../../../../../../lib/requests";
import { removeNulls } from "../../../../../../../lib/utilities";
import RequestTimeSlot from "../../../../../../Request/RequestTimeSlot/RequestTimeSlot";
import FormModalButtonInput from "../../../../../FormModalButtonInput/FormModalButtonInput";
import FormSelect from "../../../../../FormSelect/FormSelect";
import { IOptionWrapper } from "../../../../../FormMultiselect/FormMultiselect";
import FormWeeklySlots from "../../../../../FormWeeklySlots/FormWeeklySlots";
import RequestExceptions from "./RequestExceptions/RequestExceptions";
import { IRequestExceptionsLabels } from "./RequestExceptions/RequestExceptionBlock/RequestExceptionBlock";
import "./request-time-slots-and-exceptions.scss";

interface IRequestSlotsAndExceptionsInput {
  slotType?: Enum_Requestslot_Slottype;
  timeSlots?: Scalars["JSON"];
  slotsExceptions?: Array<ComponentBlocksRequestSlotsExceptions>;
}

interface IRequestSlotsAndExceptionsModalFields {
  slotType: Enum_Requestslot_Slottype;
  timeSlots: Scalars["JSON"];
  slotsExceptions: Array<ComponentBlocksRequestSlotsExceptions>;
}

export interface IRequestTimeSlotsAndExceptionsLabels {
  slots: string;
  exception: string;
  from: string;
  to: string;
  closed: string;
  noSlots: string;
  validationError: string;
  modifySlots: string;
  modalLabels: {
    title: string;
    slotType: string;
    timeSlots: string;
    saveButton: string;
    slotsExceptions: IRequestExceptionsLabels;
  };
}

interface IRequestTimeSlotsAndExceptionsProps {
  modalName: string;
  slotTypeName: string;
  timeSlotsName: string;
  exceptionsName: string;
  hasOneActivatedRequestTaked: boolean;
  labels: IRequestTimeSlotsAndExceptionsLabels;
}

export default function RequestTimeSlotsAndExceptions({
  modalName,
  slotTypeName,
  timeSlotsName,
  exceptionsName,
  hasOneActivatedRequestTaked,
  labels,
}: IRequestTimeSlotsAndExceptionsProps) {
  /* Methods */
  function transformWeeklySlotsAndExceptionsIntoDisplay(
    timeSlotsAndExceptions?: IRequestSlotsAndExceptionsInput,
  ) {
    const parsedTimeSlots: Array<ITimeSlotsDisplay> =
      parseTimeSlots(timeSlotsAndExceptions?.timeSlots) ?? [];
    const parsedExceptionSlots: Array<IExceptionSlotDisplay> =
      parseSlotsExceptions(timeSlotsAndExceptions?.slotsExceptions) ?? [];
    return (
      <div className="c-RequestTimeSlotsAndExceptions__Content">
        {parsedTimeSlots.length > 0 ? (
          <div className="c-RequestTimeSlotsAndExceptions__TimeSlots">
            {parsedTimeSlots.map((timeSlot, index) => {
              return <RequestTimeSlot key={index} timeSlot={timeSlot} />;
            })}
          </div>
        ) : (
          <i>{labels.noSlots}</i>
        )}
        {parsedExceptionSlots.length > 0 &&
          parsedExceptionSlots.map((exceptionSlot, index) => (
            <div
              key={index}
              className="c-RequestTimeSlotsAndExceptions__Exception"
            >
              <span className="c-RequestTimeSlotsAndExceptions__ExceptionLabel">
                {labels.exception}
              </span>
              <span className="c-RequestTimeSlotsAndExceptions__ExceptionDate">
                {exceptionSlot.exceptionType ===
                Enum_Componentblocksrequestslotsexceptions_Exceptiontype.DateRange
                  ? `${labels.from} ${exceptionSlot.slotException.startDate} ${labels.to} ${exceptionSlot.slotException.endDate}`
                  : exceptionSlot.slotException.startDate}
              </span>
              <div>
                {exceptionSlot.slotException.hasAppointmentSlots &&
                exceptionSlot.slotException.exceptionSlots &&
                exceptionSlot.slotException.exceptionSlots.length > 0 ? (
                  exceptionSlot.slotException.exceptionSlots.map(
                    (timeSlot, index) => {
                      return (
                        <RequestTimeSlot key={index} timeSlot={timeSlot} />
                      );
                    },
                  )
                ) : (
                  <span>{labels.closed}</span>
                )}
              </div>
            </div>
          ))}
      </div>
    );
  }

  function handleTimeSlotsAndExceptionsValidation(
    input: IRequestSlotsAndExceptionsInput,
  ) {
    return (
      (input && input.slotType && !!input.timeSlots) || labels.validationError
    );
  }

  function handleModalSubmit(
    submitData: IRequestSlotsAndExceptionsModalFields,
  ): IRequestSlotsAndExceptionsInput {
    // Remove data for items that are not set (the issue was only after an update on a previously defined slot)
    const timeSlotsKeys = Object.keys(submitData.timeSlots);
    timeSlotsKeys.forEach((timeSlotsKey) => {
      if (Object.keys(submitData.timeSlots[timeSlotsKey]).length === 0) {
        delete submitData.timeSlots[timeSlotsKey];
      }
    });
    submitData.slotsExceptions.forEach((slotsException, slotExceptionId) => {
      if (slotsException.slotException.timeSlots) {
        const exceptionsKeys = Object.keys(
          slotsException.slotException.timeSlots,
        );
        exceptionsKeys.forEach((exceptionsKey) => {
          if (
            Object.keys(slotsException.slotException.timeSlots[exceptionsKey])
              .length === 0
          ) {
            delete submitData.slotsExceptions[slotExceptionId].slotException
              .timeSlots[exceptionsKey];
          }
        });
      }
    });

    const newSlotType = submitData.slotType;
    const newTimeSlots = submitData.timeSlots;
    const newSlotsExceptions = submitData.slotsExceptions;
    setValue(slotTypeName, newSlotType);
    setValue(timeSlotsName, newTimeSlots);
    setValue(exceptionsName, newSlotsExceptions);
    return {
      slotType: newSlotType,
      timeSlots: newTimeSlots,
      slotsExceptions: newSlotsExceptions,
    };
  }

  /* Local Data */
  const { getValues, setValue } = useFormContext();
  const existingSlotType: Enum_Requestslot_Slottype =
    getValues(slotTypeName) ?? Enum_Requestslot_Slottype.Weekly;
  const existingTimeSlots: TWeeklySlots = getValues(timeSlotsName);
  const existingSlotsExceptions: Array<ComponentBlocksRequestSlotsExceptions> =
    getValues(exceptionsName);
  // If no existing values for modal fields, defaultValues is empty
  const defaultValues: IRequestSlotsAndExceptionsInput | undefined =
    Object.values(existingTimeSlots).length > 0 ||
    Object.values(existingSlotsExceptions).length > 0
      ? {
          slotType: existingSlotType,
          timeSlots: existingTimeSlots,
          slotsExceptions: existingSlotsExceptions,
        }
      : undefined;
  // Type de créneaux
  const EnumKeys = Object.keys(Enum_Requestslot_Slottype) as Array<
    keyof typeof Enum_Requestslot_Slottype
  >;

  const slotTypeOptions: Array<IOptionWrapper<Enum_Requestslot_Slottype>> =
    EnumKeys.map((key) => {
      // TODO: only handles "weekly" type for MVP 0, remove this if() and the filter(removeNulls) later
      if (key !== "Personalized") {
        return {
          label: slotTypeLabelMap[key],
          option: Enum_Requestslot_Slottype[key],
        };
      }
    }).filter(removeNulls);

  return (
    <div className="c-RequestTimeSlotsAndExceptions">
      <FormModalButtonInput<
        IRequestSlotsAndExceptionsInput,
        IRequestSlotsAndExceptionsModalFields
      >
        name={modalName}
        label={labels.slots}
        buttonLabel={labels.modifySlots}
        defaultValue={defaultValues}
        displayTransform={transformWeeklySlotsAndExceptionsIntoDisplay}
        modalTitle={labels.modalLabels.title}
        modalSubmitButtonLabel={labels.modalLabels.saveButton}
        modalHasRequiredChildren="all"
        onValidate={handleTimeSlotsAndExceptionsValidation}
        onModalSubmit={handleModalSubmit}
      >
        <div className="c-RequestTimeSlotsAndExceptions__Modal">
          <FormSelect<Enum_Requestslot_Slottype>
            name="slotType"
            label={labels.modalLabels.slotType}
            options={slotTypeOptions}
            defaultValue={existingSlotType}
            isRequired
            isDisabled={hasOneActivatedRequestTaked}
          />
          <div className="c-RequestTimeSlotsAndExceptions__ModalTimeSlots">
            <FormWeeklySlots
              name="timeSlots"
              defaultValue={existingTimeSlots}
              isDisabled={hasOneActivatedRequestTaked}
            />
          </div>
          <RequestExceptions
            name="slotsExceptions"
            defaultValue={existingSlotsExceptions}
            labels={labels.modalLabels.slotsExceptions}
            hasOneActivatedRequestTaked={hasOneActivatedRequestTaked}
          />
        </div>
      </FormModalButtonInput>
    </div>
  );
}
