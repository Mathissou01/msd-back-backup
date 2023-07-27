import { useRef, useState } from "react";
import { MultiValue } from "react-select";
import { useMount } from "react-use";
import { useFormContext } from "react-hook-form";
import FormSingleMultiselect, {
  IFormSingleMultiselectOption,
} from "../../../../FormSingleMultiselect/FormSingleMultiselect";
import {
  Enum_Componentblocksrequestslotsexceptions_Exceptiontype,
  useCreateSectorizationMutation,
  useGetSectorizationsByContractIdQuery,
} from "../../../../../../graphql/codegen/generated-types";
import {
  IBlocksRequestSlotEntity,
  IExceptionSlot,
  ITimeSlots,
} from "../../../../../../lib/dynamic-blocks";
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
import FormWysiwyg from "../../../../FormWysiwyg/FormWysiwyg";
import { minimalWysiwygEditorOptions } from "../../../../FormWysiwyg/WysiwygEditor/WysiwygEditor";
import RequestTimeSlot from "../../../../../Request/RequestTimeSlot/RequestTimeSlot";
import "./request-slot-block.scss";

interface IRequestSlotEntityBlockProps {
  blockName: string;
  onChangeTitle: (newTitle: string) => void;
}

export default function RequestSlotEntityBlock({
  blockName,
  onChangeTitle,
}: IRequestSlotEntityBlockProps) {
  /* Static Data */
  const defaultTitle = "Nouvel encart créneaux par secteur(s)";
  const labels = {
    sectorizations: "Secteur(s)",
    createSector: "Créer un secteur",
    slots: "Créneaux *",
    exception: "Exception",
    from: "du",
    to: "au",
    closed: "Fermé",
    modifySlots: "Modifier les créneaux",
    slotMessage: "Message affiché sous les créneaux",
    noSlotMessage: "Message affiché en cas d'absence de créneaux",
  };
  const fieldNames: { [name: string]: keyof IBlocksRequestSlotEntity } = {
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
  const blockId = blockName.split(".")[1];
  const [timeSlots, setTimeSlots] = useState<Array<ITimeSlots>>([]);
  const [exceptionSlots, setExceptionSlots] = useState<Array<IExceptionSlot>>(
    [],
  );
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
    getValues(blockName.split(".")[0]) as Array<IBlocksRequestSlotEntity>
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
    const slots: Array<IBlocksRequestSlotEntity> = getValues("requestSlots");
    const slot = slots.find((_, slotIndex) => slotIndex === +blockId);
    setTimeSlots(slot?.timeSlots ?? []);
    setExceptionSlots(slot?.slotsExceptions ?? []);
  });

  return (
    <div className="c-RequestSlotEntityBlock">
      <div>
        <CommonLoader isLoading={isLoading} errors={errors}>
          <FormSingleMultiselect
            name={`${blockName}.${fieldNames.sectorizations}`}
            label={labels.sectorizations}
            options={sectorizationOptions}
            isMulti
            isRequired
            onSelectChange={onSectorsChange}
          />
          <div className="c-RequestSlotEntityBlock__CreateButton">
            <CommonButton
              label={labels.createSector}
              onClick={() => modalRef.current?.toggleModal()}
            />
          </div>
        </CommonLoader>
      </div>
      {timeSlots.length > 0 && (
        <div className="c-RequestSlotEntityBlock__Slots">
          <span className="c-RequestSlotEntityBlock__Slots_label">
            {labels.slots}
          </span>
          <div className="c-RequestSlotEntityBlock__Slots_timeSlots">
            {timeSlots.map((timeSlot, index) => {
              return <RequestTimeSlot key={index} timeSlot={timeSlot} />;
            })}
          </div>
        </div>
      )}
      {exceptionSlots.length > 0 && (
        <>
          {exceptionSlots.map((exceptionSlot, index) => (
            <div
              key={index}
              className="c-RequestSlotEntityBlock__ExceptionSlots"
            >
              <>
                <span className="c-RequestSlotEntityBlock__ExceptionSlots_label">
                  {labels.exception}
                </span>
                <span className="c-RequestSlotEntityBlock__ExceptionSlots_date">
                  {exceptionSlot.exceptionType ===
                  Enum_Componentblocksrequestslotsexceptions_Exceptiontype.DateRange
                    ? `${labels.from} ${exceptionSlot.slotException.startDate} ${labels.to} ${exceptionSlot.slotException.endDate}`
                    : exceptionSlot.slotException.startDate}
                </span>
              </>
              <div className="c-RequestSlotEntityBlock__Slots_timeSlots">
                {exceptionSlot.slotException.hasAppointmentSlots &&
                exceptionSlot.slotException.exceptionSlots &&
                exceptionSlot.slotException.exceptionSlots.length > 0 ? (
                  exceptionSlot.slotException.exceptionSlots.map(
                    (timeSlot, index) => {
                      return (
                        <RequestTimeSlot key={index} timeSlot={timeSlot} />
                      );
                    },
                  )
                ) : (
                  <span>{labels.closed}</span>
                )}
              </div>
            </div>
          ))}
        </>
      )}
      <FormWysiwyg
        name={`${blockName}.${fieldNames.slotMessage}`}
        label={labels.slotMessage}
        maxCharacterLength={300}
        editorOptions={{ ...minimalWysiwygEditorOptions, height: 150 }}
      />
      <FormWysiwyg
        name={`${blockName}.${fieldNames.noSlotMessage}`}
        label={labels.noSlotMessage}
        maxCharacterLength={300}
        editorOptions={{ ...minimalWysiwygEditorOptions, height: 150 }}
      />
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
