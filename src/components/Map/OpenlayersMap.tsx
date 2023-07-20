import React, { useRef, useState } from "react";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import CommonButton from "../Common/CommonButton/CommonButton";
import Feature from "ol/Feature";
import { useInitializeMap } from "../../hooks/Map/useInitializeMap";
import { useAddPolygonToSource } from "../../hooks/Map/Controller/useAddPolygonToSource";
import { useAddCommunesToSource } from "../../hooks/Map/Controller/useAddCommunesToSource";
import { useSelectFeature } from "../../hooks/Map/Controller/useSelectFeature";
import { useDrawInteractions } from "../../hooks/Map/Controller/useDrawInteractions";
import { useModifyInteractions } from "../../hooks/Map/Controller/useModifyInteractions";
import "ol/ol.css";
import "./open-layers-map.scss";

type Commune = {
  value: number;
  label: string;
};

interface GeoJSONProps {
  polygon: string;
  communes: Array<Commune>;
  handlePolygon: (polygon: string) => void;
}

const OpenLayersMap: React.FC<GeoJSONProps> = ({
  polygon,
  communes,
  handlePolygon,
}) => {
  /* Static Data */
  const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY?.toString();

  /* Local Data */
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map>();
  const [source, setSource] = useState<VectorSource>();
  const [selectedFeature, setSelectedFeature] = useState<Feature>();
  const [drawActive, setDrawActive] = useState<boolean>(false);
  const [modifyActive, setModifyActive] = useState<boolean>(false);

  useInitializeMap({ mapRef, setMap, setSource, handlePolygon, googleAPIKey });
  useAddPolygonToSource({ map, source, polygon });
  useAddCommunesToSource({
    map,
    source,
    communes,
  });
  useSelectFeature({ map, source, setSelectedFeature });
  useDrawInteractions({
    map,
    source,
    drawActive,
    setModifyActive,
  });
  useModifyInteractions({
    map,
    source,
    modifyActive,
    setDrawActive,
    setModifyActive,
  });

  return (
    <>
      {googleAPIKey ? (
        <div className="c-OpenLayersMap">
          <div ref={mapRef} className="c-OpenLayersMap__Map" />
          <div className="c-OpenLayersMap__Attribution">
            Map data © Google |{" "}
            <a
              href="https://developers.google.com/maps/terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit" }}
            >
              Terms
            </a>
          </div>

          <div className="c-OpenLayersMap__ControlBar">
            <CommonButton
              style={"primary"}
              type={"button"}
              isDisabled={false}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setDrawActive(!drawActive);
              }}
              picto="polygon"
              formLabelId={"commonButton"}
            />
            <CommonButton
              style={"primary"}
              type={"button"}
              isDisabled={false}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                setModifyActive(!modifyActive);
              }}
              picto="edit"
              formLabelId={"commonButton"}
            />
            {selectedFeature && (
              <CommonButton
                style={"primary"}
                type={"button"}
                isDisabled={false}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  source?.removeFeature(selectedFeature);
                  setSelectedFeature(undefined);
                }}
                picto="trash"
                formLabelId={"commonButton"}
              />
            )}
          </div>
        </div>
      ) : (
        <div>Invalid Google API key</div>
      )}
    </>
  );
};

export default OpenLayersMap;
