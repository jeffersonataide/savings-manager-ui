import React from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryTooltip,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryGroup,
} from "victory";

import { v4 as uuidv4 } from "uuid";

interface DataPoint {
  x: string | number;
  y: number;
}

export interface LineData {
  title: string;
  datapoints: DataPoint[];
}

interface LineChartProps {
  linesData: LineData[];
}

export const LineChart: React.FC<LineChartProps> = ({ linesData }) => {
  return (
    <>
      <VictoryChart
        width={500}
        theme={VictoryTheme.material}
        containerComponent={<VictoryVoronoiContainer />}
        minDomain={{
          y: 0,
        }}
      >
        {linesData.map((lineData) => {
          const data = lineData.datapoints;
          return (
            <VictoryGroup data={data} key={uuidv4()}>
              <VictoryLine
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 },
                }}
                style={{
                  data: { stroke: "#c43a31", strokeWidth: 1 },
                }}
                interpolation="natural"
              />
              <VictoryScatter
                style={{ data: { fill: "#c43a31" } }}
                size={3}
                labels={({ datum }) => `$ ${datum.y}`}
                labelComponent={
                  <VictoryTooltip
                    flyoutStyle={{
                      stroke: "",
                    }}
                  />
                }
              />
            </VictoryGroup>
          );
        })}
      </VictoryChart>
    </>
  );
};
