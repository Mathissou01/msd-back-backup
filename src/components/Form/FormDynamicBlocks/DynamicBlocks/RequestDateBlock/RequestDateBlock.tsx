import React from "react";
import { IBlocksDateChoice } from "../../../../../lib/dynamic-blocks";
import FormInput from "../../../FormInput/FormInput";
import FormSelect from "../../../FormSelect/FormSelect";
import "./request-date-block.scss";
import { Enum_Componentblocksdatechoice_Fieldstatus } from "../../../../../graphql/codegen/generated-types";
import { IOptionWrapper } from "../../../FormMultiselect/FormMultiselect";

interface IRequestDateProps {
  blockName: string;
}

type TDateChoiceOption =
  | Enum_Componentblocksdatechoice_Fieldstatus.Obligatoire
  | Enum_Componentblocksdatechoice_Fieldstatus.Optionnel;

export default function RequestDateBlock({ blockName }: IRequestDateProps) {
  /* Static data */
  const labels = {
    labelDate: "Libellé du type de demande",
    statusDate: `Statut du champ "Choix d'une date"`,
    statusOptionnalOption: "Optionnel",
    statusMandatoryOption: "Obligatoire",
  };

  /* Local Data */
  const fieldNames: { [name: string]: keyof IBlocksDateChoice } = {
    fieldStatus: "fieldStatus",
    fieldLabelDateChoice: "fieldLabelDateChoice",
  };

  const mandatoryFieldOptions: Array<IOptionWrapper<TDateChoiceOption>> = [
    {
      option: Enum_Componentblocksdatechoice_Fieldstatus.Obligatoire,
      label: labels.statusMandatoryOption,
    },
    {
      option: Enum_Componentblocksdatechoice_Fieldstatus.Optionnel,
      label: labels.statusOptionnalOption,
    },
  ];

  /* External Data */

  /* Methods */
  function fieldStatusDateChoiceSelectDisplayTransformFunction(
    fieldStatusDateChoice: string,
  ): string {
    return fieldStatusDateChoice
      ? labels.statusMandatoryOption
      : labels.statusOptionnalOption;
  }

  return (
    <div className="c-RequestTypeBlock">
      <div className="c-RequestDateBlock__SelectStatus">
        <FormSelect<Enum_Componentblocksdatechoice_Fieldstatus>
          label={labels.statusDate}
          displayTransform={fieldStatusDateChoiceSelectDisplayTransformFunction}
          name={`${blockName}.${fieldNames.fieldStatus}`}
          options={mandatoryFieldOptions}
          isRequired
        />
      </div>
      <div className="c-RequestDateBlock__DateLabel">
        <FormInput
          name={`${blockName}.${fieldNames.fieldLabelDateChoice}`}
          label={labels.labelDate}
          isRequired
        />
      </div>
    </div>
  );
}
