import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import router from "next/router";
import { Maybe } from "graphql/jsutils/Maybe";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import PickUpDaysForm from "../../../../../components/PickUpDays/PickUpDaysForm";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import { ICommonSelectOption } from "../../../../../components/Form/FormSingleMultiselect/FormSingleMultiselect";
import {
  CityEntity,
  Enum_Pickupday_Periodicity,
  GetFlowsByContractIdDocument,
  InputMaybe,
  SectorizationEntity,
  useCreatePickUpDayMutation,
  useGetPickUpDayByIdQuery,
  useUpdatePickUpDayMutation,
} from "../../../../../graphql/codegen/generated-types";
import {
  EMonthlyStatus,
  EPeriodicityStatus,
  IHebdomadireAdvancedSelection,
  IMensuelAdvancedSelection,
  IPickUpDayStaticMappedFields,
} from "../../../../../lib/pickup-days";

interface IPickUpDayIdPageProps {
  pickUpDayId: string;
  isCreateMode: boolean;
}

interface IPickUpDayStaticVariablesFields {
  updatePickUpDayId: string;
  data: {
    name: string;
    pickUpDayService: Maybe<string>;
    sectorizations: InputMaybe<string>[] | null;
    cities: InputMaybe<string>[] | null;
    flow: string;
    periodicity: InputMaybe<Enum_Pickupday_Periodicity> | undefined;
    advancedSelection:
      | IHebdomadireAdvancedSelection
      | IMensuelAdvancedSelection;
    includeHoliday: boolean;
    pickUpHours: string;
    complementaryMention: string;
  };
}

export function ServicesPickUpDayEditPage({
  pickUpDayId,
  isCreateMode,
}: IPickUpDayIdPageProps) {
  /* Static Data */
  const title = "Créer une collecte";
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
    staticPeriodicite: "Périodicité",
    staticRecurrence: "Récurrence",
    staticDayOfTheMonth: "Jour du mois",
    staticDays: "Jours",
    staticPickUpHours: "Heure de passage",
    staticIncludeHoliday: "Y compris jours fériés",
    staticComplementaryMention: "Mention Complémentaire",
  };

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contract } = useContract();
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
  ] = useUpdatePickUpDayMutation();

  /* Local data */
  const isLoading = loading || createPickUpDayLoading || updatePickUpDayLoading;
  const errors = [error, createPickUpDayError, updatePickUpDayError];
  const [pickUpDaysData, setPickUpDaysData] =
    useState<IPickUpDayStaticMappedFields>();
  const form = useForm({
    mode: "onChange",
  });
  const { setError, trigger } = form;

  /* Methods */
  async function onSubmit(submitData: FieldValues, submitType?: string) {
    trigger("flow");
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
            (option: ICommonSelectOption) => option.value,
          ) ?? null,
        cities:
          submitData.cities?.map(
            (option: ICommonSelectOption) => option.value,
          ) ?? null,
        flow: submitData.flow,
        pickUpDayService: contract.attributes?.pickUpDayService?.data?.id,
        periodicity: submitData.periodicity.toLowerCase(),
        advancedSelection,
        includeHoliday: submitData.includeHoliday,
        pickUpHours: submitData.pickUpHours,
        complementaryMention: submitData.complementaryMention,
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
            query: GetFlowsByContractIdDocument,
            variables: {
              pickUpDayId,
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
    router.push(`${currentRoot}/services/jour-collecte`);
  }

  useEffect(() => {
    if (data?.pickUpDay?.data) {
      const pickUpDaysData = data?.pickUpDay?.data;

      if (
        pickUpDaysData.id &&
        pickUpDaysData.attributes?.name &&
        pickUpDaysData.attributes?.flow
      ) {
        const mappedData: IPickUpDayStaticMappedFields = {
          sectorizationsMode:
            pickUpDaysData.attributes.sectorizations?.data.length === 0
              ? "cities"
              : "sectorizations",
          name: pickUpDaysData.attributes.name,
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
          flow: pickUpDaysData.attributes.flow.data?.id ?? "",
          periodicity: pickUpDaysData.attributes.periodicity,
          choice:
            EPeriodicityStatus.MONTHLY in
            pickUpDaysData.attributes.advancedSelection
              ? pickUpDaysData.attributes.advancedSelection?.mensuel.choice
              : undefined,
          daysOfTheMonth:
            EPeriodicityStatus.MONTHLY in
            pickUpDaysData.attributes.advancedSelection
              ? pickUpDaysData.attributes.advancedSelection?.mensuel.selection.toString()
              : undefined,
          days:
            EPeriodicityStatus.WEEKLY in
            pickUpDaysData.attributes.advancedSelection
              ? pickUpDaysData.attributes.advancedSelection.hebdomadaire
                  .selection
              : pickUpDaysData.attributes.advancedSelection?.mensuel.selection.toString(),
          includeHoliday: pickUpDaysData.attributes.includeHoliday,
          pickUpHours: pickUpDaysData.attributes.pickUpHours,
          complementaryMention: pickUpDaysData.attributes.complementaryMention,
        };
        setPickUpDaysData(mappedData);
      }
    }
  }, [data]);

  return (
    <div className="o-ServicesPickUpDayEditPage">
      <>
        <PageTitle title={title} />
        <CommonLoader isLoading={isLoading} errors={errors}>
          <PickUpDaysForm
            data={pickUpDaysData}
            onSubmitValid={onSubmit}
            onCancel={onCancel}
            labels={formLabels}
          />
        </CommonLoader>
      </>
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
