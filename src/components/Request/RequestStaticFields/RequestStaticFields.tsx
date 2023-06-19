import FormInput from "../../Form/FormInput/FormInput";
import "./request-static-fields.scss";

export interface IRequestStaticFieldsLabels {
  staticName: string;
  staticMaxCharacters: string;
}

export type TRequestStaticFields = "name";

interface IRequestStaticFieldsProps {
  labels: IRequestStaticFieldsLabels;
  enabledFieldsOverride?: Array<TRequestStaticFields>;
}

export default function RequestStaticFields({
  labels,
  enabledFieldsOverride,
}: IRequestStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  /* Methods */
  function hasFieldEnabled(fieldName: TRequestStaticFields) {
    return (
      !enabledFieldsOverride ||
      enabledFieldsOverride?.find((field) => field === fieldName)
    );
  }

  /* Local Data */
  return (
    <>
      <div className="c-RequestStaticFields">
        <span className="c-RequestStaticFields__RequiredLabel">
          {mandatoryFields}
        </span>
        {hasFieldEnabled("name") && (
          <div className="c-RequestStaticFields__Name">
            <FormInput
              type="text"
              name="name"
              label={labels.staticName}
              isRequired={true}
              maxLengthValidation={60}
              validationLabel={`60 ${labels.staticMaxCharacters}`}
            />
          </div>
        )}
      </div>
    </>
  );
}
