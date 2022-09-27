import { CreatePortfolioForm } from "../../components/Atomic/Organisms/CreatePortfolioForm";
import { CreateItemModal } from "../../components/Atomic/Molecules/CreateItemModal";
import { PortfoliosList } from "../../components/Atomic/Organisms/PortfoliosList";
import { useModal } from "../../contexts/modalContext";

export const Portfolios = () => {
  const modalContext = useModal();

  return (
    <div className="flex flex-col items-center">
      <CreateItemModal
        buttonText="Create portfolio"
        modalProperties={{
          title: "Create Portfolio",
          content: <CreatePortfolioForm onSubmit={modalContext.closeModal} />,
        }}
      />
      <PortfoliosList />
    </div>
  );
};
