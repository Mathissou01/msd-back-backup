import React, { useEffect, useCallback } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  UpdateContactMwcDocument,
  useGetContactMwcQuery,
} from "../../../graphql/codegen/generated-types";
import { useContract } from "../../../hooks/useContract";
import CommonButton from "../../../components/Common/CommonButton/CommonButton";
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
  id?: string | null;
  attributes?: {
    mwcContact?: {
      data?: {
        attributes?: {
          serviceName?: string | null;
          postalAddress?: string | null;
          postalCode?: string | null;
          city?: string | null;
          contactEmail?: string | null;
          phoneNumber?: string | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

const ERROR_MESSAGES = {
  invalidPostalCode: "Veuillez saisir un code postal valide",
  invalidEmail: "Veuillez saisir un email valide",
  invalidPhoneNumber: "Veuillez saisir un numéro de téléphone valide",
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

const ContactForm: React.FC = () => {
  const form = useForm<ContactFormData>();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    register,
  } = form;

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
    (contactMwc: ContactMwc) => {
      const attributes = contactMwc?.attributes?.mwcContact?.data?.attributes;
      setValue("serviceName", attributes?.serviceName ?? "");
      setValue("address", attributes?.postalAddress ?? "");
      setValue("postalCode", attributes?.postalCode ?? "");
      setValue("city", attributes?.city ?? "");
      setValue("email", attributes?.contactEmail ?? "");
      setValue("phoneNumber", attributes?.phoneNumber ?? "");
    },
    [setValue],
  );

  useEffect(() => {
    if (data?.mwCounterServices?.data) {
      setDefaultValues(data?.mwCounterServices?.data[0]);
    }
  }, [data, setDefaultValues]);

  const handleCancel = () => {
    if (data?.mwCounterServices?.data) {
      setDefaultValues(data?.mwCounterServices?.data[0]);
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
      console.log(error);
    }
  };

  return (
    <>
      <div className="c-ContactFormPage">
        <h2 className="c-ContactFormPage__Title">{LABEL.title}</h2>
        <FormProvider {...form}>
          <form
            className="c-ContactFormPage__Form"
            onSubmit={handleSubmit(handleSave)}
          >
            <div className="c-ContactFormPage__BlockFieldAndInput">
              <label
                className="c-ContactFormPage__LabelWrapper"
                htmlFor="serviceName"
              >
                <span className="c-ContactFormPage__Label">
                  {LABEL.serviceName}
                </span>
              </label>
              <div className="c-ContactFormPage__InputContent">
                <Controller
                  control={control}
                  {...register("serviceName")}
                  rules={{
                    maxLength: {
                      value: 50,
                      message:
                        "Le Nom du service ne doit pas dépasser 50 caractères",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="ex : Service de gestion des déchets"
                    />
                  )}
                />
              </div>

              {errors.serviceName && (
                <p className="c-ContactFormPage__ErrorMessage">
                  {errors?.serviceName?.message as string}
                </p>
              )}
            </div>
            <div className="c-ContactFormPage__BlockFieldAndInput">
              <label
                className="c-ContactFormPage__LabelWrapper"
                htmlFor="address"
              >
                <span className="c-ContactFormPage__Label">
                  {LABEL.address}
                </span>
              </label>
              <div className="c-ContactFormPage__InputContent">
                <Controller
                  control={control}
                  {...register("address")}
                  rules={{
                    maxLength: {
                      value: 150,
                      message: "L'adresse' ne doit pas dépasser 150 caractères",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="ex : 1, nom de la voie"
                    />
                  )}
                />
              </div>

              {errors.address && (
                <p className="c-ContactFormPage__ErrorMessage">
                  {errors?.address?.message as string}
                </p>
              )}
            </div>
            <div className="c-ContactFormPage__BlockFieldAndInputCol2">
              <div className="c-ContactFormPage__BlockFieldAndInput">
                <label
                  className="c-ContactFormPage__LabelWrapper"
                  htmlFor="postalCode"
                >
                  <span className="c-ContactFormPage__Label">
                    {LABEL.postalCode}
                  </span>
                </label>
                <div className="c-ContactFormPage__InputContent">
                  <Controller
                    control={control}
                    {...register("postalCode")}
                    rules={{
                      maxLength: {
                        value: 5,
                        message:
                          "Le code postal ne doit pas dépasser 5 chiffres",
                      },
                      pattern: {
                        value: /^[\d+]+$/,
                        message: ERROR_MESSAGES.invalidPostalCode,
                      },
                    }}
                    render={({ field }) => (
                      <input {...field} type="text" placeholder="ex : 82000" />
                    )}
                  />
                </div>
                {errors.postalCode && (
                  <p className="c-ContactFormPage__ErrorMessage">
                    {errors?.postalCode?.message as string}
                  </p>
                )}
              </div>
              <div className="c-ContactFormPage__BlockFieldAndInput">
                <label
                  className="c-ContactFormPage__LabelWrapper"
                  htmlFor="city"
                >
                  <span className="c-ContactFormPage__Label">{LABEL.city}</span>
                </label>
                <div className="c-ContactFormPage__InputContent">
                  <Controller
                    control={control}
                    {...register("city")}
                    rules={{
                      maxLength: {
                        value: 100,
                        message: "La ville ne doit pas dépasser 100 caractères",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="Nom de la ville"
                      />
                    )}
                  />
                </div>
                {errors.city && (
                  <p className="c-ContactFormPage__ErrorMessage">
                    {errors?.city?.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="c-ContactFormPage__BlockFieldAndInput">
              <label
                className="c-ContactFormPage__LabelWrapper"
                htmlFor="email"
              >
                <span className="c-ContactFormPage__Label">{LABEL.email}</span>
              </label>
              <div className="c-ContactFormPage__InputContent">
                <Controller
                  control={control}
                  {...register("email")}
                  rules={{
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: ERROR_MESSAGES.invalidEmail,
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="ex : contact@example.com"
                    />
                  )}
                />
              </div>
              {errors.email && (
                <p className="c-ContactFormPage__ErrorMessage">
                  {errors?.email?.message as string}
                </p>
              )}
            </div>
            <div className="c-ContactFormPage__BlockFieldAndInput">
              <label
                className="c-ContactFormPage__LabelWrapper"
                htmlFor="phoneNumber"
              >
                <span className="c-ContactFormPage__Label">
                  {LABEL.phoneNumber}
                </span>
              </label>
              <div className="c-ContactFormPage__InputContent">
                <Controller
                  control={control}
                  {...register("phoneNumber")}
                  rules={{
                    maxLength: {
                      value: 30,
                      message:
                        "Le numéro de téléphone ne doit pas dépasser 30 caractères",
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: ERROR_MESSAGES.invalidPhoneNumber,
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="ex : 0123456789"
                    />
                  )}
                />
              </div>
              {errors.phoneNumber && (
                <p className="c-ContactFormPage__ErrorMessage">
                  {errors?.phoneNumber?.message as string}
                </p>
              )}
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
};

export default function IndexPage() {
  return <ContactForm />;
}
