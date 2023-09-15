import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";
import {
  LinkServiceType,
  LinkedServices,
  ServiceType,
  useGetBlockServicesSubSelectionLazyQuery,
} from "../../../../../../../graphql/codegen/generated-types";
import { IServiceAvailable } from "../../../../../../../lib/services-block";
import { removeNulls } from "../../../../../../../lib/utilities";
import CommonButton from "../../../../../../Common/CommonButton/CommonButton";
import FormSelect from "../../../../../FormSelect/FormSelect";
import "./service-link-item.scss";

interface IServiceLinkItemProps {
  servicesAvailable: Array<IServiceAvailable>;
  blockName: string;
  index: number;
  onDeleteServiceLink: (index: number) => void;
}

interface Map {
  [key: string]: LinkServiceType;
}

interface ILinkedServices extends LinkedServices {
  option: string;
}

export default function ServiceLinkItem({
  servicesAvailable,
  blockName,
  index,
  onDeleteServiceLink,
}: IServiceLinkItemProps) {
  /* Static Data */
  const SubSelectionTitleDict = {
    [ServiceType.Request]: "Formulaires",
    [ServiceType.DropOffMap]: "Points à afficher sur la carte",
    editorial: "Sélection du type de contenu",
  };

  /* Methods */
  async function updateSubSelectionOptionsCallBack() {
    const serviceId = getServiceIdFromServiceValue(serviceValue);
    const blockServicesSubSelectionResponse =
      await getBlockServicesSubSelection({
        variables: {
          selectedService: ServiceNameTranslation[serviceValue],
          serviceId: serviceId,
        },
      });
    const newSubSelection =
      blockServicesSubSelectionResponse.data?.getEditoContentLinkedServices
        ?.elements;
    if (newSubSelection) {
      setSubSelectionOptions(
        newSubSelection.filter(removeNulls).map((option) => {
          return {
            ...option,
            option: option.id,
          };
        }),
      );
    }
  }

  /* Local Data */
  const { watch, setValue, register } = useFormContext();
  const serviceValue = watch(`${blockName}.${index}.service`);
  register(`${blockName}.${index}.subSelection`, {
    value: null,
  });
  const subSelectionValue = watch(`${blockName}.${index}.subSelection`);
  const hasSubSelection =
    serviceValue &&
    serviceValue !== ServiceType.Alert &&
    serviceValue !== ServiceType.PickUpDay &&
    serviceValue !== ServiceType.Recycling;
  register(`${blockName}.${index}.serviceId`, {
    value: null,
  });
  register(`${blockName}.${index}.idFreeContentSubService`, {
    value: null,
  });
  register(`${blockName}.${index}.dropOffCollectType`, { value: null });
  register(`${blockName}.${index}.editorialSubServiceType`, {
    value: null,
  });
  const ServiceNameTranslation = useMemo<Map>(() => {
    return {
      [ServiceType.Alert]: LinkServiceType.AlertNotificationService,
      [ServiceType.PickUpDay]: LinkServiceType.PickUpDayService,
      [ServiceType.Recycling]: LinkServiceType.RecyclingGuideService,
      editorial: LinkServiceType.EditorialService,
      [ServiceType.DropOffMap]: LinkServiceType.DropOffMapService,
      [ServiceType.Request]: LinkServiceType.RequestService,
    };
  }, []);
  const getServiceIdFromServiceValue = useCallback(
    (serviceValue: string): string => {
      const serviceId = servicesAvailable.find(
        (service) => service.value === serviceValue,
      );
      return serviceId?.serviceId ?? "";
    },
    [servicesAvailable],
  );
  const [getBlockServicesSubSelection] =
    useGetBlockServicesSubSelectionLazyQuery({
      fetchPolicy: "cache-first",
    });
  const updateSubSelectionOptions = useCallback(
    updateSubSelectionOptionsCallBack,
    [
      ServiceNameTranslation,
      getServiceIdFromServiceValue,
      serviceValue,
      getBlockServicesSubSelection,
    ],
  );
  const [subSelectionOptions, setSubSelectionOptions] = useState<
    Array<ILinkedServices>
  >([]);

  useEffect(() => {
    if (serviceValue) {
      const serviceId = getServiceIdFromServiceValue(serviceValue);
      setValue(`${blockName}.${index}.serviceId`, serviceId, {
        shouldDirty: false,
      });
      updateSubSelectionOptions();
      if (!hasSubSelection) {
        setValue(`${blockName}.${index}.subSelection`, null, {
          shouldDirty: false,
        });
      }
    }
  }, [
    serviceValue,
    blockName,
    index,
    setValue,
    getServiceIdFromServiceValue,
    updateSubSelectionOptions,
    hasSubSelection,
  ]);

  useEffect(() => {
    if (subSelectionValue) {
      setValue(`${blockName}.${index}.idFreeContentSubService`, null, {
        shouldDirty: false,
      });
      setValue(`${blockName}.${index}.dropOffCollectType`, null, {
        shouldDirty: false,
      });
      setValue(`${blockName}.${index}.editorialSubServiceType`, null, {
        shouldDirty: false,
      });
      if (serviceValue === ServiceType.DropOffMap) {
        const currentDropOffCollectType = subSelectionOptions.find(
          (option) => option.option === subSelectionValue,
        );
        if (currentDropOffCollectType?.name) {
          setValue(
            `${blockName}.${index}.dropOffCollectType`,
            currentDropOffCollectType.name,
            { shouldDirty: false },
          );
        }
      } else if (serviceValue === "editorial") {
        const currentSubService = subSelectionOptions.find(
          (option) => option.option === subSelectionValue,
        );
        if (currentSubService?.type) {
          setValue(
            `${blockName}.${index}.editorialSubServiceType`,
            currentSubService.type,
            { shouldDirty: false },
          );
        }
        if (
          currentSubService?.type === "freeContentSubServices" &&
          currentSubService?.idFreeContentSubService
        ) {
          setValue(
            `${blockName}.${index}.idFreeContentSubService`,
            currentSubService.idFreeContentSubService,
            { shouldDirty: false },
          );
        }
      }
    }
  }, [
    blockName,
    index,
    serviceValue,
    setValue,
    subSelectionValue,
    subSelectionOptions,
  ]);

  return (
    <div className="c-ServiceLinkItem" key={index}>
      <div className="c-ServiceLinkItem__ServiceSelection">
        <FormSelect
          name={`${blockName}.${index}.service`}
          label={`Service n°${index + 1}`}
          options={servicesAvailable.map((serviceAvailable) => {
            return {
              label: serviceAvailable.label,
              option: serviceAvailable.value,
            };
          })}
        />
      </div>
      <div
        className={classNames("c-ServiceLinkItem__SubSelection", {
          ["c-ServiceLinkItem__SubSelection_invisible"]: !hasSubSelection,
        })}
      >
        <FormSelect
          name={`${blockName}.${index}.subSelection`}
          label={
            SubSelectionTitleDict[
              serviceValue as keyof typeof SubSelectionTitleDict
            ] ?? ""
          }
          options={subSelectionOptions.map((subSelectionOption) => {
            return {
              label: subSelectionOption.name,
              option: subSelectionOption.option,
            };
          })}
          isRequired={hasSubSelection}
        />
      </div>
      <div className="c-ServiceLinkItem__DeleteButton">
        {index !== 0 && (
          <CommonButton
            picto="trash"
            onClick={() => {
              onDeleteServiceLink(index);
            }}
          />
        )}
      </div>
    </div>
  );
}
