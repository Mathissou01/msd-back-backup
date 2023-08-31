import { useEffect } from "react";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import { Modify } from "ol/interaction";

interface IHookModifyInteractionsProps {
  map?: Map;
  source?: VectorSource;
  modifyActive: boolean;
  setDrawActive: React.Dispatch<React.SetStateAction<boolean>>;
  setModifyActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useModifyInteractions = ({
  map,
  source,
  modifyActive,
  setDrawActive,
}: IHookModifyInteractionsProps) => {
  useEffect(() => {
    if (!map || !source) return;

    if (modifyActive) {
      const modify = new Modify({ source });
      map.addInteraction(modify);
      setDrawActive(false);
    } else {
      map.getInteractions().forEach((interaction) => {
        if (interaction instanceof Modify) {
          map.removeInteraction(interaction);
        }
      });
    }
  }, [map, source, modifyActive, setDrawActive]);
};
