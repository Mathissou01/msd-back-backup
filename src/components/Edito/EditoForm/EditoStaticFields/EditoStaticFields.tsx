import { useEffect, useState } from "react";
import { useGetTagsByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import { ICommonSelectOption } from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormInput from "../../../Form/FormInput/FormInput";
import FormSingleMultiselect from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import "./edito-static-fields.scss";

interface IEditoStaticFieldsProps {
  titleLabel: string;
  tagsLabel: string;
  tagsLabelDescription: string;
  shortDescriptionLabel: string;
  maxCharactersLabel: string;
  maxCharacters?: number;
}

export default function EditoStaticFields({
  titleLabel,
  tagsLabel,
  tagsLabelDescription,
  shortDescriptionLabel,
  maxCharactersLabel,
  maxCharacters = 80,
}: IEditoStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  /* External Data */
  const { contractId } = useContract();
  const { data: tagsData } = useGetTagsByContractIdQuery({
    variables: { contractId },
  });

  const [tagOptions, setTagOptions] = useState<Array<ICommonSelectOption>>([]);

  useEffect(() => {
    if (tagsData) {
      const mappedTags: Array<ICommonSelectOption> =
        tagsData.tags?.data?.map((tag) => {
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
        label={titleLabel}
        isRequired={true}
      />
      <div className="c-EditoStaticFields__Tags">
        <FormSingleMultiselect
          label={tagsLabel}
          labelDescription={tagsLabelDescription}
          name="tags"
          options={tagOptions}
          isMulti
          maxMultiSelection={5}
        />
      </div>
      <div className="c-EditoStaticFields__ShortDescription">
        <FormInput
          type="text"
          name="shortDescription"
          label={shortDescriptionLabel}
          maxLengthValidation={maxCharacters}
          validationLabel={`${maxCharacters} ${maxCharactersLabel}`}
          isRequired
          tagType="textarea"
        />
      </div>
    </div>
  );
}
