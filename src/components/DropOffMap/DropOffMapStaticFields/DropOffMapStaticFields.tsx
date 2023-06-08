import React from "react";
import FormInput from "../../Form/FormInput/FormInput";
import "./drop-off-map-static-fields.scss";

export interface IDropOffMapStaticFieldsLabels {
  staticName: string;
  staticDescription?: string;
  staticPhoneNumber?: string;
}

interface IDropOffMapStaticFieldsProps {
  labels: IDropOffMapStaticFieldsLabels;
}
export default function DropOffMapStaticFields({
  labels,
}: IDropOffMapStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  return (
    <>
      <div className="c-DropOffMapStaticFields">
        <span className="c-DropOffMapStaticFields__RequiredLabel">
          {mandatoryFields}
        </span>
        <div className="c-DropOffMapStaticFields__Name">
          <FormInput
            type="text"
            name="name"
            label={labels.staticName}
            isRequired={true}
          />
        </div>
      </div>
    </>
  );
}
