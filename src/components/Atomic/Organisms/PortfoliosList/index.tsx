import { useQuery } from "react-query";
import { fetchPortfolios, TPortfolio } from "services/api/portfolios";
import { EditPortfolioForm } from "components/Atomic/Organisms/EditPortfolioForm";
import { useModal } from "contexts/modalContext";
import { DeletePortfolioForm } from "components/Atomic/Organisms/DeletePortfolioForm";
import { Link } from "react-router-dom";
import { EditIcon } from "components/Atomic/Atoms/EditIcon";
import { TrashIcon } from "components/Atomic/Atoms/TrashIcon";
import { TableList, TableRow } from "components/Atomic/Molecules/TableList";
import { CreateItemModal } from "components/Atomic/Molecules/CreateItemModal";
import { CreatePortfolioForm } from "components/Atomic/Organisms/CreatePortfolioForm";

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

  if (!query.data) {
    return null;
  }

  const headers = [
    "Name",
    <CreateItemModal
      modalProperties={{
        title: "Create Portfolio",
        content: <CreatePortfolioForm onSubmit={modalContext.closeModal} />,
      }}
    />,
  ];

  const rows: TableRow[] = query.data.map((portfolio) => {
    return [
      {
        content: (
          <Link to={`/portfolio/${portfolio.id}`} className="block w-full">
            {portfolio.name}
          </Link>
        ),
      },
      {
        className: "text-center space-x-3",
        content: (
          <>
            <button onClick={() => handleEditPortfolio(portfolio)}>
              <EditIcon />
            </button>
            <button onClick={() => handleDeletePortfolio(portfolio.id)}>
              <TrashIcon />
            </button>
          </>
        ),
      },
    ];
  });

  return <TableList headers={headers} rows={rows} />;
};
