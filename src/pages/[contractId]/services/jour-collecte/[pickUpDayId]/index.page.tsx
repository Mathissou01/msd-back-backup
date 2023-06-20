import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Maybe } from "graphql/jsutils/Maybe";
import router from "next/router";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import {
  Enum_Pickupday_Periodicity,
  GetFlowsByContractIdDocument,
  InputMaybe,
  useCreatePickUpDayByIdMutation,
  useGetPickUpDayByIdQuery,
  useUpdatePickUpDayMutation,
} from "../../../../../graphql/codegen/generated-types";
import PickUpDaysForm from "../../../../../components/PickUpDays/PickUpDaysForm";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import {
  EMonthlyStatus,
  EPeriodicityStatus,
  IHebdomadireAdvancedSelection,
  IMensuelAdvancedSelection,
} from "../../../../../lib/pickup-days";

interface IPickUpDayIdPageProps {
  pickUpDayId: string;
  isCreateMode: boolean;
}

interface IPickUpDayStaticMappedFields {
  name: string;
  flow:
    | {
        attributes: {
          name: string | null;
        } | null;
      }
    | string
    | null;
  periodicity: string | null | undefined;
  choice: string | undefined;
  daysOfTheMonth?: string | undefined;
  days: string | number | null | undefined;
}

interface IPickUpDayStaticVariablesFields {
  updatePickUpDayId: string;
  data: {
    name: string;
    pickUpDayService?: Maybe<string>;
    flow: string;
    periodicity: InputMaybe<Enum_Pickupday_Periodicity> | undefined;
    advancedSelection:
      | IHebdomadireAdvancedSelection
      | IMensuelAdvancedSelection;
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
    staticFlow: "Flux",
    staticPeriodicite: "Périodicité",
    staticRecurrence: "Récurrence",
    staticDayOfTheMonth: "Jour du mois",
    staticDays: "Jours",
  };

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
        flow: submitData.flow,
        pickUpDayService: contract.attributes?.pickUpDayService?.data?.id,
        periodicity: submitData.periodicity.toLowerCase(),
        advancedSelection,
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
  ] = useCreatePickUpDayByIdMutation({
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
  const { setError } = form;

  useEffect(() => {
    if (data?.pickUpDay?.data) {
      const pickUpDaysData = data?.pickUpDay?.data;

      if (
        pickUpDaysData.id &&
        pickUpDaysData.attributes?.name &&
        pickUpDaysData.attributes?.flow
      ) {
        const mappedData: IPickUpDayStaticMappedFields = {
          name: pickUpDaysData.attributes.name,
          flow: pickUpDaysData.attributes.flow.data?.id ?? "0",
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
