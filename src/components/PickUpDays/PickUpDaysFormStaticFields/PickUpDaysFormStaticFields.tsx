import React, { useEffect, useState } from "react";
import { useGetFlowsQuery } from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import { removeNulls } from "../../../lib/utilities";
import FormInput from "../../Form/FormInput/FormInput";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import { ICommonSelectOption } from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import "./pick-up-days-form-static-fields.scss";

export interface IPickUpDaysFormStaticFieldsLabels {
  staticName: string;
  staticFlow: string;
}

interface IPickUpDaysFormStaticFieldsProps {
  labels: IPickUpDaysFormStaticFieldsLabels;
}
export default function PickUpDaysFormStaticFields({
  labels,
}: IPickUpDaysFormStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  /*Local Data */
  const { contractId } = useContract();

  const { data } = useGetFlowsQuery({
    variables: {
      contractId: contractId,
    },
    fetchPolicy: "cache-and-network",
  });

  const [activeFlowOptions, setActiveFlowOptions] = useState<
    Array<ICommonSelectOption>
  >([]);

  useEffect(() => {
    if (data) {
      setActiveFlowOptions(
        data?.flows?.data
          ?.map((flow) => {
            if (flow.id && flow.attributes?.name) {
              return { label: flow.attributes.name, value: flow.id };
            }
          })
          .filter(removeNulls) ?? [],
      );
    }
  }, [data]);

  return (
    <>
      <div className="c-PickUpDaysStaticFields">
        <div className="c-PickUpDaysStaticFields__RequiredLabel">
          {mandatoryFields}
        </div>
        <FormInput
          type="text"
          name="name"
          label={labels.staticName}
          isRequired={true}
          maxLengthValidation={50}
        />
      </div>
      <div className="c-PickUpDaysStaticFields">
        <FormRadioInput
          name="flow"
          displayName={labels.staticFlow}
          displayMode="vertical"
          options={activeFlowOptions}
        />
      </div>
    </>
  );
}
