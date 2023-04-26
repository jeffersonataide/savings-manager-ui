import { useQuery } from "react-query";
import { fetchPortfolios, TPortfolio } from "@/services/api/portfolios";
import { EditPortfolioForm } from "@/components/Atomic/Organisms/EditPortfolioForm";
import { useModal } from "@/contexts/modalContext";
import { DeletePortfolioForm } from "@/components/Atomic/Organisms/DeletePortfolioForm";
import { EditIcon } from "@/components/Atomic/Atoms/EditIcon";
import { TrashIcon } from "@/components/Atomic/Atoms/TrashIcon";
import { TableList, TableRow } from "@/components/Atomic/Molecules/TableList";
import { CreateItemModal } from "@/components/Atomic/Molecules/CreateItemModal";
import { CreatePortfolioForm } from "@/components/Atomic/Organisms/CreatePortfolioForm";
import { LoadingScreen } from "@/components/Atomic/Molecules/LoadingScreen";
import { PortfolioDetails } from "@/page/PortfolioDetails";
import { useCallback, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

export const PortfoliosList = () => {
  const query = useQuery("portfolios", fetchPortfolios);
  const [currentDetailsId, setCurrentDetailsId] = useState("");

  const modalContext = useModal();

  const getPortfolioDetails = useCallback(
    (portfolioId: string) => {
      if (portfolioId !== currentDetailsId) {
        return null;
      }

      return <PortfolioDetails portfolioId={portfolioId} />;
    },
    [currentDetailsId]
  );

  if (query.isLoading) {
    return <LoadingScreen />;
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
    "Portfolio",
    <CreateItemModal
      modalProperties={{
        title: "Create Portfolio",
        content: <CreatePortfolioForm onSubmit={modalContext.closeModal} />,
      }}
    />,
  ];

  const toggleDetailsView = (id: string) => {
    if (currentDetailsId === id) {
      setCurrentDetailsId("");
    } else {
      setCurrentDetailsId(id);
    }
  };

  const rows: TableRow[] = query.data.length
    ? query.data.map((portfolio) => {
        return {
          columns: [
            {
              content: (
                <div className="w-full flex justify-between">
                  <p>{portfolio.name.toLocaleUpperCase()}</p>
                  <button
                    className="ml-20 text-white"
                    onClick={() => toggleDetailsView(portfolio.id)}
                  >
                    {portfolio.id === currentDetailsId ? (
                      <ArrowUpIcon height="1em" stroke="white" color="white" />
                    ) : (
                      <ArrowDownIcon
                        height="1em"
                        stroke="white"
                        color="white"
                      />
                    )}
                  </button>
                </div>
              ),
            },
            {
              className: "text-right space-x-3",
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
          ],
          details: getPortfolioDetails(portfolio.id),
        };
      })
    : [];

  return <TableList headers={headers} rows={rows} />;
};
