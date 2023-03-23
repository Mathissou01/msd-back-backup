import React, { forwardRef } from "react";

function MapContainerComponent() {
  return React.createElement("div", { "data-testid": "map-container" });
}

function TileLayerComponent() {
  return React.createElement("div");
}

function FeatureGroupComponent() {
  return React.createElement("div");
}

export const MapContainer = forwardRef(MapContainerComponent);
export const TileLayer = forwardRef(TileLayerComponent);
export const FeatureGroup = forwardRef(FeatureGroupComponent);
