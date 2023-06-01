import { useEffect } from "react";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

interface IHookAddPolygonProps {
  map?: Map;
  source?: VectorSource;
  polygon?: GeoJSON;
}
export const useAddPolygonToSource = ({
  map,
  source,
  polygon,
}: IHookAddPolygonProps) => {
  useEffect(() => {
    if (!map || !source || !polygon) return;
    const reader = new GeoJSON();
    try {
      const features = reader.readFeatures(polygon, {
        featureProjection: "EPSG:3857",
      });
      source.addFeatures(features);
    } catch (error) {
      //TODO: future debugging
      console.error("Error reading features:", error);
    }
  }, [map, source, polygon]);
};
