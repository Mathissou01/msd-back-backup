import React from "react";
import { IBlocksDateChoice } from "../../../../../lib/dynamic-blocks";
import FormInput from "../../../FormInput/FormInput";
import FormSelect from "../../../FormSelect/FormSelect";
import "./request-date-block.scss";

interface IRequestDateProps {
  blockName: string;
}

export default function RequestDateBlock({ blockName }: IRequestDateProps) {
  /* Static data */
  const labels = {
    labelDate: "Libellé du type de demande",
    statusDate: `Statut du champ "Choix d'une date"`,
  };

  /* Local Data */
  const fieldNames: { [name: string]: keyof IBlocksDateChoice } = {
    fieldStatus: "fieldStatus",
    fieldLabelDateChoice: "fieldLabelDateChoice",
  };

  /* External Data */

  /* Methods */
  return (
    <div className="c-RequestTypeBlock">
      <div className="c-RequestDateBlock__SelectStatus">
        <FormSelect
          label={labels.statusDate}
          name={`${blockName}.${fieldNames.fieldStatus}`}
          options={[
            {
              label: "Obligatoire",
              option: "Obligatoire",
            },
            {
              label: "Optionnel",
              option: "Optionnel",
            },
          ]}
          isRequired={true}
        />
      </div>
      <div className="c-RequestDateBlock__DateLabel">
        <FormInput
          name={`${blockName}.${fieldNames.fieldLabelDateChoice}`}
          label={labels.labelDate}
          isRequired={true}
        />
      </div>
    </div>
  );
}
