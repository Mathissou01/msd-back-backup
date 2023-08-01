import React from "react";
import { ILegalContentStaticFieldsLabels } from "../../../lib/legal-content";
import FormInput from "../../Form/FormInput/FormInput";

interface ILegalContentStaticFieldsProps {
  labels: ILegalContentStaticFieldsLabels;
}

export default function LegalContentStaticFields({
  labels,
}: ILegalContentStaticFieldsProps) {
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
          isRequired
        />
      </div>
    </>
  );
}
