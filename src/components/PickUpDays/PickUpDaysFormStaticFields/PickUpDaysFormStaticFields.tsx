import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  RequestEntity,
  useGetActiveRequestsByContractIdQuery,
  useGetCollectDoorToDoorsByFlowIdQuery,
  useGetCollectVoluntariesByFlowIdQuery,
  useGetActiveFlowsByContractIdAndSectorizationsIdLazyQuery,
  useGetActiveFlowsByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import FormInput from "../../Form/FormInput/FormInput";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormMultiCheckbox from "../../Form/FormMultiCheckbox/FormMultiCheckbox";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import SectorizationOrCityFields, {
  ISectorizationOrCityFieldsLabels,
} from "./SectorizationOrCityFields/SectorizationOrCityFields";
import { IFormSingleMultiselectOption } from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import {
  EMonthlyStatus,
  EPeriodicityStatus,
  dayOptions,
  periodicityOptions,
  recurrenceOptions,
  EPickUpDayCollectType,
} from "../../../lib/pickup-days";
import FormLabel from "../../Form/FormLabel/FormLabel";
import "./pick-up-days-form-static-fields.scss";

export interface IPickUpDaysFormStaticFieldsLabels {
  staticName: string;
  staticPlace: string;
  staticPlaceDescription: string;
  staticSectorizationOrCityLabels: ISectorizationOrCityFieldsLabels;
  staticFlow: string;
  staticPickUpDay: string;
  staticPeriodicite: string;
  staticRecurrence: string;
  staticDayOfTheMonth: string;
  staticDays: string;
  staticPickUpHours: string;
  staticIncludeHoliday: string;
  staticComplementaryMention: string;
  staticShortCutForm: string;
  staticLabelForm: string;
  staticFormRadioBtn: string;
  staticExternalLinkRadioBtn: string;
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
  const externalLinkRegex =
    //eslint-disable-next-line
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const externalLintMsgError = "le format d'url n'est pas correct";

