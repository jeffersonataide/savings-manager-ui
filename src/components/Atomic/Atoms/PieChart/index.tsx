import { VictoryLabel, VictoryPie, VictoryTheme } from "victory";

interface PieChartItem {
  x: string;
  y: number;
}

interface PieChartProps {
  data: PieChartItem[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <VictoryPie
      animate={{ duration: 6000, easing: "bounce" }}
      labels={({ datum }: { datum: PieChartItem }) =>
        `${datum.x.toLocaleUpperCase()} - $${Math.round(datum.y)}`
      }
      labelComponent={<VictoryLabel style={{ fill: "white", fontSize: 25 }} />}
      innerRadius={60}
      labelRadius={({ radius }) => Number(radius) + 20}
      style={{
        labels: {
          fontSize: 20,
        },
      }}
      events={[
        {
          target: "data",
          eventHandlers: {
            onMouseEnter: () => {
              return [
                {
                  target: "data",
                  mutation: ({ radius }) => {
                    return {
                      radius: radius * 1.1,
                    };
                  },
                },
              ];
            },
            onMouseLeave: () => {
              return [
                {
                  target: "data",
                  mutation: () => {
                    return {
                      radius: 125,
                    };
                  },
                },
              ];
            },
          },
        },
      ]}
      theme={VictoryTheme.material}
      data={data}
    />
  );
};
