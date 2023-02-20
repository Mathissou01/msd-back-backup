import FormInput from "../../../Form/FormInput/FormInput";
import "./edito-static-fields.scss";

export default function EditoStaticFields() {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";
  const formLabels = {
    titlePageContent: "Titre de la page",
    titleShortDescription: "Description courte",
    maxCharactersLabel:
      "caractères maximum, affichés dans l'aperçu de l'actualité",
  };
  const editoStaticFieldsMaxCharacters = 80;

  return (
    <div className="c-EditoStaticFields">
      <span className="c-EditoStaticFields__RequiredLabel">
        {mandatoryFields}
      </span>
      <FormInput
        type="text"
        name="title"
        label={formLabels.titlePageContent}
        isRequired={true}
      />
      <div className="c-EditoStaticFields__Temporary">
        {"TODO : Thématique et vignette"}
      </div>
      <div className="c-EditoStaticFields__DescriptionInput">
        <FormInput
          type="text"
          name="shortDescription"
          label={formLabels.titleShortDescription}
          maxLengthValidation={editoStaticFieldsMaxCharacters}
          validationLabel={`${editoStaticFieldsMaxCharacters} ${formLabels.maxCharactersLabel}`}
          isRequired
          tagType="textarea"
        />
      </div>
    </div>
  );
}
