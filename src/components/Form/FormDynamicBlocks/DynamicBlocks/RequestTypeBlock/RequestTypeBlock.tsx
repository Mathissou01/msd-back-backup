import _ from "lodash";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FieldValues, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { IBlocksRequestType } from "../../../../../lib/dynamic-blocks";
import FormCheckbox from "../../../FormCheckbox/FormCheckbox";
import FormInput from "../../../FormInput/FormInput";
import FormLabel from "../../../FormLabel/FormLabel";
import CommonFormErrorText from "../../../../Common/CommonFormErrorText/CommonFormErrorText";
import "./request-type-block.scss";

interface IRequestTypeProps {
  blockName: string;
  hasTitleField?: boolean;
}

export default function RequestTypeBlock({
  blockName,
  hasTitleField = true,
}: IRequestTypeProps) {
  /* Static data */
  const labels = {
    title: "Libellé du type de demande",
    typeRequest: "Traitement de la demande via *",
    email: "Email(s) de réception de la demande",
    subEmail: "Un ou plusieurs emails séparés par un point-virgule",
    emailErrorMessage: "Merci de contrôler les adresses mails saisies",
    checkboxesErrorMessage:
      "L'une des deux options de traitement de la demande doit être sélectionnée",
  };
  const fieldNames: { [name: string]: keyof IBlocksRequestType } = {
    title: "title",
    isEmail: "isEmail",
    isTSMS: "isTSMS",
    email: "email",
  };

  /* Methods */
  function validateCheckboxes(
    value: undefined,
    formValues: FieldValues,
  ): boolean | string {
    const checkboxValues = _.get(formValues, blockName);
    if (!checkboxValues) return true;
    else {
      const checkboxesInError =
        !checkboxValues.isEmail && !checkboxValues.isTSMS;
      return checkboxesInError ? labels.checkboxesErrorMessage : true;
    }
  }

  /* Local Data */
  const {
    watch,
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const [checkboxesTouched, setCheckboxesTouched] = useState(false);
  const watchIsEmail = watch(`${blockName}.${fieldNames.isEmail}`);
  const watchIsTSMS = watch(`${blockName}.${fieldNames.isTSMS}`);
  const checkboxesName = `${blockName}.checkboxes`;
  register(checkboxesName, { validate: validateCheckboxes });

  useEffect(() => {
    if (!checkboxesTouched && (watchIsEmail || watchIsTSMS)) {
      setCheckboxesTouched(true);
    } else if (checkboxesTouched) {
      void trigger(checkboxesName);
    }
  }, [checkboxesTouched, watchIsEmail, watchIsTSMS, trigger, checkboxesName]);

  return (
    <div className="c-RequestTypeBlock">
      {hasTitleField && (
        <div className="c-RequestTypeBlock__Title">
          <FormInput
            name={`${blockName}.${fieldNames.title}`}
            isRequired
            label={labels.title}
            maxLengthValidation={50}
          />
        </div>
      )}
      <div
        className={classNames("c-RequestTypeBlock__Checkboxes", {
          "c-RequestTypeBlock__Checkboxes_invalid": !!_.get(
            errors,
            checkboxesName,
          ),
        })}
        id={checkboxesName}
        aria-invalid={!!_.get(errors, checkboxesName)}
        aria-errormessage={`${checkboxesName}_error`}
      >
        <FormLabel forId={checkboxesName} label={labels.typeRequest} />
        <div className="c-RequestTypeBlock__Group">
          <FormCheckbox
            name={`${blockName}.${fieldNames.isEmail}`}
            label="Email"
          />
          <FormCheckbox
            name={`${blockName}.${fieldNames.isTSMS}`}
            label="TSMS"
          />
        </div>
        <ErrorMessage
          errors={errors}
          name={checkboxesName}
          render={({ message }: { message: string }) => (
            <CommonFormErrorText
              message={message}
              errorId={`${checkboxesName}_error`}
            />
          )}
        />
      </div>
      {watchIsEmail && (
        <FormInput
          name={`${blockName}.${fieldNames.email}`}
          isRequired
          label={labels.email}
          informationLabel={labels.subEmail}
          patternValidation={
            /^(?:[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?;)*[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/i
          }
          patternValidationErrorMessage={labels.emailErrorMessage}
        />
      )}
    </div>
  );
}
