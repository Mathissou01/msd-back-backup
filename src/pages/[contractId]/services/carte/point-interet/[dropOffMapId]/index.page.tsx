import React, { useEffect, useState } from "react";
import router from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";
import DropOffMapForm from "../../../../../../components/DropOffMap/DropOffMapForm";
import { useContract } from "../../../../../../hooks/useContract";
import {
  GetDropOffMapByIdDocument,
  useCreateDropOffMapMutation,
  useGetDropOffMapByIdQuery,
  useUpdateDropOffMapMutation,
} from "../../../../../../graphql/codegen/generated-types";
import { useRoutingQueryId } from "../../../../../../hooks/useRoutingQueryId";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import { IDropOffMapStaticFields } from "../../../../../../lib/drop-off-map";
import ContractLayout from "../../../../../../layouts/ContractLayout/ContractLayout";

interface TServiceCartePointInteretPageProps {
  dropOffMapId: string;
  isCreateMode: boolean;
}
export function ServiceCartePointInteretPage({
  dropOffMapId,
  isCreateMode,
}: TServiceCartePointInteretPageProps) {
  /* Static Data */
  const formLabels = {
    staticName: "Nom du point d'intérêt",
  };
  const title = "Créer un point d'intérêt";
  //TODO temporarily static Data After remove use true data from form
  const gpsCoordinates = "43.1236, 3.5739";
  const collectDropOff = "2";

  /* Methods */
  async function onSubmit(submitData: FieldValues, submitType?: string) {
    const variables = {
      updateDropOffMapId: dropOffMapId,
      data: {
        name: submitData.name,
        gpsCoordinates: gpsCoordinates,
        collectDropOff: collectDropOff,
        dropOffMapService: contract.attributes?.dropOffMapService?.data?.id,
      },
    };
    if (isCreateMode) {
      return createDropOffMap({
        variables,
        onCompleted: (result) => {
          if (result.createDropOffMap?.data?.id) {
            if (submitType === "submit") {
              router.push(`${currentRoot}/services/carte`);
            }
          }
        },
      });
    } else {
      return updateDropOffMap({
        variables,
        refetchQueries: [
          {
            query: GetDropOffMapByIdDocument,
            variables: {
              dropOffMapId,
            },
          },
        ],
        onCompleted: (result) => {
          if (result.updateDropOffMap?.data?.id) {
            if (submitType === "submit") {
              router.push(`${currentRoot}/services/carte`);
            }
          }
        },
      });
    }
  }

  function onCancel() {
    form.reset();
    router.push(`${currentRoot}/services/carte`);
  }

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contract } = useContract();
  const { loading, error, data } = useGetDropOffMapByIdQuery({
    variables: { dropOffMapId },
    fetchPolicy: "network-only",
  });
  const [
    createDropOffMap,
    { loading: createDropOffMapLoading, error: createDropOffMapError },
  ] = useCreateDropOffMapMutation({
    awaitRefetchQueries: true,
    onError: (error) => {
      setError("name", { type: "validate", message: error.message });
    },
  });
  const [
    updateDropOffMap,
    { loading: updateDropOffMapLoading, error: updateDropOffMapError },
  ] = useUpdateDropOffMapMutation();

  /* Local data */
  const isLoading =
    loading || createDropOffMapLoading || updateDropOffMapLoading;
  const errors = [error || createDropOffMapError || updateDropOffMapError];

  const [mappedData, setMappedData] = useState<IDropOffMapStaticFields>();
  const form = useForm({
    mode: "onChange",
  });
  const { setError } = form;

  useEffect(() => {
    if (data?.dropOffMap?.data) {
      const dropOffMapData = data.dropOffMap.data;

      if (
        dropOffMapData.id &&
        dropOffMapData.attributes &&
        dropOffMapData.attributes.name &&
        dropOffMapData.attributes.gpsCoordinates
      ) {
        const mappedData: IDropOffMapStaticFields = {
          name: dropOffMapData.attributes.name,
          gpsCoordinates: dropOffMapData.attributes.gpsCoordinates,
        };
        setMappedData(mappedData);
      }
    }
  }, [data, currentRoot]);

  return (
    <div className="o-FormEditPage">
      <>
        <PageTitle title={title} />
        <CommonLoader isLoading={isLoading} errors={errors}>
          <DropOffMapForm
            data={mappedData}
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
  const dropOffMapId = useRoutingQueryId("dropOffMapId", "create");

  return (
    dropOffMapId && (
      <ContractLayout>
        <ServiceCartePointInteretPage
          dropOffMapId={dropOffMapId}
          isCreateMode={dropOffMapId === "-1"}
        />
      </ContractLayout>
    )
  );
}
