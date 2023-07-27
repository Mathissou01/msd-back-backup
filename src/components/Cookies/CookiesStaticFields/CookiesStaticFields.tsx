import React from "react";
import FormInput from "../../Form/FormInput/FormInput";

export interface ICookiesStaticFieldsLabels {
  staticTitle: string;
}

interface ICookiesStaticFieldsProps {
  labels: ICookiesStaticFieldsLabels;
}

export default function CookiesStaticFields({
  labels,
}: ICookiesStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  return (
    <>
      <div className="o-Form__Group">
        <span className="o-Form__RequiredLabel">{mandatoryFields}</span>
        <FormInput
          type="text"
          name="title"
          label={labels.staticTitle}
          isRequired={true}
        />
      </div>
    </>
  );
}
