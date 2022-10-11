import { useQuery } from "react-query";
import { fetchAssets } from "services/api/assets";
import { PieChart } from "components/Atomic/Atoms/PieChart";

interface AssetsPieChartProps {
  portfolioId: string;
}

export const AssetsPieChart: React.FC<AssetsPieChartProps> = ({
  portfolioId,
}) => {
  const query = useQuery("assets", () => fetchAssets(portfolioId));

  if (query.isLoading || !query.data) {
    return <span>Loading ...</span>;
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

  return <PieChart data={assetsData} />;
};
