import React from "react";
import dynamic from "next/dynamic";
import Header from "../../components/Header/Header";
import "./gis-page.scss";

export default function GisPage() {
  const MapWrapper = React.useMemo(
    () =>
      dynamic(() => import("../../components/LeafletMap/LeafletMap"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <>
      <Header />
      <main>
        <div className={"o-Page__Content"}>
          <h1> GIS </h1>
          <h2>Sectorisation</h2>
          <div id="map" className={"c-Gis__Map"}>
            <MapWrapper />
          </div>
          <br />
        </div>
      </main>
    </>
  );
}
