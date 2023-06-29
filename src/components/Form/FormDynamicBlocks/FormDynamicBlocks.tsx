import { Flipped, Flipper } from "react-flip-toolkit";
import {
  FieldArrayWithId,
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import {
  blockDisplayMap,
  createEmptyBlock,
  IFormBlock,
  TDynamicFieldConfiguration,
  TDynamicFieldOption,
} from "../../../lib/dynamic-blocks";
import CommonButton from "../../Common/CommonButton/CommonButton";
import DynamicBlockWrapper from "./DynamicBlockWrapper/DynamicBlockWrapper";
import DynamicBlock from "./DynamicBlocks/DynamicBlock";
import "./form-dynamic-blocks.scss";

interface IEditoDynamicFieldsProps {
  name: string;
  blockConfigurations: Array<TDynamicFieldConfiguration>;
  canReorder?: boolean;
  canDuplicate?: boolean;
}

export default function FormDynamicBlocks({
  name,
  blockConfigurations,
  canReorder = true,
  canDuplicate = true,
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

  function getCurrentBlockConfiguration(typename: TDynamicFieldOption) {
    return blockConfigurations.find(
      (blockConfiguration) => blockConfiguration.option === typename,
    );
  }

  function filterTypesByTypename(
    typename: TDynamicFieldOption,
  ): FieldArrayWithId<FormBlockValues, string, "formId">[] {
    return fields.filter((field) => {
      return field.__typename === typename;
    });
  }

  function getCanDeleteBlock(typename: TDynamicFieldOption, blockId: string) {
    const currentBlockConfiguration = getCurrentBlockConfiguration(typename);
    if (
      currentBlockConfiguration &&
      currentBlockConfiguration.props?.minBlocks
    ) {
      const fieldsForTypename = filterTypesByTypename(typename);
      const indexCurrentBlockForTypename = fieldsForTypename.findIndex(
        (fieldForTypename) => {
          return fieldForTypename.id === blockId;
        },
      );
      if (
        currentBlockConfiguration.props.minBlocks >=
        indexCurrentBlockForTypename + 1
      ) {
        return false;
      }
    }
    return true;
  }

  function getIsDisabledOption(typename: TDynamicFieldOption): boolean {
    const currentBlockConfiguration = getCurrentBlockConfiguration(typename);
    if (
      currentBlockConfiguration &&
      currentBlockConfiguration.props?.maxBlocks
    ) {
      const fieldsForTypename = filterTypesByTypename(typename);
      if (
        fieldsForTypename.length + 1 >
        currentBlockConfiguration.props.maxBlocks
      ) {
        return true;
      }
    }
    return false;
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
  const isInitialized = useRef<boolean>(false);

  useEffect(() => {
    // TODO : Find a better way to handle this behavior: used to add minBlocks to a conditional FormDynamicBlocks component
    if (!isInitialized.current) {
      blockConfigurations.forEach((blockConfiguration) => {
        if (blockConfiguration.props?.minBlocks) {
          const minBlocks = blockConfiguration.props?.minBlocks;
          const fieldsOfTypename = fields.filter((field) => {
            return field.__typename === blockConfiguration.option;
          });
          if (fieldsOfTypename.length < minBlocks) {
            for (let i = fieldsOfTypename.length; i < minBlocks; i++) {
              addNewBlock(blockConfiguration.option);
            }
          }
        }
      });
      isInitialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  onDuplicate={() => onDuplicate(index)}
                  onDelete={() => onDelete(index)}
                  isOpen={blockOpenStates[index]}
                  onOpenToggle={() => onOpenToggle(index)}
                  isEmpty={blockDisplayMap[block.__typename].isEmpty}
                  canReorder={canReorder}
                  canDuplicate={canDuplicate}
                  canDelete={getCanDeleteBlock(block.__typename, block.id)}
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
          {blockConfigurations.map((configuration, index) => {
            return (
              <CommonButton
                key={index}
                type="button"
                label={blockDisplayMap[configuration.option].label}
                picto={blockDisplayMap[configuration.option].picto}
                onClick={() => addNewBlock(configuration.option)}
                isDisabled={getIsDisabledOption(configuration.option)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
