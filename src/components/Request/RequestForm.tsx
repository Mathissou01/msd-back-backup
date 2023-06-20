import { FieldValues } from "react-hook-form/dist/types/fields";
import { IFormBlock, TDynamicFieldOption } from "../../lib/dynamic-blocks";
import { EStatus } from "../../lib/status";
import { IFormCommonFields } from "../../lib/form";
import { RequestAggregateEntity } from "../../graphql/codegen/generated-types";
import FormLayout, {
  IFormlayoutOptions,
} from "../../layouts/FormLayout/FormLayout";
import FormDynamicBlocks from "../Form/FormDynamicBlocks/FormDynamicBlocks";
import RequestStaticFields, {
  IRequestStaticFieldsLabels,
  TRequestStaticFields,
} from "./RequestStaticFields/RequestStaticFields";
import RequestSideBar from "./RequestSideBar/RequestSideBar";
import RequestFormButtons, {
  IRequestFormButtonsLabels,
} from "./RequestFormButtons/RequestFormButtons";

export interface IRequestStaticFields extends IFormCommonFields {
  name: string;
  aggregate: RequestAggregateEntity | null;
  isActivated: boolean;
  blockText: string;
  hasSeveralRequestTypes?: string;
  status?: EStatus;
}

export interface IRequestFields extends IRequestStaticFields {
  contentBlock: Array<IFormBlock>;
}

interface IRequestFormProps {
  isCreatedMode: boolean;
  data?: IRequestFields;
  staticFieldsOverride?: Array<TRequestStaticFields>;
  dynamicFieldsOptions: Array<TDynamicFieldOption>;
  onCancel: () => void;
  onSubmit: (data: FieldValues, type?: string) => void;
  onChangeActivated: () => void;
  labels: IRequestStaticFieldsLabels;
  buttonLabels?: IRequestFormButtonsLabels;
}

export default function RequestForm({
  isCreatedMode,
  data,
  staticFieldsOverride,
  dynamicFieldsOptions,
  onCancel,
  onSubmit,
  onChangeActivated,
  labels,
  buttonLabels,
}: IRequestFormProps) {
  const buttonContent = (
    <RequestFormButtons<IRequestStaticFields>
      isCreatedMode={isCreatedMode}
      onCancel={onCancel}
      labels={buttonLabels}
      isActivated={data ? data?.isActivated : false}
      onSubmit={onSubmit}
      onChangeActivated={onChangeActivated}
    />
  );
  const fieldContent = (
    <>
      <RequestStaticFields
        labels={labels}
        enabledFieldsOverride={staticFieldsOverride}
      />
      <FormDynamicBlocks
        name={"contentBlock"}
        blockOptions={dynamicFieldsOptions}
      />
    </>
  );
  const sidebarContent = <RequestSideBar />;
  const formOptions: IFormlayoutOptions<IRequestFields> = {
    onSubmitValid: onSubmit,
    defaultValues: data,
    nestedFieldsToFocus: ["contentBlock"],
  };

  return (
    <FormLayout<IRequestFields>
      buttonContent={buttonContent}
      formContent={fieldContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
    />
  );
}
