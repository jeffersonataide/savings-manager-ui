import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { transformLinesDataToChartCoordinates } from "./utils";

interface DataPoint {
  x: string | number;
  y: number;
}

export interface LineData {
  title: string;
  datapoints: DataPoint[];
}

interface ChartLineProps {
  linesData: LineData[];
}

export const ChartLine: React.FC<ChartLineProps> = ({ linesData }) => {
  const linesTitle = linesData.map((line) => line.title);

  const data = transformLinesDataToChartCoordinates(linesData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis />
        <Tooltip />
        <Legend />
        {linesTitle.map((lineTitle) => {
          const colorHex = Math.floor(Math.random() * 16777215).toString(16);
          return (
            <React.Fragment key={uuidv4()}>
              <XAxis dataKey="x" />
              <Line
                type="monotone"
                dataKey={lineTitle}
                stroke={`#${colorHex}`}
                activeDot={{ r: 8 }}
              />
            </React.Fragment>
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};
