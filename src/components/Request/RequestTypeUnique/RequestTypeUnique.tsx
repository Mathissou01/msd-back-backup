import React, { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import FormInput from "../../Form/FormInput/FormInput";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormLabel from "../../Form/FormLabel/FormLabel";
import "./request-type-unique.scss";

export default function RequestTypeUnique() {
  /* Static data */
  const labels = {
    title: "Libellé du type de demande",
    typeRequest: "Traitement de la demande via *",
    email: "Email(s) de réception de la demande",
    subEmail: "Un ou plusieurs emails séparés par un point-virgule",
    checkboxesErrorMessage:
      "L'une des deux options de traitement de la demande doit être sélectionnée",
  };

  /* Local Data */
  const { watch } = useFormContext();
  const watchIsEmail = watch("requestType.0.isEmail");

  const [areCheckboxesInError, setAreCheckboxesInError] =
    useState<boolean>(false);

  /* External Data */
  const {
    register,
    formState: { errors },
  } = useFormContext();
  register("checkboxes_0", { validate: validateCheckboxes });

  /* Methods */
  function validateCheckboxes(_: unknown, formValues: FieldValues) {
    if (!formValues.requestType[0]) return true;
    else {
      const checkboxesInError =
        !formValues.requestType[0].isEmail && !formValues.requestType[0].isTSMS;
      setAreCheckboxesInError(checkboxesInError);
      return !checkboxesInError;
    }
  }

  return (
    <div className="c-RequestTypeBlock">
      <FormLabel label={labels.typeRequest} />
      <div className="c-RequestTypeBlock__GroupCheckbox">
        <FormCheckbox name="requestType.0.isEmail" label="Email" />
        <FormCheckbox name="requestType.0.isTSMS" label="TSMS" />
      </div>
      {areCheckboxesInError && (
        <ErrorMessage
          errors={errors}
          name="checkboxes_0"
          render={({ message }: { message: string }) => (
            <p className="c-RequestTypeBlock__CheckboxesError">
              {message ?? "Error"}
            </p>
          )}
          message={labels.checkboxesErrorMessage}
        />
      )}
      {watchIsEmail && (
        <FormInput
          name="requestType.0.email"
          isRequired
          label={labels.email}
          informationLabel={labels.subEmail}
          patternValidation={
            /^(?:[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?;)*[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/i
          }
        />
      )}
    </div>
  );
}
