import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deletePortfolio,
  fetchPortfolios,
} from "../../services/api/portfolios";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { EditPortfolioForm } from "../EditPortfolioForm";

export const PortfoliosList = () => {
  const queryClient = useQueryClient();
  const query = useQuery("portfolios", fetchPortfolios);
  const mutation = useMutation(deletePortfolio);

  const [editPortfolioId, seteditPortfolioId] = useState("");

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

  const handleEditPortfolio = (id: string) => {
    seteditPortfolioId(id);
  };

  const closeModal = () => {
    seteditPortfolioId("");
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
            <React.Fragment key={uuidv4()}>
              {portfolio.id === editPortfolioId ? (
                <div className="flex justify-center">
                  <EditPortfolioForm id={portfolio.id} onSubmit={closeModal} />
                </div>
              ) : null}
              <tr className="bg-slate-600 text-white">
                <td className="p-3">{portfolio.name}</td>
                <td className="text-center space-x-3">
                  <button onClick={() => handleEditPortfolio(portfolio.id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
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
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};