  /* Local Data */
  const { contractId } = useContract();
  const { watch, setValue } = useFormContext();
  const [periodicityStatus, setPeriodicityStatus] = useState<boolean>(true);
  const [recurrenceStatus, setRecurrenceStatus] = useState<boolean>();
  const [shortcutFormStatus, setShortcutFormStatus] = useState<string>("form");
  const [activeFlowOptions, setActiveFlowOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const [collectOptions, setCollectOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const [collectDoorToDoorOptions, setCollectDoorToDoorOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const [CollectVoluntariesOptions, setCollectVoluntariesOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const pickUpId = watch("pickUpId");
  const periodicity = watch("periodicity");
  const recurrence = watch("choice");
  const includeHoliday = watch("pickUpHours");
  const shortcutFormMode = watch("shortcutFormMode");
  const flow = watch("flow");
  const sectorizations = watch("sectorizations");

  /* External Data */
  const { data: flowsData } = useGetActiveFlowsByContractIdQuery({
    variables: {
      contractId: contractId,
    },
    fetchPolicy: "cache-and-network",
  });
  const { data: activeRequestData } = useGetActiveRequestsByContractIdQuery({
    variables: {
      contractId,
    },
  });
  const { data: collectDoorToDoorsData } =
    useGetCollectDoorToDoorsByFlowIdQuery({
      variables: { flowId: flow },
      fetchPolicy: "network-only",
    });
  const { data: collectVoluntariesData } =
    useGetCollectVoluntariesByFlowIdQuery({
      variables: { flowId: flow },
      fetchPolicy: "network-only",
    });
  const [
    getFilteredFlows,
    {
      data: filteredFlowsData,
      loading: filteredFlowsLoading,
      error: filteredFlowsError,
    },
  ] = useGetActiveFlowsByContractIdAndSectorizationsIdLazyQuery({
    fetchPolicy: "no-cache",
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
      if (sectorizations && sectorizations.length > 0) {
        const filterFlowQueryVariables = {
          contractId,
          sectorizationsId: sectorizations.map(
            (sector: IFormSingleMultiselectOption) => sector.value,
          ),
        };
        getFilteredFlows({
          variables: filterFlowQueryVariables,
        });
        if (filteredFlowsData?.flows?.data) {
          setActiveFlowOptions(
            filteredFlowsData.flows.data
              .map((flow) => {
                if (
                  flow.attributes?.pickUpDays?.data &&
                  flow.attributes.pickUpDays.data.length === 0
                ) {
                  if (flow.id && flow.attributes?.name) {
                    return {
                      label: flow.attributes.name,
                      value: flow.id,
                    };
                  }
                } else if (
                  flow.attributes?.pickUpDays?.data &&
                  flow.attributes.pickUpDays.data.length > 0 &&
                  flow.attributes.pickUpDays.data.find(
                    (x) => Number(x.id) === Number(pickUpId),
                  )
                ) {
                  if (flow.id && flow.attributes?.name) {
                    return {
                      label: flow.attributes.name,
                      value: flow.id,
                    };
                  }
                }
              })
              .filter(removeNulls) ?? [],
          );
        }
      } else {
        setActiveFlowOptions(
          flowsData?.flows?.data
            ?.map((flow) => {
              if (flow.id && flow.attributes?.name) {
                return {
                  label: flow.attributes.name,
                  value: flow.id,
                };
              }
            })
            .filter(removeNulls) ?? [],
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowsData, sectorizations, contractId, pickUpId]);

  useEffect(() => {
    if (
      collectDoorToDoorOptions.length > 0 &&
      CollectVoluntariesOptions.length > 0
    ) {
      const mergedOptions = [
        ...collectDoorToDoorOptions,
        ...CollectVoluntariesOptions,
      ];
      setCollectOptions(mergedOptions);
    }
  }, [collectDoorToDoorOptions, CollectVoluntariesOptions]);

  useEffect(() => {
    if (collectDoorToDoorsData && collectDoorToDoorsData.collectDoorToDoors) {
      setCollectDoorToDoorOptions(
        collectDoorToDoorsData.collectDoorToDoors?.data
          ?.map((collectDoorToDoorsItem) => {
            if (
              collectDoorToDoorsItem.id &&
              collectDoorToDoorsItem.attributes?.name
            ) {
              return {
                value: `${EPickUpDayCollectType.DOOR_TO_DOOR}${collectDoorToDoorsItem.id}`,
                label: collectDoorToDoorsItem.attributes.name,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [collectDoorToDoorsData]);

  useEffect(() => {
    if (collectVoluntariesData && collectVoluntariesData.collectVoluntaries) {
      setCollectVoluntariesOptions(
        collectVoluntariesData.collectVoluntaries.data
          .map((collectVoluntary) => {
            if (collectVoluntary.id && collectVoluntary.attributes?.name) {
              return {
                value: `${EPickUpDayCollectType.VOLUNTARY}${collectVoluntary.id}`,
                label: collectVoluntary.attributes.name,
              };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [collectVoluntariesData]);

  useEffect(() => {
    if (shortcutFormMode) {
      setShortcutFormStatus(shortcutFormMode);
    }
  }, [shortcutFormMode]);

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
    <>
      <div className="o-Form__Group">
        {mandatoryFields}
        <FormInput
          type="text"
          name="name"
          label={labels.staticName}
          isRequired
          maxLengthValidation={maxCharacters}
        />
      </div>
      <div className="o-Form__Group">
        <div className="c-PickUpDaysStaticFields__Label">
          {labels.staticPlace}
        </div>
        <div className="c-PickUpDaysStaticFields__Description">
          {labels.staticPlaceDescription}
        </div>
        <SectorizationOrCityFields
          labels={labels.staticSectorizationOrCityLabels}
        />
      </div>
      <div className="o-Form__Group">
        <CommonLoader
          isLoading={filteredFlowsLoading}
          isShowingContent={filteredFlowsLoading}
          errors={[filteredFlowsError]}
        >
          <FormRadioInput
            name="flow"
            displayName={labels.staticFlow}
            displayMode="vertical"
            options={activeFlowOptions}
            isRequired
          />
        </CommonLoader>
      </div>
      {collectOptions.length > 0 && (
        <div className="o-Form__Group">
          <FormRadioInput
            name="collects"
            displayName={labels.staticPickUpDay}
            displayMode="horizontal"
            options={collectOptions}
            defaultValue={collectOptions[0]?.value}
            isRequired
          />
        </div>
      )}
      <div className="o-Form__Group">
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
      <div className="o-Form__Group">
        <div className="c-PickUpDaysStaticFields__Title">
          {labels.staticShortCutForm}
        </div>
        <FormInput
          type="text"
          name="buttonLabel"
          label={labels.staticLabelForm}
        />
        <div className="c-PickUpDaysStaticFields__Option">
          <input
            className={`c-PickUpDaysStaticFields__Input ${
              shortcutFormStatus === "form"
                ? "c-PickUpDaysStaticFields__Input_checked"
                : ""
            }`}
            type="radio"
            value="form"
            name="form"
            id="form"
            checked={shortcutFormStatus === "form"}
            onChange={() => {
              setShortcutFormStatus("form");
              setValue("externalLink", null);
            }}
          />
          <FormLabel label={labels.staticFormRadioBtn} forId="form" />
          <input
            className={`c-PickUpDaysStaticFields__Input ${
              shortcutFormStatus === "link"
                ? "c-PickUpDaysStaticFields__Input_checked"
                : ""
            }`}
            type="radio"
            value="link"
            name="link"
            id="link"
            checked={shortcutFormStatus === "link"}
            onChange={() => {
              setShortcutFormStatus("link");
              setValue("request", null);
            }}
          />
          <FormLabel label={labels.staticExternalLinkRadioBtn} forId="link" />
        </div>
        {shortcutFormStatus === "form" && activeRequestData?.requests ? (
          <FormSelect<RequestEntity>
            name="request"
            label=""
            options={activeRequestData.requests.data.map((request) => {
              return { option: request };
            })}
            optionKey="id"
            displayTransform={(value: RequestEntity) =>
              value.attributes?.name ?? ""
            }
            defaultValue={activeRequestData.requests.data[0] ?? undefined}
          />
        ) : (
          <FormInput
            type="url"
            name="externalLink"
            label=""
            placeholder="https://"
            patternValidation={externalLinkRegex}
            patternValidationErrorMessage={externalLintMsgError}
          />
        )}
      </div>
    </>
  );
}
