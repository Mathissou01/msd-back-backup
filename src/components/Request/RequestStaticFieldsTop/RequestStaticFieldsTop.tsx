import { useEffect, useState } from "react";
import {
  RequestAggregateEntity,
  useGetRequestAggregatesByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { TDynamicFieldConfiguration } from "../../../lib/dynamic-blocks";
import { useContract } from "../../../hooks/useContract";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormInput from "../../Form/FormInput/FormInput";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import FormWysiwyg from "../../Form/FormWysiwyg/FormWysiwyg";
import RequestStaticRequestTypes, {
  IRequestStaticRequestTypesLabels,
} from "./RequestStaticRequestTypes/RequestStaticRequestTypes";
import RequestStaticAddress, {
  IRequestStaticAddressLabels,
} from "./RequestStaticAddress/RequestStaticAddress";
import "./request-static-fields-top.scss";

export interface IRequestStaticFieldsTopLabels {
  staticName: string;
  staticMaxCharacters: string;
  staticAggregateLabel: string;
  staticAggregateInformation: string;
  staticWysiwygText: string;
  subStaticWysiwygText: string;
  requestTypes: IRequestStaticRequestTypesLabels;
  address: IRequestStaticAddressLabels;
}

interface IRequestStaticFieldsTopProps {
  labels: IRequestStaticFieldsTopLabels;
  requestTypeDynamicFieldConfigurations: Array<TDynamicFieldConfiguration>;
}

export default function RequestStaticFieldsTop({
  labels,
  requestTypeDynamicFieldConfigurations,
}: IRequestStaticFieldsTopProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  /* Methods */
  function requestAggregatesSelectDisplayTransformFunction(
    requestAggregate: RequestAggregateEntity,
  ): string {
    return requestAggregate.attributes?.name ?? "";
  }

  /* Local Data */
  const { contractId } = useContract();
  const [requestAggregateOptions, setRequestAggregateOptions] = useState<
    Array<IOptionWrapper<RequestAggregateEntity>>
  >([]);

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
      <div className="o-Form__Group">
        <span className="o-Form__RequiredLabel">{mandatoryFields}</span>
        <FormInput
          type="text"
          name="name"
          label={labels.staticName}
          isRequired={true}
          maxLengthValidation={50}
          validationLabel={`50 ${labels.staticMaxCharacters}`}
        />
        <div className="c-RequestStaticFieldsTop__Aggregate">
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
      <div className="o-Form__Group">
        <RequestStaticRequestTypes
          labels={labels.requestTypes}
          requestTypeDynamicFieldConfigurations={
            requestTypeDynamicFieldConfigurations
          }
        />
      </div>
      <div className="o-Form__Group">
        <RequestStaticAddress labels={labels.address} />
      </div>
    </>
  );
}
