import React, { useState } from "react";
import classNames from "classnames";
import { EpciEntity } from "../../../../graphql/codegen/generated-types";
import TerritoryEPCICommunes from "../TerritoryEPCICommunes/TerritoryEPCICommunes";
import "./epci-row-content.scss";

interface IAccordion {
  name: string;
  siren: string;
  communes: number;
  epci: EpciEntity;
  handleDelete: (id: string) => void;
}
export default function EpciRowContent({
  epci,
  name,
  siren,
  communes,
  handleDelete,
}: IAccordion) {
  const labels = {
    columns: {
      siren: "Siren :",
      communes: "communes",
      displayCommunes: "Afficher les communes",
    },
  };
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="c-EpciRowContent">
      <div className="c-EpciRowContent__ContentRow">
        <div
          className="c-EpciRowContent__ContentRowContent"
          data-testid="accordion-content"
        >
          <span>{name}</span>
          <span>{`${labels.columns.siren}  ${siren}`}</span>
          <span>{`${communes} ${labels.columns.communes}`}</span>

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
          <TerritoryEPCICommunes EPCICommunes={epci} />
        </div>
      )}
    </div>
  );
}
