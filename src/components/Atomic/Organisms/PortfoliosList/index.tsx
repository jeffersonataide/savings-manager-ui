import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "react-query";
import { fetchPortfolios, TPortfolio } from "services/api/portfolios";
import { EditPortfolioForm } from "components/Atomic/Organisms/EditPortfolioForm";
import { useModal } from "contexts/modalContext";
import { DeletePortfolioForm } from "components/Atomic/Organisms/DeletePortfolioForm";
import { Link } from "react-router-dom";
import { EditIcon } from "components/Atomic/Atoms/EditIcon";
import { TrashIcon } from "components/Atomic/Atoms/TrashIcon";

export const PortfoliosList = () => {
  const query = useQuery("portfolios", fetchPortfolios);

  const modalContext = useModal();

  if (query.isLoading) {
    return <span>Loading ...</span>;
  }

  if (query.isError && query.error instanceof Error) {
    return <span>Something went wrong ... {query.error.message}</span>;
  }

  const handleDeletePortfolio = (portfolioId: string) => {
    modalContext.openModal({
      title: "Delete Portfolio",
      content: (
        <DeletePortfolioForm
          portfolioId={portfolioId}
          onCancel={modalContext.closeModal}
          onSubmit={modalContext.closeModal}
        />
      ),
    });
  };

  const handleEditPortfolio = (portfolio: TPortfolio) => {
    modalContext.openModal({
      title: "Edit Portfolio",
      content: (
        <EditPortfolioForm
          portfolio={portfolio}
          onSubmit={modalContext.closeModal}
        />
      ),
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
        {query.data?.map((portfolio) => {
          return (
            <React.Fragment key={uuidv4()}>
              <tr className="bg-slate-600 text-white">
                <td className="p-3">
                  <Link
                    to={`/portfolio/${portfolio.id}`}
                    className="block w-full"
                  >
                    {portfolio.name}
                  </Link>
                </td>
                <td className="text-center space-x-3">
                  <button onClick={() => handleEditPortfolio(portfolio)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDeletePortfolio(portfolio.id)}>
                    <TrashIcon />
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
