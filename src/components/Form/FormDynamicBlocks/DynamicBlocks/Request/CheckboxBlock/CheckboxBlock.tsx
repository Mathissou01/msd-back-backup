import React from "react";
import { IBlocksCheckbox } from "../../../../../../lib/dynamic-blocks";
import { Enum_Componentblockscheckbox_Fieldstatuscheckbox } from "../../../../../../graphql/codegen/generated-types";
import FormInput from "../../../../FormInput/FormInput";
import { IOptionWrapper } from "../../../../FormMultiselect/FormMultiselect";
import FormSelect from "../../../../FormSelect/FormSelect";
import "./checkbox-block.scss";

interface ICheckboxBlock {
  blockName: string;
}

type TCheckboxOption =
  | Enum_Componentblockscheckbox_Fieldstatuscheckbox.Obligatoire
  | Enum_Componentblockscheckbox_Fieldstatuscheckbox.Optionnel;

export default function CheckboxBlock({ blockName }: ICheckboxBlock) {
  /* Static Data */
  const labels = {
    staticStatus: "Statut de la case à cocher",
    staticStatusSelectLabelTrueOption:
      Enum_Componentblockscheckbox_Fieldstatuscheckbox.Obligatoire,
    staticStatusSelectLabelFalseOption:
      Enum_Componentblockscheckbox_Fieldstatuscheckbox.Optionnel,
    staticCheckboxLabel: "Libellé de la case à cocher",
  };

  const fieldNames: { [name: string]: keyof IBlocksCheckbox } = {
    fieldStatusCheckbox: "fieldStatusCheckbox",
    labelCheckbox: "labelCheckbox",
  };

  const mandatoryFieldOptions: Array<IOptionWrapper<TCheckboxOption>> = [
    {
      option: Enum_Componentblockscheckbox_Fieldstatuscheckbox.Obligatoire,
      label: labels.staticStatusSelectLabelTrueOption,
    },
    {
      option: Enum_Componentblockscheckbox_Fieldstatuscheckbox.Optionnel,
      label: labels.staticStatusSelectLabelFalseOption,
    },
  ];

  /* Methods */
  function fieldStatusCheckboxSelectDisplayTransformFunction(
    fieldStatusCheckbox: string,
  ): string {
    return fieldStatusCheckbox
      ? labels.staticStatusSelectLabelTrueOption
      : labels.staticStatusSelectLabelFalseOption;
  }

  return (
    <div className="c-CheckboxBlock">
      <div className="c-CheckboxBlock__Field c-CheckboxBlock__FieldStatusCheckbox">
        <FormSelect<string>
          label={labels.staticStatus}
          name={`${blockName}.${fieldNames.fieldStatusCheckbox}`}
          displayTransform={fieldStatusCheckboxSelectDisplayTransformFunction}
          options={mandatoryFieldOptions}
          isRequired
        />
      </div>
      <div className="c-CheckboxBlock__Field c-CheckboxBlock__LabelCheckbox">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.labelCheckbox}`}
          label={labels.staticCheckboxLabel}
          isRequired
        />
      </div>
    </div>
  );
}
