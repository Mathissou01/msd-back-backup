import React from "react";
import { IFlow } from "../../lib/flows";
import { FlowCard } from "./FlowCard/FlowCard";
import "./flows-block.scss";

interface IFlowsBlockProps {
  flows: Array<IFlow>;
  onOpenFlow: (flow: IFlow) => void;
}

export default function FlowsBlock({ flows, onOpenFlow }: IFlowsBlockProps) {
  return (
    <div className="c-FlowsBlock">
      {flows?.map((flow) => (
        <FlowCard key={flow.id} flow={flow} onOpenFlow={onOpenFlow} />
      ))}
    </div>
  );
}
