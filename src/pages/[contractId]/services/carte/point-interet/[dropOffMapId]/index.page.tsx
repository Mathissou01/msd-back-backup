import React, { useEffect, useState } from "react";
import router from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";
import DropOffMapForm from "../../../../../../components/DropOffMap/DropOffMapForm";
import { useContract } from "../../../../../../hooks/useContract";
import {
  CollectType,
  GetDropOffMapByIdDocument,
  useCreateDropOffMapMutation,
  useGetDropOffCollectTypeByContractIdQuery,
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
    staticPhoneNumber: "Téléphone",
    staticMustKnow: "A savoir avant de venir",
    staticCollectType: "Type de conteneur ou de lieu",
  };
  const title = "Créer un point d'intérêt";
  //TODO temporarily static Data After remove use true data from form
  const gpsCoordinates = "43.1236, 3.5739";

  /* Methods */
  async function onSubmit(submitData: FieldValues, submitType?: string) {
    const collectTypeSelected = submitData.dropOffMapCollectTypeSelect;

    const variables = {
      updateDropOffMapId: dropOffMapId,
      data: {
        name: submitData.name,
        phoneNumber: submitData.phoneNumber,
        mustKnow: submitData.mustKnow,
        gpsCoordinates: gpsCoordinates,
        collectDropOff:
          collectTypeSelected.typeName === "collectDropOff"
            ? collectTypeSelected.originalId
            : null,
        collectVoluntary:
          collectTypeSelected.typeName === "collectVoluntary"
            ? collectTypeSelected.originalId
            : null,
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
  const { contract, contractId } = useContract();
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

  const {
    data: dataDropOffCollectTypes,
    loading: loadingDropOffCollectTypes,
    error: errorDropOffCollectTypes,
  } = useGetDropOffCollectTypeByContractIdQuery({
    variables: {
      contractId: contractId,
    },
  });

  const [
    updateDropOffMap,
    { loading: updateDropOffMapLoading, error: updateDropOffMapError },
  ] = useUpdateDropOffMapMutation({
    awaitRefetchQueries: true,
    onError: (error) => {
      setError("name", { type: "validate", message: error.message });
    },
  });

  /* Local data */
  const isLoading =
    loading ||
    createDropOffMapLoading ||
    updateDropOffMapLoading ||
    loadingDropOffCollectTypes;
  const errors = [
    error,
    createDropOffMapError,
    updateDropOffMapError,
    errorDropOffCollectTypes,
  ];

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
        dropOffMapData.attributes.longitude &&
        dropOffMapData.attributes.latitude &&
        dropOffMapData.attributes.collectDropOff?.data &&
        dropOffMapData.attributes.collectVoluntary?.data
      ) {
        const mappedData: IDropOffMapStaticFields = {
          name: dropOffMapData.attributes.name,
          phoneNumber: dropOffMapData.attributes.phoneNumber,
          mustKnow: dropOffMapData.attributes.mustKnow,
          collectDropOff:
            dropOffMapData.attributes.collectDropOff.data.attributes ?? {},
          collectVoluntary:
            dropOffMapData.attributes.collectVoluntary.data.attributes ?? {},
          longitude: dropOffMapData.attributes.longitude,
          latitude: dropOffMapData.attributes.latitude,
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
            collectTypes={
              dataDropOffCollectTypes?.getDropOffCollectType as Array<CollectType>
            }
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
