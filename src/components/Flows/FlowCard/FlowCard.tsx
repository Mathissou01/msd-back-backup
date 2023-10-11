import React, { useState } from "react";
import {
  useUpdateFlowByIdMutation,
  GetFlowsDocument,
} from "../../../graphql/codegen/generated-types";
import { IFlow } from "../../../lib/flows";
import { getRightsByLabel } from "../../../lib/user";
import { useUser } from "../../../hooks/useUser";
import CommonToggle from "../../Common/CommonToggle/CommonToggle";
import PseudoImageFallback from "../../Accessibility/PseudoImageFallback/PseudoImageFallback";
import "./flow-card.scss";

interface IFlowCardProps {
  flow: IFlow;
  onOpenFlow: (flow: IFlow) => void;
}

export function FlowCard({ flow, onOpenFlow }: IFlowCardProps) {
  /* Static Data */
  const accessibilityLabels = {
    edit: "Modifier",
  };

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
          query: GetFlowsDocument,
          variables: { id: flow.id },
        },
      ],
    });
  };

  /* Local Data */
  const [isToggleActive, setIsToggleActive] = useState<boolean>();
  // TODO: try to use loading and error from mutation
  const [updateFlow] = useUpdateFlowByIdMutation({
    refetchQueries: ["getFlows", "getCollectionMethods"],
  });
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Flow", userRights);

  return (
    <div className="c-FlowCard">
      <div className="c-FlowCard__Name">{flow.name}</div>
      <div className="c-FlowCard__Modifications">
        <button
          className="c-FlowCard__Edit"
          type="button"
          onClick={() => onOpenFlow(flow)}
          disabled={!userPermissions.update}
          title={accessibilityLabels.edit}
        >
          <PseudoImageFallback alt={accessibilityLabels.edit} />
        </button>
        <div className="c-FlowCard__ToogleActivation">
          <CommonToggle
            onChange={(isToggleActiveUpdated) =>
              onChangeHandler(isToggleActiveUpdated)
            }
            checked={isToggleActive ? isToggleActive : flow.isActivated}
            disabled={
              flow.name === "Ordure Ménagère" || !userPermissions.update
            }
          />
        </div>
      </div>
    </div>
  );
}
