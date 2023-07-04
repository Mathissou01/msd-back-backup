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
  };

  const fieldNames: { [name: string]: keyof IBlocksCumbersome } = {
    cumbersomeLabel: "cumbersomeLabel",
  };

  return (
    <div className="c-CumbersomeBlock">
      <span>{labels.staticTrick}</span>
      <div className="c-CumbersomeBlock__Field c-CumbersomeBlock__CumbersomeLabel">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.cumbersomeLabel}`}
          label={labels.staticLabel}
          isRequired
          maxLengthValidation={50}
        />
      </div>
    </div>
  );
}
