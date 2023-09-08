import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import FormLabel from "../../Form/FormLabel/FormLabel";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormInput from "../../Form/FormInput/FormInput";
import "./yes-we-scan-reporting-form-checkboxes.scss";

export interface IYesWeScanReportingFormCheckboxesType {
  hasEmail: boolean;
  hasTsms: boolean;
  mailRecipients: string;
}

export default function YesWeScanReportingFormCheckboxes() {
  /* Static data */
  const labels = {
    title: "Traitement de la demande via *",
    tsmsOption: "TSMS",
    emailOption: "Email",
    emailTitle: "Email(s) de réception de la demande",
    emailInformation: "Un ou plusieurs emails séparés par un point-virgule",
    emailErrorMessage: "Merci de contrôler les adresses mails saisies",
    checkboxesErrorMessage:
      "L'une des deux options de traitement de la demande doit être sélectionnée",
  };
  const fieldNames: {
    [name: string]: keyof IYesWeScanReportingFormCheckboxesType;
  } = {
    hasEmail: "hasEmail",
    hasTsms: "hasTsms",
    mailRecipients: "mailRecipients",
  };

  /* Methods */
  function validateCheckboxes(): boolean | string {
    if (watchHasEmail || watchHasTsms) return true;
    else {
      return labels.checkboxesErrorMessage;
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
  const watchHasEmail = watch(fieldNames.hasEmail);
  const watchHasTsms = watch(fieldNames.hasTsms);
  const checkboxesName = "checkboxes";
  register(checkboxesName, { validate: validateCheckboxes });

  useEffect(() => {
    if (!checkboxesTouched && (watchHasEmail || watchHasTsms)) {
      setCheckboxesTouched(true);
    } else if (checkboxesTouched) {
      void trigger(checkboxesName);
    }
  }, [checkboxesTouched, watchHasEmail, watchHasTsms, trigger, checkboxesName]);

  return (
    <div className="c-YesWeScanReportingFormCheckboxes">
      <FormLabel forId={checkboxesName} label={labels.title} />
      <div className="c-YesWeScanReportingFormCheckboxes__Group">
        <FormCheckbox name={fieldNames.hasEmail} label={labels.emailOption} />
        <FormCheckbox name={fieldNames.hasTsms} label={labels.tsmsOption} />
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
      {watchHasEmail && (
        <FormInput
          name={fieldNames.mailRecipients}
          isRequired
          label={labels.emailTitle}
          informationLabel={labels.emailInformation}
          patternValidation={
            /^(?:[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?;)*[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/i
          }
          patternValidationErrorMessage={labels.emailErrorMessage}
        />
      )}
    </div>
  );
}
