import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchPortfolio } from "services/api/portfolios";
import { AssetsList } from "components/Atomic/Organisms/AssetsList";

export const PortfolioDetails = () => {
  const { portfolioId } = useParams();

  const query = useQuery(["portfolio", portfolioId], () =>
    portfolioId ? fetchPortfolio(portfolioId) : null
  );

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  if (!portfolioId) return <span>Missing portfolio ID</span>;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-3xl m-4">{query.data?.name}</h1>
      <AssetsList portfolioId={portfolioId} />
    </div>
  );
};
