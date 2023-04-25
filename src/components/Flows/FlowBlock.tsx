import React from "react";
import "./flow-block.scss";
import { FlowCard } from "./FlowCard/FlowCard";

interface IFlowCardProps {
  id: string;
  name: string;
  //TODO : add isActivated: boolean;
}

interface IFlowsBlockProps {
  data: Array<IFlowCardProps>;
}

export default function FlowBlock({ data }: IFlowsBlockProps) {
  return (
    <div className="c-FlowBlock">
      {data?.map((flow) => (
        <FlowCard key={flow.id} name={flow.name} />
      ))}
    </div>
  );
}
