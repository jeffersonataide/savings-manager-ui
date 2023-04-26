import { useQuery } from "react-query";
import { fetchPortfolio } from "@/services/api/portfolios";
import { AssetsList } from "@/components/Atomic/Organisms/AssetsList";
import { AssetsPieChart } from "@/components/Atomic/Molecules/AssetsPieChart";
import { Spinner } from "@/components/Atomic/Atoms/Spinner";

interface PortfolioDetailsProps {
  portfolioId: string;
}

export const PortfolioDetails: React.FC<PortfolioDetailsProps> = ({
  portfolioId,
}) => {
  const query = useQuery(["portfolio", portfolioId], () =>
    fetchPortfolio(portfolioId)
  );

  if (query.isLoading) {
    return (
      <div className="w-1/6 py-10 mx-auto">
        <Spinner />
      </div>
    );
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  if (!portfolioId) return <span>Missing portfolio ID</span>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-xl m-4 text-white">
        {query.data?.name.toLocaleUpperCase()} ASSETS
      </h1>
      <AssetsPieChart portfolioId={portfolioId} />
      <AssetsList portfolioId={portfolioId} />
    </div>
  );
};
