import React from "react";
import { IBlocksQuestions } from "../../../../../lib/dynamic-blocks";
import { Enum_Componentblocksquestions_Textstatus } from "../../../../../graphql/codegen/generated-types";
import FormInput from "../../../FormInput/FormInput";
import { IOptionWrapper } from "../../../FormMultiselect/FormMultiselect";
import FormRadioInput from "../../../FormRadioInput/FormRadioInput";
import FormSelect from "../../../FormSelect/FormSelect";
import "./questions-block.scss";

interface IQuestionsBlock {
  blockName: string;
}

type TQuestionsOption =
  | Enum_Componentblocksquestions_Textstatus.Obligatoire
  | Enum_Componentblocksquestions_Textstatus.Optionnel;

export default function QuestionsBlock({ blockName }: IQuestionsBlock) {
  /* Static Data */
  const labels = {
    staticStatus: 'Statut du champ "Question texte"',
    staticStatusSelectLabelTrueOption:
      Enum_Componentblocksquestions_Textstatus.Obligatoire,
    staticStatusSelectLabelFalseOption:
      Enum_Componentblocksquestions_Textstatus.Optionnel,
    staticQuestionTextLabel: 'Libellé du champ "Question texte"',
    staticQuestionTextPlaceholder: 'Placeholder du champ "Question texte"',
    staticHeight: "Hauteur du champs de saisie *",
    staticHeightFalseOption: "Champ de saisie sur une seule ligne",
    staticHeightTrueOption: "Champ de saisie sur plusieurs lignes",
  };

  const fieldNames: { [name: string]: keyof IBlocksQuestions } = {
    textStatus: "textStatus",
    questionTextLabel: "questionTextLabel",
    questionTextPlaceholder: "questionTextPlaceholder",
    height: "height",
  };

  const mandatoryFieldOptions: Array<IOptionWrapper<TQuestionsOption>> = [
    {
      option: Enum_Componentblocksquestions_Textstatus.Obligatoire,
      label: labels.staticStatusSelectLabelTrueOption,
    },
    {
      option: Enum_Componentblocksquestions_Textstatus.Optionnel,
      label: labels.staticStatusSelectLabelFalseOption,
    },
  ];

  /* Methods */
  function textStatusSelectDisplayTransformFunction(
    textStatus: string,
  ): string {
    return textStatus
      ? labels.staticStatusSelectLabelTrueOption
      : labels.staticStatusSelectLabelFalseOption;
  }
  return (
    <>
      <div className="c-QuestionsBlock">
        <div className="c-QuestionsBlock__Field c-QuestionsBlock__TextStatus">
          <FormSelect<string>
            label={labels.staticStatus}
            name={`${blockName}.${fieldNames.textStatus}`}
            displayTransform={textStatusSelectDisplayTransformFunction}
            options={mandatoryFieldOptions}
            isRequired
          />
        </div>
        <div className="c-QuestionsBlock__Field c-QuestionsBlock__QuestionTextLabel">
          <FormInput
            type="text"
            name={`${blockName}.${fieldNames.questionTextLabel}`}
            label={labels.staticQuestionTextLabel}
            isRequired
            maxLengthValidation={50}
          />
        </div>
        <div className="c-QuestionsBlock__Field c-QuestionsBlock__QuestionTextPlaceholder">
          <FormInput
            type="text"
            name={`${blockName}.${fieldNames.questionTextPlaceholder}`}
            label={labels.staticQuestionTextPlaceholder}
            maxLengthValidation={100}
          />
        </div>
        <div className="c-QuestionsBlock__Field c-QuestionsBlock__QuestionTextHeight">
          <FormRadioInput
            name={`${blockName}.${fieldNames.height}`}
            displayName={labels.staticHeight}
            options={[
              {
                value: "0",
                label: labels.staticHeightFalseOption,
              },
              {
                value: "1",
                label: labels.staticHeightTrueOption,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}
