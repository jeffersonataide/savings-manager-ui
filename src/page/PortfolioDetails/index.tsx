import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchPortfolio } from "../../services/api/portfolios";

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

  return (
    <div>
      <h1 className="text-center text-3xl m-4">{query.data?.name}</h1>
    </div>
  );
};
