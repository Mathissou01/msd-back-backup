import { useEffect, useState } from "react";
import {
  useGetFlowsByContractIdQuery,
  useGetTagsByContractIdQuery,
  useGetWasteFamiliesByContractIdQuery,
  WasteFamilyEntity,
} from "../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../lib/utilities";
import { TAcceptedMimeTypes } from "../../../../lib/media";
import { useContract } from "../../../../hooks/useContract";
import { IOptionWrapper } from "../../../Form/FormMultiselect/FormMultiselect";
import FormSingleMultiselect, {
  IFormSingleMultiselectOption,
} from "../../../Form/FormSingleMultiselect/FormSingleMultiselect";
import FormInput from "../../../Form/FormInput/FormInput";
import FormSelect from "../../../Form/FormSelect/FormSelect";
import FormFileInput from "../../../Form/FormFileInput/FormFileInput";
import FormRadioInput from "../../../Form/FormRadioInput/FormRadioInput";
import CommonLoader from "../../../Common/CommonLoader/CommonLoader";

export interface IWasteFormStaticFieldsLabels {
  staticTitle: string;
  staticTags: string;
  staticWasteFamily: string;
  staticPicto: string;
  staticFlow: string;
  staticRecyclingGestureText: string;
  staticImageValidation: string;
  staticImagePlaceholder: string;
}

export type TWasteFormStaticFields =
  | "name"
  | "wasteFamily"
  | "tags"
  | "picto"
  | "flow"
  | "recyclingGestureText";

interface IWasteFormStaticFieldsProps {
  labels: IWasteFormStaticFieldsLabels;
  enabledFieldsOverride?: Array<TWasteFormStaticFields>;
}

export default function WasteFormStaticFields({
  labels,
  enabledFieldsOverride,
}: IWasteFormStaticFieldsProps) {
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
  const flowErrorMessage = "Erreur: Aucun Flux activé";

  /* Methods */
  function wasteFamilySelectDisplayTransformFunction(
    wasteFamily: WasteFamilyEntity,
  ): string {
    return wasteFamily.attributes?.familyName ?? "";
  }

  function hasFieldEnabled(fieldName: TWasteFormStaticFields) {
    return (
      !enabledFieldsOverride ||
      enabledFieldsOverride?.find((field) => field === fieldName)
    );
  }

  /* Local Data */
  const { contractId } = useContract();
  const [tagOptions, setTagOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const [wasteFamilyOptions, setWasteFamilyOptions] = useState<
    Array<IOptionWrapper<WasteFamilyEntity>>
  >([]);
  const [activeFlowOptions, setActiveFlowOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const {
    data: tagsData,
    loading: tagsLoading,
    error: tagsError,
  } = useGetTagsByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "network-only",
  });
  const {
    data: wasteFamiliesData,
    loading: wasteFamiliesLoading,
    error: wasteFamiliesError,
  } = useGetWasteFamiliesByContractIdQuery({
    variables: { contractId },
    fetchPolicy: "network-only",
  });
  const {
    data: activeFlowData,
    loading: activeFlowLoading,
    error: activeFlowError,
  } = useGetFlowsByContractIdQuery({
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
  const isLoading = tagsLoading || wasteFamiliesLoading || activeFlowLoading;
  const errors = [tagsError, wasteFamiliesError, activeFlowError];

  useEffect(() => {
    if (tagsData) {
      const mappedTags: Array<IFormSingleMultiselectOption> =
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
      setActiveFlowOptions(mappedActiveFlow);
    }
  }, [tagsData, wasteFamiliesData, activeFlowData]);

  return (
    <CommonLoader isLoading={isLoading} errors={errors}>
      <div className="o-Form__Group">
        <span className="o-Form__RequiredLabel">{mandatoryFields}</span>
        {hasFieldEnabled("name") && (
          <FormInput
            type="text"
            name="name"
            label={labels.staticTitle}
            isRequired={true}
          />
        )}
        {hasFieldEnabled("wasteFamily") && (
          <FormSelect<WasteFamilyEntity>
            label={labels.staticWasteFamily}
            name="wasteFamily"
            displayTransform={wasteFamilySelectDisplayTransformFunction}
            options={wasteFamilyOptions}
            optionKey={"id"}
          />
        )}
        {hasFieldEnabled("tags") && (
          <FormSingleMultiselect
            label={labels.staticTags}
            labelDescription="(Tags)"
            name="tags"
            options={tagOptions}
            isMulti
            maxMultiSelection={5}
          />
        )}
        {hasFieldEnabled("picto") && (
          <FormFileInput
            name="picto"
            label={labels.staticPicto}
            isRequired={true}
            isPriority={true}
            validationLabel={labels.staticImageValidation}
            placeholder={labels.staticImagePlaceholder}
            acceptedMimeTypes={acceptedTypes}
          />
        )}
      </div>
      <div className="o-Form__Group">
        <FormRadioInput
          name="flow"
          displayName={labels.staticFlow}
          emptyLabel={flowErrorMessage}
          options={activeFlowOptions}
          displayMode="vertical"
        />
      </div>
      <div className="o-Form__Group">
        <FormInput
          type="text"
          name="recyclingGestureText"
          label={labels.staticRecyclingGestureText}
        />
      </div>
    </CommonLoader>
  );
}
