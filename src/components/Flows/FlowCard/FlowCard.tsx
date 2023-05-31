import Image from "next/image";
import React, { useState } from "react";
import {
  useUpdateFlowMutation,
  GetFlowsByContractIdDocument,
} from "../../../graphql/codegen/generated-types";
import { IFlow } from "../../../lib/flows";
import CommonToggle from "../../Common/CommonToggle/CommonToggle";
import "./flow-card.scss";

interface IFlowCardProps {
  flow: IFlow;
  onOpenFlow: (flow: IFlow) => void;
}

export function FlowCard({ flow, onOpenFlow }: IFlowCardProps) {
  /* Methods */
  const onChangeHandler = (isToggleActiveUpdated: boolean) => {
    if (isToggleActiveUpdated) {
      setIsToggleActive(true);
    } else {
      setIsToggleActive(false);
    }

    const variables = {
      updateFlowId: flow.id,
      data: {
        isActivated: isToggleActiveUpdated,
      },
    };
    return updateFlow({
      variables,
      refetchQueries: [
        {
          query: GetFlowsByContractIdDocument,
          variables: { id: flow.id },
        },
      ],
    });
  };

  /* Local Data */
  const [isToggleActive, setIsToggleActive] = useState<boolean>();
  // TODO: try to use loading and error from mutation
  const [updateFlow] = useUpdateFlowMutation({
    refetchQueries: [
      "getFlowsByContractId",
      "getCollectionMethodsByContractId",
    ],
  });

  return (
    <div className="c-FlowCard">
      <div className="c-FlowCard__Name">{flow.name}</div>
      <div className="c-FlowCard__Modifications">
        <div className="c-FlowCard__Edit">
          <button type="button" onClick={() => onOpenFlow(flow)}>
            <Image
              src={"/images/pictos/edit.svg"}
              alt={""}
              width={16}
              height={16}
            />
          </button>
        </div>
        <div className="c-FlowCard__ToogleActivation">
          <CommonToggle
            onChange={(isToggleActiveUpdated) =>
              onChangeHandler(isToggleActiveUpdated)
            }
            checked={isToggleActive ? isToggleActive : flow.isActivated}
            disabled={flow.name === "Ordure Ménagère"}
          />
        </div>
      </div>
    </div>
  );
}
