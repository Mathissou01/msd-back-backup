import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import router from "next/router";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import PickUpDaysForm from "../../../../../components/PickUpDays/PickUpDaysForm";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import { IFormSingleMultiselectOption } from "../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import {
  CityEntity,
  GetActiveRequestsByContractIdDocument,
  GetFlowsDocument,
  SectorizationEntity,
  useCreatePickUpDayMutation,
  useGetPickUpDayByIdQuery,
  useUpdatePickUpDayByIdMutation,
} from "../../../../../graphql/codegen/generated-types";
import {
  EMonthlyStatus,
  EPeriodicityStatus,
  EPickUpDayCollectType,
  IPickUpDayStaticMappedFields,
  IPickUpDayStaticVariablesFields,
  periodicityOptions,
} from "../../../../../lib/pickup-days";

interface IPickUpDayIdPageProps {
  pickUpDayId: string;
  isCreateMode: boolean;
}

export function ServicesPickUpDayEditPage({
  pickUpDayId,
  isCreateMode,
}: IPickUpDayIdPageProps) {
  /* Static Data */
  const labels = {
    createTitle: "Créer une collecte",
  };
  const formLabels = {
    staticName: "Nom de la collecte",
    staticPlace: "Secteurs ou Communes *",
    staticPlaceDescription:
      "Selectionnez les secteurs ou les communes concernés par cette collecte",
    staticSectorizationOrCityLabels: {
      sectorizationsRadio: "Secteurs",
      sectorizationsField: "Secteurs",
      citiesRadio: "Communes",
      citiesField: "Communes",
    },
    staticFlow: "Flux",
    staticPickUpDay: "Elément collecté",
    staticPeriodicite: "Périodicité",
    staticRecurrence: "Récurrence",
    staticDayOfTheMonth: "Jour du mois",
    staticDays: "Jours",
    staticPickUpHours: "Heure de passage",
    staticIncludeHoliday: "Y compris jours fériés",
    staticComplementaryMention: "Mention Complémentaire",
    staticShortCutForm: "Raccourci vers un formulaire",
    staticLabelForm: "Libellé du raccourci",
    staticFormRadioBtn: "Formulaire",
    staticExternalLinkRadioBtn: "Lien externe",
  };

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contract, contractId } = useContract();
  const { loading, error, data } = useGetPickUpDayByIdQuery({
    variables: { pickUpDayId },
    fetchPolicy: "network-only",
  });
  const [
    createPickUpDay,
    { loading: createPickUpDayLoading, error: createPickUpDayError },
  ] = useCreatePickUpDayMutation({
    awaitRefetchQueries: true,
    onError: (error) => {
      setError("name", { type: "validate", message: error.message });
    },
  });
  const [
    updatePickUpDay,
    { loading: updatePickUpDayLoading, error: updatePickUpDayError },
  ] = useUpdatePickUpDayByIdMutation();

  /* Local data */
  const isLoading = loading || createPickUpDayLoading || updatePickUpDayLoading;
  const errors = [error, createPickUpDayError, updatePickUpDayError];
  const [mappedData, setMappedData] = useState<IPickUpDayStaticMappedFields>();

  const form = useForm({
    mode: "onChange",
  });
  const { setError } = form;

  /* Methods */
  async function onSubmit(submitData: FieldValues, submitType?: string) {
    const advancedSelection =
      submitData.periodicity.toLowerCase() === EPeriodicityStatus.WEEKLY
        ? { hebdomadaire: { selection: submitData.days } }
        : {
            mensuel: {
              choice: submitData.choice,
              selection:
                submitData.choice === EMonthlyStatus.MONTHLY_DATE
                  ? submitData.daysOfTheMonth
                  : [submitData.days],
            },
          };

    const variables: IPickUpDayStaticVariablesFields = {
      updatePickUpDayId: pickUpDayId,
      data: {
        name: submitData.name,
        sectorizations:
          submitData.sectorizations?.map(
            (option: IFormSingleMultiselectOption) => option.value,
          ) ?? null,
        cities:
          submitData.cities?.map(
            (option: IFormSingleMultiselectOption) => option.value,
          ) ?? null,
        flow: submitData.flow,
        collectDoorToDoor: submitData.collects.includes(
          EPickUpDayCollectType.DOOR_TO_DOOR,
        )
          ? submitData.collects.replace(EPickUpDayCollectType.DOOR_TO_DOOR, "")
          : null,
        collectVoluntary: submitData.collects.includes(
          EPickUpDayCollectType.VOLUNTARY,
        )
          ? submitData.collects.replace(EPickUpDayCollectType.VOLUNTARY, "")
          : null,
        pickUpDayService: contract.attributes?.pickUpDayService?.data?.id,
        periodicity: submitData.periodicity.toLowerCase(),
        advancedSelection,
        includeHoliday: submitData.includeHoliday,
        pickUpHours: submitData.pickUpHours,
        complementaryMention: submitData.complementaryMention,
        buttonLabel: submitData.buttonLabel,
        request: submitData.request?.id ?? null,
        externalLink: submitData.externalLink ?? null,
        audiences: submitData.audiences.map(
          (user: IFormSingleMultiselectOption) => user.value.toString(),
        ),
      },
    };
    if (isCreateMode) {
      return createPickUpDay({
        variables,
        onCompleted: (result) => {
          if (result.createPickUpDay?.data?.id) {
            if (submitType === "submit") {
              router.push(`${currentRoot}/services/jour-collecte`);
            }
          }
        },
      });
    } else {
      return updatePickUpDay({
        variables,
        refetchQueries: [
          {
            query: GetFlowsDocument,
            variables: {
              pickUpDayId,
            },
          },
          {
            query: GetActiveRequestsByContractIdDocument,
            variables: {
              contractId,
            },
          },
        ],
        onCompleted: (result) => {
          if (result.updatePickUpDay?.data?.id) {
            if (submitType === "submit") {
              router.push(`${currentRoot}/services/jour-collecte`);
            }
          }
        },
      });
    }
  }

  function onCancel() {
    form.reset();
    void router.push(`${currentRoot}/services/jour-collecte`);
  }

  useEffect(() => {
    if (pickUpDayId) {
      if (!mappedData && isCreateMode) {
        const mappedData: IPickUpDayStaticMappedFields = {
          pickUpId: "-1",
          sectorizationsMode: "sectorizations",
          name: "",
          flow: "",
          collects: "",
          periodicity: periodicityOptions[0].option,
          choice: undefined,
          days: undefined,
          includeHoliday: false,
          shortcutFormMode: "form",
          audiences: undefined,
        };
        setMappedData(mappedData);
      }
    }
  }, [pickUpDayId, mappedData, isCreateMode]);

  useEffect(() => {
    if (data?.pickUpDay?.data) {
      const pickUpDaysData = data?.pickUpDay?.data;
      if (
        pickUpDaysData.id &&
        pickUpDaysData.attributes?.name &&
        pickUpDaysData.attributes?.flow &&
        pickUpDaysData.attributes.periodicity &&
        pickUpDaysData.attributes.advancedSelection
      ) {
        const collects = pickUpDaysData.attributes.collectDoorToDoor?.data
          ? `${EPickUpDayCollectType.DOOR_TO_DOOR}${pickUpDaysData.attributes.collectDoorToDoor.data?.id}`
          : `${EPickUpDayCollectType.VOLUNTARY}${pickUpDaysData.attributes.collectVoluntary?.data?.id}`;
        const mappedData: IPickUpDayStaticMappedFields = {
          pickUpId: pickUpDaysData.id,
          sectorizationsMode:
            pickUpDaysData.attributes.sectorizations?.data.length === 0
              ? "cities"
              : "sectorizations",
          name: pickUpDaysData.attributes.name,
          flow: pickUpDaysData.attributes.flow.data?.id ?? "0",
          sectorizations:
            pickUpDaysData.attributes.sectorizations?.data.map(
              (sectorization: SectorizationEntity) => ({
                value: sectorization.id ?? "",
                label: sectorization.attributes?.name ?? "",
              }),
            ) ?? [],
          cities:
            pickUpDaysData.attributes.cities?.data.map((city: CityEntity) => ({
              value: city.id ?? "",
              label: city.attributes?.name ?? "",
            })) ?? [],
          collects: collects,
          periodicity: pickUpDaysData.attributes.periodicity,
          choice:
            EPeriodicityStatus.MONTHLY in
            pickUpDaysData.attributes.advancedSelection
              ? pickUpDaysData.attributes.advancedSelection?.mensuel.choice
              : undefined,
          daysOfTheMonth:
            EPeriodicityStatus.MONTHLY in
            pickUpDaysData.attributes.advancedSelection
              ? pickUpDaysData.attributes.advancedSelection?.mensuel?.selection?.toString()
              : undefined,
          days:
            EPeriodicityStatus.WEEKLY in
            pickUpDaysData.attributes.advancedSelection
              ? pickUpDaysData.attributes.advancedSelection.hebdomadaire
                  .selection
              : pickUpDaysData.attributes.advancedSelection?.mensuel?.selection?.toString(),
          includeHoliday: pickUpDaysData.attributes.includeHoliday,
          pickUpHours: pickUpDaysData.attributes.pickUpHours,
          complementaryMention: pickUpDaysData.attributes.complementaryMention,
          buttonLabel: pickUpDaysData.attributes.buttonLabel ?? undefined,
          shortcutFormMode: pickUpDaysData.attributes.externalLink
            ? "link"
            : "form",
          request: pickUpDaysData.attributes.request?.data ?? undefined,
          externalLink: pickUpDaysData.attributes.externalLink ?? undefined,
          audiences: pickUpDaysData.attributes.audiences?.data.map((user) => {
            return {
              label: user.attributes?.type ?? "",
              value: user.id ?? "",
            };
          }),
        };
        setMappedData(mappedData);
      }
    }
  }, [data]);

  return (
    <div className="o-ServicesPickUpDayEditPage">
      {pickUpDayId && mappedData && (
        <>
          <PageTitle
            title={isCreateMode ? labels.createTitle : mappedData.name}
          />
          <CommonLoader isLoading={isLoading} errors={errors}>
            <PickUpDaysForm
              data={mappedData}
              onSubmitValid={onSubmit}
              onCancel={onCancel}
              labels={formLabels}
            />
          </CommonLoader>
        </>
      )}
    </div>
  );
}

export default function IndexPage() {
  const pickUpDayId = useRoutingQueryId("pickUpDayId", "create");

  return (
    pickUpDayId && (
      <ContractLayout>
        <ServicesPickUpDayEditPage
          pickUpDayId={pickUpDayId}
          isCreateMode={pickUpDayId === "-1"}
        />
      </ContractLayout>
    )
  );
}
