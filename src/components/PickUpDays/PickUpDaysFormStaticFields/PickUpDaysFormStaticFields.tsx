import React from "react";
import FormInput from "../../Form/FormInput/FormInput";
import "./pick-up-days-form-static-fields.scss";

export interface IPickUpDaysFormStaticFieldsLabels {
  staticName: string;
}

interface IPickUpDaysFormStaticFieldsProps {
  labels: IPickUpDaysFormStaticFieldsLabels;
}
export default function PickUpDaysFormStaticFields({
  labels,
}: IPickUpDaysFormStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  return (
    <>
      <div className="c-PickUpDaysStaticFields">
        <div className="c-PickUpDaysStaticFields__RequiredLabel">
          {mandatoryFields}
        </div>
        <div className="c-PickUpDaysStaticFields__Name">
          <FormInput
            type="text"
            name="name"
            label={labels.staticName}
            isRequired={true}
            maxLengthValidation={50}
          />
        </div>
      </div>
    </>
  );
}
