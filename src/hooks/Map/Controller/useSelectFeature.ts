import { useEffect } from "react";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import { Select } from "ol/interaction";
import Feature from "ol/Feature";

interface IHookSelectFeature {
  map?: Map;
  source?: VectorSource;
  setSelectedFeature: React.Dispatch<React.SetStateAction<Feature | undefined>>;
}
export const useSelectFeature = ({
  map,
  source,
  setSelectedFeature,
}: IHookSelectFeature) => {
  useEffect(() => {
    if (!map || !source) return;

    const select = new Select();

    select.on("select", (event) => {
      const selectedFeatures = event.target.getFeatures();

      if (selectedFeatures.getLength() > 0) {
        setSelectedFeature(selectedFeatures.item(0));
      } else {
        setSelectedFeature(undefined);
      }
    });

    map.addInteraction(select);

    return () => {
      map.removeInteraction(select);
    };
  }, [map, setSelectedFeature, source]);
};
