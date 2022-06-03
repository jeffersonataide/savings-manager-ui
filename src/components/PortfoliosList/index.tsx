import { useQuery } from "react-query";
import { fetchPortfolios } from "../../services/api";
import { v4 as uuidv4 } from "uuid";

export const PortfoliosList = () => {
  const query = useQuery("portfolios", fetchPortfolios);

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  return (
    <div>
      PortfoliosList
      <ul>
        {query.data?.portfolios.map((portfolio) => {
          return (
            <li key={uuidv4()}>
              {portfolio.id} - {portfolio.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
