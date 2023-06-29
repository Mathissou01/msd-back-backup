import React from "react";
import { TDynamicFieldOption } from "../../../../lib/dynamic-blocks";
import WysiwygBlock from "./WysiwygBlock/WysiwygBlock";
import HorizontalRuleBlock from "./HorizontalRuleBlock/HorizontalRuleBlock";
import SubHeadingBlock from "./SubHeadingBlock/SubHeadingBlock";
import VideoBlock from "./VideoBlock/VideoBlock";
import FileBlock from "./FileBlock/FileBlock";
import ImageBlock from "./ImageBlock/ImageBlock";
import AttachmentsBlock from "./AttachmentsBlock/AttachmentsBlock";
import QcmBlock from "./QcmBlock/QcmBlock";
import QuestionsBlock from "./QuestionsBlock/QuestionsBlock";
import DownloadablesFilesBlock from "./DownloadableFiles/DownloadableFilesBlock";
import RequestTypeBlock from "./RequestTypeBlock/RequestTypeBlock";

interface IDynamicFieldsBlockWrapper {
  type: TDynamicFieldOption;
  name: string;
  isVisible: boolean;
}

export default function DynamicBlock({
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
      case "ComponentBlocksAttachments": {
        return <AttachmentsBlock blockName={name} />;
      }
      case "ComponentBlocksQcm": {
        return <QcmBlock blockName={name} />;
      }
      case "ComponentBlocksQuestions": {
        return <QuestionsBlock blockName={name} />;
      }
      case "ComponentBlocksDownloadBlock": {
        return <DownloadablesFilesBlock blockName={name} />;
      }
      case "ComponentBlocksRequestType": {
        return <RequestTypeBlock blockName={name} />;
      }
      default: {
        return null;
      }
    }
  }

  return getBlockComponent(type);
}
