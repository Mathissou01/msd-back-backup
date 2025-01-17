import React, { useEffect, useState } from "react";
import { useContract } from "../../../hooks/useContract";

import {
  GetPickUpDaysByContractIdQueryVariables,
  useGetPickUpDaysByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import FormDatePicker from "../../Form/FormDatePicker/FormDatePicker";
import FormInput from "../../Form/FormInput/FormInput";
import FormSingleMultiselect, {
  IFormSingleMultiselectOption,
} from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import "./information-message-form-static-fields.scss";

export interface IInformationMessageFormStaticFieldsLabels {
  staticName: string;
  staticPickUpDays: string;
  staticShownPeriod: string;
}

interface IInformationMessageFormStaticFieldsProps {
  labels: IInformationMessageFormStaticFieldsLabels;
}

export default function InformationMessageFormStaticFields({
  labels,
}: IInformationMessageFormStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  /*Local Data */
  const { contractId } = useContract();
  const [informationMessagesOptions, setInformationMessagesOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const defaultQueryVariables: GetPickUpDaysByContractIdQueryVariables = {
    contractId,
  };
  const { data: informationMessagesData } = useGetPickUpDaysByContractIdQuery({
    variables: defaultQueryVariables,
  });

  useEffect(() => {
    if (informationMessagesData) {
      const mappedTags: Array<IFormSingleMultiselectOption> =
        informationMessagesData.pickUpDays?.data
          .map((informationMessage) => {
            if (informationMessage.id && informationMessage.attributes?.name)
              return {
                value: informationMessage.id,
                label: informationMessage.attributes?.name,
              };
          })
          .filter(removeNulls) ?? [];
      setInformationMessagesOptions(mappedTags);
    }
  }, [informationMessagesData]);

  const sortedOptions = informationMessagesOptions
    .slice()
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <>
      <div className="o-Form__Group">
        <div className="o-Form__RequiredLabel">{mandatoryFields}</div>
        <FormInput
          type="text"
          name="infoMessage"
          label={labels.staticName}
          isRequired={true}
        />
        <FormSingleMultiselect
          label={labels.staticPickUpDays}
          name="pickUpDays"
          options={sortedOptions}
          isMulti
        />
        <div className="c-InformationMessageStaticFields__DatePicker">
          <FormDatePicker
            name="date"
            minDate={new Date()}
            label={labels.staticShownPeriod}
            selectsRange={true}
          />
        </div>
      </div>
    </>
  );
}
