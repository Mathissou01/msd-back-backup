import { FieldValues } from "react-hook-form/dist/types/fields";
import {
  IFormBlock,
  TDynamicFieldConfiguration,
} from "../../lib/dynamic-blocks";
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
import RequestStaticFieldsUser, {
  TRequestStaticUser,
} from "./RequestStaticUser/RequestStaticUser";

export interface IRequestStaticFields extends IFormCommonFields {
  name: string;
  aggregate: RequestAggregateEntity | null;
  isActivated: boolean;
  blockText: string;
  hasSeveralRequestTypes?: string;
  requestType?: Array<IFormBlock>;
  status?: EStatus;
  hasUser: boolean;
  displayUserCivility: string;
  isUserNameMandatory: string;
  isUserEmailMandatory: string;
  isUserPhoneMandatory: string;
  userAllowSMSNotification: boolean;
  hasAddress: boolean;
  fieldAddressLabel: string;
}

export interface IRequestType {
  id: string;
  title: string;
  isEmail?: boolean | null;
  email?: string | null;
  isTSMS?: boolean | null;
}

export interface IRequestFields extends IRequestStaticFields {
  addableBlocks: Array<IFormBlock>;
}

interface IRequestFormProps {
  isCreateMode: boolean;
  data?: IRequestFields;
  staticFieldsOverride?: Array<TRequestStaticFields>;
  staticFieldsUserOverride?: Array<TRequestStaticUser>;
  dynamicFieldConfigurations: Array<TDynamicFieldConfiguration>;
  requestTypeDynamicFieldConfigurations: Array<TDynamicFieldConfiguration>;
  onCancel: () => void;
  onSubmit: (data: FieldValues, type?: string) => void;
  onChangeActivated: () => void;
  labels: IRequestStaticFieldsLabels;
  buttonLabels?: IRequestFormButtonsLabels;
}

export default function RequestForm({
  isCreateMode,
  data,
  staticFieldsOverride,
  staticFieldsUserOverride,
  dynamicFieldConfigurations,
  requestTypeDynamicFieldConfigurations,
  onCancel,
  onSubmit,
  onChangeActivated,
  labels,
  buttonLabels,
}: IRequestFormProps) {
  const buttonContent = (
    <RequestFormButtons<IRequestStaticFields>
      isCreateMode={isCreateMode}
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
        requestTypeDynamicFieldConfigurations={
          requestTypeDynamicFieldConfigurations
        }
      />
      <FormDynamicBlocks
        name={"addableBlocks"}
        blockConfigurations={dynamicFieldConfigurations}
        canDuplicate={false}
      />
      <RequestStaticFieldsUser
        labels={labels.user}
        enabledFieldsOverride={staticFieldsUserOverride}
        hasUser={data?.hasUser ?? false}
      />
    </>
  );
  const sidebarContent = <RequestSideBar />;
  const formOptions: IFormlayoutOptions<IRequestFields> = {
    onSubmitValid: onSubmit,
    defaultValues: data,
    nestedFieldsToFocus: ["addableBlocks", "requestType"],
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
