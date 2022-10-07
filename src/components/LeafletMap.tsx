import { GeoJSON, Polygon, Map } from "leaflet";
import React, { useRef } from "react";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { fetchAzureSearch } from "../lib/api";
import styles from "../styles/leaflet-map.module.scss";

interface IPolygon {
  type: string;
  properties: {};
  geometry: {
    type: string;
    coordinates: Array<Array<Array<Number>>>;
  };
}

interface IGeoResult {
  cle_interop: string;
  commune_insee: string;
  commune_nom: string;
  voie_nom: string;
  numero: string;
}

const LeafletMap = () => {
  let layerRef = useRef(null);
  const [geoResults, setGeoResults] = React.useState<Array<IGeoResult>>([]);

  async function toGeoJSON() {
    let collection: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: [],
    };
    let layerGroup: Map = layerRef.current as unknown as Map;
    layerGroup.eachLayer((layer) => {
      if (layer instanceof Polygon) {
        collection.features.push(layer.toGeoJSON());
      }
    });

    if (collection.features.length > 0) {
      console.log(collection);
      let formattedCollection: Array<string> = [];
      collection.features.forEach((feature) => {
        const polygon = feature as IPolygon;
        const formattedCoords = polygon.geometry.coordinates[0].map(
          (coordinate) => {
            return `${coordinate[0]} ${coordinate[1]}`;
          },
        );
        formattedCollection.push(
          `geo.intersects(coordonnees, geography'POLYGON((${formattedCoords}))')`,
        );
      });

      await fetchAzureSearch("/indexes/adresses-gouv/docs", {
        "api-version": "2020-06-30",
        $count: true,
        $orderby: "voie_nom,numero",
        $select: "cle_interop,commune_insee,commune_nom,voie_nom,numero",
        $filter: formattedCollection.join(" or "),
      }).then((results) => {
        // console.log("RESULTS", results);
        // console.log("COUNT", results["@odata.count"]);
        setGeoResults(results.value);
      });
    } else {
      setGeoResults([]);
    }
  }

  return (
    <>
      <MapContainer
        center={[45.777, 4.85973]}
        zoom={19}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup ref={layerRef}>
          <EditControl
            position={"topright"}
            draw={{
              rectangle: false,
            }}
          />
        </FeatureGroup>
      </MapContainer>
      <button onClick={toGeoJSON} className={styles.leafletMap__button}>
        Récupérer Adresses
      </button>
      <div className={styles.leafletMap__results}>
        Résultats ({geoResults.length}) :
      </div>
      {geoResults?.length > 0 && (
        <ul>
          {geoResults?.map((result: IGeoResult) => {
            return (
              <li key={result.cle_interop}>
                <p>
                  {result.numero +
                    " " +
                    result.voie_nom +
                    ", " +
                    result.commune_insee +
                    " " +
                    result.commune_nom}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default LeafletMap;
