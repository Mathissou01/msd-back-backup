import React from "react";
import { IBlocksQCM } from "../../../../../../lib/dynamic-blocks";
import { Enum_Componentblocksqcm_Fieldstatusqcm } from "../../../../../../graphql/codegen/generated-types";
import FormInput from "../../../../FormInput/FormInput";
import { IOptionWrapper } from "../../../../FormMultiselect/FormMultiselect";
import FormRadioInput from "../../../../FormRadioInput/FormRadioInput";
import FormSelect from "../../../../FormSelect/FormSelect";
import "./qcm-block.scss";

interface IQcmBlock {
  blockName: string;
}

type TQcmOption =
  | Enum_Componentblocksqcm_Fieldstatusqcm.Obligatoire
  | Enum_Componentblocksqcm_Fieldstatusqcm.Optionnel;

export default function QcmBlock({ blockName }: IQcmBlock) {
  /* Static Data */
  const labels = {
    staticStatus: 'Statut du champ "Question à choix multiple"',
    staticStatusSelectLabelTrueOption:
      Enum_Componentblocksqcm_Fieldstatusqcm.Obligatoire,
    staticStatusSelectLabelFalseOption:
      Enum_Componentblocksqcm_Fieldstatusqcm.Optionnel,
    staticQcmLabel: 'Libellé du champ "Question à choix multiple"',
    staticQcmPossibleAnswers:
      "Liste des réponses possibles, séparées par un point-virgule ;",
    staticQcmPossibleAnswersInformationLabel: "Exemple : jaune ; bleu ; gris",
    staticQcmType: 'Type de "Question à choix multiple"',
    staticQcmTypeFalseOption: "Un choix possible",
    staticQcmTypeTrueOption: "Plusieurs choix possibles",
  };

  const fieldNames: { [name: string]: keyof IBlocksQCM } = {
    fieldStatusQCM: "fieldStatusQCM",
    fieldLabelQCM: "fieldLabelQCM",
    responses: "responses",
    multipleChoice: "multipleChoice",
  };

  const mandatoryFieldOptions: Array<IOptionWrapper<TQcmOption>> = [
    {
      option: Enum_Componentblocksqcm_Fieldstatusqcm.Obligatoire,
      label: labels.staticStatusSelectLabelTrueOption,
    },
    {
      option: Enum_Componentblocksqcm_Fieldstatusqcm.Optionnel,
      label: labels.staticStatusSelectLabelFalseOption,
    },
  ];

  /* Methods */
  function fieldStatusQCMSelectDisplayTransformFunction(
    fieldStatusQCM: string,
  ): string {
    return fieldStatusQCM
      ? labels.staticStatusSelectLabelTrueOption
      : labels.staticStatusSelectLabelFalseOption;
  }

  return (
    <div className="c-QcmBlock">
      <div className="c-QcmBlock__Field c-QcmBlock__FieldStatusQCM">
        <FormSelect<string>
          label={labels.staticStatus}
          name={`${blockName}.${fieldNames.fieldStatusQCM}`}
          displayTransform={fieldStatusQCMSelectDisplayTransformFunction}
          options={mandatoryFieldOptions}
          isRequired
        />
      </div>
      <div className="c-QcmBlock__Field c-QcmBlock__FieldLabelQCM">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.fieldLabelQCM}`}
          label={labels.staticQcmLabel}
          isRequired
        />
      </div>
      <div className="c-QcmBlock__Field c-QcmBlock__Responses">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.responses}`}
          label={labels.staticQcmPossibleAnswers}
          isRequired
          informationLabel={labels.staticQcmPossibleAnswersInformationLabel}
        />
      </div>
      <div className="c-QcmBlock__Field c-QcmBlock__MultipleChoice">
        <FormRadioInput
          name={`${blockName}.${fieldNames.multipleChoice}`}
          displayName={labels.staticQcmType}
          options={[
            {
              value: "0",
              label: labels.staticQcmTypeFalseOption,
            },
            {
              value: "1",
              label: labels.staticQcmTypeTrueOption,
            },
          ]}
        />
      </div>
    </div>
  );
}
