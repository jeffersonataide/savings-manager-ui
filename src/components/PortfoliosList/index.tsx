import { useMutation, useQuery, useQueryClient } from "react-query";
import { deletePortfolio, fetchPortfolios } from "../../services/api";
import { v4 as uuidv4 } from "uuid";

export const PortfoliosList = () => {
  const queryClient = useQueryClient();
  const query = useQuery("portfolios", fetchPortfolios);
  const mutation = useMutation(deletePortfolio);

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  const handleDeletePortfolio = (id: string) => {
    mutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["portfolios"]);
      },
    });
  };

  return (
    <table className="border-separate border-spacing-y-2 text-2xl w-full">
      <thead>
        <tr className="bg-emerald-300 text-white">
          <th className="p-3 uppercase text-left">Name</th>
          <th className="p-3 uppercase text-left"></th>
        </tr>
      </thead>
      <tbody>
        {query.data?.portfolios.map((portfolio) => {
          return (
            <tr className="bg-slate-600 text-white" key={uuidv4()}>
              <td className="p-3">{portfolio.name}</td>
              <td className="text-center">
                <button onClick={() => handleDeletePortfolio(portfolio.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
