import React from "react";

interface ICommonSvgProps {
  width?: string;
  height?: string;
  color?: string;
  dimensions: Array<string>;
}
export default function CommonSvg({
  width = "24",
  height = "24",
  color,
  dimensions,
}: ICommonSvgProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        clipPath="url(#a)"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {dimensions.map((dimension, index) => (
          <path
            key={index}
            style={{
              color,
            }}
            d={dimension}
          />
        ))}
      </g>
      <defs>
        <clipPath id="a">
          <path fill="currentColor" d={`M0 0h${height}v${width}H0z`} />
        </clipPath>
      </defs>
    </svg>
  );
}
