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

export interface IFormDynamicBlocksLabels {
  titleField: string;
}

interface IFormDynamicBlocksProps {
  name: string;
  blockConfigurations: Array<TDynamicFieldConfiguration>;
  isSingleBlockDisplay?: boolean;
  labels?: IFormDynamicBlocksLabels;
  canReorder?: boolean;
  canDuplicate?: boolean;
}

export default function FormDynamicBlocks({
  name,
  blockConfigurations,
  isSingleBlockDisplay = false,
  labels,
  canReorder = true,
  canDuplicate = true,
}: IFormDynamicBlocksProps) {
  /* StaticData */
  const formLabels = labels ?? {
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

  function changeLabelOverride(i: number, newLabel: string) {
    if (newLabel !== labelOverrides[i]) {
      const newOverrides = [...labelOverrides];
      newOverrides[i] = newLabel;
      setLabelOverrides(newOverrides);
    }
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

  function getCanDeleteBlock(block: IFormBlock) {
    const currentBlockConfiguration = getCurrentBlockConfiguration(
      block.__typename,
    );
    if (currentBlockConfiguration?.props) {
      if (currentBlockConfiguration.props.canDeleteCondition) {
        return currentBlockConfiguration.props.canDeleteCondition(block);
      } else if (currentBlockConfiguration.props.minBlocks) {
        const fieldsForTypename = filterTypesByTypename(block.__typename);
        const indexCurrentBlockForTypename = fieldsForTypename.findIndex(
          (fieldForTypename) => {
            return fieldForTypename.id === block.id;
          },
        );
        if (
          currentBlockConfiguration.props.minBlocks >=
          indexCurrentBlockForTypename + 1
        ) {
          return false;
        }
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
  const [labelOverrides, setLabelOverrides] = useState<
    Array<string | undefined>
  >(Array.from({ length: fields.length }, () => undefined));
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
        <Flipper className="c-FormDynamicBlocks" flipKey={fields} element="ul">
          {fields.map((block, index) => {
            if (!block.id) {
              return;
            }
            return (
              <Flipped
                key={block.formId}
                flipId={block.id}
                shouldFlip={() => isAnimating}
              >
                <div className="c-FormDynamicBlocks__Block">
                  <DynamicBlockWrapper
                    label={
                      labelOverrides[index] ??
                      blockDisplayMap[block.__typename].label
                    }
                    picto={blockDisplayMap[block.__typename]?.picto}
                    onReorder={(shift) => onReorder(index, shift)}
                    isUpDisabled={index <= 0}
                    isDownDisabled={index + 1 >= fields.length}
                    onDuplicate={() => onDuplicate(index)}
                    onDelete={() => onDelete(index)}
                    isOpen={blockOpenStates[index]}
                    onOpenToggle={() => onOpenToggle(index)}
                    isEmpty={blockDisplayMap[block.__typename]?.isEmpty}
                    canReorder={canReorder}
                    canDuplicate={canDuplicate}
                    canDelete={getCanDeleteBlock(block)}
                  >
                    <DynamicBlock
                      key={`${index}_${block.__typename}_${block.id}`}
                      type={block.__typename}
                      name={`${name}.${index}`}
                      isVisible={blockOpenStates[index]}
                      onChangeBlockTitle={(value) =>
                        changeLabelOverride(index, value)
                      }
                    />
                  </DynamicBlockWrapper>
                </div>
              </Flipped>
            );
          })}
        </Flipper>
      )}
      {isSingleBlockDisplay && blockConfigurations.length === 1 ? (
        <button
          className="c-FormDynamicBlocks__SingleOption"
          type="button"
          onClick={() => addNewBlock(blockConfigurations[0].option)}
        >
          <span className="c-FormDynamicBlocks__OptionsTitle">
            {formLabels.titleField}
          </span>
        </button>
      ) : (
        <div className="c-FormDynamicBlocks__Options">
          <span className="c-FormDynamicBlocks__OptionsTitle">
            {formLabels.titleField}
          </span>
          <div className="c-FormDynamicBlocks__OptionsList">
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
      )}
    </>
  );
}
