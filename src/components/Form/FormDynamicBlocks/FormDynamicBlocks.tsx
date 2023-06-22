import { Flipped, Flipper } from "react-flip-toolkit";
import { useFieldArray, useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import {
  blockDisplayMap,
  createEmptyBlock,
  IFormBlock,
  TDynamicFieldOption,
} from "../../../lib/dynamic-blocks";
import DynamicBlockWrapper from "./DynamicBlockWrapper/DynamicBlockWrapper";
import DynamicBlock from "./DynamicBlocks/DynamicBlock";
import CommonButton from "../../Common/CommonButton/CommonButton";
import "./form-dynamic-blocks.scss";

interface IEditoDynamicFieldsProps {
  name: string;
  blockOptions: Array<TDynamicFieldOption>;
}

export default function FormDynamicBlocks({
  name,
  blockOptions,
}: IEditoDynamicFieldsProps) {
  /* StaticData */
  const formLabels = {
    titleField: "Ajouter un bloc",
  };

  /* Methods */
  function onOpenToggle(i: number) {
    setIsAnimating(false);
    const newStates = [...blockOpenStates];
    newStates[i] = !newStates[i];
    setBlockOpenStates(newStates);
  }

  function onReorder(i: number, shift: number) {
    swap(i, i + shift);
    const newStates = [...blockOpenStates];
    newStates.splice(i + shift, 0, newStates.splice(i, 1)[0]);
    setBlockOpenStates(newStates);
  }

  function onDuplicate(i: number) {
    const duplicatedBlock = getValues(`${name}.${i}`);
    insert(i + 1, duplicatedBlock);
    const newStates = [...blockOpenStates];
    newStates.splice(i + 1, 0, true);
    setBlockOpenStates(newStates);
  }

  function onDelete(i: number) {
    remove(i);
    const newStates = [...blockOpenStates];
    newStates.splice(i, 1);
    setBlockOpenStates(newStates);
  }

  function addNewBlock(typename: TDynamicFieldOption) {
    const newBlock = createEmptyBlock(typename);
    append(newBlock);
    const newStates = [...blockOpenStates];
    newStates.push(true);
    setBlockOpenStates(newStates);
  }

  type FormBlockValues = {
    [fields: typeof name]: Array<IFormBlock>;
  };

  /* Local data */
  const { getValues } = useFormContext();
  const { fields, append, insert, swap, remove } = useFieldArray<
    FormBlockValues,
    typeof name,
    "formId"
  >({
    name: name,
    keyName: "formId",
  });
  const [isAnimating, setIsAnimating] = useState(true);
  const [blockOpenStates, setBlockOpenStates] = useState<Array<boolean>>(
    Array.from({ length: fields.length }, () => true),
  );

  useEffect(() => {
    if (blockOpenStates) {
      setIsAnimating(true);
    }
  }, [blockOpenStates]);

  return (
    <>
      {fields.length > 0 && (
        <Flipper className="c-EditoDynamicFields" flipKey={fields} element="ul">
          {fields.map((block, index) => (
            <Flipped
              key={block.formId}
              flipId={block.id}
              shouldFlip={() => isAnimating}
            >
              <div className="c-EditoDynamicFields__Block">
                <DynamicBlockWrapper
                  label={blockDisplayMap[block.__typename].label}
                  picto={blockDisplayMap[block.__typename].picto}
                  onReorder={(shift) => onReorder(index, shift)}
                  isUpDisabled={index <= 0}
                  isDownDisabled={index + 1 >= fields.length}
                  isDuplicateDisabled={
                    blockDisplayMap[block.__typename].cannotDuplicate ?? false
                  }
                  onDuplicate={() => onDuplicate(index)}
                  onDelete={() => onDelete(index)}
                  isOpen={blockOpenStates[index]}
                  onOpenToggle={() => onOpenToggle(index)}
                  isEmpty={blockDisplayMap[block.__typename].isEmpty}
                >
                  <DynamicBlock
                    key={`${index}_${block.__typename}_${block.id}`}
                    type={block.__typename}
                    name={`${name}.${index}`}
                    isVisible={blockOpenStates[index]}
                  />
                </DynamicBlockWrapper>
              </div>
            </Flipped>
          ))}
        </Flipper>
      )}
      <div className="c-EditoDynamicFields__Options">
        <span className="c-EditoDynamicFields__OptionsTitle">
          {formLabels.titleField}
        </span>
        <div className="c-EditoDynamicFields__OptionsList">
          {blockOptions.map((option, index) => {
            return (
              <CommonButton
                key={index}
                type="button"
                label={blockDisplayMap[option].label}
                picto={blockDisplayMap[option].picto}
                onClick={() => addNewBlock(option)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
