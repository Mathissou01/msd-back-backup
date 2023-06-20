import React, { useEffect, useState } from "react";
import { CollectEntity } from "../../../graphql/codegen/generated-types";
import { minimalWysiwygEditorOptions } from "../../Form/FormWysiwyg/WysiwygEditor/WysiwygEditor";
import FormInput from "../../Form/FormInput/FormInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import { removeNulls } from "../../../lib/utilities";
import FormWysiwyg from "../../Form/FormWysiwyg/FormWysiwyg";
import "./drop-off-map-static-fields.scss";

const validationPhoneNumber = /^[0-9]{10}$/;

export interface IDropOffMapStaticFieldsLabels {
  staticName: string;
  staticCollectType: string;
  staticDescription?: string;
  staticPhoneNumber?: string;
  staticMustKnow: string;
}

interface IDropOffMapStaticFieldsProps {
  labels: IDropOffMapStaticFieldsLabels;
  collectTypes: Array<CollectEntity>;
}
export default function DropOffMapStaticFields({
  labels,
  collectTypes,
}: IDropOffMapStaticFieldsProps) {
  /* Static Data */
  const formLabels = {
    errorMessage: "Format de 10 chiffres accepté ex: 0625460102.",
    validationErrorMessage: "Numéro de téléphone invalide",
  };
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  const [dropOffMapCollectTypes, setDropOffMapCollectTypes] = useState<
    Array<IOptionWrapper<CollectEntity>>
  >([]);

  function dropOffMapCollectTypesSelectDisplayTransformFunction(
    wasteFamily: CollectEntity,
  ): string {
    return wasteFamily.name ?? "";
  }

  useEffect(() => {
    if (collectTypes) {
      const mappedDropOffMapCollectTypes: Array<IOptionWrapper<CollectEntity> | null> =
        collectTypes
          .map((collectType) => {
            return collectType ? { option: collectType } : null;
          })
          .filter(removeNulls);
      setDropOffMapCollectTypes(
        mappedDropOffMapCollectTypes?.filter(removeNulls),
      );
    }
  }, [collectTypes]);

  return (
    <>
      <span className="c-DropOffMapStaticFields__RequiredLabel">
        {mandatoryFields}
      </span>
      <div className="c-DropOffMapStaticFields">
        <div className="c-DropOffMapStaticFields__Name">
          <FormInput
            type="text"
            name="name"
            label={labels.staticName}
            isRequired={true}
          />
        </div>
        <div className="c-DropOffMapStaticFields__CollectType">
          <FormSelect<CollectEntity>
            label={labels.staticCollectType}
            name="dropOffMapCollectTypeSelect"
            isRequired
            options={dropOffMapCollectTypes}
            displayTransform={
              dropOffMapCollectTypesSelectDisplayTransformFunction
            }
            optionKey={"originalId"}
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
