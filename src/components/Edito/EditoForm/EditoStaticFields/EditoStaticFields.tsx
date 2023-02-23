import { useEffect, useState } from "react";
import { useGetTagQuery } from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import CommonSelect, {
  ICommonSelectOption,
} from "../../../Common/CommonSelect/CommonSelect";
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

  /* External Data */
  const { contractId } = useContract();
  const { data: tagsData } = useGetTagQuery({ variables: { contractId } });

  const [tagOptions, setTagOptions] = useState<Array<ICommonSelectOption>>([]);

  useEffect(() => {
    if (tagsData) {
      const mappedTags: Array<ICommonSelectOption> =
        tagsData.contract?.data?.attributes?.tags?.data.map((tag) => {
          return {
            value: tag.id ?? "",
            label: tag.attributes?.name ?? "",
          };
        }) ?? [];

      setTagOptions(mappedTags);
    }
  }, [tagsData]);

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
      <div className="c-EditoStaticFields__Thematique">
        <CommonSelect
          label="Thématique"
          name="tags"
          placeholder="Thematique"
          options={tagOptions}
          isMulti
          maxMultiSelection={5}
        />
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
