import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { FieldValues } from "react-hook-form";
import {
  ComponentBlocksRequestTypeInput,
  RequestInput,
  useCreateRequestByContractIdMutation,
  useCreateRequestSlotMutation,
  useDeleteRequestSlotMutation,
  useGetRequestByIdLazyQuery,
  useUpdateRequestByIdMutation,
  useUpdateRequestSlotMutation,
} from "../../../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../../../lib/utilities";
import { EStatus } from "../../../../../lib/status";
import {
  generateMinimumBlocks,
  IBlocksQCM,
  IBlocksQuestions,
  IFormBlock,
  TDynamicFieldConfiguration,
  remapFormBlocksDynamicZone,
  IBlocksCumbersome,
  IBlocksRequestSlotEntity,
} from "../../../../../lib/dynamic-blocks";
import { remapRequestSlotsToBlocks } from "../../../../../lib/requests";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useContract } from "../../../../../hooks/useContract";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import RequestForm, {
  IRequestFields,
} from "../../../../../components/Request/RequestForm";
import { defaultRequestConfirmationMessage } from "../../../../../components/Request/RequestStaticFieldsBottom/RequestStaticConfirmationMessage/RequestStaticConfirmationMessage";

interface IRequestFormPageProps {
  requestId: string;
  isCreateMode: boolean;
}

