import { useEffect, useState } from "react";
import { useGetTagsByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import { ICommonSelectOption } from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormInput from "../../../Form/FormInput/FormInput";
import FormSingleMultiselect from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormFileInput from "../../../Form/FormFileInput/FormFileInput";
import { TAcceptedMimeTypes } from "../../../../lib/media";
import "./edito-static-fields.scss";

export interface IStaticFieldsLabels {
  staticTitle: string;
  staticTags: string;
  staticTagsDescription: string;
  staticImage: string;
  staticImageValidation: string;
  staticImagePlaceholder: string;
  staticShortDescription: string;
  staticShortDescriptionMaxCharacters: string;
}

interface IEditoStaticFieldsProps {
  labels: IStaticFieldsLabels;
  maxCharacters?: number;
}

export default function EditoStaticFields({
  labels,
  maxCharacters = 80,
}: IEditoStaticFieldsProps) {
  /* Static Data */
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";
  const acceptedTypes: Array<TAcceptedMimeTypes> = [
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/svg",
    "image/tiff",
    "image/ico",
    "image/dvu",
  ];

  /** Local Data */
  const [tagOptions, setTagOptions] = useState<Array<ICommonSelectOption>>([]);

  /* External Data */
  const { contractId } = useContract();
  const { data: tagsData } = useGetTagsByContractIdQuery({
    variables: { contractId },
  });

  /** Method */
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
    <>
      <div className="c-EditoStaticFields">
        <span className="c-EditoStaticFields__RequiredLabel">
          {mandatoryFields}
        </span>
        <FormInput
          type="text"
          name="title"
          label={labels.staticTitle}
          isRequired={true}
        />
        <div className="c-EditoStaticFields__Tags">
          <FormSingleMultiselect
            label={labels.staticTags}
            labelDescription={labels.staticTagsDescription}
            name="tags"
            options={tagOptions}
            isMulti
            maxMultiSelection={5}
          />
        </div>
        <div className="c-EditoDynamicFields__Image">
          <FormFileInput
            name="image"
            label={labels.staticImage}
            isRequired={true}
            validationLabel={labels.staticImageValidation}
            placeholder={labels.staticImagePlaceholder}
            acceptedMimeTypes={acceptedTypes}
            mimeFilterContains="image"
            hasEcoConceptionMessage
          />
        </div>
        <div className="c-EditoStaticFields__DescriptionInput">
          <FormInput
            type="text"
            name="shortDescription"
            label={labels.staticShortDescription}
            maxLengthValidation={maxCharacters}
            validationLabel={`${maxCharacters} ${labels.staticShortDescriptionMaxCharacters}`}
            isRequired
            tagType="textarea"
          />
        </div>
      </div>
    </>
  );
}
