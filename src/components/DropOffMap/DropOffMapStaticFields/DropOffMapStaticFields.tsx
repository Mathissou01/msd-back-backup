import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CollectEntity } from "../../../graphql/codegen/generated-types";
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
  const { resetField, watch } = useFormContext();
  const hasCustomAddressWatched = watch("hasCustomAddress");
  const [dropOffMapCollectTypes, setDropOffMapCollectTypes] = useState<
    Array<IOptionWrapper<CollectEntity>>
  >([]);

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

  const dynamicFieldsOptions: Array<TDynamicFieldConfiguration> = [
    { option: "ComponentBlocksDownloadBlock" },
  ];

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
