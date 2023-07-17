import { FieldValues } from "react-hook-form/dist/types/fields";
import { RequestAggregateEntity } from "../../graphql/codegen/generated-types";
import {
  IFormBlock,
  TDynamicFieldConfiguration,
} from "../../lib/dynamic-blocks";
import { EStatus } from "../../lib/status";
import { IFormCommonFields } from "../../lib/form";
import FormLayout, {
  IFormlayoutOptions,
} from "../../layouts/FormLayout/FormLayout";
import { IFormLayoutTab } from "../../layouts/FormLayout/FormLayoutTabBlock/FormLayoutTabBlock";
import FormDynamicBlocks from "../Form/FormDynamicBlocks/FormDynamicBlocks";
import RequestSideBar from "./RequestSideBar/RequestSideBar";
import RequestFormButtons, {
  IRequestFormButtonsLabels,
} from "./RequestFormButtons/RequestFormButtons";
import RequestAppointmentSlots, {
  IRequestAppointmentSlotsLabels,
} from "./RequestAppointmentSlots/RequestAppointmentSlots";
import RequestStaticFieldsBottom, {
  IRequestStaticFieldsBottomLabels,
} from "./RequestStaticFieldsBottom/RequestStaticFieldsBottom";
import RequestStaticFieldsTop, {
  IRequestStaticFieldsTopLabels,
} from "./RequestStaticFieldsTop/RequestStaticFieldsTop";

export interface IRequestStaticFields extends IFormCommonFields {
  status?: EStatus;
  name: string;
  blockText: string;
  isActivated: boolean;
  hasSeveralRequestTypes?: "0" | "1";
  aggregate: RequestAggregateEntity | null;
  requestType?: Array<IFormBlock>;
  hasAddress: boolean;
  fieldAddressLabel: string;
  hasUser: boolean;
  displayUserCivility: string;
  isUserNameMandatory: string;
  isUserEmailMandatory: string;
  isUserPhoneMandatory: string;
  userAllowSMSNotification: boolean;
  confirmationMessage: string;
  sendProofOfReceipt: boolean;
  proofOfReceiptSubject: string;
  proofOfReceiptHeader: string;
  hasAppointmentSlots: "0" | "1";
  numberOfRequiredSlots: number;
  hoursBeforeReservationIsActivated?: number;
  slotsReservationRules?: Array<number>;
}

export interface IRequestFields extends IRequestStaticFields {
  addableBlocks: Array<IFormBlock>;
}

interface IRequestStaticFieldsLabels {
  top: IRequestStaticFieldsTopLabels;
  bottom: IRequestStaticFieldsBottomLabels;
  appointmentSlots: IRequestAppointmentSlotsLabels;
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
  /* Static data */
  const tabLabels = {
    requestForm: "Formulaire de demande",
    appointmentSlots: "Créneaux",
  };

  /* Local data */
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
  const tabs: IFormLayoutTab[] = [
    {
      name: "RequestForm",
      title: tabLabels.requestForm,
      content: (
        <>
          <RequestStaticFieldsTop
            labels={labels.top}
            requestTypeDynamicFieldConfigurations={
              requestTypeDynamicFieldConfigurations
            }
          />
          <FormDynamicBlocks
            name={"addableBlocks"}
            blockConfigurations={dynamicFieldConfigurations}
            canDuplicate={false}
          />
          <RequestStaticFieldsBottom
            labels={labels.bottom}
            hasUser={data?.hasUser ?? false}
          />
        </>
      ),
      // fieldsToFocus is useful for tabs errors management, add only required fields from each tab
      fieldsToFocus: [
        "name",
        "requestType",
        "fieldAddressLabel",
        "addableBlocks",
        "proofOfReceiptSubject",
        "proofOfReceiptHeader",
      ],
      isEnabled: true,
    },
    {
      name: "AppointmentSlots",
      title: tabLabels.appointmentSlots,
      content: <RequestAppointmentSlots labels={labels.appointmentSlots} />,
      fieldsToFocus: ["numberOfRequiredSlots", "slotsReservationRules"],
      isEnabled: true,
    },
  ];
  const sidebarContent = <RequestSideBar />;
  const formOptions: IFormlayoutOptions<IRequestFields> = {
    onSubmitValid: onSubmit,
    defaultValues: data,
    nestedFieldsToFocus: [
      "addableBlocks",
      "requestType",
      "slotsReservationRules",
    ],
  };

  return (
    <FormLayout<IRequestFields>
      buttonContent={buttonContent}
      sidebarContent={sidebarContent}
      formOptions={formOptions}
      tabs={tabs}
      defaultTab={0}
    />
  );
}
