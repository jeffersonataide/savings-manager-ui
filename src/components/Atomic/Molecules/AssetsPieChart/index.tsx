import { useQuery } from "react-query";
import { fetchAssets } from "services/api/assets";
import { PieChart } from "components/Atomic/Atoms/PieChart";
import { LoadingScreen } from "../LoadingScreen";

interface AssetsPieChartProps {
  portfolioId: string;
}

export const AssetsPieChart: React.FC<AssetsPieChartProps> = ({
  portfolioId,
}) => {
  const query = useQuery("assets", () => fetchAssets(portfolioId));

  if (query.isLoading || !query.data) {
    return <LoadingScreen />;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  const assetsData = query.data.map((asset) => {
    const assetTotal = asset.deposits.reduce((acc, deposit) => {
      acc += deposit.amount;
      return acc;
    }, 0);

    return {
      x: asset.name,
      y: assetTotal,
    };
  });

  const hasDeposits = !!assetsData.find((asset) => asset.y > 0);

  return hasDeposits ? (
    <div className="h-96 w-full p-10">
      <PieChart data={assetsData} />
    </div>
  ) : null;
};
