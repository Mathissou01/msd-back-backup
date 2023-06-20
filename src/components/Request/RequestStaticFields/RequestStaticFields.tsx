import { useEffect, useState } from "react";
import { removeNulls } from "../../../lib/utilities";
import { useContract } from "../../../hooks/useContract";
import {
  RequestAggregateEntity,
  useGetRequestAggregatesByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormInput from "../../Form/FormInput/FormInput";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import FormWysiwyg from "../../Form/FormWysiwyg/FormWysiwyg";
import "./request-static-fields.scss";

export interface IRequestStaticFieldsLabels {
  staticName: string;
  staticMaxCharacters: string;
  staticAggregateLabel: string;
  staticAggregateInformation: string;
  staticWysiwygText: string;
  subStaticWysiwygText: string;
}

export type TRequestStaticFields = "name" | "aggregate" | "blockText";

interface IRequestStaticFieldsProps {
  labels: IRequestStaticFieldsLabels;
  enabledFieldsOverride?: Array<TRequestStaticFields>;
}

export default function RequestStaticFields({
  labels,
  enabledFieldsOverride,
}: IRequestStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

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
              optionKey={"id"}
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
    </>
  );
}
