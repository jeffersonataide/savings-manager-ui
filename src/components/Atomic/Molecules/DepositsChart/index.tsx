import { useQuery } from "react-query";
import { fetchDeposits } from "services/api/deposits";
import { formatDateStringToLong } from "utils/dateFormating";
import { sortByDate } from "utils/sorting";
import { LineChart } from "components/Atomic/Atoms/LineChart";

interface DepositsChartProps {
  assetName: string;
  assetId: string;
}
export const DepositsChart: React.FC<DepositsChartProps> = ({
  assetName,
  assetId,
}) => {
  const query = useQuery("deposits", () => fetchDeposits(assetId));

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  if (!query.data) {
    return null;
  }

  const depositsData = {
    title: assetName,
    datapoints: query.data.sort(sortByDate).map((deposit) => ({
      x: formatDateStringToLong(deposit.date),
      y: deposit.amount,
    })),
  };

  const lines = [depositsData];
  const hasDatapoints = !!lines.find((line) => !!line.datapoints.length);

  return hasDatapoints ? (
    <div className="h-96 w-screen p-10">
      <LineChart linesData={lines} />
    </div>
  ) : null;
};