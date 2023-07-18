import React, { useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  UpdateContactMwcDocument,
  useGetContactMwcQuery,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import CommonButton from "../../../components/Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import "./ContactMwc.scss";

interface ContactFormData {
  serviceName: string;
  address: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
}

export type ContactMwc = {
  serviceName?: string;
  postalAddress?: string;
  postalCode?: string;
  city?: string;
  contactEmail?: string;
  phoneNumber?: string;
};

const ERROR_MESSAGES = {
  maxLengthServiceName: "Le Nom du service ne doit pas dépasser 50 caractères",
  maxLengthAddress: "L'adresse ne doit pas dépasser 150 caractères",
  invalidPostalCode: "Le code postal ne doit pas dépasser 5 chiffres",
  invalidEmail: "Veuillez saisir un email valide",
  invalidPhoneNumber:
    "Le numéro de téléphone ne doit pas dépasser 30 caractères",
  invalidCity: "La ville ne doit pas dépasser 100 caractères",
};

const LABEL = {
  title: "Contact à afficher sur les pages d'erreur",
  serviceName: "Nom du service",
  address: "Adresse postale",
  postalCode: "Code postal",
  city: "Ville",
  email: "Email de contact",
  phoneNumber: "N° de téléphone",
};

const PLACEHOLDER = {
  serviceName: "ex : Service de gestion des déchets",
  address: "ex : 1, nom de la voie",
  postalCode: "ex : 82000",
  city: "Nom de la ville",
  email: "ex : contact@example.com",
  phoneNumber: "ex : 0123456789",
};

export default function ContactMwc() {
  const form = useForm<ContactFormData>({ mode: "onChange" });

  const { handleSubmit, setValue } = form;

  const { contractId } = useContract();

  const [updateContactMwc] = useMutation(UpdateContactMwcDocument);

  const { data } = useGetContactMwcQuery({
    variables: {
      filters: {
        contract: {
          id: {
            eq: contractId,
          },
        },
      },
    },
  });

  const setDefaultValues = useCallback(
    (data: ContactMwc) => {
      setValue("serviceName", data.serviceName ?? "");
      setValue("address", data?.postalAddress ?? "");
      setValue("postalCode", data?.postalCode ?? "");
      setValue("city", data?.city ?? "");
      setValue("email", data?.contactEmail ?? "");
      setValue("phoneNumber", data?.phoneNumber ?? "");
    },
    [setValue],
  );

  useEffect(() => {
    if (data?.mwCounterServices?.data) {
      setDefaultValues(
        data?.mwCounterServices?.data[0]?.attributes as ContactMwc,
      );
    }
  }, [data, setDefaultValues]);

  const handleCancel = () => {
    if (data?.mwCounterServices?.data) {
      setDefaultValues(
        data?.mwCounterServices?.data[0]?.attributes as ContactMwc,
      );
    }
  };

  const handleSave = async (formData: ContactFormData) => {
    try {
      await updateContactMwc({
        variables: {
          serviceName: formData.serviceName,
          postalAddress: formData.address,
          postalCode: formData.postalCode,
          city: formData.city,
          contactEmail: formData.email,
          phoneNumber: formData.phoneNumber,
          contractId: parseInt(contractId),
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="c-ContactFormPage o-Form__Group">
        <h2 className="c-ContactFormPage__Title">{LABEL.title}</h2>
        <FormProvider {...form}>
          <form
            className="c-ContactFormPage__Form"
            onSubmit={handleSubmit(handleSave)}
          >
            <div className="c-ContactFormPage__BlockFieldAndInput">
              <FormInput
                name="serviceName"
                isRequired
                type="text"
                placeholder={PLACEHOLDER.serviceName}
                maxLengthValidation={50}
                lengthHardValidation={false}
                maxLengthValidationErrorMessage={
                  ERROR_MESSAGES.maxLengthServiceName
                }
                label={LABEL.serviceName}
              />
            </div>
            <div className="c-ContactFormPage__BlockFieldAndInput">
              <FormInput
                name="address"
                isRequired
                type="text"
                placeholder={PLACEHOLDER.address}
                maxLengthValidation={150}
                lengthHardValidation={false}
                maxLengthValidationErrorMessage={
                  ERROR_MESSAGES.maxLengthAddress
                }
                label={LABEL.address}
              />
            </div>
            <div className="c-ContactFormPage__BlockFieldAndInputCol2">
              <div className="c-ContactFormPage__BlockFieldAndInput">
                <FormInput
                  name="postalCode"
                  type="text"
                  placeholder={PLACEHOLDER.postalCode}
                  maxLengthValidation={5}
                  patternValidation={/^[\d+]+$/}
                  lengthHardValidation={false}
                  maxLengthValidationErrorMessage={
                    ERROR_MESSAGES.invalidPostalCode
                  }
                  label={LABEL.postalCode}
                />
              </div>
              <div className="c-ContactFormPage__BlockFieldAndInput">
                <FormInput
                  name="city"
                  isRequired
                  type="text"
                  placeholder={PLACEHOLDER.city}
                  maxLengthValidation={100}
                  lengthHardValidation={false}
                  maxLengthValidationErrorMessage={ERROR_MESSAGES.invalidCity}
                  label={LABEL.city}
                />
              </div>
            </div>
            <div className="c-ContactFormPage__BlockFieldAndInput">
              <FormInput
                name="email"
                isRequired
                type="email"
                placeholder={PLACEHOLDER.email}
                patternValidation={/^\S+@\S+\.\S+$/}
                lengthHardValidation={false}
                patternValidationErrorMessage={ERROR_MESSAGES.invalidEmail}
                label={LABEL.email}
              />
            </div>
            <div className="c-ContactFormPage__BlockFieldAndInput">
              <FormInput
                name="phoneNumber"
                type="text"
                placeholder={PLACEHOLDER.phoneNumber}
                maxLengthValidation={30}
                patternValidation={/^\d+$/}
                lengthHardValidation={false}
                maxLengthValidationErrorMessage={
                  ERROR_MESSAGES.invalidPhoneNumber
                }
                label={LABEL.phoneNumber}
              />
            </div>
          </form>
        </FormProvider>
      </div>
      <div className="c-ContactFormPage__ButtonBlock">
        <div className="c-ContactFormPage__ButtonsSave">
          <CommonButton
            label="Annuler les modifications"
            picto="cross"
            onClick={() => handleCancel()}
          />
          <CommonButton
            style="primary"
            label="Enregistrer les modifications"
            picto="check"
            onClick={() => handleSubmit(handleSave)()}
          />
        </div>
      </div>
    </>
  );
}
