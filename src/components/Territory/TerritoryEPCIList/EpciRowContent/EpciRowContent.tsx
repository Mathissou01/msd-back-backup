import React, { useState } from "react";
import classNames from "classnames";
import {
  EpciEntity,
  useGetCitiesByEpciIdQuery,
} from "../../../../graphql/codegen/generated-types";
import TerritoryEPCICommunes from "../TerritoryEPCICommunes/TerritoryEPCICommunes";
import "./epci-row-content.scss";

interface IAccordion {
  epci: EpciEntity;
  handleDelete: (id: string) => void;
}
export default function EpciRowContent({ epci, handleDelete }: IAccordion) {
  const labels = {
    columns: {
      siren: "Siren :",
      communes: "communes",
      displayCommunes: "Afficher les communes",
    },
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: epciCities } = useGetCitiesByEpciIdQuery({
    variables: {
      epciId: epci.id ?? "",
    },
  });

  return (
    <div className="c-EpciRowContent">
      <div className="c-EpciRowContent__ContentRow">
        <div
          className="c-EpciRowContent__ContentRowContent"
          data-testid="accordion-content"
        >
          <span>{epci.attributes?.name}</span>
          <span>{`${labels.columns.siren}  ${epci.attributes?.siren}`}</span>
          <span>{`${epciCities?.cities?.data.length} ${labels.columns.communes}`}</span>

          <span
            className="c-EpciRowContent__ContentRowExpander"
            onClick={() => setIsExpanded(!isExpanded)}
            data-testid="accordion-expander"
          >
            <div className="c-EpciRowContent__ContentRowLabel">
              {labels.columns.displayCommunes}
            </div>
            <div
              className={classNames("c-EpciRowContent__ContentRowIcon", {
                ["c-EpciRowContent__ContentRowIconExpanded"]: isExpanded,
              })}
            />
          </span>

          <button
            className="c-EpciRowContent__ContentRowDelete"
            onClick={() => handleDelete(`${epci.id}`)}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="c-EpciRowContent__ExpandedContent">
          <TerritoryEPCICommunes epciCities={epciCities?.cities?.data ?? []} />
        </div>
      )}
    </div>
  );
}
