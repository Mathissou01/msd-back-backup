import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  CollectEntity,
  Enum_Dropoffmap_Wasteformsstatus,
  useGetWasteFormsByContractIdQuery,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import AddressOrGpsFields, {
  AddressOrGpsFieldsLabels,
} from "./AddressOrGpsFields/AddressOrGpsFields";
import { minimalWysiwygEditorOptions } from "../../Form/FormWysiwyg/WysiwygEditor/WysiwygEditor";
import FormInput from "../../Form/FormInput/FormInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import { IOptionWrapper } from "../../Form/FormMultiselect/FormMultiselect";
import FormWysiwyg from "../../Form/FormWysiwyg/FormWysiwyg";
import FormLabel from "../../Form/FormLabel/FormLabel";
import FormCheckbox from "../../Form/FormCheckbox/FormCheckbox";
import FormDynamicBlocks from "../../Form/FormDynamicBlocks/FormDynamicBlocks";
import FormOpeningHours from "../../Form/FormOpeningHours/FormOpeningHours";
import { TDynamicFieldConfiguration } from "../../../lib/dynamic-blocks";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import FormSingleMultiselect, {
  IFormSingleMultiselectOption,
} from "../../Form/FormSingleMultiselect/FormSingleMultiselect";
import { useContract } from "../../../hooks/useContract";

const validationPhoneNumber = /^[0-9]{10}$/;

export interface IDropOffMapStaticFieldsLabels {
  staticName: string;
  staticCollectType: string;
  staticDescription?: string;
  staticPosition: string;
  staticPositionDescription: string;
  staticAddressOrGpsLabels: AddressOrGpsFieldsLabels;
  staticPhoneNumber?: string;
  staticMustKnow: string;
  staticHasCustomAddress: string;
  staticDropOffWasteFormStatus: string;
  staticDropOffWasteFormDescription: string;
  staticDropOffWasteFormList: string;
}

interface IDropOffMapStaticFieldsProps {
  labels: IDropOffMapStaticFieldsLabels;
  collectTypes: Array<CollectEntity>;
}

