/* eslint-disable no-shadow */
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useFormContext } from "react-hook-form";

interface IBarometerInsightProps {
  averageProduction: number;
}
const RADIAN = Math.PI / 180;
type Data = {
  name: string;
  value: number;
  color: string;
  kg: number;
};

export default function BarometerInsight({
  averageProduction,
}: IBarometerInsightProps) {
  const { watch } = useFormContext();
  const needleValue = averageProduction;

  const maxLow = Math.round(watch("low") / 100) * averageProduction;
  const maxMedium = Math.round((watch("medium") / 100) * averageProduction);
  const maxHigh = Math.round((watch("high") / 100) * averageProduction);
  const maxVeryHigh = Math.round((watch("veryHigh") / 100) * averageProduction);

  const rootStyles = getComputedStyle(document.documentElement);
  const white = rootStyles.getPropertyValue("--white");
  const graphLow = rootStyles.getPropertyValue("--graph-low");
  const graphMedium = rootStyles.getPropertyValue("--graph-medium");
  const graphHot = rootStyles.getPropertyValue("--graph-hot");
  const graphVeryHot = rootStyles.getPropertyValue("--graph-veryhot");

  const data: Data[] = [
    { name: "0", value: 0, color: white, kg: 0 },
    { name: "low", value: maxLow, color: graphLow, kg: maxLow },
    {
      name: "medium",
      value: maxMedium - maxLow,
      color: graphMedium,
      kg: maxMedium,
    },
    { name: "high", value: maxHigh - maxMedium, color: graphHot, kg: maxHigh },
    {
      name: "veryHigh",
      value: maxVeryHigh - maxHigh,
      color: graphVeryHot,
      kg: maxVeryHigh,
    },
  ];

  const cx = 155;
  const cy = 160;
  const iR = 40;
  const oR = 110;

  const needle = (
    value: number,
    data: Data[],
    cx: number,
    cy: number,
    iR: number,
    oR: number,
    color: string,
  ) => {
    const total = data.reduce((acc, cur) => acc + cur.value, 0);
    const ang =
      180.0 * (1 - value / total) < 0 ? 0 : 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return (
      <g>
        <path
          fill="#030f40"
          fillRule="evenodd"
          d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        />
        <circle
          cx={x0}
          cy={y0}
          r={4}
          fill="#FFF"
          stroke={color}
          strokeWidth="2.5"
        />
      </g>
    );
  };

  return (
    <div style={{ width: "327px", height: "200px" }}>
      <ResponsiveContainer>
        <PieChart className="PieChart" width={200} height={200}>
          <Pie
            width={150}
            height={200}
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            stroke="none"
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + Math.cos(midAngle * RADIAN) * radius;
              const y = cy + Math.sin(-midAngle * RADIAN) * radius;

              return (
                <text
                  x={x}
                  y={y}
                  fill="#8884d8"
                  textAnchor={x > cx ? "start" : "end"}
                  fontSize={12}
                >
                  {data[index].value !== 0
                    ? data[index].kg + "kg"
                    : data[index].kg}
                </text>
              );
            }}
            labelLine={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          {needle(needleValue, data, cx, cy, iR, oR, "#030F40")}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
