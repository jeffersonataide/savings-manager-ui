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
    <table className="border-separate border-spacing-y-2 text-2xl w-full">
      <thead>
        <tr className="bg-emerald-300 text-white">
          <th className="p-3 uppercase text-left">Name</th>
        </tr>
      </thead>
      <tbody>
        {query.data?.portfolios.map((portfolio) => {
          return (
            <tr className="bg-slate-600 text-white">
              <td key={uuidv4()} className="p-3">
                {portfolio.name}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
