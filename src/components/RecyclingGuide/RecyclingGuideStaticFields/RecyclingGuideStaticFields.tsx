import { useEffect, useState } from "react";
import {
  WasteFamilyEntity,
  useGetFlowsByContractIdQuery,
  useGetTagsByContractIdQuery,
  useGetWasteFamiliesByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { TAcceptedMimeTypes } from "../../../lib/media";
import { useContract } from "../../../hooks/useContract";
import FormSingleMultiselect from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import { ICommonSelectOption } from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormInput from "../../Form/FormInput/FormInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import FormFileInput from "../../Form/FormFileInput/FormFileInput";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import "./recycling-guide-static-fields.scss";

export interface IRecyclingGuideStaticFieldsLabels {
  staticTitle: string;
  staticTags: string;
  staticWasteFamily: string;
  staticPicto: string;
  staticFlow: string;
  staticRecyclingGestureText: string;
  staticImageValidation: string;
  staticImagePlaceholder: string;
}

export type TRecyclingGuideStaticFields =
  | "name"
  | "wasteFamily"
  | "tags"
  | "picto"
  | "flow"
  | "recyclingGestureText";

interface IRecyclingGuideStaticFieldsProps {
  labels: IRecyclingGuideStaticFieldsLabels;
  enabledFieldsOverride?: Array<TRecyclingGuideStaticFields>;
}

export default function RecyclingGuideStaticFields({
  labels,
  enabledFieldsOverride,
}: IRecyclingGuideStaticFieldsProps) {
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
  function wasteFamilySelectDisplayTransformFunction(
    wasteFamily: WasteFamilyEntity,
  ): string {
    return wasteFamily.attributes?.familyName ?? "";
  }

  function hasFieldEnabled(fieldName: TRecyclingGuideStaticFields) {
    return (
      !enabledFieldsOverride ||
      enabledFieldsOverride?.find((field) => field === fieldName)
    );
  }

  /* Local Data */
  const { contractId } = useContract();
  const [tagOptions, setTagOptions] = useState<Array<ICommonSelectOption>>([]);
  const [wasteFamilyOptions, setWasteFamilyOptions] = useState<
    Array<IOptionWrapper<WasteFamilyEntity>>
  >([]);
  const [activeFlowOptions, setactiveFlowOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const { data: tagsData } = useGetTagsByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "network-only",
  });
  const { data: wasteFamiliesData } = useGetWasteFamiliesByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "network-only",
  });
  const { data: activeFlowData } = useGetFlowsByContractIdQuery({
    variables: {
      filters: {
        contract: {
          id: {
            eq: contractId,
          },
        },
        isActivated: {
          eq: true,
        },
      },
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (tagsData) {
      const mappedTags: Array<ICommonSelectOption> =
        tagsData.tags?.data
          ?.map((tag) => {
            if (tag?.id && tag.attributes?.name) {
              return {
                value: tag.id,
                label: tag.attributes.name,
              };
            }
          })
          .filter(removeNulls) ?? [];
      setTagOptions(mappedTags);
    }

    if (
      wasteFamiliesData &&
      wasteFamiliesData.recyclingGuideService?.data?.attributes?.wasteFamilies
    ) {
      const mappedWasteFamily: Array<IOptionWrapper<WasteFamilyEntity> | null> =
        wasteFamiliesData.recyclingGuideService?.data?.attributes?.wasteFamilies?.data?.map(
          (wasteFamily) => {
            return wasteFamily ? { option: wasteFamily } : null;
          },
        );
      setWasteFamilyOptions(mappedWasteFamily?.filter(removeNulls));
    }

    if (activeFlowData && activeFlowData.flows?.data) {
      const mappedActiveFlow: Array<{ label: string; value: string }> =
        activeFlowData.flows.data
          .map((flow) => {
            if (flow.id && flow.attributes?.name) {
              return { label: flow.attributes.name, value: flow.id };
            }
          })
          .filter(removeNulls);
      setactiveFlowOptions(mappedActiveFlow);
    }
  }, [tagsData, wasteFamiliesData, activeFlowData]);

  return (
    <>
      <div className="c-RecyclingGuideStaticFields">
        <span className="c-RecyclingGuideStaticFields__RequiredLabel">
          {mandatoryFields}
        </span>
        {hasFieldEnabled("name") && (
          <div className="c-RecyclingGuideStaticFields__Name">
            <FormInput
              type="text"
              name="name"
              label={labels.staticTitle}
              isRequired={true}
            />
          </div>
        )}
        {hasFieldEnabled("wasteFamily") && (
          <div className="c-RecyclingGuideStaticFields__WasteFamily">
            <FormSelect<WasteFamilyEntity>
              label={labels.staticWasteFamily}
              name="wasteFamily"
              displayTransform={wasteFamilySelectDisplayTransformFunction}
              options={wasteFamilyOptions}
              optionKey={"id"}
            />
          </div>
        )}
        {hasFieldEnabled("tags") && (
          <div className="c-RecyclingGuideStaticFields__Tags">
            <FormSingleMultiselect
              label={labels.staticTags}
              labelDescription="(Tags)"
              name="tags"
              options={tagOptions}
              isMulti
              maxMultiSelection={5}
            />
          </div>
        )}
        {hasFieldEnabled("picto") && (
          <div className="c-RecyclingGuideStaticFields__Picto">
            <FormFileInput
              name="picto"
              label={labels.staticPicto}
              isRequired={true}
              isPriority={true}
              validationLabel={labels.staticImageValidation}
              placeholder={labels.staticImagePlaceholder}
              acceptedMimeTypes={acceptedTypes}
              mimeFilterContains="image"
            />
          </div>
        )}
      </div>
      <div className="c-RecyclingGuideStaticFields">
        <div className="c-RecyclingGuideStaticFields__Flow">
          <FormRadioInput
            name="flow"
            displayName={labels.staticFlow}
            options={activeFlowOptions}
            displayMode="vertical"
          />
        </div>
      </div>
      <div className="c-RecyclingGuideStaticFields">
        <div className="c-RecyclingGuideStaticFields__GesteDeTri">
          <FormInput
            type="text"
            name="recyclingGestureText"
            label={labels.staticRecyclingGestureText}
          />
        </div>
      </div>
    </>
  );
}
