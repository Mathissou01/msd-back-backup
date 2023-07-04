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
import { ITab } from "../TabBlock/TabBlock";
import FormDynamicBlocks from "../Form/FormDynamicBlocks/FormDynamicBlocks";
import RequestStaticFields, {
  IRequestStaticFieldsLabels,
} from "./RequestStaticFields/RequestStaticFields";
import RequestSideBar from "./RequestSideBar/RequestSideBar";
import RequestFormButtons, {
  IRequestFormButtonsLabels,
} from "./RequestFormButtons/RequestFormButtons";
import RequestStaticFieldsUser from "./RequestStaticUser/RequestStaticUser";
import RequestAppointmentSlots from "./RequestAppointmentSlots/RequestAppointmentSlots";

export interface IRequestStaticFields extends IFormCommonFields {
  name: string;
  aggregate: RequestAggregateEntity | null;
  isActivated: boolean;
  blockText: string;
  hasSeveralRequestTypes?: "0" | "1";
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
  hasAppointmentSlots: "0" | "1";
}

export interface IRequestFields extends IRequestStaticFields {
  addableBlocks: Array<IFormBlock>;
}

interface IRequestFormProps {
  isCreateMode: boolean;
  data?: IRequestFields;
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
  dynamicFieldConfigurations,
  requestTypeDynamicFieldConfigurations,
  onCancel,
  onSubmit,
  onChangeActivated,
  labels,
  buttonLabels,
}: IRequestFormProps) {
  const tabLabels = {
    requestForm: "Formulaire de demande",
    appointmentSlots: "Créneaux",
  };
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
  const tabs: ITab[] = [
    {
      name: "RequestForm",
      title: tabLabels.requestForm,
      content: (
        <>
          <RequestStaticFields
            labels={labels}
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
            hasUser={data?.hasUser ?? false}
          />
        </>
      ),
      isEnabled: true,
    },
    {
      name: "AppointmentSlots",
      title: tabLabels.appointmentSlots,
      content: <RequestAppointmentSlots />,
      isEnabled: true,
    },
  ];
  const sidebarContent = <RequestSideBar />;
  const formOptions: IFormlayoutOptions<IRequestFields> = {
    onSubmitValid: onSubmit,
    defaultValues: data,
    nestedFieldsToFocus: ["addableBlocks", "requestType"],
  };

  return (
    <FormLayout<IRequestFields>
      buttonContent={buttonContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
      tabs={tabs}
      tabIndex={0}
    />
  );
}
