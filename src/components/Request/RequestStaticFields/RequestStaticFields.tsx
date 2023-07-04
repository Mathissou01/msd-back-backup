import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  RequestAggregateEntity,
  useGetRequestAggregatesByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { TDynamicFieldConfiguration } from "../../../lib/dynamic-blocks";
import { useContract } from "../../../hooks/useContract";
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
import RequestTypeBlock from "../../Form/FormDynamicBlocks/DynamicBlocks/RequestTypeBlock/RequestTypeBlock";
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

interface IRequestStaticFieldsProps {
  labels: IRequestStaticFieldsLabels;
  requestTypeDynamicFieldConfigurations: Array<TDynamicFieldConfiguration>;
}

export default function RequestStaticFields({
  labels,
  requestTypeDynamicFieldConfigurations,
}: IRequestStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  /* Methods */
  function requestAggregatesSelectDisplayTransformFunction(
    requestAggregate: RequestAggregateEntity,
  ): string {
    return requestAggregate.attributes?.name ?? "";
  }

  function handleRequestTypesSwitch() {
    const hasSeveralRequestTypes = getValues("hasSeveralRequestTypes");
    if (hasSeveralRequestTypes === "0") {
      const existingValue = getValues("requestType.0");
      delete existingValue.title;
      setValue("requestType", [existingValue]);
    } else {
      resetField("requestType");
    }
    setIsSeveral(hasSeveralRequestTypes !== "0");
  }

  /* Local Data */
  const { contractId } = useContract();
  const [requestAggregateOptions, setRequestAggregateOptions] = useState<
    Array<IOptionWrapper<RequestAggregateEntity>>
  >([]);
  const { getValues, setValue, resetField } = useFormContext();
  const [isSeveral, setIsSeveral] = useState<boolean>(
    getValues("hasSeveralRequestTypes") !== "0",
  );

  const { data: requestAggregatesData } =
    useGetRequestAggregatesByContractIdQuery({
      variables: { contractId, sort: "name" },
      fetchPolicy: "network-only",
    });

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
        <div className="c-RequestStaticFields__Name">
          <FormInput
            type="text"
            name="name"
            label={labels.staticName}
            isRequired={true}
            maxLengthValidation={50}
            validationLabel={`50 ${labels.staticMaxCharacters}`}
          />
        </div>
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
        <FormWysiwyg
          validationLabel={labels.subStaticWysiwygText}
          name="blockText"
          label={labels.staticWysiwygText}
          isVisible
        />
      </div>
      <div className="c-RequestStaticFields">
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
          onChange={() => handleRequestTypesSwitch()}
        />
        {!isSeveral ? (
          <RequestTypeBlock blockName="requestType.0" hasTitleField={false} />
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
        <RequestAddressFields labels={labels.address} />
      </div>
    </>
  );
}
