import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import router from "next/router";
import CommonLoader from "../../../../../components/Common/CommonLoader/CommonLoader";
import PageTitle from "../../../../../components/PageTitle/PageTitle";
import {
  Enum_Pickupday_Periodicity,
  GetFlowsByContractIdDocument,
  InputMaybe,
  useCreatePickUpDayByIdMutation,
  useGetPickUpDayByIdQuery,
  useUpdatePickUpDayMutation,
} from "../../../../../graphql/codegen/generated-types";
import { useContract } from "../../../../../hooks/useContract";
import { useNavigation } from "../../../../../hooks/useNavigation";
import { useRoutingQueryId } from "../../../../../hooks/useRoutingQueryId";
import ContractLayout from "../../../../../layouts/ContractLayout/ContractLayout";
import PickUpDaysForm from "../../../../../components/PickUpDays/PickUpDaysForm";

interface IPickUpDayIdPageProps {
  pickUpDayId: string;
  isCreateMode: boolean;
}

export interface IPickUpDayStaticFields {
  name: string;
  flow:
    | {
        attributes: {
          name: string | null;
        } | null;
      }
    | string
    | null;
}

export function ServicesPickUpDatePage({
  pickUpDayId,
  isCreateMode,
}: IPickUpDayIdPageProps) {
  /* Static Data */
  const title = "Créer une collecte";
  const formLabels = {
    staticName: "Nom de la collecte",
    staticFlow: "Flux",
  };

  /* Methods */
  async function onSubmit(submitData: FieldValues, submitType?: string) {
    const variables = {
      updatePickUpDayId: pickUpDayId,
      data: {
        name: submitData.name,
        flow: submitData.flow,
        pickUpDayService: contract.attributes?.pickUpDayService?.data?.id,
        //TODO: temporally mock data to remove after
        advancedSelection: {
          mensuel: {
            choice: "le premier",
            selection: ["Lundi", "Mardi"],
          },
        },
        periodicity: "mensuel" as InputMaybe<Enum_Pickupday_Periodicity>,
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
    useState<IPickUpDayStaticFields>();
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
        const mappedData: IPickUpDayStaticFields = {
          name: pickUpDaysData.attributes.name,
          flow: pickUpDaysData.attributes.flow.data?.id ?? "0",
        };
        setPickUpDaysData(mappedData);
      }
    }
  }, [data]);

  return (
    <div className="o-FormEditPage">
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
        <ServicesPickUpDatePage
          pickUpDayId={pickUpDayId}
          isCreateMode={pickUpDayId === "-1"}
        />
      </ContractLayout>
    )
  );
}
