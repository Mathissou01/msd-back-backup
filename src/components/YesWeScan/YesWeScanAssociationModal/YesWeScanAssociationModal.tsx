import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  DropOffMapEntity,
  SearchResultAddress,
  useGetAddressCoordinatesLazyQuery,
  useGetDropOffCollectTypeByContractIdQuery,
  useGetDropOffMapsByContractIdLazyQuery,
} from "../../../graphql/codegen/generated-types";
import { removeNulls } from "../../../lib/utilities";
import { useContract } from "../../../hooks/useContract";
import { useUser } from "../../../hooks/useUser";
import { getRightsByLabel } from "../../../lib/user";
import AddressOrGpsFields from "../../DropOffMap/DropOffMapStaticFields/AddressOrGpsFields/AddressOrGpsFields";
import FormInput from "../../Form/FormInput/FormInput";
import FormSelect from "../../Form/FormSelect/FormSelect";
import FormRadioInput from "../../Form/FormRadioInput/FormRadioInput";
import FormAutoCompleteInput from "../../Form/FormAutoCompleteInput/FormAutoCompleteInput";
import FormLabel from "../../Form/FormLabel/FormLabel";
import CommonFormErrorText from "../../Common/CommonFormErrorText/CommonFormErrorText";
import CommonLoader from "../../Common/CommonLoader/CommonLoader";
import { IYesWeScanTableRow } from "../../TabBlock/Tabs/YesWeScanService/YesWeScanServiceAssociationTab/YesWeScanServiceAssociationTab";
import YesWeScanDropOffCard from "../YesWeScanDropOffCard/YesWeScanDropOffCard";
import "./yeswescan-association-modal.scss";

interface IYesWeCanAssociationModalProps {
  serviceName: string;
  serviceId: string;
  selectedQrCode?: IYesWeScanTableRow | undefined;
}

