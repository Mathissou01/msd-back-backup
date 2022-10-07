import React from "react";
import dynamic from "next/dynamic";
import Header from "../components/header";
import styles from "../styles/gis.module.scss";
import pageStyles from "../styles/page.module.scss";

export default function Gis() {
  const MapWrapper = React.useMemo(
    () =>
      dynamic(() => import("../components/LeafletMap"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    [],
  );

  return (
    <>
      <Header />
      <main>
        <div className={pageStyles.page__content}>
          <h1>GIS</h1>
          <h2>Sectorisation</h2>
          <div id="map" className={styles.gis__map}>
            <MapWrapper />
          </div>
          <br />
        </div>
      </main>
    </>
  );
}
