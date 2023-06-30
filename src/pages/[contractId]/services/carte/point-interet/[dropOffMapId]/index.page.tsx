import React, { useEffect, useState } from "react";
import router from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import PageTitle from "../../../../../../components/PageTitle/PageTitle";
import CommonLoader from "../../../../../../components/Common/CommonLoader/CommonLoader";
import DropOffMapForm from "../../../../../../components/DropOffMap/DropOffMapForm";
import { useContract } from "../../../../../../hooks/useContract";
import {
  CollectEntity,
  ComponentBlocksDownloadBlockInput,
  ComponentBlocksOpeningDay,
  GetDropOffMapByIdDocument,
  useCreateDropOffMapMutation,
  useGetDropOffCollectTypeByContractIdQuery,
  useGetDropOffMapByIdLazyQuery,
  useUpdateDropOffMapMutation,
} from "../../../../../../graphql/codegen/generated-types";
import { useRoutingQueryId } from "../../../../../../hooks/useRoutingQueryId";
import { useNavigation } from "../../../../../../hooks/useNavigation";
import {
  ICollectType,
  IDropOffMapStaticFields,
} from "../../../../../../lib/drop-off-map";
import ContractLayout from "../../../../../../layouts/ContractLayout/ContractLayout";
import { remapFormBlocksDynamicZone } from "../../../../../../lib/dynamic-blocks";

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
    staticCollectType: "Type de conteneur ou de lieu",
    staticPosition: "Emplacement",
    staticPositionDescription: "Définissez l'emplacement d'apport",
    staticAddressOrGpsLabels: {
      addressRadio: "Adresse",
      addressField: "Adresse du lieu d'apport",
      gpsCoordinatesRadio: "Coordonnées GPS",
      latitudeField: "Latitude",
      longitudeField: "Longitude",
    },
    staticLink: "Text du lien",
    staticPhoneNumber: "Téléphone",
    staticMustKnow: "A savoir avant de venir",
  };

  /* Methods */
  async function onSubmit(submitData: FieldValues, submitType?: string) {
    const downloadableFiles = submitData.downloadableFiles.map(
      (downloadableFile: ComponentBlocksDownloadBlockInput) => {
        return {
          linkText: downloadableFile.linkText,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          file: downloadableFile.file?.id,
        };
      },
    );
    //
    const collectTypeSelected: ICollectType = submitData.dropOffMapCollectType;
    const variables = {
      updateDropOffMapId: dropOffMapId,
      data: {
        name: submitData.name,
        collectDropOff:
          collectTypeSelected?.entityTypeName === "CollectDropOffEntity"
            ? collectTypeSelected?.originalId
            : null,
        collectVoluntary:
          collectTypeSelected?.entityTypeName === "CollectVoluntaryEntity"
            ? collectTypeSelected?.originalId
            : null,
        address: submitData.address,
        latitude: submitData.latitude,
        longitude: submitData.longitude,
        phoneNumber: submitData.phoneNumber,
        mustKnow: submitData.mustKnow,
        downloadableFiles: downloadableFiles,
        dropOffMapService: contract.attributes?.dropOffMapService?.data?.id,
        openingHoursBlocks: submitData.openingHoursBlocks,
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
    void router.push(`${currentRoot}/services/carte`);
  }

  /* External Data */
  const { currentRoot } = useNavigation();
  const { contract, contractId } = useContract();
  const [getDropOffMapById, { loading, error, data }] =
    useGetDropOffMapByIdLazyQuery({
      variables: { dropOffMapId },
      fetchPolicy: "network-only",
    });
  const {
    data: dataDropOffCollectTypes,
    loading: loadingDropOffCollectTypes,
    error: errorDropOffCollectTypes,
  } = useGetDropOffCollectTypeByContractIdQuery({
    variables: { contractId: contractId },
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
  const [isInitialized, setIsInitialized] = useState(false);
  const [mappedData, setMappedData] = useState<IDropOffMapStaticFields>();
  const form = useForm({
    mode: "onChange",
  });
  const { setError } = form;
  const title =
    mappedData && !isCreateMode ? mappedData.name : "Créer un point d'intérêt";

  useEffect(() => {
    if (dropOffMapId) {
      if (!mappedData && !isCreateMode) {
        void getDropOffMapById();
      } else if (isCreateMode) {
        setIsInitialized(true);
      }
    }
  }, [dropOffMapId, isCreateMode, mappedData, getDropOffMapById]);

  useEffect(() => {
    if (data?.dropOffMap?.data) {
      const dropOffMapData = data.dropOffMap.data;
      const collectDropOff = dropOffMapData.attributes?.collectDropOff?.data;
      const collectVoluntary =
        dropOffMapData.attributes?.collectVoluntary?.data;
      const collectTypeSelected =
        collectDropOff?.__typename &&
        collectDropOff?.id &&
        collectDropOff.attributes?.name
          ? {
              entityTypeName: collectDropOff.__typename,
              uniqueId: `${collectDropOff.__typename}_${collectDropOff.id}`,
              originalId: collectDropOff.id,
              name: collectDropOff.attributes.name,
            }
          : collectVoluntary?.__typename &&
            collectVoluntary?.id &&
            collectVoluntary.attributes?.name
          ? {
              entityTypeName: collectVoluntary.__typename,
              uniqueId: `${collectVoluntary.__typename}_${collectVoluntary.id}`,
              originalId: collectVoluntary.id,
              name: collectVoluntary.attributes.name,
            }
          : null;

      const openingHoursBlocks: ComponentBlocksOpeningDay[] = dropOffMapData
        .attributes?.openingHoursBlocks
        ? dropOffMapData.attributes?.openingHoursBlocks.filter(
            (block): block is ComponentBlocksOpeningDay =>
              block !== null &&
              block.__typename === "ComponentBlocksOpeningDay" &&
              block.id !== undefined &&
              block.weekDay !== undefined,
          )
        : [];

      if (
        dropOffMapData.id &&
        dropOffMapData.attributes &&
        dropOffMapData.attributes.name &&
        collectTypeSelected &&
        dropOffMapData.attributes.latitude &&
        dropOffMapData.attributes.longitude
      ) {
        const mappedData: IDropOffMapStaticFields = {
          name: dropOffMapData.attributes.name,
          dropOffMapCollectType: collectTypeSelected,
          address: dropOffMapData.attributes.address,
          latitude: dropOffMapData.attributes.latitude,
          longitude: dropOffMapData.attributes.longitude,
          phoneNumber: dropOffMapData.attributes.phoneNumber,
          mustKnow: dropOffMapData.attributes.mustKnow,
          downloadableFiles: remapFormBlocksDynamicZone(
            dropOffMapData.attributes.downloadableFiles,
          ),
          openingHoursBlocks: openingHoursBlocks ?? [],
        };
        setMappedData(mappedData);
        setIsInitialized(true);
      }
    }
  }, [data, currentRoot]);

  return (
    <div className="o-FormEditPage">
      <>
        <PageTitle title={title} />
        <CommonLoader isLoading={isLoading || !isInitialized} errors={errors}>
          <DropOffMapForm
            data={mappedData}
            onSubmitValid={onSubmit}
            onCancel={onCancel}
            labels={formLabels}
            collectTypes={
              dataDropOffCollectTypes?.getDropOffCollectType as Array<CollectEntity>
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
