import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { IBlocksRequestType } from "../../../../../lib/dynamic-blocks";
import FormCheckbox from "../../../FormCheckbox/FormCheckbox";
import FormInput from "../../../FormInput/FormInput";
import FormLabel from "../../../FormLabel/FormLabel";
import "./request-type-block.scss";

interface IRequestTypeProps {
  blockName: string;
}

export default function RequestTypeBlock({ blockName }: IRequestTypeProps) {
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
  const fieldNames: { [name: string]: keyof IBlocksRequestType } = {
    title: "title",
    isEmail: "isEmail",
    isTSMS: "isTSMS",
    email: "email",
  };
  const { watch } = useFormContext();
  const watchIsEmail = watch(`${blockName}.${fieldNames.isEmail}`);

  const blockNameSplit = blockName.split(".");
  const blockId: number = blockNameSplit.length > 1 ? +blockNameSplit[1] : 0;
  const [areCheckboxesInError, setAreCheckboxesInError] =
    useState<boolean>(false);

  /* External Data */
  const {
    register,
    formState: { errors },
  } = useFormContext();
  register("checkboxes_" + blockId, { validate: validateCheckboxes });

  /* Methods */
  function validateCheckboxes(_: unknown, formValues: FieldValues) {
    if (!formValues.requestType[blockId]) return true;
    else {
      const checkboxesInError =
        !formValues.requestType[blockId].isEmail &&
        !formValues.requestType[blockId].isTSMS;
      setAreCheckboxesInError(checkboxesInError);
      return !checkboxesInError;
    }
  }

  return (
    <div className="c-RequestTypeBlock">
      <div className="c-RequestTypeBlock__Title">
        <FormInput
          name={`${blockName}.${fieldNames.title}`}
          isRequired
          label={labels.title}
          maxLengthValidation={60}
        />
      </div>
      <FormLabel label={labels.typeRequest} />
      <div className="c-RequestTypeBlock__GroupCheckbox">
        <FormCheckbox
          name={`${blockName}.${fieldNames.isEmail}`}
          label="Email"
        />
        <FormCheckbox name={`${blockName}.${fieldNames.isTSMS}`} label="TSMS" />
      </div>
      {areCheckboxesInError && (
        <ErrorMessage
          errors={errors}
          name={`checkboxes_${blockId}`}
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
          name={`${blockName}.${fieldNames.email}`}
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
