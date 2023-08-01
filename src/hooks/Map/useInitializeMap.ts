import { useEffect } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import Zoom from "ol/control/Zoom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Fill, Stroke, Style } from "ol/style";
import { useGetCitiesQuery } from "../../graphql/codegen/generated-types";
import { useContract } from "../useContract";

interface IHookInitializeMapProps {
  mapRef: React.RefObject<HTMLDivElement>;
  setMap: React.Dispatch<React.SetStateAction<Map | undefined>>;
  setSource: React.Dispatch<React.SetStateAction<VectorSource | undefined>>;
  handlePolygon: (polygon: string) => void;
  googleAPIKey: string | undefined;
}

export const useInitializeMap = ({
  mapRef,
  setMap,
  setSource,
  handlePolygon,
  googleAPIKey,
}: IHookInitializeMapProps) => {
  const { contractId } = useContract();
  const { data: cities } = useGetCitiesQuery({
    variables: {
      contractId: contractId,
    },
    fetchPolicy: "network-only",
  });

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    // Convert to RGB values
    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);

    // Set fixed opacity
    const fixedOpacity = 0.5;

    // Return as RGBA string
    return `rgba(${r},${g},${b},${fixedOpacity})`;
  };

  useEffect(() => {
    if (!mapRef.current) return;
    const featureColors: Record<string, string> = {};
    const initialSource = new VectorSource();
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga&key=${googleAPIKey}`,
          }),
        }),
        new VectorLayer({
          source: initialSource,
          style: (feature) => {
            const featureId = feature.getId();

            if (featureId !== undefined) {
              let color = featureColors[featureId];
              if (!color) {
                color = getRandomColor();
                featureColors[featureId] = color;
              }
              return new Style({
                fill: new Fill({ color }),
                stroke: new Stroke({ color: "#000", width: 1 }),
              });
            } else {
              // handle the situation when featureId is undefined
            }
          },
        }),
      ],
      view: new View({ center: [0, 0], zoom: 2 }),
      controls: [new Zoom()],
    });

    const handlePolygonEvent = () => {
      const features = initialSource.getFeatures();
      const writer = new GeoJSON();
      const polygons = writer.writeFeatures(features, {
        featureProjection: "EPSG:3857",
        dataProjection: "EPSG:4326",
      });
      handlePolygon(polygons);
    };

    initialSource.on("addfeature", handlePolygonEvent);
    initialSource.on("changefeature", handlePolygonEvent);
    initialSource.on("removefeature", handlePolygonEvent);

    setMap(initialMap);
    setSource(initialSource);

    // Zoom over all the communes of a contract
    if (cities) {
      const geojsonFormat = new GeoJSON();
      const tempVectorSource = new VectorSource();

      // Iterate over your array of GeoJSON data
      cities.territories?.data[0].attributes?.cities?.data.forEach((city) => {
        const features = geojsonFormat.readFeatures(city.attributes?.GeoJSON, {
          featureProjection: "EPSG:3857",
          dataProjection: "EPSG:4326",
        });
        tempVectorSource.addFeatures(features);
      });

      const extent = tempVectorSource.getExtent();
      const padding = [100, 100, 100, 100];
      initialMap.getView().fit(extent, { padding });
    }
    return () => {
      initialMap.setTarget(undefined);
    };
  }, [cities, googleAPIKey, handlePolygon, mapRef, setMap, setSource]);
};