export default function DropOffMapStaticFields({
  labels,
  collectTypes,
}: IDropOffMapStaticFieldsProps) {
  /* Static Data */
  const validationErrorMessage = "Numéro de téléphone invalide";
  const mandatoryFields = "Tous les champs marqués d'une * sont obligatoires.";

  /* Local Data */
  const { contractId } = useContract();
  const { resetField, watch } = useFormContext();
  const hasCustomAddressWatched = watch("hasCustomAddress");
  const [dropOffMapCollectTypes, setDropOffMapCollectTypes] = useState<
    Array<IOptionWrapper<CollectEntity>>
  >([]);
  const [wasteFormOptions, setWasteFormOptions] = useState<
    Array<IFormSingleMultiselectOption>
  >([]);
  const { data: wasteFormData } = useGetWasteFormsByContractIdQuery({
    variables: {
      contractId: contractId,
      statusFilter: "published",
    },
  });
  const dropOffMapCollectTypeWatched = watch("dropOffMapCollectType");
  const dynamicFieldsOptions: Array<TDynamicFieldConfiguration> = [
    { option: "ComponentBlocksDownloadBlock" },
  ];

  function dropOffMapCollectTypesSelectDisplayTransformFunction(
    wasteFamily: CollectEntity,
  ): string {
    return wasteFamily.name ?? "";
  }

  useEffect(() => {
    if (collectTypes) {
      const mappedDropOffMapCollectTypes: Array<IOptionWrapper<CollectEntity> | null> =
        collectTypes
          .map((collectType) => {
            return collectType ? { option: collectType } : null;
          })
          .filter(removeNulls);
      setDropOffMapCollectTypes(
        mappedDropOffMapCollectTypes?.filter(removeNulls),
      );
    }
  }, [collectTypes]);

  useEffect(() => {
    if (
      wasteFormData &&
      wasteFormData.wasteForms &&
      wasteFormData.wasteForms.data
    ) {
      const mappedDropOffMapCollectTypes: Array<IFormSingleMultiselectOption> =
        wasteFormData.wasteForms.data
          .map((wasteFormData) => {
            if (
              wasteFormData &&
              wasteFormData.id &&
              wasteFormData.attributes &&
              wasteFormData.attributes.name
            ) {
              return {
                value: wasteFormData.id,
                label: wasteFormData.attributes.name,
              };
            }
          })
          .filter(removeNulls);
      setWasteFormOptions(mappedDropOffMapCollectTypes?.filter(removeNulls));
    }
  }, [wasteFormData]);

  return (
    <>
      <div className="o-Form__Group">
        <span className="o-Form__RequiredLabel">{mandatoryFields}</span>
        <FormInput
          type="text"
          name="name"
          label={labels.staticName}
          isRequired={true}
        />
        <FormSelect<CollectEntity>
          label={labels.staticCollectType}
          name="dropOffMapCollectType"
          isRequired
          options={dropOffMapCollectTypes}
          displayTransform={
            dropOffMapCollectTypesSelectDisplayTransformFunction
          }
          optionKey={"uniqueId"}
        />
      </div>
      <div className="o-Form__Group">
        <FormLabel
          label={labels.staticPosition}
          validationLabel={labels.staticPositionDescription}
        />
        <AddressOrGpsFields labels={labels.staticAddressOrGpsLabels} />
        <FormCheckbox
          label={labels.staticHasCustomAddress}
          name="hasCustomAddress"
          onClick={() => {
            resetField("customAddress", { defaultValue: "" });
          }}
        />
        <FormInput
          type="text"
          name="customAddress"
          label=""
          isDisabled={!hasCustomAddressWatched}
        />
        <FormInput
          type="tel"
          name="phoneNumber"
          label={labels.staticPhoneNumber}
          patternValidation={validationPhoneNumber}
          patternValidationErrorMessage={validationErrorMessage}
        />
      </div>
      <div className="o-Form__Group">
        <FormWysiwyg
          name="mustKnow"
          label={labels.staticMustKnow}
          editorOptions={minimalWysiwygEditorOptions}
          isVisible
        />
      </div>
      {dropOffMapCollectTypeWatched !== undefined &&
        dropOffMapCollectTypeWatched !== null &&
        dropOffMapCollectTypeWatched.entityTypeName ===
          "CollectDropOffEntity" && (
          <div className="o-Form__Group">
            <FormRadioInput
              name="wasteFormsStatus"
              displayName={labels.staticDropOffWasteFormStatus}
              secondaryDisplayName={labels.staticDropOffWasteFormDescription}
              isRequired
              displayMode="vertical"
              options={[
                {
                  label: "Sélectionner les déchets acceptés",
                  value: Enum_Dropoffmap_Wasteformsstatus.Accepted,
                },
                {
                  label: "Sélectionner les déchets refusés",
                  value: Enum_Dropoffmap_Wasteformsstatus.Refused,
                },
              ]}
            />
            {watch("wasteFormsStatus") && (
              <FormSingleMultiselect
                name="wasteFormsList"
                label={`${labels.staticDropOffWasteFormList} ${
                  watch("dropOffWasteFormStatus") ===
                  Enum_Dropoffmap_Wasteformsstatus.Accepted
                    ? "acceptés"
                    : "refusés"
                }`}
                options={wasteFormOptions}
                isMulti
                isRequired
              />
            )}
          </div>
        )}

      <div className="o-Form__Group">
        <FormDynamicBlocks
          name="downloadableFiles"
          blockConfigurations={dynamicFieldsOptions}
        />
      </div>
      <div className="o-Form__Group">
        <FormOpeningHours name={"openingHoursBlocks"} />
      </div>
    </>
  );
}
