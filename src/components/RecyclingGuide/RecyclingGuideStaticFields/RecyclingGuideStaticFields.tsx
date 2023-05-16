import { useEffect, useState } from "react";
import {
  WasteFamilyEntity,
  useCountContentPerTagQuery,
  useGetFlowsByContractIdQuery,
  useGetRecyclingGuideServiceByContractQuery,
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

export interface IStaticRecyclingGuideStaticFieldsLabels {
  staticTitle: string;
  staticTags: string;
  staticWasteFamily: string;
  staticPicto: string;
  staticFlow: string;
  staticRecyclingGestureText: string;
  staticImageValidation: string;
  staticImagePlaceholder: string;
}

interface IEditoStaticFieldsProps {
  labels: IStaticRecyclingGuideStaticFieldsLabels;
  maxCharacters?: number;
  hideImageField?: boolean;
  hideShortDescriptionField?: boolean;
  hideTagField?: boolean;
}

export default function RecyclingGuideStaticFields({
  labels,
  hideImageField = false,
  hideTagField = false,
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
  const [wasteFamilyOptions, setWasteFamilyOptions] = useState<
    Array<IOptionWrapper<WasteFamilyEntity>>
  >([]);
  const [activeFlowOptions, setactiveFlowOptions] = useState<
    { label: string; value: string }[]
  >([]);

  /* External Data */
  const { contractId } = useContract();
  const { data: tagsData } = useCountContentPerTagQuery({
    variables: { contractId },
  });
  const { data: getRecyclingGuideServiceData } =
    useGetRecyclingGuideServiceByContractQuery({
      variables: {
        contractId,
      },
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
  });

  /** Method */
  function wasteFamilySelectDisplayTransformFunction(
    wasteFamily: WasteFamilyEntity,
  ): string {
    return wasteFamily.attributes?.familyName ?? "";
  }

  useEffect(() => {
    if (tagsData) {
      const mappedTags: Array<ICommonSelectOption> =
        tagsData.countContentPerTag?.map((tag) => {
          return {
            value: tag?.id ?? "",
            label: tag?.name ?? "",
          };
        }) ?? [];
      setTagOptions(mappedTags);
    }

    if (
      getRecyclingGuideServiceData &&
      getRecyclingGuideServiceData.recyclingGuideServices?.data[0].attributes
        ?.wasteFamilies
    ) {
      const mappedWasteFamily: Array<IOptionWrapper<WasteFamilyEntity> | null> =
        getRecyclingGuideServiceData.recyclingGuideServices?.data[0].attributes?.wasteFamilies?.data.map(
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
  }, [tagsData, getRecyclingGuideServiceData, activeFlowData]);

  return (
    <>
      <div className="c-RecyclingGuideStaticFields">
        <span className="c-RecyclingGuideStaticFields__RequiredLabel">
          {mandatoryFields}
        </span>
        <div className="c-RecyclingGuideStaticFields__Name">
          <FormInput
            type="text"
            name="name"
            label={labels.staticTitle}
            isRequired={true}
          />
        </div>
        <div className="c-RecyclingGuideStaticFields__WasteFamily">
          <FormSelect<WasteFamilyEntity>
            label={labels.staticWasteFamily}
            name="wasteFamily"
            displayTransform={wasteFamilySelectDisplayTransformFunction}
            options={wasteFamilyOptions}
            optionKey={"id"}
          />
        </div>
        {!hideTagField && (
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
        {!hideImageField && (
          <div className="c-EditoDynamicFields__Picto">
            <FormFileInput
              name="picto"
              label={labels.staticPicto}
              isRequired={true}
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
