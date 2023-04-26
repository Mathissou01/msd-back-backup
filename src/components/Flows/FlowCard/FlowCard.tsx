import React, { useState } from "react";
import {
  useUpdateFlowMutation,
  GetFlowsByContractIdDocument,
} from "../../../graphql/codegen/generated-types";
import CommonToggle from "../../Common/CommonToggle/CommonToggle";
import "./flow-card.scss";

interface IFlowCardProps {
  name: string;
  flowId: string;
  isActivated: boolean;
}

export function FlowCard({ name, flowId, isActivated }: IFlowCardProps) {
  const [isToggleActive, setIsToggleActive] = useState<boolean>(
    name === "Ordure Ménagère",
  );

  const onChangeHandler = (isToggleActiveUpdated: boolean) => {
    if (isToggleActiveUpdated === true) {
      setIsToggleActive(true);
    } else {
      setIsToggleActive(false);
    }

    const variables = {
      updateFlowId: flowId,
      data: {
        isActivated: isToggleActiveUpdated,
      },
    };
    return updateFlow({
      variables,
      refetchQueries: [
        {
          query: GetFlowsByContractIdDocument,
          variables: { flowId },
        },
      ],
    });
  };

  const [updateFlow] = useUpdateFlowMutation();

  return (
    <div className="c-FlowCard">
      <div className="c-FlowCard__Name">{name}</div>
      <div className="c-FlowCard__Modifications">
        {/* TODO : add <div className="c-FlowCard__Edit"> Edit</div> */}
        <div className="c-FlowCard__ToogleActivation">
          <CommonToggle
            onChange={(isToggleActiveUpdated) =>
              onChangeHandler(isToggleActiveUpdated)
            }
            checked={isToggleActive ? isToggleActive : isActivated}
            disabled={name === "Ordure Ménagère" ? true : false}
          />
        </div>
      </div>
    </div>
  );
}
