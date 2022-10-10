import { LineData } from ".";

interface ChartCoordinates {
  x: string;
  [key: string]: number | string;
}

export const transformLinesDataToChartCoordinates = (
  linesData: LineData[]
): ChartCoordinates[] => {
  const dataPoints: {
    [key: string]: { [key: string]: number };
  } = {};
  for (const line of linesData) {
    for (const dataPoint of line.datapoints) {
      dataPoints[dataPoint.x] = {
        ...dataPoints[dataPoint.x],
        [line.title]: dataPoint.y,
      };
    }
  }

  return Object.entries(dataPoints).map(([key, value]) => {
    return {
      x: key,
      ...value,
    };
  });
};
