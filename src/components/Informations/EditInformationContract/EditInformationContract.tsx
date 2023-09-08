import { FormProvider, useForm } from "react-hook-form";
import {
  ClientContactEntityResponse,
  Contract,
  Enum_Contract_Clienttype,
  Enum_Contract_Contractstatus,
  Maybe,
  useUpdateContractInformationsMutation,
} from "../../../graphql/codegen/generated-types";
import { IInformationContractLabels } from "../../../lib/informations";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import PageTitle from "../../PageTitle/PageTitle";
import FormInput from "../../Form/FormInput/FormInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import "./edit-information-contract.scss";

interface IEditInformationContract {
  labels: IInformationContractLabels;
  contractId: string;
  contractData: Contract;
  setEditMode: (editMode: boolean) => void;
}

interface IContractInformationsFields {
  clientName: string;
  siret: number;
  contractStatus: Enum_Contract_Contractstatus;
  isNonExclusive: boolean;
  clientType: Enum_Contract_Clienttype;
  isRVFrance: boolean;
  ccap: number;
  clear: number;
  clientContact: Maybe<ClientContactEntityResponse>;
}

export default function EditInformationContract({
  labels,
  contractId,
  contractData,
  setEditMode,
}: IEditInformationContract) {
  /* Static data */
  const formLabels = {
    mandatoryFields: "Tous les champs marqués d'une * sont obligatoire",
    contactData: {
      firstname: "Prénom",
      lastname: "Nom",
      email: "Email",
      phoneNumber: "Téléphone",
    },
    groupButtons: {
      save: "Enregistrer les modifications",
      cancel: "Annuler les modifications",
    },
  };

  function generateClientStatusOptions(
    contractStatus: Enum_Contract_Contractstatus,
  ) {
    switch (contractStatus) {
      case Enum_Contract_Contractstatus.Initialisation:
        return [
          {
            label: "Initialisation",
            option: Enum_Contract_Contractstatus.Initialisation,
          },
          {
            label: "En cours",
            option: Enum_Contract_Contractstatus.EnCours,
          },
        ];
      case Enum_Contract_Contractstatus.EnCours:
        return [
          {
            label: "En cours",
            option: Enum_Contract_Contractstatus.EnCours,
          },
          {
            label: "Activé",
            option: Enum_Contract_Contractstatus.Actif,
          },
        ];
      case Enum_Contract_Contractstatus.Actif:
        return [
          {
            label: "Activé",
            option: Enum_Contract_Contractstatus.Actif,
          },
          {
            label: "Désactivé",
            option: Enum_Contract_Contractstatus.Desactive,
          },
        ];
      case Enum_Contract_Contractstatus.Desactive:
        return [
          {
            label: "Désactivé",
            option: Enum_Contract_Contractstatus.Desactive,
          },
          {
            label: "Activé",
            option: Enum_Contract_Contractstatus.Actif,
          },
        ];
      default:
        return [];
    }
  }

  const clientIsNonExclusiveOptions = [
    {
      label: "Exclusif",
      value: "true",
    },
    {
      label: "Non exclusif",
      value: "false",
    },
  ];

  const clientTypeOptions = [
    {
      label: "Syndicat",
      value: Enum_Contract_Clienttype.Union,
    },
    {
      label: "EPCI",
      value: Enum_Contract_Clienttype.Epci,
    },
    {
      label: "Commune",
      value: Enum_Contract_Clienttype.City,
    },
  ];

  function onSubmit(values: IContractInformationsFields) {
    if (
      !!contractData.clientContact?.data?.id &&
      !!values.clientContact?.data?.attributes
    ) {
      void updateContractInformations({
        variables: {
          contractId,
          contractData: {
            clientName: values.clientName,
            siret: values.siret,
            contractStatus: values.contractStatus,
            isRVFrance: values.isRVFrance,
            ccap: values.ccap,
            clear: values.clear,
          },
          clientContactId: contractData.clientContact.data.id,
          clientContactData: {
            firstName: values.clientContact.data.attributes.firstName,
            lastName: values.clientContact.data.attributes.lastName,
            email: values.clientContact.data.attributes.email,
            phoneNumber: values.clientContact.data.attributes.phoneNumber,
          },
        },
      });
    }
  }

  const form = useForm<IContractInformationsFields>({
    defaultValues: contractData,
  });
  const { handleSubmit } = form;
  const [updateContractInformations, { loading, error }] =
    useUpdateContractInformationsMutation({
      refetchQueries: ["getContractById"],
      awaitRefetchQueries: true,
    });

  return (
    <FormProvider {...form}>
      <CommonLoader isLoading={loading} errors={[error]}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="c-EditInformationContract"
        >
          <PageTitle title={labels.title} />
          <span>{formLabels.mandatoryFields}</span>
          <h2>{labels.clientData}</h2>
          <div className="c-EditInformationContract__ContractData">
            <div className="c-EditInformationContract__Inputs">
              <FormInput
                name="clientName"
                label={labels.clientName}
                isRequired
              />
              <FormInput
                name="siret"
                label={labels.siret}
                type="text"
                patternValidation={/\d{14}/g}
              />
              <FormSelect<Enum_Contract_Contractstatus>
                name="contractStatus"
                label={labels.contractStatus}
                options={generateClientStatusOptions(
                  contractData.contractStatus,
                )}
                isRequired
              />
            </div>
            <FormRadioInput
              name="isNonExclusiveRadio"
              displayName={labels.isNonExclusive}
              defaultValue={contractData.isNonExclusive.toString()}
              options={clientIsNonExclusiveOptions}
              isDisabled
            />
            <FormRadioInput
              name="clientType"
              defaultValue={contractData.clientType}
              displayName={labels.clientType}
              options={clientTypeOptions}
              isDisabled
            />
          </div>
          <h2>{labels.contactData}</h2>
          <div className="c-EditInformationContract__ContactData">
            <div className="c-EditInformationContract__Row">
              <FormInput
                name="clientContact.data.attributes.firstName"
                label={formLabels.contactData.firstname}
                isRequired
              />
              <FormInput
                name="clientContact.data.attributes.lastName"
                label={formLabels.contactData.lastname}
                isRequired
              />
            </div>
            <div className="c-EditInformationContract__Row">
              <FormInput
                name="clientContact.data.attributes.email"
                type="email"
                label={formLabels.contactData.email}
                isRequired
              />
              <FormInput
                name="clientContact.data.attributes.phoneNumber"
                type="tel"
                label={formLabels.contactData.phoneNumber}
                isRequired
              />
            </div>
          </div>
          <h2>{labels.suezData}</h2>
          <div className="c-EditInformationContract__SuezData">
            <FormCheckbox name="isRVFrance" label={labels.isRVFrance} />
            <div>
              <FormInput name="ccap" label={labels.ccap} isRequired />
              <FormInput name="clear" label={labels.clear} isRequired />
            </div>
          </div>
          <div className="c-EditInformationContract__GroupButtons">
            <CommonButton
              label={formLabels.groupButtons.save}
              type="submit"
              style="primary"
              isDisabled={!form.formState.isDirty}
            />
            <CommonButton
              label={formLabels.groupButtons.cancel}
              type="button"
              style="secondary"
              onClick={() => setEditMode(false)}
            />
          </div>
        </form>
      </CommonLoader>
    </FormProvider>
  );
}