export default function YesWeScanAssociationModal({
  serviceName,
  serviceId,
  selectedQrCode,
}: IYesWeCanAssociationModalProps) {
  /* Static Data */
  const labels = {
    mandatoryFields: "Tous les champs marqués d'une * sont obligatoires.",
    form: {
      service: "Service",
      qrCodeId: "ID du QR code",
      associationType: "Sélectionner le type d'association *",
      createAssociationType: "Créer un point de signalement",
      chooseDropOff: "Choisir parmi les points d'interêt (carte)",
      reporting: {
        name: "Nom du point de signalement",
        address: "Adresse ou coordonnées GPS du point de signalement",
        addressOrGpsFields: {
          addressRadio: "Adresse",
          gpsCoordinatesRadio: "Coordonnées GPS",
          addressField: "Adresse",
          latitudeField: "Latitude",
          longitudeField: "Longitude",
        },
      },
      dropOff: {
        type: "Type de point d'interêt",
        address: "Adresse du point d'interêt",
        drop: "Point d'interêt *",
        noInterestPointSelected: "Veuillez sélectionner un point d'interêt",
        noResult: "Aucun point d'intérêt trouvé",
      },
    },
  };

  /* Methods */
  async function searchFunction(
    searchValue: string,
  ): Promise<Array<SearchResultAddress>> {
    let searchResults: Array<SearchResultAddress> = [];
    await getAddressCoordinates({
      variables: { searchTerm: searchValue, housenumber: false },
      onCompleted: (results) => {
        if (
          results.getAddressCoordinates &&
          results.getAddressCoordinates?.length > 0
        ) {
          searchResults = results.getAddressCoordinates.filter(removeNulls);
        }
      },
    });

    return searchResults;
  }

  function onChoseDropOffMap(dropOffMap: DropOffMapEntity) {
    if (dropOffMap && dropOffMap.id && dropOffMap.attributes) {
      setChosenDropOff(dropOffMap.id);
      setValue("dropOffMap", dropOffMap);
    }
  }

  /* Local Data */
  const { userRights } = useUser();
  const userPermissions = getRightsByLabel("Yws", userRights);
  const { contractId } = useContract();
  const [chosenDropOff, setChosenDropOff] = useState<string>("");
  const [areInterestPointVisible, setAreInterestPointVisible] =
    useState<boolean>(false);
  const {
    watch,
    getValues,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();

  const associationTypeWatch = watch("associationType");
  const dropOffTypeWatch = watch("dropOffType");
  register("dropOffMap", {
    required: {
      value: associationTypeWatch === "2",
      message: labels.form.dropOff.noInterestPointSelected,
    },
  });
  const {
    data: dataCollectType,
    loading: loadingCollectType,
    error: errorCollectType,
  } = useGetDropOffCollectTypeByContractIdQuery({
    variables: {
      contractId: contractId.toString(),
    },
  });
  const [
    getAddressCoordinates,
    { loading: loadingAddressCoordinates, error: errorAddressCoordinates },
  ] = useGetAddressCoordinatesLazyQuery({
    fetchPolicy: "network-only",
  });
  const [
    getDropOffMaps,
    {
      data: dataDropOffMaps,
      loading: loadingDropOffMaps,
      error: errorDropOffMaps,
    },
  ] = useGetDropOffMapsByContractIdLazyQuery({
    fetchPolicy: "network-only",
  });
  const associationTypeOptions = [
    {
      label: labels.form.createAssociationType,
      value: "1",
    },
    {
      label: labels.form.chooseDropOff,
      value: "2",
    },
  ];
  const isLoading = loadingCollectType || loadingDropOffMaps;
  const queriesErrors = [
    errorCollectType,
    errorAddressCoordinates,
    errorDropOffMaps,
  ];

  useEffect(() => {
    setAreInterestPointVisible(false);
  }, [dropOffTypeWatch, setValue]);

  useEffect(() => {
    if (dataDropOffMaps) {
      setAreInterestPointVisible(true);
    }
  }, [dataDropOffMaps]);

  useEffect(() => {
    if (selectedQrCode && selectedQrCode.qrCodeId) {
      setValue("qrCodeId", selectedQrCode.qrCodeId);
      setValue("reportingPointName", selectedQrCode.name ?? "");
      setValue("address", selectedQrCode.address ?? "");
      setValue("city", selectedQrCode.city ?? "");
      setValue("latitude", selectedQrCode.lat ?? "");
      setValue("longitude", selectedQrCode.long ?? "");
      if (selectedQrCode.dropOffMap?.data?.attributes) {
        const dropOffAddress =
          selectedQrCode.dropOffMap.data.attributes.address ?? "";
        setValue("dropOffAddress", dropOffAddress);
        getDropOffMaps({
          variables: { contractId: contractId, address: dropOffAddress },
        });
        setAreInterestPointVisible(true);
        setChosenDropOff(selectedQrCode.dropOffMap.data.id);
        setValue("associationType", "2");
        setValue(
          "reportingPointName",
          selectedQrCode.dropOffMap.data.attributes.name ?? "",
        );
      } else {
        setValue("associationType", "1");
      }
    } else {
      setValue("qrCodeId", "");
      setValue("reportingPointName", "");
      setValue("address", "");
      setValue("city", "");
      setValue("latitude", "");
      setValue("longitude", "");
      setValue("dropOffAddress", "");
      setValue("associationType", "");
      setChosenDropOff("");
      setAreInterestPointVisible(false);
    }
  }, [contractId, getDropOffMaps, selectedQrCode, setValue]);

  return (
    <div className="c-YesWeScanAssociationModal">
      <CommonLoader
        isLoading={isLoading}
        isShowingContent={isLoading}
        hasDelay={isLoading}
        errors={queriesErrors}
      >
        <span>{labels.mandatoryFields}</span>
        <div className="c-YesWeScanAssociationModal__LinkInformations">
          <FormSelect
            name="serviceId"
            label={labels.form.service}
            defaultValue={serviceId}
            options={[{ label: serviceName, option: serviceId }]}
            isRequired
            isDisabled
          />
          <FormInput
            name="qrCodeId"
            label={labels.form.qrCodeId}
            defaultValue={selectedQrCode?.qrCodeId}
            isRequired
            isDisabled={
              (selectedQrCode ? selectedQrCode.qrCodeId !== "" : false) ||
              !userPermissions.update
            }
          />
        </div>
        <div className="c-YesWeScanAssociationModal__AssociationType">
          <FormRadioInput
            name="associationType"
            displayName={labels.form.associationType}
            isDisabled={!userPermissions.update}
            options={associationTypeOptions}
            defaultValue="1"
          />
        </div>
        {associationTypeWatch === "1" && (
          <div className="c-YesWeScanAssociationModal__Signalement">
            <FormInput
              name="reportingPointName"
              label={labels.form.reporting.name}
              isRequired
              isDisabled={!userPermissions.update}
            />
            <AddressOrGpsFields
              labels={labels.form.reporting.addressOrGpsFields}
            />
          </div>
        )}

        {associationTypeWatch === "2" && (
          <div className="c-YesWeScanAssociationModal__DropOffMap">
            <FormSelect
              name="dropOffType"
              label={labels.form.dropOff.type}
              isDisabled={!userPermissions.update}
              options={
                dataCollectType?.getDropOffCollectType
                  ?.map((dropOffType) => {
                    return {
                      label: dropOffType?.name,
                      option: dropOffType?.uniqueId,
                    };
                  })
                  .filter(removeNulls) ?? []
              }
            />
            <FormAutoCompleteInput<SearchResultAddress>
              name="dropOffAddress"
              searchFunction={searchFunction}
              displayTransformFunction={(result) => result.name ?? ""}
              selectTransformFunction={(result) => {
                const variables = dropOffTypeWatch
                  ? {
                      contractId: contractId,
                      address: result.name,
                      collectDropOffId:
                        dropOffTypeWatch.split("_")[0] ===
                        "CollectDropOffEntity"
                          ? dropOffTypeWatch.split("_")[1]
                          : null,
                      collectVoluntaryId:
                        dropOffTypeWatch.split("_")[0] ===
                        "CollectVoluntaryEntity"
                          ? dropOffTypeWatch.split("_")[1]
                          : null,
                    }
                  : { contractId: contractId, address: result.name };
                getDropOffMaps({
                  variables: variables,
                });
                setAreInterestPointVisible(false);
                return result.name ?? undefined;
              }}
              isLoading={loadingAddressCoordinates}
              isRequired={!dataDropOffMaps}
              isDisabled={!userPermissions.update}
              defaultValue={getValues("dropOffAddress")}
              labelProps={{ label: labels.form.dropOff.address }}
            />
            {areInterestPointVisible && (
              <div>
                {dataDropOffMaps && (
                  <FormLabel label={labels.form.dropOff.drop} />
                )}
                <div className="c-YesWeScanAssociationModal__DropOffMapList">
                  {dataDropOffMaps &&
                  dataDropOffMaps.dropOffMaps &&
                  dataDropOffMaps.dropOffMaps.data.length > 0 ? (
                    dataDropOffMaps.dropOffMaps.data.map(
                      (dropOffMap, index) => {
                        if (
                          dropOffMap &&
                          dropOffMap.id &&
                          dropOffMap.attributes
                        ) {
                          return (
                            <YesWeScanDropOffCard
                              key={index}
                              dropOffMap={dropOffMap}
                              onChoseDropOffMap={onChoseDropOffMap}
                              chosenDropOff={chosenDropOff}
                            />
                          );
                        }
                      },
                    )
                  ) : (
                    <>
                      {dataDropOffMaps && <>{labels.form.dropOff.noResult}</>}
                    </>
                  )}
                </div>
                <ErrorMessage
                  errors={errors}
                  name="dropOffMap"
                  render={({ message }: { message: string }) => {
                    if (dataDropOffMaps) {
                      return (
                        <CommonFormErrorText
                          message={message}
                          errorId="dropOffMap_error"
                        />
                      );
                    }
                    return <></>;
                  }}
                />
              </div>
            )}
          </div>
        )}
      </CommonLoader>
    </div>
  );
}