export function RequestFormPage({
  requestId,
  isCreateMode,
}: IRequestFormPageProps) {
  /* Static Data */
  const labels = {
    createTitle: "Créer une demande",
    form: {
      top: {
        staticName: "Nom de la demande",
        staticMaxCharacters: "caractères maximum",
        staticAggregateLabel: "Dossier",
        staticAggregateInformation:
          "Le formulaire apparaitra dans le dossier sélectionné",
        staticWysiwygText: "Texte",
        subStaticWysiwygText:
          "Accessibilité : utilisez les niveaux de titre de façon cohérente sans sauter de niveau",
        requestTypes: {
          staticRadioRequestType: "Type de demande",
          staticOneRequestType: "Une seule demande",
          staticSeveralRequestType: "Choix entre plusieurs types de demandes",
        },
        address: {
          staticAddressContainerActivationLabel: `Activer la gestion de l'encart "Adresse"`,
          staticAddressContainerLabel: "Adresse",
          staticAddressFirstBlockLabel: `POSITION FIXE (PREMIER)`,
          staticAddressInputLabel: `Libellé du champ d'adresse`,
        },
      },
      bottom: {
        user: {
          staticUserContainerActivationLabel: `Activer la gestion de l'encart "Usager"`,
          staticUserLabel: "Usager",
          staticUserLastBlockLabel: "POSITION FIXE (DERNIER)",
          staticUserCivilitySelectLabel: "Civilité",
          staticUserCivilitySelectTrueOption: "Visible",
          staticUserCivilitySelectFalseOption: "Caché",
          staticUserNameFieldStateSelectLabel: 'Statut du champ "Nom / prénom"',
          staticUserEmailFieldStateSelectLabel: 'Statut du champ "Email"',
          staticUserPhoneFieldStateSelectLabel: 'Statut du champ "Téléphone"',
          staticMandatoryFieldStateSelectLabelTrueOption: "Obligatoire",
          staticMandatoryFieldStateSelectLabelFalseOption: "Optionnel",
          staticUserSMSCheckboxStateLabel:
            "Afficher une case à cocher pour permettre aux usagers d'être alertés par SMS",
        },
        confirmationMessage: {
          staticConfirmationMessageLabel: "Message de confirmation",
          staticConfirmationMessageInfo:
            "(Message affiché à l'écran suite à la validation du formulaire par l'usager)",
        },
        proofOfReceipt: {
          staticTitle: "Accusé de réception",
          staticSendProofOfReceiptLabel:
            "Envoyer un accusé de réception à l'usager",
          staticProofOfReceiptSubjectLabel:
            "Sujet de l'accusé de réception pour l'usager",
          staticProofOfReceiptHeaderLabel:
            "Entête de l'accusé de réception pour l'usager",
        },
      },
      appointmentSlots: {
        staticHasAppointmentSlotsLabel: "Afficher des créneaux de rendez-vous",
        staticHasAppointmentSlotsTrueOption: "Oui",
        staticHasAppointmentSlotsFalseOption: "Non",
        staticNumberOfRequiredSlots: "Nombre de créneaux requis",
        staticHoursBeforeReservation:
          "Les usagers ne peuvent pas réserver moins de",
        staticHoursBeforeReservationSuffix:
          "heure(s) avant le début du créneau",
        staticHoursBeforeReservationErrorMessage:
          "Ce champ n'accepte que des nombres entiers",
        staticSlotsReservationRulesTitle: "Règles de réservation des créneaux",
        staticSlotsReservationRulesFieldLabel:
          ", l'usager peut réserver à partir de",
        appointmentSlotsBySector: {
          staticTitle: "Gestion des créneaux par secteur",
          dynamicSectors: {
            titleField: "Ajout d'un encart Créneaux par secteur(s)",
          },
        },
      },
    },
  };

  /* Methods */
  async function onSubmit(submitData: FieldValues) {
    // If the Request has any RequestSlots, create or update them in a loop and return all results
    let requestSlotIds: Array<string> = [];
    const existingRequestSlots = mappedData?.requestSlots;
    if (submitData.requestSlots && submitData.requestSlots.length > 0) {
      const requestSlots: Array<IBlocksRequestSlotEntity> =
        submitData.requestSlots;

      const requestSlotResults = await Promise.all(
        requestSlots.map(async (requestSlot) => {
          const commonVariables = {
            sectorizations:
              requestSlot.sectorizations
                ?.map((sector) => sector.value.toString())
                .filter(removeNulls) ?? [],
            timeSlots: requestSlot.timeSlots,
            slotsExceptions: requestSlot.slotsExceptions?.map(
              (slotsException) => {
                delete slotsException.__typename;
                return slotsException;
              },
            ),
            slotMessage: requestSlot.slotMessage,
            noSlotMessage: requestSlot.noSlotMessage,
          };
          if (
            existingRequestSlots?.map((r) => r.id).includes(requestSlot.id) &&
            requestSlot.id
          ) {
            const { data } = await updateRequestSlot({
              variables: { id: requestSlot.id, data: commonVariables },
            });
            return data;
          } else if (
            !existingRequestSlots?.map((r) => r.id).includes(requestSlot.id)
          ) {
            const { data } = await createRequestSlot({
              variables: { data: commonVariables },
            });
            return data;
          }
        }),
      );
      requestSlotIds = requestSlotResults
        .map((result) => {
          if (result) {
            if (
              "createRequestSlot" in result &&
              result.createRequestSlot?.data?.id
            ) {
              return result.createRequestSlot.data.id;
            } else if (
              "updateRequestSlot" in result &&
              result.updateRequestSlot?.data?.id
            ) {
              return result.updateRequestSlot.data.id;
            }
          }
        })
        .filter(removeNulls);
    }
    // If any RequestSlot was present initially but is gone in submit, delete it
    const requestSlotsToDelete =
      existingRequestSlots
        ?.filter((v) => !requestSlotIds?.find((id) => id === v.id))
        .map((requestSlot) => requestSlot.id) ?? [];
    if (requestSlotsToDelete.length > 0) {
      await Promise.all(
        requestSlotsToDelete.map(async (id) => {
          const { data } = await deleteRequestSlot({
            variables: { id },
          });
          return data;
        }),
      );
    }

    // Variables for mutations
    const addableBlocks = submitData.addableBlocks.map(
      // Remove automatically generated ID
      (block: { id?: string; __typename: string }) => {
        delete block.id;
        if (block.__typename === "ComponentBlocksCumbersome") {
          const cumbersomeBlock = block as IBlocksCumbersome;
          cumbersomeBlock.maxVolumeOfCumbersome =
            cumbersomeBlock.maxVolumeOfCumbersome
              ? +cumbersomeBlock.maxVolumeOfCumbersome
                  .toString()
                  .replace(",", ".")
              : undefined;
          cumbersomeBlock.maxNumberOfCumbersome =
            cumbersomeBlock.maxNumberOfCumbersome &&
            cumbersomeBlock.maxNumberOfCumbersome.toString().length > 0
              ? +cumbersomeBlock.maxNumberOfCumbersome
              : undefined;
          return { ...cumbersomeBlock };
        }
        return { ...block };
      },
    );
    const hasSeveralRequestTypes = submitData.hasSeveralRequestTypes === "1";
    const hasAppointmentSlots = submitData.hasAppointmentSlots === "1";
    const requestTypes = submitData.requestType.map(
      (requestType: ComponentBlocksRequestTypeInput) => {
        const requestTypeTitle =
          requestType.title && requestType.title !== ""
            ? requestType.title
            : submitData.name;
        return {
          title: requestTypeTitle,
          isEmail: requestType.isEmail,
          email: requestType.email,
          isTSMS: requestType.isTSMS,
        };
      },
    );
    const commonVariables: RequestInput = {
      name: submitData.name,
      isActivated: false,
      blockText: submitData.blockText,
      hasSeveralRequestTypes,
      requestAggregate: submitData.aggregate?.id ?? null,
      requestType: hasSeveralRequestTypes ? requestTypes : [requestTypes[0]],
      hasAddress: submitData.hasAddress,
      fieldAddressLabel: submitData.fieldAddressLabel,
      addableBlocks: addableBlocks,
      hasUser: submitData.hasUser,
      displayUserCivility: submitData.displayUserCivility === "true",
      isUserNameMandatory: submitData.isUserNameMandatory === "true",
      isUserEmailMandatory: submitData.isUserEmailMandatory === "true",
      isUserPhoneMandatory: submitData.isUserPhoneMandatory === "true",
      userAllowSMSNotification: submitData.userAllowSMSNotification,
      confirmationMessage: submitData.confirmationMessage,
      sendProofOfReceipt: submitData.sendProofOfReceipt,
      proofOfReceiptSubject: submitData.proofOfReceiptSubject,
      proofOfReceiptHeader: submitData.proofOfReceiptHeader,
      hasAppointmentSlots,
      numberOfRequiredSlots: !hasAppointmentSlots
        ? null
        : +submitData.numberOfRequiredSlots,
      hoursBeforeReservationIsActivated:
        +submitData.hoursBeforeReservationIsActivated,
      slotsReservationRules: submitData.slotsReservationRules,
      requestSlots: requestSlotIds,
    };

    isCreateMode
      ? void createRequest({
          variables: {
            data: {
              requestService: contractId,
              ...commonVariables,
            },
          },
          onCompleted: (result) => {
            if (result.createRequest?.data?.id) {
              router.push(`${currentRoot}/services/demandes`);
            }
          },
        })
      : void updateRequest({
          variables: {
            updateRequestId: requestId,
            data: {
              ...commonVariables,
            },
          },
          onCompleted: (result) => {
            if (result.updateRequest?.data?.id) {
              router.push(`${currentRoot}/services/demandes`);
            }
          },
        });
  }

  async function onChangeActivated() {
    return await updateRequest({
      variables: {
        updateRequestId: requestId,
        data: {
          isActivated: !data?.request?.data?.attributes?.isActivated,
        },
      },
      onCompleted: (result) => {
        if (result.updateRequest?.data?.id) {
          router.push(`${currentRoot}/services/demandes`);
        }
      },
    });
  }

  function formatComponentBlocks(blocks: IFormBlock[]): Array<IFormBlock> {
    return (
      blocks
        .map((block) => {
          switch (block.__typename) {
            case "ComponentBlocksQuestions": {
              // Radio buttons need string values but height property contains boolean, this is why we replace it here
              const newBlock: IBlocksQuestions = block as IBlocksQuestions;
              newBlock.height = newBlock.height ? "1" : "0";
              return {
                ...newBlock,
              };
            }
            case "ComponentBlocksQcm": {
              // Radio buttons need string values but multipleChoice property contains boolean, this is why we replace it here
              const newBlock: IBlocksQCM = block as IBlocksQCM;
              newBlock.multipleChoice = newBlock.multipleChoice ? "1" : "0";
              return {
                ...newBlock,
              };
            }
            case "ComponentBlocksCumbersome": {
              // Radio buttons need string values but isNumberAndVolume property contains boolean, this is why we replace it here
              const newBlock: IBlocksCumbersome = block as IBlocksCumbersome;
              newBlock.isNumberAndVolume = newBlock.isNumberAndVolume
                ? "1"
                : "0";
              return {
                ...newBlock,
              };
            }
            default: {
              return {
                ...block,
              };
            }
          }
        })
        .filter(removeNulls) ?? []
    );
  }

  /* Local data */
  const router = useRouter();
  const { currentRoot, currentPage } = useNavigation();
  const { contractId } = useContract();
  const [mappedData, setMappedData] = useState<IRequestFields>();
  const dynamicFieldConfigurations: Array<TDynamicFieldConfiguration> = [
    { option: "ComponentBlocksAttachments" },
    { option: "ComponentBlocksCommentary" },
    { option: "ComponentBlocksCumbersome", props: { maxBlocks: 1 } },
    { option: "ComponentBlocksQuestions" },
    { option: "ComponentBlocksQcm" },
    { option: "ComponentBlocksDateChoice" },
    { option: "ComponentBlocksCheckbox" },
  ];
  const requestTypeDynamicFieldConfigurations: Array<TDynamicFieldConfiguration> =
    useMemo(() => {
      return [
        {
          option: "ComponentBlocksRequestType",
          props: {
            minBlocks: 2,
            maxBlocks: 10,
          },
        },
      ];
    }, []);

  const [getRequestTypeById, { data, loading, error }] =
    useGetRequestByIdLazyQuery({
      variables: {
        requestId: requestId,
      },
      fetchPolicy: "network-only",
    });
  const [updateRequest, { loading: loadingUpdate, error: errorUpdate }] =
    useUpdateRequestByIdMutation({
      refetchQueries: ["getRequestById"],
      awaitRefetchQueries: true,
    });
  const [createRequest, { loading: loadingCreate, error: errorCreate }] =
    useCreateRequestByContractIdMutation({
      refetchQueries: ["getRequestById"],
      awaitRefetchQueries: true,
    });
  const [
    createRequestSlot,
    { loading: loadingCreateSlot, error: errorCreateSlot },
  ] = useCreateRequestSlotMutation();
  const [
    updateRequestSlot,
    { loading: loadingUpdateSlot, error: errorUpdateSlot },
  ] = useUpdateRequestSlotMutation();
  const [
    deleteRequestSlot,
    { loading: loadingDeleteSlot, error: errorDeleteSlot },
  ] = useDeleteRequestSlotMutation();
  const isLoading =
    loading ||
    loadingUpdate ||
    loadingCreate ||
    loadingCreateSlot ||
    loadingUpdateSlot ||
    loadingDeleteSlot;
  const errors = [
    error,
    errorUpdate,
    errorCreate,
    errorCreateSlot,
    errorUpdateSlot,
    errorDeleteSlot,
  ];

  useEffect(() => {
    if (requestId) {
      if (!mappedData && isCreateMode) {
        const mappedData: IRequestFields = {
          id: "-1",
          status: EStatus.Draft,
          name: "",
          blockText: "",
          isActivated: false,
          hasSeveralRequestTypes: "0",
          aggregate: {},
          requestType: generateMinimumBlocks(
            requestTypeDynamicFieldConfigurations,
            [],
          ),
          hasAddress: false,
          fieldAddressLabel: "",
          addableBlocks: [],
          hasUser: false,
          displayUserCivility: "false",
          isUserNameMandatory: "true",
          isUserEmailMandatory: "true",
          isUserPhoneMandatory: "true",
          userAllowSMSNotification: false,
          confirmationMessage: defaultRequestConfirmationMessage,
          sendProofOfReceipt: false,
          proofOfReceiptSubject: "",
          proofOfReceiptHeader: "",
          hasAppointmentSlots: "0",
          numberOfRequiredSlots: 1,
          slotsReservationRules: undefined,
          requestSlots: [],
        };
        setMappedData(mappedData);
      } else if (requestId !== mappedData?.id) {
        setMappedData(undefined);
        void getRequestTypeById({ variables: { requestId: requestId } });
      }
    }
  }, [
    requestTypeDynamicFieldConfigurations,
    getRequestTypeById,
    isCreateMode,
    mappedData,
    requestId,
  ]);

  useEffect(() => {
    if (data?.request?.data) {
      const requestData = data.request.data;
      if (
        requestData.id &&
        requestData.attributes &&
        requestData.attributes.name
      ) {
        const mappedData: IRequestFields = {
          id: requestData.id,
          status: requestData.attributes.isActivated
            ? EStatus.Activated
            : EStatus.Draft,
          name: requestData.attributes.name ?? "",
          blockText: requestData.attributes.blockText ?? "",
          isActivated: requestData.attributes.isActivated ?? false,
          hasSeveralRequestTypes: requestData.attributes.hasSeveralRequestTypes
            ? "1"
            : "0",
          aggregate: requestData.attributes.requestAggregate?.data ?? null,
          requestType: generateMinimumBlocks(
            requestTypeDynamicFieldConfigurations,
            remapFormBlocksDynamicZone(requestData.attributes.requestType),
          ),
          hasAddress: requestData.attributes.hasAddress,
          fieldAddressLabel: requestData.attributes.fieldAddressLabel ?? "",
          addableBlocks: requestData.attributes.addableBlocks
            ? formatComponentBlocks(
                remapFormBlocksDynamicZone(
                  requestData.attributes.addableBlocks,
                ),
              )
            : [],
          hasUser: requestData.attributes.hasUser,
          displayUserCivility: requestData.attributes.displayUserCivility
            ? requestData.attributes.displayUserCivility.toString()
            : "false",
          isUserNameMandatory: requestData.attributes.isUserNameMandatory
            ? requestData.attributes.isUserNameMandatory.toString()
            : "false",
          isUserEmailMandatory: requestData.attributes.isUserEmailMandatory
            ? requestData.attributes.isUserEmailMandatory.toString()
            : "false",
          isUserPhoneMandatory: requestData.attributes.isUserPhoneMandatory
            ? requestData.attributes.isUserPhoneMandatory.toString()
            : "false",
          userAllowSMSNotification:
            requestData.attributes.userAllowSMSNotification ?? false,
          confirmationMessage:
            requestData.attributes.confirmationMessage ??
            defaultRequestConfirmationMessage,
          sendProofOfReceipt:
            requestData.attributes.sendProofOfReceipt ?? false,
          proofOfReceiptSubject:
            requestData.attributes.proofOfReceiptSubject ?? "",
          proofOfReceiptHeader:
            requestData.attributes.proofOfReceiptHeader ?? "",
          hasAppointmentSlots: requestData.attributes.hasAppointmentSlots
            ? "1"
            : "0",
          numberOfRequiredSlots:
            requestData.attributes.numberOfRequiredSlots ?? 1,
          hoursBeforeReservationIsActivated:
            !requestData.attributes.hoursBeforeReservationIsActivated ||
            requestData.attributes.hoursBeforeReservationIsActivated === 0
              ? undefined
              : requestData.attributes.hoursBeforeReservationIsActivated,
          slotsReservationRules: requestData.attributes.slotsReservationRules,
          requestSlots: remapRequestSlotsToBlocks(
            requestData.attributes.requestSlots?.data,
          ),
        };
        setMappedData(mappedData);
      }
    }
  }, [
    data,
    router,
    currentRoot,
    currentPage,
    requestTypeDynamicFieldConfigurations,
  ]);

  return (
    <div className="o-FormEditPage">
      {requestId && mappedData && (
        <>
          <PageTitle
            title={isCreateMode ? labels.createTitle : mappedData.name}
          />
          <CommonLoader isLoading={isLoading} errors={errors}>
            <RequestForm
              isCreateMode={isCreateMode}
              data={mappedData}
              onCancel={() => router.push(`${currentRoot}/services/demandes`)}
              onSubmit={onSubmit}
              onChangeActivated={onChangeActivated}
              labels={labels.form}
              dynamicFieldConfigurations={dynamicFieldConfigurations}
              requestTypeDynamicFieldConfigurations={
                requestTypeDynamicFieldConfigurations
              }
            />
          </CommonLoader>
        </>
      )}
    </div>
  );
}

export default function IndexPage() {
  const requestId = useRoutingQueryId("requestId", "create");

  return (
    requestId && (
      <ContractLayout>
        <RequestFormPage
          requestId={requestId}
          isCreateMode={requestId === "-1"}
        />
      </ContractLayout>
    )
  );
}
