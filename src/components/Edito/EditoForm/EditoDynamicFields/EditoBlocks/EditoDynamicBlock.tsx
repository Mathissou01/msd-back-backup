import React from "react";
import { TDynamicFieldOption } from "../../../../../lib/edito";
import SubHeadingBlock from "../EditoBlocks/SubHeadingBlock/SubHeadingBlock";
import HorizontalRuleBlock from "./HorizontalRuleBlock/HorizontalRuleBlock";
import VideoBlock from "./VideoBlock/VideoBlock";

interface IDynamicFieldsBlockWrapper {
  type: TDynamicFieldOption;
  name: string;
}

export default function EditoDynamicBlock({
  type,
  name,
}: IDynamicFieldsBlockWrapper) {
  function getBlockComponent(type: TDynamicFieldOption) {
    switch (type) {
      case "ComponentBlocksHorizontalRule": {
        return <HorizontalRuleBlock blockName={name} />;
      }
      case "ComponentBlocksSubHeading": {
        return <SubHeadingBlock blockName={name} />;
      }
      case "ComponentBlocksVideo": {
        return <VideoBlock blockName={name} />;
      }
      default: {
        return null;
      }
    }
  }

  return getBlockComponent(type);
}
