import React from "react";
import { IBlocksAttachments } from "../../../../../../lib/dynamic-blocks";
import FormCheckbox from "../../../../FormCheckbox/FormCheckbox";
import FormInput from "../../../../FormInput/FormInput";
import "./attachments-block.scss";

interface IAttachmentsBlock {
  blockName: string;
}

export default function AttachmentsBlock({ blockName }: IAttachmentsBlock) {
  /* Static Data */
  const labels = {
    staticLabel: 'Libellé sur champ "Pièce jointe"',
    staticRenderField: 'Rendre le champ "Pièce jointe" obligatoire',
    staticMultipleAttachments: "Pièces jointes multiples",
  };

  const fieldNames: { [name: string]: keyof IBlocksAttachments } = {
    attachmentLabel: "attachmentLabel",
    renderField: "renderField",
    multipleAttachments: "multipleAttachments",
  };

  return (
    <div className="c-AttachmentsBlock">
      <div className="c-AttachmentsBlock__Field c-AttachmentsBlock__AttachmentLabel">
        <FormInput
          type="text"
          name={`${blockName}.${fieldNames.attachmentLabel}`}
          label={labels.staticLabel}
          isRequired
        />
      </div>
      <div className="c-AttachmentsBlock__Field c-AttachmentsBlock__RenderField">
        <FormCheckbox
          name={`${blockName}.${fieldNames.renderField}`}
          label={labels.staticRenderField}
          defaultChecked={false}
        />
      </div>
      <div className="c-AttachmentsBlock__Field c-AttachmentsBlock__MultipleAttachments">
        <FormCheckbox
          name={`${blockName}.${fieldNames.multipleAttachments}`}
          label={labels.staticMultipleAttachments}
          defaultChecked={false}
        />
      </div>
    </div>
  );
}
