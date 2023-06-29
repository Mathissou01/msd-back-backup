import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { removeNulls } from "../../../lib/utilities";
import { TDynamicFieldConfiguration } from "../../../lib/dynamic-blocks";
import { useContract } from "../../../hooks/useContract";
import {
  RequestAggregateEntity,
  useGetRequestAggregatesByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormInput from "../../Form/FormInput/FormInput";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import FormWysiwyg from "../../Form/FormWysiwyg/FormWysiwyg";
import RequestAddressFields, {
  IRequestAddressFields,
} from "../RequestAddressFields/RequestAddressFields";
import { IRequestStaticUserLabels } from "../RequestStaticUser/RequestStaticUser";
import FormDynamicBlocks from "../../Form/FormDynamicBlocks/FormDynamicBlocks";
import RequestTypeUnique from "../RequestTypeUnique/RequestTypeUnique";
import "./request-static-fields.scss";

export interface IRequestStaticFieldsLabels {
  staticName: string;
  staticMaxCharacters: string;
  staticAggregateLabel: string;
  staticAggregateInformation: string;
  staticWysiwygText: string;
  subStaticWysiwygText: string;
  staticRadioRequestType: string;
  oneRequestType: string;
  severalRequestType: string;
  address: IRequestAddressFields;
  user: IRequestStaticUserLabels;
}

export type TRequestStaticFields =
  | "name"
  | "aggregate"
  | "hasSeveralRequestTypes"
  | "blockText"
  | "fieldAddressLabel";

interface IRequestStaticFieldsProps {
  labels: IRequestStaticFieldsLabels;
  enabledFieldsOverride?: Array<TRequestStaticFields>;
  requestTypeDynamicFieldConfigurations: Array<TDynamicFieldConfiguration>;
}

export default function RequestStaticFields({
  labels,
  enabledFieldsOverride,
  requestTypeDynamicFieldConfigurations,
}: IRequestStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  /* Local Data */
  const { contractId } = useContract();
  const [requestAggregateOptions, setRequestAggregateOptions] = useState<
    Array<IOptionWrapper<RequestAggregateEntity>>
  >([]);

  /* External Datas */
  const { data: requestAggregatesData } =
    useGetRequestAggregatesByContractIdQuery({
      variables: { contractId, sort: "name" },
      fetchPolicy: "network-only",
    });

  /* External Data */
  const { watch, getValues, setValue } = useFormContext();
  const severalRequestType = watch("hasSeveralRequestTypes");

  /* Methods */
  function hasFieldEnabled(fieldName: TRequestStaticFields) {
    return (
      !enabledFieldsOverride ||
      enabledFieldsOverride?.find((field) => field === fieldName)
    );
  }

  function requestAggregatesSelectDisplayTransformFunction(
    requestAggregate: RequestAggregateEntity,
  ): string {
    return requestAggregate.attributes?.name ?? "";
  }

  function handleHasSeveralRequestTypes() {
    if (severalRequestType === "0") {
      setValue("requestType", [getValues("requestType")[0]]);
    }
  }

  useEffect(() => {
    if (
      requestAggregatesData &&
      requestAggregatesData.requestAggregates?.data
    ) {
      const mappedRequestAggregates: Array<IOptionWrapper<RequestAggregateEntity> | null> =
        requestAggregatesData.requestAggregates.data.map((requestAggregate) => {
          return requestAggregate ? { option: requestAggregate } : null;
        });
      setRequestAggregateOptions(mappedRequestAggregates?.filter(removeNulls));
    }
  }, [requestAggregatesData]);

  return (
    <>
      <div className="c-RequestStaticFields">
        <span className="c-RequestStaticFields__RequiredLabel">
          {mandatoryFields}
        </span>
        {hasFieldEnabled("name") && (
          <div className="c-RequestStaticFields__Name">
            <FormInput
              type="text"
              name="name"
              label={labels.staticName}
              isRequired={true}
              maxLengthValidation={60}
              validationLabel={`60 ${labels.staticMaxCharacters}`}
            />
          </div>
        )}
        {hasFieldEnabled("aggregate") && (
          <div className="c-RequestStaticFields__Aggregate">
            <FormSelect<RequestAggregateEntity>
              label={labels.staticAggregateLabel}
              name="aggregate"
              displayTransform={requestAggregatesSelectDisplayTransformFunction}
              options={requestAggregateOptions}
              optionKey="id"
              informationLabel={labels.staticAggregateInformation}
              isDisabled={requestAggregateOptions.length === 0}
            />
          </div>
        )}
        {hasFieldEnabled("blockText") && (
          <FormWysiwyg
            validationLabel={labels.subStaticWysiwygText}
            name="blockText"
            label={labels.staticWysiwygText}
            isVisible
          />
        )}
      </div>
      <div className="c-RequestStaticFields">
        {hasFieldEnabled("hasSeveralRequestTypes") && (
          <FormRadioInput
            name="hasSeveralRequestTypes"
            displayName={labels.staticRadioRequestType}
            options={[
              {
                value: "0",
                label: labels.oneRequestType,
              },
              {
                value: "1",
                label: labels.severalRequestType,
              },
            ]}
            defaultValue="0"
            onChange={() => handleHasSeveralRequestTypes()}
          />
        )}
        {severalRequestType === null || severalRequestType === "0" ? (
          <RequestTypeUnique />
        ) : (
          <FormDynamicBlocks
            name="requestType"
            blockConfigurations={requestTypeDynamicFieldConfigurations}
            canReorder={false}
            canDuplicate={false}
          />
        )}
      </div>
      <div className="c-RequestStaticFields">
        {hasFieldEnabled("fieldAddressLabel") && (
          <RequestAddressFields labels={labels.address} />
        )}
      </div>
    </>
  );
}
