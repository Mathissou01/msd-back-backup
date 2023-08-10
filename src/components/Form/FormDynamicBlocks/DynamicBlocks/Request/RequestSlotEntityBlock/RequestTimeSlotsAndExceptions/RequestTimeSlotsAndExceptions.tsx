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
import CommonButton from "../../../../../../Common/CommonButton/CommonButton";
import "./request-time-slots-and-exceptions.scss";

interface IRequestSlotsAndExceptionsInput {
  slotType?: Enum_Requestslot_Slottype;
  timeSlots?: Scalars["JSON"];
  slotExceptions?: Array<ComponentBlocksRequestSlotsExceptions>;
}

interface IRequestSlotsAndExceptionsModalFields {
  slotType: Enum_Requestslot_Slottype;
  timeSlots: Scalars["JSON"];
  slotExceptions: Array<ComponentBlocksRequestSlotsExceptions>;
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
    addExceptionButton: string;
    saveButton: string;
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
      parseSlotsExceptions(timeSlotsAndExceptions?.slotExceptions) ?? [];
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
    return (input.slotType && !!input.timeSlots) || labels.validationError;
  }

  function handleModalSubmit(
    submitData: IRequestSlotsAndExceptionsModalFields,
  ): IRequestSlotsAndExceptionsInput {
    const newSlotType = submitData.slotType;
    const newTimeSlots = submitData.timeSlots;
    const newSlotExceptions = submitData.slotExceptions;
    setValue(slotTypeName, newSlotType);
    setValue(timeSlotsName, newTimeSlots);
    setValue(exceptionsName, newSlotExceptions);
    return {
      slotType: newSlotType,
      timeSlots: newTimeSlots,
      slotExceptions: newSlotExceptions,
    };
  }

  /* Local Data */
  const { getValues, setValue } = useFormContext();
  const existingSlotType: Enum_Requestslot_Slottype =
    getValues(slotTypeName) ?? Enum_Requestslot_Slottype.Weekly;
  const existingTimeSlots: TWeeklySlots = getValues(timeSlotsName);
  const existingSlotExceptions: Array<ComponentBlocksRequestSlotsExceptions> =
    getValues(exceptionsName);
  // If no existing values for modal fields, defaultValues is empty
  const defaultValues: IRequestSlotsAndExceptionsInput | undefined =
    Object.values(existingTimeSlots).length > 0 ||
    existingSlotExceptions?.length > 0
      ? {
          slotType: existingSlotType,
          timeSlots: existingTimeSlots,
          slotExceptions: existingSlotExceptions,
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
        isRequired
        onValidate={handleTimeSlotsAndExceptionsValidation}
        onModalSubmit={handleModalSubmit}
      >
        <div className="c-RequestTimeSlotsAndExceptions__Modal">
          <FormSelect<Enum_Requestslot_Slottype>
            name="slotType"
            label={labels.modalLabels.slotType}
            options={slotTypeOptions}
            defaultValue={Enum_Requestslot_Slottype.Weekly}
            isRequired
            isDisabled={hasOneActivatedRequestTaked}
          />
          <div className="c-RequestTimeSlotsAndExceptions__ModalTimeSlots">
            <FormWeeklySlots
              name="timeSlots"
              defaultValue={existingTimeSlots}
              isRequired
              isDisabled={hasOneActivatedRequestTaked}
            />
          </div>
          <div>TODO: exceptions...</div>
          {/* TODO: if hasOneActivatedRequestTaked -> disable modifying/deleting exceptions BUT can still add a new one */}
          <div className="c-RequestTimeSlotsAndExceptions__ModalExceptions">
            <CommonButton
              label={labels.modalLabels.addExceptionButton}
              picto="warning"
            />
          </div>
        </div>
      </FormModalButtonInput>
    </div>
  );
}
