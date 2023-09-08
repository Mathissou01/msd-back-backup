import React, { useEffect, useState } from "react";
import router from "next/router";
import { FieldValues, FormProvider, useForm, useWatch } from "react-hook-form";
import {
  ServiceType,
  useCreateEmptyContractMutation,
} from "../../graphql/codegen/generated-types";
import { IClientFields } from "../../lib/client-contract";
import FormRadioInput from "../Form/FormRadioInput/FormRadioInput";
import FormInput from "../Form/FormInput/FormInput";
import FormSelect from "../Form/FormSelect/FormSelect";
import { IOptionWrapper } from "../Form/FormMultiselect/FormMultiselect";
import CommonButton from "../Common/CommonButton/CommonButton";
import CommonLoader from "../Common/CommonLoader/CommonLoader";
import PageTitle from "../PageTitle/PageTitle";
import "./client-information.scss";

export default function ClientInformation() {
  /* Static Data */
  const formLabels = {
    back: "Retour",
    pageTitle: "Informations",
    client: {
      title: "Client",
      clientName: "Nom du client",
      siretNumber: "Numéro de siret",
      status: "Statut",
    },
    clientType: {
      title: "Type",
      syndicat: "Syndicat",
      EPCI: "EPCI",
      commune: "Commune",
    },
    exclusivity: {
      title: "Exclusivité",
      isExclusive: "Exclusif",
      isNotExclusive: "Non exclusif",
    },
    contact: {
      title: "Contact Client",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phoneNumber: "Téléphone",
    },
    suezData: {
      title: "Données Suez",
      servicesByRVFrance: "Services opéres par RV France",
      ccapNumber: "Numéro CCAP",
      clearNumber: "Numéro CLEAR",
      yesOption: "Oui",
      noOption: "Non",
    },
    submitButton: "Enregistrer les modifications",
    cancelButton: "Annuler",
  };

  const typeClientOptions = [
    {
      label: formLabels.clientType.syndicat,
      value: "union",
    },
    {
      label: formLabels.clientType.EPCI,
      value: "epci",
    },
    {
      label: formLabels.clientType.commune,
      value: "city",
    },
  ];
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";
  const maxCharacters = 30;
  const siretNumberMaxCharacters = 14;
  const siretNumberValidation = {
    pattern: /^\d{14}$/i,
    errorMessage: "Saisir 14 chiffres",
  };
  const emailValidation = {
    pattern:
      /^(?:[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?;)*[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/i,
    errorMessage: "Saisir une adresse mail valide",
  };
  const phoneNumberValidation = {
    pattern: /^[0-9]{10}$/,
    errorMessage: "Numéro de téléphone invalide",
  };
  const statuses = {
    initialisation: "Initialisation",
  };
  const statusOptions: IOptionWrapper<string>[] = [
    { option: statuses.initialisation, label: statuses.initialisation },
  ];

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    const isNonExclusive = submitData.isNonExclusive === "true";
    const ccap = submitData.ccap ? parseInt(submitData.ccap) : undefined;
    const clear = submitData.clear ? parseInt(submitData.clear) : undefined;
    //TODO Mock data for the moment
    const variables: IClientFields = {
      clientName: submitData.clientName,
      siretNumber: submitData.siretNumber,
      contactFirstName: submitData.contactFirstName,
      contactLastName: submitData.contactLastName,
      contactEmail: submitData.contactEmail,
      contactPhoneNumber: submitData.contactPhoneNumber,
      isRvFrance: submitData.isRvFrance === "true",
      ccap: ccap,
      clear: clear,
      clientType: submitData.clientType,
      isNonExclusive: isNonExclusive,
      servicesToActivate: [ServiceType.Event, ServiceType.PickUpDay],
      isFreemium: false,
    };
    return createEmptyContract({
      variables,
      onCompleted: (result) => {
        if (result.createEmptyContract && result.createEmptyContract[0]) {
          router.push(`/`);
        }
      },
    });
  }

  function onCancel() {
    form.reset();
    router.push(`/`);
  }

  function getDefaultStatus() {
    const status = statusOptions.find(
      (option) => option.label === statuses.initialisation,
    );
    if (status?.option) {
      return status.option;
    }
    return undefined;
  }

  /* Local data */
  const form = useForm({
    mode: "onChange",
  });
  const [isRvFrance, setIsRvFrance] = useState(true);
  const { handleSubmit, formState } = form;
  const { isDirty } = formState;

  const isRvFranceValue = useWatch({
    name: "isRvFrance",
    defaultValue: true,
    control: form.control,
  });

  useEffect(() => {
    setIsRvFrance(isRvFranceValue != "false");
  }, [isRvFranceValue]);

  /* External Data */
  const [createEmptyContract, { loading, error }] =
    useCreateEmptyContractMutation({
      awaitRefetchQueries: true,
    });

  return (
    <div className="c-ClientInformation">
      <button
        className="c-ClientInformation__BackButton"
        type="button"
        onClick={() => router.back()}
      >
        <span>{formLabels.back}</span>
      </button>
      <PageTitle title={formLabels.pageTitle} />
      <CommonLoader isLoading={loading} errors={[error]}>
        <FormProvider {...form}>
          <form
            className="c-ClientInformation__Form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="c-ClientInformation__FormGroup">
              <span className="o-Form__RequiredLabel">{mandatoryFields}</span>
              <h2>{formLabels.client.title}</h2>
              <div className="c-ClientInformation__Group">
                <div className="c-ClientInformation__Input">
                  <FormInput
                    type="text"
                    label={formLabels.client.clientName}
                    name="clientName"
                    maxLengthValidation={maxCharacters}
                    isRequired
                  />
                </div>
                <div className="c-ClientInformation__Input">
                  <FormInput
                    type="text"
                    label={formLabels.client.siretNumber}
                    name="siretNumber"
                    maxLengthValidation={siretNumberMaxCharacters}
                    patternValidation={siretNumberValidation.pattern}
                    patternValidationErrorMessage={
                      siretNumberValidation.errorMessage
                    }
                  />
                </div>
                <div className="c-ClientInformation__Input">
                  <FormSelect<string>
                    label={formLabels.client.status}
                    name="status"
                    options={statusOptions}
                    isRequired
                    defaultValue={getDefaultStatus()}
                    isDisabled={statusOptions.length === 1}
                  />
                </div>
              </div>
              <div className="c-ClientInformation__Exclusivity">
                <FormRadioInput
                  name={"isNonExclusive"}
                  displayName={formLabels.exclusivity.title}
                  options={[
                    {
                      label: formLabels.exclusivity.isExclusive,
                      value: "false",
                    },
                    {
                      label: formLabels.exclusivity.isNotExclusive,
                      value: "true",
                    },
                  ]}
                  defaultValue="false"
                />
              </div>
              <div className="c-ClientInformation__ClientType">
                <FormRadioInput
                  name="clientType"
                  displayName={formLabels.clientType.title}
                  options={typeClientOptions}
                  defaultValue="union"
                />
              </div>
            </div>
            <div className="c-ClientInformation__FormGroup">
              <h2>{formLabels.contact.title}</h2>
              <div className="c-ClientInformation__Group">
                <div className="c-ClientInformation__Input">
                  <FormInput
                    type="text"
                    label={formLabels.contact.firstName}
                    name="contactFirstName"
                    maxLengthValidation={maxCharacters}
                    isRequired
                  />
                </div>
                <div className="c-ClientInformation__Input">
                  <FormInput
                    type="text"
                    label={formLabels.contact.lastName}
                    name="contactLastName"
                    maxLengthValidation={maxCharacters}
                    isRequired
                  />
                </div>
              </div>
              <div className="c-ClientInformation__Group">
                <div className="c-ClientInformation__Input">
                  <FormInput
                    type="text"
                    label={formLabels.contact.email}
                    name="contactEmail"
                    patternValidation={emailValidation.pattern}
                    patternValidationErrorMessage={emailValidation.errorMessage}
                    isRequired
                  />
                </div>
                <div className="c-ClientInformation__Input">
                  <FormInput
                    type="text"
                    label={formLabels.contact.phoneNumber}
                    name="contactPhoneNumber"
                    patternValidation={phoneNumberValidation.pattern}
                    patternValidationErrorMessage={
                      phoneNumberValidation.errorMessage
                    }
                    isRequired
                  />
                </div>
              </div>
            </div>
            <div className="c-ClientInformation__FormGroup">
              <h2>{formLabels.suezData.title}</h2>
              <FormRadioInput
                name={"isRvFrance"}
                displayName={formLabels.suezData.servicesByRVFrance}
                options={[
                  {
                    label: formLabels.suezData.yesOption,
                    value: "true",
                  },
                  { label: formLabels.suezData.noOption, value: "false" },
                ]}
                defaultValue={"true"}
              />
              <div className="c-ClientInformation__SuezServices">
                {isRvFrance && (
                  <>
                    <div className="c-ClientInformation__Input">
                      <FormInput
                        type="number"
                        label={formLabels.suezData.ccapNumber}
                        name="ccap"
                      />
                    </div>
                    <div className="c-ClientInformation__Input">
                      <FormInput
                        type="number"
                        label={formLabels.suezData.clearNumber}
                        name="clear"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="c-ClientInformation__Buttons">
              <CommonButton
                type="submit"
                label={formLabels.submitButton}
                style="primary"
                picto="check"
                isDisabled={!isDirty}
              />
              <CommonButton
                type="button"
                label={formLabels.cancelButton}
                picto="cross"
                onClick={onCancel}
                isDisabled={!isDirty}
              />
            </div>
          </form>
        </FormProvider>
      </CommonLoader>
    </div>
  );
}
