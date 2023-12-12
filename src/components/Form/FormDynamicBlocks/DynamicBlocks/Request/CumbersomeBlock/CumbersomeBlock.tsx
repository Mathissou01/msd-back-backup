import React from "react";
import { IBlocksCumbersome } from "../../../../../../lib/dynamic-blocks";
import FormInput from "../../../../FormInput/FormInput";
import FormRadioInput from "../../../../FormRadioInput/FormRadioInput";
import "./cumbersome-block.scss";

interface ICumbersomeBlock {
  blockName: string;
}

export default function CumbersomeBlock({ blockName }: ICumbersomeBlock) {
  /* Static Data */
  const labels = {
    staticTrick: `Astuce : vous pouvez personnaliser la liste des encombrants dans l'onglet "Liste des encombrants" du service "Demandes".`,
    staticLabel: "Libellé du champ encombrant",
    staticInformation:
      "Vous pouvez saisir le volume et/ou le nombre d'encombrants maximum acceptés. L'usager est ainsi averti automatiquement lorsque les encombrants qu'il a sélectionnés dépassent les valeurs maximales.",
    staticVolumeLabel: "Volume maximum accepté",
    staticVolumeUnit: "m3",
    staticVolumeErrorMessage:
      "Ce champ n'accepte que des nombres entiers ou décimaux (1 décimale acceptée)",
    staticNumberOfCumbersome: "Nombre d'encombrants maximum accepté",
    staticNumberOfCumbersomeErrorMessage:
      "Ce champ n'accepte que des nombres entiers",
    staticIsNumberAndVolumeRule:
      "Règle à appliquer si volume et nombre maximum sont définis",
    staticIsNumberAndVolumeTrueOption:
      "le nombre ET le volume doivent être inférieurs aux valeurs saisies",
    staticIsNumberAndVolumeFalseOption:
      "le nombre OU le volume doit être inférieur aux valeurs saisies",
    staticLimitMessage: "Message à afficher en cas de dépassement de la limite",
  };

  const fieldNames: { [name: string]: keyof IBlocksCumbersome } = {
    cumbersomeLabel: "cumbersomeLabel",
    maxVolumeOfCumbersome: "maxVolumeOfCumbersome",
    maxNumberOfCumbersome: "maxNumberOfCumbersome",
    isNumberAndVolume: "isNumberAndVolume",
    cumbersomeLimitMessage: "cumbersomeLimitMessage",
  };

  return (
    <div className="c-CumbersomeBlock">
      <div className="c-CumbersomeBlock__CumbersomeLabel">
        <span>{labels.staticTrick}</span>
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.cumbersomeLabel}`}
          label={labels.staticLabel}
          isRequired
          maxLengthValidation={255}
        />
      </div>
      <div className="c-CumbersomeBlock__MaxVolumeOfCumbersome">
        <span>{labels.staticInformation}</span>
        <div className="c-CumbersomeBlock__MaxVolumeOfCumbersome_input">
          <FormInput
            type="text"
            name={`${blockName}.${fieldNames.maxVolumeOfCumbersome}`}
            label={labels.staticVolumeLabel}
            suffixLabel={labels.staticVolumeUnit}
            patternValidation={/^\d+([.,]\d){0,1}$/}
            patternValidationErrorMessage={labels.staticVolumeErrorMessage}
          />
        </div>
      </div>
      <div className="c-CumbersomeBlock__MaxNumberOfCumbersome">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.maxNumberOfCumbersome}`}
          label={labels.staticNumberOfCumbersome}
          patternValidation={/^\d+$/}
          patternValidationErrorMessage={
            labels.staticNumberOfCumbersomeErrorMessage
          }
        />
      </div>
      <div className="c-CumbersomeBlock__IsNumberAndVolume">
        <FormRadioInput
          name={`${blockName}.${fieldNames.isNumberAndVolume}`}
          displayName={labels.staticIsNumberAndVolumeRule}
          displayMode="vertical"
          options={[
            {
              value: "1",
              label: labels.staticIsNumberAndVolumeTrueOption,
            },
            {
              value: "0",
              label: labels.staticIsNumberAndVolumeFalseOption,
            },
          ]}
        />
      </div>
      <div className="c-CumbersomeBlock__CumbersomeLimitMessage">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.cumbersomeLimitMessage}`}
          label={labels.staticLimitMessage}
          isRequired
        />
      </div>
    </div>
  );
}
