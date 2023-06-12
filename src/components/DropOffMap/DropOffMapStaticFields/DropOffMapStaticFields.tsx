import React from "react";
import { minimalWysiwygEditorOptions } from "../../Form/FormWysiwyg/WysiwygEditor/WysiwygEditor";
import FormInput from "../../Form/FormInput/FormInput";
import FormWysiwyg from "../../Form/FormWysiwyg/FormWysiwyg";
import "./drop-off-map-static-fields.scss";

const validationPhoneNumber = /^[0-9]{10}$/;

export interface IDropOffMapStaticFieldsLabels {
  staticName: string;
  staticDescription?: string;
  staticPhoneNumber?: string;
  staticMustKnow: string;
}

interface IDropOffMapStaticFieldsProps {
  labels: IDropOffMapStaticFieldsLabels;
}
export default function DropOffMapStaticFields({
  labels,
}: IDropOffMapStaticFieldsProps) {
  /* Static Data */
  const formLabels = {
    errorMessage: "Format de 10 chiffres accepté ex: 0625460102.",
    validationErrorMessage: "Numéro de téléphone invalide",
  };
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
      <div className="c-DropOffMapStaticFields">
        <div className="c-DropOffMapStaticFields__PhoneNumber">
          <FormInput
            type="number"
            name="phoneNumber"
            label={labels.staticPhoneNumber}
            patternValidation={{
              value: validationPhoneNumber,
              message: formLabels.errorMessage,
            }}
            patternValidationErrorMessage={formLabels.validationErrorMessage}
          />
        </div>
      </div>
      <div className="c-DropOffMapStaticFields">
        <div className="c-DropOffMapStaticFields__MustKnow">
          <FormWysiwyg
            name="mustKnow"
            label={labels.staticMustKnow}
            editorOptions={minimalWysiwygEditorOptions}
            isVisible
          />
        </div>
      </div>
    </>
  );
}
