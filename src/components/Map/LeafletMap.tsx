import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { MapContainer, TileLayer } from "react-leaflet";
import L, { CRS } from "leaflet";
import EditableGroup from "./FeatureGroup/EditableGroup";
import CommonSpinner from "../Common/CommonSpinner/CommonSpinner";
import { ISectorPolygon } from "../../lib/sectors";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "./leaflet-map.scss";

//TODO: Select one polygon to edit (one polygon at a time)
// function EditableLayer(props) {
//   const editLayerRef = React.useRef();
//   let drawControlRef = React.useRef();
//   const map = useMap();
//   console.log("hi", drawControlRef);
//   useEffect(() => {
//     if (!props.showDrawControl) {
//       map.removeControl(drawControlRef.current);
//     } else {
//       map.addControl(drawControlRef.current);
//     }
//     editLayerRef.current.clearLayers();
//     editLayerRef.current.addLayer(props.layer);
//     props.layer.on("click", function (e) {
//       props.onLayerClicked(e, drawControlRef.current);
//     });
//   }, [props, map]);
//   function onMounted(ctl) {
//     drawControlRef.current = ctl;
//   }
//   return (
//     <FeatureGroup ref={editLayerRef}>
//       <EditControl position="topright" onMounted={onMounted} {...props} />
//     </FeatureGroup>
//   );
// }
// function EditableGroup(props) {
//   const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);

//   function handleLayerClick(e, drawControl) {
//     setSelectedLayerIndex(e.target.feature.properties.editLayerId);
//   }

//   let dataLayer = new L.GeoJSON(props.data);
//   let layers = [];
//   let i = 0;
//   dataLayer.eachLayer((layer) => {
//     // Create a deep copy of the feature object
//     // let featureCopy = JSON.parse(JSON.stringify(layer.feature));
//     // Add the editLayerId property to the new object
//     layer.feature.properties.editLayerId = i;
//     // Create a new layer with the copied feature object
//     // let newLayer = L.geoJSON(featureCopy);
//     layers.push(layer);
//     i++;
//   });
//   console.log("hello", dataLayer);
//   return (
//     <div>
//       {layers.map((layer, i) => {
//         return (
//           <EditableLayer
//             key={i}
//             layer={layer}
//             showDrawControl={i === selectedLayerIndex}
//             onLayerClicked={handleLayerClick}
//           />
//         );
//       })}
//     </div>
//   );
// }
const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY?.toString();

const LeafletMap = ({ polygon, handlePolygon }: ISectorPolygon) => {
  const center: L.LatLngExpression = [45.76342, 4.834277];

  const render = (status: Status): React.ReactElement => {
    if (status === Status.LOADING) return <CommonSpinner />;
    return <p>Error</p>;
  };

  return (
    <>
      {googleAPIKey && (
        <Wrapper apiKey={googleAPIKey} render={render}>
          <MapContainer
            className="c-LeafletMap"
            center={center}
            zoom={10}
            maxZoom={30}
            scrollWheelZoom={false}
            //TODO: Add Bounds of france
            // maxBounds={franceBounds}
            maxBoundsViscosity={0.5}
            worldCopyJump={true}
            crs={CRS.EPSG3857}
          >
            <TileLayer
              url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
              attribution={"&copy; Google"}
            />

            <EditableGroup
              polygon={polygon}
              handlePolygon={handlePolygon}
              //TODO: Send Commune
              // commune={commune}
            />
          </MapContainer>
        </Wrapper>
      )}
      <div>Invalid google api key</div>
    </>
  );
};

export default LeafletMap;
