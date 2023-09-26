import React from "react";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { usePreventAndStop } from "../../../hooks/usePreventAndStop";
import CommonButton from "../../Common/CommonButton/CommonButton";
import FormInput from "../../Form/FormInput/FormInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import { IUsersTableRow } from "../../../pages/[contractId]/gestion/utilisateurs/index.page";
import "./user-form.scss";

interface IUserFormProps {
  onSubmitValid: (data: FieldValues) => void;
  handleCloseModal: () => void;
  defaultValue: IUsersTableRow | undefined;
  onUpdate: (data: FieldValues) => void;
}

export default function UserForm({
  onSubmitValid,
  handleCloseModal,
  defaultValue,
  onUpdate,
}: IUserFormProps) {
  /* Static Data */
  const formLabels = {
    firstName: "Prénom",
    familyName: "Nom",
    email: "Email",
    phone: "Téléphone",
    role: "Profil",
  };

  const labels = {
    mandatoryFields: "Tous les champs marqués d'une * sont obligatoires.",
  };

  const phoneValidation = {
    pattern: /^0[1-9][0-9]{8}$/g,
    errorMessage: "Veuillez saisir un numéro de téléphone valide",
  };

  const emailValidation = {
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    errorMessage: "Veuillez saisir un email valide",
  };

  const nameInputsValidation = {
    errorMessage: "Les chiffres ne sont pas autorisés",
    pattern: /^[\D]+$/i,
  };

  /* Local Data */
  const formTitle = defaultValue
    ? "Modifier un utilisateur"
    : "Ajouter un utilisateur";
  const buttonLabels = {
    submit: defaultValue ? "Modifier l'utilisateur" : "Créer l'utilisateur",
    cancel: "Annuler",
  };

  const form = useForm({
    mode: "onChange",
    defaultValues: defaultValue ?? {},
  });
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <h2 className="c-UserModal__Title">{formTitle}</h2>
      <form
        className="c-SectorForm"
        onSubmit={usePreventAndStop(
          handleSubmit(defaultValue ? onUpdate : onSubmitValid),
        )}
      >
        <div className="c-UserModal__Container">
          <div className="c-UserModal__Wrapper">
            {labels.mandatoryFields}
            <FormInput
              type="text"
              name="firstName"
              label={formLabels.firstName}
              patternValidation={nameInputsValidation.pattern}
              patternValidationErrorMessage={nameInputsValidation.errorMessage}
              isRequired
            />
          </div>
          <div className="c-UserModal__Wrapper">
            <FormInput
              type="text"
              name="lastName"
              label={formLabels.familyName}
              patternValidation={nameInputsValidation.pattern}
              patternValidationErrorMessage={nameInputsValidation.errorMessage}
              isRequired
            />
          </div>
          <div className="c-UserModal__Wrapper">
            <FormInput
              type="email"
              name="email"
              label={formLabels.email}
              patternValidation={emailValidation.pattern}
              patternValidationErrorMessage={emailValidation.errorMessage}
              isRequired
            />
          </div>
          <div className="c-UserModal__Wrapper">
            <FormInput
              type="tel"
              name="phone"
              label={formLabels.phone}
              maxLengthValidation={10}
              patternValidation={phoneValidation.pattern}
              patternValidationErrorMessage={phoneValidation.errorMessage}
              isRequired
            />
          </div>
          <div className="c-UserModal__Wrapper">
            <FormSelect<string>
              label={formLabels.role}
              name="role"
              isRequired
              options={[
                { label: "Super admin", option: "superAdmin" },
                { label: "Admin local suez", option: "localAdminSuez" },
                { label: "Contributeur", option: "contributor" },
              ]}
            />
          </div>
        </div>
        <div className="c-UserModal__Buttons">
          <CommonButton
            type="submit"
            label={buttonLabels.submit}
            picto={defaultValue ? "edit" : "add"}
            style="primary"
          />
          <CommonButton
            label={buttonLabels.cancel}
            picto="cross"
            onClick={handleCloseModal}
          />
        </div>
      </form>
    </FormProvider>
  );
}
