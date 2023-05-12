import React, { useRef, useEffect } from "react";
import { ISectorPolygon } from "../../../lib/sectors";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";

export default function EditableGroup({
  polygon,
  handlePolygon,
}: ISectorPolygon) {
  const ref = useRef<L.FeatureGroup>(null);
  //TODO: get the selected layer
  // const [selectedLayer, setSelectedLayer] = React.useState<L.Layer | null>(
  //   null,
  // );

  //TODO: if we need to add marks for later we need them
  // L.Icon.Default.mergeOptions({
  //   iconRetinaUrl:
  //     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  //   iconUrl:
  //     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-icon.png",
  //   shadowUrl:
  //     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png",
  // });
  useEffect(() => {
    if (ref.current?.getLayers().length === 0 && polygon) {
      L.geoJSON(polygon, {
        onEachFeature: (feature, layer) => {
          if (
            layer instanceof L.Polyline ||
            layer instanceof L.Polygon ||
            layer instanceof L.Marker
          ) {
            if (layer instanceof L.Polygon) {
              layer?.setStyle({ fillColor: randomColor() });
            }
            if (layer?.feature?.properties.radius && ref.current) {
              new L.Circle(
                layer.feature.geometry.coordinates.slice().reverse(),
                {
                  radius: layer.feature?.properties.radius,
                },
              ).addTo(ref.current);
            } else {
              ref.current?.addLayer(layer);
            }

            layer.on("click", () => {
              //TODO: edit selected layer
              // ref.current?.eachLayer((l) => {
              //   if (l instanceof L.Polygon) {
              //     if (l._leaflet_id === e.target._leaflet_id) {
              //       l.editing.enable();
              //       // drawControlRef = e.target._leaflet_id;
              //       setSelectedLayer(e.target._leaflet_id);
              //     } else {
              //       l.editing.disable();
              //     }
              //   }
              // });
            });
          }
        },
      });
    }
  }, [polygon]);

  const randomColor = () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return "rgb(" + r + " ," + g + "," + b + ")";
  };
  const handleChange = () => {
    const geo = ref.current?.toGeoJSON();
    if (geo?.type === "FeatureCollection") {
      handlePolygon(geo);
    }
  };

  return (
    <FeatureGroup ref={ref}>
      <EditControl
        position="topright"
        onEdited={handleChange}
        onCreated={handleChange}
        onDeleted={handleChange}
        draw={{
          rectangle: false,
          circle: false,
          polyline: false,
          polygon: true,
          marker: false,
          circlemarker: false,
        }}
      />
    </FeatureGroup>
  );
}
