import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Maybe } from "graphql/jsutils/Maybe";
import {
  ComponentBlocksRequestSlotsExceptions,
  Enum_Componentblocksrequestslotsexceptions_Exceptiontype,
  Scalars,
} from "../../../../../../../../graphql/codegen/generated-types";
import CommonButton from "../../../../../../../Common/CommonButton/CommonButton";
import RequestExceptionBlock, {
  IRequestExceptionsLabels,
} from "./RequestExceptionBlock/RequestExceptionBlock";
import "./request-exceptions.scss";

interface IRequestExceptionsProps {
  name: string;
  defaultValue: Array<ComponentBlocksRequestSlotsExceptions>;
  labels: IRequestExceptionsLabels;
  hasOneActivatedRequestTaked: boolean;
}

export interface newBlockExceptionSlot {
  __typename?: "ComponentBlocksRequestSlotsExceptions";
  exceptionType?: Maybe<Enum_Componentblocksrequestslotsexceptions_Exceptiontype>;
  id?: Scalars["ID"];
  slotException?: Maybe<Scalars["JSON"]>;
}

export default function RequestExceptions({
  name,
  defaultValue,
  labels,
  hasOneActivatedRequestTaked,
}: IRequestExceptionsProps) {
  const { register } = useFormContext();
  register(name, { value: defaultValue });
  /* Local Data */
  const [exceptionBlocks, setExceptionBlocks] =
    useState<Array<newBlockExceptionSlot>>(defaultValue);

  return (
    <>
      <div className="c-RequestExceptions">
        {exceptionBlocks.map((block, i) => {
          return (
            <RequestExceptionBlock
              key={i}
              name={name}
              blockIndex={i}
              labels={labels}
              exceptionBlocks={exceptionBlocks}
              setExceptionBlocks={setExceptionBlocks}
              hasOneActivatedRequestTaked={hasOneActivatedRequestTaked}
            />
          );
        })}
      </div>
      <div className="c-RequestExceptions__Button">
        <CommonButton
          label={labels.addExceptionButton}
          picto="warning"
          onClick={() =>
            setExceptionBlocks([
              ...exceptionBlocks,
              {
                exceptionType: undefined,
                __typename: "ComponentBlocksRequestSlotsExceptions",
                slotException: {
                  hasAppointmentSlots: false,
                },
              },
            ])
          }
        />
      </div>
    </>
  );
}
