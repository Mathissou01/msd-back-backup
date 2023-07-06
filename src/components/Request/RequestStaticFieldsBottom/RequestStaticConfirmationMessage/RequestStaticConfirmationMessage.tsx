import FormWysiwyg from "../../../Form/FormWysiwyg/FormWysiwyg";
import { minimalWysiwygEditorOptions } from "../../../Form/FormWysiwyg/WysiwygEditor/WysiwygEditor";

export interface IRequestStaticConfirmationMessageLabels {
  staticConfirmationMessageLabel: string;
  staticConfirmationMessageInfo: string;
}

interface IRequestStaticConfirmationMessageProps {
  labels: IRequestStaticConfirmationMessageLabels;
}

export const defaultRequestConfirmationMessage = `<p>Bonjour,</p>
<p>Nous vous confirmons que votre demande a bien &eacute;t&eacute; prise en compte.</p>`;

export default function RequestStaticConfirmationMessage({
  labels,
}: IRequestStaticConfirmationMessageProps) {
  /* Static Data */
  const validationLabel = "200 caractères maximum";

  return (
    <FormWysiwyg
      name="confirmationMessage"
      label={labels.staticConfirmationMessageLabel}
      labelDescription={labels.staticConfirmationMessageInfo}
      validationLabel={validationLabel}
      editorOptions={{ ...minimalWysiwygEditorOptions, height: 150 }}
      maxCharacterLength={200}
    />
  );
}
