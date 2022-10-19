import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchPortfolio } from "services/api/portfolios";
import { AssetsList } from "components/Atomic/Organisms/AssetsList";
import { AssetsPieChart } from "components/Atomic/Molecules/AssetsPieChart";
import { LoadingScreen } from "components/Atomic/Molecules/LoadingScreen";

export const PortfolioDetails = () => {
  const { portfolioId } = useParams();

  const query = useQuery(["portfolio", portfolioId], () =>
    portfolioId ? fetchPortfolio(portfolioId) : null
  );

  if (query.isLoading) {
    return <LoadingScreen />;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  if (!portfolioId) return <span>Missing portfolio ID</span>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl m-4">{query.data?.name}</h1>
      <AssetsPieChart portfolioId={portfolioId} />
      <AssetsList portfolioId={portfolioId} />
    </div>
  );
};
