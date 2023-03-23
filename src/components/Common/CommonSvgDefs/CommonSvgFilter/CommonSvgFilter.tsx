import chroma from "chroma-js";
import { useState } from "react";

interface ICommonSvgFilter {
  id: string;
  hexColor: string;
  opacity: number;
}

export default function CommonSvgFilter({
  id,
  hexColor,
  opacity,
}: ICommonSvgFilter) {
  const [r] = useState(chroma(hexColor).get("rgb.r") / 255);
  const [g] = useState(chroma(hexColor).get("rgb.g") / 255);
  const [b] = useState(chroma(hexColor).get("rgb.b") / 255);
  return (
    <filter id={id} colorInterpolationFilters="sRGB">
      <feColorMatrix
        type="matrix"
        values={`0 0 0 0 ${r}
                 0 0 0 0 ${g}
                 0 0 0 0 ${b}
                 0 0 0 ${opacity} 0
                `}
      />
    </filter>
  );
}
