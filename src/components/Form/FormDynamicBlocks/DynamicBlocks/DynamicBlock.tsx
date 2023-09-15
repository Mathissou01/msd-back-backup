import React from "react";
import { TDynamicFieldOption } from "../../../../lib/dynamic-blocks";
import WysiwygBlock from "./Editorial/WysiwygBlock/WysiwygBlock";
import HorizontalRuleBlock from "./Editorial/HorizontalRuleBlock/HorizontalRuleBlock";
import SubHeadingBlock from "./Editorial/SubHeadingBlock/SubHeadingBlock";
import VideoBlock from "./Editorial/VideoBlock/VideoBlock";
import FileBlock from "./Editorial/FileBlock/FileBlock";
import ImageBlock from "./Editorial/ImageBlock/ImageBlock";
import AttachmentsBlock from "./Request/AttachmentsBlock/AttachmentsBlock";
import QcmBlock from "./Request/QcmBlock/QcmBlock";
import QuestionsBlock from "./Request/QuestionsBlock/QuestionsBlock";
import CommentaryBlock from "./Request/CommentaryBlock/CommentaryBlock";
import CheckboxBlock from "./Request/CheckboxBlock/CheckboxBlock";
import DownloadableFilesBlock from "./DropOffMap/DownloadableFilesBlock/DownloadableFilesBlock";
import RequestTypeBlock from "./Request/RequestTypeBlock/RequestTypeBlock";
import DateChoiceBlock from "./Request/DateChoiceBlock/DateChoiceBlock";
import CumbersomeBlock from "./Request/CumbersomeBlock/CumbersomeBlock";
import RequestSlotEntityBlock from "./Request/RequestSlotEntityBlock/RequestSlotEntityBlock";
import ServicesBlock from "./Editorial/ServicesBlock/ServicesBlock";

interface IDynamicFieldsBlockWrapper {
  type: TDynamicFieldOption;
  name: string;
  isVisible: boolean;
  onChangeBlockTitle: (newBlockTitle: string) => void;
}

export default function DynamicBlock({
  type,
  name,
  isVisible,
  onChangeBlockTitle,
}: IDynamicFieldsBlockWrapper) {
  function getBlockComponent(type: TDynamicFieldOption) {
    switch (type) {
      case "ComponentBlocksFile": {
        return <FileBlock blockName={name} />;
      }
      case "ComponentBlocksHorizontalRule": {
        return <HorizontalRuleBlock blockName={name} />;
      }
      case "ComponentBlocksImage": {
        return <ImageBlock blockName={name} />;
      }
      case "ComponentBlocksSubHeading": {
        return <SubHeadingBlock blockName={name} />;
      }
      case "ComponentBlocksVideo": {
        return <VideoBlock blockName={name} isVisible={isVisible} />;
      }
      case "ComponentBlocksWysiwyg": {
        return <WysiwygBlock blockName={name} isVisible={isVisible} />;
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
      case "ComponentBlocksCommentary": {
        return <CommentaryBlock blockName={name} />;
      }
      case "ComponentBlocksCheckbox": {
        return <CheckboxBlock blockName={name} />;
      }
      case "ComponentBlocksDownloadBlock": {
        return <DownloadableFilesBlock blockName={name} />;
      }
      case "ComponentBlocksRequestType": {
        return <RequestTypeBlock blockName={name} />;
      }
      case "ComponentBlocksDateChoice": {
        return <DateChoiceBlock blockName={name} />;
      }
      case "ComponentBlocksCumbersome": {
        return <CumbersomeBlock blockName={name} />;
      }
      case "RequestSlotEntity": {
        return (
          <RequestSlotEntityBlock
            blockName={name}
            onChangeTitle={onChangeBlockTitle}
          />
        );
      }
      case "ComponentBlocksServices": {
        return <ServicesBlock blockName={name} />;
      }
      default: {
        return null;
      }
    }
  }

  return getBlockComponent(type);
}
