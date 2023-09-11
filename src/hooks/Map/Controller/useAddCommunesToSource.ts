import { useEffect, useState } from "react";
import Map from "ol/Map";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { useGetSectorizationByCityLazyQuery } from "../../../graphql/codegen/generated-types";

type Commune = {
  value: number;
  label: string;
};

interface IHookCommunesProps {
  map?: Map;
  source?: VectorSource;
  communes?: Commune[];
}

export const useAddCommunesToSource = ({
  map,
  source,
  communes,
}: IHookCommunesProps) => {
  const [getCommunes, { data }] = useGetSectorizationByCityLazyQuery({
    fetchPolicy: "cache-and-network",
  });

  // Add state to keep track of selected communes
  const [selectedCommunes, setSelectedCommunes] = useState<Commune[]>([]);

  useEffect(() => {
    if (!map || !source || !communes || communes.length === 0) return;

    // Get the list of communes to be added and removed
    const communesToAdd = communes.filter(
      (commune) =>
        !selectedCommunes.some(
          (selectedCommune) => selectedCommune.value === commune.value,
        ),
    );
    const communesToRemove = selectedCommunes.filter(
      (commune) => !communes.some((c) => c.value === commune.value),
    );

    const addCommuneFeatures = async () => {
      const featuresToAdd = [];

      for (const commune of communesToAdd) {
        // Fetch commune GeoJSON data
        const response = await getCommunes({
          variables: { postalCode: `${commune.value}` },
        });

        const communeData = response?.data?.sectorizationByCity?.GeoJson;
        if (communeData) {
          const reader = new GeoJSON();
          const features = reader.readFeatures(communeData, {
            featureProjection: "EPSG:3857",
          });

          features.forEach((feature, index) => {
            // Give each feature a unique id based on the commune
            feature.setId(`feature-${commune.value}-${index}`);
            // Store the commune in the feature properties so we can access it later
            feature.set("dynamicCommune", commune.value);
          });

          featuresToAdd.push(...features);
        }
      }

      // Add all the features to the source
      source.addFeatures(featuresToAdd);
    };

    addCommuneFeatures();

    // Remove features for deselected communes
    source
      .getFeatures()
      .filter((feature) =>
        communesToRemove.includes(feature.get("dynamicCommune")),
      )
      .forEach((feature) => source.removeFeature(feature));

    // Update selected communes
    setSelectedCommunes(communes);
  }, [map, source, getCommunes, communes, data, selectedCommunes]);
};
