import { useRef } from "react";
import { MultiValue } from "react-select";
import { useMount } from "react-use";
import { useFormContext } from "react-hook-form";
import FormSingleMultiselect, {
  IFormSingleMultiselectOption,
} from "../../../../FormSingleMultiselect/FormSingleMultiselect";
import {
  useCreateSectorizationMutation,
  useGetSectorizationsByContractIdQuery,
} from "../../../../../../graphql/codegen/generated-types";
import { IBlocksRequestSlot } from "../../../../../../lib/dynamic-blocks";
import { removeNulls } from "../../../../../../lib/utilities";
import { ISectorsTableRow } from "../../../../../../lib/sectors";
import { useContract } from "../../../../../../hooks/useContract";
import CommonLoader from "../../../../../Common/CommonLoader/CommonLoader";
import CommonButton from "../../../../../Common/CommonButton/CommonButton";
import CommonModalWrapper, {
  CommonModalWrapperRef,
  ICommonModalWrapperSize,
} from "../../../../../Common/CommonModalWrapper/CommonModalWrapper";
import SectorModal from "../../../../../Sector/SectorForm/SectorForm";
import "./request-slot-block.scss";

interface IRequestSlotBlockProps {
  blockName: string;
  onChangeTitle: (newTitle: string) => void;
}

export default function RequestSlotBlock({
  blockName,
  onChangeTitle,
}: IRequestSlotBlockProps) {
  /* Static Data */
  const defaultTitle = "Nouvel encart créneaux par secteur(s)";
  const labels = {
    sectorizations: "Secteur(s)",
    createSector: "Créer un secteur",
  };
  const fieldNames: { [name: string]: keyof IBlocksRequestSlot } = {
    sectorizations: "sectorizations",
    timeSlots: "timeSlots",
    slotsExceptions: "slotsExceptions",
    slotMessage: "slotMessage",
    noSlotMessage: "noSlotMessage",
  };

  /* Methods */
  function onSectorsChange(
    selectedOptions: MultiValue<IFormSingleMultiselectOption>,
  ) {
    if (selectedOptions.length >= 1) {
      const newTitle = selectedOptions.map((option) => option.label).join(", ");
      onChangeTitle(newTitle);
    } else {
      onChangeTitle(defaultTitle);
    }
  }

  async function onSubmit(submitData: ISectorsTableRow) {
    void onSubmitAndModalRefresh(submitData);
    modalRef.current?.toggleModal(false);
  }

  async function onSubmitAndModalRefresh(submitData: ISectorsTableRow) {
    const variables = {
      data: {
        name: submitData.name,
        description: submitData.description,
        contract: contractId,
        polygonCoordinates: submitData.polygonData,
      },
    };
    void createSectorization({
      variables,
      onCompleted: (result) => {
        if (
          result.createSectorization?.data?.id &&
          result.createSectorization.data.attributes?.name
        ) {
          const newSecorizationsValues: Array<IFormSingleMultiselectOption> = [
            ...getValues(sectorizationsFieldName),
          ];
          newSecorizationsValues.push({
            label: result.createSectorization?.data?.attributes?.name,
            value: result.createSectorization?.data?.id,
          });
          setValue(sectorizationsFieldName, newSecorizationsValues);
          onSectorsChange(newSecorizationsValues);
        }
      },
    });
  }

  /* Local Data */
  const modalRef = useRef<CommonModalWrapperRef>();
  const { contractId } = useContract();
  const { data, loading, error } = useGetSectorizationsByContractIdQuery({
    variables: { contractId },
  });
  const [createSectorization, { loading: createLoading, error: createError }] =
    useCreateSectorizationMutation({
      refetchQueries: ["getSectorizationsByContractId"],
      awaitRefetchQueries: true,
    });
  // Grab the requestSlots field of parent form, get all RequestSlot blocks and look at current value of sectorizations multiselect,
  // filter available options to only be options that are not already selected in other RequestSlot blocks
  const { getValues, setValue } = useFormContext();
  const sectorizationsFieldName = `${blockName}.${fieldNames.sectorizations}`;
  const alreadyUsedSectorIds = (
    getValues(blockName.split(".")[0]) as Array<IBlocksRequestSlot>
  ).flatMap((slot) => slot.sectorizations?.map((sector) => sector.value));
  const sectorizationOptions: Array<IFormSingleMultiselectOption> =
    data?.sectorizations?.data
      .filter((sector) => {
        return sector.id && !alreadyUsedSectorIds.includes(sector.id);
      })
      .map((sector) => {
        if (sector.id && sector.attributes?.name) {
          return {
            label: sector.attributes.name,
            value: sector.id,
          };
        }
      })
      .filter(removeNulls) ?? [];
  const isLoading = loading || !sectorizationOptions || createLoading;
  const errors = [error, createError];

  useMount(() => {
    const values = getValues(sectorizationsFieldName);
    values?.length > 0 ? onSectorsChange(values) : onChangeTitle(defaultTitle);
  });

  return (
    <div className="c-RequestSlotBlock">
      <div>
        <CommonLoader isLoading={isLoading} errors={errors}>
          <FormSingleMultiselect
            name={`${blockName}.${fieldNames.sectorizations}`}
            label={labels.sectorizations}
            options={sectorizationOptions}
            isMulti={true}
            onSelectChange={onSectorsChange}
          />
          <div className="c-RequestSlotBlock__CreateButton">
            <CommonButton
              label={labels.createSector}
              onClick={() => modalRef.current?.toggleModal()}
            />
          </div>
        </CommonLoader>
      </div>
      <span>Créneaux</span>
      <span>Message affichés sous les créneaux</span>
      <span>Message affiché en cas d’absence de créneaux</span>
      {/* SECTORIZATION MODAL */}
      <CommonModalWrapper ref={modalRef} size={ICommonModalWrapperSize.LARGE}>
        <SectorModal
          onSubmitValid={(data) => onSubmit(data as ISectorsTableRow)}
          onSubmitAndModalRefresh={(data) =>
            onSubmitAndModalRefresh(data as ISectorsTableRow)
          }
          defaultValue={undefined}
          handleCloseModal={() => modalRef.current?.toggleModal(false)}
          onUpdate={(data) => onSubmit(data as ISectorsTableRow)}
        />
      </CommonModalWrapper>
    </div>
  );
}
