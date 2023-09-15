import { useEffect, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { useGetActivedServicesByContractIdQuery } from "../../../../../../graphql/codegen/generated-types";
import {
  IServiceAvailable,
  IServiceLink,
  formatFetchedServices,
} from "../../../../../../lib/services-block";
import { formatDate } from "../../../../../../lib/utilities";
import { useContract } from "../../../../../../hooks/useContract";
import CommonButton from "../../../../../Common/CommonButton/CommonButton";
import ServiceLinkItem from "./ServiceLinkItem/ServiceLinkItem";
import "./services-block.scss";

interface IServicesBlockProps {
  blockName: string;
}

export default function ServicesBlock({ blockName }: IServicesBlockProps) {
  /* Static Data */
  const buttonLabels = {
    add: "Ajouter un lien",
  };

  /* Methods */
  function addServiceLink() {
    if (servicesAvailable.length > 0) {
      if (servicesAvailable[0].value && servicesAvailable[0].serviceId) {
        append({
          service: servicesAvailable[0].value,
          serviceId: servicesAvailable[0].serviceId,
        });
      }
    }
  }

  function deleteServiceLink(index: number) {
    remove(index);
  }

  /* Local Data */
  const { contractId } = useContract();
  const { data } = useGetActivedServicesByContractIdQuery({
    variables: { contractId, today: formatDate(new Date(), "yyyy-MM-dd") },
  });
  const [servicesAvailable, setServicesAvailable] = useState<
    Array<IServiceAvailable>
  >([]);
  const servicesBlockName = `${blockName}.serviceLinksData`;
  type ServiceLinksValues = {
    [fields: typeof servicesBlockName]: Array<IServiceLink>;
  };
  const { fields, append, remove } = useFieldArray<
    ServiceLinksValues,
    typeof servicesBlockName,
    "serviceLinkId"
  >({
    name: servicesBlockName,
    keyName: "serviceLinkId",
  });

  useEffect(() => {
    if (data) {
      setServicesAvailable(formatFetchedServices(data));
    }
  }, [data]);

  useEffect(() => {
    if (servicesAvailable.length > 0 && fields.length === 0) {
      if (servicesAvailable[0].value && servicesAvailable[0].serviceId) {
        append({
          service: servicesAvailable[0].value,
          serviceId: servicesAvailable[0].serviceId,
        });
      }
    }
  }, [servicesAvailable, append, servicesAvailable.length, fields.length]);

  return (
    <div className="c-ServicesBlock">
      {fields &&
        fields.map((field, index: number) => {
          return (
            <ServiceLinkItem
              key={field.serviceLinkId}
              blockName={servicesBlockName}
              index={index}
              onDeleteServiceLink={deleteServiceLink}
              servicesAvailable={servicesAvailable}
            />
          );
        })}
      <div className="c-ServicesBlock__AddButton">
        <CommonButton
          picto="add"
          label={buttonLabels.add}
          onClick={addServiceLink}
        />
      </div>
    </div>
  );
}
