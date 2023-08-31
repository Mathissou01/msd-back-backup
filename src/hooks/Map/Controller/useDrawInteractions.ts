import { useEffect } from "react";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import { Draw } from "ol/interaction";

interface IHookDrawInteractionsProps {
  map?: Map;
  source?: VectorSource;
  drawActive: boolean;
  setModifyActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useDrawInteractions = ({
  map,
  source,
  drawActive,
  setModifyActive,
}: IHookDrawInteractionsProps) => {
  useEffect(() => {
    if (!map || !source) return;

    if (drawActive) {
      const draw = new Draw({ source, type: "Polygon" });
      // Assign a unique id to each drawn feature
      draw.on("drawend", (event) => {
        event.feature.setId(`drawn-${Math.random().toString(36).substring(7)}`);
      });
      map.addInteraction(draw);
      setModifyActive(false);
    } else {
      map.getInteractions().forEach((interaction) => {
        if (interaction instanceof Draw) {
          map.removeInteraction(interaction);
        }
      });
    }
  }, [map, source, drawActive, setModifyActive]);
};
