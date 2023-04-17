import React from "react";
import { TDynamicFieldOption } from "../../../../../lib/edito";
import SubHeadingBlock from "../EditoBlocks/SubHeadingBlock/SubHeadingBlock";
import FileBlock from "./FileBlock/FileBlock";
import HorizontalRuleBlock from "./HorizontalRuleBlock/HorizontalRuleBlock";
import ImageBlock from "./ImageBlock/ImageBlock";
import VideoBlock from "./VideoBlock/VideoBlock";
import WysiwygBlock from "./WysiwygBlock/WysiwygBlock";

interface IDynamicFieldsBlockWrapper {
  type: TDynamicFieldOption;
  name: string;
  isVisible: boolean;
}

export default function EditoDynamicBlock({
  type,
  name,
  isVisible,
}: IDynamicFieldsBlockWrapper) {
  function getBlockComponent(type: TDynamicFieldOption) {
    switch (type) {
      case "ComponentBlocksWysiwyg": {
        return <WysiwygBlock blockName={name} isVisible={isVisible} />;
      }
      case "ComponentBlocksHorizontalRule": {
        return <HorizontalRuleBlock blockName={name} />;
      }
      case "ComponentBlocksSubHeading": {
        return <SubHeadingBlock blockName={name} />;
      }
      case "ComponentBlocksVideo": {
        return <VideoBlock blockName={name} isVisible={isVisible} />;
      }
      case "ComponentBlocksFile": {
        return <FileBlock blockName={name} />;
      }
      case "ComponentBlocksImage": {
        return <ImageBlock blockName={name} />;
      }
      default: {
        return null;
      }
    }
  }

  return getBlockComponent(type);
}
