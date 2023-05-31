import { useEffect, useState } from "react";
import { useGetTagsByContractIdQuery } from "../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../hooks/useContract";
import { ICommonSelectOption } from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormInput from "../../../Form/FormInput/FormInput";
import FormSingleMultiselect from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormFileInput from "../../../Form/FormFileInput/FormFileInput";
import { TAcceptedMimeTypes } from "../../../../lib/media";
import "./editorial-static-fields.scss";

export interface IEditorialStaticFieldsLabels {
  staticTitle: string;
  staticTags?: string;
  staticTagsDescription?: string;
  staticImage?: string;
  staticImageValidation?: string;
  staticImagePlaceholder?: string;
  staticShortDescription?: string;
  staticShortDescriptionMaxCharacters?: string;
}

export type TEditorialStaticFields =
  | "title"
  | "tags"
  | "image"
  | "shortDescription";

interface IEditorialStaticFieldsProps {
  labels: IEditorialStaticFieldsLabels;
  maxCharacters?: number;
  enabledFieldsOverride?: Array<TEditorialStaticFields>;
}

export default function EditorialStaticFields({
  labels,
  maxCharacters = 80,
  enabledFieldsOverride,
}: IEditorialStaticFieldsProps) {
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

  /* Methods */
  function hasFieldEnabled(fieldName: TEditorialStaticFields) {
    return (
      !enabledFieldsOverride ||
      enabledFieldsOverride?.find((field) => field === fieldName)
    );
  }

  /* Local Data */
  const [tagOptions, setTagOptions] = useState<Array<ICommonSelectOption>>([]);
  const { contractId } = useContract();
  const { data: tagsData } = useGetTagsByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "cache-and-network",
  });

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
      <div className="c-EditorialStaticFields">
        <span className="c-EditorialStaticFields__RequiredLabel">
          {mandatoryFields}
        </span>
        {hasFieldEnabled("title") && (
          <FormInput
            type="text"
            name="title"
            label={labels.staticTitle}
            isRequired={true}
          />
        )}
        {hasFieldEnabled("tags") && (
          <div className="c-EditorialStaticFields__Tags">
            <FormSingleMultiselect
              name="tags"
              label={labels.staticTags}
              labelDescription={labels.staticTagsDescription}
              options={tagOptions}
              isMulti
              maxMultiSelection={5}
            />
          </div>
        )}
        {hasFieldEnabled("image") && (
          <div className="c-EditoDynamicFields__Image">
            <FormFileInput
              name="image"
              label={labels.staticImage}
              validationLabel={labels.staticImageValidation}
              placeholder={labels.staticImagePlaceholder}
              isRequired={true}
              acceptedMimeTypes={acceptedTypes}
              mimeFilterContains="image"
              hasEcoConceptionMessage
              isPriority={true}
            />
          </div>
        )}
        {hasFieldEnabled("shortDescription") && (
          <div className="c-EditorialStaticFields__DescriptionInput">
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
        )}
      </div>
    </>
  );
}
