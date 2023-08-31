import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TDynamicFieldConfiguration } from "../../../../lib/dynamic-blocks";
import FormRadioInput from "../../../Form/FormRadioInput/FormRadioInput";
import FormDynamicBlocks from "../../../Form/FormDynamicBlocks/FormDynamicBlocks";
import RequestTypeBlock from "../../../Form/FormDynamicBlocks/DynamicBlocks/Request/RequestTypeBlock/RequestTypeBlock";

export interface IRequestStaticRequestTypesLabels {
  staticRadioRequestType: string;
  staticOneRequestType: string;
  staticSeveralRequestType: string;
}

interface IRequestStaticRequestTypesProps {
  labels: IRequestStaticRequestTypesLabels;
  requestTypeDynamicFieldConfigurations: Array<TDynamicFieldConfiguration>;
}

export default function RequestStaticRequestTypes({
  labels,
  requestTypeDynamicFieldConfigurations,
}: IRequestStaticRequestTypesProps) {
  /* Methods */
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
  const { getValues, setValue, resetField } = useFormContext();
  const [isSeveral, setIsSeveral] = useState<boolean>(
    getValues("hasSeveralRequestTypes") !== "0",
  );

  return (
    <>
      <FormRadioInput
        name="hasSeveralRequestTypes"
        displayName={labels.staticRadioRequestType}
        options={[
          {
            value: "0",
            label: labels.staticOneRequestType,
          },
          {
            value: "1",
            label: labels.staticSeveralRequestType,
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
    </>
  );
}
