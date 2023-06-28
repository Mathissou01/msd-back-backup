import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useGetFlowsQuery } from "../../../graphql/codegen/generated-types";
import FormInput from "../../Form/FormInput/FormInput";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import { ICommonSelectOption } from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormMultiCheckbox from "../../Form/FormMultiCheckbox/FormMultiCheckbox";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";
import SectorizationOrCityFields, {
  ISectorizationOrCityFieldsLabels,
} from "./SectorizationOrCityFields/SectorizationOrCityFields";
import {
  EMonthlyStatus,
  EPeriodicityStatus,
  dayOptions,
  periodicityOptions,
  recurrenceOptions,
} from "../../../lib/pickup-days";
import "./pick-up-days-form-static-fields.scss";

export interface IPickUpDaysFormStaticFieldsLabels {
  staticName: string;
  staticPlace: string;
  staticPlaceDescription: string;
  staticSectorizationOrCityLabels: ISectorizationOrCityFieldsLabels;
  staticFlow: string;
  staticPeriodicite: string;
  staticRecurrence: string;
  staticDayOfTheMonth: string;
  staticDays: string;
  staticPickUpHours: string;
  staticIncludeHoliday: string;
  staticComplementaryMention: string;
}

interface IPickUpDaysFormStaticFieldsProps {
  labels: IPickUpDaysFormStaticFieldsLabels;
}
export default function PickUpDaysFormStaticFields({
  labels,
}: IPickUpDaysFormStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";
  const maxCharacters = 50;

  /* Local Data */
  const { contractId } = useContract();
  const { watch } = useFormContext();
  const [periodicityStatus, setPeriodicityStatus] = useState<boolean>(true);
  const [recurrenceStatus, setRecurrenceStatus] = useState<boolean>();
  const [activeFlowOptions, setActiveFlowOptions] = useState<
    Array<ICommonSelectOption>
  >([]);
  const periodicity = watch("periodicity");
  const recurrence = watch("choice");
  const includeHoliday = watch("pickUpHours");
  const { data: flowsData } = useGetFlowsQuery({
    variables: {
      contractId: contractId,
    },
    fetchPolicy: "cache-and-network",
  });

  /* Methods */
  const daysOfTheMonth = (): IOptionWrapper<string>[] => {
    const arr: IOptionWrapper<string>[] = [];
    const len = 31;
    for (let i = 1; i <= len; i++) {
      arr.push({
        label: i.toString(),
        option: i.toString(),
      });
    }
    return arr;
  };

  useEffect(() => {
    if (flowsData) {
      setActiveFlowOptions(
        flowsData?.flows?.data
          ?.map((flow) => {
            if (flow.id && flow.attributes?.name) {
              return { label: flow.attributes.name, value: flow.id };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [flowsData]);

  useEffect(() => {
    if (periodicity !== undefined)
      if (periodicity === EPeriodicityStatus.WEEKLY) setPeriodicityStatus(true);
      else {
        setPeriodicityStatus(false);
        if (recurrence === EMonthlyStatus.MONTHLY_DATE)
          setRecurrenceStatus(true);
        else setRecurrenceStatus(false);
      }
  }, [periodicity, recurrence, includeHoliday]);

  return (
    <div className="c-PickUpDaysStaticFields">
      <div className="c-PickUpDaysStaticFields__Wrapper">
        <div className="c-PickUpDaysStaticFields__RequiredLabel">
          {mandatoryFields}
        </div>
        <FormInput
          type="text"
          name="name"
          label={labels.staticName}
          isRequired={true}
          maxLengthValidation={maxCharacters}
        />
      </div>
      <div className="c-PickUpDaysStaticFields__Wrapper">
        <span className="c-PickUpDaysStaticFields__Label">
          {labels.staticPlace}
        </span>
        <span className="c-PickUpDaysStaticFields__Description">
          {labels.staticPlaceDescription}
        </span>
        <SectorizationOrCityFields
          labels={labels.staticSectorizationOrCityLabels}
        />
      </div>
      <div className="c-PickUpDaysStaticFields__Wrapper">
        <FormRadioInput
          name="flow"
          displayName={labels.staticFlow}
          displayMode="vertical"
          options={activeFlowOptions}
          isRequired={true}
        />
      </div>
      <div className="c-PickUpDaysStaticFields__Wrapper">
        <div className="c-PickUpDaysStaticFields__FormGroupFlex">
          <FormSelect
            name="periodicity"
            label={labels.staticPeriodicite}
            options={periodicityOptions}
            defaultValue={periodicityOptions[0].option}
            isRequired
          />
          {!periodicityStatus && (
            <FormSelect
              name="choice"
              label={labels.staticRecurrence}
              options={recurrenceOptions}
              isRequired={!periodicityStatus}
              defaultValue={EMonthlyStatus.MONTHLY_FIRST}
            />
          )}
        </div>
        <div className="c-PickUpDaysStaticFields__FormGroupFlex">
          {periodicityStatus && (
            <FormMultiCheckbox
              name="days"
              label={labels.staticDays}
              options={dayOptions}
              isRequired={periodicityStatus}
            />
          )}
          {!periodicityStatus && recurrenceStatus && (
            <FormSelect
              name="daysOfTheMonth"
              label={labels.staticDayOfTheMonth}
              options={daysOfTheMonth()}
              defaultValue={"1"}
            />
          )}
          {!periodicityStatus && !recurrenceStatus && (
            <FormRadioInput
              displayName={labels.staticDays}
              name="days"
              options={dayOptions}
              isRequired={!recurrenceStatus}
            />
          )}
        </div>
        <div className="c-PickUpDaysStaticFields__FormGroup">
          <FormCheckbox
            name="includeHoliday"
            label={labels.staticIncludeHoliday}
          />
        </div>
        <div className="c-PickUpDaysStaticFields__FormGroup">
          <FormInput
            name="pickUpHours"
            label={labels.staticPickUpHours}
            type="time"
          />
        </div>
        <div className="c-PickUpDaysStaticFields__FormGroup">
          <FormInput
            name="complementaryMention"
            label={labels.staticComplementaryMention}
            tagType="textarea"
            maxLengthValidation={100}
          />
        </div>
      </div>
    </div>
  );
}
