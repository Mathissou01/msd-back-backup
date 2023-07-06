import { useFormContext } from "react-hook-form";
import FormCheckbox from "../../../Form/FormCheckbox/FormCheckbox";
import FormInput from "../../../Form/FormInput/FormInput";
import FormWysiwyg from "../../../Form/FormWysiwyg/FormWysiwyg";
import { minimalWysiwygEditorOptions } from "../../../Form/FormWysiwyg/WysiwygEditor/WysiwygEditor";
import "./request-static-proof-of-receipt.scss";

export interface IRequestStaticProofOfReceiptLabels {
  staticTitle: string;
  staticSendProofOfReceiptLabel: string;
  staticProofOfReceiptSubjectLabel: string;
  staticProofOfReceiptHeaderLabel: string;
}

interface IRequestStaticProofOfReceiptProps {
  labels: IRequestStaticProofOfReceiptLabels;
}

export default function RequestStaticProofOfReceipt({
  labels,
}: IRequestStaticProofOfReceiptProps) {
  /* Static Data */
  const validationLabel = "50 caractères maximum";

  /* Local Data */
  const { watch, resetField } = useFormContext();
  const isSendProofOfReceipt = watch("sendProofOfReceipt");

  return (
    <>
      <div className="c-RequestStaticProofOfReceipt__Title">
        {labels.staticTitle}
      </div>
      <FormCheckbox
        name="sendProofOfReceipt"
        label={labels.staticSendProofOfReceiptLabel}
        onClick={() => {
          resetField("proofOfReceiptSubject", { defaultValue: "" });
          resetField("proofOfReceiptHeader", { defaultValue: "" });
        }}
      />
      <FormInput
        name="proofOfReceiptSubject"
        label={labels.staticProofOfReceiptSubjectLabel}
        validationLabel={validationLabel}
        isRequired={isSendProofOfReceipt}
        isDisabled={!isSendProofOfReceipt}
        maxLengthValidation={50}
      />
      <FormWysiwyg
        name="proofOfReceiptHeader"
        label={labels.staticProofOfReceiptHeaderLabel}
        isRequired={isSendProofOfReceipt}
        isDisabled={!isSendProofOfReceipt}
        editorOptions={{ ...minimalWysiwygEditorOptions, height: 200 }}
      />
    </>
  );
}
