import React from "react";
import { IBlocksCumbersome } from "../../../../../lib/dynamic-blocks";
import FormInput from "../../../FormInput/FormInput";
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
  };

  const fieldNames: { [name: string]: keyof IBlocksCumbersome } = {
    cumbersomeLabel: "cumbersomeLabel",
    maxVolumeOfCumbersome: "maxVolumeOfCumbersome",
  };

  return (
    <div className="c-CumbersomeBlock">
      <span>{labels.staticTrick}</span>
      <div className="c-CumbersomeBlock__CumbersomeLabel">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.cumbersomeLabel}`}
          label={labels.staticLabel}
          isRequired
          maxLengthValidation={50}
        />
      </div>
      <span>{labels.staticInformation}</span>
      <div className="c-CumbersomeBlock__MaxVolumeOfCumbersome">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.maxVolumeOfCumbersome}`}
          label={labels.staticVolumeLabel}
          unitLabel={labels.staticVolumeUnit}
          patternValidation={/^\d+([.,]\d){0,1}$/}
          patternValidationErrorMessage={labels.staticVolumeErrorMessage}
        />
      </div>
    </div>
  );
}
