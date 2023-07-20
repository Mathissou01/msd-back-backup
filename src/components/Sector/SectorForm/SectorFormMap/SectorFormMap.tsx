import React, { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import "./sector-form-map.scss";

interface ISectorFormMapProps {
  initialPolygon: string;
}

export default function SectorFormMap({ initialPolygon }: ISectorFormMapProps) {
  const { watch, setValue } = useFormContext();
  const selectedCommunes = watch("communes");

  const handlePolygonUpdate = useCallback(
    (polygon: string) => {
      setValue("polygonData", polygon);
    },
    [setValue],
  );

  const GoogleMap = useMemo(
    () =>
      dynamic(() => import("../../../Map/OpenlayersMap"), {
        ssr: false,
        loading: () => <p>Loading...</p>,
      }),
    [],
  );

  return (
    <div className="c-SectorFormMap">
      <GoogleMap
        polygon={initialPolygon}
        communes={selectedCommunes || []}
        handlePolygon={handlePolygonUpdate}
      />
    </div>
  );
}
