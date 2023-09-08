import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  IServicesBlockFormValues,
  IYesWeScanServiceFields,
} from "../../../lib/services";
import { removeNulls } from "../../../lib/utilities";
import YesWeScanServiceCard from "./YesWeScanServiceCard/YesWeScanServiceCard";
import YesWeScanAddServiceCard from "./YesWeScanAddServiceCard/YesWeScanAddServiceCard";

interface IYesWeScanServicesBlockProps {
  services: Array<IYesWeScanServiceFields>;
  setServices: (v: Array<IYesWeScanServiceFields>) => void;
}

export function YesWeScanServicesBlock({
  services,
  setServices,
}: IYesWeScanServicesBlockProps) {
  /* Static */
  const labels = {
    yesWeScanServices: "Services Yes we scan",
  };
  const yesWeScanServicesName = "yesWeScanServices";

  /* Methods */
  function onYesWeScanAddServiceClick() {
    const newYesWeScanServices: Array<IYesWeScanServiceFields> = [...services];
    const temporaryId = uuidv4();
    newYesWeScanServices?.push({ id: temporaryId });
    setValue(yesWeScanServicesName, newYesWeScanServices, {
      shouldDirty: true,
    });
    setServices(newYesWeScanServices);
  }

  function onYesWeScanServiceTrashClick(serviceId: string) {
    const newYesWeScanServices: Array<IYesWeScanServiceFields> = [...services];
    const deletedServiceId = newYesWeScanServices.findIndex(
      (service) => service.id === serviceId,
    );
    delete newYesWeScanServices[deletedServiceId];
    const filteredServices = newYesWeScanServices.filter(removeNulls);
    setValue(yesWeScanServicesName, filteredServices, {
      shouldDirty: true,
    });
    setServices(filteredServices);
  }

  /* Local */
  const [visibleYesWeScanServices, setVisibleYesWeScanServices] =
    useState<boolean>(false);
  const { watch, setValue } = useFormContext<IServicesBlockFormValues>();
  const yesWeScanWatch = watch("hasYesWeScan");

  useEffect(() => {
    setVisibleYesWeScanServices(yesWeScanWatch);
  }, [yesWeScanWatch, setVisibleYesWeScanServices]);

  return (
    <>
      {visibleYesWeScanServices && (
        <>
          <h2 className="c-ServicesBlock__Title">{labels.yesWeScanServices}</h2>
          <div className="c-ServicesBlock__Services">
            {services && (
              <>
                {services.length > 0 && (
                  <>
                    {services.map((service, index) => (
                      <YesWeScanServiceCard
                        key={service.id}
                        name={`${yesWeScanServicesName}.${index}`}
                        onTrashClick={() =>
                          onYesWeScanServiceTrashClick(service.id)
                        }
                      />
                    ))}
                  </>
                )}
                {services.length < 10 && (
                  <YesWeScanAddServiceCard
                    onClick={onYesWeScanAddServiceClick}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
