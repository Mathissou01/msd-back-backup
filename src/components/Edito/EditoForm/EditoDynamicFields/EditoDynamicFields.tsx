import { Flipped, Flipper } from "react-flip-toolkit";
import { useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { compareArraysOfObjects } from "../../../../lib/utilities";
import {
  blockDisplayMap,
  createEmptyBlock,
  IEditoBlock,
  TDynamicFieldOption,
} from "../../../../lib/edito";
import EditoBlockWrapper from "./EditoBlockWrapper/EditoBlockWrapper";
import EditoDynamicBlock from "./EditoBlocks/EditoDynamicBlock";
import CommonButton from "../../../Common/CommonButton/CommonButton";
import "./edito-dynamic-fields.scss";

interface IDynamicFieldWrapper {
  isOpen: boolean;
  block: IEditoBlock;
}

interface IEditoDynamicFieldsProps {
  blockOptions: Array<TDynamicFieldOption>;
  defaultValues?: Array<IEditoBlock>;
}

export default function EditoDynamicFields({
  blockOptions,
  defaultValues,
}: IEditoDynamicFieldsProps) {
  /* StaticData */
  const formLabels = {
    titleField: "Ajouter un bloc",
  };

  /* Methods */
  function getFormValues(): Array<IDynamicFieldWrapper> {
    return blockList.map((wrapper, index) => {
      return {
        ...wrapper,
        block: {
          __typename: wrapper.block.__typename,
          id: wrapper.block.id,
          ...getValues(`blocks.${index}`),
        },
      };
    });
  }

  function mapToListState(list: Array<IDynamicFieldWrapper>) {
    return list.map((wrapper) => {
      return { id: wrapper.block.id };
    });
  }

  function syncUpdatedValuesToForm(updatedValues: Array<IDynamicFieldWrapper>) {
    reset({
      ...getValues(),
      blocks: updatedValues.map((wrapper) => wrapper.block),
    });
  }

  function addNewBlock(typename: TDynamicFieldOption) {
    const updatedValues = [...getFormValues()];
    updatedValues.push({
      isOpen: true,
      block: createEmptyBlock(typename, `new-${counter}`),
    });
    setCounter(counter + 1);
    setBlockList(updatedValues);
    syncUpdatedValuesToForm(updatedValues);
  }

  function onOpenToggle(i: number) {
    const updatedValues = [...blockList];
    updatedValues[i] = {
      ...updatedValues[i],
      isOpen: !updatedValues[i].isOpen,
    };
    setIsAnimating(false);
    setBlockList(updatedValues);
  }

  function onReorder(i: number, shift: number) {
    const updatedValues = [...getFormValues()];
    updatedValues.splice(i + shift, 0, updatedValues.splice(i, 1)[0]);
    setBlockList(updatedValues);
    syncUpdatedValuesToForm(updatedValues);
  }

  function onDuplicate(i: number) {
    const updatedValues = [...getFormValues()];
    updatedValues.splice(i + 1, 0, updatedValues[i]);
    setBlockList(updatedValues);
    syncUpdatedValuesToForm(updatedValues);
  }

  function onDelete(i: number) {
    const updatedValues = [...getFormValues()];
    updatedValues.splice(i, 1);
    setBlockList(updatedValues);
    syncUpdatedValuesToForm(updatedValues);
  }

  /* Local data */
  const { reset, getValues, setValue } = useFormContext();
  const [isAnimating, setIsAnimating] = useState(true);
  const [counter, setCounter] = useState(0);
  const [initialState, setInitialState] = useState<Array<{ id: string }>>([]);
  const [blockList, setBlockList] = useState<Array<IDynamicFieldWrapper>>([]);

  useEffect(() => {
    if (defaultValues) {
      const remappedBlocks: Array<IDynamicFieldWrapper> = defaultValues.map(
        (block) => {
          return { isOpen: true, block: { ...block } };
        },
      );
      setInitialState(mapToListState(remappedBlocks));
      setBlockList(remappedBlocks);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (blockList) {
      const isDirty = !compareArraysOfObjects(
        initialState,
        mapToListState(blockList),
      );
      if (isDirty) {
        setValue(`blocksDirtyState`, mapToListState(blockList), {
          shouldDirty: isDirty,
        });
      }
      setIsAnimating(true);
    }
  }, [blockList, initialState, setValue]);

  return (
    <>
      {blockList.length > 0 && (
        <Flipper
          className="c-EditoDynamicFields"
          flipKey={blockList}
          element="ul"
        >
          {blockList.map((wrapper, index) => (
            <Flipped
              key={index}
              flipId={`${wrapper.block.__typename}_${wrapper.block.id}`}
              shouldFlip={() => isAnimating}
            >
              <div className="c-EditoDynamicFields__Block">
                <EditoBlockWrapper
                  label={blockDisplayMap[wrapper.block.__typename].label}
                  picto={blockDisplayMap[wrapper.block.__typename].picto}
                  onReorder={(shift) => onReorder(index, shift)}
                  isUpDisabled={index <= 0}
                  isDownDisabled={index + 1 >= blockList.length}
                  onDuplicate={() => onDuplicate(index)}
                  onDelete={() => onDelete(index)}
                  isOpen={wrapper.isOpen}
                  onOpenToggle={() => onOpenToggle(index)}
                  isEmpty={blockDisplayMap[wrapper.block.__typename].isEmpty}
                >
                  <EditoDynamicBlock
                    key={`${index}_${wrapper.block.__typename}_${wrapper.block.id}`}
                    type={wrapper.block.__typename}
                    name={`blocks.${index}`}
                    isVisible={wrapper.isOpen}
                  />
                </EditoBlockWrapper>
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
